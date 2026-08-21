# Landing materials contract

## Inputs

- accepted Stage 2 `outputs/extended-brand-anatomy.json` and registered Storybook document
- accepted Stage 2 `stage-review.json`
- Stage 2 `asset-registry.json` with a representative product anchor and at least two brand-mood anchors
- selected narrative route, landing goal, and message-to-visual map when present

Stage 2 product anchors define geometry and material authority. Brand-mood anchors define environment, light, color, texture, and emotional continuity. Do not replace either with an invented direction.

## Canonical outputs

- `outputs/landing-materials.json`: canonical Stage 3 model
- `landing-materials.md`: deterministic text view
- registered `Brand Reports/<brand>/Stage 3 — Landing Materials` Storybook document: primary reader
- `outputs/landing-materials.html`: migration compatibility only
- `prompts/<asset-id>.md|json`: generation-ready prompt packages
- `asset-registry.json`: prompt-only pending asset handoff
- `stage-review.json`: explicit user checkpoint state

## Report format

The report contains six numbered material sections:

1. landing narrative and hierarchy
2. brand value copy
3. brand story copy
4. product-family introduction
5. product-lineup copy
6. product-image prompt handoffs and landing-section mapping

After section 6, render an unnumbered review checkpoint. Do not add a page implementation chapter.

Every section has a one-sentence `key_insight`. Use large, wrap-safe report headlines, preserve intrinsic aspect-ratio reservations for pending images, prevent clipped or overflowing text, and show concise link labels instead of raw URLs.

## JSON and lineup parity

Use `artifact_type: landing_materials`. Required records are:

- `extended_brand_source`
- `landing_narrative`
- `selected_narrative_route`
- `message_visual_map`
- `brand_value`
- `brand_story`
- `product_introduction`
- `product_lineup_copy`
- `section_map`
- `registered_product_assets`
- `image_handoff`
- `boundaries`

Copy follows `brand message → brand values → family USP → product USP`. Every accepted Stage 2 product has exactly one matching `product_lineup_copy` record with `product_name`, `product_usp`, `eyebrow`, `headline`, `description`, `feature_copy`, `proof_copy`, and `cta`.

Every `section_map` item records `section`, `communication_job`, `copy`, `proof_of`, `asset_id`, and `cta`. Every pending asset ID maps to at least one landing section.

## Prompt-only asset semantics

Claude does not generate or edit images. A valid prompt-only registry entry contains:

- identity: `asset_id`, `product_name`, `role`
- prompt: existing `prompt_path`, `prompt_provenance: claude_prompt_only`
- lineage: `communication_job`, `reference_lineage`, `allowed_variation`, `invariants`
- generation state: empty `file_path`, `generation_provenance: not_generated_by_claude`
- QA state: `invariant_check: pending_asset_qa`
- lifecycle: `status: pending_generation`

The prompt package itself contains the full generation prompt, negative constraints, continuity lock, and observable QA checklist. Do not mark an asset `registered` or `pass` until another authorized image-generation step creates the file and performs asset QA.

## Approval gate

Validation means that the material package and pending handoff are structurally complete. It is not user approval and it is not image completion.

- `pending`: waiting for user review
- `revision_requested`: remain in Stage 3 and update the package
- `accepted`: user explicitly accepts copy, lineup mapping, mood inheritance, and prompt direction

Acceptance ends this skill. It does not authorize page implementation or image generation.
