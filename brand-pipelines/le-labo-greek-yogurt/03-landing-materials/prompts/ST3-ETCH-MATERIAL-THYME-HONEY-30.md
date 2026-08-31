# ST3-ETCH-MATERIAL-THYME-HONEY-30 — Thyme Honey Material Plate

## Compiled material contract

- Raw: one fresh thyme sprig touching raw golden honey.
- Preparation: measured honey-led thyme preparation; pale amber, slowly flowing syrup. No exact heat, time, filtration or dose.
- Finished trace: one amber honey ribbon with fine thyme flecks in dense yogurt.
- Single morph: thyme stem and honey meniscus share one contour, thicken into syrup, resolve as the ribbon carrying flecks.
- Tint: sampled amber `#F5C246` from Image 2, 6% opacity, preparation and finished trace only.
- Reference order: Image 1 style master; Image 2 `ST3-REF-INGREDIENT-THYME-HONEY-19` raw identity/tint; approved facts. No Le Journal source image.

## Exact generation prompt

Use case: illustration-story.

Asset and ingredient: `ST3-ETCH-MATERIAL-THYME-HONEY-30`, Thyme Honey square material-transition engraving for a premium cultured-food landing page.

References in order: Image 1 is the immutable MORA Material Folios style authority, controlling clean cream paper, fine near-black copperplate contour, breathable cross-hatch, restrained stipple, one upper-left engraving light, negative-space ratio and single-transition restraint. Image 2 is the only authority for raw thyme/honey identity, natural texture and the actual amber tint. Do not render Image 2’s glass specimen dish, photographic lighting or full-color food. No Le Journal source image is attached.

Paper and composition: exact clean contemporary Cultured Cream `#F5F1E8`, exact 1:1 square, 1536 × 1536 target. One compact uninterrupted transition group uses 30–35% of the frame; 65–70% remains clean cream negative space. Fixed lower-left → upper-right reading direction. All contours remain inside an 8% safe margin. Near-orthographic 90 mm macro-equivalent compression; no photographic depth effects.

Single causal morph: at lower-left, draw one immediately recognizable fresh thyme sprig touching one raw honey meniscus, matching Image 2, in monochrome engraving line. One thyme stem contour and the honey meniscus join without a break, then gradually thicken toward the center into a materially specific pale-amber, slowly flowing honey-led thyme syrup with restrained viscosity and a few fine thyme flecks. The same syrup contour continues upper-right and resolves inside one compact dense-yogurt fold as exactly one amber honey ribbon carrying the same fine thyme flecks. Raw → syrup → yogurt ribbon is one uninterrupted A→B→C material path, not three objects, panels, arrows or vignettes.

Ink, light and tint: fine Carbon `#171714` copperplate contour, material-following hatch and restrained stipple on `#F5F1E8`; one coherent upper-left engraving light and retained paper midtones. Keep the raw thyme and raw honey entirely monochrome. Apply one translucent actual-ingredient amber sampled from Image 2, `#F5C246` at 6% opacity, only to the center syrup and upper-right finished honey ribbon. Do not tint the paper, raw ingredient, outline, yogurt body or any other region. No second hue, gradient, badge or color block.

Constraints: no text, ingredient name, recipe number, label, arrow, legend, panel, border, badge, logo or watermark. No separate raw/preparation/trace samples, group atlas, second morph, floating sample, decorative garnish, glass dish, vessel, package or unrelated prop. No generic elixir, tincture, spirit, dropper, whiskey, flask, perfume bottle, botanical-label layout, apothecary frame, Victorian ornament, rustic still life, LE LABO wording, Le Journal composition or trade dress. No invented temperature, time, filtration, dose, origin, health, safety or performance claim. No tint on raw thyme/honey or paper; no second color, pure black, sepia, faux aging, woodcut mass, watercolor, photorealism, 3D, vector icon, shadow, glow or bokeh.

Output: `assets/editorial-etchings/mora-etch-material-thyme-honey-square.png`

## QA gates

1. Exact square, lower-left → upper-right, 65–70% negative space, 8% safety.
2. Thyme + honey raw identity matches Image 2 but no specimen dish appears.
3. Syrup is viscous and honey-led; finished trace is one ribbon with fine thyme flecks.
4. One uninterrupted raw → syrup → trace morph; no panels or second transition.
5. Raw remains monochrome; only `#F5C246` at 6% tint appears in syrup/ribbon.
6. Fine style-master line behavior, no text/source motif/unsupported claim.

## Production record

- Generation: distinct built-in imagegen call with Image 1 style authority and Image 2 Thyme Honey raw-identity/tint authority; no Le Journal reference attached.
- Candidate 1: causal diagonal, ingredient identity and single morph passed; the amber read stronger than the locked 5–8% material tint.
- Delta 1 — `tint_opacity` only: reduced the existing preparation and finished-ribbon amber to a barely perceptible 6% translucent `#F5C246`, preserving hue, tint scope, crop, silhouette, linework, light and story. Accepted.
- Original-detail QA: black engraving reads first; raw thyme/honey remains monochrome; the subtle amber occurs only in the central preparation and upper-right finished trace; no extra object, dish, text or source motif.
- Delivery normalization: imagegen-native 1254 × 1254 was deterministically resampled to 1536 × 1536 with high-quality Lanczos, with no crop or content change; final original-detail QA passed.
