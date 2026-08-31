# MORA Stage 3 — Landing Raster Slot Contract

## Scope and runtime evidence

This contract describes only raster images that are actually rendered by `src/pages/MoraLandingPage.jsx` through `FullBleedSection`, `SplitEditorial`, `StickyProductGrid` / `ProductCard`, and `VesselPhaseBlock`. It preserves the current component, two-column grid, sticky, and scroll architecture.

- Runtime breakpoint: `md = 900px` in `src/styles/themes/default.js`.
- Runtime inventory: **34 raster slot occurrences / 32 unique raster masters**. Thyme Honey and Roasted Buckwheat product masters each appear in both product grids.
- `FullBleedSection`: container `aspectRatio: '3 / 2'`; absolute image `width/height: 100%`, `objectFit: 'cover'` at every breakpoint.
- `SplitEditorial`: `xs: 1fr`, `md: 1fr 1fr`, gap `2px`; its child image ratio remains unchanged when columns stack.
- `StickyProductGrid`: `xs: 1fr`, `md: 1fr 1fr`, gap `2px`. Its main-image column remains **`aspectRatio: '1 / 2'` at all breakpoints**, with absolute `objectFit: 'cover'`.
- `ProductCard`: square `aspectRatio: '1 / 1'`, `objectFit: 'cover'`; caption is outside the image.
- The six raster keys that exist in `assets.js` but are not mounted by the current page are out of scope: `methodIngredientAtlas`, `methodInfusionLadder`, `methodFoldTrace`, `vesselClosureProof`, `inspectionSide`, and `customerPeelSpoon`.

## Overlay geometry

| Overlay token | Exact implementation | Image-safe implication |
| --- | --- | --- |
| `left-center` | absolute; `top: 50%`; `left: 24px` below `md`, `40px` at `md+`; `translateY(-50%)`; `maxWidth: 600px` | Keep the left central copy band low-detail. Place the critical subject/evidence in the right 45–50%, not behind the first 600 px on desktop. |
| `center` | absolute; `top/left: 50%`; `translate(-50%, -50%)`; `width: 100%`; `maxWidth: 700px`; `px: 24px`; centered text | Keep the central 700 px / roughly middle 45% height low-detail and contrast-controlled. Critical evidence must remain legible around, not under, the copy. |
| `bottom-left` | sticky; `bottom: 0`; `alignSelf: flex-end`; `maxWidth: 500px`; `padding: 24px` | Reserve the lower-left 500 px desktop region and lower-left half on mobile as low-detail copy space. Keep product faces, hands, records, and utensils center/right or upper frame. |
| none | Sticky main, split pairs, standalone etchings, and product cards have no in-image copy | Preserve complete subject silhouettes; captions/content remain outside their raster. |

## Implemented slot matrix

Minimum pixel recommendations assume a normal 1440 px desktop at approximately 2× delivery and a 390 px mobile at up to 3×. The page has no maximum width, so larger displays may still upscale.

| # | Rendered slot / current asset | Component and exact CSS | Overlay | Required source master | Critical subject safe area / sacrificial zone | Desktop / mobile risk | Recommended minimum |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Hero — `heroAtelier` (`st3-hero-empty-atelier-40.png`) | `FullBleedSection`; `3 / 2`; `cover` | `left-center` | **3:2 landscape** | Subject/equipment in right 50%; left central copy band clear. With a true 3:2 master only outer 5% is sacrificial. | Current 1672×941 source is 16:9: `cover` removes about **7.8% from each horizontal edge**. On mobile the fixed 3:2 height gives copy only ~0.67 viewport-width of vertical space. | 2880×1920 |
| 02 | Brand Trace — `etchBrandTrace` (`st3-etch-r2-42.png`) | direct `img`; `width: 100%`, `maxWidth: 55%`; intrinsic height; no `aspectRatio` / no `objectFit` | none | Intrinsic **3:2** plate | Complete artwork inside 90% with 5% clear perimeter; no crop zone in code. | No crop, but it remains only 55% wide even on mobile and can become too small for fine marks. | 1800×1200 |
| 03 | Feature / straining cloth — `clothTransition` (`st3-transition-r3-72.png`) | `FullBleedSection`; `3 / 2`; `cover` | `center` | **3:2 landscape** | Middle copy block low-detail; straining evidence outside the central text block but inside the central 90%. | Current 16:9 source loses ~7.8% from each side. Mobile copy can cover most of the short 3:2 frame. | 2880×1920 |
| 04 | Why MORA maker — `whyMoraMaker` (`st3-why-mora-maker-41.png`) | `SplitEditorial` child; `3 / 2`; `cover` | none | **3:2 landscape** | Maker, hands, and three states inside central 80%; outer 10% may be treated as crop tolerance. | Ratio currently matches. At `<900px`, the image becomes full-width and stacks above First Furrow; scale increases but crop does not change. | 1600×1067 |
| 05 | First Furrow — `etchFirstFurrow` (`st3-etch-r2-43.png`) | `SplitEditorial` child; `3 / 2`; `cover` | none | **3:2 landscape** | Complete plate in central 90%; outer 5% expendable. | Ratio matches; stacks below maker on mobile. | 1600×1067 |
| 06 | Core sticky main — `momentMorning` (`st3-moment-r3-69.png`) | `StickyProductGrid`; **`1 / 2`**; absolute `cover` | none | **1:2 portrait — mandatory** | All essential cup, hand, face/action and table contact inside central 70% width and central 90% height; only outer 10–15% sides and 5% top/bottom sacrificial. | **Critical mismatch:** current 3:2 landscape retains only the central **33.3% of source width**, cropping ~33.3% from each side. The 1:2 slot remains two viewport-widths tall on mobile, before the product grid. | 1600×3200 |
| 07a–d | Core product cards — Thyme Honey, Roasted Buckwheat, Citrus Peel, Black Sesame (`product*`) | `ProductCard`; `1 / 1`; `cover`; two-column card grid | none; caption below | **1:1 square**, shared centerline/baseline/occupancy | Complete jar and shadow in central 80%; outer 10% perimeter sacrificial. | Current 1254² sources match. Cards remain two columns on mobile, so labels and food trace must read small. | 1200×1200 each |
| 08a–d | Core ingredient aerials — Thyme Honey, Buckwheat, Citrus, Sesame (`ingredient*`) | `IngredientFolioPair` / `SplitEditorial`; `1 / 1`; `cover` | none | **1:1 square**, true overhead | Whole vessel group inside central 72%; at least 14% clear edge margin. | Ratio matches. Half-width squares at `md+`; full-width stacked squares below `md`. | 1600×1600 each |
| 09a–d | Core material folios — matching four `etch*` | `IngredientFolioPair` / `SplitEditorial`; `1 / 1`; `cover` | none | **1:1 square** | Complete etching/plate in central 86%; outer 7% perimeter expendable. | Ratio matches; full-width stacked after each ingredient on mobile. | 1600×1600 each |
| 10 | Trials sticky main — `momentAfternoon` (`st3-moment-r3-70.png`) | reversed `StickyProductGrid`; **`1 / 2`**; absolute `cover` | none | **1:2 portrait — mandatory** | Same sticky lock as slot 06: critical action within central 70% width / 90% height. | **Critical mismatch:** current 3:2 landscape retains central 33.3% width only. On mobile reversed order places title/cards/CTA before the two-viewport-width-tall image. | 1600×3200 |
| 11a–d | Trials grid product cards — Fig Leaf, Olive Oil & Sea Salt, Thyme Honey, Roasted Buckwheat | `ProductCard`; `1 / 1`; `cover`; two-column grid | none; caption/status below | **1:1 square**, same lock as slot 07 | Complete jar in central 80%; outer 10% perimeter sacrificial. | Fig/Olive are unique here; Thyme/Buckwheat reuse slot-07 masters. Status text is outside raster. | 1200×1200 each |
| 12a–b | Trial ingredient aerials — Fig Leaf, Olive Oil & Sea Salt | `IngredientFolioPair`; `1 / 1`; `cover` | none | **1:1 square**, true overhead | Whole group central 72%; 14% clear edge margin. | Ratio matches; desktop pair becomes two stacked full-width squares on mobile. | 1600×1600 each |
| 13a–b | Trial material folios — Fig Leaf, Olive Oil & Sea Salt | `IngredientFolioPair`; `1 / 1`; `cover` | none | **1:1 square** | Complete plate central 86%; outer 7% perimeter expendable. | Ratio matches and stacks on mobile. | 1600×1600 each |
| 14 | Cloth to Body — `etchClothToBody` (`st3-etch-r2-45.png`) | direct `img`; `width: 100%`, `maxWidth: 60%`; intrinsic height; no `aspectRatio` / no `objectFit` | none | Intrinsic **3:2** plate | Complete artwork in 90%; no runtime crop. | No crop, but percentage width shrinks the plate to 60% of a narrow mobile viewport. | 1800×1200 |
| 15 | Collection Statement — `methodProcessTable` (`st3-method-r2-52.png`) | `FullBleedSection`; `3 / 2`; `cover` | `left-center` | **3:2 landscape** | Process evidence right 50%; left-center text band clear. | Current 16:9 source loses ~7.8% from each side. Three-line heading can cover much of mobile frame. | 2880×1920 |
| 16 | Vessel SEE — `vesselMaster` (`st3-vessel-glass-r2-56.png`) | `VesselPhaseBlock` → `FullBleedSection`; `3 / 2`; `cover` | `bottom-left` | **3:2 landscape** | Finished vessel center/right, complete silhouette; lower-left 500 px desktop / lower-left half mobile clear for copy. | **Current 1:1 source loses ~16.7% from both top and bottom.** Open rim/base evidence is at risk. | 2880×1920 |
| 17 | Vessel READ — `inspectionFront` (`st3-glass-context-r2-65.png`) | same; `3 / 2`; `cover` | `bottom-left` | **3:2 landscape** | Record and jar center/right; lower-left clear. | Current 3:2 ratio matches. Mobile overlay may obscure a left-side record. | 2880×1920 |
| 18 | Vessel OPEN — `vesselOpenService` (`st3-vessel-glass-r2-57.png`) | same; `3 / 2`; `cover` | `bottom-left` | **3:2 landscape** | Opening action, rim, and closure proof center/right/upper; lower-left clear. | **Current 1:1 source loses ~16.7% top and bottom.** Hands or seal can be clipped. | 2880×1920 |
| 19 | Vessel TASTE — `firstSpoonMacro` (`st3-detail-r3-68.png`) | same; `3 / 2`; `cover` | `bottom-left` | **3:2 landscape** | Spoon, yogurt pull, rim, and contact center/right; lower-left clear. | **Largest FullBleed mismatch:** current 4:5 source retains only ~53.3% of source height, cropping ~23.3% from both top and bottom. | 2880×1920 |
| 20 | Evening use moment — `momentEvening` (`st3-moment-r3-71.png`) | `FullBleedSection`; `3 / 2`; `cover` | `bottom-left` | **3:2 landscape** | Cup/table action center/right or upper; lower-left copy region clear. | Ratio matches. Mobile bottom-left text can cover a large share of the short frame. | 2880×1920 |

## Crop priority and current mismatch summary

1. **Replace the two sticky masters first.** A 3:2 landscape cannot serve a 1:2 `cover` slot without discarding two-thirds of its width. `momentMorning` and `momentAfternoon` need dedicated 1:2 compositions; a center crop of the existing masters is not a production solution.
2. **Reframe Vessel SEE, OPEN, and TASTE as native 3:2.** Square and 4:5 source masters currently lose required top/bottom evidence. READ already matches.
3. **Reframe Hero, Feature, and Collection Statement from 16:9 to native 3:2.** The current horizontal loss is moderate (~7.8% each side) but conflicts with left/center copy architecture.
4. Exact-ratio square cards and folios currently have no computed crop, but all critical material must remain inside their declared safe areas because `objectFit: cover` is still active.

## Deduplicated production-shot list

Produce **32 unique raster masters**; reuse only the two explicitly duplicated product-card masters.

1. `heroAtelier` — 3:2, right-weighted atelier with left-center copy safety.
2. `clothTransition` — 3:2, centered-copy feature background.
3. `whyMoraMaker` — 3:2 maker/process comparison.
4. `momentMorning` — dedicated 1:2 sticky portrait.
5. `momentAfternoon` — dedicated 1:2 sticky portrait.
6. `methodProcessTable` — 3:2, right-weighted process evidence with left-center copy safety.
7. `vesselMaster` — 3:2 SEE frame.
8. `inspectionFront` — 3:2 READ frame.
9. `vesselOpenService` — 3:2 OPEN frame.
10. `firstSpoonMacro` — 3:2 TASTE frame.
11. `momentEvening` — 3:2 bottom-left-copy-safe use moment.
12. `etchBrandTrace` — intrinsic 3:2 narrative plate.
13. `etchFirstFurrow` — 3:2 split-editorial narrative plate.
14. `etchClothToBody` — intrinsic 3:2 narrative plate.
15–20. Six locked 1:1 product masters: Thyme Honey, Roasted Buckwheat, Citrus Peel, Black Sesame, Fig Leaf, Olive Oil & Sea Salt.
21–26. Six locked 1:1 ingredient aerial masters in the same recipe order.
27–32. Six locked 1:1 material-folio etching masters in the same recipe order.

`productThymeHoney` and `productBuckwheat` are each rendered twice but must remain one master each; no duplicate generation is required.
