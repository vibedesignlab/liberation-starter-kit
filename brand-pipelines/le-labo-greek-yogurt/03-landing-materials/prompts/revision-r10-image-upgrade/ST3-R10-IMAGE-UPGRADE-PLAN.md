# Revision 10 — Native-detail image upgrade

## Outcome

Replace the active non-product and non-ingredient photographic assets with native GPT Image 2 outputs. The revision must remove the former `1536×1024 → 6144×4096` enlargement workflow, keep the current landing layout and scroll behavior, and preserve each image's current narrative and copy-safe role.

## Generation path

- Provider route: fal.ai `openai/gpt-image-2` using the project-local `FAL_KEY`.
- Model quality: `high` for every selected production frame.
- Master format: PNG.
- Stable native landscape: `2304×1536`.
- Hero native challenger: `3504×2336`.
- Stable native 1:2 portrait: `1344×2688`.
- Native 3:4 Core sticky: `1536×2048`.
- No post-generation enlargement is permitted.
- Generated output records must include the request ID, requested dimensions, returned dimensions, model route, quality, and prompt path.

## Series authority

Two clean references are created before the production fan-out:

1. Female-maker identity master: face, age, hair, skin response and workwear only; no object interaction and no scene-layout authority.
2. Lived-in manufactury master: real workshop volume, human scale, repaired architecture, stainless food-contact zones and motivated light only; no person and no shot-layout authority.

Old generated R5/R6/R9 images are narrative and layout evidence only. They are not skin, hand, hair, food-surface or material-quality references.

## Parallel waves

### Wave 1 — shared reference and layout contract

- Identity master generation.
- Environment master generation.
- Read-only audit of active UI slots, rendered aspect ratios, copy-safe regions and crop behavior.

Join condition: both master images pass native-size inspection and every active replacement slot has one declared output size and safe-area contract.

### Wave 2 — production groups

- Group A: hero, Why MORA maker, Material Method.
- Group B: Core portrait, Studio Trials portrait, SEE.
- Group C: READ, OPEN, TASTE, TABLE.

Every branch owns only its own prompt and asset directories. The root owns the shared public registry and the final landing integration.

## Responsive art direction

- Hero, Material Method, SEE, READ, OPEN, TASTE and TABLE require separate landscape and portrait masters. A single 3:2 source loses about 55.6% of its width when the current mobile `2:3` cover crop is applied.
- The Core sticky master is generated at its actual runtime ratio, `3:4`, instead of preserving the obsolete `1:2` source and discarding one third of its height.
- Why MORA remains one `3:2` master and Studio Trials remains one `1:2` master because their source and runtime ratios already agree.
- Responsive source selection is added inside the existing media components only. Section structure, grid, spacing and scroll interactions remain unchanged.

## Prompt repair lock

- One primary action per image.
- Use the literal `photorealistic` cue and describe observable natural skin, separate hair strands, believable contact pressure, distinct food/material responses and one coherent light source.
- Do not request film grain, scan softness, density variation, HDR clarity, fake distress, halation or surface wear as a global generation effect.
- Do not ask one pass to solve exact label text, two complex hand actions, many small props and a copy-safe composition simultaneously.
- A Batch Record may remain visually structured but unreadable in generation. Exact label typography belongs to a separate deterministic layer or later targeted edit.
- Preserve ordinary culinary scale and strict frontal/level camera behavior where the current role requires it.

## Native QA gate

Inspect native outputs without browser automation.

- Identity: natural asymmetric skin, non-repeating pores, separated hair strands, coherent facial anatomy.
- Hands: correct count and joints, believable grip, pressure, occlusion and contact shadows.
- Materials: plaster, cloth, steel, glass, yogurt and skin must not share one repeated procedural texture.
- Physics: one light direction, continuous shadows, plausible stainless reflections and glass refraction.
- Layout: required aspect, copy-safe field, subject occupancy and responsive crop safety.
- Reject any frame with wax skin, ribbon hair, fused fingers, floating utensils, oversized props, broadcast-studio staging or large artificial texture loops.

## Finish and delivery

- Add analog magazine grain only after a clean master passes, at final delivery size, as restrained monochrome luminance grain.
- Keep native PNG masters in the pipeline.
- Publish content-hashed WebP/JPEG derivatives without claiming extra optical detail.
- Update only the active asset paths in `src/data/mora/assets.js`; preserve component layout and scroll behavior.
- Validate with metadata checks, module-boundary checks, lint/build and a focused diff. Do not use Playwright or any browser automation.
