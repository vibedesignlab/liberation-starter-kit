---
name: build-brand-from-anatomy
description: Build a target-brand Stage 2 anatomy from an accepted source JSON and registered Storybook report. Deliver canonical JSON, two registered anchor images, and the fixed Storybook reader; never create an HTML report.
---

# Stage 2 — Build Extended Brand Anatomy

Create one coherent target brand and product direction from an accepted Stage 1 package, finalize it in Storybook, and stop for adjustment.

## Normative contract

- Read [the pipeline specification](../../../docs/brand-research-pipeline-spec.md), [the input contract](references/transfer-input-contract.md), [the tuning framework](references/tuning-framework.md), [the direction contract](references/transfer-direction-contract.md), and [the Storybook contract](../reconstruct-brand-system/references/storybook-report-contract.md).
- Require accepted Stage 1 JSON, `stage-review.json`, and its current Storybook registration.
- The Stage 2 JSON is canonical. Storybook is the only human-readable report surface.
- Never create an `outputs/*.html` report or brand-specific report markup.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Initialize

```bash
python3 scripts/init_transfer.py <stage-2-directory>
```

Required package artifacts:

- `transfer-input.json`
- `extended-brand-anatomy.md`
- `outputs/extended-brand-anatomy.json`
- `asset-registry.json`
- `assets/brand-mood/`
- `assets/product-hero/`
- `prompts/`
- `stage-review.json`

## Procedure

1. Load the accepted source JSON and its registered Storybook reader. Preserve source grammar, protected boundaries, design-system relationships, product language, and unresolved gaps.
2. Capture only missing target decisions. Ask sequentially and no more than three material questions. Lock target, audience, lineup, source distance, shared invariants, visual priority, and landing goal in `transfer-input.json` before drafting.
3. Write exactly the eight sections defined by the pipeline specification. Each section needs one `key_insight`. Every lineup product needs a distinct role, use case, form or interaction cues, allowed variation, landing message, and proof-image roles.
4. Keep verbal system, key visual, brand mood, product imagery, and product-native traits separate. Record every token direction as `keep`, `tune`, or `new` with source lineage.
5. Invoke `$commercial-photo-prompting`, then `$imagegen`, for exactly two anchor images: representative product hero and brand mood. Save both locally and register their prompt, lineage, invariants, allowed variation, and check status.
6. Generate the canonical JSON from the approved model and finalize from the starter-kit root:

```bash
pnpm finalize-brand-report -- <stage-2-directory>
```

Do not hand-edit `public/brand-reports` or generated stories.

## Delivery checkpoint

Deliver the Storybook story, canonical JSON, and two registered images. Ask one adjustment question covering brand direction, product family, and anchor images. Record `pending`, `revision_requested`, or `accepted` in `stage-review.json`. Do not start Stage 3 before acceptance. A routed acceptance re-finalizes the accepted review before advancing.
