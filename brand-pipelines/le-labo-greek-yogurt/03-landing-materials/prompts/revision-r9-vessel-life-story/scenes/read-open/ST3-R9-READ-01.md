# ST3 R9 — READ / Household Batch Record

## Series role and input authority

- Commercial-photo-prompting mode: Compile / Series / reference-guided generation.
- Web role: exact 3:2 full-bleed narrative feature; the responsibility handoff after SEE and before OPEN.
- Image 1: REF-LABEL, sole authority for jar geometry, fill, Thyme Honey food state, metal closure, partial paper placement and every populated Batch Record value.
- Image 2: REF-HOME, sole authority for the household culinary curator's identity, age, dark practical clothing, lived-in kitchen geometry, worn surfaces and daylight direction.
- Permitted composition: the same curator actively turns and steadies the same closed jar to read its record. No workshop action, opening or serving.

## Compiled generation prompt

Use case: `photorealistic-natural`, reference-guided commercial editorial, exact product continuity.

Purpose: create the R9 READ frame, the moment a household culinary curator receives responsibility for a finished batch by reading its populated Batch Record. This is a believable domestic decision, not a posed portrait, product diagram or styled still life.

Reference roles: Image 1 is the sole product authority. Reproduce its same complete low-wide transparent wide-mouth 150 g jar, diameter-to-height ratio, rim, closed low-profile metal overcap, dense cultured-milk-white yogurt, thin irregular amber honey fold, sparse actual-scale thyme flecks, partial uncoated off-white paper label and populated record. Image 2 is the sole environment and human authority. Preserve its same grounded adult female curator—same face, age, dark hair gathered in a loose bun, natural skin and practical charcoal shirt—and the same worn plaster, dark cabinetry, stainless counter, restrained shelves, window direction and accumulated-use kitchen character. Do not copy Image 1's studio background and do not copy Image 2's roasting action or crowded cookware.

Primary action: the curator stands or leans naturally at the kitchen counter in the center-right/right half. She uses two ordinary hands to turn and steady the same closed jar, rotating its partial paper record toward both her gaze and the front-biased camera. Her eyes are actively reading the label; fingers do not cover its hierarchy. The jar rests on or just above the counter with believable hand pressure and contact, never floating. This is one quiet verification action, with no smile, presentation gesture, opening, spoon or serving.

Product and information goal: show the complete jar at approximately 25–30% of total frame height, fully inside frame, with food remaining the largest visible sidewall surface and the paper covering only 30–40% of the visible wall. The label must be visibly populated rather than blank, generic or redesigned. Reproduce only this uppercase hierarchy and values from Image 1, as faithfully and legibly as contextual scale permits:

`MORA`  |  `BATCH RECORD`

`BATCH`  |  `01`

`RECIPE`  |  `THYME HONEY`

`MILK LOT`  |  `CHECKED`

`CULTURED`  |  `CHECKED`

`STRAINED`  |  `CHECKED`

`FOLDED`  |  `ONE PASS`

`PACKED`  |  `CHECKED`

`KEEP COLD`

`NET WT`  |  `150 G`

`MAKER CHECK`  |  `M.R.` followed by one restrained hand check mark.

Do not add any city, date, batch code, benefit, nutrition claim, certification, barcode, decorative line, pharmacy grid or pseudo-text.

Restrained context only: exactly one natural pear, one folded shopping or recipe note whose surface has no readable fake text, one visibly used ordinary kitchen knife and exactly two simple plates. Keep all four context groups sparse, at factual household scale, and outside the protected copy field. No bowl, flowers, herb garnish, bottle, second jar, packaging, extra fruit or decorative tableware.

UI safety: keep the bottom-left rectangle spanning 40% of frame width and the bottom 28% of frame height continuously low-frequency and medium-dark for white copy. No curator, hand, jar, pear, note, knife, plate, shelf leg, window edge, hard shadow, bright reflection, seam, crumb cluster or high-contrast object may enter this rectangle. It may contain only a calm worn countertop or cabinet-plane tone with a gentle continuous falloff.

Camera and composition: exact 3:2 landscape, full bleed; 65 mm full-frame-equivalent medium perspective; camera level and front-biased, only enough side angle to make the curator's reading gesture and label face coherent; no overhead, wide-angle, three-quarter campaign drama or macro crop. Keep the complete head, hands, jar and counter relationship plausible. Use the kitchen's soft window daylight, open natural shadows, restrained practical warmth, controlled stainless and glass reflections, plausible refraction and grounded contact shadows. Preserve real skin texture and food weight.

Finish: documentary food editorial with visible but fine 35 mm analog magazine grain, gentle highlight roll-off, mild density variation and slight optical softness. No dust, scratches, light leak, sepia, teal-orange, HDR, CGI gloss, plastic skin, clipped window or crushed black.

Hard constraints: same curator identity and kitchen as Image 2; same complete closed REF-LABEL jar and populated values as Image 1; jar 25–30% frame height; label is the information goal; exactly the restrained context listed; protected bottom-left 40% × 28%; no opening, tasting, serving, glamour pose, perfume cue, blank label, invented text, duplicate person, duplicate jar or distorted hands.

## Observable acceptance checks

- Exact 3:2, 65 mm medium front-biased domestic narrative.
- Same curator visibly reads while two hands turn/steady the same closed jar.
- Jar complete at 25–30% frame height; food-dominant sidewall; partial record populated from REF-LABEL and never blank.
- Only pear, folded unreadable note, used knife and two plates as context.
- Bottom-left 40% × 28% is unobstructed and low-frequency for white copy.
- Real skin, glass, metal, food, counter contact and restrained analog grain.

## Output and provenance

- Built-in image generation only; no browser or CLI generation.
- Input SHA-256: REF-LABEL `f1e9f642168c88599854c10346bdcaf6b91e405adddaf8f6adaf0753973b405e`; REF-HOME `96746f550b71374924252c3be6d6be519cf6163f9a6a1c9bdb0ead26b454613c`.
- Preserve the selected built-in PNG byte-for-byte as `assets/revision-r9-vessel-life-story/scenes/read-open/native/st3-r9-read-household-batch-record-native.png`.
- Derive `assets/revision-r9-vessel-life-story/scenes/read-open/st3-r9-read-household-batch-record.png` only by high-quality resampling to 6144×4096. Resampling is not new optical detail.

## Targeted correction prompt

One original-size inspection found that the jar was underscale, the folded note had become cloth-like and a counter seam crossed the protected copy field. The single permitted correction used the first preserved READ frame as Image 1 and REF-LABEL as Image 2:

> Use case: precise scene edit. Image 1 is the base photograph and complete scene/content authority. Image 2 is only the exact low-wide jar geometry, food state, label hierarchy/text and closure continuity reference.
>
> Preserve Image 1 exactly: same adult female curator identity, face, hair, expression, natural reading gaze, charcoal clothing, same lived-in kitchen geometry, camera, light, grade, analog grain, pear, used knife, exactly two simple plates, two-hand reading/steadying gesture and no opening or serving.
>
> Correct only these three failed hard locks: (1) scale the same closed jar and coherent holding gesture so the complete jar occupies 25–30% of frame height while preserving the REF-LABEL geometry, metal overcap, fill, honey fold, thyme, partial populated record and visible anchors; (2) replace the folded beige cloth with one modest folded off-white shopping/recipe paper note with thin folded edges, slight creases and no readable fake text; (3) repair x=0–40%, y=72–100% into one continuous calm medium-dark low-frequency worn stainless/cabinet tone with no diagonal seam, hard edge, reflection hotspot, crumb, prop or shadow.
>
> Do not change or add anything else. Keep exact 3:2, 65 mm front-biased medium view, same person and room, two plates, one pear, one used knife, one folded paper note only, closed jar, reading action, open shadows, glass/metal/skin physics and documentary analog finish. No bowl, flower, herbs, bottle, second jar, package, extra fruit, fake text, opening, tasting or serving.

## Production result

- Built-in generation output selected: `exec-b2c908b8-6990-4a3f-9d14-9806dd1073e3.png`. A prior same-prompt invocation returned no persistable output handle; the preserved first visual pass was `exec-6b152fef-2516-418e-a795-8d0bdfe1e2dd.png`, followed by the single visual correction above.
- Native: 1536×1024 PNG; SHA-256 `2dee6d0c03f6d6149f4110455e48837ad86b5d7a50bb82f039a239b8b6e0643d`.
- Delivery: 6144×4096 PNG; SHA-256 `f62218f36981b91bf0dceeae3fc4f47f1e952d3624be27d7c9e7e1190a036fa8`.
- Resampling disclosure: delivery is a high-quality 4× raster resample of the native; it contains no new optical detail.
- Original-size QA: exact 3:2, curator identity, two-hand reading gaze, closed vessel, populated partial record, pear, used knife, two plates, lived-in kitchen and analog physical finish pass. The corrected note reads as thin folded off-white material but retains slight textile ambiguity. The object-free copy field is low-frequency, though the soft far-left window reflection lowers white-copy contrast locally.
- Known miss: the selected correction did not enlarge the low-wide jar to the requested 25–30% frame-height band; it remains visibly below that band. Dense contextual label rows are populated and key hierarchy is visible, but every micro-value cannot be independently verified at this scale.
