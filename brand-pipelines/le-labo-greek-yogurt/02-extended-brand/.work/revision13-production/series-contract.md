# Revision 13 — Production Series Contract

## Outcome

Create 18 project-local 1536 × 1024 PNG production candidates from the accepted REF-01–08 visual system:

- 6 brand-mood hero/storytelling frames;
- 6 UI product frames, one per directional SKU;
- 6 UI material frames, one raw-input → food-native intermediate pair per SKU.

No SVG, HTML, browser automation, Playwright or Chrome. Use the built-in image-generation tool. Every generated image receives one matching Markdown prompt file.

## Reference role separation

- REF-01: strict-front manufactory space, material architecture and light family only.
- REF-02: strict-side manufactory space, material architecture and light family only.
- REF-03: female maker, graphite workwear, Finish Table, final-check action and right-side hero placement only. Never treat it as a scale chart.
- REF-04: jar, spoon, bowl and paddle identity and ordinary physical proportion only.
- REF-05: low-wide transparent wide-mouth jar geometry and food volume only. Ignore and do not reproduce its generic `MORA / 150 g` sticker.
- REF-06: cultured base, strained base, whey, infusion/syrup and other food-state color, translucency and viscosity only.
- REF-07: UI background, horizon, stainless ground, exposure and reflection family. Product/material frames must preserve it as the common scene.
- REF-08: partial uncoated paper Batch Record color, open information rhythm, partial coverage and restricted maker-check zone only. It is PNG-only visual reference, not production artwork. Do not copy its graphite canvas as scene styling.

In every prompt, label each input by number and state its role plus what must not transfer.

## Global realism and scale lock

- Photorealistic; one coherent 4500–5000 K neutral-grey task-light family.
- Dark aged brick/sealed concrete only on the non-food-contact shell; clean brushed stainless on food-contact zones.
- Preserve natural texture, grounded contact shadows, one consistent light direction, plausible metal reflections and glass refraction.
- No crushed blacks, clipped cultured-milk whites, CGI gloss, procedural skin, perfume/apothecary cues, beakers, pipettes, decorative femininity or oversized props.
- Adult woman: 165–175 cm. Workbench: approximately 900 mm. Jar: 80–90 mm diameter × 60–70 mm height. Spoon: 145–160 mm. Bowl: 200–240 mm. Paddle: 250–320 mm.
- Human-scene jar: approximately 4–5% frame height and smaller than the maker's palm.
- Fast review boundary: original-size sanity check only. One single-axis correction is allowed only when a core condition is absent.

## Branch A — Brand mood

Ownership:

- `assets/revision-r13-brand-mood/`
- `prompts/revision-r13-brand-mood/`

All frames are web hero/storytelling candidates: 3:2 landscape, wide environmental distance, 45–50 mm perspective, camera approximately 1.4 m high and 5–7 m perceived distance. Use either mathematically strict 100% front or strict 90-degree side. Place the story/action in the right 55–60%; keep x 5–40% and y 30–70% as a continuous low-detail copy field free of people, tools, shadows, reflections and high-contrast edges. One visible action per frame.

Deliverables:

1. `bm01-keeper-final-check-front.png` — strict front; maker performs one genuine final-check action on a jar with attached partial Batch Record. REF-01, 03, 05, 08.
2. `bm02-selection-side.png` — strict side; maker compares two credible material states and excludes one. REF-02, 03, 04, 06.
3. `bm03-culture-stop-front.png` — strict front; maker observes cultured gel and stops/records the state without invented process values. REF-01, 03, 04, 06.
4. `bm04-separation-side.png` — strict side; dense upper phase and translucent acid whey read as one physical separation system. REF-02, 04, 06.
5. `bm05-intermediate-archive-front.png` — strict front; unmanned food-native archive of distinct preparation states, not perfume lab glassware. REF-01, 04, 06, 08.
6. `bm06-last-fold-side.png` — strict side; maker performs one broad low-shear fold and observes the stopped ridge. REF-02, 03, 04, 06.

Master gate: create BM-01 first, inspect it, then expand BM-02–06 if BM-01 satisfies strict front, left copy field, realistic scale, attached Batch Record and one accountable action.

## Branch B — UI product

Ownership:

- `assets/revision-r13-ui-products/`
- `prompts/revision-r13-ui-products/`

All frames are collection-grid/PDP candidates on the same REF-07 UI background: strict front, 70–90 mm perspective, neutral 4500–5000 K color-accurate light, identical centered jar, identical ground line, complete silhouette, open wide mouth and 28–32% frame-height occupancy. Use REF-05 for geometry only and REF-08 for the visual role of the partial Batch Record. Do not create SVGs, deterministic label overlays or separate label artwork. Avoid prominent generated microtext; the partial record must read as a structured food record rather than a generic logo sticker.

Only the yogurt content, truthful ingredient trace and recipe cue may vary:

1. `ui-product-01-thyme-honey.png` — ivory base, one thin amber honey fold, sparse actual-scale thyme flecks.
2. `ui-product-02-fig-leaf.png` — near-ivory base, restrained green-beige trace; clearly directional and no whole-leaf garnish.
3. `ui-product-03-roasted-buckwheat.png` — warm ivory base, fine roasted-grain flecks at multiple depths and one short toasted seam.
4. `ui-product-04-citrus-peel.png` — ivory base, fine short peel threads or actual-scale zest points; no oversized curls.
5. `ui-product-05-black-sesame.png` — ivory/stone-grey marbling, fine sesame particles and one dark seam; never uniform black mass.
6. `ui-product-06-olive-oil-sea-salt.png` — dense ivory base, thin translucent oil ribbon and narrow pearly interface; no decorative salt pile.

Master gate: create Thyme Honey first, inspect it, then derive the other five from the accepted master so jar, background, camera, light and label placement remain locked. Change only edible content and recipe cue.

## Branch C — UI material

Ownership:

- `assets/revision-r13-ui-materials/`
- `prompts/revision-r13-ui-materials/`

All frames are UI feature/collection candidates on the same REF-07 background: strict front, 70–90 mm medium-detail view, identical centerline and ground line, food-safe vessel family, grouped subject height 22–28%, no macro enlargement. Show one raw input and one food-native intermediate state with real contact and scale. No product jar, no decorative garnish, no invented process values.

1. `ui-material-01-thyme-honey.png` — measured thyme/honey input beside restrained infusion or honey-herb syrup.
2. `ui-material-02-fig-leaf.png` — directional candidate leaf material beside pale aqueous infusion; no safety or launch claim.
3. `ui-material-03-roasted-buckwheat.png` — roasted buckwheat beside warm grain slurry.
4. `ui-material-04-citrus-peel.png` — actual-scale peel beside filtered infusion or light syrup.
5. `ui-material-05-black-sesame.png` — black sesame seed beside dense seed paste.
6. `ui-material-06-olive-oil-sea-salt.png` — olive oil/sea salt input beside a directional oil phase or emulsion candidate.

Master gate: create Thyme Honey first, inspect it, then expand the other five with background, camera, vessel family, scale and light locked. Change only raw material and intermediate physical state.

## Shared-file prohibition

Workers share this repository and are not alone. Preserve and adapt to concurrent edits; never revert another worker. Do not touch:

- `outputs/extended-brand-anatomy.json`;
- `stage-review.json`;
- `asset-registry.json`;
- `src/` or `public/`;
- generated Storybook stories;
- another branch's prompt or asset folder.

Root alone reviews the three branches, updates canonical JSON and adapter data, finalizes the report and runs non-browser checks.

## Handoff

Return:

- generated image paths and matching prompt paths;
- which references were supplied and their declared roles;
- original pixel dimensions;
- quick pass/fail for camera view, copy-safe field where applicable, scale, background lock, label role and food-state distinction;
- any single unresolved risk. Do not claim factual production evidence.
