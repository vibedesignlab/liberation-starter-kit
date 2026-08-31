# MORA Material Plate Template

## Role

Compile one square Material Plate that explains a single recipe as a causal material transformation: recognizable raw ingredient identity → honest preparation form → resulting yogurt trace. These are not botanical labels, ingredient still lifes, process diagrams or decorative SKU icons. Each plate contains one continuous three-state material morph and no text.

Attach `MATERIAL-FOLIOS-SERIES-LOCK.md` first. All six Wave B plates use the approved `ST3-ETCH-BRAND-TRACE-MASTER-26` as the immutable style reference.

## Reference precedence

1. `ST3-ETCH-BRAND-TRACE-MASTER-26`: paper, ink, line behavior, negative-space ratio and one-transition discipline.
2. Exactly one matching individual ingredient reference `ST3-REF-INGREDIENT-…-19` through `-24`: raw identity, shape, texture and actual tint source.
3. Approved landing-material facts: preparation form and resulting finished trace only.

Do not attach Le Labo Journal source images. Do not use another Material Plate or the six-ingredient atlas as an identity reference.

## Variable slots

```text
[ASSET_ID]
[INGREDIENT_NAME]
[MATCHING_INGREDIENT_REFERENCE_ID]
[RAW_IDENTITY]
[PREPARATION_ACTION]
[PREPARATION_FORM]
[RESULTING_TRACE]
[CONTINUOUS_TRANSITION]         one RAW → PREPARATION → TRACE morph
[ACTUAL_INGREDIENT_TINT]        sampled from approved ingredient reference
[TINT_OPACITY_PERCENT]          integer 5, 6, 7 or 8
[FACT_EVIDENCE_IDS]
[OUTPUT_SLUG]
```

Do not invent temperature, duration, dose, yield, pH, origin, health benefit, safety outcome or process equipment not supported by `[FACT_EVIDENCE_IDS]`. A preparation may remain directional or conditional when the product facts do.

## Locked causal structure

- The raw ingredient starts as clearly recognizable monochrome linework.
- Its contour or particulate texture continuously becomes the preparation form at the middle of the same object group.
- That same continuous material resolves as the finished yogurt trace at the end.
- This three-state morph counts as exactly one impossible material transition because it is one uninterrupted A → B → C contour. Do not render three separate objects, panels, arrows, steps or vignettes.
- Preparation and trace must be materially specific: syrup, filtered aqueous preparation, infusion/slurry, peel preparation, paste or oil phase must not collapse into the same generic liquid.

## Crop and flat-art equivalent

- Output: 1536 × 1536 target, exact 1:1 square.
- One compact transition group is centered and uses 30–35% of frame area; 65–70% remains clean uninterrupted `#F5F1E8` paper.
- Keep all critical contours inside an 8% safe margin. Use one consistent lower-left → upper-right reading direction across the six plates.
- Flat-art equivalent: 90 mm macro-like compression with near-orthographic construction. The raw form, preparation texture and finished trace remain equally legible; no shallow focus, wide-angle depth or perspective drama.

## Lighting, ink and tint physics

- Base palette: Carbon `#171714` ink on Cultured Cream `#F5F1E8`.
- One upper-left engraving light controls all three states. Hatch follows ingredient shape and tool/material flow; stipple describes syrup, water phase, slurry particles, paste density, oil surface and yogurt trace without becoming digital noise.
- Raw ingredient identity remains monochrome.
- One translucent `[ACTUAL_INGREDIENT_TINT]` sampled from the matching approved reference may appear only in the preparation form and/or the resulting trace, at `[TINT_OPACITY_PERCENT]` = 5–8% opacity relative to the sampled ingredient color. This is opacity, not 5–8% of canvas area.
- Do not tint paper, raw ingredient, outlines, tools or vessel. Do not add a second hue, gradient, glow or full-color food rendering.
- The tint must reinforce causal continuity, not become a recipe badge or decorative color block.

## Generation-ready prompt compiler

```text
Use case: square material-transition engraving for a premium cultured-food landing page.
Asset and ingredient: [ASSET_ID], [INGREDIENT_NAME].
Paper: exact clean contemporary Cultured Cream #F5F1E8, 1:1 square, 65–70%
uninterrupted negative space.
Subject: [RAW_IDENTITY], governed by [MATCHING_INGREDIENT_REFERENCE_ID] and
[FACT_EVIDENCE_IDS]. Show one continuous causal morph: [CONTINUOUS_TRANSITION].
The middle reads specifically as [PREPARATION_ACTION] producing [PREPARATION_FORM];
the same contour resolves as [RESULTING_TRACE].
Composition: one centered compact group using 30–35% of frame area, lower-left to
upper-right reading direction, all contours inside an 8% safe margin.
Flat-art behavior: near-orthographic 90 mm macro-equivalent compression, all three
material states equally legible, no photographic depth effects.
Ink: fine copperplate contour, material-following hatch and restrained stipple in
Carbon #171714, one coherent upper-left engraving light and retained paper midtones.
Tint: keep raw identity monochrome. Apply only one [ACTUAL_INGREDIENT_TINT] sampled
from the approved ingredient reference, at [TINT_OPACITY_PERCENT]% opacity, only to
the preparation form and/or resulting trace. No other color.
References in order: ST3-ETCH-BRAND-TRACE-MASTER-26 controls style; the one matching
ingredient reference controls identity and tint; approved facts control preparation
and trace. Append the full Material Folios negative constraints. No text in artwork.
```

## Negative constraints — append inside the same prompt

No text, ingredient name, recipe number, caption, label, arrow, legend, panel, border, badge, logo or watermark. No separate raw/preparation/trace vignettes, split screen, triptych, process chart, group atlas, second impossible transition, floating sample, decorative garnish or unrelated prop. No generic elixir, tincture, spirit, dropper, whiskey, lab flask, perfume bottle, narrow-neck vessel, botanical-label composition, apothecary frame, Victorian ornament, rustic still life, LE LABO wording, label grid, bottle doorway, house–bottle–suitcase collage or Le Journal imitation. No tint on raw ingredient, paper, outlines, tools or vessel; no second hue, gradient or color block. No pure black, sepia, faux aging, woodcut mass, watercolor, photorealism, 3D render, vector icon, digital shadow, glow or bokeh.

## QA checklist

- [ ] Exact asset ID, matching ingredient reference, 1:1 output and registered path.
- [ ] Raw ingredient is immediately recognizable and matches the one approved reference.
- [ ] Preparation form is specific and evidence-backed, not a generic liquid.
- [ ] Resulting yogurt trace is specific and causally follows the preparation.
- [ ] Raw → preparation → trace is one uninterrupted transition, not three panels or multiple morphs.
- [ ] Lower-left → upper-right reading direction, 30–35% inked occupancy, 65–70% negative space and 8% crop safety match the six-plate series.
- [ ] `#171714` line, upper-left engraving light, curvature/flow-following hatch and restrained stipple remain coherent.
- [ ] Exactly one tint is sampled from the matching ingredient reference, at 5–8% opacity, and appears only in preparation and/or trace; raw identity and paper remain monochrome.
- [ ] No text-like artifact, second hue, unrelated prop, source motif or unsupported process claim appears.
- [ ] Prompt path, output path, model/adapter, seed/reference order, tint sample and checksum are recorded.

## Single-causal edit loop

Allowed repair axes are `ingredient_identity`, `preparation_specificity`, `trace_specificity`, `transition_count`, `transition_legibility`, `negative_space`, `crop`, `reading_direction`, `line_behavior`, `ink_light`, `tint_hue`, `tint_opacity`, `tint_scope`, `source_distance` and `text_artifact`.

```text
Keep the approved ingredient identity, preparation, resulting trace, single continuous
morph, 1:1 crop, lower-left to upper-right direction, negative space, paper/ink,
upper-left engraving light, reference order and every passing detail unchanged.
Correct only [FAILED_AXIS]: [OBSERVED_FAILURE] → [LOCKED_TARGET].
Do not alter another material state, add a panel, change tint scope, add text or invent process.
```

Change one axis per edit and rerun the complete checklist. After two failed deltas on the same axis, restart once from the style master, matching ingredient reference and factual plate brief. A third same-axis failure makes the adapter incompatible for Material Plates.

## File and ID rules

- Supported IDs are exactly `ST3-ETCH-MATERIAL-THYME-HONEY-30` through `ST3-ETCH-MATERIAL-OLIVE-OIL-SEA-SALT-35`.
- Final prompt: `prompts/[ASSET_ID].md`.
- Final image: `assets/editorial-etchings/mora-etch-material-[ingredient-slug]-square.png`.
- Working candidate: `.work/revision3_vessel_folios/candidates/[ASSET_ID]/rNN-[axis].png`.
- Use one distinct image-generation call per plate. A six-plate contact sheet is QA-only and never the registered asset.
