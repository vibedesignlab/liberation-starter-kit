---
name: build-landing-materials
description: Build Stage 3 landing copy and product-image materials from an accepted Stage 2 JSON and registered Storybook report. Deliver canonical JSON and the fixed Storybook reader; never create an HTML report or coded landing page.
---

# Stage 3 — Build Landing Materials

Create production-ready copy and registered product renders for a later landing-page task, finalize them in Storybook, and stop for adjustment.

## Normative contract

- Read [the pipeline specification](../../../docs/brand-research-pipeline-spec.md), [the landing-materials contract](references/landing-materials-contract.md), and [the Storybook contract](../reconstruct-brand-system/references/storybook-report-contract.md).
- Require accepted Stage 2 JSON, `asset-registry.json`, `stage-review.json`, and current Storybook registration.
- Preserve approved positioning, lineup, product form, key visual, brand mood, and token direction.
- The Stage 3 JSON is canonical. Storybook is the only human-readable report surface.
- Never create an `outputs/*.html` report, coded page, or component system.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Initialize

```bash
python3 scripts/init_landing.py <stage-3-directory>
```

Required package artifacts:

- `landing-input.json`
- `landing-materials.md`
- `outputs/landing-materials.json`
- `asset-registry.json`
- `assets/product-renders/`
- `prompts/`
- `stage-review.json`

## Procedure

1. Confirm the accepted Stage 2 lineup and two anchor assets. Lock a compact shot plan before copy or image work.
2. Write the approved message hierarchy: brand message, values, family USP, and product USP. Use the selected narrative route; do not merge rejected routes or invent performance claims.
3. Produce exactly the six fixed report sections defined by the pipeline specification. Boundaries render inside `product-assets-and-map`, not as a seventh section. Every section needs one `key_insight`.
4. Invoke `$commercial-photo-prompting` in Series mode, then `$imagegen`. Generate at least one registered render per lineup product and only additional shots mapped to a landing section. Preserve Stage 2 invariants and provenance.
5. Map each landing section to communication job, copy, proof, registered asset, and CTA.
6. Finalize from the starter-kit root:

```bash
pnpm finalize-brand-report -- <stage-3-directory>
```

Do not hand-edit `public/brand-reports` or generated stories.

## Delivery checkpoint

Deliver the Storybook story, canonical JSON, and registered renders. Ask one adjustment question covering copy hierarchy, story, lineup clarity, and image consistency. Record `pending`, `revision_requested`, or `accepted`. A routed acceptance re-finalizes the accepted review before completing the pipeline.
