---
name: build-brand-from-anatomy
description: Stage 2 of the brand pipeline. Turn an accepted source-brand Storybook+JSON anatomy and a short user brief into an extended target-brand anatomy with explicit product family and lineup, product detail, verbal and visual systems, key visual, brand mood, product-native visual language, landing-page design tokens, one generated representative-product image, and one generated brand-mood image. Keep deterministic HTML only as a migration-compatibility artifact. Stop for user adjustment before landing-material production.
---

# Stage 2 — Build Extended Brand Anatomy

Create one coherent target-brand and product direction from an accepted Stage 1 source analysis. Deliver the second anatomy, generate two anchor images, register them, and stop for user adjustment.

## Boundary

- Require `outputs/source-brand-analysis.json`, its registered Storybook report, and an accepted Stage 1 `stage-review.json`. During the compatibility phase also verify `outputs/source-brand-analysis.html`. For a legacy source package without the review file, obtain one explicit source-analysis acceptance and record it before continuing.
- This stage defines the target brand, product family, product lineup, product form, imagery systems, and landing-page token direction. It is not a full PRD, component system, production landing page, or complete image set.
- Do not rebuild or score the source analysis.
- When `stage-review.json.pipeline_state_path` is non-empty, follow the router chaining contract after the user's explicit checkpoint response. Validation success alone is not approval.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Read before working

1. Read [references/transfer-input-contract.md](references/transfer-input-contract.md) before intake.
2. Read [references/tuning-framework.md](references/tuning-framework.md) before synthesis.
3. Read [references/transfer-direction-contract.md](references/transfer-direction-contract.md) before delivery.
4. Before loading or registering report readers, read the router's [Storybook report contract](../reconstruct-brand-system/references/storybook-report-contract.md).
5. Before image planning or generation, invoke `$commercial-photo-prompting`, read its `SKILL.md`, inspect only the relevant taxonomy sections, and read its Codex image profile when using the image tool.
6. Use `$imagegen` for the actual bitmap generation after the commercial-photo prompt is compiled. Save selected project assets into the Stage 2 workspace; do not leave them only in the default generated-image location.
7. In a routed full pipeline, read and follow the router's [parallel execution contract](../reconstruct-brand-system/references/parallel-execution-contract.md). The root coordinator is the only writer of canonical Stage 2 files.

## Initialize

```bash
python3 scripts/init_transfer.py <stage-2-directory>
```

Canonical artifacts:

- `transfer-input.json`
- `extended-brand-anatomy.md`
- `outputs/extended-brand-anatomy.html`
- `outputs/extended-brand-anatomy.json`
- `asset-registry.json`
- `assets/brand-mood/`
- `assets/product-hero/`
- `prompts/`
- `stage-review.json`

The JSON is canonical. The registered `Brand Reports/<brand>/Stage 2 — Extended Brand Anatomy` story is the primary reader. Keep the HTML only while the compatibility gates in the Storybook report contract remain open.

## Workflow

### B0 — Load the accepted source

Use the source JSON for explicit grammar, design-system relationships, product language, protected boundaries, and gaps. Use its Storybook document for narrative and visual context; use source HTML only as a compatibility fallback. Confirm the artifact identity and accepted review only; do not run a new source audit.

### B1 — Capture target direction once

First restate the direction already understood from the user's request and the accepted source package. Then ask only for a missing choice that would change positioning, lineup, product form or cognitive structure, imagery, token relationships, or the landing goal.

Ask sequentially: one short question, wait for the answer, then decide whether another question is still necessary. Ask no more than three questions, plus at most one follow-up for a material contradiction. When a structured input UI is available, use one question per call. In a plain CLI, use the sequential format in the transfer-input contract with a recommended default and a free-form answer path. Never display the whole questionnaire at once.

Preserve every product named by the user as lineup scope. When scope is open, choose one explicit lineup mode from the brief: `single_product`, `focused_family` (2–3 distinct products), or `exploratory_family` (3–5 distinct products). Prefer the exploratory mode for an educational concept when the persona needs breadth, but never pad a line with cosmetic variants. Translate plain-language answers into `keep`, `tune`, or `new` internally; do not require the user to know those terms. Record the consolidated direction, answers, and harmless assumptions in `transfer-input.json`; do not ask a second intake at the end.

Before any fan-out, lock the target, audience, lineup, source distance, three to five shared invariants, accent behavior, visual priority, and landing goal in `transfer-input.json`. This is the Stage 2 direction lock. Do not let workers independently redefine it.

### B2 — Build the extended target-brand anatomy

In routed parallel mode, the coordinator may request three bounded shards after the direction lock: verbal/narrative, product/lineup/form, and visual/key-visual/token direction. Workers write under `.work/` and do not edit the canonical JSON, Markdown, HTML, registry, or review file. The coordinator resolves the shards into one coherent model before image prompts are compiled. For a single product or a very small direction, skip conceptual fan-out when merge overhead would exceed the work and record that harmless choice as a job note rather than a failure.

Write exactly eight numbered sections:

1. source-grammar application;
2. target-brand positioning;
3. product family, explicit product lineup, and landing-focused product detail;
4. verbal branding and copy hierarchy;
5. visual branding and key visual;
6. brand mood and brand-image system;
7. product-native visual traits and product-image system;
8. landing-page design-token direction.

The product section stays concise but must be concrete. Record a directional family name and every product in scope. Define three to five shared product-family invariants, relevant visual or cognitive invariants, and the differentiation logic. Each lineup item needs a working product name, type, lineup role, use case, difference, detailed physical/digital/hybrid form cues, one allowed variation, landing message, and proof-image roles. Do not reduce several products to an unnamed variant. Products in a family must differ by role, use situation, interaction, or behavior—not only size, color, or finish.

Build the verbal system in this order: brand message, two or three brand values, family USP, and product-level USP for every lineup item. When the source grammar and target brief support genuinely different approaches, provide two or three concise narrative routes—human transformation, product system, and brand world are useful route types—and select one for Stage 3. Do not manufacture nominal alternatives that say the same thing.

Keep key visual, brand image, product image, and product-native visual traits separate. Give each visual layer one communication job; let the image series complete the larger promise. Add an explicit verbal-to-visual map: brand message to key visual, values to brand mood, and family/product USP to product imagery. Tokens stop at color, typography, spacing, layout, shape/border/radius, and relevant motion. Every token states `keep`, `tune`, or `new` and its source relationship. If Stage 1 verifies a strong masterbrand identity color, translate it into a bounded point accent in the educational draft unless the brief rejects it; never substitute interaction, status, campaign, product, or photographic color for identity color, and never force the accent to dominate the page.

### B3 — Generate and register two anchor images

Use `$commercial-photo-prompting` as the technical image-planning and prompt-compilation layer. Use the approved Stage 2 anatomy as the brand contract; the photo skill must not invent strategy.

Generate exactly two anchor assets at this stage:

1. one representative-product hero image for the lead lineup product;
2. one brand-mood image showing the target world, people or environment.

Submit these two generations concurrently by default. Serialize only when the brand-mood image must use the completed representative-product image as a direct geometry reference; record that dependency as the serial fallback reason. While image generation runs, prepare the canonical JSON, prompt and registry shells, and report structure.

For each asset:

- write a self-contained prompt specification under `prompts/`;
- protect product silhouette, proportions, materials, color placement, key-visual relationship, and brand-mood constraints;
- generate the image with `$imagegen` in its built-in default mode;
- save it under the matching `assets/` folder;
- register ID, role, communication job, file path, prompt path, product or scene, aspect ratio, generation provenance, reference lineage, invariants, one allowed variation, invariant check, and status in `asset-registry.json`;
- show the actual registered image in the Stage 2 Storybook document and compatibility HTML. Do not substitute a contact sheet or report screenshot.

These two images lock the visual baseline; they are not the final landing image set.

### B4 — Deliver and stop for user adjustment

Deliver the paired Storybook document and JSON plus the registered images. The Storybook document must render the explicit product lineup and both anchor images. The compatibility HTML mirrors the same content while its gates remain open. End with one plain-language adjustment prompt: ask what should change in the brand direction, product family or two anchor images, and state that an answer of `없음`, `승인`, or equivalent advances the pipeline.

Treat `outputs/extended-brand-anatomy.json` as the canonical Stage 2 content model. After both images are registered, generate Markdown and HTML deterministically instead of hand-assembling three versions:

```bash
python3 scripts/render_extended_report.py <stage-2-directory>
pnpm register-brand-report -- <stage-2-directory>
pnpm register-brand-report -- <stage-2-directory> --check
```

Run the `pnpm` commands from the Liberation Starter Kit repository root. Re-register after any material model, review, provenance, or image change.

Record `pending`, `accepted`, or `revision_requested` in `stage-review.json`. This is not a scored audit. Do not start Stage 3 until the status is `accepted`.

If `pipeline_state_path` is registered and the user approves, run the router's `advance_pipeline.py` with the user's decision and feedback. On `CHAIN_ACTION=CALL_SKILL`, immediately read and execute `$build-landing-materials` using the printed Stage 2 and Stage 3 package paths. On a revision request, remain in this skill.

## Validation

```bash
python3 scripts/validate_extended.py <stage-2-directory> all
```

Validation checks artifact structure, explicit lineup, compatibility HTML visibility, two registered local images, prompt records, token relationships, and the review checkpoint. The registration check separately verifies the primary Storybook reader package and generated story. Neither judges taste or persuasion.
