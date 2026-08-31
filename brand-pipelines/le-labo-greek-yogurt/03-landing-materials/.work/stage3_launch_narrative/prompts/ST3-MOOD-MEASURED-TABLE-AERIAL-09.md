# ST3-MOOD-MEASURED-TABLE-AERIAL-09

## Mode and role

- Commercial-photo mode: Series
- Web role: landing hero / brand-mood overview
- Information goal: 여섯 재료가 서로 다른 중간 형태로 준비되고, 한 개의 투명 직접 인쇄 컵으로 이어지는 MORA의 `Measured Transformation`을 한눈에 보여 준다.
- Permitted variation axis: true 90° overhead viewpoint only
- Output intent: 16:9 landscape with a continuous copy-safe field on the left

## Series lock

- 투명한 낮고 넓은 food-contact candidate cup, 검정 직접 인쇄, 완전 제거된 matte foil, stainless spoon
- pale cool mineral slab와 inset brushed-stainless food workspace
- upper-left의 hard-but-diffused single source, lower-right로 향하는 일관된 soft-edged shadow
- neutral-cool color response, restrained contrast, visible midtones, natural surface variation, invisible retouching
- 음식과 도구의 실제 접촉·두께·반사·폐색 관계
- 사람·얼굴·손 없음
- 개별 종이 라벨·sticker·sleeve·collar·opaque backing·recipe-color ink 없음
- 향수·주류·약국·실험실·빈티지 craft trade dress 없음

## Master generation prompt

```text
Use case: product-mockup
Asset type: MORA landing-page launch hero and brand-mood series frame, ST3-MOOD-MEASURED-TABLE-AERIAL-09.

Purpose and information goal: a photorealistic true 90-degree overhead commercial food photograph that makes MORA's measured ingredient-preparation system understandable at a glance, while preserving a broad continuous copy-safe region for a Korean headline and CTA.

Scene: a contemporary refrigerated-food preparation table, not a laboratory. A pale cool mineral work slab meets one inset brushed-stainless work surface. The surfaces are clean but physically real, with restrained hairline use marks, subtle tonal variation and believable material thickness. No walls or horizon are visible because the camera is exactly vertical.

Subject and layout: compose all objects in the right 55–58 percent of a 16:9 landscape frame. Leave the left 42–45 percent as one uninterrupted low-detail pale-mineral negative-space field; no object, shadow, reflection, seam, high-contrast edge or ingredient crosses that copy region. On the right, arrange six distinct honest food-preparation forms in six separate shallow food-safe mise-en-place dishes, each clearly different and never presented as perfume or drink: (1) a pale amber viscous honey-thyme syrup with a few tiny thyme flecks, (2) a very pale filtered leaf-led aqueous preparation with a muted green-beige cast, presented only as directional food R&D, (3) a warm beige roasted-buckwheat fine slurry with controlled visible sediment, (4) a pale golden filtered citrus-peel preparation with a few fine peel threads, (5) an opaque charcoal black-sesame fine paste/slurry, and (6) a translucent olive-gold oil phase with a small pearly micro-emulsion edge; do not fabricate visible salt crystals. Keep each form food-like, modest in volume, naturally irregular and physically contained.

Place beside the six preparation dishes one low, wide, transparent food-contact yogurt cup as a directional prototype. It contains dense ivory yogurt with one narrow pale-amber ribbon and tiny thyme flecks visible through the wall. The cup has minimal neutral-black direct print on the clear wall: only the exact words "MORA" small and "THYME HONEY" larger, no numbers and no other text. Include one completely removed flat matte-silver peelable foil with one asymmetric tab, and one plain stainless teaspoon with a small honest yogurt trace. The foil, spoon and cup must have distinct real thickness, direct tabletop contact and coherent occlusion.

Series lock: same transparent low-wide MORA cup construction, same neutral-black print placement, same pale-mineral and brushed-stainless food workspace, same broad upper-left hard-but-diffused daylight, same neutral cool color response, restrained contrast, natural midtone detail, invisible retouching, no synthetic gloss. This frame alone varies to a true 90-degree overhead aerial viewpoint.

Photographic behavior: exact orthographic-looking overhead camera alignment, sensor plane parallel to the table, no oblique sidewalls, no horizon, no perspective tilt, no dutch angle. Wide environmental tabletop framing with deep enough focus that all six preparation forms, cup, foil and spoon are legible. Preserve realistic contact shadows and slight reflected shapes in stainless; control glare on the transparent cup so the yogurt and direct print remain visible. One consistent upper-left source creates unified soft-edged shadows toward lower-right. Preserve highlight detail in metal and clear plastic; no blown foil, no crushed shadows, no HDR clarity, no CGI-perfect symmetry, no floating objects, no duplicate utensils.

Constraints and protected boundaries: no person, face, hands or founder depiction. No paper individual label, sticker, sleeve, collar, hangtag, opaque backing, recipe-color ink or label-shaped frosted panel. No readable numeric text, scale readout, batch code, barcode, date, temperature, duration, pH, dose, legal copy or invented technical annotation. No perfume bottle, spirits bottle, cocktail, alcohol, apothecary jar, beaker, pipette, test tube, pharmaceutical grid, amber glass, black-steel laboratory, vintage workshop, rustic kraft, twine, wax seal, gold luxury cue or cosmetic styling. No health, nutrition, origin, handmade, small-batch, sustainability, freshness or food-safety claim. No watermark. The image is a directional commercial visualization, not proof of an actual facility, SOP, recipe, edible suitability, package performance or production run.
```

## Diagnose and repair delta

The master output placed the dishes, foil and spoon overhead but rendered the cup from the front, breaking the single-camera-axis lock. The selected image is a one-axis repair:

```text
Change only the transparent yogurt cup so it obeys the same true 90-degree overhead camera as every other object. Replace the front-facing sidewall with a circular overhead rim and visible yogurt surface. Preserve direct print only as a restrained curved black trace at the rim; do not fake a readable front label from overhead. Keep composition, negative space, six preparation dishes, foil, spoon, light, reflections, color and all protected boundaries unchanged.
```

## Observable acceptance checks

- 모든 객체가 같은 true overhead axis를 공유한다.
- 왼쪽 copy-safe field에 객체·강한 그림자·반사·seam이 침범하지 않는다.
- 오른쪽에 서로 다른 여섯 preparation form과 cup·foil·spoon이 정확히 한 세트씩 있다.
- 컵은 정수직 rim으로 보이며 전면 sidewall이 합성되지 않는다.
- 숫자·batch·date·법정 정보가 생성되지 않는다.
- paper unit label, perfume/spirit/apothecary cue, 사람·얼굴·손이 없다.
- 모든 접촉 그림자, stainless reflection, foil highlight와 투명 rim이 하나의 광원에 양립한다.

