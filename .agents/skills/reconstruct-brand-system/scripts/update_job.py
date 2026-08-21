#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


STATUSES = {"planned", "running", "completed", "failed", "skipped"}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def state_path_from(value: str) -> Path:
    candidate = Path(value).expanduser().resolve()
    return candidate if candidate.name == "pipeline-state.json" else candidate / "pipeline-state.json"


def load(path: Path) -> dict:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict) or value.get("artifact_type") != "brand_pipeline_state":
        raise ValueError("invalid brand pipeline state")
    return value


def main() -> int:
    parser = argparse.ArgumentParser(description="Record one bounded parallel pipeline job.")
    parser.add_argument("pipeline_directory_or_state")
    parser.add_argument("--stage", required=True, choices=("stage_1", "stage_2", "stage_3"))
    parser.add_argument("--job", required=True)
    parser.add_argument("--status", required=True, choices=tuple(sorted(STATUSES)))
    parser.add_argument("--owner", default="")
    parser.add_argument("--parallel-group", default="")
    parser.add_argument("--output", action="append", default=[])
    parser.add_argument("--note", default="")
    parser.add_argument("--wave", default="")
    parser.add_argument("--serial-fallback-reason", default="")
    args = parser.parse_args()

    path = state_path_from(args.pipeline_directory_or_state)
    try:
        state = load(path)
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 1

    execution = state.get("execution")
    if not isinstance(execution, dict):
        execution = {
            "mode": "parallel_single_brand",
            "max_workers": 3,
            "single_writer": True,
            "active_wave": "",
            "serial_fallback_reason": {},
            "jobs": [],
        }
        state["execution"] = execution
    jobs = execution.get("jobs")
    if not isinstance(jobs, list):
        jobs = []
        execution["jobs"] = jobs

    job = next((item for item in jobs if isinstance(item, dict) and item.get("stage") == args.stage and item.get("job_id") == args.job), None)
    if job is None:
        job = {
            "stage": args.stage,
            "job_id": args.job,
            "parallel_group": args.parallel_group,
            "owner": args.owner,
            "status": "planned",
            "attempts": 0,
            "started_at": "",
            "finished_at": "",
            "outputs": [],
            "note": "",
        }
        jobs.append(job)

    previous = str(job.get("status", "planned"))
    job["status"] = args.status
    if args.owner:
        job["owner"] = args.owner
    if args.parallel_group:
        job["parallel_group"] = args.parallel_group
    if args.output:
        existing = job.get("outputs") if isinstance(job.get("outputs"), list) else []
        job["outputs"] = list(dict.fromkeys([*existing, *args.output]))
    if args.note:
        job["note"] = args.note
    if args.status == "running" and previous != "running":
        job["attempts"] = int(job.get("attempts", 0)) + 1
        job["started_at"] = job.get("started_at") or now()
        job["finished_at"] = ""
    if args.status in {"completed", "failed", "skipped"}:
        job["finished_at"] = now()
    if args.wave:
        execution["active_wave"] = args.wave
    if args.serial_fallback_reason:
        reasons = execution.get("serial_fallback_reason")
        if not isinstance(reasons, dict):
            reasons = {}
        reasons[args.stage] = args.serial_fallback_reason
        execution["serial_fallback_reason"] = reasons

    state["updated_at"] = now()
    path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"JOB={args.stage}/{args.job}")
    print(f"STATUS={args.status}")
    print(f"PIPELINE_STATE={path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
