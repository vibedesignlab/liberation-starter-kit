#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import json
from pathlib import Path


def load(path: Path) -> dict:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"JSON root must be an object: {path}")
    return value


def text(value) -> str:
    return "" if value is None else str(value)


def list_html(items) -> str:
    return "<ul>" + "".join(f"<li>{html.escape(text(item))}</li>" for item in items or []) + "</ul>"


def asset_handoff(asset: dict) -> str:
    asset_id = text(asset.get("asset_id"))
    file_path = text(asset.get("file_path"))
    prompt_path = text(asset.get("prompt_path"))
    status = text(asset.get("status")) or "pending_generation"
    media = (
        f'<img src="../{html.escape(file_path)}" alt="{html.escape(asset_id)} {html.escape(text(asset.get("product_name")))}">'
        if file_path and status == "registered"
        else f'<div class="pending-asset"><strong>{html.escape(status)}</strong><span>Prompt ready · image generation is a separate handoff</span></div>'
    )
    return f'<figure class="asset">{media}<figcaption><span>{html.escape(asset_id)} · {html.escape(text(asset.get("product_name")))}</span><span>{html.escape(prompt_path)}</span></figcaption></figure>'


def main() -> int:
    parser = argparse.ArgumentParser(description="Render Stage 3 Markdown and HTML from the canonical JSON model.")
    parser.add_argument("stage_3_directory")
    args = parser.parse_args()
    case = Path(args.stage_3_directory).expanduser().resolve()
    model = load(case / "outputs" / "landing-materials.json")
    registry = load(case / "asset-registry.json")
    review = load(case / "stage-review.json")
    if model.get("artifact_type") != "landing_materials":
        print("ERROR: canonical JSON is not landing_materials")
        return 1

    narrative = model.get("landing_narrative") if isinstance(model.get("landing_narrative"), dict) else {}
    values = model.get("brand_value") if isinstance(model.get("brand_value"), dict) else {}
    story = model.get("brand_story") if isinstance(model.get("brand_story"), dict) else {}
    family = model.get("product_introduction") if isinstance(model.get("product_introduction"), dict) else {}
    products = model.get("product_lineup_copy") if isinstance(model.get("product_lineup_copy"), list) else []
    section_map = model.get("section_map") if isinstance(model.get("section_map"), list) else []
    assets = registry.get("assets") if isinstance(registry.get("assets"), list) else []
    assets_by_id = {text(item.get("asset_id")): item for item in assets if isinstance(item, dict)}
    brand = text(family.get("family_name")) or text(narrative.get("hero_eyebrow")) or "Working brand"

    md_products = []
    for product in products:
        if not isinstance(product, dict):
            continue
        md_products.append(
            "| {product_name} | {product_usp} | {eyebrow} | {headline} | {description} | {features} | {proof_copy} | {cta} |".format(
                product_name=text(product.get("product_name")),
                product_usp=text(product.get("product_usp")),
                eyebrow=text(product.get("eyebrow")),
                headline=text(product.get("headline")),
                description=text(product.get("description")).replace("|", "\\|"),
                features=" / ".join(text(item) for item in product.get("feature_copy", [])),
                proof_copy=text(product.get("proof_copy")).replace("|", "\\|"),
                cta=text(product.get("cta")),
            )
        )
    md_map = []
    for item in section_map:
        if isinstance(item, dict):
            md_map.append("| {section} | {communication_job} | {copy} | {proof_of} | {asset_id} | {cta} |".format(**{key: text(item.get(key)).replace("|", "\\|") for key in ("section", "communication_job", "copy", "proof_of", "asset_id", "cta")}))
    md_assets = []
    for item in assets:
        if not isinstance(item, dict):
            continue
        md_assets.append(
            "| {asset_id} | {product_name} | {role} | {prompt_path} | {reference_lineage} | {status} |".format(
                asset_id=text(item.get("asset_id")),
                product_name=text(item.get("product_name")),
                role=text(item.get("role")),
                prompt_path=text(item.get("prompt_path")),
                reference_lineage=" / ".join(text(value) for value in item.get("reference_lineage", [])),
                status=text(item.get("status")),
            )
        )
    md = f"""# Landing Materials — {brand}

## 1. Landing narrative and hierarchy

- Selected narrative route: {text(model.get('selected_narrative_route'))}
- Brand message: **{text(narrative.get('brand_message'))}**
- Hero eyebrow: {text(narrative.get('hero_eyebrow'))}
- Hero headline: {text(narrative.get('hero_headline'))}
- Hero support: {text(narrative.get('hero_support'))}
- Section sequence: {' → '.join(text(item) for item in narrative.get('section_sequence', []))}
- Primary CTA: {text(narrative.get('primary_cta'))}

## 2. Brand value copy

- Value statement: {text(values.get('statement'))}
- Values: {' / '.join(text(item.get('name')) if isinstance(item, dict) else text(item) for item in values.get('values', []))}
- Supporting proof: {' / '.join(text(item) for item in values.get('proof', []))}
- Short-form variants: {' / '.join(text(item) for item in values.get('short_variants', []))}

## 3. Brand story copy

- Story headline: {text(story.get('headline'))}
- Story body: {text(story.get('body'))}
- Product connection: {text(story.get('product_connection'))}

## 4. Product-family introduction

- Family name: {text(family.get('family_name'))}
- Headline: {text(family.get('headline'))}
- Description: {text(family.get('description'))}
- Shared promise: {text(family.get('shared_promise'))}
- Family USP: {text(family.get('family_usp'))}

## 5. Product-lineup copy

| Product | Product USP | Eyebrow | Headline | Description | Feature copy | Proof copy | CTA |
|---|---|---|---|---|---|---|---|
{chr(10).join(md_products)}

## 6. Product-image prompt handoffs and landing-section mapping

| Section | Communication job | Copy | Proof of | Asset ID | CTA / next action |
|---|---|---|---|---|---|
{chr(10).join(md_map)}

### Pending image assets

| Asset ID | Product | UI role | Prompt path | Reference lineage | Status |
|---|---|---|---|---|---|
{chr(10).join(md_assets)}

<!-- Unnumbered review checkpoint is rendered from stage-review.json. -->
"""
    (case / "landing-materials.md").write_text(md, encoding="utf-8")

    value_cards = "".join(
        f'<article class="card"><h3>{html.escape(text(item.get("name")))}</h3><p>{html.escape(text(item.get("copy") or item.get("meaning")))}</p></article>'
        for item in values.get("values", []) if isinstance(item, dict)
    )
    family_cards = "".join(
        f'<article class="card"><span>{html.escape(text(product.get("eyebrow")))}</span><h3>{html.escape(text(product.get("product_name")))}</h3><p>{html.escape(text(product.get("product_usp")))}</p></article>'
        for product in products if isinstance(product, dict)
    )
    product_cards: list[str] = []
    product_figures: list[str] = []
    for index, product in enumerate(products, 5):
        if not isinstance(product, dict):
            continue
        product_name = text(product.get("product_name"))
        asset = next((item for item in assets if isinstance(item, dict) and text(item.get("product_name")) == product_name), None)
        if asset is None:
            mapped = next((item for item in section_map if isinstance(item, dict) and product_name in text(item.get("section"))), {})
            asset = assets_by_id.get(text(mapped.get("asset_id")))
        figure = asset_handoff(asset) if isinstance(asset, dict) else ""
        product_cards.append(
            f'<article class="product-card"><span class="eyebrow">{html.escape(text(product.get("eyebrow")))}</span><h3>{html.escape(product_name)}</h3><h4>{html.escape(text(product.get("headline")))}</h4><p>{html.escape(text(product.get("description")))}</p>{list_html(product.get("feature_copy", []))}<p class="proof">{html.escape(text(product.get("proof_copy")))}</p><span class="cta">{html.escape(text(product.get("cta")))}</span></article>'
        )
        if figure:
            product_figures.append(figure)

    map_cards = "".join(
        f'<article class="map-card"><span>{html.escape(text(item.get("section")))}</span><h3>{html.escape(text(item.get("communication_job")))}</h3><p>{html.escape(text(item.get("copy")))}</p><p class="proof">Proof: {html.escape(text(item.get("proof_of")))}</p><p class="proof">{html.escape(text(item.get("asset_id")))} · {html.escape(text(item.get("cta")))}</p></article>'
        for item in section_map if isinstance(item, dict)
    )

    prompt = " ".join(text(item) for item in review.get("adjustment_prompts", []) if item)
    document = f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(brand)} — Landing Materials</title><style>:root{{--paper:#f3f1ea;--ink:#171918;--muted:#69706b;--line:#c9ccc5;--accent:#d8ff3e;--pad:clamp(24px,5vw,72px)}}*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:Arial,"Helvetica Neue",sans-serif;line-height:1.5}}main{{display:grid;grid-template-columns:minmax(104px,13vw) minmax(0,1fr)}}aside{{position:sticky;top:0;height:100vh;padding:24px 18px;border-right:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between;font-size:10px;letter-spacing:.09em;text-transform:uppercase}}.section{{padding:var(--pad);border-bottom:1px solid var(--line);display:grid;grid-template-columns:minmax(118px,190px) minmax(0,1fr);gap:clamp(24px,6vw,96px)}}.hero{{min-height:80vh;align-items:end;background:var(--ink);color:var(--paper)}}.meta,.eyebrow,.card span,.map-card span{{font-size:10px;letter-spacing:.09em;text-transform:uppercase}}h1,h2{{margin:0 0 24px;line-height:1;letter-spacing:-.045em}}h1{{font-size:clamp(48px,7vw,100px)}}h2{{font-size:clamp(30px,4vw,58px)}}h3{{font-size:19px;margin:18px 0 8px}}h4{{font-size:24px;line-height:1.1;margin:18px 0}}p,li{{font-size:16px;max-width:820px}}.lede{{font-size:clamp(18px,2vw,27px);max-width:760px}}.grid,.product-grid,.asset-grid,.map-grid{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line)}}.grid{{grid-template-columns:repeat(3,minmax(0,1fr))}}.card,.product-card,.map-card{{background:var(--paper);padding:20px}}.asset{{margin:0;background:var(--paper)}}.asset img{{width:100%;height:auto;display:block;background:#ddd}}.pending-asset{{aspect-ratio:4/3;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:24px;background:#e6e6df;color:var(--muted)}}figcaption{{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding:9px;font-size:10px}}.proof{{font-size:13px;color:var(--muted)}}.cta{{display:inline-block;margin-top:18px;padding:12px 16px;background:var(--accent);font-size:12px;font-weight:700}}.checkpoint{{background:var(--ink);color:var(--paper)}}@media(max-width:850px){{main{{display:block}}aside{{position:relative;height:auto;flex-direction:row;border-right:0;border-bottom:1px solid var(--line)}}.section{{grid-template-columns:1fr}}}}@media(max-width:600px){{.grid,.product-grid,.asset-grid,.map-grid{{grid-template-columns:1fr}}figcaption{{display:block}}}}</style></head><body><main><aside><span>{html.escape(brand)}<br>Landing materials</span><span>Stage 03</span></aside><article><section class="section hero" id="section-1"><div class="meta">01 / Narrative</div><div class="body"><span class="eyebrow">{html.escape(text(narrative.get('hero_eyebrow')))}</span><h1>{html.escape(text(narrative.get('hero_headline')))}</h1><p class="lede">{html.escape(text(narrative.get('hero_support')))}</p><span class="cta">{html.escape(text(narrative.get('primary_cta')))}</span></div></section><section class="section" id="section-2"><div class="meta">02 / Values</div><div class="body"><h2>{html.escape(text(values.get('statement')))}</h2><div class="grid">{value_cards}</div>{list_html(values.get('proof', []))}</div></section><section class="section" id="section-3"><div class="meta">03 / Story</div><div class="body"><h2>{html.escape(text(story.get('headline')))}</h2><p>{html.escape(text(story.get('body')))}</p><p>{html.escape(text(story.get('product_connection')))}</p></div></section><section class="section" id="section-4"><div class="meta">04 / Family</div><div class="body"><h2>{html.escape(text(family.get('headline')))}</h2><p>{html.escape(text(family.get('description')))}</p><div class="grid">{family_cards}</div></div></section><section class="section" id="section-5"><div class="meta">05 / Product lineup</div><div class="body"><h2>Product-lineup copy</h2><div class="product-grid">{''.join(product_cards)}</div></div></section><section class="section" id="section-6"><div class="meta">06 / Image prompts and map</div><div class="body"><h2>Product-image prompt handoffs</h2><div class="asset-grid">{''.join(product_figures)}</div><h2>Landing-section mapping</h2><div class="map-grid">{map_cards}</div></div></section><section class="section checkpoint" data-review-checkpoint><div class="meta">Review checkpoint</div><div class="body"><h2>{html.escape(text(review.get('status')) or 'pending')}</h2><p>{html.escape(prompt)}</p></div></section></article></main></body></html>'''
    output = case / "outputs" / "landing-materials.html"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8")
    print(f"RENDERED_MD={case / 'landing-materials.md'}")
    print(f"RENDERED_HTML={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
