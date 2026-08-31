# ST3 R9 — OPEN / Food Seal Before Pairing

## Series role and input authority

- Commercial-photo-prompting mode: Compile / Series / reference-guided generation.
- Web role: exact 3:2 full-bleed narrative feature; the physical opening after READ and before TASTE.
- Image 1: REF-LABEL, sole authority for jar geometry, fill, Thyme Honey food state, partial populated label and closure family.
- Image 2: REF-HOME, sole authority for the same culinary curator's identity, lived-in kitchen geometry, material wear and daylight direction.
- Image 3: REF-PAIRING, food-only authority for warm rye, roasted pear, plate scale, doneness and crumb character; never a scene template.
- Permitted composition: the curator opens one food-safe inner seal on the same jar. No serving, spooning or tasting yet.

## Compiled generation prompt

Use case: `photorealistic-natural`, reference-guided commercial editorial, exact product and character continuity.

Purpose: create the R9 OPEN frame, a physically legible domestic opening action that follows READ. The same household culinary curator opens the same Thyme Honey jar beside the planned rye-and-roasted-pear pairing, but no yogurt has been served. This is a lived action, not a staged product still life.

Reference roles: Image 1 is the sole product authority. Reproduce its same low-wide transparent wide-mouth 150 g jar, diameter-to-height ratio, rim, dense cultured-milk-white fill, one thin irregular amber honey fold, sparse actual-scale thyme flecks, partial uncoated paper label and populated Batch Record. Preserve its metal overcap family and add only a physically plausible food-grade inner seal required by the opening action. Image 2 is the sole human and environment authority. Preserve the same focused adult female curator—same face, age, dark hair in a loose bun, natural skin, practical charcoal shirt—and the same worn plaster, dark cabinetry, stainless work surface, restrained shelves and window direction. Image 3 supplies only a normal plate, warm rye texture, roasted-pear color and crumbs. Do not copy Image 1's studio background or transplant Image 3's entire empty tabletop composition.

Primary action: at the center-right/right side of the counter, the curator opens the same jar with ordinary two-hand mechanics. One hand grips and grounds the low-wide glass jar; the other lifts a small pull tab and peels the food-safe inner seal partway back in one continuous arc. The seal remains visibly attached to the rim and bends with believable thin laminated-foil/paper stiffness. The already removed metal overcap rests immediately beside the jar at matching scale. Show plausible finger pressure, rim contact and occlusion. No torn impossible membrane, floating lid, cap passing through fingers or ambiguous twist-only gesture.

Product continuity: show the complete jar at approximately 16–20% of total frame height, fully inside frame and near the curator's hands. Keep the same fill height, glass thickness, wide mouth, partial label and Thyme Honey food identity. The label remains visibly populated with the same REF-LABEL hierarchy rather than blank or redesigned. Preserve visible anchors `MORA`, `BATCH RECORD`, `BATCH 01`, `RECIPE / THYME HONEY`, checked process-row structure, `FOLDED / ONE PASS`, `KEEP COLD`, `NET WT / 150 G`, and `MAKER CHECK / M.R.` with one check. Do not invent city, date, code, claim, certification or pseudo-text. Food remains the dominant sidewall surface.

Pairing context: beside—but not touching or obscuring—the jar, place one simple dark plate with one modest slice of warm rye and restrained roasted pear matching Image 3, with a few natural crumbs. This food is waiting, not plated with yogurt: no white dollop, drip, smear or serving spoon. No decorative herb garnish, honey drizzle, extra fruit, second jar, package, bottle or additional dish.

UI safety: keep the bottom-left rectangle spanning 40% of frame width and the bottom 28% of frame height continuously calm and low-frequency for white copy. No hand, jar, lid, seal, plate, rye, pear, crumbs, utensil, shelf edge, hard shadow, glare, seam or high-contrast boundary may enter it. Use only a quiet medium-dark worn counter or cabinet plane with gentle natural falloff there.

Camera and composition: exact 3:2 landscape, full bleed; 50 mm full-frame-equivalent contextual counter-height side/front view. The opening hands, rim, attached seal, jar and waiting pairing must read in one physically coherent depth plane without macro enlargement or wide-angle distortion. Keep the curator's identity readable while making her hands and the opening action primary. Soft domestic window daylight from the same direction as Image 2, restrained warm kitchen practical, open shadows, readable dark clothing, controlled stainless, realistic glass refraction and metal highlights, grounded contact shadows and plausible crumbs.

Finish: documentary food editorial with visible but fine 35 mm analog magazine grain, gentle highlight roll-off, mild density variation and slight optical softness. Natural skin pores and hand creases. No dust, scratches, light leak, sepia, teal-orange, HDR, CGI sheen, plastic skin, clipped highlight or crushed black.

Hard constraints: same curator and kitchen as Image 2; same REF-LABEL jar geometry, fill and populated record; exact single partway peel of attached food seal with removed overcap beside it; jar 16–20% frame height; rye and roasted pear only; no serving yet; bottom-left 40% × 28% clear; no perfume cue, blank label, invented text, duplicate jar, extra person, distorted hands or impossible closure physics.

## Observable acceptance checks

- Exact 3:2, 50 mm contextual counter-height side/front view.
- Same curator performs one mechanically credible partway inner-seal peel on the same jar.
- Jar complete at 16–20% frame height with continuous fill, partial populated label and metal overcap beside it.
- Warm rye and roasted pear are present at restrained scale; no yogurt has been served.
- Bottom-left 40% × 28% remains quiet and unobstructed.
- Real skin, crumbs, glass, metal, seal/contact physics and restrained analog grain.

## Output and provenance

- Built-in image generation only; no browser or CLI generation.
- Input SHA-256: REF-LABEL `f1e9f642168c88599854c10346bdcaf6b91e405adddaf8f6adaf0753973b405e`; REF-HOME `96746f550b71374924252c3be6d6be519cf6163f9a6a1c9bdb0ead26b454613c`; REF-PAIRING `d09ebbb247c338b48519acb973fc82360aaa63e445a8fdb3e3f9a1c84581bfc6`.
- Preserve the selected built-in PNG byte-for-byte as `assets/revision-r9-vessel-life-story/scenes/read-open/native/st3-r9-open-food-seal-native.png`.
- Derive `assets/revision-r9-vessel-life-story/scenes/read-open/st3-r9-open-food-seal.png` only by high-quality resampling to 6144×4096. Resampling is not new optical detail.

## Targeted correction prompt

One original-size inspection found the removed overcap and a counter seam inside the bottom-left copy field. The single permitted correction used the first OPEN frame as Image 1 and REF-LABEL as Image 2:

> Use case: precise scene edit. Image 1 is the base photograph and complete scene/content authority. Image 2 is only the jar, label, food-state and closure continuity reference.
>
> Preserve Image 1 exactly: same adult female curator identity and expression, dark practical clothing, hands, physically plausible partway attached inner-seal peel, same low-wide jar geometry/fill/honey fold/thyme, same populated partial MORA Batch Record, same kitchen, exact 3:2 50 mm counter-height side/front camera, daylight, plate with warm rye and roasted pear, food scale, crumbs, glass/metal/skin physics and analog grain.
>
> Change only the bottom-left copy-safe field. Move the removed round metal overcap from its current bottom-left position to immediately right of the jar, outside x=0–40%, while keeping it on the same counter plane at true scale and keeping the jar/hand/seal action unchanged. Remove the diagonal stainless countertop seam and any hard contrasting edge from x=0–40%, y=72–100%; rebuild that rectangle as one continuous calm medium-dark, low-frequency worn stainless counter tone with no object, crumbs, reflection hotspot or hard shadow.
>
> Do not change the woman's identity, hand anatomy, seal peel, jar size or location, label text/hierarchy, food, plate, bread, pear, room, camera, crop, light, grade or grain. Do not add props or text. No serving. Output the same exact 3:2 landscape.

## Production result

- First built-in output: `exec-1bb1f5a8-faed-4076-b940-b16a6abfdecb.png`; selected targeted correction: `exec-526af6d8-72d9-42e7-85b4-43b244c63953.png`.
- Native: 1536×1024 PNG; SHA-256 `66a610281e63852f16e5c4128ad947d4e95441ae2bb4b43c3b98aa1c8e357853`.
- Delivery: 6144×4096 PNG; SHA-256 `b1bd933661e7402a6ceef572859d82e9ebb30fcb3f028a9ad228f79ca6d3daad`.
- Resampling disclosure: delivery is a high-quality 4× raster resample of the native; it contains no new optical detail.
- Original-size QA: exact 3:2, same curator/kitchen, counter-height side/front view, jar in the 16–20% contextual scale band, attached partway inner-seal peel, removed overcap at true scale, populated partial record, rye/roasted pear pairing, no serving, real contact physics and restrained analog finish pass. The protected bottom-left field is object- and seam-free after correction; a broad soft far-left window reflection remains a minor white-copy contrast risk.
- Continuity note: the curator, kitchen, jar silhouette, Thyme Honey fold and populated-label pattern visually match READ. Dense record micro-values remain less verifiable than REF-LABEL at this contextual scale.
