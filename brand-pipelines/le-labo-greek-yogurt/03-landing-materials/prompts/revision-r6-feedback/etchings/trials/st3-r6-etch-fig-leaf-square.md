# ST3 R6 — Fig Leaf Trial Copperplate / Square

## Input role

- **Image 1 — sole edit target:** `public/brand-reports/mora-infused-greek-yogurt-landing-materials/assets/st3-r5-etch-fig-leaf-square-c3270b858cb0c4d5f8a8d2211dd7db8370d5ed689ee04d01930a1e8a9c909839.png`.
- Image 1 exclusively defines every ingredient, process stage, tool, causal connection, relative viewpoint, copperplate line character, hatch density, stipple, upper-left engraving light, ink and background. This is not a reinterpretation or a new illustration.
- Semantic lock is inherited from `prompts/revision-r2/etchings/ST3-ETCH-R2-47-fig-leaf.md`.

## Edit prompt

Use case: precise-object-edit.

Asset type: high-resolution-intent 1:1 landing-page product-grid editorial copperplate illustration.

Primary request: Edit Image 1 by changing **only composition scale and breathing room**. Uniformly reduce the complete existing illustrated object group to approximately 72% of its current visual scale. Reposition the same complete group around the lower-middle visual center so its final combined outer bounding box occupies no more than 60–64% of canvas width and no more than 52–58% of canvas height. Every visible outer contour must remain at least 16–18% inside all four canvas edges. Preserve generous flat surrounding space.

Spacing delta: retain every real contact point that communicates transfer—fig leaf on the fitted perforated insert, cup pour into mesh, mesh drain into glass measure, syringe tip at yogurt, paddle in yogurt and spoon-cut/internal trace. Between independent non-touching object groups, maintain 4–7% of the full canvas as clean background breathing room. Do not separate causal contacts or invent connectors.

Preserve locks: preserve the exact recognizable lobed fig leaf; shallow stainless infusion cup; fitted perforated insert; existing pour stream; fine mesh; plain graduated glass measure; needleless food-safe syringe; dense strained-yogurt bowl; folding spatula; spoon-cut and internal near-ivory trace. Preserve the exact left-to-right causal order and all tool/object identities, counts, angles, overlaps, gravity, proportions and relative drawing hierarchy. Preserve the exact fine Carbon `#171714` copperplate contour, form-following hatch, line density, sparse stipple and coherent upper-left engraving light. Preserve strict monochrome and the exact uniform flat Cultured Cream `#F5F1E8` background.

Background: fill all newly revealed breathing room with one perfectly flat `#F5F1E8` color. No paper texture, fiber, stain, noise, wash, shadow haze, gradient, tint drift, border, vignette or aging. Do not recolor the ink or introduce grey/green/brown spot color.

Constraints: no redesign, restaging, new perspective or new object. No text, pseudo-text, label, numeral, arrow, panel, divider, border, logo or watermark. No crop of leaf, stream, tool, vessel, syringe, paddle, spoon or bowl. No detached/floating component, impossible gap, lost process stage, lost ingredient identity, stylization drift, heavier/lighter line system, new shadow direction, or paper simulation.

Acceptance: square; same exact Fig Leaf process illustration and order; group approximately 70–75% of former scale; combined bounding box width ≤64% and height ≤58%; every contour ≥16% from edges; independent groups have 4–7% breathing room while transfer contacts remain attached; zero crop; flat `#F5F1E8`; Carbon `#171714`; no text or added marks.

## Output and provenance

- Built-in edit pass 1 preserved the process but measured 66.83% group width and 15.55% right margin, so it received the permitted single targeted retry for occupancy/centering and flat background.
- Accepted pass measured 61.32% group width × 33.89% height; margins left 20.49%, right 18.18%, top 37.64%, bottom 28.47%. Process identity and all causal contacts remained visually intact; no tool or vessel crop.
- Untouched accepted native: `assets/revision-r6-feedback/native/etchings/trials/st3-r6-etch-fig-leaf-square-native.png`, 1254×1254, SHA-256 `7bd8edc57fb4fa6b868f88ab674e7b4b7ab0e075a1906f49f35f229e1dacce05`.
- Delivery: `assets/revision-r6-feedback/etchings/trials/st3-r6-etch-fig-leaf-square.png`, 3072×3072, SHA-256 `25d0e56360b631095c6caceb6431ae5f8732c53d4087a7bde941c8dec3a2e41f`.
- Delivery was produced only by high-quality `sips` resampling from the untouched native; larger dimensions do not imply newly generated detail.
- Palette QA risk: the output is visually flat Cultured Cream with preserved monochrome copperplate character, but pixel sampling did not hold an exact uniform `#F5F1E8` / `#171714` pair after the allowed retry. Native corner sampled `(247,242,233)` and the dominant background sample was `(248,244,236)`; therefore exact background/ink lock is recorded as **FAIL**, not silently normalized.
