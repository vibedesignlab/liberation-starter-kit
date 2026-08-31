# MORA Material Folios Series Lock

## Role

This module is the non-negotiable visual layer for every MORA Material Folio. Attach it before either `NARRATIVE-ETCHING-TEMPLATE.md` or `MATERIAL-PLATE-TEMPLATE.md`. It controls the paper, ink, negative-space ratio, engraving behavior, transition count, source-distance boundary and revision loop. The dependent template controls the story content and aspect ratio.

The system is a contemporary editorial explanation of MORA's real vessel, tools, ingredients, preparation states and finished traces. It is not packaging artwork, a vintage apothecary identity, a faux historical document or a copy of Le Labo's Le Journal.

## Source evidence roles and distance boundary

- `VE-EC-014-le-journal-house-rules.png` is research evidence for fine monochrome hatch, stipple and tactile printed-object rendering only.
- `VE-EC-015-le-journal-wish-you-wore-here.png` is research evidence for sparse editorial ground and one legible surreal material transformation only.
- Both source images are copyrighted research evidence. Do not attach them as image-generation references for dependent assets. Once approved, `ST3-ETCH-BRAND-TRACE-MASTER-26` is the only style reference.
- Borrow system logic only: fine line, large paper field, editorial restraint and one impossible transition.
- Never reproduce the house–bottle–travel-case collage, bottle-as-door or portal composition, coastal doorway, perfume silhouette, Le Journal newspaper layout, LE LABO wording, label grid, scent-number naming, city/name/date personalization or any exact trade dress.

## Reference precedence

1. `ST3-ETCH-BRAND-TRACE-MASTER-26` controls paper, ink, line density, hatch/stipple behavior, negative-space ratio and transition restraint for all Wave B folios.
2. The relevant MORA factual reference controls the real object: revised Vessel Record master, approved tool/process evidence or matching individual ingredient reference.
3. The approved storyboard controls asset-specific object grouping, reading direction and the single transition.

If a model supports reference weights, style-master behavior is highest, factual object identity is second and storyboard layout is third. Reference syntax may change by model; identity, order and meaning may not. Never promote a dependent folio into a new style master.

## Variable slots

```text
[ASSET_ID]                     exact locked Stage 3 asset ID
[ASSET_ROLE]                   brand | origin | founder | process | material_plate
[COMMUNICATION_JOB]            one observable message the artwork must explain
[PRIMARY_REAL_OBJECT_GROUP]    one MORA object or tightly related tool/ingredient group
[IMPOSSIBLE_TRANSITION]        one continuous material path; it may pass through one factual intermediate state
[FACT_EVIDENCE_IDS]            local IDs or approved source facts governing objects/process
[REFERENCE_IDS_IN_ORDER]       style master → factual object reference → storyboard
[OUTPUT_ASPECT]                narrative 3:2 | material plate 1:1
[NEGATIVE_SPACE_ANCHOR]        left | right | upper | lower, fixed by storyboard
[OUTPUT_FILE]                  final registered workspace path
```

Do not generate if any slot is blank, if the transition contains more than one morph, or if `[FACT_EVIDENCE_IDS]` cannot support the depicted real objects.

## Common series lock

- Paper field: clean contemporary Cultured Cream `#F5F1E8`, visually flat and unaged.
- Ink: one near-black engraving ink, Carbon `#171714`; do not substitute pure black, warm brown or sepia.
- Occupancy: the full inked subject group, including the impossible transition, uses 30–35% of the frame area; 65–70% remains uninterrupted Cultured Cream negative space.
- Drawing method: fine copperplate contour, narrow cross-hatching and restrained stipple. Preserve midtone detail and thin internal structure; do not create woodcut-like black masses.
- Transition: exactly one impossible material transition. It must be one continuous shared contour or texture path across the factual MORA states required by the asset, not a portal, doorway, floating cutout, multiple vignette, diagram panel or collage seam.
- Text: no letters, words, numbers, pseudo-labels, arrows, legends, borders, seals, signatures or watermarks inside the artwork. Landing-page copy remains outside the image.
- Surface: no deckled edge, foxing, paper stain, torn page, photocopy dirt, newspaper column, halftone screen or faux archive aging.
- Object truth: one dominant real MORA object or one tightly related tool/ingredient group. Supporting objects may clarify the same action but cannot become a second story.
- Color: brand, origin, founder and process narratives are strictly `#171714` on `#F5F1E8`. Material Plates may add one matching ingredient tint under their own template only.

## Crop and flat-art equivalent

- Keep the entire inked group inside an 8% outer safe margin; no important contour touches the crop.
- Preserve the storyboard's declared negative-space anchor as one continuous low-detail field.
- Treat perspective as a restrained flat editorial plate: approximately 65–90 mm full-frame-equivalent compression or near-orthographic construction, no wide-angle expansion, no dramatic vanishing point, no photographic bokeh and no cinematic camera effects.
- A generated result may show shallow implied depth through overlap and hatch density, but it must still read as one printed engraving on a flat paper field.

## Lighting and ink physics

- One coherent engraving light comes from upper-left. Light-facing planes receive sparse contour and stipple; lower-right and away-facing planes receive denser, form-following hatch.
- Hatching follows surface curvature and material direction. Cross-hatch is reserved for deeper shadow or overlap, not used as a uniform texture fill.
- Stipple describes glass transparency, liquid, fine particles and soft yogurt transitions. It may not become digital noise or airbrush grain.
- Every object shares the same light direction. Contact and occlusion are expressed through denser lower-right linework, never through a soft digital drop shadow.
- Preserve clean paper holes between lines and retained midtones. Reject crushed ink, muddy gray wash, vector-flat fills, glossy 3D shading or inconsistent highlight directions.

## Prompt assembly order

Use this order unchanged for every image model:

1. **Purpose and role** — `[ASSET_ID]`, `[ASSET_ROLE]`, `[COMMUNICATION_JOB]`.
2. **Paper field** — clean `#F5F1E8`, required aspect ratio and 65–70% negative space.
3. **Real subject** — `[PRIMARY_REAL_OBJECT_GROUP]` governed by `[FACT_EVIDENCE_IDS]`.
4. **Single transition** — `[IMPOSSIBLE_TRANSITION]`, stated as one continuous morph path even when a Material Plate includes one factual intermediate state.
5. **Composition and crop** — declared anchor, 30–35% inked occupancy and 8% safe margin.
6. **Flat-art equivalent** — near-orthographic 65–90 mm behavior and no camera effects.
7. **Ink and light** — `#171714`, upper-left engraving light, form-following hatch and restrained stipple.
8. **Color rule** — monochrome, or the Material Plate's single 5–8% tint rule.
9. **References** — repeat `[REFERENCE_IDS_IN_ORDER]` and each reference's authority.
10. **Negative constraints** — append the complete constraints below inside the same generation prompt.

## Negative constraints — append inside the same prompt

No text, letter, number, logo, label, caption, pseudo-type, arrow, legend, border, frame, crest, seal, signature or watermark. No Victorian ornament, botanical-label layout, apothecary styling, pharmacy card, laboratory fantasy, alchemy, tincture, whiskey, perfume bottle, narrow-neck vessel, LE LABO silhouette or trade dress. No house–bottle–suitcase collage, bottle doorway, portal, coast-through-bottle scene, travel ephemera or copied Le Journal composition. No second impossible transition, split panel, triptych, group atlas, disconnected vignette, floating object or decorative prop. No pure white paper, pure black ink, sepia, faux aging, deckled edge, foxing, stain, torn paper, rustic nostalgia, newspaper column, halftone, woodcut black mass, charcoal smear, watercolor wash, photorealism, 3D render, vector-flat icon, glossy highlight, digital drop shadow, bokeh or cinematic grade.

## QA checklist

- [ ] Exact `[ASSET_ID]`, role, aspect and final file path match the approved storyboard.
- [ ] Paper reads as clean `#F5F1E8`; ink reads as `#171714` with retained paper between lines.
- [ ] Negative space measures 65–70%; the inked group measures 30–35% and remains inside the 8% safe margin.
- [ ] One dominant factual MORA group is immediately legible.
- [ ] Exactly one continuous impossible material transition is present; no portal or second morph appears.
- [ ] Upper-left engraving light, curvature-following hatch, stipple and overlap shadows are internally coherent.
- [ ] No text-like mark, border, logo, invented fact, source-brand composition or trade-dress cue appears.
- [ ] Brand/origin/founder/process is fully monochrome; Material Plate tint, when allowed, passes its template gate.
- [ ] Reference order and generation model/adapter are recorded; final output has a checksum.

## Single-causal edit loop

1. Freeze reference order, seed when supported, prompt version, aspect and all passing axes.
2. Name one failed axis only: `factual_object`, `transition_count`, `transition_legibility`, `negative_space`, `crop`, `line_behavior`, `ink_light`, `palette`, `source_distance` or `text_artifact`.
3. Apply one delta prompt:

```text
Keep the approved factual objects, single transition, crop, negative-space anchor,
paper #F5F1E8, ink #171714, upper-left engraving light, line behavior,
reference order and every passing detail unchanged.
Correct only [FAILED_AXIS]: [OBSERVED_FAILURE] → [LOCKED_TARGET].
Do not add a second transition, text, prop, border, source-brand motif or new story.
```

4. Re-run the full checklist. Do not compensate for failed occupancy by changing the story, or for a failed object by changing the crop.
5. After two failed deltas on the same axis, discard the edit chain and regenerate once from the approved style master and storyboard. If the fresh generation fails the same axis, mark that model adapter incompatible for this asset role and route to deterministic post-production or another compatible model.

## File and ID rules

- Use the exact direction-lock asset ID; never renumber, abbreviate or reuse it.
- Final prompt: `prompts/[ASSET_ID].md`.
- Final image: `assets/editorial-etchings/[OUTPUT_SLUG].png`.
- Candidate: `.work/revision3_vessel_folios/candidates/[ASSET_ID]/rNN-[axis].png`.
- Use one distinct image-generation call per asset. A contact sheet is QA evidence only and never a registered production asset.
- Never overwrite an approved file. Freeze its SHA-256; a replacement requires a new reviewed revision before the registered path changes.
