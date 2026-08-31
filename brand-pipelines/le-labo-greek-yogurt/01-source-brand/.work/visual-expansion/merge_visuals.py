#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path


PACKAGE = Path(__file__).resolve().parents[2]
WORK = PACKAGE / ".work" / "visual-expansion"
CAPTURED_AT = "2026-08-24"


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), list(reader)


def write_rows(path: Path, fields: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def asset_records() -> list[dict[str, object]]:
    product = load(WORK / "product-packaging" / "shard.json")
    space = load(WORK / "space-service" / "shard.json")
    editorial = load(WORK / "editorial-craft" / "shard.json")
    records: list[dict[str, object]] = []

    for item in product["assets"]:
        records.append({
            "provisional_id": item["id"],
            "title": item["title"],
            "page_url": item["page_url"],
            "source_url": item["source_url"],
            "local_path": item["local_path"],
            "mime": item["mime_type"],
            "width": item["width"],
            "height": item["height"],
            "sha256": item["sha256"],
            "layer": item["layer"],
            "role": item["role"],
            "credit": item["credit"],
            "rights": item["rights"],
            "observations": item["visual_observations"],
            "channel": "official product, personalization, or discovery page",
            "market": "United States",
        })

    for item in space["images"]:
        records.append({
            "provisional_id": item["id"],
            "title": item["title"],
            "page_url": item["source_page_url"],
            "source_url": item["asset_url"],
            "local_path": item["local_path"],
            "mime": item["mime"],
            "width": item["width"],
            "height": item["height"],
            "sha256": item["sha256"],
            "layer": item["layer"],
            "role": item["role"],
            "credit": item["credit"],
            "rights": item["rights"],
            "observations": item["visual_observations"],
            "channel": "official brand, About, or refill service page",
            "market": "Global or United States as stated by source",
        })

    for item in editorial["visuals"]:
        records.append({
            "provisional_id": item["id"],
            "title": item["title"],
            "page_url": item["page_url"],
            "source_url": item["source_url"],
            "local_path": item["local_path"],
            "mime": item["mime"],
            "width": item["dimensions"]["width"],
            "height": item["dimensions"]["height"],
            "sha256": item["sha256"],
            "layer": item["layer"],
            "role": item["role"],
            "credit": item["credit"],
            "rights": item["rights"],
            "observations": [item["visual_observation"]],
            "channel": "official Films, Souls & Labs, Craftspeople, or Le Journal page",
            "market": "Global; city scope follows source title",
        })
    return records


def report_section(layer: str) -> tuple[str, str]:
    value = layer.lower()
    if "editorial" in value or "key-visual" in value:
        return "key-visual", "content"
    if "space" in value or "service" in value:
        return "product-interface-service", "additional-channel"
    if "product-representation" in value:
        return "product-representation", "imagery"
    if "product" in value or "packaging" in value:
        return "product-native-visual-language", "product"
    if "harvest" in value or "craft" in value or "people" in value:
        return "photography-film", "imagery"
    return "brand-mood", "imagery"


def main() -> None:
    source_path = PACKAGE / "source-manifest.csv"
    visual_path = PACKAGE / "visual-corpus.csv"
    source_fields, source_rows = read_rows(source_path)
    visual_fields, visual_rows = read_rows(visual_path)

    source_rows = [row for row in source_rows if "supplemental_visual_expansion" not in row.get("notes", "")]
    visual_rows = [row for row in visual_rows if not row.get("local_path", "").startswith("evidence/visual-expansion/")]

    existing_hashes: dict[str, str] = {}
    for row in visual_rows:
        if row.get("sha256"):
            existing_hashes[row["sha256"]] = row["evidence_id"]

    next_id = max(int(row["evidence_id"].split("-")[1]) for row in source_rows if row.get("evidence_id", "").startswith("EV-")) + 1
    merge_map: list[dict[str, object]] = []

    for item in asset_records():
        local = PACKAGE / str(item["local_path"])
        if not local.is_file():
            raise SystemExit(f"missing asset: {local}")
        actual_hash = hashlib.sha256(local.read_bytes()).hexdigest()
        if actual_hash != item["sha256"]:
            raise SystemExit(f"hash mismatch: {local}")
        if actual_hash in existing_hashes:
            merge_map.append({"provisional_id": item["provisional_id"], "status": "excluded_duplicate", "duplicate_of": existing_hashes[actual_hash]})
            continue

        evidence_id = f"EV-{next_id:03d}"
        next_id += 1
        existing_hashes[actual_hash] = evidence_id
        section, surface = report_section(str(item["layer"]))
        notes = " ".join(str(value) for value in item["observations"])

        source_rows.append({
            "evidence_id": evidence_id,
            "title": str(item["title"]),
            "source_url": str(item["source_url"]),
            "local_path": str(item["local_path"]),
            "source_tier": "primary",
            "content_type": "image_candidate",
            "evidence_layer": str(item["layer"]),
            "visual_category": str(item["role"]),
            "channel": str(item["channel"]),
            "era_or_date": "current",
            "captured_at": CAPTURED_AT,
            "market": str(item["market"]),
            "language": "visual / English source",
            "creator_or_agency": str(item["credit"]),
            "relevance": "Supplemental visual evidence for " + str(item["role"]),
            "reliability": "Direct official or official parent/editorial asset with verified local hash",
            "rights_notes": str(item["rights"]),
            "status": "included",
            "related_ids": str(item["provisional_id"]),
            "inclusion_reason": "Adds a non-duplicate visual role or state to the Stage 1 corpus",
            "notes": "supplemental_visual_expansion; source page: " + str(item["page_url"]),
        })

        visual_rows.append({
            "evidence_id": evidence_id,
            "local_path": str(item["local_path"]),
            "source_url": str(item["source_url"]),
            "title": str(item["title"]),
            "mime_type": str(item["mime"]),
            "width": str(item["width"]),
            "height": str(item["height"]),
            "sha256": actual_hash,
            "evidence_layer": str(item["layer"]),
            "visual_category": str(item["role"]),
            "channel": str(item["channel"]),
            "era_or_date": "current",
            "captured_at": CAPTURED_AT,
            "market": str(item["market"]),
            "creator_or_agency": str(item["credit"]),
            "credit": str(item["credit"]),
            "rights_note": str(item["rights"]),
            "related_ids": str(item["provisional_id"]),
            "status": "included",
            "subject_role": str(item["role"]),
            "human_casting": "Hands, technicians, workers, or incidental people only when visible; otherwise none.",
            "setting": str(item["channel"]),
            "composition": "Direct source frame; observable arrangement recorded in analysis notes.",
            "camera_and_perspective": "Source frame; lens and camera metadata unavailable.",
            "lighting": "Observable source lighting; capture metadata unavailable.",
            "palette": "Observed source color only; not promoted to an identity palette.",
            "material_and_surface": "Visible product, package, ingredient, tool, print, or spatial surfaces recorded in notes.",
            "postproduction": "Unknown; no unsupported retouching claim.",
            "motion_or_sequence": "Poster or sequence role follows source; a still does not prove full motion grammar.",
            "product_representation_job": "Evidence for " + str(item["role"]) + "; factual and atmospheric roles remain separated.",
            "product_native_signals": "Visible form, label, package, service state, material, or spatial signal only.",
            "analysis_notes": notes,
            "report_section": section,
            "report_order": str(len(visual_rows) + 1),
            "key_visual_surface": surface,
        })
        merge_map.append({"provisional_id": item["provisional_id"], "evidence_id": evidence_id, "status": "included", "local_path": item["local_path"]})

    write_rows(source_path, source_fields, source_rows)
    write_rows(visual_path, visual_fields, visual_rows)
    (WORK / "merge-map.json").write_text(json.dumps({
        "schema_version": "1.0.0",
        "artifact_type": "supplemental_visual_merge_map",
        "included": sum(item["status"] == "included" for item in merge_map),
        "excluded_duplicates": sum(item["status"] == "excluded_duplicate" for item in merge_map),
        "items": merge_map,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"MERGED included={sum(item['status'] == 'included' for item in merge_map)} duplicates={sum(item['status'] == 'excluded_duplicate' for item in merge_map)} total_visuals={len(visual_rows)}")


if __name__ == "__main__":
    main()
