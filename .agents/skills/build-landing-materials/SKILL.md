---
name: build-landing-materials
description: "Stage 3 of the brand pipeline. Turn an accepted extended-brand anatomy into a modular Storybook+JSON landing-material report: UX copy hierarchy, brand value, brand story, product introduction, explicit product-lineup copy, and registered product-image renders. Use commercial-photo-prompting to preserve the approved product and image system, then stop for user adjustment. Keep deterministic HTML only as a migration-compatibility artifact; do not build or code the final landing page."
---

# Stage 3 — Build Landing Materials

Create the copy and product-render package that a later landing-page design or coding task will consume.

## Boundary

- Require an accepted Stage 2 `outputs/extended-brand-anatomy.json`, registered Storybook report, `asset-registry.json`, and `stage-review.json`. During the compatibility phase also verify the Stage 2 HTML.
- Preserve the approved positioning, product lineup, product form, key visual, brand mood, and design-token direction. Do not reopen brand strategy unless the user requests a revision.
- Deliver landing materials, not a coded page, component system, full UX specification, or new brand manual.
- When `stage-review.json.pipeline_state_path` is non-empty, follow the router chaining contract after the user's explicit checkpoint response. Validation success alone is not approval.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Read before working

1. Read [references/landing-materials-contract.md](references/landing-materials-contract.md).
2. Before loading or registering report readers, read the router's [Storybook report contract](../reconstruct-brand-system/references/storybook-report-contract.md).
3. Invoke `$commercial-photo-prompting` before planning or compiling product-render prompts. Read its Codex image profile before using the image tool.
4. Use `$imagegen` in built-in default mode for the actual bitmap generation and save selected project assets under `assets/product-renders/`.
5. In a routed full pipeline, read and follow the router's [parallel execution contract](../reconstruct-brand-system/references/parallel-execution-contract.md). The root coordinator is the only writer of canonical Stage 3 files.

## Initialize

```bash
python3 scripts/init_landing.py <stage-3-directory>
```

Canonical artifacts:

- `landing-input.json`
- `landing-materials.md`
- `outputs/landing-materials.html`
- `outputs/landing-materials.json`
- `asset-registry.json`
- `assets/product-renders/`
- `prompts/`
- `stage-review.json`

The JSON is canonical. The registered `Brand Reports/<brand>/Stage 3 — Landing Materials` story is the primary reader. Keep the HTML only while the compatibility gates in the Storybook report contract remain open.

## Workflow

### C0 — Load the accepted Stage 2 package

Confirm Stage 2 review status is `accepted`, both anchor assets exist, and the product lineup is explicit. Use the representative-product image as the geometry and material reference and the brand-mood image as the world and color reference.

Use the Stage 2 landing goal and selected narrative route when present. If the landing goal is still materially blank, ask one sequential CLI-style question with the current understanding and a recommended default; do not reopen the full intake or ask several questions together.

### C1 — Build the landing narrative and UX copy

Before copy or render fan-out, write a compact shot plan from the accepted Stage 2 model. For every product lock the product USP, communication job, protected invariants, one allowed variation, asset ID, and landing section. This is a planning barrier, not another user question.

Write production-ready copy in the approved language. Carry the approved hierarchy through the page: brand message → brand values → family USP → product USP. Use the selected Stage 2 narrative route as the organizing story rather than silently combining every route.

Include:

- landing hero message and support;
- brand value;
- brand story;
- product-family introduction;
- product-lineup copy for every approved product;
- feature, proof, caption, CTA, and concise state copy needed by the landing outline.

Do not write generic filler or invent unverified product performance. Keep the product lineup names and differences consistent with Stage 2.

In routed parallel mode, landing copy and section mapping may proceed concurrently with image-prompt compilation and generation after the shot-plan barrier. Copy workers write a structured shard under `.work/`; they do not edit the canonical model.

### C2 — Render the product-image set

Use `$commercial-photo-prompting` in Series mode. Freeze the Stage 2 product silhouette, construction, proportions, materials, color placement, light behavior, capture family, retouching level, and avoid conditions.

Generate at least one registered product render for every lineup product. Add only the detail, use, state, or family render actually assigned to a landing section. Change one variation axis at a time and keep every prompt self-contained. Save prompt specifications under `prompts/`, images under `assets/product-renders/`, and provenance under `asset-registry.json`.

For a 3–5 product lineup, split products across at most two image workers and submit independent renders concurrently. Each worker owns unique prompt and asset paths. For one or two products, use only the number of workers that removes a real wait. While images run, the coordinator prepares the canonical JSON and report shell.

For each registered render, record its communication job, Stage 2 reference lineage, the one allowed variation, and an `invariant_check`. Mark the check `pass` only when the product-family invariants remain visible, the frame changes no more than the allowed axis, and the image introduces no unapproved text or claim.

### C3 — Map materials to the landing outline

For every landing section, pair:

- communication job;
- headline and support copy;
- `proof_of`: the product, value, or claim the section makes visible;
- registered image asset ID;
- CTA or next reading action.

The output is a material map, not page code.

### C4 — Deliver and stop for user adjustment

Deliver the paired Storybook document and JSON, and render every registered product image in Storybook. The compatibility HTML mirrors the same content while its gates remain open. End with one plain adjustment prompt covering copy hierarchy, story, lineup clarity, and product-image consistency. Record `pending`, `accepted`, or `revision_requested` in `stage-review.json`.

Treat `outputs/landing-materials.json` as the canonical Stage 3 content model. After every required product image is registered, generate Markdown and HTML deterministically:

```bash
python3 scripts/render_landing_report.py <stage-3-directory>
pnpm register-brand-report -- <stage-3-directory>
pnpm register-brand-report -- <stage-3-directory> --check
```

Run the `pnpm` commands from the Liberation Starter Kit repository root. Re-register after any material model, review, provenance, or image change.

If `pipeline_state_path` is registered, record the user's checkpoint decision through the router's `advance_pipeline.py`. A revision request stays in this skill. Acceptance produces `CHAIN_ACTION=COMPLETE`; stop without starting page design or coding.

## Validation

```bash
python3 scripts/validate_landing.py <stage-3-directory>
```

Validation checks accepted Stage 2 lineage, copy completeness, lineup parity, local image and prompt registration, compatibility HTML visibility, and review structure. The registration check separately verifies the primary Storybook reader package and generated story. Neither scores taste.
