# R14-01 — Keeper Last Measure / Front Reframe

## Operation

- Use case: `precise-object-edit`
- Asset role: 3:2 website hero/storytelling photograph
- Output: 1536 × 1024 PNG
- Permitted edit axis: environmental camera/framing, story-cluster placement, and scale correction only

## Input roles and transfer boundary

- **Image 1 — edit target and sole narrative/content authority:** `mora-keeper-last-measure-r10.png`. Preserve this exact woman's identity, age, face, hair, graphite workwear, downward concentration, handwriting action, dense strained-yogurt bowl with cloth and paddle, translucent pale whey vessel, record sheet, dark working room, material character, and emotional meaning. Image 1 alone determines the story, subject matter, action, prop family, food states, and arrangement logic.
- **Image 2 — REF-01 / measurement constraint only:** use only its strict-front camera family, credible environmental distance, neutral-grey manufactory light family, and left copy-field geometry. Do not transfer or reproduce its room layout, empty wall, brick division, stainless cabinet, shelf placement, pipework, or exact composition.
- **Image 3 — REF-03 / measurement constraint only:** use only its 165–175 cm adult-to-900 mm workbench scale relationship. Do not transfer its woman identity, face, hair, pose, jar, bowl, spoon, archive trolley, room, or object arrangement.
- **Image 4 — REF-04 / measurement constraint only:** use only ordinary object proportions: a 200–240 mm working bowl and a record sheet appropriately sized to a human hand. Do not transfer its jar, `MORA / 150 g` sticker, spoon, paddle design, studio background, overhead arrangement, or generated text.

No reference image may donate narrative, woman identity, room layout, shelf placement, object lineup, or a replacement scene. This must remain a reframed edit of Image 1, not a recreation of Images 2–4.

## Edit prompt

```text
Use case: precise-object-edit.
Asset type: 3:2 landscape website hero/storytelling photograph, final output 1536 × 1024 PNG.

Input roles:
Image 1 is the existing edit target and the sole authority for narrative and content. Preserve the exact woman, identity, age, face, hair, graphite workwear, downward concentration, writing hand and pen, dense strained yogurt in the cloth-lined stainless bowl, the existing paddle, translucent pale whey in its clear vessel, the operational record sheet, original dark working-room identity, original materials, and the meaning of recording the last measure.
Image 2 is REF-01 and may constrain only strict-front camera behavior, credible environmental distance, neutral-grey manufactory light family, and left copy-field geometry. Never copy its room layout, empty-wall scene, brick split, shelves, cabinets, pipes, or object placement.
Image 3 is REF-03 and may constrain only the scale relationship among a 165–175 cm adult, a 900 mm workbench, and ordinary hand-held objects. Never copy its woman, face, pose, jar, room, trolley, shelves, or action.
Image 4 is REF-04 and may constrain only human-scale bowl and record proportions. Never copy its jar, MORA / 150 g sticker, spoon, paddle, studio surface, object lineup, or text.

Single requested change: reframe Image 1 by pulling the same camera back and squaring it to a mathematically strict 100% FRONT environmental hero view, while moving the complete existing last-measure story cluster into the right 55–60% at credible human scale and opening one clean left copy field. This is a camera/framing and scale correction only, not a new scene.

Destination geometry: use a 45–55 mm full-frame-equivalent environmental perspective, camera approximately 1.35–1.45 m high, at enough distance to show the same credible working room around the subject. The sensor plane is exactly parallel to the rear wall and the front face of the workbench. Rear-wall lines and the workbench front edge remain horizontal; verticals remain vertical. No oblique, corner, three-quarter, top-down, low-angle, tilted, close-portrait, or wide-angle-distorted view.

Composition: retain the same woman writing beside the same dense strained yogurt and translucent whey. Keep her full working relationship to the bench visible, with the woman, bowl, cloth, paddle, record sheet, pen and whey vessel forming one compact but complete right-side story cluster. Preserve their relative left-to-right story logic from Image 1 as closely as the strict-front reframe permits. Keep x 5–40% and y 30–70% as one continuous low-detail copy field: no person, hand, bowl, cloth, paddle, paper, vessel, furniture, shelf, cast shadow, reflection, bright pool, architectural seam, or high-contrast edge may cross it. No generated headline or CTA.

Scale correction: woman 165–175 cm, workbench about 900 mm high, cloth-lined stainless bowl 200–240 mm diameter, record approximately 140–180 mm wide by 190–240 mm high, translucent-whey vessel approximately 90–110 mm diameter by 120–150 mm high, and the existing pen and paddle proportionate to her hands. The yogurt and whey are production samples, not giant hero props. Preserve believable weight, hand contact, cloth drape, liquid fill level, object grounding, and occlusion.

Environment and light: preserve Image 1's original dark working-room identity, aged brick/concrete non-contact shell, brushed-stainless food-contact workbench, restrained archive context, and used material character. Expand only what is necessary for the wider strict-front frame. Use neutral-grey 4500–5000 K working light consistent with Image 1, natural skin texture, retained midtone shadow detail, unclipped white yogurt, translucent pale-yellow whey, physically plausible stainless reflections, and one coherent shadow direction.

Preserve invariants: exact original woman identity and emotional register; exact last-measure writing narrative; one writing action only; same dense strained-yogurt and whey food states; same prop family; same dark room character; same practical workwear; same grounded, unglamorized craft-documentary realism. Preserve the record as an operational sheet but do not invent, add, replace, or make legible any date, code, temperature, number, unit, brand copy, headline, label, or new typography.

Avoid: copying any REF scene; replacing Image 1's woman; turning the frame into REF-01's empty-wall-and-cabinet layout or REF-03's jar-checking scene; losing the cloth-lined yogurt bowl, whey vessel, record, pen or writing action; new people; new food states; jar or product package; oversized bowl, paper, whey vessel or tools; perfume/apothecary cues; domestic kitchen; pretty styled countertop; smiling or camera gaze; decorative femininity; staged product lineup; warm tungsten cast; teal-orange grade; crushed blacks; clipped whites; waxy skin; CGI gloss; impossible fingers; floating objects; conflicting shadows; impossible reflections; text, logo, watermark or sign.

Keep everything else from Image 1 the same. Match perspective, scale, focus, light direction, color temperature, contact shadows, occlusion shadows and material response across the widened frame.
```

## Observable gate

- Pass only if the original woman-writing / dense-yogurt / translucent-whey last-measure narrative remains unmistakable.
- Pass only if no REF room, woman, or object lineup has replaced Image 1's scene.
- Pass only if camera geometry is strict 100% front and x 5–40%, y 30–70% remains usable copy space.
- Pass only if bowl, record and whey vessel read at ordinary human scale.

## Core-axis correction history

The first R14 edit preserved the original last-measure narrative and avoided reference-scene substitution, but its worktable front edge remained diagonal and failed the strict-front gate. One core-axis correction was therefore applied with the current R14-01 PNG as the only input. No reference image was used.

```text
Use case: precise-object-edit.
Asset type: correction to the existing 3:2 photorealistic website hero, retain 1536 × 1024 landscape.

Image 1 is the sole edit target and sole content authority.

Change only one causal axis: correct the camera projection and worktable geometry so the existing scene reads as a mathematically strict 100% FRONT view. Reproject the same room and same table from a sensor plane exactly parallel to the worktable's front face and rear wall. Make the entire visible front edge of the worktable a perfectly straight horizontal line with its left and right endpoints at exactly the same image height. Make the worktable front fascia and lower shelf edges parallel to the image x-axis; keep every architectural vertical vertical and all rear shelf lines horizontal. Remove the current three-quarter/diagonal table perspective only.

This is a surgical geometry correction, not a reframing or restaging. Keep the 1536 × 1024 frame boundaries, crop, zoom, camera distance, lens feel, subject occupancy, spatial placement and negative space unchanged. Do not crop, zoom, pull back, push in, rotate the whole image, mirror the image, move the story cluster, or redistribute any content.

Preserve exactly from Image 1: the same woman's identity, face, age, hair, expression, downward gaze, graphite workwear, body position, hands, writing pose and pen; the same cloth-lined stainless bowl of dense strained yogurt, same cloth drape, same paddle position, same record sheet and its existing marks, same translucent whey glass and fill level; the same right-side placement and relative arrangement of every narrative element; the same continuous empty left copy field; the same scale of the woman, bowl, record, pen, paddle, whey glass, workbench and room; the same room identity, brick/concrete surfaces, shelves, background containers and papers; the same light direction, exposure, neutral-grey color, shadows, reflections, focus, texture and photorealistic material response.

Do not substitute any reference scene or redesign any object. Do not add, remove, duplicate, resize or relabel anything. Do not change the woman's identity or pose. Do not alter the writing narrative, food states, props, room, light, color, crop, zoom or left/right composition. Do not introduce new text, labels, dates, codes, numbers, logos, signs or watermarks.

Physical integration: after the frontal reprojection, keep feet, table legs, bowl, paper, glass and hands grounded with the same plausible contact and occlusion relationships; keep stainless reflections and all cast shadows consistent with the unchanged light; avoid warping the woman's anatomy, circular bowl rim, cylindrical whey glass, paper rectangle or paddle.

Observable pass condition: the worktable front edge is perfectly horizontal, its front face is a true frontal rectangle, the sensor plane unmistakably reads strict 100% front, and every narrative/content feature is otherwise unchanged from Image 1.

Keep everything else exactly the same.
```
