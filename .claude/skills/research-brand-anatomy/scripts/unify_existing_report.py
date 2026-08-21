#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html as html_lib
import os
import re
import shutil
from pathlib import Path


GROUPS = (
    ("source-brand-anatomy", "범위와 브랜드 종합", "Scope & synthesis", ("scope", "source-brand-anatomy")),
    ("evidence", "근거 자료", "Evidence", ("evidence", "visual-corpus")),
    ("strategy", "브랜드 전략", "Strategy", ("strategy",)),
    ("verbal", "버벌 시스템", "Verbal system", ("verbal",)),
    ("identity-channel-tokens", "아이덴티티와 채널 토큰", "Identity & tokens", ("identity-channel-tokens",)),
    ("key-visual", "키 비주얼 시스템", "Key visual", ("key-visual",)),
    ("brand-mood", "브랜드 무드와 세계관", "Brand mood", ("brand-mood",)),
    ("photography-film", "사진과 영상", "Photography & film", ("photography-film",)),
    ("product-representation", "제품 표현", "Product representation", ("product-image-production", "product-representation")),
    ("product-native-visual-language", "제품 고유 시각·인지 문법", "Product-native language", ("intrinsic-product-visual-language", "product-native-visual-language")),
    ("product-interface-service", "제품·인터페이스·서비스 행동", "Product & service behavior", ("behavior", "behavior-service", "product-interface-service")),
    ("grammar", "브랜드 문법", "Grammar", ("grammar",)),
    ("global-brand-system-framework", "글로벌 브랜드 시스템", "Global brand system", ("global-brand-system-framework",)),
    ("gaps", "근거 공백과 반증 조건", "Gaps & limits", ("gaps", "gaps-audit")),
    ("evidence-index", "근거 인덱스", "Evidence index", ("evidence-index",)),
)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def yaml_scalar(text: str, key: str) -> str:
    match = re.search(rf"(?m)^\s*{re.escape(key)}:\s*(.*?)\s*$", text)
    return match.group(1).strip().strip("\"'") if match else ""


def hero_identity(case: Path, output: Path, brief: str, brand: str, lead: str, mode: str) -> str:
    background = yaml_scalar(brief, "hero_background_color")
    foreground = yaml_scalar(brief, "hero_foreground_color")
    color_layer = yaml_scalar(brief, "hero_color_layer")
    evidence_id = yaml_scalar(brief, "hero_logo_evidence_id")
    local_path = yaml_scalar(brief, "hero_logo_local_path")
    source_url = yaml_scalar(brief, "hero_logo_source_url")
    credit = yaml_scalar(brief, "hero_logo_credit")
    rights = yaml_scalar(brief, "hero_logo_rights_note")
    variant = yaml_scalar(brief, "hero_logo_variant") or "masterbrand logo"
    treatment = yaml_scalar(brief, "hero_logo_render_treatment") or "none"
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
        f'data-era="{html_lib.escape(yaml_scalar(brief, "era_end"), quote=True)}" '
        f'data-source-url="{html_lib.escape(source_url, quote=True)}" data-credit="{html_lib.escape(credit, quote=True)}" '
        f'data-rights-note="{html_lib.escape(rights, quote=True)}" data-logo-variant="{html_lib.escape(variant, quote=True)}"></div>'
    )
    return (
        f'<header class="masthead" style="--hero-bg:{background};--hero-fg:{foreground};--hero-logo-filter:{treatment}">'
        f'<div class="masthead__meta"><span>Source Brand Anatomy · {html_lib.escape(mode)}</span><span>HTML + JSON · source-only</span></div>'
        f'{logo}<div class="masthead__intro"><h1>{html_lib.escape(brand)}<br>Brand Anatomy</h1>'
        f'<p class="masthead__lead">{html_lib.escape(lead)}</p></div></header>'
    )


def extract_sections(source: str) -> dict[str, str]:
    matches = list(re.finditer(r"<section\b[^>]*\bid=[\"']([^\"']+)[\"'][^>]*>", source, re.I))
    sections: dict[str, str] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        fragment = source[match.end():end]
        closing = fragment.rfind("</section>")
        if closing >= 0:
            fragment = fragment[:closing]
        sections[match.group(1)] = fragment.strip()
    return sections


def strip_element(fragment: str, tag: str, class_name: str) -> str:
    pattern = rf"<{tag}\b(?=[^>]*class=[\"'][^\"']*\b{re.escape(class_name)}\b[^\"']*[\"'])[^>]*>.*?</{tag}>"
    return re.sub(pattern, "", fragment, flags=re.I | re.S)


def clean_fragment(fragment: str, section_id: str) -> str:
    fragment = re.sub(r"<aside\b[^>]*>.*?</aside>", "", fragment, flags=re.I | re.S)
    fragment = strip_element(fragment, "header", "section-head")
    fragment = strip_element(fragment, "div", "audit")
    fragment = strip_element(fragment, "div", "audit-score")
    fragment = re.sub(r"<p\b[^>]*>[^<]*(?:독립 감사 결과|독립 분석 감사|A5 점검)[^<]*</p>", "", fragment, flags=re.I)
    if section_id in {"gaps", "gaps-audit"}:
        fragment = re.sub(r"Gaps\s*&amp;\s*Audit|Gaps\s*&\s*Audit", "확인 범위", fragment, flags=re.I)
        fragment = re.sub(
            r"<p\b[^>]*class=[\"'][^\"']*lead[^\"']*[\"'][^>]*>.*?</p>",
            "<p class=\"lead\">확인한 근거와 아직 확인하지 못한 영역을 구분했습니다.</p>",
            fragment,
            count=1,
            flags=re.I | re.S,
        )
    fragment = re.sub(r"\b\d{2,3}\s*/\s*100\b", "", fragment)
    fragment = re.sub(r"\bPASS\s*[·|]\s*Critical failures?\s*0\b", "", fragment, flags=re.I)
    fragment = re.sub(r"<h1(\b[^>]*)>", r"<h3\1>", fragment, flags=re.I)
    fragment = re.sub(r"</h1>", "</h3>", fragment, flags=re.I)
    fragment = re.sub(r"<h2(\b[^>]*)>", r"<h3\1>", fragment, flags=re.I)
    fragment = re.sub(r"</h2>", "</h3>", fragment, flags=re.I)
    return fragment.strip()


def split_combined_strategy(fragment: str) -> tuple[str, str]:
    lead = re.search(r"<p\b[^>]*class=[\"'][^\"']*lead[^\"']*[\"'][^>]*>.*?</p>", fragment, re.I | re.S)
    cards = re.findall(r"<div\b[^>]*class=[\"'][^\"']*copy-card[^\"']*[\"'][^>]*>.*?</div>", fragment, re.I | re.S)
    strategy_cards = [card for card in cards if re.search(r"포지셔닝|category|audience|portfolio", card, re.I)]
    verbal_cards = [card for card in cards if card not in strategy_cards]
    if not strategy_cards or not verbal_cards:
        return fragment, ""
    strategy = '<div class="copy-grid">' + "".join(strategy_cards) + "</div>"
    verbal = (lead.group(0) if lead else "") + '<div class="copy-grid">' + "".join(verbal_cards) + "</div>"
    return strategy, verbal


def font_style(source: str) -> tuple[str, str, str]:
    faces = re.findall(r"@font-face\s*\{.*?\}", source, re.I | re.S)
    families = []
    for face in faces:
        match = re.search(r"font-family\s*:\s*[\"']?([^;\"'}]+)", face, re.I)
        if match and match.group(1).strip() not in families:
            families.append(match.group(1).strip())
    display = next((family for family in families if re.search(r"display|title|geologica", family, re.I)), families[0] if families else "Arial")
    text = next((family for family in families if re.search(r"\btext\b|\bui\b|\bkr\b", family, re.I)), display)
    css = "".join(faces)
    return css, display, text


def report_lead(source: str, sections: dict[str, str], fallback: str) -> str:
    patterns = (
        r"<p\b[^>]*class=[\"'][^\"']*(?:summary|masthead__lead)[^\"']*[\"'][^>]*>(.*?)</p>",
        r"<div\b[^>]*class=[\"'][^\"']*mast-title[^\"']*[\"'][^>]*>.*?<p[^>]*>(.*?)</p>",
        r"<p\b[^>]*class=[\"'][^\"']*lead[^\"']*[\"'][^>]*>(.*?)</p>",
    )
    haystack = source[: source.find("<section") if "<section" in source else len(source)] + sections.get("source-brand-anatomy", "") + sections.get("scope", "")
    for pattern in patterns:
        match = re.search(pattern, haystack, re.I | re.S)
        if match:
            plain = re.sub(r"<[^>]+>", " ", match.group(1))
            plain = html_lib.unescape(re.sub(r"\s+", " ", plain)).strip()
            if plain:
                return plain
    return fallback


def terminology_note(source: str) -> str:
    definitions = []
    if re.search(r"\bCMF\b", source):
        definitions.append("색·소재·마감(CMF)")
    if re.search(r"\bLUT\b", source):
        definitions.append("여러 사진이나 영상에 일정한 색감을 적용하는 색보정 기준표(LUT)")
    if re.search(r"\bHIG\b", source):
        definitions.append("화면 설계 지침(HIG, Human Interface Guidelines)")
    if re.search(r"\bHLS\b", source):
        definitions.append("공식 스트리밍 영상 형식(HLS)")
    if re.search(r"\bCSS\b", source):
        definitions.append("웹페이지 스타일 코드(CSS)")
    if not definitions:
        return ""
    return (
        '<section class="report-section terminology" data-layout-rail="compact">'
        '<aside class="section-rail"><span>00</span><b>Terms</b></aside><div class="section-body"><p>'
        + " · ".join(html_lib.escape(item) for item in definitions)
        + "</p></div></section>"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Migrate a legacy Korean source-brand report into the shared report shell without rewriting its findings.")
    parser.add_argument("analysis_directory")
    parser.add_argument("--source", default="outputs/source-brand-analysis.html")
    parser.add_argument("--output", default="outputs/source-brand-analysis-unified.html")
    args = parser.parse_args()

    case = Path(args.analysis_directory).expanduser().resolve()
    source_path = case / args.source
    output_path = case / args.output
    source = read(source_path)
    brief = read(case / "research-brief.yaml")
    sections = extract_sections(source)
    brand = yaml_scalar(brief, "name") or "Source brand"
    scope = yaml_scalar(brief, "entity_scope") or "Source-only brand analysis"
    mode = yaml_scalar(brief, "product_mode") or "mixed"

    if "strategy-verbal" in sections and "strategy" not in sections and "verbal" not in sections:
        combined = clean_fragment(sections["strategy-verbal"], "strategy-verbal")
        sections["strategy"], sections["verbal"] = split_combined_strategy(combined)
    if brand.lower() == "tesla" and "source-brand-anatomy" in sections and "evidence" not in sections:
        source_fragment = sections["source-brand-anatomy"]
        gallery = re.search(r"<div\b[^>]*class=[\"'][^\"']*gallery[^\"']*[\"'][^>]*>.*</div>\s*$", source_fragment, re.I | re.S)
        if gallery:
            sections["evidence"] = gallery.group(0)
            sections["source-brand-anatomy"] = source_fragment[:gallery.start()]
    if "source-brand-anatomy" not in sections and "scope" in sections:
        sections["source-brand-anatomy"] = sections["scope"]
        sections.pop("scope", None)

    rendered = []
    number = 1
    for section_id, title, rail, source_ids in GROUPS:
        fragments = []
        seen: set[str] = set()
        for source_id in source_ids:
            if source_id in seen or source_id not in sections:
                continue
            seen.add(source_id)
            fragment = clean_fragment(sections[source_id], source_id)
            if fragment:
                fragments.append(fragment)
        if not fragments:
            continue
        rendered.append(
            f'<section class="report-section" id="{section_id}" data-layout-rail="compact">'
            f'<aside class="section-rail"><span>{number:02d}</span><b>{html_lib.escape(rail)}</b></aside>'
            f'<div class="section-body"><h2>{html_lib.escape(title)}</h2>{"".join(fragments)}</div></section>'
        )
        number += 1

    structured = f'''<section class="report-section" id="structured-data-handoff" data-layout-rail="compact">
<aside class="section-rail"><span>{number:02d}</span><b>Structured handoff</b></aside><div class="section-body">
<h2>다음 단계용 구조화 데이터</h2><p>이 보고서의 핵심 판단은 <a href="source-brand-analysis.json">source-brand-analysis.json</a>에도 기록되어 있습니다. HTML은 맥락과 근거를 설명하고, JSON은 전환 계획이 직접 읽을 수 있도록 주장, 브랜드 문법, 디자인 시스템 관계, 근거, 예외와 공백을 명시합니다.</p>
<div class="copy-grid"><div class="copy-card"><h3>전환 계획 입력</h3><p>포지셔닝, 버벌, 키 비주얼, 브랜드 무드, 사진, 제품 표현, 제품 고유 시각·인지 문법과 복제 금지 경계를 함께 전달합니다.</p></div><div class="copy-card"><h3>후속 제작 입력</h3><p>신규 브랜드 단계에서는 같은 구조에 튜닝 근거와 구현 지침을 더한 뒤, 제품 사진과 랜딩 페이지 기획이 신규 브랜드 JSON을 사용합니다.</p></div></div></div></section>'''

    font_css, display, text = font_style(source)
    lead = report_lead(source, sections, scope)
    html = f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html_lib.escape(brand)} · Source Brand Anatomy</title><link rel="stylesheet" href="report.css"><style>{font_css}:root{{--display:"{html_lib.escape(display)}",Arial,sans-serif;--text:"{html_lib.escape(text)}",Arial,sans-serif}}</style></head>
<body><main class="report" data-report-template="source-brand-anatomy-v2">{hero_identity(case, output_path, brief, brand, lead, mode)}{terminology_note(source)}{''.join(rendered)}{structured}
<footer class="footer"><span>{html_lib.escape(brand)} · Research reference</span><span class="validation-summary">DETERMINISTIC COMPLETION CHECK</span></footer></main></body></html>'''
    output_path.parent.mkdir(parents=True, exist_ok=True)
    css_source = Path(__file__).resolve().parent.parent / "assets" / "report.css"
    shutil.copy2(css_source, output_path.parent / "report.css")
    output_path.write_text(html, encoding="utf-8")
    print(f"Unified: {output_path}")
    print(f"Sections: {len(rendered) + 1} · product mode: {mode}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
