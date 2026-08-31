# ST3-PRODUCT-GLASS-THYME-HONEY-59

## Series decision package

- Mode: Compile / web-first PDP primary and collection-grid frame.
- Image 1: sole authority for vessel silhouette, glass construction, thin-cap geometry, strict-front camera, centerline, baseline, occupancy, light direction and background.
- Image 2: thyme and honey ingredient-identity reference only; never reproduce its dish, sprig or ingredient arrangement.
- Permitted variation: exact recipe name and internal amber thyme-honey ribbon only.

## Final built-in image prompt

```text
Image 1: MORA closed-glass vessel master; use it as the sole authority for jar geometry, proportions, glass wall and base thickness, short rounded shoulder, wide spoonable mouth, thin graphite cap, strict-front camera, centerline, baseline, frame occupancy, upper-left lighting, contact shadow and Cultured Cream background. Do not preserve its long printed copy block.
Image 2: thyme and honey ingredient identity reference only. Do not reproduce the dish, thyme sprig, honey pool or any exterior garnish.

Use case: product-mockup
Asset type: square PDP-primary and collection-grid product photograph
Primary request: create the THYME HONEY SKU as one closed MORA Greek-yogurt jar. Preserve Image 1’s vessel, camera, scale and lighting exactly. Change only the direct print and the internal yogurt trace.

Subject and material: one premium optically clear heavy flint-glass jar, cylindrical body, short rounded shoulder, wide mouth equal to roughly 70–75% of body diameter, visibly thick wall and heavy base. The flush graphite anodized-aluminum cap is mechanically thin, only 4–6% of total closed-vessel height, aligned with the glass shoulder and never a tall screw block. Dense ivory Greek yogurt fills the jar. Inside the yogurt, show one restrained translucent amber thyme-honey ribbon created by a single low-shear fold; most of the white yogurt body remains visible. No raw thyme or honey appears outside or on top of the jar.

Composition and capture: exact 0° front view, camera square to the printed face, centerline x 50%, vessel bounding box x 35–65% and y 18–80%, baseline y 80%. Keep the exact master occupancy, cap height, camera height and contact-shadow footprint. Seamless visually flat Cultured Cream #F5F1E8 background and ground. Photorealistic commercial food-product photography, one soft upper-left key with restrained frontal fill, plausible glass refraction, controlled reflections, retained highlights, grounded contact and invisible retouching.

Text: neutral-black direct print on glass, not a label. Render exactly “MORA” on the first line and “THYME HONEY” beneath it in restrained narrow monospaced sans-serif. No other letters, numbers, lines, symbols or copy anywhere.

Constraints: one jar only, closed cap, strict front, no exterior ingredient, prop, spoon or dish. No plastic cup, polymer case, disposable rim, paper label, sticker, sleeve, carton, foil disk on top, bulky cap, narrow perfume neck, atomizer, dropper, medicine, tincture, whiskey or apothecary styling. No formula number, SKU number, batch code, weight, preparation note, pseudo-copy, extra glyph, watermark or source-brand mark. No CGI-like uniform gloss, impossible reflection, floating vessel, HDR clarity, clipped highlight or dramatic bokeh.
```

## Acceptance checks

- Same geometry, centerline, baseline, occupancy, light and background as Image 1.
- Cap visible height remains 4–6%; glass weight and refraction remain legible.
- Direct print contains only `MORA` and `THYME HONEY`.
- Amber internal ribbon is restrained and no ingredient prop appears outside.

Output: `assets/revision-r2/products/mora-thyme-honey-glass-front-r2.png`

## Final generation record

- Built-in image tool: one reference-led series generation plus one background-color-only delta repair.
- Final canvas: 1254 × 1254 px.
- Visual QA: exact two-line direct print `MORA` / `THYME HONEY`; heavy clear glass, closed thin graphite cap and amber internal ribbon; no exterior garnish, plastic, paper label or extra copy.
- Repaired far-field edge mean: approximately RGB 247/243/236, visually close to the `#F5F1E8` lock while retaining the grounded contact shadow.
