# ST3-DETAIL-R3-68 — Thyme Honey First-Spoon Macro

## Decision package

- Mode: reference-led commercial-photo edit, then one-axis delta repairs.
- Web role: detail proof.
- Information goal: prove the dense Greek-yogurt cut face, viscous thyme-honey ribbon, edible-scale thyme flecks, and heavy R2 glass during a physically credible first-spoon action.
- Format: 4:5 portrait macro.
- Image 1: `assets/revision-r2/products/mora-thyme-honey-glass-front-r2.png`; authority for the R2 vessel silhouette, thick glass wall and base, direct-print identity, ivory yogurt and amber internal trace.
- Image 2: `assets/revision-r2/glass-context/mora-glass-customer-peel-spoon-front-r2.png`; authority for open-glass construction, natural hand scale, stainless spoon, dense-yogurt behavior, upper-left daylight and glass refraction.
- Locked invariants: one hand, one spoon, one jar; R2 heavy glass; exact direct print `MORA` / `THYME HONEY`; no plastic cup, paper label, sticker or sleeve.

## Base generation prompt

```text
Image 1: R2 THYME HONEY closed-glass product master. It is the sole authority for MORA vessel identity: premium optically clear heavy flint-glass cylindrical jar, short rounded shoulder, wide spoonable mouth, visibly thick wall and heavy base, neutral-black direct print reading exactly “MORA” and “THYME HONEY”, dense ivory yogurt, restrained amber thyme-honey trace, and Cultured Cream tonal family. Do not copy its closed cap because the target is open.
Image 2: R2 customer peel-and-spoon context. Use it only as authority for the open R2 glass construction, realistic hand scale, stainless teaspoon, dense yogurt behavior, upper-left soft daylight, glass refraction, and direct-print placement. Do not include foil or cap in the target.

Purpose: web landing-page detail proof, 4:5 portrait macro. Prove the dense Greek-yogurt cross-section on the first lifted spoon, the viscous honey ribbon, fine edible thyme flecks, and the weight of the R2 glass jar. This is a photographic evidence frame, not a lifestyle scene.

Scene: one open MORA THYME HONEY heavy clear-glass jar on a plain pale mineral surface against a seamless warm Cultured Cream background. No other object is visible.

Subject and action: exactly one natural adult hand enters from the upper right and holds exactly one stainless teaspoon by its handle. The spoon has just completed the first scoop and is lifted only 25–35 mm above the jar mouth. The spoon bowl is side-on to camera and carries one compact, cohesive scoop with a clearly readable dense cut face and one clean concave scoop mark remaining in the yogurt below. The wrist, thumb and fingers form a practical pinch grip with anatomically correct joints; the spoon is supported only by that hand. A short, thick amber thyme-honey ribbon stretches from the lower edge of the spoonful back toward the scoop furrow, visibly viscous and gravitational. Sparse tiny thyme flecks are embedded naturally in the cut face and honey, at edible herb scale. Most yogurt remains ivory white.

Composition and capture: vertical 4:5 frame. Close-up oblique front view, camera centered on the direct-printed face with a restrained 15–20° downward elevation so the open mouth, spoon cross-section, inner yogurt and front print are all legible. Jar occupies about 74% of frame width; keep the thick glass wall, mouth rim, direct print and complete spoon bowl visible. Focus plane includes the spoon cross-section, honey bridge, near glass rim and “MORA / THYME HONEY” print; background and distant hand fall off softly. Photorealistic premium commercial food photography with natural asymmetry, subtle yogurt microtexture, realistic skin pores, restrained brushed-steel reflection, plausible glass refraction and grounded contact shadow.

Lighting and material response: one large soft upper-left daylight key with gentle frontal fill, retained highlights in glass and spoon, no clipped glare, neutral-warm white balance, low retouching. The yogurt deforms under the spoon with believable weight and holds a dense Greek-yogurt peak without looking whipped, curdled, aerated, gelatinous or ice-cream-like.

Constraints: preserve R2 heavy glass geometry and direct print. Render exactly “MORA” and “THYME HONEY” in restrained neutral-black direct print on glass, never a plastic or paper label. Exactly one hand, one spoon and one jar. No cap, foil, second hand, extra utensil, extra jar, ingredients, thyme sprig, honey dipper, plate, napkin, label, sticker, sleeve, plastic cup, disposable rim, paper packaging, pseudo-copy, extra glyph, watermark or source-brand mark. No impossible finger count, merged fingers, floating utensil, honey pouring from nowhere, cloned flecks, CGI gloss, ray-traced reflection, HDR clarity, total-frame sharpness or dramatic bokeh.
```

## Iteration record

1. Base candidate passed role, crop, one-hand action, spoon support, honey bridge, thyme scale, R2 glass weight and exact copy. Failed one axis: yogurt surface read too curdled.
2. Delta 1 changed only `yogurt_texture`: replaced pebbled curds with cohesive satin-matte strained yogurt, a compact spoon cut face and smooth weight-bearing scoop furrow. Passed.
3. Delta 2 changed only `direct_print_finish`: replaced dimensional lettering with thin flat neutral-black ink directly on glass while preserving the complete accepted frame. Passed.
4. Delivery normalization: center-cropped the native 1122 × 1402 candidate by one pixel per edge to an exact 1120 × 1400 4:5 canvas; no content-bearing region was removed.

## Delta prompts

### Delta 1 — yogurt texture only

```text
Change only the yogurt texture. Replace curd-like pebbled granules and cottage-cheese lumps with photorealistic very dense strained Greek yogurt: cohesive satin-matte cream with fine natural dairy microtexture, a clean compact cut face on the spoon, smooth weight-bearing folds in the jar and one clean concave first-scoop furrow. Preserve composition, hand, spoon, jar, honey bridge, thyme flecks, print, lighting and color exactly.
```

### Delta 2 — direct-print finish only

```text
Change only the print finish on the front glass. Render exactly “MORA” and “THYME HONEY” as thin, flat, neutral-black ink printed directly onto the exterior glass surface, following the glass plane with no thickness. Remove raised, beveled, embossed, debossed, metallic, shadowed or dimensional letter effects. Preserve every other accepted axis exactly. No backing shape, paper label, plastic label, sticker, clear film, plaque, sleeve or frosted patch.
```

## Provenance

- Generator: Aside built-in Image Generation skill (`imagegen.generate`), reference-led edit workflow.
- Source reference 1: `brand-pipelines/le-labo-greek-yogurt/03-landing-materials/assets/revision-r2/products/mora-thyme-honey-glass-front-r2.png` (1254 × 1254).
- Source reference 2: `brand-pipelines/le-labo-greek-yogurt/03-landing-materials/assets/revision-r2/glass-context/mora-glass-customer-peel-spoon-front-r2.png` (1535 × 1024).
- Accepted generation: base plus two one-axis repairs.
- Final image: `assets/revision-r3/product-detail/mora-thyme-honey-first-spoon-macro-r3.png`.
- Final canvas: 1120 × 1400 px, exact 4:5.
- SHA-256: `291b818adbbc474c5b09714b6d3b4ae28429e4ec915aaa55cdc826a13bc39202`.

## Final QA

- PASS — web detail-proof role: the spoon cut face, honey bridge, thyme flecks and scoop furrow dominate the evidence area.
- PASS — physical action: exactly one anatomically credible hand supports one spoon above one jar; the honey bridge follows gravity and connects to the furrow.
- PASS — food material: dense cohesive strained-yogurt cross-section, ivory body, restrained amber honey and sparse edible-scale thyme flecks.
- PASS — product continuity: R2 cylindrical heavy clear glass, thick mouth wall and heavy base remain legible.
- PASS — identity: exact two-line `MORA` / `THYME HONEY` flat direct print on glass.
- PASS — packaging exclusions: no plastic cup, paper label, sticker, sleeve, cap or foil.
- PASS — delivery: 1120 × 1400 px, exact 4:5 PNG.
