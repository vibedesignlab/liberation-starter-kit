# Eight-section transfer-direction contract

등록된 Storybook 문서와 `outputs/extended-brand-anatomy.json`을 한 쌍으로 전달한다. JSON은 Stage 3의 explicit input이며 Storybook은 사람이 읽고 승인하는 Stage 2 anatomy다. `outputs/extended-brand-anatomy.html`은 마이그레이션 호환 산출물로만 유지한다.

## Report body

Numbered body는 정확히 여덟 section이다.

1. Source-grammar application direction
2. New-brand positioning
3. Landing-focused product concept
4. Verbal branding and copy hierarchy
5. Visual branding and key visual
6. Brand mood and brand-image direction
7. Product visual traits and product-image direction
8. Design-token direction

각 section은 `section-1`부터 `section-8`로 식별하고 `key_insight` 한 문장을 가진다. Section 3에는 JSON의 모든 lineup product name이 보여야 한다. 여덟 번째 뒤에는 `stage-review.json` 기반의 unnumbered checkpoint만 둔다.

## Product-concept limit

제품 section은 one-line definition, user/use situation, core value, 1–4 landing feature, family name and promise, explicit lineup, 3–5 shared invariant와 relevant cognitive invariant, differentiation logic, 각 제품의 name/type/role/use/difference/form cue/allowed variation/USP/landing message/proof-image role을 기록한다. 운영 모델, full journey, roadmap, engineering requirement를 추가하지 않는다.

## JSON

`artifact_type: extended_brand_anatomy`과 현재 1.x schema를 사용한다. Top-level에는 `source_analysis`, `target`, `sections`, `moodboard_inputs`, `boundaries`, `registered_anchor_assets`가 필요하다.

`sections` key는 다음 여덟 개다.

- `source_grammar_application`
- `brand_positioning`
- `landing_product_concept`
- `verbal_branding_and_copy_hierarchy`
- `visual_branding_and_key_visual`
- `brand_mood_and_brand_imagery`
- `product_visual_traits_and_product_imagery`
- `design_token_direction`

`registered_anchor_assets`에는 registry의 product hero ID 1개와 brand-mood ID 최소 2개를 기록한다. 이 필드는 lineage ID 목록이며 bitmap 생성 완료를 의미하지 않는다. 실제 상태는 `asset-registry.json`의 `external_pending` 또는 `registered`로 판정한다.

`landing_product_concept`에는 `lineup_mode`, `product_family`, `product_lineup`이 필요하다. Verbal section에는 brand message, 2–3 values, family USP, 모든 제품 USP, 필요한 경우 2–3 narrative route와 selected route, message-to-visual map이 필요하다.

`design_token_direction`에는 color, typography, spacing, layout과 optional shape/motion이 있다. 각 token record는 `role`, `relationship`, `source_basis`, `target_direction`, `landing_use`, `status`를 가진다. Typography는 display, page headline, section heading, body, support/label의 size·line-height·weight·responsive behavior를 명시해 실제 위계를 보여준다.

`moodboard_inputs`는 `copywriting`, `hierarchy`, `brand_mood_images`, `product_description`, `product_image_generation`을 가진다. `brand_mood_images`와 `product_image_generation`에는 prompt ID, role, status, prompt path가 포함되어야 한다.

## Asset handoff

`asset-registry.json`은 product hero record 1개와 서로 다른 communication job의 brand-mood record 최소 2개를 가진다. Prompt 준비만 끝난 경우 `external_pending`이 정상 완료 상태다. 외부 bitmap을 실제로 받은 뒤에만 `registered`로 변경한다. Storybook은 pending handoff cards 또는 registered images를 누락 없이 보여준다.
