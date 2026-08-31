# Revision 12 — Reusable Reference Masters Contract

Purpose: generate eight reusable visual image masters before rebuilding final mood, storytelling, process or UI product images. These assets lock recurring space, viewpoint, maker/action, object identity, product form, food states, UI ground and the Batch Record label system. Numerical scale remains a prompt and QA constraint rather than a visible reference subject. They are Storybook review references, not documentary evidence or approved production specifications.

## Global series lock

- Output: 3:2 landscape, photorealistic commercial/editorial photography.
- Space: dark graphite shadows; aged exposed brick and sealed concrete only on non-food-contact shell; clean brushed stainless on food-contact surfaces.
- Light: one motivated grey-neutral task-light family, approximately 4500–5000 K; visible shadow detail; no crushed blacks or blown cultured-milk whites.
- Front view means camera sensor plane parallel to rear wall and workbench face, with horizontal workbench edge and no three-quarter drift.
- Side view means a strict 90-degree rotation from the front master, with the workstation and shelving read in profile.
- Web hero master: left 40% is continuous low-detail copy-safe space; especially x=5–40%, y=30–70%. No person, object, cast shadow, reflection, lamp or high-contrast edge may cross it.
- Landscape camera language: wide environmental stance, approximately 32–35 mm equivalent, camera height 1.35–1.50 m, perceived distance 4–6 m. Never ultra-wide, fisheye or close portrait framing.
- UI/product camera language: approximately 70–90 mm equivalent, color-accurate neutral light, complete silhouette and controlled reflections.
- Material-library camera language: approximately 70–90 mm equivalent medium detail, shared baseline and comparable containers. This is not the final macro key visual.
- Female maker authority is shown through working posture and scale, never decorative femininity, glamour, smiling lifestyle pose or domestic kitchen cliché.
- No Le Labo wordmark, ingredient-plus-number naming, exact pharmacy grid, city/date ritual, perfume tools, beakers, pipettes or identifiable trade dress.
- Do not create final campaign storytelling, final UI product imagery or new Storybook sections outside the root-owned integration.

## Directional physical scale lock

These values guide visual proportion only and are not production specifications.

- Adult maker: credible 165–175 cm human scale.
- 150 g low-wide jar: body diameter 80–90 mm; body height 60–70 mm; mouth close to body diameter.
- Dessert spoon: 145–160 mm long.
- Stainless bowl: 200–240 mm diameter.
- Folding paddle: 250–320 mm long.
- Workbench: approximately 900 mm high.
- In environmental images the jar occupies only 4–7% of frame height and never reads larger than the maker's palm.

## Asset map and ownership

### Branch A — Space masters

- `REF-01` Front: `assets/revision-r12-reference-masters/ref01-manufactory-front.png`
- `REF-02` Side: `assets/revision-r12-reference-masters/ref02-manufactory-side.png`
- Own prompts with matching `REF01-...md` and `REF02-...md` filenames.
- REF-02 should be derived after REF-01 and preserve the same material architecture and lighting family while changing viewpoint to strict side.

### Branch B — Maker/action, object and product masters

- `REF-03` Strict-front maker and attached Batch Record: `assets/revision-r12-reference-masters/ref03-frontal-maker-batch-record.png`
- `REF-04` Object kit: `assets/revision-r12-reference-masters/ref04-object-scale-kit.png`
- `REF-05` Product master: `assets/revision-r12-reference-masters/ref05-product-master.png`
- Own prompts with matching `REF03-...md`, `REF04-...md`, and `REF05-...md` filenames.
- REF-03 is a visual scene reference, never a calibration board. Dimensions constrain realism internally. Its paper element is only the partial food-native Batch Record attached to the jar and activated by a genuine final-check action.

### Branch C — Material and UI ground masters

- `REF-06` Material states: `assets/revision-r12-reference-masters/ref06-material-state-library.png`
- `REF-07` UI background: `assets/revision-r12-reference-masters/ref07-ui-background.png`
- Own prompts with matching `REF06-...md` and `REF07-...md` filenames.

### Label identity master

- `REF-08` Batch Record label: `assets/revision-r12-reference-masters/ref08-batch-record-label-master.png`
- REF-08 is a PNG visual reference only. It owns the open information hierarchy, uncoated-paper color and restricted maker-check zone; it is not production artwork or a source for per-SKU vector generation.
- Product and mood references must not invent a generic sticker or treat its graphite canvas as scene styling.

## Fast review boundary

- One built-in image-generation call per asset. REF-02 may be one edit call using REF-01 as the source master.
- Quick original-size sanity check only: requested subject exists, viewpoint/scale role reads, file is valid.
- No correction or regeneration pass in this wave unless the file is corrupt, the requested master is wholly absent, or the user directly requests a role correction.
- Root registers all eight as `reusable_reference_master` and displays them in one unnumbered block inside Stage 2 section 6.
