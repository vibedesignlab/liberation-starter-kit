# Stage 3 R5 — Olive Oil & Sea Salt Square Product

## Input authority

- **Image 1:** `r18-07-thyme-honey-plain-ui-cultured-cream-square.png`, exact authority for jar, camera, coordinates, scale, Batch Record, shadow and flat `#F5F1E8` field.
- Change only verified Olive Oil & Sea Salt food identity and the `RECIPE` value.

## Built-in imagegen edit prompt

Use case: precise-object-edit.

Asset type: Stage 3 landing product-grid / PDP-primary square product family frame.

Primary request: change only (1) Image 1's food identity inside the existing jar to Olive Oil & Sea Salt and (2) recipe-name value `THYME HONEY` to exact text `OLIVE OIL & SEA SALT`. Keep everything else exactly unchanged.

Food change: preserve the same dense ivory cultured base, fill level, surface and edible texture. Replace the honey/thyme fold with one thin translucent olive-gold oil ribbon and a narrow pearly interface within the yogurt. If salt is visible, show only a few actual-scale fine crystals embedded at the interface—never a pile, crust, oversized flake or garnish. Keep the oil restrained, food-native and physically integrated, not a glossy pool or decorative drizzle.

Exact preserve lock: identical strict-front low-wide jar geometry, open mouth, rim, threads, base, glass thickness/refraction, front face, centered coordinates, occupancy, crop, complete silhouette and product perspective; identical partial Batch Record paper, size, attachment, coverage, hierarchy, type style, rules and maker-check mark; identical compact contact shadow; identical perfectly flat edge-to-edge `#F5F1E8` background without physical surface, texture, horizon, seam, gradient or vignette. Preserve central-72% containment, at least 12% margin and template 42–50% frame-height intent.

Text lock: preserve `MORA`, `BATCH RECORD`, `RECIPE`, `MILK`, `CULTURE`, `STRAINER`, `MAKER CHECK` and the check mark exactly once. Replace only `THYME HONEY` with the exact value `OLIVE OIL & SEA SALT`, fitted inside the existing recipe-name field without changing the label size, hierarchy or adding a second line of unrelated text. No other text changes or additions.

Avoid: camera/crop/scale shift, jar or record redesign, label movement, thick oil pool, broad yellow stripe, decorative drizzle, salt pile, crust, oversized crystal, external ingredient, honey, thyme, cap, spoon, prop, second object, wall, floor, horizon, texture, gradient, warm background cast, floating jar, CGI glass, logo or watermark.

## Role QA

- One complete strict-front family jar with thin olive-gold ribbon, narrow pearly interface and only actual-scale salt evidence.
- Exact `OLIVE OIL & SEA SALT` recipe value; all other record structure preserved.
- Uniform `#F5F1E8`, same coordinates, scale and compact shadow.

## Delivery protocol

- Preserve the built-in generated PNG untouched under `assets/revision-r5-layout-aware/native/products/`.
- Create the delivery PNG with `sips -z 2048 2048`.
- The 2048 × 2048 delivery file is a resample from native, not a new render and not new detail.

## Delivery record

- Native: `assets/revision-r5-layout-aware/native/products/st3-r5-product-olive-oil-sea-salt-native.png`, 1254 × 1254 PNG, SHA-256 `16a3ee0b28d17539c0de9d8cad87e7adc32cd00249e7af858e28c6a698cef599`.
- Delivery: `assets/revision-r5-layout-aware/products/st3-r5-product-olive-oil-sea-salt.png`, 2048 × 2048 PNG, SHA-256 `f3e21299281bf3a155055dcf64797eaee3f4117f388fc61a8ce3d309e1512791`.
- Delivery was produced from the untouched native PNG with `sips -z 2048 2048`; it is a resample, not a new render and not new detail.
