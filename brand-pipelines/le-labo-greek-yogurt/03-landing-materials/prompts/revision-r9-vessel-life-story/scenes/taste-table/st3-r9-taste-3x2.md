# ST3 R9 — TASTE / Thyme Honey meets food

## Mode and web role

- Mode: Compile / Series. Generate a new photograph; none of the inputs is a composition edit target.
- Role: exact 3:2 landscape, full-bleed narrative feature in the five-frame `SEE → READ → OPEN → TASTE → TABLE` sequence.
- Native intent: 1536 × 1024 or larger exact 3:2 PNG; delivery master is an honest high-quality resample to 6144 × 4096 PNG when native is smaller.

## Input authority map

1. **REF-LABEL — `st3-r9-ref-label-product-master.png`**: sole authority for the same low-wide 150 g transparent wide-mouth glass jar, rim and glass proportions, dense cultured yogurt, amber Thyme Honey internal fold with restrained thyme flecks, and populated partial uncoated-paper Batch Record. Preserve its hierarchy and known concept values; do not borrow its studio background, centered framing, closed metal lid, or oversized occupancy.
2. **REF-HOME — `ref-home-lived-in-kitchen-3x2.png`**: authority only for the same capable adult woman's hand/skin realism, factual human scale, repaired-plaster/dark-wood/stainless lived-in kitchen family, soft window daylight plus quiet warm practical light, and documentary character. Do not copy the woman's prior pear-pan action, object arrangement, or the diagonal lower-left counter seam.
3. **REF-PAIRING — `ref-pairing-thyme-honey-3x2.png`**: authority only for one warm rye toast slice, exactly two roasted pear wedges, restrained thyme presence, real food scale, caramelized skin, moist flesh, crumb and contact texture. Do not copy its plate placement or broad empty-left composition.

## Generation prompt

Create a photorealistic 85 mm food-detail editorial photograph that remains contextual enough to read as the same lived-in kitchen. Exact 3:2 landscape, full bleed. This is the TASTE frame: the maker's internal Thyme Honey fold finally meets the household curator's chosen food.

Compose all narrative evidence in the upper-center and right, inside the inner 82% safe frame. On a dark, lightly used stoneware plate at upper-center/right, show exactly one ordinary slice of warm rye toast and exactly two roasted pear wedges—no more fruit, no duplicate wedges. One natural adult woman's hand enters unobtrusively from the upper/right and performs one single plausible action: an ordinary teaspoon carries and deposits a heavy, dense spoonful of cultured Greek yogurt onto the toast or immediately alongside it. The yogurt must make physical contact with the food or plate; it must not float. The broken spoonful exposes a clearly visible amber Thyme Honey fold running inside the dense white yogurt, with only a few tiny thyme flecks. Show edible weight, a gentle drag/fold, contact shadow, moist pear flesh, toasted rye pores and believable crumbs. Keep the glaze restrained and food-real; no honey pool, syrup puddle, glossy beauty-food sheen or garnish pile.

Place the same open MORA jar from REF-LABEL as a complete secondary object in the upper-right/background, approximately 8–12% of the total frame area. It is open and partly used, with its wide mouth and food visible. Preserve the same low-wide glass geometry, populated partial paper Batch Record, MORA identity and Thyme Honey fold. Paper covers no more than 30–40% of the visible sidewall and the yogurt remains the largest readable surface. The small label need not be fully legible at this lens, but it must look populated rather than blank. Do not invent label fields, values, dates, cities, claims, certification marks or decorative handwriting. No closed lid on the jar; any removed seal or lid stays out of frame. No second hand, second spoon, extra jar or package.

Reserve the bottom-left 40% of canvas width by the bottom 28% of canvas height as an uninterrupted low-frequency dark copy field for white overlay text. This rectangular zone contains only calm, matte, softly graded worktop: no plate, toast, pear, yogurt, hand, spoon, jar, crumbs, thyme, cloth, hard cast shadow, bright reflection, horizon, counter seam, high-contrast edge, furniture or object. Keep the story cluster clearly outside it.

Lighting is motivated soft domestic daylight from the left/rear with a subtly warmer practical source deeper in the room; every highlight and shadow follows those sources. Exposure protects creamy yogurt and pear highlights while retaining open dark detail. The food is color-accurate and appetizing without commercial over-styling. Capture as restrained analog food-magazine photography: natural 35 mm grain, gentle highlight roll-off, slight density variation, real glass refraction, metal micro-use, skin texture and contact shadows. No fake scratches, dust, light leaks, sepia, teal-orange grade, CGI polish, plastic skin, perfect symmetry, cloned crumbs, floating utensil, perfume language, beauty cream, farmhouse tableau or staged feast.

The only written material permitted is the existing populated MORA Batch Record on the small secondary jar. No new text, pseudo-text, logo, title, caption, watermark or border.

## Preserve / reject checklist

- Preserve one rye toast + exactly two roasted pear wedges; one hand + one spoon + one deposition action.
- Preserve visible internal Thyme Honey fold in the spoonful and same populated-label jar identity.
- Preserve jar occupancy 8–12% and bottom-left 40% × 28% copy-safe field.
- Reject cropped jar/rim/action, floating yogurt, wrong pear count, honey pool, garnish pile, blank/full-wrap/direct-print label, invented copy, oversized jar or hand, studio table, decorative feast.

## Output and provenance

- Native output: `assets/revision-r9-vessel-life-story/scenes/taste-table/native/st3-r9-taste-3x2-native.png`
- Delivery output: `assets/revision-r9-vessel-life-story/scenes/taste-table/st3-r9-taste-3x2.png`
- Generation history: one built-in imagegen Compile/Series pass using REF-LABEL, REF-HOME and REF-PAIRING with the role boundaries above; accepted without retry.
- Native dimensions / SHA-256: 1536 × 1024 / `7c42339416000eb761c91bd82f2112beb7d3ba612fe4e47530d582741c2e73c1`.
- Delivery dimensions / SHA-256: 6144 × 4096 / `0c281434125ee56260346d116dc71432018f88a6c64c536c95a2e6194341045d`.
- Delivery provenance: high-quality `sips` resample from the untouched 1536 × 1024 native; this increases delivery dimensions, not generated detail.
- QA / visible risk: PASS — exact 3:2, one toast, exactly two pear wedges, one hand/spoon deposition, open populated-label jar at secondary scale and calm lower-left field are visible. Minor risk: the honey reads strongly on the spoonful surface as well as through the fold, so future crops should not increase amber-glaze dominance.
