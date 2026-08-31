# Stage 3 R5 — Black Sesame Square Product

## Input authority

- **Image 1:** `r18-07-thyme-honey-plain-ui-cultured-cream-square.png`, exact authority for jar, camera, coordinates, scale, Batch Record, shadow and flat `#F5F1E8` field.
- Change only verified Black Sesame food identity and the `RECIPE` value.

## Built-in imagegen edit prompt

Use case: precise-object-edit.

Asset type: Stage 3 landing product-grid / PDP-primary square product family frame.

Primary request: change only (1) Image 1's food identity inside the existing jar to Black Sesame and (2) recipe-name value `THYME HONEY` to exact text `BLACK SESAME`. Keep everything else exactly unchanged.

Food change: preserve the same dense cultured base, fill level, surface and edible texture. Create restrained ivory-to-stone-grey marbling with fine actual-scale black sesame particles embedded at different depths. Keep light ivory areas visible and the marble naturally irregular. Never make the contents pitch black, charcoal paste, uniformly grey, highly contrasted or topped with a seed pile. Remove honey and thyme.

Exact preserve lock: identical strict-front low-wide jar geometry, open mouth, rim, threads, base, glass thickness/refraction, front face, centered coordinates, occupancy, crop, complete silhouette and product perspective; identical partial Batch Record paper, size, attachment, coverage, hierarchy, type style, rules and maker-check mark; identical compact contact shadow; identical perfectly flat edge-to-edge `#F5F1E8` background without physical surface, texture, horizon, seam, gradient or vignette. Preserve central-72% containment, at least 12% margin and template 42–50% frame-height intent.

Text lock: preserve `MORA`, `BATCH RECORD`, `RECIPE`, `MILK`, `CULTURE`, `STRAINER`, `MAKER CHECK` and the check mark exactly once. Replace only `THYME HONEY` with `BLACK SESAME`. No other text changes or additions.

Avoid: camera/crop/scale shift, jar or record redesign, label movement, pitch-black yogurt, uniform grey mass, black paste, seed topping, external seed, honey, thyme, cap, spoon, prop, second object, wall, floor, horizon, texture, gradient, warm cast, floating jar, CGI glass, logo or watermark.

## Role QA

- One complete strict-front family jar with ivory/stone-grey marble and fine sesame particles.
- Contents never read as pitch black; exact `BLACK SESAME` recipe value.
- Uniform `#F5F1E8`, same coordinates, scale, record and shadow.

## Delivery protocol

- Preserve the built-in generated PNG untouched under `assets/revision-r5-layout-aware/native/products/`.
- Create the delivery PNG with `sips -z 2048 2048`.
- The 2048 × 2048 delivery file is a resample from native, not a new render and not new detail.

## Delivery record

- Native: `assets/revision-r5-layout-aware/native/products/st3-r5-product-black-sesame-native.png`, 1254 × 1254 PNG, SHA-256 `c37a57f846cf51bb72fb2a37e0e8373059fa1187b8228d3e19a2273b47978d50`.
- Delivery: `assets/revision-r5-layout-aware/products/st3-r5-product-black-sesame.png`, 2048 × 2048 PNG, SHA-256 `5ed7e9e4b35142502e8a4c29817c92f8fdb7198136632f498e4d45a94ba84c46`.
- Delivery was produced from the untouched native PNG with `sips -z 2048 2048`; it is a resample, not a new render and not new detail.
