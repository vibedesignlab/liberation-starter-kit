# MORA Narrative Etching Template

## Role

Compile one 3:2 Material Folio for a brand manifesto, origin, founder or process story. The image communicates one factual narrative beat through one real MORA object/tool group and exactly one impossible material transition. It does not visualize a complete timeline, invent a founder biography or stage an unverified facility.

Attach `MATERIAL-FOLIOS-SERIES-LOCK.md` first. Wave B narrative assets use the approved `ST3-ETCH-BRAND-TRACE-MASTER-26` as their immutable style reference.

## Reference precedence

1. `ST3-ETCH-BRAND-TRACE-MASTER-26`: paper, ink, line behavior, negative-space ratio and transition restraint.
2. Revised `ST3-REF-GLASS-PACKAGE-MASTER-17` when the MORA Vessel Record appears; otherwise the approved tool/process evidence named by the storyboard.
3. Approved storyboard and factual evidence IDs: object group, action/state and the one transition.

Le Labo Journal source images remain research evidence only and are never attached as generation references.

## Variable and evidence slots

```text
[ASSET_ID]
[NARRATIVE_ROLE]               brand_manifesto | origin | founder | process
[COMMUNICATION_JOB]
[FACT_EVIDENCE_IDS]
[PRIMARY_REAL_OBJECT_GROUP]
[START_STATE]
[END_STATE]
[IMPOSSIBLE_TRANSITION]        one continuous START_STATE → END_STATE morph
[VIEW_MODE]                    near-orthographic frontal | shallow tabletop oblique
[NEGATIVE_SPACE_ANCHOR]        left | right | upper | lower
[STORYBOARD_BEAT]
[FOUNDER_FACT_STATUS]          not_applicable | unverified | verified
[FOUNDER_IMAGE_RIGHTS_STATUS]  not_applicable | absent | cleared
[OUTPUT_SLUG]
```

Every factual noun in `[PRIMARY_REAL_OBJECT_GROUP]`, `[START_STATE]` and `[END_STATE]` must be supported by `[FACT_EVIDENCE_IDS]`. Leave unsupported details out rather than filling them with atmosphere.

## Storyboard slot

Fill this one-beat card before generation:

| Slot | Required decision |
|---|---|
| Landing role | one of brand manifesto, origin, founder or process |
| Observable message | one sentence, no abstract adjective stack |
| Dominant real group | one MORA vessel or one tightly related tool/process group |
| Factual start state | a visible real state supported by evidence |
| Factual end state | a visible real state supported by evidence |
| Impossible transition | one continuous shared contour/texture connecting start to end |
| Reading direction | left→right, lower→upper or center→edge; choose one |
| Negative-space anchor | one continuous 65–70% field |
| View | near-orthographic frontal or shallow tabletop oblique |
| Founder gate | fact status, rights status and permitted human visibility |

Do not generate a multi-beat storyboard, panels, arrows or a timeline in one frame.

## Founder factual gate

- When `[NARRATIVE_ROLE]` is not `founder`, set both founder slots to `not_applicable`.
- When founder facts are `unverified`, or image rights are `absent`, no person, face, body, silhouette, hand presented as founder, portrait, signature, legible handwriting, date, location or biographical prop may appear. Show the question through an empty worktable, approved tools, blank/unreadable archive material, one first ingredient and one MORA vessel only.
- A verified fact does not grant image rights. A founder may appear only when both factual identity and the exact image rights are cleared and an approved identity reference is supplied.
- Never infer age, gender, ethnicity, clothing, studio, first experiment, city, date, quotation or personal history. Never caption a generated person as founder.
- If the requested storyboard requires a person but either gate fails, stop generation and return the storyboard for factual revision.

## Crop and flat-art equivalent

- Output: 1536 × 1024 target, exact 3:2 landscape.
- Inking occupies 30–35% of frame area; 65–70% remains clean Cultured Cream negative space.
- Keep all critical contours inside an 8% safe margin. Reserve the declared anchor as one uninterrupted low-detail copy field even though no text is rendered inside the artwork.
- Default view: restrained flat editorial construction equivalent to a 65 mm normal lens, near-orthographic and low-parallax. Use `[VIEW_MODE]` only to choose between frontal and shallow tabletop oblique; do not introduce wide-angle depth.
- Show one primary visual cluster. Supporting tools must touch or causally belong to the same beat.

## Lighting and ink physics

- Strictly monochrome: Carbon `#171714` ink on Cultured Cream `#F5F1E8`; no spot color in brand, origin, founder or process folios.
- One upper-left engraving light governs every contour. Use sparse stipple on light-facing glass, whey or yogurt; denser lower-right hatch on cloth folds, tool underside and retained mass.
- The impossible transition must preserve line continuity: hatch direction gradually changes with the material, rather than hiding the morph under smoke, glow, liquid splash or digital blur.
- No photographic shadow, gray airbrush or lens effect. Depth comes from overlap, line weight, stipple density and coherent occlusion only.

## Generation-ready prompt compiler

```text
Use case: editorial narrative engraving for a premium cultured-food landing page.
Asset and job: [ASSET_ID], [NARRATIVE_ROLE]. [COMMUNICATION_JOB]
Paper: exact clean contemporary Cultured Cream #F5F1E8, 3:2 landscape,
65–70% uninterrupted negative space anchored [NEGATIVE_SPACE_ANCHOR].
Subject: [PRIMARY_REAL_OBJECT_GROUP], governed by [FACT_EVIDENCE_IDS].
Story beat: [STORYBOARD_BEAT]. Begin with [START_STATE] and resolve as [END_STATE]
through exactly one continuous impossible material transition: [IMPOSSIBLE_TRANSITION].
Composition: one compact causal group using 30–35% of frame area, all contours inside
an 8% safe margin, reading direction fixed by the approved storyboard.
Flat-art behavior: [VIEW_MODE], approximately 65 mm normal perspective or
near-orthographic construction, no wide-angle expansion or photographic depth effects.
Ink: fine copperplate contours, form-following cross-hatch and restrained stipple in
Carbon #171714; one coherent upper-left engraving light; retained paper and midtones.
Founder gate: facts [FOUNDER_FACT_STATUS], image rights [FOUNDER_IMAGE_RIGHTS_STATUS].
References in order: ST3-ETCH-BRAND-TRACE-MASTER-26 controls style; approved factual
MORA references control object identity; storyboard controls only the one-beat layout.
Constraints: append the full Material Folios negative constraints. No text in artwork.
```

## Negative constraints — append inside the same prompt

No text, title, caption, label, number, pseudo-handwriting, signature, arrow, timeline, panel, border, logo or watermark. No invented founder, portrait, person, hand presented as founder, first-studio scene, date, city, quotation or biography unless both founder gates pass. No invented factory, SOP, batch claim or facility evidence. No second narrative beat, second impossible transition, split scene, collage seam, portal, doorway, bottle-as-door, house–bottle–suitcase composition, travel case, coast scene, perfume silhouette, LE LABO wording, label grid or Le Journal page imitation. No spot color, pure black, sepia, faux aging, Victorian/apothecary ornament, rustic nostalgia, woodcut mass, photorealism, 3D, vector icon, digital shadow, glow, smoke or bokeh.

## QA checklist

- [ ] Exact 3:2 output, 8% crop safety, 65–70% negative space and approved anchor.
- [ ] One narrative beat and one causal real object/tool group; no competing subplot.
- [ ] `[START_STATE]` and `[END_STATE]` are evidence-backed and legible.
- [ ] Exactly one continuous impossible transition connects those states; no doorway, portal or second morph.
- [ ] Fine `#171714` copperplate/hatch/stipple reads cleanly on `#F5F1E8` with one upper-left engraving light.
- [ ] No spot color or text-like artifact.
- [ ] Founder asset passes both factual and rights gates, or contains no person/identity cue.
- [ ] No source composition, perfume trade dress, invented facility or unsupported history appears.
- [ ] Prompt path, output path, model/adapter, seed/reference order and checksum are recorded.

## Single-causal edit loop

Allowed repair axes are `story_fact`, `founder_gate`, `object_identity`, `transition_count`, `transition_legibility`, `negative_space`, `crop`, `view`, `line_behavior`, `ink_light`, `palette`, `source_distance` and `text_artifact`.

```text
Keep the approved one-beat storyboard, all factual objects, reference order, 3:2 crop,
negative-space anchor, monochrome paper/ink, upper-left engraving light and every
passing detail unchanged.
Correct only [FAILED_AXIS]: [OBSERVED_FAILURE] → [LOCKED_TARGET].
Do not invent a fact, person, second beat, second transition, prop or source motif.
```

Change one axis per edit and rerun the full checklist. After two failed deltas on the same axis, restart once from the style master and factual storyboard. A third same-axis failure makes the adapter incompatible for narrative etching.

## File and ID rules

- Supported narrative IDs are the exact direction-lock IDs `ST3-ETCH-BRAND-TRACE-MASTER-26` through `ST3-ETCH-PROCESS-CLOTH-TO-BODY-29`; Wave B consumes 27–29.
- Final prompt: `prompts/[ASSET_ID].md`.
- Final image: `assets/editorial-etchings/mora-etch-[role-slug]-3x2.png`.
- Working candidate: `.work/revision3_vessel_folios/candidates/[ASSET_ID]/rNN-[axis].png`.
- Use one distinct image-generation call per narrative asset. Do not output a storyboard sheet as the asset.
