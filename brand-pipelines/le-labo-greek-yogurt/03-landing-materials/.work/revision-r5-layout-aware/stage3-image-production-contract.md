# MORA Stage 3 R5 — Layout-aware image production contract

## Objective

Update Stage 3 from the accepted Revision 10 Stage 2 brand system while preserving the current landing components, two-column grids, sticky product scroll, and section order. Replace the active image direction wherever the source ratio or subject placement causes `object-fit: cover` to remove essential evidence.

## Stage 2 authority lock

- Selected route: `NR-10-01 — 마지막까지 보는 사람`.
- Brand ethic: 좋은 재료를 고르는 데서 끝나지 않고, 선택·중간 변환·마지막 확인까지 책임진다.
- Human authority: a female maker is shown through one observable decision, not decorative femininity or a domestic stereotype.
- Space: a believable lived-in urban food workshop with repaired plaster, utility tile, old thresholds, functional storage, and hygienic stainless food-contact surfaces; never a broadcast studio or pristine boutique kitchen.
- Product: low-wide transparent 150 g wide-mouth spoon jar, at least 60–70% edible witness area, partial tactile Batch Record occupying no more than 30–40% of the visible sidewall, functional food seal, no perfume silhouette.
- Image classes stay separate: dark analog process mood, color-accurate product proof, and actual-scale ingredient proof must not share one decorative grade.
- Film character: visible restrained 35 mm editorial grain, slightly imperfect density and highlight roll-off, no fake scratches, dust, light leaks, sepia wash, or distressed-food styling.

## Layout preservation lock

- Do not redesign `MoraLandingPage`, `FullBleedSection`, `SplitEditorial`, `StickyProductGrid`, `ProductCard`, or `VesselPhaseBlock` as part of this revision.
- Keep the existing 2-column grid, 2×2 sticky product matrix, sticky bottom vessel labels, and scroll sequence.
- Every replacement image is authored for its exact rendered slot. A generic landscape master is not reused in a square or 1:2 portrait slot.
- `object-fit: cover` may trim only the declared sacrificial edge zone. It must never trim the maker action, jar mouth, food trace, Batch Record, ingredient set, tool contact, or intermediate output.

## Master ratios and high-resolution delivery

| Slot family | Exact source ratio | Native-generation target | Delivery master | Safe-area rule |
|---|---:|---:|---:|---|
| FullBleed hero / transition / method / vessel / evening | 3:2 landscape | maximum native landscape output | 3072×2048 PNG minimum | all evidence inside inner 82%; overlay-specific clear field locked |
| Sticky collection main | 1:2 portrait | maximum native portrait output composed for center crop | 2048×4096 PNG minimum | all evidence inside center 68% width and inner 88% height |
| Product card / ingredient folio | 1:1 square | maximum native square output | 2048×2048 PNG minimum | complete subject inside central 72%; minimum 12% edge clearance |
| Etching / diagram without CSS crop | intrinsic source ratio | existing source retained when sharp | longest edge 2500 px minimum for new work | no forced crop; preserve full drawing |

The built-in generator's untouched native output is preserved beside the delivery master. If the native generator cannot reach the delivery dimensions, the delivery file may be a high-quality resampled master, but provenance must say so explicitly; resampling is not described as newly generated detail.

## Overlay-safe composition

- `left-center`: left 42% is low-frequency copy-safe; active action and product evidence occupy the right 48%; the middle 10% is a transition band.
- `center`: central 44% width × 42% height is low-frequency and contrast-controlled; process evidence sits at the lower third and outer perimeter.
- `bottom-left`: bottom-left 40% width × 30% height is dark, calm, and free of labels or critical objects; vessel/action evidence sits upper-center to right.
- `no overlay`: balance for editorial reading, but retain the slot-family safe area so responsive cropping cannot remove proof.

## Series continuity

- One believable MORA workshop, one female maker, one camera/color family across mood frames.
- Landscape environment and portrait sticky frames are new compositions in the same world; Stage 2 references control space, maker, materials, scale, and film character only. Do not copy their framing.
- Product cards use the exact runtime UI field `theme.palette.background.default = #F5F1E8` and one strict-front geometry master.
- Ingredient cards use true 90-degree aerial and factual color; containers, portions, and ingredient scale remain culinary and physically plausible.
- Batch Record is a partial paper record with fixed printed fields plus only a small real-variable check zone. No direct-print-only glass, full-wrap pharmacy grid, decorative signature, invented batch values, or personalized city/date ritual.

## Fast acceptance gate

One production pass is preferred. Regenerate only when the image has the wrong ratio or camera axis, crops a locked subject, loses the reserved copy field, breaks product identity/scale, turns the workshop into a studio set, introduces unsafe food handling, or contradicts the Batch Record system. Minor styling variance is recorded and does not trigger a second aesthetic review.
