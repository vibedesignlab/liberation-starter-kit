---
name: reconstruct-brand-system
description: "Route one brand-reconstruction project through three reviewed Storybook+JSON stages while parallelizing safe work inside the active stage: source-brand research, extended target-brand anatomy with two anchor images, then landing UX copy and product-render materials."
---

# Three-Stage Brand Reconstruction Router

Use exactly one stage at a time. Never combine source research, target-brand invention, and final landing-material production in one run. Parallel work is allowed only inside the active stage. Read [references/chaining-contract.md](references/chaining-contract.md), [references/parallel-execution-contract.md](references/parallel-execution-contract.md), and [references/storybook-report-contract.md](references/storybook-report-contract.md) before starting a multi-stage pipeline.

## Initialize the chain

For a full pipeline, create one shared state file and three package locations before invoking Stage 1:

```bash
python3 scripts/init_pipeline.py <pipeline-directory> \
  [--stage-1-package <source-package>] \
  [--stage-2-package <extended-package>] \
  [--stage-3-package <landing-package>]
```

Then immediately read and use the `CURRENT_SKILL` printed by the script. The state file is routing metadata only; the stage packages remain the source of truth for content.

For a full single-brand chain, use the initialized `parallel_single_brand` execution mode. The root coordinator remains the only canonical writer and uses up to three bounded workers for the safe fan-out points in the parallel execution contract. If workers are unavailable, record one serial fallback reason and continue; do not simulate parallel work or create extra agents for fast mechanical commands.

If the user asks for one stage only, do not initialize the chain. Run that skill standalone and stop at its checkpoint.

## Stage 1 — Source brand anatomy

Use `$research-brand-anatomy`.

Deliver:

- evidence-backed source Storybook document and canonical JSON;
- source grammar, key visual, brand mood, photography, product-native language, and global color/type/spacing/layout relationships;
- `stage-review.json`.

After scope lock, fan out the three source-research lanes from the parallel contract when worker slots are available. Merge evidence before the coordinator writes final claims, grammar, JSON, compatibility HTML, or the Storybook registration.

Stop at `SOURCE_REVIEW_REQUIRED`. Continue only after the user records no remaining adjustments and review status becomes `accepted`.

## Stage 2 — Extended target-brand anatomy and product detail

Use `$build-brand-from-anatomy` with the accepted Stage 1 package.

Deliver:

- eight-section extended-brand anatomy Storybook document and canonical JSON;
- target positioning, explicit product family and lineup, product-by-product differences and detailed form cues;
- verbal system, key visual, brand mood, product-native visual language, and landing-page design-token direction;
- one representative-product hero image and one brand-mood image generated through `$commercial-photo-prompting` and registered with local file and prompt provenance;
- `stage-review.json`.

After one direction lock, parallelize bounded verbal, product, and visual drafts when useful. Generate the two independent anchor images concurrently by default while the coordinator prepares the report model and registry shell.

Stop before landing copy and the complete image set. Continue only after Stage 2 review status is `accepted`.

## Stage 3 — Landing materials

Use `$build-landing-materials` with the accepted Stage 2 package.

Deliver:

- UX copy hierarchy;
- brand value and brand story;
- product-family introduction and copy for every lineup product;
- product renders covering every lineup product and only the additional proof shots used by the landing outline;
- landing-section copy/image/CTA mapping;
- paired Storybook document and canonical JSON plus registered local image and prompt files;
- `stage-review.json`.

Lock the product-by-product shot plan first. Then run landing copy and product-render groups concurrently; the coordinator merges them into the canonical report after the image barrier.

Stop before coding or designing the final page. Use the final checkpoint to adjust copy, lineup clarity, and product renders.

For all three stages, keep deterministic HTML only as a migration-compatibility artifact until the removal gates in the Storybook report contract are complete. Do not hand-edit it or treat it as a second report source.

For all three Storybook readers, follow the report presentation rules in the shared contract: every section exposes one material `insight` sentence, evidence images retain their intrinsic ratio, report text always wraps, and visible link labels stay concise while preserving the full destination URL.

## Review and automatic transition

Every checkpoint is a short user adjustment check, not a scored audit. Ask only what should be changed in the material just delivered. Use `pending`, `revision_requested`, or `accepted`; never advance while revisions remain.

Do not run a fixed `v1`–`v5` or other automatic iteration count. Repeat a stage only for a named user correction or a failed deterministic contract, and stop repeating when that item is resolved.

When the user clearly approves the current stage, record the exact response or a faithful short summary and run:

```bash
python3 scripts/advance_pipeline.py <pipeline-directory-or-state> \
  --decision accepted \
  --feedback "<user response>"
```

The script validates the current package before accepting it. If it prints `CHAIN_ACTION=CALL_SKILL`, immediately read and execute `NEXT_SKILL` with `INPUT_PACKAGE`, `NEXT_PACKAGE`, and `PIPELINE_STATE`; do not ask the user to invoke the next skill and do not repeat answered intake.

When the user requests changes, run the same command with `--decision revision_requested`, revise the current stage, validate it again, and present the same short checkpoint. `PASS` alone never substitutes for user approval.

After Stage 3 acceptance the script prints `CHAIN_ACTION=COMPLETE`. Stop there; landing-page design and coding are separate work.

Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.
