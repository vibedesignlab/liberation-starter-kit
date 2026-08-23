#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path


EV_RE = re.compile(r"EV-\d{3,}")
GK_RE = re.compile(r"GK-\d{2,}")
SECTION_KEYS = {
    1: "source_synthesis",
    2: "evidence_and_authorship",
    3: "strategy",
    4: "verbal_system",
    5: "identity_and_channel_tokens",
    6: "key_visual_system",
    7: "brand_mood_and_world",
    8: "photography_and_film",
    9: "product_representation",
    10: "product_native_visual_and_cognitive_language",
    11: "composition_and_cross_channel_grammar",
    12: "product_interface_and_service_behavior",
    13: "system_synthesis",
    14: "global_brand_system",
}


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.is_file() else ""


def csv_rows(path: Path) -> list[dict[str, str]]:
    if not path.is_file():
        return []
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def yaml_scalar(text: str, key: str) -> str:
    match = re.search(rf"(?m)^\s*{re.escape(key)}:\s*(.*?)\s*$", text)
    return match.group(1).strip().strip("\"'") if match else ""


def yaml_list(text: str, key: str) -> list[str]:
    line = re.search(rf"(?m)^\s*{re.escape(key)}:\s*\[([^\]]*)\]\s*$", text)
    if line:
        return [item.strip().strip("\"'") for item in line.group(1).split(",") if item.strip()]
    block = re.search(rf"(?m)^\s*{re.escape(key)}:\s*\n(?P<body>(?:[ \t]+-[ \t]+[^\n]+\n?)+)", text)
    if not block:
        return []
    return [item.strip().strip("\"'") for item in re.findall(r"(?m)^\s+-\s+(.+?)\s*$", block.group("body"))]


def top_sections(markdown: str) -> dict[int, tuple[str, str]]:
    matches = list(re.finditer(r"(?m)^##\s+(\d+)\.\s+(.+?)\s*$", markdown))
    sections: dict[int, tuple[str, str]] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        sections[int(match.group(1))] = (match.group(2).strip(), markdown[match.end():end].strip())
    return sections


def level_three_parts(markdown: str) -> list[tuple[str, str]]:
    matches = list(re.finditer(r"(?m)^###\s+(.+?)\s*$", markdown))
    parts: list[tuple[str, str]] = []
    intro = markdown[: matches[0].start()].strip() if matches else markdown.strip()
    if intro:
        parts.append(("Overview", intro))
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        parts.append((match.group(1).strip(), markdown[match.end():end].strip()))
    return parts


def parse_tables(markdown: str) -> list[dict[str, object]]:
    lines = markdown.splitlines()
    tables: list[dict[str, object]] = []
    index = 0
    while index < len(lines):
        if not lines[index].strip().startswith("|"):
            index += 1
            continue
        block: list[str] = []
        while index < len(lines) and lines[index].strip().startswith("|"):
            block.append(lines[index].strip())
            index += 1
        rows = [[cell.strip() for cell in line.strip("|").split("|")] for line in block]
        if len(rows) < 2:
            continue
        headers = rows[0]
        body = rows[2:] if all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in rows[1]) else rows[1:]
        normalized = []
        for row in body:
            padded = row + [""] * max(0, len(headers) - len(row))
            normalized.append({headers[i]: padded[i] for i in range(len(headers))})
        tables.append({"columns": headers, "rows": normalized})
    return tables


def notes_without_tables(markdown: str) -> list[str]:
    lines = markdown.splitlines()
    kept: list[str] = []
    in_table = False
    for line in lines:
        if line.strip().startswith("|"):
            in_table = True
            continue
        if in_table and not line.strip():
            in_table = False
            continue
        if in_table:
            continue
        if re.match(r"^####\s+", line):
            kept.append(re.sub(r"^####\s+", "", line).strip() + ":")
        else:
            kept.append(line.strip())
    text = "\n".join(kept)
    chunks = [re.sub(r"\s+", " ", chunk).strip() for chunk in re.split(r"\n\s*\n", text) if chunk.strip()]
    return chunks


def structured_layer(title: str, markdown: str) -> dict[str, object]:
    topics = []
    for topic_title, body in level_three_parts(markdown):
        topics.append({
            "title": topic_title,
            "notes": notes_without_tables(body),
            "tables": parse_tables(body),
            "evidence_ids": sorted(set(EV_RE.findall(body))),
        })
    return {
        "title": title,
        "topics": topics,
        "evidence_ids": sorted(set(EV_RE.findall(markdown))),
    }


def core_claims(markdown: str) -> list[dict[str, object]]:
    claims: list[dict[str, object]] = []
    for line in markdown.splitlines():
        if not re.match(r"^\|\s*CL-\d{3,}\s*\|", line):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) < 9:
            continue
        epistemic = "Observed" if re.search(r"\bObserved\b", cells[2], re.I) else "Inferred" if re.search(r"\bInferred\b", cells[2], re.I) else "Unspecified"
        claims.append({
            "claim_id": cells[0],
            "domain": cells[1],
            "epistemic_status": epistemic,
            "claim": cells[2],
            "semantic_function": cells[3],
            "evidence_ids": sorted(set(EV_RE.findall(cells[4]))),
            "confidence": cells[5].lower(),
            "alternative_explanation": cells[6],
            "scope_or_exception": cells[7],
            "falsifier": cells[8],
        })
    return claims


def decision_domain(domain: str) -> str:
    value = domain.lower().replace("_", " ").replace("-", " ")
    tests = (
        ("verbal_system", ("verbal", "copy", "naming")),
        ("key_visual", ("key visual",)),
        ("brand_mood", ("mood", "world")),
        ("photography_and_film", ("photo", "film", "motion")),
        ("product_representation", ("product image", "representation", "packaging")),
        ("product_native_language", ("intrinsic", "product native", "product form", "digital product", "cmf")),
        ("identity_and_tokens", ("identity", "token", "type", "color", "layout")),
        ("product_interface_service", ("behavior", "service", "interface")),
        ("composition", ("composition", "grid", "spacing")),
        ("strategy", ("strategy", "portfolio", "position")),
    )
    for key, words in tests:
        if any(word in value for word in words):
            return key
    return "system_and_other"


def grammar_rules(markdown: str) -> list[dict[str, object]]:
    matches = list(re.finditer(r"(?m)^##\s+(GK-\d{2,})\s*[—-]\s*(.+?)\s*$", markdown))
    rules: list[dict[str, object]] = []
    field_map = {
        "Input condition": "input_condition",
        "Transformation": "transformation",
        "Intended effect": "intended_effect",
        "Evidence IDs": "evidence_ids",
        "Connected claim IDs": "connected_claim_ids",
        "Confidence": "confidence",
        "Alternative explanation": "alternative_explanation",
        "Exception and scope": "exception_and_scope",
        "Protected source expression": "protected_source_expression",
        "Acceptance test": "acceptance_test",
        "Rejection test": "rejection_test",
    }
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        block = markdown[match.end():end]
        record: dict[str, object] = {"grammar_id": match.group(1), "name": match.group(2).strip()}
        for label, key in field_map.items():
            field = re.search(rf"(?m)^-\s*{re.escape(label)}:\s*(.+?)\s*$", block)
            if not field:
                continue
            value = field.group(1).strip()
            if key == "evidence_ids":
                record[key] = sorted(set(EV_RE.findall(value)))
            elif key == "connected_claim_ids":
                record[key] = sorted(set(re.findall(r"CL-\d{3,}", value)))
            else:
                record[key] = value
        rules.append(record)
    return rules


def evidence_index(case: Path) -> list[dict[str, str]]:
    selected = (
        "evidence_id", "title", "source_tier", "content_type", "evidence_layer", "visual_category",
        "source_url", "local_path", "market", "era_or_date", "captured_at", "credit", "rights_note",
        "subject_role", "human_casting", "setting", "composition", "camera_and_perspective", "lighting",
        "palette", "material_and_surface", "postproduction", "motion_or_sequence", "product_representation_job",
        "product_image_job", "product_native_signals", "intrinsic_product_signals", "analysis_notes",
        "key_visual_surface", "report_section", "report_order",
    )
    merged: dict[str, dict[str, str]] = {}
    for row in csv_rows(case / "source-manifest.csv") + csv_rows(case / "visual-corpus.csv"):
        if row.get("status", "").strip().lower() != "included":
            continue
        evidence_id = row.get("evidence_id", "").strip()
        if not evidence_id:
            continue
        record = merged.setdefault(evidence_id, {field: "" for field in selected})
        for field in selected:
            value = row.get(field, "").strip()
            if value and not record.get(field):
                record[field] = value
        if not record.get("credit"):
            record["credit"] = row.get("creator_or_agency", "").strip()
    return [merged[key] for key in sorted(merged)]


def design_system(layer: dict[str, object]) -> dict[str, object]:
    result: dict[str, object] = {}
    mapping = {
        "brand color scheme": "brand_color_scheme",
        "typography hierarchy": "typography_hierarchy",
        "spacing strategy": "spacing_strategy",
        "layout strategy": "layout_strategy",
    }
    for topic in layer.get("topics", []):
        title = str(topic.get("title", "")).strip().lower()
        for needle, key in mapping.items():
            if needle in title:
                tables = topic.get("tables", []) if isinstance(topic.get("tables"), list) else []
                rows = [
                    row
                    for table in tables
                    if isinstance(table, dict)
                    for row in table.get("rows", [])
                    if isinstance(row, dict)
                ]

                def values(*candidates: str) -> list[str]:
                    found: list[str] = []
                    for row in rows:
                        lowered = {str(k).strip().lower(): str(v).strip() for k, v in row.items()}
                        for candidate in candidates:
                            value = lowered.get(candidate.lower(), "")
                            if value and value not in found:
                                found.append(value)
                    return found

                result[key] = {
                    "title": topic.get("title", key.replace("_", " ")),
                    "roles": values("role", "source role", "information role", "spacing role", "layout role", "color layer"),
                    "relationships": values("operating relationship", "hierarchy relationship", "relationship", "alignment and sequence"),
                    "invariants": values("invariant", "keep stable"),
                    "variables_and_exceptions": values(
                        "variable by channel / locale", "responsive / density variation", "format variation", "may vary"
                    ),
                    "observed_references": [
                        row for row in rows
                        if any("observed" in str(column).lower() for column in row)
                    ],
                    "evidence_ids": topic.get("evidence_ids", []),
                    "limits": values("evidence and limits", "evidence and scope", "evidence / limit"),
                    "source_notes": topic.get("notes", []),
                    "source_tables": tables,
                }
                break
    for key in mapping.values():
        result.setdefault(key, {
            "title": key.replace("_", " "),
            "roles": [],
            "relationships": [],
            "invariants": [],
            "variables_and_exceptions": [],
            "observed_references": [],
            "evidence_ids": [],
            "limits": [],
            "source_notes": [],
            "source_tables": [],
        })
    result["implementation_boundary"] = "Source observations and portable relationships only; not target-ready tokens, JSON variables, breakpoints, or component code."
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="Export a source-brand anatomy as a structured downstream JSON handoff.")
    parser.add_argument("analysis_directory")
    parser.add_argument("--output", default="outputs/source-brand-analysis.json")
    args = parser.parse_args()

    case = Path(args.analysis_directory).expanduser().resolve()
    anatomy = read(case / "source-brand-anatomy.md")
    grammar = read(case / "grammar-kernel.md")
    brief = read(case / "research-brief.yaml")
    handoff = read(case / "analysis-handoff.yaml")
    if not anatomy or not grammar or not brief:
        raise SystemExit("research-brief.yaml, source-brand-anatomy.md, and grammar-kernel.md are required")

    sections = top_sections(anatomy)
    layers = {
        SECTION_KEYS[number]: structured_layer(title, body)
        for number, (title, body) in sections.items()
        if number in SECTION_KEYS
    }
    claims = core_claims(anatomy)
    grouped: dict[str, list[dict[str, object]]] = defaultdict(list)
    for claim in claims:
        grouped[decision_domain(str(claim["domain"]))].append(claim)
    rules = grammar_rules(grammar)
    global_layer = layers.get("global_brand_system", {"topics": []})

    product_mode = yaml_scalar(brief, "product_mode") or "mixed_or_unspecified"
    payload = {
        "schema_version": "1.2.0",
        "artifact_type": "source_brand_analysis",
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "brand": {
            "name": yaml_scalar(brief, "name") or "Source brand",
            "entity_scope": yaml_scalar(brief, "entity_scope"),
            "markets": yaml_list(brief, "markets"),
            "languages": yaml_list(brief, "languages"),
            "channels": yaml_list(brief, "channels"),
            "era_start": yaml_scalar(brief, "era_start"),
            "era_end": yaml_scalar(brief, "era_end"),
            "product_mode": product_mode,
        },
        "report_identity": {
            "background_color": yaml_scalar(brief, "hero_background_color"),
            "foreground_color": yaml_scalar(brief, "hero_foreground_color"),
            "color_layer": yaml_scalar(brief, "hero_color_layer"),
            "identity_scope": yaml_scalar(brief, "hero_identity_scope"),
            "logo": {
                "evidence_id": yaml_scalar(brief, "hero_logo_evidence_id"),
                "local_path": yaml_scalar(brief, "hero_logo_local_path"),
                "source_url": yaml_scalar(brief, "hero_logo_source_url"),
                "credit": yaml_scalar(brief, "hero_logo_credit"),
                "rights_note": yaml_scalar(brief, "hero_logo_rights_note"),
                "variant": yaml_scalar(brief, "hero_logo_variant"),
                "render_treatment": yaml_scalar(brief, "hero_logo_render_treatment"),
            },
        },
        "handoff": {
            "status": "USER_DIRECTION_REQUIRED",
            "package_version": yaml_scalar(handoff, "version"),
            "target_direction": None,
            "approved_grammar_ids": [rule["grammar_id"] for rule in rules],
            "protected_surface_families": yaml_list(handoff, "protected_surface_families"),
            "unresolved_gaps": yaml_list(handoff, "unresolved_gaps") or yaml_list(handoff, "unresolved_source_gaps"),
        },
        "decision_index": dict(grouped),
        "analysis_layers": layers,
        "design_system": design_system(global_layer),
        "grammar_rules": rules,
        "evidence_index": evidence_index(case),
        "downstream_contract": {
            "read_with": "storybook_registered_report",
            "transfer_plan_requires": [
                "new user target direction",
                "decision_index",
                "design_system",
                "grammar_rules",
                "protected_surface_families",
                "unresolved_gaps",
            ],
            "second_brand_model_must_add": [
                "approved tuning operation and source lineage",
                "target-category evidence and constraints",
                "original positioning, verbal, identity, key visual, mood, photography, product representation, and product-native rules",
                "implementation-ready semantic tokens and decision status",
            ],
            "product_photo_brief_requires_from_second_brand": [
                "commercial brand image mood",
                "product representation roles",
                "camera, light, set, material, color, post-production, and sequence rules",
                "product-native form or interface states that must remain truthful",
            ],
            "landing_page_brief_requires_from_second_brand": [
                "positioning and message order",
                "key-visual surface translation",
                "brand color and typography roles",
                "spacing and layout strategy",
                "product or interface behavior, states, evidence, and CTA rules",
            ],
        },
    }

    output = case / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exported: {output}")
    print(f"Claims: {len(claims)} · Grammar: {len(rules)} · Evidence: {len(payload['evidence_index'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
