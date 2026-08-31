#!/usr/bin/env python3
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path


PACKAGE = Path(__file__).resolve().parents[1]
PIPELINE = PACKAGE.parent
SOURCE = PIPELINE / "01-source-brand"
WORK = PACKAGE / ".work"


def load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def compact(value) -> str:
    if isinstance(value, dict):
        return " · ".join(f"{key}: {compact(item)}" for key, item in value.items())
    if isinstance(value, list):
        return ", ".join(compact(item) for item in value)
    return str(value)


def rgb(hex_value: str) -> tuple[int, int, int]:
    value = hex_value.lstrip("#")
    return tuple(int(value[index:index + 2], 16) for index in (0, 2, 4))


def luminance(hex_value: str) -> float:
    channels = []
    for channel in rgb(hex_value):
        value = channel / 255
        channels.append(value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4)
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]


def contrast(a: str, b: str) -> float:
    high, low = sorted((luminance(a), luminance(b)), reverse=True)
    return (high + 0.05) / (low + 0.05)


transfer = load(PACKAGE / "transfer-input.json")
verbal = load(WORK / "verbal_narrative" / "shard.json")
product = load(WORK / "product_lineup" / "shard.json")
visual = load(WORK / "visual_tokens" / "shard.json")

pc = product["landing_product_concept"]
vs = visual["sections"]
tokens = vs["design_token_direction"]


lineup = []
for item in pc["product_lineup"]:
    lineup.append({
        "product_name": item["product_name"],
        "product_type": item["product_type"],
        "lineup_role": item["lineup_role"],
        "use_case": item["use_case"],
        "differentiator": item["differentiator"],
        "form_cues": item["form_cues"],
        "allowed_variation": item["allowed_variation"],
        "product_usp": item["product_usp"],
        "landing_message": item["landing_message"],
        "image_roles": item["proof_image_roles"],
    })


color_tokens = []
for record in tokens["color"]:
    direction = record["target_direction"]
    value = direction["value"]
    candidates = [direction.get("on_value"), "#20231F", "#FFFDF7"]
    candidates = [candidate for candidate in candidates if candidate]
    on_color = max(candidates, key=lambda candidate: contrast(value, candidate))
    ingredient = ".ingredient." in record["token_id"]
    color_tokens.append({
        "token": record["token_id"],
        "name": direction.get("name", record["role"]),
        "role": record["role"],
        "value": value,
        "on_color": on_color,
        "contrast_pair": f"{on_color} on {value}",
        "contrast_ratio": f"{contrast(value, on_color):.2f}:1",
        "usage_ratio": "local surface 5–8% maximum; never CTA/background" if ingredient else direction.get("usage_rule", "role-bound use only"),
        "relationship": record["relationship"],
        "source_basis": record["source_basis"],
        "target_direction": direction["usage_rule"],
        "landing_use": record["landing_use"],
        "status": record["status"],
    })


type_samples = {
    "type.family.primary": "MORA · 재료가 머문 결",
    "type.hero": "한 컵 안에, 재료가 머문 결.",
    "type.section-title": "같은 밀도, 다섯 가지 재료의 결",
    "type.body": "밀도 높은 그릭요거트에서 재료의 향과 질감, 여운을 차례로 발견합니다.",
    "type.label": "Thyme Honey · Infused Greek Yogurt · 150 g",
    "type.numeric": "150 g · 05 recipes",
    "type.wordmark": "MORA",
}


typography_tokens = []
for record in tokens["typography"]:
    direction = record["target_direction"]
    token_id = record["token_id"]
    family = direction.get("family", "SUIT Variable")
    fallback = direction.get("fallback", "Pretendard Variable, Noto Sans KR, system-ui, sans-serif")
    desktop = direction.get("desktop", direction.get("size_line_height", "18/28 px"))
    if isinstance(desktop, str) and "/" in desktop:
        size, line_height = desktop.split("/", 1)
        font_size = size.strip()
        line_height = line_height.strip()
    else:
        font_size = str(desktop)
        line_height = "normal"
    typography_tokens.append({
        "token": token_id,
        "name": record["role"],
        "role": record["role"],
        "relationship": record["relationship"],
        "source_basis": record["source_basis"],
        "target_direction": compact(direction),
        "landing_use": record["landing_use"],
        "status": record["status"],
        "sample": type_samples[token_id],
        "font_family": f"{family}, {fallback}" if "fallback" in direction else f"{family}, Pretendard Variable, Noto Sans KR, system-ui, sans-serif",
        "font_size": font_size,
        "font_weight": str(direction.get("weight", 500)),
        "line_height": line_height,
        "letter_spacing": str(direction.get("tracking", "0em")),
        "responsive_range": compact({key: direction[key] for key in ("desktop", "mobile") if key in direction}),
        "measure": str(direction.get("max_line_length", direction.get("max_width", "role dependent"))),
        "text_transform": str(direction.get("case", direction.get("case_rule", "none"))),
    })


def normalize_generic(records: list[dict]) -> list[dict]:
    result = []
    for record in records:
        result.append({
            "token": record["token_id"],
            "role": record["role"],
            "relationship": record["relationship"],
            "source_basis": record["source_basis"],
            "target_direction": compact(record["target_direction"]),
            "landing_use": record["landing_use"],
            "status": record["status"],
        })
    return result


grammar_decisions = []
for item in verbal["source_grammar_application"]:
    grammar_decisions.append({
        "source_grammar_id": item["source_grammar_id"],
        "source_signal": item["source_signal"],
        "semantic_job": item["semantic_job"],
        "relationship": item["relationship"],
        "target_direction": item["target_decision"],
        "source_boundary": item["source_boundary"],
        "status": item["status"],
    })


brand_values = [
    {
        "value": item["name"],
        "statement": item["definition"],
        "behavior": item["behavior"],
        "proof_required": item["proof_required"],
        "status": item["status"],
    }
    for item in verbal["brand_values"]
]


narrative_routes = [
    {
        "route_id": item["id"],
        "name": item["name"],
        "summary": item["premise"],
        "opening_copy": item["opening_copy"],
        "sequence": item["sequence"],
        "strength": item["strength"],
        "risk": item["risk"],
        "status": item["status"],
    }
    for item in verbal["narrative_routes"]
]


key_visual = dict(vs["visual_branding_and_key_visual"])
key_visual["anchor_asset"] = "ST2-PRODUCT-HERO-01"
key_visual["generated_anchor_fit"] = [
    "Thyme Honey 컵이 오른쪽에 고정되고 왼쪽 45%가 카피 안전 영역으로 남는다.",
    "MORA와 THYME HONEY 두 줄만 읽히며 향수·약국 라벨 인상이 없다.",
    "요거트 능선, 꿀 리본, 타임 입자, 스푼 한 번의 사용이 한 장에서 읽힌다.",
]


brand_mood = dict(vs["brand_mood_and_brand_imagery"])
brand_mood["key_insight"] = "MORA의 무드는 복고 작업실이 아니라 현대적인 식품 공간에서 한 재료가 요거트에 들어가는 실제 동작과, 도시의 조용한 섭취 순간이 만드는 집중이다."
brand_mood["communication_job"] = "한 명의 제작자가 한 번의 인퓨전 동작을 수행하는 장면으로 프리미엄의 근거를 보이고, 이후 아침·오후·식후의 짧은 섭취 리추얼로 세계를 확장한다."
brand_mood["anchor_asset"] = "ST2-BRAND-MOOD-01"
brand_mood["generated_anchor_fit"] = [
    "현대적이고 밝은 식품 작업 공간, 한 명의 제작자, 한 번의 붓기 동작이 명확하다.",
    "유리 피처, 꿀 흐름, 요거트 표면, 손과 그릇의 물리 관계가 자연스럽다.",
    "실험실·빈티지 약방·향수 광고 표면을 사용하지 않는다.",
]


product_visual = dict(vs["product_visual_traits_and_product_imagery"])
product_visual["registered_product_anchor"] = "ST2-PRODUCT-HERO-01"
product_visual["product_image_direction"] = dict(product_visual["product_image_direction"])
product_visual["product_image_direction"]["hero_form"] = [
    "Thyme Honey 열린 컵을 자연스러운 50 mm 원근의 3/4 시점으로 오른쪽에 배치하고 왼쪽 45%를 카피 안전 영역으로 둔다.",
    "컵 전면의 MORA·THYME HONEY, 전체 실루엣, 열린 요거트 표면, 스푼과 한 번 떠낸 질감을 함께 보여 준다.",
    "꿀과 타임은 실제 내용물 안의 리본·미세 입자로만 나타나며 배경 장식색으로 확장하지 않는다.",
]


model = {
    "schema_version": "1.1.0",
    "artifact_type": "extended_brand_anatomy",
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "source_analysis": {
        "brand": "Le Labo Fragrances",
        "package_path": str(SOURCE.resolve()),
        "json_path": "outputs/source-brand-analysis.json",
        "relationship": "Retain portable semantic jobs while replacing protected identity, label, naming, retail, and editorial surfaces with food-native mechanisms.",
        "approved_grammar_ids": ["GK-01", "GK-02", "GK-03", "GK-04", "GK-05"],
    },
    "target": {
        "working_name": "MORA",
        "category": transfer["product"]["category"],
        "product_mode": "physical",
        "audience": transfer["product"]["audience"],
        "use_contexts": transfer["product"]["use_contexts"],
        "direction_status": "directional_open_concept",
    },
    "sections": {
        "source_grammar_application": {
            "key_insight": "Le Labo에서 옮기는 것은 향수의 표면이 아니라, 반복 구조 안에서 차이를 분류하고 감각에서 사실로 이동하며 한 번의 행동으로 품질을 증명하는 관계다.",
            "summary": "다섯 레시피는 같은 한 컵 구조와 정보 순서를 공유하고, 실제 재료 흔적·한 가지 사용 동작·검증된 사실만 통제해 바꾼다.",
            "decisions": grammar_decisions,
        },
        "brand_positioning": {
            "key_insight": "MORA는 토핑이나 건강 효능보다, 밀도 높은 요거트 안에서 재료가 어떻게 보이고 느껴지는지를 선택 기준으로 만드는 ingredient-led premium Greek yogurt다.",
            "category_frame": verbal["positioning"]["category_frame"],
            "audience": verbal["positioning"]["audience"],
            "user_outcome": transfer["product"]["desired_outcome"],
            "positioning_statement": verbal["positioning"]["positioning_statement"],
            "promise": f"{verbal['positioning']['functional_promise']} {verbal['positioning']['emotional_promise']}",
            "proof": verbal["positioning"]["reason_to_believe_direction"],
            "tension": verbal["positioning"]["tension"],
            "social_posture": verbal["positioning"]["social_posture"],
            "proof_status": verbal["positioning"]["reason_to_believe_status"],
        },
        "landing_product_concept": {
            "key_insight": pc["key_insight"],
            "one_line_definition": pc["one_line_definition"],
            "user_and_use_situation": f"{pc['user_and_use_situation']['user']} — {pc['user_and_use_situation']['representative_use']} — {pc['user_and_use_situation']['immediate_outcome']}",
            "core_value": pc["core_value"],
            "lineup_mode": pc["lineup_mode"],
            "landing_features": pc["landing_features"],
            "product_family": pc["product_family"],
            "product_lineup": lineup,
            "hero_product": pc["hero_product"],
            "necessary_variants": [item["product_name"] for item in lineup if item["product_name"] != pc["hero_product"]],
            "form_cues": {
                "shared": pc["product_family"]["shared_invariants"],
                "physical": pc["product_family"]["physical_package_cues"] + pc["product_family"]["edible_product_cues"],
                "digital": [],
                "hybrid": [],
            },
            "proof_image_roles": pc["family_proof_image_roles"],
        },
        "verbal_branding_and_copy_hierarchy": {
            "key_insight": "‘재료가 머문 결’이라는 한 문장으로 감각을 열고, 다섯 제품을 향의 첫인상·요거트와 만나는 질감·마지막 여운의 같은 순서로 비교한다.",
            "brand_message": verbal["brand_message"]["primary"],
            "brand_message_support": verbal["brand_message"]["supporting"],
            "brand_values": brand_values,
            "family_usp": verbal["family_usp"]["statement"],
            "product_usps": [{"product_name": item["product_name"], "usp": item["product_usp"]} for item in verbal["product_usps"]],
            "voice": [verbal["verbal_system"]["voice"]["persona"]] + verbal["verbal_system"]["voice"]["qualities"],
            "vocabulary": verbal["verbal_system"]["vocabulary"],
            "sentence_behavior": verbal["verbal_system"]["sentence_behavior"],
            "message_hierarchy": verbal["message_hierarchy"],
            "headline_direction": [
                "한 컵 안에, 재료가 머문 결.",
                "같은 밀도, 다섯 가지 재료의 결.",
                "제품 헤드라인은 하나의 감각 대비만 사용하고 16자 안팎을 우선한다.",
            ],
            "supporting_copy_direction": "한 개의 감각 문장 뒤에 제품 형식·재료 역할·150 g·검증된 레시피 사실을 완전한 문장으로 공개한다.",
            "cta_direction": ["다섯 컵 비교하기", "재료의 결 보기", "Thyme Honey 만나기"],
            "narrative_routes": narrative_routes,
            "selected_narrative_route": "NR-01",
            "message_visual_map": {
                "brand_message_to_key_visual": "열린 Thyme Honey 한 컵, 요거트 능선, 꿀 리본과 타임 입자, 스푼 한 번을 왼쪽 카피 여백과 함께 보여 준다.",
                "brand_values_to_brand_mood": [
                    "보이는 재료성 → 실제 꿀·타임 흐름과 요거트 표면",
                    "차분한 정확성 → 현대 식품 공간과 한 번의 명확한 작업",
                    "짧은 머묾 → 아침·책상·식후의 한 사람 한 컵 장면",
                ],
                "family_and_product_usp_to_product_imagery": [
                    "같은 컵·각도·노출로 다섯 제품을 비교한다.",
                    "리본, 베일, 입자, 필, 마블링의 실제 식감 차이를 스푼 단면으로 증명한다.",
                    "제품마다 하나의 사용 순간과 하나의 증거 사진 역할만 바꾼다.",
                ],
            },
            "avoid": verbal["copy_avoids"],
        },
        "visual_branding_and_key_visual": key_visual,
        "brand_mood_and_brand_imagery": brand_mood,
        "product_visual_traits_and_product_imagery": product_visual,
        "design_token_direction": {
            "key_insight": tokens["key_insight"],
            "color": color_tokens,
            "typography": typography_tokens,
            "spacing": normalize_generic(tokens["spacing"]),
            "layout": normalize_generic(tokens["layout"]),
            "shape": normalize_generic(tokens["shape"]),
            "motion": normalize_generic(tokens["motion"]),
            "implementation_boundary": tokens["implementation_boundary"],
        },
    },
    "moodboard_inputs": {
        "copywriting": {
            "primary_message": verbal["brand_message"]["primary"],
            "family_usp": verbal["family_usp"]["short_form"],
            "selected_route": "NR-01 — 재료가 머문 결",
        },
        "hierarchy": ["브랜드 메시지", "패밀리 선택 논리", "제품 역할", "향·질감·여운", "검증된 제품 사실"],
        "brand_mood_images": [
            "현대 식품 작업 공간의 한 번의 인퓨전 동작",
            "도시 창가의 아침 한 컵",
            "책상 위 오후 간식과 한 번 사용한 스푼",
            "식후의 작은 디저트와 남은 생활 흔적",
        ],
        "product_description": [
            "150 g 낮고 넓은 무광 미색 컵",
            "큰 레시피명과 5–8% 이내의 한 재료 식별 마커",
            "열린 컵의 깊은 스푼 자국과 제품별 리본·베일·입자·필·마블링",
        ],
        "product_image_generation": [
            "Thyme Honey copy-safe product hero",
            "five-product closed-pack lineup",
            "five-product open-cup texture matrix",
            "sealed → opened → first spoon state sequence",
            "ingredient trace macro and one-use-moment frame per product",
        ],
    },
    "boundaries": {
        "source_traits_not_to_copy": transfer["source_relationship"]["traits_to_avoid"],
        "assumptions": transfer["assumptions"],
        "factual_limits": product["concept_boundaries"] + [item["gap"] for item in verbal["unresolved_gaps"]] + visual["gaps"],
    },
    "registered_anchor_assets": ["ST2-PRODUCT-HERO-01", "ST2-BRAND-MOOD-01"],
}


registry = {
    "schema_version": "1.1.0",
    "artifact_type": "brand_asset_registry",
    "stage": "extended_brand_anatomy",
    "assets": [
        {
            "asset_id": "ST2-PRODUCT-HERO-01",
            "role": "representative_product_hero",
            "communication_job": "한 장에서 MORA의 150 g 한 컵 형태, 농도, 실제 인퓨전 흔적, 스푼 사용, 카피 안전 영역을 설명한다.",
            "file_path": "assets/product-hero/mora-thyme-honey-hero.png",
            "prompt_path": "prompts/ST2-PRODUCT-HERO-01.md",
            "subject": "MORA Thyme Honey open 150 g Greek-yogurt cup",
            "aspect_ratio": "1693:929 landscape",
            "generation_provenance": "OpenAI built-in image generation; generated 2026-08-25 from the registered project prompt without image references.",
            "reference_lineage": ["GK-01", "GK-02", "GK-03", "GK-05", "transfer-input.visual_priority"],
            "invariants": [
                "low-wide warm-ivory cup",
                "exact MORA and THYME HONEY primary copy only",
                "dense yogurt ridges with honey ribbon and thyme flecks",
                "product on right with continuous copy-safe field on left",
                "one spoon action and food-native styling",
            ],
            "allowed_variation": ["responsive crop within the copy-safe field", "minor natural yogurt and thyme irregularity"],
            "invariant_check": "pass",
            "status": "registered",
        },
        {
            "asset_id": "ST2-BRAND-MOOD-01",
            "role": "brand_mood",
            "communication_job": "현대 식품 작업 공간에서 한 명의 제작자가 한 번의 재료 인퓨전 동작을 수행하는 모습으로 차분한 정확성과 보이는 재료성을 증명한다.",
            "file_path": "assets/brand-mood/mora-infusion-process.png",
            "prompt_path": "prompts/ST2-BRAND-MOOD-01.md",
            "subject": "One food maker pouring thyme-honey infusion into dense strained yogurt",
            "aspect_ratio": "3:2 landscape",
            "generation_provenance": "OpenAI built-in image generation; generated 2026-08-25 from the registered project prompt without image references.",
            "reference_lineage": ["GK-02", "GK-03", "target value: 보이는 재료성", "target value: 차분한 정확성"],
            "invariants": [
                "one person and one continuous pour action",
                "modern daylight food atelier",
                "dense yogurt, plausible glass, stream, hands, and contact",
                "no package, laboratory, apothecary, or fragrance cues",
                "natural skin, food, steel, linen, and daylight texture",
            ],
            "allowed_variation": ["crop around the same action", "minor daylight and prop-position changes"],
            "invariant_check": "pass",
            "status": "registered",
        },
    ],
}


dump(PACKAGE / "outputs" / "extended-brand-anatomy.json", model)
dump(PACKAGE / "asset-registry.json", registry)


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
    model["sections"]["source_grammar_application"]["key_insight"],
    "",
    "| Source | Semantic job | Relationship | MORA direction | Protected boundary |",
    "|---|---|---|---|---|",
]
for item in grammar_decisions:
    lines.append(f"| {item['source_grammar_id']} | {item['semantic_job']} | {item['relationship']} | {item['target_direction']} | {item['source_boundary']} |")

lines += [
    "",
    "## 2. Target-brand positioning",
    "",
    f"- Category frame: {model['sections']['brand_positioning']['category_frame']}",
    f"- Audience: {model['sections']['brand_positioning']['audience']}",
    f"- User outcome: {model['sections']['brand_positioning']['user_outcome']}",
    f"- Positioning: {model['sections']['brand_positioning']['positioning_statement']}",
    f"- Promise: {model['sections']['brand_positioning']['promise']}",
    "",
    "## 3. Product family, lineup, and product detail",
    "",
    f"- One-line product definition: {pc['one_line_definition']}",
    f"- Core value: {pc['core_value']}",
    f"- Lineup mode: {pc['lineup_mode']}",
    f"- Working family: {pc['product_family']['working_name']}",
    f"- Family promise: {pc['product_family']['promise']}",
    "",
    "### 제품 라인업",
    "",
    "| Product | Role | Use case | Differentiator | Product USP | Proof-image roles |",
    "|---|---|---|---|---|---|",
]
for item in lineup:
    roles = ", ".join(role["role"] for role in item["image_roles"])
    lines.append(f"| {item['product_name']} | {item['lineup_role']} | {item['use_case']} | {item['differentiator']} | {item['product_usp']} | {roles} |")

lines += [
    "",
    "### Shared family invariants",
    "",
]
lines += [f"- {item}" for item in pc["product_family"]["shared_invariants"]]
lines += [
    "",
    "## 4. Verbal branding and copy hierarchy",
    "",
    f"- Brand message: {verbal['brand_message']['primary']}",
    f"- Supporting message: {verbal['brand_message']['supporting']}",
    f"- Family USP: {verbal['family_usp']['statement']}",
    "- Values: " + ", ".join(item["name"] for item in verbal["brand_values"]),
    "- Selected narrative: NR-01 — 재료가 머문 결",
    "- Message order: 브랜드 메시지 → 패밀리 선택 논리 → 제품 역할 → 향·질감·여운 → 검증된 제품 사실",
    "",
    "## 5. Visual branding and key visual",
    "",
    f"- Communication job: {key_visual['communication_job']}",
    f"- Premise: {key_visual['premise']}",
    f"- Series rule: {key_visual['series_rule']}",
    "- Registered product anchor: ST2-PRODUCT-HERO-01 / assets/product-hero/mora-thyme-honey-hero.png",
    "",
    "## 6. Brand mood and brand-image system",
    "",
    f"- Communication job: {brand_mood['communication_job']}",
    f"- World: {brand_mood['world_setting_people'][0]}",
    f"- Camera/light: {brand_mood['camera_light_color'][0]}",
    "- Registered mood anchor: ST2-BRAND-MOOD-01 / assets/brand-mood/mora-infusion-process.png",
    "",
    "## 7. Product-native visual traits and product-image system",
    "",
    f"- Communication job: {product_visual['communication_job']}",
    "- Product silhouette: 150 g 낮고 넓은 미색 컵, 넓은 입구, 한 손으로 여는 리드.",
    "- Content proof: 열린 컵의 스푼 자국과 제품별 ribbon / veil / fleck / thread / marble 차이.",
    "- Image roles: hero form, feature detail, use interaction, state proof, five-product comparison.",
    "",
    "## 8. Landing-page design-token direction",
    "",
    "| Area | Core direction | Relationship | Functional boundary |",
    "|---|---|---|---|",
    "| Color | Cultured Cream #F5F1E8, Fresh White #FFFDF7, Cultured Ink #20231F | tune | Ingredient colors identify products only; maximum 5–8% locally |",
    "| Typography | SUIT Variable with Korean-first hierarchy | tune/new | No condensed pharmacy or typewriter expression |",
    "| Spacing | 4–128 px relational scale | tune | Distance groups information; no label grid |",
    "| Layout | 12-column, image-first hero, equal five-product comparison | tune/new | Copy stays outside food imagery |",
    "| Shape | 1.55:1 low-wide cup, 16 px product-card radius | new | Food-native; no bottle or apothecary silhouette |",
    "| Motion | 180–320 ms UI, one 800–1200 ms spoon pull | new | No endless food loop or synthetic particle animation |",
    "",
    "<!-- Unnumbered review checkpoint is rendered from stage-review.json. -->",
]
(PACKAGE / "extended-brand-anatomy.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

print(f"WROTE {PACKAGE / 'outputs' / 'extended-brand-anatomy.json'}")
print(f"WROTE {PACKAGE / 'asset-registry.json'}")
print(f"WROTE {PACKAGE / 'extended-brand-anatomy.md'}")
print(f"LINEUP {len(lineup)} · COLOR TOKENS {len(color_tokens)} · TYPE TOKENS {len(typography_tokens)}")
