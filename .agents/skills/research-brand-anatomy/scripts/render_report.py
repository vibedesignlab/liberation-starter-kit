#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import html as html_lib
import json
import os
import re
import shutil
from pathlib import Path


SECTION_META = {
    1: ("source-brand-anatomy", "Source synthesis"),
    2: ("evidence", "Evidence & gaps"),
    3: ("strategy", "Strategy"),
    4: ("verbal", "Verbal system"),
    5: ("identity-channel-tokens", "Identity & tokens"),
    6: ("key-visual", "Key visual"),
    7: ("brand-mood", "Brand mood"),
    8: ("photography-film", "Photography & film"),
    9: ("product-representation", "Product representation"),
    10: ("product-native-visual-language", "Product-native language"),
    11: ("composition", "Composition"),
    12: ("product-interface-service", "Product & service behavior"),
    13: ("grammar", "Grammar"),
    14: ("global-brand-system-framework", "Global brand system"),
    15: ("core-claims", "Core claims"),
    16: ("evidence-index", "Evidence index"),
}


def read_csv(path: Path) -> list[dict[str, str]]:
    if not path.is_file():
        return []
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def yaml_value(text: str, key: str) -> str:
    match = re.search(rf"(?m)^\s*{re.escape(key)}:\s*(.*?)\s*$", text)
    return match.group(1).strip().strip("\"'") if match else ""


def hero_identity(case: Path, output: Path, brief: str, brand: str, lead: str, depth: str) -> str:
    background = yaml_value(brief, "hero_background_color")
    foreground = yaml_value(brief, "hero_foreground_color")
    color_layer = yaml_value(brief, "hero_color_layer")
    evidence_id = yaml_value(brief, "hero_logo_evidence_id")
    local_path = yaml_value(brief, "hero_logo_local_path")
    source_url = yaml_value(brief, "hero_logo_source_url")
    credit = yaml_value(brief, "hero_logo_credit")
    rights = yaml_value(brief, "hero_logo_rights_note")
    variant = yaml_value(brief, "hero_logo_variant") or "masterbrand logo"
    treatment = yaml_value(brief, "hero_logo_render_treatment") or "none"
    if not re.fullmatch(r"#[0-9a-fA-F]{6}", background):
        background = "#111111"
    if not re.fullmatch(r"#[0-9a-fA-F]{6}", foreground):
        foreground = "#FFFFFF"
    if treatment not in {"none", "invert(1)", "brightness(0)"}:
        treatment = "none"
    logo_file = case / local_path
    logo_src = os.path.relpath(logo_file, output.parent).replace(os.sep, "/") if local_path else ""
    logo = (
        f'<div class="masthead__brand"><img class="masthead__logo" src="{html_lib.escape(logo_src, quote=True)}" '
        f'alt="{html_lib.escape(brand + " " + variant, quote=True)}" data-evidence-id="{html_lib.escape(evidence_id, quote=True)}" '
        f'data-category="masterbrand logo" data-layer="{html_lib.escape(color_layer, quote=True)}" '
        f'data-era="{html_lib.escape(yaml_value(brief, "era_end"), quote=True)}" '
        f'data-source-url="{html_lib.escape(source_url, quote=True)}" data-credit="{html_lib.escape(credit, quote=True)}" '
        f'data-rights-note="{html_lib.escape(rights, quote=True)}" data-logo-variant="{html_lib.escape(variant, quote=True)}"></div>'
    )
    return (
        f'<header class="masthead" style="--hero-bg:{background};--hero-fg:{foreground};--hero-logo-filter:{treatment}">'
        f'<div class="masthead__meta"><span>Source Brand Anatomy · {html_lib.escape(depth)}</span><span>HTML + JSON · source-only</span></div>'
        f'{logo}<div class="masthead__intro"><h1>{html_lib.escape(brand)}<br>Brand Anatomy</h1>'
        f'<p class="masthead__lead">{html_lib.escape(lead)}</p></div></header>'
    )


def inline(text: str) -> str:
    value = html_lib.escape(text.strip())
    value = re.sub(r"`([^`]+)`", r"<code>\1</code>", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", value)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', value)
    return value


def markdown_table(lines: list[str]) -> str:
    rows = [[inline(cell) for cell in line.strip().strip("|").split("|")] for line in lines]
    if len(rows) < 2:
        return ""
    header = rows[0]
    body = rows[2:] if all(re.fullmatch(r":?-{3,}:?", re.sub(r"<[^>]+>", "", cell).strip()) for cell in rows[1]) else rows[1:]
    head = "".join(f"<th>{cell}</th>" for cell in header)
    content = "".join("<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>" for row in body)
    return f'<div class="table-wrap"><table><thead><tr>{head}</tr></thead><tbody>{content}</tbody></table></div>'


def markdown_to_html(text: str) -> str:
    lines = text.splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    bullets: list[str] = []

    def flush() -> None:
        nonlocal paragraph, bullets
        if paragraph:
            output.append(f"<p>{inline(' '.join(paragraph))}</p>")
            paragraph = []
        if bullets:
            output.append("<ul>" + "".join(f"<li>{inline(item)}</li>" for item in bullets) + "</ul>")
            bullets = []

    index = 0
    while index < len(lines):
        line = lines[index].rstrip()
        if line.startswith("|"):
            flush()
            table_lines: list[str] = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            output.append(markdown_table(table_lines))
            continue
        heading = re.match(r"^(#{3,5})\s+(.+)$", line)
        if heading:
            flush()
            level = min(len(heading.group(1)), 4)
            output.append(f"<h{level}>{inline(heading.group(2))}</h{level}>")
        elif line.startswith("- "):
            if paragraph:
                flush()
            bullets.append(line[2:])
        elif line.startswith("> "):
            flush()
            output.append(f"<blockquote>{inline(line[2:])}</blockquote>")
        elif not line.strip():
            flush()
        elif line.startswith("# "):
            pass
        else:
            paragraph.append(line.strip())
        index += 1
    flush()
    return "\n".join(output)


def split_sections(markdown: str) -> tuple[str, list[tuple[int, str, str]]]:
    matches = list(re.finditer(r"(?m)^##\s+(\d+)\.\s+(.+?)\s*$", markdown))
    intro = markdown[: matches[0].start()] if matches else markdown
    sections: list[tuple[int, str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        sections.append((int(match.group(1)), match.group(2).strip(), markdown[match.end():end].strip()))
    return intro, sections


def layer_text(row: dict[str, str]) -> str:
    return " ".join((row.get("evidence_layer", ""), row.get("visual_category", ""), row.get("report_section", ""))).lower().replace("_", "-")


def report_section(row: dict[str, str]) -> int:
    explicit = row.get("report_section", "").strip().lower()
    if explicit.isdigit():
        return int(explicit)
    by_id = {value[0]: key for key, value in SECTION_META.items()}
    if explicit in by_id:
        return by_id[explicit]
    text = layer_text(row)
    if "identity" in text or "channel token" in text:
        return 5
    if "key visual" in text or "campaign" in text:
        return 6
    if "brand mood" in text or "world" in text:
        return 7
    if "photography" in text or "film" in text:
        return 8
    if any(term in text for term in ("product representation", "product image", "product-image", "pdp", "mockup", "screen capture")):
        return 9
    if any(term in text for term in ("product native", "intrinsic product", "product object", "industrial design", "digital product", "cmf")):
        return 10
    if "interface" in text or "service" in text:
        return 12
    return 2


def surface(row: dict[str, str]) -> str:
    explicit = row.get("key_visual_surface", "").strip().lower()
    if explicit:
        return explicit
    text = layer_text(row)
    if "motion" in text:
        return "motion"
    if "identity" in text:
        return "identity"
    if "interface" in text or re.search(r"\bui\b", text):
        return "ui"
    if "key visual" in text or "campaign" in text:
        return "content-campaign"
    if "photography" in text or "imagery" in text or "brand mood" in text:
        return "imagery"
    return "content-campaign"


def image_card(case: Path, output: Path, row: dict[str, str], key_surface: str = "") -> str:
    local = row.get("local_path", "").strip()
    src = Path("..") / Path(local)
    attrs = {
        "src": src.as_posix(),
        "alt": row.get("title", "") or row.get("analysis_notes", "") or row.get("evidence_id", ""),
        "data-evidence-id": row.get("evidence_id", ""),
        "data-category": row.get("visual_category", "") or "source visual",
        "data-layer": row.get("evidence_layer", "") or "source evidence",
        "data-era": row.get("era_or_date", "") or "undated",
        "data-source-url": row.get("source_url", ""),
        "data-credit": row.get("credit", "") or row.get("creator_or_agency", "") or "Source owner",
        "data-rights-note": row.get("rights_note", "") or "Research reference only",
    }
    if key_surface:
        attrs["data-key-visual-surface"] = key_surface
    encoded = " ".join(f'{name}="{html_lib.escape(value, quote=True)}"' for name, value in attrs.items())
    figure_attr = f' data-key-visual-surface="{html_lib.escape(key_surface, quote=True)}"' if key_surface else ""
    note = row.get("analysis_notes", "") or row.get("subject_role", "")
    return (
        f'<figure class="evidence-card"{figure_attr}><img {encoded}>'
        f'<figcaption><b>{inline(row.get("evidence_id", ""))}</b><span>{inline(row.get("title", "") or row.get("visual_category", ""))}</span>'
        f'<small>{inline(note)}</small></figcaption></figure>'
    )


def order_key(row: dict[str, str]) -> tuple[int, str]:
    raw = row.get("report_order", "").strip()
    return (int(raw) if raw.isdigit() else 9999, row.get("evidence_id", ""))


def key_visual_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    candidates = [
        row for row in rows
        if row.get("key_visual_surface", "").strip()
        or any(term in layer_text(row) for term in ("identity", "key visual", "campaign", "interface", "motion", "photography", "brand mood"))
    ]
    groups: dict[str, list[dict[str, str]]] = {}
    for row in sorted(candidates, key=order_key):
        groups.setdefault(surface(row), []).append(row)
    selected: list[dict[str, str]] = []
    for role in ("identity", "ui", "content-campaign", "imagery", "motion"):
        take = 2 if role in {"identity", "ui", "content-campaign"} else 1
        selected.extend(groups.get(role, [])[:take])
    for row in sorted(candidates, key=order_key):
        if row not in selected and len(selected) < 8:
            selected.append(row)
    return selected[:8]


def font_records(markdown: str) -> list[tuple[str, str, str]]:
    records: list[tuple[str, str, str]] = []
    for line in markdown.splitlines():
        if not line.strip().startswith("|") or "woff" not in line.lower():
            continue
        cells = [re.sub(r"[`*]", "", cell.strip()) for cell in line.strip().strip("|").split("|")]
        url = next((match.group(0) for cell in cells for match in [re.search(r"https?://[^\s)]+\.woff2?(?:\?[^\s)]*)?", cell)] if match), "")
        if not url or not cells:
            continue
        family = cells[0] if cells[0] and "family" not in cells[0].lower() else "Observed Webfont"
        weight = next((re.search(r"\b[1-9]00\b", cell).group(0) for cell in cells[1:3] if re.search(r"\b[1-9]00\b", cell)), "400")
        record = (family, weight, url)
        if record not in records:
            records.append(record)
    return records[:6]


def font_specimens(markdown: str, brand: str) -> tuple[str, str, str]:
    records = font_records(markdown)
    if not records:
        return "", "Arial,sans-serif", '<div class="webfont-gap"><strong>웹폰트 확인 공백</strong><p>공식 웹폰트 파일을 확인하지 못했습니다. 비슷한 글꼴을 대신 사용하지 않습니다.</p></div>'
    font_css = []
    for family, weight, url in records:
        font_css.append(f'@font-face{{font-family:"{family}";src:url("{url}") format("woff2");font-weight:{weight};font-style:normal;font-display:swap}}')
    display = records[0][0]
    body = records[1][0] if len(records) > 1 else display
    roles = [
        ("display", "Display", "48 / 50 · 500", f"{brand} makes one idea clear."),
        ("title", "Title", "34 / 39 · 500", "A visible hierarchy connects the system."),
        ("lead", "Lead", "23 / 31 · 400", "The product explains what changes and what remains."),
        ("body", "Body", "17 / 26 · 400", "This is a rendering specimen using the verified first-party webfont artifact, not a universal source token."),
        ("label", "Label", "14 / 18 · 600", "ACTION · STATE · CONTEXT"),
        ("caption", "Caption", "12 / 17 · 400", "Observed webfont · source reference"),
    ]
    items = []
    for cls, role, spec, sample in roles:
        family = display if cls in {"display", "title"} else body
        items.append(f'<div class="font-specimen {cls}" style="font-family:&quot;{html_lib.escape(family, quote=True)}&quot;"><small>{role} · {html_lib.escape(family)} · {spec} · Latin specimen</small><p>{html_lib.escape(sample)}</p></div>')
    return "\n".join(font_css), f'"{display}",Arial,sans-serif', '<div class="type-token-matrix">' + "".join(items) + '</div><div class="webfont-gap"><strong>현지어 표본 경계</strong><p>공식 현지어 웹폰트 파일이 별도로 확인된 경우에만 해당 문자 표본을 추가합니다.</p></div>'


def terminology_note(markdown: str) -> str:
    definitions = []
    if re.search(r"\bCMF\b", markdown):
        definitions.append("색·소재·마감(CMF)")
    if re.search(r"\bLUT\b", markdown):
        definitions.append("여러 사진이나 영상에 일정한 색감을 적용하는 색보정 기준표(LUT)")
    if re.search(r"\bHIG\b", markdown):
        definitions.append("화면 설계 지침(HIG, Human Interface Guidelines)")
    if re.search(r"\bHLS\b", markdown):
        definitions.append("공식 스트리밍 영상 형식(HLS)")
    if re.search(r"\bCSS\b", markdown):
        definitions.append("웹페이지 스타일 코드(CSS)")
    if not definitions:
        return ""
    items = " · ".join(html_lib.escape(item) for item in definitions)
    return f'<section class="report-section terminology" data-layout-rail="compact"><aside class="section-rail"><span>00</span><b>Terms</b></aside><div class="section-body"><p>{items}</p></div></section>'


def main() -> int:
    parser = argparse.ArgumentParser(description="Render the shared source-brand anatomy HTML report.")
    parser.add_argument("analysis_directory")
    parser.add_argument("--output", default="outputs/source-brand-analysis.html")
    args = parser.parse_args()

    case = Path(args.analysis_directory).expanduser().resolve()
    anatomy_path = case / "source-brand-anatomy.md"
    brief_path = case / "research-brief.yaml"
    grammar_path = case / "grammar-kernel.md"
    if not anatomy_path.is_file() or not brief_path.is_file() or not grammar_path.is_file():
        raise SystemExit("source-brand-anatomy.md, grammar-kernel.md, and research-brief.yaml are required")

    anatomy = anatomy_path.read_text(encoding="utf-8")
    grammar = grammar_path.read_text(encoding="utf-8")
    brief = brief_path.read_text(encoding="utf-8")
    brand = yaml_value(brief, "name") or "Source brand"
    scope = yaml_value(brief, "entity_scope") or "Source-only brand analysis"
    depth = yaml_value(brief, "research_depth") or "legacy expanded"
    rows = [row for row in read_csv(case / "visual-corpus.csv") if row.get("status", "").strip().lower() == "included"]
    _, sections = split_sections(anatomy)

    output = case / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    css_source = Path(__file__).resolve().parent.parent / "assets" / "report.css"
    shutil.copy2(css_source, output.parent / "report.css")

    font_css, display_stack, type_matrix = font_specimens(anatomy, brand)
    key_rows = key_visual_rows(rows)
    section_rows: dict[int, list[dict[str, str]]] = {}
    for row in rows:
        section_rows.setdefault(report_section(row), []).append(row)

    rendered_sections: list[str] = []
    for number, title, content in sections:
        section_id, rail_label = SECTION_META.get(number, (f"section-{number}", title))
        display_title = {
            9: "Product representation",
            10: "Product-native visual and cognitive language",
        }.get(number, title)
        body = markdown_to_html(content)
        if number == 6:
            body = f'<div class="key-visual-operating-model">{body}</div>'
            body += '<h3 class="key-visual-cross-surface-title">Cross-surface evidence</h3><div class="key-visual-cross-surface">'
            body += "".join(image_card(case, output, row, surface(row)) for row in key_rows)
            body += "</div>"
        elif number == 14:
            body += "<h3>실제 웹폰트 렌더링 표본</h3>" + type_matrix
        elif number == 13:
            body += "<h3>Complete grammar rules</h3>" + markdown_to_html(grammar)
        elif number not in {15, 16}:
            selected = sorted(section_rows.get(number, []), key=order_key)[:4]
            if selected:
                body += '<div class="evidence-grid">' + "".join(image_card(case, output, row) for row in selected) + "</div>"
        rendered_sections.append(
            f'<section class="report-section" id="{section_id}" data-layout-rail="compact">'
            f'<aside class="section-rail"><span>{number:02d}</span><b>{html_lib.escape(rail_label)}</b></aside>'
            f'<div class="section-body"><h2>{html_lib.escape(display_title)}</h2>{body}</div></section>'
        )

    structured_handoff = '''<section class="report-section" id="structured-data-handoff" data-layout-rail="compact">
<aside class="section-rail"><span>17</span><b>Structured handoff</b></aside><div class="section-body">
<h2>다음 단계용 구조화 데이터</h2>
<p>이 보고서의 핵심 판단은 <a href="source-brand-analysis.json">source-brand-analysis.json</a>에도 기록되어 있습니다. HTML은 맥락과 근거를 설명하고, JSON은 전환 계획이 직접 읽을 수 있도록 주장, 브랜드 문법, 디자인 시스템 관계, 근거, 예외와 공백을 명시합니다.</p>
<div class="copy-grid"><div class="copy-card"><h3>전환 계획 입력</h3><p>포지셔닝, 버벌, 키 비주얼, 브랜드 무드, 사진, 제품 표현, 제품 고유 시각·인지 문법, 글로벌 디자인 시스템과 복제 금지 경계를 함께 전달합니다.</p></div><div class="copy-card"><h3>후속 제작 입력</h3><p>신규 브랜드 단계에서는 같은 구조에 튜닝 근거와 구현 지침을 더한 뒤, 제품 사진과 랜딩 페이지 기획이 그 JSON을 사용합니다.</p></div></div>
</div></section>'''

    review_path = case / "stage-review.json"
    try:
        review_data = json.loads(review_path.read_text(encoding="utf-8")) if review_path.is_file() else {}
    except (json.JSONDecodeError, OSError):
        review_data = {}
    review_status = html_lib.escape(str(review_data.get("status", "pending")))
    review_prompts = review_data.get("adjustment_prompts") if isinstance(review_data.get("adjustment_prompts"), list) else []
    review_items = "".join(f"<li>{html_lib.escape(str(item))}</li>" for item in review_prompts)
    review_section = f'''<section class="report-section" id="source-review-checkpoint" data-layout-rail="compact">
<aside class="section-rail"><span>Review</span><b>Checkpoint</b></aside><div class="section-body">
<div class="review-checkpoint" data-review-checkpoint><span class="review-status">{review_status}</span><h2>다음 단계 전 조정 확인</h2><ul>{review_items}</ul></div>
</div></section>'''

    html = f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html_lib.escape(brand)} · Source Brand Anatomy</title><link rel="stylesheet" href="report.css">
<style>{font_css}:root{{--display:{display_stack};--text:{display_stack}}}</style></head>
<body><main class="report" data-report-template="source-brand-anatomy-v2">
{hero_identity(case, output, brief, brand, scope, depth)}
{terminology_note(anatomy)}{''.join(rendered_sections)}{structured_handoff}{review_section}
<footer class="footer"><span>{html_lib.escape(brand)} · Research reference</span><span class="validation-summary">DETERMINISTIC COMPLETION CHECK</span></footer>
</main></body></html>'''
    output.write_text(html, encoding="utf-8")
    print(f"Rendered: {output}")
    print(f"Template: source-brand-anatomy-v2")
    print(f"Direct visuals available: {len(rows)}")
    print(f"Key-visual examples selected: {len(key_rows)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
