# ST3-GLASS-CONTEXT-R2-66 — Final Inspection, Exact Side

## Mode and reference roles

- Mode: commercial-photo edit, second frame in a locked two-axis series.
- Image 1: legacy final-inspection side photograph; authority for the same maker’s right profile, charcoal wardrobe, both-hand phase, modern atelier, table, sealer, side framing and daylight.
- Image 2: accepted R2 frame 65; authority for current maker continuity, glass-jar scale, foil state, thin-cap phase, material response and grade.
- Image 3: R2 Vessel Record master; sole geometry authority for glass, shoulder, mouth, base, cap and direct print.
- Web role: package-physics feature companion. The information goal is the sidewall, fill level, glass thickness, foil edge and hand contact.

## Exact edit prompt

Photorealistic commercial food-process photograph. Change viewpoint-dependent package content only in Image 1 while preserving its exact maker-right 90° profile composition. Replace the old plastic cup with the same single MORA R2 heavy clear-glass Greek-yogurt jar shown in Image 2 and governed by Image 3. Preserve the same pre-overcap inspection moment as frame 65: one fully attached real peelable foil seal with practical pull tab on the wide mouth; one very thin flush graphite anodized-aluminum cap lying flat on the table at the corresponding maker-left position. The jar remains cylindrical with short rounded shoulder, thick wall, heavy base and dense ivory yogurt with one restrained amber internal trace.

The camera is exact 90° maker-right side relative to the frontal axis in frame 65. The direct-printed face therefore turns away; the side may remain optically blank or show only one physically correct narrow edge/arc of the neutral-black exterior print through the curved glass, never a front-facing label pasted onto the side. The same maker uses both hands in the same light steadying contact and looks down at the same seal/fill/print alignment phase. Preserve the legacy side maker identity, one-eye profile, hair, skin, charcoal T-shirt and apron, hand placement, stainless table, idle sealer, pale mineral wall, crop, camera height, focus, upper-left daylight, reflections, shadow direction, neutral grade and natural texture.

Series lock: maker identity, age appearance, hair, wardrobe, atelier, workstation, sealer, jar dimensions, glass thickness, cap dimensions, yogurt fill, foil phase, hand contact, light direction, contrast, white balance, retouching and 3:2 scale match frame 65. Variation axis is viewpoint only: strict front -> exact maker-right 90° side.

Constraints: exactly one person and one glass jar; no identity drift, second person, extra hand, second jar, plastic cup/case, molded flange, acrylic wall, paper label, sticker, sleeve, tall cap, narrow perfume neck, atomizer, dropper, medicine, whiskey, amber apothecary cue, rustic styling, front print falsely readable from side, pseudo-copy, mutated logo or watermark. Do not imply founder, actual facility, approved SOP or validated packaging performance.

Output: `assets/revision-r2/glass-context/mora-glass-final-inspection-side-r2.png`.

## QA gates

- Exact maker-right 90° side; one-eye profile and jar sidewall are geometrically consistent.
- Same maker, wardrobe, jar, foil phase, cap, hand action, scene and lighting as frame 65.
- No front-facing or readable print appears from the side; the wall may be blank or retain only a non-legible edge sliver.
- Heavy glass, foil, metal, skin and shadows remain physically plausible.
- No plastic, paper label, bulky closure, extra person, extra jar or pseudo-copy.

## Production record

- Built-in imagegen edit with legacy side as Image 1, accepted R2 front as Image 2 and R2 vessel master as Image 3.
- Candidate 1 passed maker, viewpoint, glass and action but exposed multi-line front pseudo-copy on the sidewall.
- Delta 1 changed `text_artifact` only and removed the physically impossible readable side copy.
- Delta 2 changed `cap_thickness` only, preserving the accepted identity, view, jar, foil and scene. Accepted.
- Final: 1536 × 1024; SHA-256 `b122c7d0fab6593fb5659db2c5f99c03dc57a2d24cdcfce4be97105e1341882b`.
