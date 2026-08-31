# ST3-REF-INGREDIENT-BLACK-SESAME-23

## Decision package

- Web role: individual ingredient reference for a repeatable collection grid.
- Information goal: identify only black sesame and preserve a coordinate-locked comparison frame.
- Viewpoint and frame: true 90° aerial, 1:1 square, 100 mm macro-equivalent behavior.
- Series lock: Cultured Cream `#F5F1E8` plain seamless matte surface; one low circular optically-clear glass specimen dish; dish and ingredient centered at x/y 50%; combined subject bounding box x/y 28–72%; one large soft key from upper-left at 4500 K; restrained frontal fill; soft down-right contact shadow; invisible natural retouching.
- Permitted variation axis: ingredient identity only.

## Final generation prompt

Use case: product-mockup.
Purpose: landing-page individual raw-ingredient reference and collection-grid master for MORA premium infused Greek yogurt.
Scene: a completely plain, seamless matte Cultured Cream background, exact visual target `#F5F1E8`, with no horizon, no texture, no gradient, no set dressing.
Subject: one identical low circular optically-clear glass specimen dish containing only a shallow, naturally irregular mound of real raw black sesame seeds; individual matte charcoal-black seeds and their tiny varied oval forms remain legible, with restrained real-world variation rather than a cloned procedural pattern.
Composition: true 90-degree aerial view; 1:1 square canvas; dish and ingredient centered at x 50%, y 50%; the entire circular dish and ingredient together occupy the exact bounding box from 28% to 72% on both axes; broad even margins; no crop; no rotation or perspective drift; authoritative collection-grid alignment.
Photographic behavior: photorealistic commercial food reference, 100 mm macro-equivalent perspective, complete front-to-back sharpness across the shallow dish, restrained natural microtexture.
Lighting and material response: one large soft key from upper-left at 4500 K, controlled frontal fill, soft contact shadow down-right; physically plausible clear-glass edge highlights, wall thickness, refraction, and reflection angles; background stays uniform Cultured Cream with detail preserved in the dark sesame seeds.
Constraints: one recipe ingredient per frame; only black sesame inside the dish; exact identical low circular optically-clear specimen-dish geometry; no group atlas, white sesame, paste, oil, yogurt, spoon, bottle, packaging, label, typography, logo, watermark, hands, table grain, stone, linen, decorative prop, CGI gloss, acrylic haze, cloned seed grid, crushed blacks, floating shadow, or extra vessel.

## QA gate

- PASS only if the camera reads as true overhead and the circular dish is not elliptical.
- PASS only if dish/ingredient center is within ±2% of x/y 50% and the combined bounding box is within ±4% of 28–72%.
- PASS only if the background is plain Cultured Cream and no unrelated prop or second ingredient appears.
- PASS only if individual black sesame seeds remain legible without crushed-black loss and the dish reads as clear glass.

## Production record

- Built-in image generation was used as one distinct asset call.
- Original generation passed ingredient, glass, aerial-view, background, and single-object checks but failed the locked 28–72% occupancy.
- Two scale-only delta edits were evaluated. The approved material/lighting result was finally coordinate-normalized by centered crop and 1536 × 1536 resampling; no subject, lighting, color, or prop content was added or replaced.
- Final workspace asset: `assets/reference-system/mora-ingredient-black-sesame-aerial.png`.
