# ST3-HERO-EMPTY-ATELIER-40 — Empty Atelier System

## Decision package

- Mode: Compile / web-first Hero.
- Information goal: identify MORA as a contemporary Greek-yogurt maker by showing one complete, physically coherent production system at rest.
- Viewpoint: wide architectural establishing view from the room threshold, eye-level, restrained wide-angle perspective with straight verticals and deep focus.
- UI rule: keep the left 40% as one continuous low-detail copy field. All equipment, reflections, cast shadows and high-contrast edges stay in the right 60%.
- Variation axis: empty-space overview only. The people count is locked to zero.

## Series lock

- Contemporary food-safe atelier: warm off-white mineral walls, seamless pale mineral floor, brushed stainless work surfaces and restrained graphite shelving.
- One coherent soft key from upper-left, gentle frontal fill, neutral daylight balance, retained highlights and visible shadow detail.
- Physical process reads left-to-right within the occupied right side: cloth straining, ingredient infusion, low-shear folding, wide-mouth glass filling and batch recording.
- No plastic vessel, disposable cup, paper label, amber apothecary glass or vintage kitchen styling.

## Final built-in image prompt

```text
Use case: photorealistic-natural
Asset type: 16:9 landing-page hero photograph
Purpose: a wide architectural establishing image that immediately identifies MORA as a contemporary small-batch Greek-yogurt atelier while preserving a clean headline and CTA field on the left.

Scene/backdrop: an unoccupied modern food-production room with warm off-white mineral walls, a seamless pale mineral floor, brushed stainless worktables and restrained graphite open shelving. The left 40% of the frame is one continuous quiet cream wall and clear floor with restrained texture and very low contrast. Keep every work surface, prop, reflection, cast shadow and high-contrast edge outside this left copy-safe field.

Subject: arrange the complete production system only in the right 60% as a physically coherent sequence, all at rest. Foreground right: a food-grade white filter cloth seated in a low stainless perforated straining frame above a shallow whey collection pan, with only a few credible residual droplets. Mid-right: a compact ingredient-infusion station with a food scale, one small stainless saucepan, one fine mesh food strainer and two low borosilicate sample beakers. Rear-right: a broad low-shear folding bowl with one wide stainless spatula resting naturally against the rim. Far-right finishing bench: several identical clear heavy glass wide-mouth yogurt vessels, each cylindrical with a short rounded shoulder and visibly heavy base, accompanied by very thin flush graphite aluminum caps; a simple food scale, date stamp and blank batch card make the batch-record station legible. The room layout must let a viewer understand straining -> infusion -> folding -> glass filling -> batch record without arrows or text.

Photographic behavior: photorealistic commercial food-process photography, wide architectural view from the room threshold at natural eye level, restrained 26–30 mm full-frame perspective, straight verticals, deep focus sufficient to read every station, no dramatic bokeh. One large soft upper-left daylight source with restrained frontal fill; all shadows share one plausible direction. Neutral warm daylight without sepia or cool clinical blue. Preserve natural stainless variation, cloth weave, glass wall thickness, believable refraction, grounded contact shadows and invisible retouching.

Constraints: exactly zero people. No hands, faces, bodies, silhouettes, portraits, reflections of people, human shadows or implied off-camera limbs. No generated text, logo, watermark or pseudo-label. No plastic cup, polymer tub, plastic case, molded flange, paper label, sticker, carton, amber bottle, perfume bottle, atomizer, dropper, rustic kitchen, vintage laboratory, decorative ingredient scatter, theatrical smoke, HDR clarity, clipped highlights, crushed blacks, floating tools, impossible liquid, impossible reflections or CGI-like uniform gloss. Keep the left copy-safe field uninterrupted and visually quiet. Render one single photographic frame, not a collage or diagram.
```

## Observable acceptance checks

- People count is exactly zero, including reflections and shadows.
- Left low-detail copy-safe field measures approximately 38–42% of frame width.
- Five operations are independently identifiable from real tools and their spatial order.
- Every product vessel is heavy clear glass with a wide spoonable mouth and thin graphite metal cap.
- Perspective, contact, metal reflections, glass refraction and shadow direction remain physically coherent.

Output: `assets/revision-r2/narrative/mora-hero-empty-atelier-r2.png`

## Final generation record

- Built-in image tool, generate followed by one `precise-object-edit` delta.
- Delta: moved only the production-zone boundary leftward; all scene, station, lighting and zero-person invariants were preserved.
- Final canvas: 1672 × 941 px (16:9).
- Final visual QA: zero people/reflections/shadows; approximately 42% continuous left copy-safe field; cloth straining, infusion tools, folding vessel, glass filling line and batch-record tools all remain visible; no plastic package or paper product label appears.
