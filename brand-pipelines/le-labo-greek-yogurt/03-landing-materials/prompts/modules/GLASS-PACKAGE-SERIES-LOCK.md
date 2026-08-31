# MORA Glass Package Series Lock

## Role

This module is the non-negotiable packaging layer for every non-mood MORA product image. It is attached before the recipe-specific prompt. A variation may change the food trace and exact product name only; it may not redesign the vessel.

## Reference precedence

1. `ST3-REF-GLASS-PACKAGE-MASTER-17` controls silhouette, glass, wall thickness, base, shoulder, mouth and closure.
2. `ST3-REF-PRODUCT-COMPOSITION-MASTER-18` controls camera, canvas occupancy and object coordinates.
3. The relevant individual ingredient reference controls ingredient identity and natural surface detail.

If a model supports multiple image references, provide them in that order. If it supports weighting, geometry/material receives the highest weight, composition the second highest and ingredient appearance the third. Never use a generated SKU as the new geometry master.

## Locked subject

Premium spoonable Greek yogurt in one optically clear, heavy food-vessel concept translated from the source bottle's cylindrical body, short rounded shoulder, thick base and restrained dark closure. The mouth is wide and equals 70–75% of the body diameter. The jar has no atomizer, spray tube, dropper or narrow perfume neck. The glass shows plausible refraction, controlled edge highlights, clean wall thickness and a visibly heavy base. The only front marking is minimal neutral-black direct print: `MORA` and the exact MORA recipe name.

The geometry is source-inspired, not source-branded. Never reproduce the LE LABO wordmark, perfume label grid, formula number, address, personalized label or paper label.

## Locked capture

- Canvas: 1536 × 1536, square.
- Camera: 0° azimuth, 12° downward elevation, 85 mm full-frame equivalent, vertical sensor plane.
- Jar bounding box: x 35–65%, y 18–80%.
- Jar center: x 50%, y 49%; baseline y 80%.
- Background and ground: one plain seamless matte field, Cultured Cream `#F5F1E8`.
- Lighting: one large soft key upper-left at 4500 K, controlled frontal fill, two black flags defining the glass edge, soft contact shadow down-right.
- Color: neutral-warm commercial food grade; no sepia, no cinematic color cast.
- Finish: premium editorial realism, fine natural grain, believable food and glass microtexture.

## Allowed variation

- Exact recipe name.
- Actual yogurt color, ribbon, fleck, seed, grain or mineral trace caused by that recipe.
- The matching individual ingredient cue while its coordinate and scale remain locked.
- Minor natural irregularity in yogurt surface and ingredient geometry.

## Negative constraints

No plastic cup, acrylic haze, disposable rim, molded plastic seam, pouch, carton, perfume sprayer, narrow neck, dropper, amber tincture bottle, whiskey styling, lab glassware, rustic table, paper label, paper collar, sleeve, sticker, opaque backing, recipe-color ink, floating objects, extra props, decorative typography, illegible invented copy, glossy gradient background, room set, horizon line, perspective drift or dramatic depth of field.

## Output test

Reject if a viewer can reasonably call the vessel plastic, perfume, medicine or a display bottle that cannot be eaten with a spoon. Reject if the jar silhouette, centerline, baseline, background or object scale differs from the master beyond the QA tolerances.
