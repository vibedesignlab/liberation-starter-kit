#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path

from validate_transfer import direction_errors, input_errors, nonempty, source_errors


def object_at(path: Path) -> dict:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return value if isinstance(value, dict) else {}


def typography_errors(model: dict) -> list[str]:
    sections = model.get("sections") if isinstance(model.get("sections"), dict) else {}
    tokens = sections.get("design_token_direction") if isinstance(sections.get("design_token_direction"), dict) else {}
    records = tokens.get("typography") if isinstance(tokens.get("typography"), list) else []
    roles = " ".join(str(item.get("role", "")).lower() for item in records if isinstance(item, dict))
    required = {
        "display": ("display", "hero"),
        "page headline": ("page headline", "page heading", "h1"),
        "section heading": ("section heading", "section headline", "h2"),
        "body": ("body", "paragraph"),
        "support or label": ("support", "label", "caption"),
    }
    errors: list[str] = []
    for label, aliases in required.items():
        if not any(alias in roles for alias in aliases):
            errors.append(f"Stage 2 typography direction lacks {label} hierarchy token")
    return errors


def extended_errors(case: Path) -> list[str]:
    errors: list[str] = []
    html_path = case / "outputs" / "extended-brand-anatomy.html"
    model_path = case / "outputs" / "extended-brand-anatomy.json"
    for path in (case / "extended-brand-anatomy.md", html_path, model_path):
        if not path.is_file() or not path.stat().st_size:
            errors.append(f"missing canonical Stage 2 artifact {path.name}")

    model = object_at(model_path)
    if model.get("artifact_type") != "extended_brand_anatomy":
        errors.append("Stage 2 JSON artifact_type must be extended_brand_anatomy")
    errors.extend(typography_errors(model))

    registry = object_at(case / "asset-registry.json")
    if registry.get("artifact_type") != "brand_asset_registry" or registry.get("stage") != "extended_brand_anatomy":
        errors.append("Stage 2 asset registry has invalid identity")
    assets = registry.get("assets") if isinstance(registry.get("assets"), list) else []
    role_counts = Counter(str(item.get("role", "")) for item in assets if isinstance(item, dict))
    if role_counts.get("representative_product_hero") != 1:
        errors.append("Stage 2 registry needs exactly one representative-product hero prompt")
    if role_counts.get("brand_mood", 0) < 2:
        errors.append("Stage 2 registry needs at least two brand-mood prompts")
    unexpected = set(role_counts) - {"representative_product_hero", "brand_mood"}
    if unexpected:
        errors.append(f"Stage 2 registry contains unexpected roles {sorted(unexpected)}")

    ids: list[str] = []
    mood_jobs: list[str] = []
    for item in assets:
        if not isinstance(item, dict):
            errors.append("Stage 2 asset registry contains a non-object item")
            continue
        asset_id = str(item.get("asset_id", "?")).strip()
        ids.append(asset_id)
        for field in (
            "asset_id",
            "role",
            "communication_job",
            "prompt_path",
            "subject",
            "aspect_ratio",
            "generation_provenance",
            "reference_lineage",
            "invariants",
            "allowed_variation",
            "invariant_check",
            "status",
        ):
            if not nonempty(item.get(field)):
                errors.append(f"Stage 2 asset {asset_id} has blank {field}")
        prompt_value = str(item.get("prompt_path", "")).strip()
        if prompt_value and not (case / prompt_value).is_file():
            errors.append(f"Stage 2 asset {asset_id} has missing prompt_path")

        status = str(item.get("status", "")).strip()
        file_value = str(item.get("file_path", "")).strip()
        invariant_check = str(item.get("invariant_check", "")).strip()
        if status == "external_pending":
            if file_value:
                errors.append(f"Stage 2 pending asset {asset_id} must not claim a file_path")
            if invariant_check != "pending":
                errors.append(f"Stage 2 pending asset {asset_id} invariant_check must be pending")
        elif status == "registered":
            if not file_value or not (case / file_value).is_file():
                errors.append(f"Stage 2 registered asset {asset_id} has no local bitmap")
            if invariant_check != "pass":
                errors.append(f"Stage 2 registered asset {asset_id} invariant_check must be pass")
        else:
            errors.append(f"Stage 2 asset {asset_id} must be external_pending or registered")

        if item.get("role") == "brand_mood":
            mood_jobs.append(str(item.get("communication_job", "")).strip().casefold())

    if len(ids) != len(set(ids)):
        errors.append("Stage 2 asset IDs must be unique")
    if len(mood_jobs) != len(set(mood_jobs)):
        errors.append("Stage 2 brand-mood prompts need distinct communication jobs")
    if set(model.get("registered_anchor_assets", [])) != set(ids):
        errors.append("Stage 2 JSON registered_anchor_assets must match every registry record ID")

    html = html_path.read_text(encoding="utf-8") if html_path.is_file() else ""
    for item in assets:
        if not isinstance(item, dict):
            continue
        for field in ("asset_id", "prompt_path"):
            value = str(item.get(field, "")).strip()
            if value and value not in html:
                errors.append(f"Stage 2 HTML does not render {field} for {item.get('asset_id', '?')}")
        if item.get("status") == "registered":
            file_value = str(item.get("file_path", "")).strip()
            if file_value and file_value not in html:
                errors.append(f"Stage 2 HTML does not render registered image {item.get('asset_id', '?')}")
    if "data-review-checkpoint" not in html:
        errors.append("Stage 2 HTML has no review checkpoint")

    review = object_at(case / "stage-review.json")
    if review.get("artifact_type") != "stage_review" or review.get("stage") != "extended_brand_anatomy":
        errors.append("Stage 2 stage-review.json has invalid identity")
    if review.get("status") not in {"pending", "accepted", "revision_requested"}:
        errors.append("Stage 2 stage-review.json has invalid status")
    if not nonempty(review.get("review_targets")) or not nonempty(review.get("adjustment_prompts")):
        errors.append("Stage 2 review lacks targets or adjustment prompts")
    return errors


def source_review_errors(case: Path) -> list[str]:
    transfer_input = object_at(case / "transfer-input.json")
    source = transfer_input.get("source_analysis") if isinstance(transfer_input.get("source_analysis"), dict) else {}
    package_value = str(source.get("package_path", "")).strip()
    package = Path(package_value).expanduser().resolve() if package_value else Path()
    review_path = str(source.get("review_path", "stage-review.json")).strip()
    review = object_at(package / review_path) if package_value else {}
    if review:
        if review.get("status") != "accepted":
            return ["Stage 1 source review must be accepted before Stage 2"]
        return []
    if str(source.get("review_status", "")).strip().lower() != "accepted":
        return ["legacy source package needs explicit accepted review_status"]
    return []


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate Claude Stage 2 extended brand anatomy and external image handoff.")
    parser.add_argument("stage_2_directory")
    parser.add_argument("stage", choices=("source", "input", "direction", "assets", "all"))
    args = parser.parse_args()
    case = Path(args.stage_2_directory).expanduser().resolve()
    errors: list[str] = []
    if args.stage in {"source", "all"}:
        errors.extend(source_errors(case))
        errors.extend(source_review_errors(case))
    if args.stage in {"input", "all"}:
        errors.extend(input_errors(case))
    if args.stage in {"direction", "all"}:
        errors.extend(direction_errors(case))
    if args.stage in {"assets", "all"}:
        errors.extend(extended_errors(case))
    print(f"Extended brand anatomy: {case}")
    print(f"Stage: {args.stage}")
    for error in errors:
        print(f"ERROR: {error}")
    print(f"Result: {'FAIL' if errors else 'PASS'}")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
