# Landing materials contract

## Inputs

- accepted `extended-brand-anatomy.json` and registered Storybook document;
- compatibility `extended-brand-anatomy.html` while legacy lineage checks remain;
- accepted Stage 2 `stage-review.json`;
- Stage 2 `asset-registry.json` with one product hero and one brand-mood image.
- Stage 2 selected narrative route and message-to-visual map when present.

## Report format

The report contains six numbered material sections:

1. landing narrative and hierarchy;
2. brand value copy;
3. brand story copy;
4. product-family introduction;
5. product-lineup copy;
6. product-image renders and landing-section mapping.

After section 6, render an unnumbered review checkpoint. Keep `data-review-checkpoint` in the compatibility HTML while legacy validators require it. Do not add a page implementation chapter.

## JSON

Use the current template schema and `artifact_type: landing_materials`.

Required top-level records:

- `extended_brand_source`;
- `landing_narrative`;
- `selected_narrative_route`;
- `message_visual_map`;
- `brand_value`;
- `brand_story`;
- `product_introduction`;
- `product_lineup_copy`;
- `section_map`;
- `registered_product_assets`;
- `boundaries`.

Copy follows the approved hierarchy: brand message → brand values → family USP → product USP. Every Stage 2 lineup product must have a `product_lineup_copy` record with `product_name`, `product_usp`, `eyebrow`, `headline`, `description`, `feature_copy`, `proof_copy`, and `cta`.

Every `section_map` item records `section`, `communication_job`, `copy`, `proof_of`, `asset_id`, and `cta`. Every registered asset must map to at least one landing section. Every schema 1.1 asset records `communication_job`, `reference_lineage`, `allowed_variation`, and `invariant_check: pass` in addition to its file and prompt provenance.
