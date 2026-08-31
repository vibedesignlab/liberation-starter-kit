# ST3-REF-INGREDIENT-OLIVE-OIL-SEA-SALT-24

## Decision package

- Web role: individual recipe-ingredient reference for a repeatable collection grid.
- Information goal: make the one intentional Olive Oil & Sea Salt pairing immediately legible while preserving a coordinate-locked comparison frame.
- Viewpoint and frame: true 90° aerial, 1:1 square, 100 mm macro-equivalent behavior.
- Series lock: Cultured Cream `#F5F1E8` plain seamless matte surface; one low circular optically-clear glass specimen dish; dish and recipe pair centered at x/y 50%; combined subject bounding box x/y 28–72%; one large soft key from upper-left at 4500 K; restrained frontal fill; soft down-right contact shadow; invisible natural retouching.
- Permitted variation axis: recipe ingredient identity only. Olive oil and sea salt are one locked recipe pairing, not an ingredient atlas.

## Final generation prompt

Use case: product-mockup.
Purpose: landing-page individual raw recipe-ingredient reference and collection-grid master for MORA premium infused Greek yogurt.
Scene: a completely plain, seamless matte Cultured Cream background, exact visual target `#F5F1E8`, with no horizon, no texture, no gradient, no set dressing.
Subject: one identical low circular optically-clear glass specimen dish containing the single intentional recipe pairing Olive Oil & Sea Salt: a shallow pool of fresh green-gold extra-virgin olive oil occupying most of the dish, with one restrained crescent of large irregular translucent coarse sea-salt crystals clearly visible within the same dish at the upper-right edge; both materials remain visually distinct but belong to one recipe frame.
Composition: true 90-degree aerial view; 1:1 square canvas; dish and recipe pair centered at x 50%, y 50%; the entire circular dish and ingredients together occupy the exact bounding box from 28% to 72% on both axes; broad even margins; no crop; no rotation or perspective drift; authoritative collection-grid alignment.
Photographic behavior: photorealistic commercial food reference, 100 mm macro-equivalent perspective, complete front-to-back sharpness across the shallow dish, believable liquid surface tension and restrained natural irregularity.
Lighting and material response: one large soft key from upper-left at 4500 K, controlled frontal fill, soft contact shadow down-right; physically plausible clear-glass edge highlights, wall thickness, refraction, and reflection angles; olive-oil highlight follows the same light source; background stays uniform Cultured Cream with retained highlight detail.
Constraints: exactly one recipe pairing in one dish; only raw olive oil and coarse sea salt; no olives, olive leaves, herbs, pepper, citrus, yogurt, bread, spoon, bottle, packaging, label, typography, logo, watermark, hands, table grain, stone, linen, decorative prop, group atlas, ingredient compartments, CGI gloss, acrylic haze, impossible liquid reflection, dissolved invisible salt, floating shadow, or extra vessel.

## QA gate

- PASS only if the camera reads as true overhead and the circular dish is not elliptical.
- PASS only if dish/pair center is within ±2% of x/y 50% and the combined bounding box is within ±4% of 28–72%.
- PASS only if the background is plain Cultured Cream and no unrelated prop appears.
- PASS only if raw olive oil and coarse sea salt are both unambiguously visible in the same single dish and the glass/liquid reflections share one plausible light source.

## Production record

- Built-in image generation was used as one distinct asset call.
- Original generation passed recipe-pair, glass/liquid, aerial-view, background, and single-vessel checks but failed the locked 28–72% occupancy.
- Two scale-only delta edits were evaluated. The approved material/lighting result was finally coordinate-normalized by centered crop and 1536 × 1536 resampling; no subject, lighting, color, or prop content was added or replaced.
- Final workspace asset: `assets/reference-system/mora-ingredient-olive-oil-sea-salt-aerial.png`.
