#!/usr/bin/env python3
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


PACKAGE = Path(__file__).resolve().parents[1]
MODEL_PATH = PACKAGE / "outputs" / "extended-brand-anatomy.json"
REVIEW_PATH = PACKAGE / "stage-review.json"
MARKDOWN_PATH = PACKAGE / "extended-brand-anatomy.md"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


model = load(MODEL_PATH)
review = load(REVIEW_PATH)
sections = model["sections"]
landing = sections["landing_product_concept"]
brand_mood = sections["brand_mood_and_brand_imagery"]
product_visual = sections["product_visual_traits_and_product_imagery"]


products = [
    {
        "slug": "thyme-honey",
        "product": "Thyme Honey",
        "asset_id": "ST2-PRODUCT-THYME-HONEY-02",
        "file": "mora-thyme-honey-frontal.png",
        "prompt": "ST2-PRODUCT-THYME-HONEY-02.md",
        "marker": "#B9832F",
        "trace": "thin honey ribbon and sparse thyme flecks inside the spoon cut",
        "job": "대표 레시피의 꿀 리본, 타임 입자, 되직한 한 컵 사용을 정면 비교 규칙 안에서 보여 준다.",
    },
    {
        "slug": "fig-leaf",
        "product": "Fig Leaf",
        "asset_id": "ST2-PRODUCT-FIG-LEAF-02",
        "file": "mora-fig-leaf-frontal.png",
        "prompt": "ST2-PRODUCT-FIG-LEAF-02.md",
        "marker": "#68765F",
        "trace": "near-ivory yogurt and a restrained green-beige internal vein",
        "job": "거의 미색인 요거트와 절제된 그린-베이지 흔적으로 잎 중심 방향을 과장 없이 구분한다.",
    },
    {
        "slug": "roasted-buckwheat",
        "product": "Roasted Buckwheat",
        "asset_id": "ST2-PRODUCT-ROASTED-BUCKWHEAT-02",
        "file": "mora-roasted-buckwheat-frontal.png",
        "prompt": "ST2-PRODUCT-ROASTED-BUCKWHEAT-02.md",
        "marker": "#8A684C",
        "trace": "warm cream yogurt with fine toasted buckwheat particles at two depths",
        "job": "볶은 메밀의 미세 입자가 표면과 스푼 단면에 함께 남는 가장 촉각적인 제품을 보여 준다.",
    },
    {
        "slug": "citrus-peel",
        "product": "Citrus Peel",
        "asset_id": "ST2-PRODUCT-CITRUS-PEEL-02",
        "file": "mora-citrus-peel-frontal.png",
        "prompt": "ST2-PRODUCT-CITRUS-PEEL-02.md",
        "marker": "#C96B3C",
        "trace": "fine yellow-orange peel threads embedded through ivory yogurt",
        "job": "감귤 껍질의 가는 선이 표면 장식이 아니라 요거트 안쪽까지 이어지는 밝은 방향을 보여 준다.",
    },
    {
        "slug": "black-sesame",
        "product": "Black Sesame",
        "asset_id": "ST2-PRODUCT-BLACK-SESAME-02",
        "file": "mora-black-sesame-frontal.png",
        "prompt": "ST2-PRODUCT-BLACK-SESAME-02.md",
        "marker": "#4B4A4D",
        "trace": "ivory and stone-gray marbling with fine black sesame particles",
        "job": "밝은 요거트를 남긴 회색 마블과 검은깨 입자로 라인업의 깊은 디저트 끝점을 보여 준다.",
    },
    {
        "slug": "olive-oil-sea-salt",
        "product": "Olive Oil & Sea Salt",
        "asset_id": "ST2-PRODUCT-OLIVE-OIL-SEA-SALT-02",
        "file": "mora-olive-oil-sea-salt-frontal.png",
        "prompt": "ST2-PRODUCT-OLIVE-OIL-SEA-SALT-02.md",
        "marker": "#7A7040",
        "trace": "directional olive-gold oil ribbon, pearly interface and actual-scale salt cue",
        "job": "오일과 요거트의 얇은 접면, 제한된 소금 흔적, 작은 곁들임으로 세이보리 방향을 설명한다.",
    },
]


existing_ids = {
    item.get("asset_id")
    for item in brand_mood.get("supporting_series", [])
    if isinstance(item, dict)
}
if existing_ids.intersection(item["asset_id"] for item in products):
    raise RuntimeError("Product supporting photos already exist in the canonical model")

shared_invariants = [
    "same low-wide 150 g matte warm-ivory MORA cup and front information hierarchy",
    "exact 0-degree frontal azimuth with only 15–18-degree downward elevation",
    "same square crop, cup scale, lid position, spoon position, camera family and warm neutral set",
    "only product name, local 5–8% recipe locator, edible trace and one restrained ingredient/use cue change",
    "open yogurt surface, deep spoon furrow and one spoonful remain fully legible",
    "no apothecary, fragrance, laboratory, rustic, wellness-claim or Le Labo identity cues",
]

asset_records = []
for item in products:
    file_path = f"assets/product-series/{item['file']}"
    prompt_path = f"prompts/{item['prompt']}"
    for relative in (file_path, prompt_path):
        if not (PACKAGE / relative).is_file():
            raise FileNotFoundError(relative)
    record = {
        "asset_id": item["asset_id"],
        "role": "product_lineup_portrait",
        "series_role": item["slug"],
        "communication_job": item["job"],
        "file_path": file_path,
        "prompt_path": prompt_path,
        "subject": f"MORA {item['product']} open 150 g Greek-yogurt cup, frontal lineup portrait",
        "aspect_ratio": "1:1 square",
        "generation_provenance": "OpenAI built-in image generation; generated 2026-08-25 with the registered MORA Thyme Honey hero as cup, typography, material and lighting reference. First-batch lid artwork was corrected with a single-axis image edit where needed.",
        "reference_lineage": [
            "GK-01",
            "GK-02",
            "GK-05",
            "One Cup, One Trace",
            "sections.landing_product_concept.product_lineup",
            "sections.product_visual_traits_and_product_imagery.lineup_visual_map",
        ],
        "invariants": shared_invariants + [
            f"recipe locator remains local and uses {item['marker']}",
            item["trace"],
        ],
        "allowed_variation": [
            "minor natural variation in yogurt ridges, embedded traces and ingredient position",
            "responsive crop that preserves the full cup, exact pack text, open surface and spoon",
        ],
        "invariant_check": "pass",
        "status": "registered",
    }
    asset_records.append(record)

brand_mood.setdefault("supporting_series", []).extend(asset_records)
product_visual["supporting_product_series"] = {
    "series_name": "One Cup, Six Traces",
    "communication_job": "같은 정면 방위·컵 크기·열린 상태·스푼 위치에서 여섯 레시피의 실제 내용물 흔적과 기능적 식별 마커만 비교한다.",
    "view_rule": "0-degree frontal azimuth, 15–18-degree downward elevation, square 1:1, 65–75 mm equivalent, centered cup",
    "fixed_invariants": shared_invariants,
    "controlled_variables": [
        "exact product name",
        "one local ingredient-derived locator color",
        "verified or explicitly directional edible trace",
        "one restrained ingredient or use cue",
    ],
    "product_assets": [
        {
            "product": item["product"],
            "asset_id": item["asset_id"],
            "marker": item["marker"],
            "edible_trace": item["trace"],
            "status": "generated_and_qa_passed",
        }
        for item in products
    ],
    "qa": [
        "All six product names are correctly spelled and MORA is unchanged.",
        "Cup front faces remain parallel to the sensor and product scale is comparable.",
        "The open yogurt surface, spoon furrow and spoonful explain what the product is and how it is used.",
        "Ingredient color remains a narrow functional locator rather than a global brand accent.",
        "Food texture differs by recipe without unverified health, origin or process claims.",
    ],
    "status": "generated_and_qa_passed",
}

asset_by_product = {item["product"]: item["asset_id"] for item in products}
for lineup_item in landing["product_lineup"]:
    lineup_item["supporting_product_photo"] = asset_by_product[lineup_item["product_name"]]

model["moodboard_inputs"]["product_image_generation"].append(
    "One Cup, Six Traces — six square frontal product portraits with fixed cup geometry, open yogurt surface, spoon and local recipe marker"
)
model["generated_at"] = datetime.now(timezone.utc).isoformat()

review["status"] = "pending"
review["adjustment_prompts"] = [
    "6종 제품 정면 사진, strict frontal / strict side 브랜드 무드 쌍, Olive Oil & Sea Salt 콘셉트에서 조정할 부분이 있습니까? 없으면 다음 단계로 진행합니다."
]
review["updated_at"] = datetime.now(timezone.utc).isoformat()

dump(MODEL_PATH, model)
dump(REVIEW_PATH, review)

markdown = MARKDOWN_PATH.read_text(encoding="utf-8")
old = "- Image roles: hero form, feature detail, use interaction, state proof, six-product comparison.\n\n## 8. Landing-page design-token direction"
rows = [
    "- Image roles: hero form, feature detail, use interaction, state proof, six-product comparison.",
    "",
    "### One Cup, Six Traces — generated product-photo series",
    "",
    "| Product | View | Functional marker | Product photo |",
    "|---|---|---|---|",
]
for item in products:
    rows.append(
        f"| {item['product']} | 0° frontal azimuth / 15–18° elevation | {item['marker']} | assets/product-series/{item['file']} |"
    )
rows.extend(["", "## 8. Landing-page design-token direction"])
new = "\n".join(rows)
if old not in markdown:
    raise RuntimeError("Markdown product-image insertion point not found")
MARKDOWN_PATH.write_text(markdown.replace(old, new, 1), encoding="utf-8")

print(f"WROTE {MODEL_PATH}")
print(f"WROTE {REVIEW_PATH}")
print(f"WROTE {MARKDOWN_PATH}")
print(f"PRODUCT_SUPPORTING_ASSETS={len(asset_records)}")
