#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path


SECTION_ORDER = [
    ("source_grammar_application", "Source-grammar application"),
    ("brand_positioning", "Target-brand positioning"),
    ("landing_product_concept", "Product family and lineup"),
    ("verbal_branding_and_copy_hierarchy", "Verbal branding and copy hierarchy"),
    ("visual_branding_and_key_visual", "Visual branding and key visual"),
    ("brand_mood_and_brand_imagery", "Brand mood and brand imagery"),
    ("product_visual_traits_and_product_imagery", "Product-native visual traits and imagery"),
    ("design_token_direction", "Landing-page design-token direction"),
]


def load(path: Path) -> dict:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"JSON root must be an object: {path}")
    return value


def label(value: str) -> str:
    return value.replace("_", " ").strip().capitalize()


def text(value) -> str:
    if value is None:
        return ""
    if isinstance(value, bool):
        return "Yes" if value else "No"
    return str(value)


def html_value(value, depth: int = 0) -> str:
    if isinstance(value, dict):
        return "".join(
            f'<div class="record"><h3>{html.escape(label(str(key)))}</h3>{html_value(item, depth + 1)}</div>'
            for key, item in value.items()
            if item not in (None, "", [], {})
        )
    if isinstance(value, list):
        if not value:
            return ""
        if all(not isinstance(item, (dict, list)) for item in value):
            return "<ul>" + "".join(f"<li>{html.escape(text(item))}</li>" for item in value) + "</ul>"
        return '<div class="cards">' + "".join(f'<div class="card">{html_value(item, depth + 1)}</div>' for item in value) + "</div>"
    return f"<p>{html.escape(text(value))}</p>"


def md_value(value, level: int = 3) -> str:
    if isinstance(value, dict):
        chunks: list[str] = []
        for key, item in value.items():
            if item in (None, "", [], {}):
                continue
            chunks.append(f"{'#' * min(level, 6)} {label(str(key))}\n\n{md_value(item, level + 1)}")
        return "\n\n".join(chunks)
    if isinstance(value, list):
        chunks = []
        for item in value:
            if isinstance(item, (dict, list)):
                chunks.append(md_value(item, level + 1))
            else:
                chunks.append(f"- {text(item)}")
        return "\n\n".join(chunks) if any(isinstance(item, (dict, list)) for item in value) else "\n".join(chunks)
    return text(value)


def colors(model: dict) -> tuple[str, str, str]:
    tokens = model.get("sections", {}).get("design_token_direction", {}).get("color", [])
    values: list[str] = []
    for token in tokens if isinstance(tokens, list) else []:
        if isinstance(token, dict):
            values.extend(re.findall(r"#[0-9a-fA-F]{6}", text(token.get("target_direction", ""))))
    background = values[0] if values else "#171918"
    accent = next((value for value in values[1:] if value.lower() != background.lower()), "#d8ff3e")
    foreground = "#ffffff" if sum(int(background[i : i + 2], 16) for i in (1, 3, 5)) < 390 else "#111111"
    return background, foreground, accent


def asset_figure(item: dict) -> str:
    asset_id = html.escape(text(item.get("asset_id")))
    file_path = text(item.get("file_path"))
    role = html.escape(label(text(item.get("role"))))
    job = html.escape(text(item.get("communication_job")))
    return (
        f'<figure class="asset"><img src="../{html.escape(file_path)}" alt="{asset_id} {role}">'
        f'<figcaption><span>{asset_id} · {role}</span><span>{html.escape(file_path)}</span></figcaption>'
        f'<p class="caption">{job}</p></figure>'
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Render Stage 2 Markdown and HTML from the canonical JSON model.")
    parser.add_argument("stage_2_directory")
    args = parser.parse_args()
    case = Path(args.stage_2_directory).expanduser().resolve()
    model = load(case / "outputs" / "extended-brand-anatomy.json")
    registry = load(case / "asset-registry.json")
    review = load(case / "stage-review.json")
    if model.get("artifact_type") != "extended_brand_anatomy":
        print("ERROR: canonical JSON is not extended_brand_anatomy")
        return 1

    target = model.get("target") if isinstance(model.get("target"), dict) else {}
    brand = text(target.get("working_name")) or "Working brand"
    category = text(target.get("category"))
    source = model.get("source_analysis") if isinstance(model.get("source_analysis"), dict) else {}
    sections = model.get("sections") if isinstance(model.get("sections"), dict) else {}
    assets = registry.get("assets") if isinstance(registry.get("assets"), list) else []
    assets_by_role = {text(item.get("role")): item for item in assets if isinstance(item, dict)}

    md_parts = [f"# Extended Brand Anatomy — {brand}", f"- Source brand: {text(source.get('brand'))}\n- Target category: {category}\n- Product mode: {text(target.get('product_mode'))}\n- Audience: {text(target.get('audience'))}"]
    for number, (key, title) in enumerate(SECTION_ORDER, 1):
        md_parts.append(f"## {number}. {title}\n\n{md_value(sections.get(key, {}), 3)}")
    md_parts.append("<!-- Unnumbered review checkpoint is rendered from stage-review.json. -->")
    (case / "extended-brand-anatomy.md").write_text("\n\n".join(md_parts).strip() + "\n", encoding="utf-8")

    bg, fg, accent = colors(model)
    section_html: list[str] = []
    for number, (key, title) in enumerate(SECTION_ORDER, 1):
        value = sections.get(key, {})
        extra = ""
        if key == "landing_product_concept" and isinstance(value, dict):
            lineup = value.get("product_lineup") if isinstance(value.get("product_lineup"), list) else []
            cards = "".join(
                f'<article class="product-card"><span>{html.escape(text(item.get("lineup_role")))}</span><h3>{html.escape(text(item.get("product_name")))}</h3><p>{html.escape(text(item.get("product_usp") or item.get("differentiator")))}</p></article>'
                for item in lineup if isinstance(item, dict)
            )
            extra = f'<div class="product-grid" data-product-lineup>{cards}</div>'
        if key == "brand_mood_and_brand_imagery" and "brand_mood" in assets_by_role:
            extra += asset_figure(assets_by_role["brand_mood"])
        if key == "product_visual_traits_and_product_imagery" and "representative_product_hero" in assets_by_role:
            extra += asset_figure(assets_by_role["representative_product_hero"])
        section_html.append(
            f'<section class="section" id="section-{number}"><div class="meta">{number:02d} / {html.escape(title)}</div><div class="body"><h2>{html.escape(title)}</h2>{html_value(value)}{extra}</div></section>'
        )

    prompt = " ".join(text(item) for item in review.get("adjustment_prompts", []) if item)
    status = text(review.get("status")) or "pending"
    document = f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(brand)} — Extended Brand Anatomy</title>
<style>:root{{--paper:#f3f1ea;--ink:#171918;--muted:#69706b;--line:#c9ccc5;--brand:{bg};--brand-ink:{fg};--accent:{accent};--pad:clamp(24px,5vw,72px)}}*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,"Helvetica Neue",sans-serif;line-height:1.5}}main{{display:grid;grid-template-columns:minmax(104px,13vw) minmax(0,1fr)}}aside{{position:sticky;top:0;height:100vh;padding:24px 18px;border-right:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between;font-size:10px;letter-spacing:.09em;text-transform:uppercase}}.section{{padding:var(--pad);border-bottom:1px solid var(--line);display:grid;grid-template-columns:minmax(118px,190px) minmax(0,1fr);gap:clamp(24px,6vw,96px)}}.hero{{min-height:78vh;align-items:end;background:var(--brand);color:var(--brand-ink)}}.meta{{font-size:10px;letter-spacing:.09em;text-transform:uppercase}}h1,h2{{margin:0 0 24px;line-height:1;letter-spacing:-.045em}}h1{{font-size:clamp(48px,7vw,100px)}}h2{{font-size:clamp(30px,4vw,58px)}}h3{{font-size:18px;margin:22px 0 8px}}p,li{{font-size:16px;max-width:820px}}.lede{{font-size:clamp(18px,2vw,27px);max-width:760px}}.record{{border-top:1px solid var(--line);padding:14px 0}}.record>.record{{margin-left:18px}}.cards,.product-grid{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}}.card,.product-card{{background:var(--paper);padding:20px}}.product-grid{{margin-top:28px}}.product-card span{{font-size:10px;text-transform:uppercase;letter-spacing:.08em}}.asset{{margin:30px 0 0}}.asset img{{width:100%;display:block;background:#ddd}}figcaption{{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding:9px 0;font-size:10px}}.caption{{font-size:13px;color:var(--muted)}}.checkpoint{{background:var(--ink);color:var(--paper)}}.checkpoint strong{{color:var(--accent)}}@media(max-width:850px){{main{{display:block}}aside{{position:relative;height:auto;flex-direction:row;border-right:0;border-bottom:1px solid var(--line)}}.section{{grid-template-columns:1fr}}}}@media(max-width:560px){{.cards,.product-grid{{grid-template-columns:1fr}}figcaption{{display:block}}}}</style></head>
<body><main><aside><span>{html.escape(brand)}<br>Extended anatomy</span><span>Stage 02</span></aside><article><section class="section hero"><div class="meta">Target brand</div><div class="body"><h1>{html.escape(brand)}</h1><p class="lede">{html.escape(category)}</p><p>{html.escape(text(target.get('audience')))}</p></div></section>{''.join(section_html)}<section class="section checkpoint" data-review-checkpoint><div class="meta">Review checkpoint</div><div class="body"><h2><strong>{html.escape(status)}</strong></h2><p>{html.escape(prompt)}</p></div></section></article></main></body></html>'''
    output = case / "outputs" / "extended-brand-anatomy.html"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8")
    print(f"RENDERED_MD={case / 'extended-brand-anatomy.md'}")
    print(f"RENDERED_HTML={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
