#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path


PACKAGE = Path(__file__).resolve().parents[1]
WORK = PACKAGE / ".work"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def path_parts(path: str) -> list[str | int]:
    parts: list[str | int] = []
    for key, index in re.findall(r"(?:^|\.)([^.\[]+)|\[(\d+)\]", path):
        parts.append(int(index) if index else key)
    return parts


def get_path(root, path: str):
    current = root
    for part in path_parts(path):
        current = current[part]
    return current


def set_path(root, path: str, value) -> None:
    parts = path_parts(path)
    current = root
    for part in parts[:-1]:
        current = current[part]
    current[parts[-1]] = value


model_path = PACKAGE / "outputs" / "extended-brand-anatomy.json"
registry_path = PACKAGE / "asset-registry.json"
review_path = PACKAGE / "stage-review.json"

model = load(model_path)
registry = load(registry_path)
review = load(review_path)
product = load(WORK / "revision2_product_extension" / "shard.json")
verbal = load(WORK / "revision2_verbal_extension" / "shard.json")
visual = load(WORK / "revision2_mood_shot_system" / "shard.json")


# Apply the strategy shard's exact, auditable five-to-six and durable-copy edits first.
replacement_failures = []
for replacement in verbal["exact_replacement_map"]:
    path = replacement["json_path"]
    actual = get_path(model, path)
    if actual != replacement["old"]:
        replacement_failures.append({"path": path, "expected": replacement["old"], "actual": actual})
        continue
    set_path(model, path, replacement["new"])

if replacement_failures:
    raise RuntimeError("Exact replacement preconditions failed:\n" + json.dumps(replacement_failures, ensure_ascii=False, indent=2))


sections = model["sections"]
landing = sections["landing_product_concept"]
verbal_section = sections["verbal_branding_and_copy_hierarchy"]
key_visual = sections["visual_branding_and_key_visual"]
brand_mood = sections["brand_mood_and_brand_imagery"]
product_visual = sections["product_visual_traits_and_product_imagery"]
tokens = sections["design_token_direction"]


# Extend the family to six products using the product specialist's food-native detail.
new_product = product["new_product"]
if any(item["product_name"] == new_product["product_name"] for item in landing["product_lineup"]):
    raise RuntimeError("Olive Oil & Sea Salt already exists in canonical lineup")
landing["product_lineup"].append(new_product)

family_updates = product["minimal_family_updates"]
landing["product_family"]["shared_architecture"] = family_updates["shared_architecture"]["to"]
landing["product_family"]["shared_architecture"] = landing["product_family"]["shared_architecture"].replace(
    "다섯 제품이 아침·간식·작은 디저트 안에서 차이를 만들고 Olive Oil & Sea Salt가 동일 구조를 식사 곁의 세이보리 순간까지 확장한다.",
    "허브·그린·토스티드·브라이트·딥 방향이 아침·간식·작은 디저트 안에서 차이를 만들고, 세이보리 방향의 Olive Oil & Sea Salt가 동일 구조를 식사 곁까지 확장한다.",
)
landing["product_family"]["shared_invariants"][2] = family_updates["shared_invariants"]["replacement"]
landing["product_family"]["cognitive_invariants"][2] = family_updates["cognitive_invariants"]["replacement"]
landing["product_family"]["differentiation_logic"] = {
    key: item["value"] for key, item in family_updates["differentiation_logic"].items()
}
feature_index = next(
    index for index, feature in enumerate(landing["landing_features"])
    if feature["name"] in {"다섯 가지 감각 좌표", "여섯 가지 감각 좌표"}
)
landing["landing_features"][feature_index] = family_updates["landing_features"]["replacement"]
landing["necessary_variants"] = family_updates["necessary_variants"]["resulting_value"]
landing["form_cues"]["shared"] = landing["product_family"]["shared_invariants"]
landing["proof_image_roles"] = family_updates["proof_image_roles"]["resulting_value"]

verbal_section["product_usps"].append({
    "product_name": verbal["new_product"]["product_name"],
    "usp": verbal["new_product"]["product_usp"],
})
verbal_section["cta_direction"].append("Olive Oil & Sea Salt 보기")
verbal_section["message_hierarchy"] = verbal["message_hierarchy_revision"]
verbal_section["family_usp"] = verbal["family_usp_revision"]["primary"]
verbal_section["message_visual_map"].update({
    "brand_message_to_key_visual": verbal["message_to_visual_map_revision"]["brand_message_to_key_visual"],
    "family_and_product_usp_to_product_imagery": [
        verbal["message_to_visual_map_revision"]["family_usp_to_lineup"],
        verbal["message_to_visual_map_revision"]["olive_oil_sea_salt_to_product_imagery"],
        verbal["message_to_visual_map_revision"]["proof_rule"],
    ],
    "brand_mood_series": verbal["message_to_visual_map_revision"]["brand_mood_to_message"],
})

selected = next(route for route in verbal_section["narrative_routes"] if route["route_id"] == "NR-01")
selected.update({
    "summary": verbal["selected_narrative_revision"]["revised_summary"],
    "opening_copy": verbal["selected_narrative_revision"]["opening_copy"],
    "sequence": verbal["selected_narrative_revision"]["revised_sequence"],
    "risk": verbal["selected_narrative_revision"]["risk"],
})
selected["mitigation"] = verbal["selected_narrative_revision"]["mitigation"]


# Add the sixth product to the product-image system and keep the identifier strictly functional.
olive_map = dict(family_updates["necessary_product_visual_map_entry"])
olive_map["identifier_color"] = "#7A7040"
olive_map["color_use"] = "narrow identifier field, comparison legend and recipe locator only; local surface 5–8% maximum"
product_visual["lineup_visual_map"].append(olive_map)
product_visual["truth_boundaries"].extend(product["claim_and_trade_dress_boundaries"])
product_visual["product_image_direction"]["use_interaction"].append(
    "Olive Oil & Sea Salt는 검증된 경우에만 작은 bread 또는 vegetable cue 하나를 컵 가장자리에 두며, 완성 식사나 meal-replacement 장면은 만들지 않는다."
)

olive_color = visual["proposed_canonical_updates"]["design_token_direction_delta"]["color"][0]
if any(item["token"] == olive_color["token"] for item in tokens["color"]):
    raise RuntimeError("Olive Oil & Sea Salt color token already exists")
tokens["color"].append(olive_color)


# Replace the old 3/4 mood direction with the generated orthogonal pair.
mood_update = visual["proposed_canonical_updates"]["brand_mood_and_brand_imagery"]
for field in (
    "key_insight",
    "communication_job",
    "emotional_and_cultural_register",
    "world_setting_people",
    "materials_and_sensory_cues",
    "camera_light_color",
    "image_series_roles",
    "series_rule",
    "avoid",
):
    brand_mood[field] = mood_update[field]

brand_mood["anchor_asset"] = "ST2-BRAND-MOOD-01"
brand_mood["supporting_asset"] = "ST2-BRAND-MOOD-SIDE-02"
brand_mood["asset_status"] = "generated_and_qa_passed"
brand_mood["status"] = "directional_revision"
brand_mood["strict_axis_series"] = verbal["strict_axis_brand_mood_series"]
brand_mood["series_lock"] = visual["mood_shot_series"]["series_lock"]
brand_mood["shot_system"] = {
    "series_name": visual["mood_shot_series"]["series_name"],
    "sequence_read": visual["mood_shot_series"]["sequence_read"],
    "set_coordinate_system": visual["mood_shot_series"]["set_coordinate_system"],
    "frame_a_frontal": visual["mood_shot_series"]["frame_a_frontal"],
    "frame_b_side": visual["mood_shot_series"]["frame_b_side"],
    "dramatic_motivated_light": visual["mood_shot_series"]["dramatic_motivated_light"],
    "crop_system": visual["mood_shot_series"]["crop_system"],
    "physical_and_visual_QA": visual["mood_shot_series"]["physical_and_visual_QA"],
}
brand_mood["generated_anchor_fit"] = [
    "후면 벽·선반·작업대가 이미지 평면과 평행하고, maker의 양어깨와 볼이 중앙 정면축에 놓인다.",
    "피처에서 요거트까지 이어지는 타임 허니 줄기, 양손, 볼과 음식 표면이 한 동작으로 연결된다.",
    "강한 방향광이 현대적 긴장감을 만들되 피부·차콜 직물·흰 요거트의 디테일이 보존된다.",
]

side_asset = {
    "asset_id": "ST2-BRAND-MOOD-SIDE-02",
    "role": "brand_mood_supporting_side_profile",
    "communication_job": "동일 maker와 같은 타임 허니 붓기 동작을 엄격한 90도 측면에서 보여 피처, 줄기, 요거트 접점, 손의 지지 관계를 물리적 증거로 설명한다.",
    "file_path": "assets/brand-mood/mora-infusion-side-v2.png",
    "prompt_path": "prompts/ST2-BRAND-MOOD-SIDE-02.md",
    "subject": "Same food maker in charcoal apron, strict right-side profile, pouring thyme-honey infusion into dense strained yogurt",
    "aspect_ratio": "3:2 landscape",
    "generation_provenance": "OpenAI built-in image generation; generated 2026-08-25 with the prior MORA infusion image as identity, wardrobe, workspace and material reference.",
    "reference_lineage": [
        "GK-02",
        "GK-03",
        "ST2-BRAND-MOOD-01 series lock",
        "transfer-input.visual_priority",
        "target value: 보이는 재료성",
        "target value: 차분한 정확성",
    ],
    "invariants": [
        "same maker, charcoal apron, bowl, glass pitcher, thyme honey and modern food atelier as the frontal anchor",
        "strict 90-degree right-side profile with no frontal face or three-quarter torso",
        "pitcher, continuous stream, contact point and bowl visible in one lateral action plane",
        "same eye-level camera family and motivated directional daylight as the frontal anchor",
        "no laboratory, apothecary, fragrance, vintage or Le Labo identity cues",
    ],
    "allowed_variation": [
        "responsive crops that preserve profile clearance and the complete action chain",
        "minor natural yogurt, thyme and cloth irregularity",
    ],
    "invariant_check": "pass",
    "status": "registered",
}
brand_mood["supporting_series"] = [side_asset]

key_update = visual["proposed_canonical_updates"]["visual_branding_and_key_visual"]
for field in ("key_insight", "communication_job"):
    key_visual[field] = key_update[field]
key_visual["mood_series_relationship"] = key_update["visual_direction_text"]
key_visual["type_message_image_product_ui_relationship"].extend(key_update["type_image_product_ui_relationship_delta"])
key_visual["surface_translation"].update(key_update["surface_translation_delta"])


# Update moodboard and factual boundaries for the expanded range and generated image pair.
model["moodboard_inputs"]["copywriting"]["family_usp"] = verbal["family_usp_revision"]["short_form"]
model["moodboard_inputs"]["brand_mood_images"] = visual["proposed_canonical_updates"]["moodboard_inputs_delta"]["brand_mood_images"] + [
    "도시 창가의 아침 한 컵",
    "책상 위 오후 간식과 한 번 사용한 스푼",
    "식후의 작은 디저트와 남은 생활 흔적",
]
model["moodboard_inputs"]["product_description"][-1] = (
    "열린 컵의 깊은 스푼 자국과 제품별 리본·베일·입자·필·마블링·오일/유화 흔적"
)
if "Olive Oil & Sea Salt open-cup savory proof, oil/yogurt interface macro and restrained pairing frame" not in model["moodboard_inputs"]["product_image_generation"]:
    model["moodboard_inputs"]["product_image_generation"].append(
        "Olive Oil & Sea Salt open-cup savory proof, oil/yogurt interface macro and restrained pairing frame"
    )

model["boundaries"]["factual_limits"].extend(
    item["gap"] + " " + item["required_resolution"] for item in visual["gaps"]
)
model["boundaries"]["factual_limits"].extend(
    item["gap"] + " " + item["resolution"] for item in verbal["unresolved_gaps"]
)
model["boundaries"]["factual_limits"].extend(
    item["check"] + ": " + item["acceptance_boundary"] for item in product["r_and_d_checks"]
)


# Keep exactly two registered anchors while exposing the side frame as a supporting series asset.
for asset in registry["assets"]:
    if asset["asset_id"] == "ST2-BRAND-MOOD-01":
        asset.update({
            "communication_job": "동일 maker와 타임 허니 붓기 동작을 100% 정면 대칭으로 보여 MORA의 차분한 정확성, 식품 물성, 현대적 프리미엄을 대표한다.",
            "file_path": "assets/brand-mood/mora-infusion-front-v2.png",
            "prompt_path": "prompts/ST2-BRAND-MOOD-FRONT-02.md",
            "subject": "Same food maker in charcoal apron, strictly frontal, pouring thyme-honey infusion into dense strained yogurt",
            "aspect_ratio": "3:2 landscape",
            "generation_provenance": "OpenAI built-in image generation; generated 2026-08-25 with the prior MORA infusion image as identity, wardrobe, workspace and material reference.",
            "reference_lineage": [
                "GK-02",
                "GK-03",
                "transfer-input.visual_priority",
                "target value: 보이는 재료성",
                "target value: 차분한 정확성",
            ],
            "invariants": [
                "same maker, charcoal apron, bowl, glass pitcher, thyme honey and modern food atelier as the side companion",
                "strict 100% frontal sensor, wall, workbench and body geometry",
                "maker, pitcher, stream and bowl organized around one central frontal axis",
                "one plausible continuous pour with visible yogurt contact point",
                "dramatic motivated daylight with preserved skin, apron and yogurt detail",
                "no laboratory, apothecary, fragrance, vintage or Le Labo identity cues",
            ],
            "allowed_variation": [
                "responsive crops that preserve head, pitcher, stream, contact point and bowl",
                "minor natural yogurt, thyme and cloth irregularity",
            ],
            "invariant_check": "pass",
            "status": "registered",
        })

if len(registry["assets"]) != 2 or {asset["role"] for asset in registry["assets"]} != {"representative_product_hero", "brand_mood"}:
    raise RuntimeError("Stage 2 registry must remain exactly two anchors")

model["registered_anchor_assets"] = ["ST2-PRODUCT-HERO-01", "ST2-BRAND-MOOD-01"]
model["generated_at"] = datetime.now(timezone.utc).isoformat()


# Re-open the review checkpoint with the prior user feedback preserved.
review["status"] = "pending"
review["adjustment_prompts"] = [
    "Olive Oil & Sea Salt를 포함한 6종 제품 체계와 strict frontal / strict side 브랜드 무드 쌍에서 조정할 부분이 있습니까? 없으면 다음 단계로 진행합니다."
]
review["updated_at"] = datetime.now(timezone.utc).isoformat()


dump(model_path, model)
dump(registry_path, registry)
dump(review_path, review)


# Regenerate the eight-section human-readable source document from the revised model.
grammar = sections["source_grammar_application"]
positioning = sections["brand_positioning"]
lines = [
    "# MORA — Extended Brand Anatomy",
    "",
    "- Source brand: Le Labo Fragrances (accepted Stage 1; portable grammar only)",
    "- Target category: 다양한 천연 재료를 인퓨징한 프리미엄 그릭요거트",
    "- Product mode: physical",
    "- Audience: 재료의 출처·질감·절제된 단맛을 중시하는 25–44세 도시 생활자",
    "- Direction status: directional open concept",
    "",
    "## 1. Source-grammar application",
    "",
    grammar["key_insight"],
    "",
    "| Source | Semantic job | Relationship | MORA direction | Protected boundary |",
    "|---|---|---|---|---|",
]
for item in grammar["decisions"]:
    lines.append(f"| {item['source_grammar_id']} | {item['semantic_job']} | {item['relationship']} | {item['target_direction']} | {item['source_boundary']} |")

lines.extend([
    "",
    "## 2. Target-brand positioning",
    "",
    f"- Category frame: {positioning['category_frame']}",
    f"- Audience: {positioning['audience']}",
    f"- User outcome: {positioning['user_outcome']}",
    f"- Positioning: {positioning['positioning_statement']}",
    f"- Promise: {positioning['promise']}",
    "",
    "## 3. Product family, lineup, and product detail",
    "",
    f"- One-line product definition: {landing['one_line_definition']}",
    f"- Core value: {landing['core_value']}",
    f"- Lineup mode: {landing['lineup_mode']}",
    f"- Working family: {landing['product_family']['working_name']}",
    f"- Family promise: {landing['product_family']['promise']}",
    "",
    "### 제품 라인업",
    "",
    "| Product | Role | Use case | Differentiator | Product USP | Proof-image roles |",
    "|---|---|---|---|---|---|",
])
for item in landing["product_lineup"]:
    roles = ", ".join(role["role"] for role in item["image_roles"])
    lines.append(f"| {item['product_name']} | {item['lineup_role']} | {item['use_case']} | {item['differentiator']} | {item['product_usp']} | {roles} |")

lines.extend(["", "### Shared family invariants", ""])
lines.extend(f"- {item}" for item in landing["product_family"]["shared_invariants"])
lines.extend([
    "",
    "## 4. Verbal branding and copy hierarchy",
    "",
    f"- Brand message: {verbal_section['brand_message']}",
    f"- Supporting message: {verbal_section['brand_message_support']}",
    f"- Family USP: {verbal_section['family_usp']}",
    "- Values: " + ", ".join(item["value"] for item in verbal_section["brand_values"]),
    "- Current range: 허브·그린·토스티드·브라이트·딥·세이보리, 여섯 방향.",
    "- Selected narrative: NR-01 — 재료가 머문 결",
    "- Message order: 브랜드 메시지 → 패밀리 선택 논리 → 제품 역할 → 향·질감·여운 → 검증된 제품 사실",
    "",
    "## 5. Visual branding and key visual",
    "",
    f"- Communication job: {key_visual['communication_job']}",
    f"- Premise: {key_visual['premise']}",
    f"- Product series rule: {key_visual['series_rule']}",
    "- Registered product anchor: ST2-PRODUCT-HERO-01 / assets/product-hero/mora-thyme-honey-hero.png",
    "",
    "## 6. Brand mood and brand-image system",
    "",
    f"- Communication job: {brand_mood['communication_job']}",
    f"- Series: {brand_mood['strict_axis_series']['series_name']} / {brand_mood['strict_axis_series']['pair_caption']}",
    f"- Camera/light: {brand_mood['camera_light_color'][0]} {brand_mood['camera_light_color'][2]}",
    "",
    "| Frame | Role | View rule | Asset |",
    "|---|---|---|---|",
    "| A | Frontal declaration / registered mood anchor | 100% frontal, wall·shelf·workbench parallel, shoulders symmetrical | assets/brand-mood/mora-infusion-front-v2.png |",
    "| B | Side physics proof / supporting series | strict 90° right-side profile, one lateral action plane | assets/brand-mood/mora-infusion-side-v2.png |",
    "",
    "## 7. Product-native visual traits and product-image system",
    "",
    f"- Communication job: {product_visual['communication_job']}",
    "- Product silhouette: 150 g 낮고 넓은 미색 컵, 넓은 입구, 한 손으로 여는 리드.",
    "- Content proof: 열린 컵의 스푼 자국과 제품별 ribbon / veil / fleck / thread / marble / oil-emulsion 차이.",
    "- Image roles: hero form, feature detail, use interaction, state proof, six-product comparison.",
    "",
    "## 8. Landing-page design-token direction",
    "",
    "| Area | Core direction | Relationship | Functional boundary |",
    "|---|---|---|---|",
    "| Color | Cultured Cream #F5F1E8, Fresh White #FFFDF7, Cultured Ink #20231F | tune | Ingredient colors identify products only; maximum 5–8% locally |",
    "| Olive Oil & Sea Salt | #7A7040 muted olive ochre | new | Recipe marker/content preview only; never CTA, global accent, light, wall or background |",
    "| Typography | SUIT Variable with Korean-first hierarchy | tune/new | No condensed pharmacy or typewriter expression |",
    "| Spacing | 4–128 px relational scale | tune | Distance groups information; no label grid |",
    "| Layout | 12-column, image-first hero, equal six-product comparison | tune/new | Copy stays outside food imagery |",
    "| Shape | 1.55:1 low-wide cup, 16 px product-card radius | new | Food-native; no bottle or apothecary silhouette |",
    "| Motion | 180–320 ms UI, one 800–1200 ms spoon pull | new | No endless food loop or synthetic particle animation |",
    "",
    "<!-- Unnumbered review checkpoint is rendered from stage-review.json. -->",
])
(PACKAGE / "extended-brand-anatomy.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

print(f"WROTE {model_path}")
print(f"WROTE {registry_path}")
print(f"WROTE {review_path}")
print(f"WROTE {PACKAGE / 'extended-brand-anatomy.md'}")
print(f"LINEUP {len(landing['product_lineup'])} · COLOR TOKENS {len(tokens['color'])} · SUPPORTING MOOD {len(brand_mood['supporting_series'])}")
