# Stage 3 R5 — Citrus Peel Square Product

## Input authority

- **Image 1:** `r18-07-thyme-honey-plain-ui-cultured-cream-square.png`, exact authority for jar, camera, coordinates, scale, Batch Record, shadow and flat `#F5F1E8` field.
- Change only verified Citrus Peel food identity and the `RECIPE` value.

## Built-in imagegen edit prompt

Use case: precise-object-edit.

Asset type: Stage 3 landing product-grid / PDP-primary square product family frame.

Primary request: change only (1) Image 1's food identity inside the existing jar to Citrus Peel and (2) recipe-name value `THYME HONEY` to exact text `CITRUS PEEL`. Keep everything else exactly unchanged.

Food change: preserve the same dense ivory cultured base, fill level, surface and edible texture. Replace the honey/thyme fold with a restrained ingredient trace of fine, short, actual-scale muted yellow-orange peel threads and tiny zest points embedded at multiple shallow depths. No oversized curl, garnish, whole peel strip, orange jam seam or bright artificial yellow.

Exact preserve lock: identical strict-front low-wide jar geometry, open mouth, rim, threads, base, glass, refraction, front face, centered x/y coordinates, occupancy, crop, complete silhouette and product perspective; identical partial Batch Record paper, size, attachment, coverage, hierarchy, type style, rules and maker-check mark; identical compact shadow; identical perfectly flat edge-to-edge `#F5F1E8` background without physical surface, texture, horizon, seam, gradient or vignette. Preserve central-72% containment, at least 12% margin and template 42–50% frame-height intent.

Text lock: preserve `MORA`, `BATCH RECORD`, `RECIPE`, `MILK`, `CULTURE`, `STRAINER`, `MAKER CHECK` and the check mark exactly once. Replace only `THYME HONEY` with `CITRUS PEEL`. No other text changes or additions.

Avoid: camera/crop/scale shift, jar or record redesign, label movement, oversized peel curl, peel garnish, external zest, marmalade, honey, thyme, cap, spoon, prop, second object, wall, floor, horizon, texture, gradient, warm background cast, floating jar, CGI glass, logo or watermark.

## Role QA

- One complete strict-front family jar with ivory base and fine short peel threads/zest points.
- Exact `CITRUS PEEL`; all other record structure preserved.
- Uniform `#F5F1E8`, same coordinates, scale and compact shadow.

## Delivery protocol

- Preserve the built-in generated PNG untouched under `assets/revision-r5-layout-aware/native/products/`.
- Create the delivery PNG with `sips -z 2048 2048`.
- The 2048 × 2048 delivery file is a resample from native, not a new render and not new detail.

## Delivery record

- Native: `assets/revision-r5-layout-aware/native/products/st3-r5-product-citrus-peel-native.png`, 1254 × 1254 PNG, SHA-256 `9123634135a55f3930016b66277e0539805ebd9489f0e8b87881662c3e262f46`.
- Delivery: `assets/revision-r5-layout-aware/products/st3-r5-product-citrus-peel.png`, 2048 × 2048 PNG, SHA-256 `89ed6d6d8cdb5bce6c6c694e94037128137162bbccd00cf1d1d3d1a057fd5750`.
- Delivery was produced from the untouched native PNG with `sips -z 2048 2048`; it is a resample, not a new render and not new detail.
