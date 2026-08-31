# MORA Cross-Model Variation and QA Loop

## Principle

The two golden masters are immutable inputs, not inspiration. Each model receives the same semantic core, the same reference precedence and the same numeric layout. A model-specific adapter may translate syntax, but it may not change the subject, camera, layout, material, background or negatives.

## Model adapter contract

| Layer | Universal requirement | Adapter may change | Adapter may not change |
|---|---|---|---|
| Reference | package master → composition master → one ingredient reference | upload syntax or reference-weight syntax | order, identity or master files |
| Prompt | subject → role → camera → composition → lighting → surface/background → atmosphere → color grade → texture → output → continuity → negatives | punctuation and parameter syntax | semantic content or numeric constraints |
| Canvas | square 1536 target | native generation size before upscale | aspect ratio |
| Style | realistic premium commercial food photography | model's lowest-style or raw mode | introducing editorial set dressing |
| Seed | one recorded seed per approved master where supported | seed syntax | silent seed replacement during a delta fix |
| Edit | one causal axis per pass | mask/reference mechanism | full-scene restyling |

## Controlled loop

1. **Freeze** — checksum the approved package master, composition master and six ingredient references. Record the prompt-module version.
2. **Assemble** — copy the universal prompt modules; replace only recipe name, recipe trace and ingredient reference ID.
3. **Generate one candidate** — never ask for a contact sheet or six products in one frame.
4. **Gate A: use truth** — confirm wide spoonable mouth, removable seal/closure and readable product use. Fail perfume, medicine or display-only forms.
5. **Gate B: material truth** — confirm premium optically clear glass, refraction, controlled edge highlight, wall thickness and heavy base. Fail plastic seams, acrylic haze or disposable rims.
6. **Gate C: overlay geometry** — normalize to 1536 square and overlay at 50% opacity against `ST3-REF-PRODUCT-COMPOSITION-MASTER-18`. Measure jar bbox/center/baseline and three supporting-object centers.
7. **Gate D: background** — sample four empty corners and the unobstructed background field. Outside the contact shadow, median color must remain within ΔE00 5 of Cultured Cream `#F5F1E8`; fail gradients, room horizons or colored casts.
8. **Gate E: recipe truth** — compare only to the matching individual ingredient reference. Confirm correct ingredient and one causal food trace; reject unrelated props or decorative garnish.
9. **Delta repair** — name one failure axis and edit only that axis: `geometry`, `scale`, `glass`, `background`, `ingredient identity`, `food trace` or `text`. Preserve all passing axes and the recorded seed/reference order.
10. **Approve and checksum** — a SKU advances only when every gate passes. Record final dimensions, checksum, model, adapter, prompt version, reference IDs and QA measurements.
11. **Advance sequentially** — begin the next SKU from the golden masters, never from the last approved SKU. This prevents cumulative drift.

## Pass thresholds

- Jar center and supporting-object centers: within ±2 percentage points of the master.
- Jar width and height: within ±3% of the master's normalized dimensions.
- Product ingredient-cue size: within ±3% of the composition master.
- Individual ingredient-reference subject/dish grouping: within ±4% of its 28–72% bounding-box scale.
- Camera: front azimuth visually square; left/right vertical edges remain parallel; no visible wide-angle distortion.
- Background: four-corner median ΔE00 ≤ 5 from `#F5F1E8`.
- Glass: no plastic seam, acrylic milkiness, disposable flange or physically impossible reflection.
- Copy: `MORA` plus exact recipe name only; if model text is unreliable, generate a clean print zone and apply approved direct print in post.

## Delta prompt grammar

```text
Keep the approved reference order, camera, crop, lighting, background, jar material,
all object coordinates and every passing detail unchanged.
Correct only [FAILED_AXIS]: [MEASURED_FAILURE] → [LOCKED_TARGET].
Do not redesign, restyle, add props, move another object or change the recipe trace.
```

## Stop conditions

- After two failed delta attempts on the same axis, discard the edit chain, return to the golden master and regenerate that SKU once with the same universal prompt instead of compounding edits.
- If that fresh master-based regeneration fails the same axis again, it is the third model-level failure: mark the model adapter incompatible for that asset role and route to a model or post-production method that can honor image references and coordinates.
- Brand mood images are the only exception to the plain-background rule. They do not become product-series geometry references.

## Migration order for existing Stage 3 images

1. Approve the eight new reference images.
2. Regenerate the six product portraits from the frozen masters.
3. Regenerate every non-mood packaging, ingredient, infusion, intermediate, process and customer-use image onto the plain Cultured Cream brand background. Do not introduce another environmental exception.
4. Preserve the existing front, side and aerial brand-mood frames as the explicit environmental exception.
5. Replace canonical asset mappings only after each replacement passes and receives a checksum; never bulk-replace unreviewed candidates.
