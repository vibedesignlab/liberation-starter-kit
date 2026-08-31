# ST3 R6 — Olive Oil & Sea Salt Trial Copperplate / Square

## Input role

- **Image 1 — sole edit target:** `public/brand-reports/mora-infused-greek-yogurt-landing-materials/assets/st3-r5-etch-olive-oil-sea-salt-square-5ef11a98a485120c793419f55c7b6f80d7ecfc83cb954a83cf1141eeb78839c9.png`.
- Image 1 exclusively defines every ingredient, process stage, tool, causal connection, relative viewpoint, copperplate line character, hatch density, stipple, upper-left engraving light, ink and background. This is not a reinterpretation or a new illustration.
- Semantic lock is inherited from `prompts/revision-r2/etchings/ST3-ETCH-R2-51-olive-oil-sea-salt.md`.

## Edit prompt

Use case: precise-object-edit.

Asset type: high-resolution-intent 1:1 landing-page product-grid editorial copperplate illustration.

Primary request: Edit Image 1 by changing **only composition scale and breathing room**. Uniformly reduce the complete existing illustrated object group to approximately 70% of its current visual scale. Reposition the same complete group around the lower-middle visual center so its final combined outer bounding box occupies 60–62% of canvas width and no more than 52–58% of canvas height. Every visible outer contour must remain at least 18% inside all four canvas edges. Preserve generous flat surrounding space.

Spacing delta: retain every real process contact—whisk in compact cup, syringe drawing from the temporary oil-phase dispersion, syringe-to-cup relation, folding spatula in yogurt and thin internal oil-ribbon/mineral cue within the spoon-cut. Preserve the raw oil measure and coarse-salt tray as the two separate inputs. Between independent non-touching object groups, maintain 4–7% of the full canvas as clean background breathing room. Do not separate causal contacts or invent connectors.

Preserve locks: preserve the exact shallow glass oil measure and believable meniscus; tiny stainless tray and irregular coarse sea-salt crystals; compact stainless cup; food-safe whisk; visibly temporary pearly oil-phase dispersion; plain dosing syringe without needle; dense strained-yogurt bowl; folding spatula; spoon-cut; thin internal oil ribbon and restrained mineral salt cue. Preserve exact left-to-right causal order, all object counts, identities, angles, overlaps, gravity, proportions and relative drawing hierarchy. Preserve exact fine Carbon `#171714` copperplate contour, restrained form-following hatch, line density, sparse stipple and coherent upper-left engraving light. Preserve strict monochrome and exact uniform flat Cultured Cream `#F5F1E8` background.

Background: fill all newly revealed breathing room with one perfectly flat `#F5F1E8` color. No paper texture, fiber, stain, noise, wash, shadow haze, gradient, tint drift, border, vignette or aging. Do not recolor the ink or introduce amber, olive, grey or brown spot color.

Constraints: no redesign, restaging, new perspective or new object. No text, pseudo-text, label, numeral, arrow, panel, divider, border, logo or watermark. No crop of oil measure, tray, crystals, whisk, cup, syringe, spatula, yogurt bowl or internal trace. No stable-emulsion claim, detached/floating object, lost stage, lost raw-pair identity, impossible meniscus, stylization drift, heavier/lighter line system, new shadow direction, or paper simulation.

Acceptance: square; same exact Olive Oil & Sea Salt process illustration and order; group approximately 70–75% of former scale; combined bounding box width ≤64% and height ≤58%; every contour ≥16% from edges; independent groups have 4–7% breathing room while process contacts remain attached; zero crop; flat `#F5F1E8`; Carbon `#171714`; no text or added marks.

## Output and provenance

- Built-in edit pass 1 preserved the process but measured 65.71% group width and 14.59% right margin, so it received the permitted single targeted retry for occupancy/centering and flat background.
- Accepted pass measured 55.74% group width × 33.65% height; margins left 23.76%, right 20.49%, top 34.61%, bottom 31.74%. This is below the specified maximum occupancy and preserves the process, all tools and zero crop, though it is visibly more spacious than the 60–64% cap.
- Untouched accepted native: `assets/revision-r6-feedback/native/etchings/trials/st3-r6-etch-olive-oil-sea-salt-square-native.png`, 1254×1254, SHA-256 `544f438638ee04639e5e7193ef981d8b8fe3dc5877bf55c1ceacf3dd9041827a`.
- Delivery: `assets/revision-r6-feedback/etchings/trials/st3-r6-etch-olive-oil-sea-salt-square.png`, 3072×3072, SHA-256 `3e5a48bd77e30be4eb13d2c391eec4342b170d0970e696704f27d6382f43e3dc`.
- Delivery was produced only by high-quality `sips` resampling from the untouched native; larger dimensions do not imply newly generated detail.
- Palette QA risk: the output is visually flat Cultured Cream with preserved monochrome copperplate character, but pixel sampling did not hold an exact uniform `#F5F1E8` / `#171714` pair after the allowed retry. Native corner sampled `(248,245,235)` and the dominant background sample was `(249,245,237)`; therefore exact background/ink lock is recorded as **FAIL**, not silently normalized.
