# MORA Product Composition Template

## Communication job

One matched product portrait must let a customer compare the six recipes without relearning the camera or object layout. The product changes; the stage does not.

## Prompt assembly order

Use the following order unchanged for every image model:

1. **Subject** — `[EXACT_RECIPE_NAME]` Greek yogurt in the locked MORA premium glass jar, with `[RECIPE_TRACE]` visible through the wall and on the surface.
2. **Web role** — square collection-grid/PDP primary product portrait, immediately legible at card size.
3. **Camera** — 0° front azimuth, 12° downward elevation, 85 mm full-frame equivalent, vertical sensor plane, same focus plane as the golden master.
4. **Composition** — jar bbox x 35–65%, y 18–80%; jar center x 50%, y 49%; baseline y 80%; detached closure or full-perimeter foil center x 19%, y 75%; spoon center x 80%, y 74%; individual ingredient cue center x 82%, y 64%. Preserve generous negative space.
5. **Lighting** — one large soft upper-left 4500 K key, controlled frontal fill, two black edge flags, soft contact shadow down-right.
6. **Surface/background** — plain seamless matte Cultured Cream `#F5F1E8`, background and ground visually continuous.
7. **Atmosphere** — quiet, exact, premium food atelier discipline; no room narrative.
8. **Grade** — neutral-warm commercial grade, whites preserved, ingredient color is the only SKU color.
9. **Texture** — physically plausible clear glass; dense strained-yogurt spoon cut; honest recipe-specific traces.
10. **Output** — 1536 × 1536, one complete silhouette, no crop, web-ready subject separation.
11. **Continuity** — use `ST3-REF-GLASS-PACKAGE-MASTER-17` for geometry/material and `ST3-REF-PRODUCT-COMPOSITION-MASTER-18` for all coordinates; use only the matching individual ingredient reference for recipe identity.
12. **Negative constraints** — append the full negatives from `GLASS-PACKAGE-SERIES-LOCK.md`.

## Variable block

```text
[EXACT_RECIPE_NAME]: THYME HONEY | FIG LEAF | ROASTED BUCKWHEAT | CITRUS PEEL | BLACK SESAME | OLIVE OIL & SEA SALT
[RECIPE_TRACE]: one short factual description of visible food behavior
[INGREDIENT_REFERENCE_ID]: exactly one of ST3-REF-INGREDIENT-…-19 through -24
[DIRECT_PRINT_LINE]: MORA + exact recipe name only
```

## Frozen coordinate contract

| Object | Center / bounds | Tolerance |
|---|---:|---:|
| Jar | center 50%,49%; bbox 35–65%,18–80% | center ±2%; size ±3% |
| Baseline | y 80% | ±2% |
| Closure or foil | center 19%,75% | ±2% |
| Spoon | center 80%,74% | ±2% |
| Ingredient cue | center 82%,64% | ±2%; size ±3% |
| Background | `#F5F1E8` | median ΔE00 ≤ 5 outside shadows |

Do not compensate for a tall or short generated jar by moving another object. The failed object alone is corrected in a delta pass.
