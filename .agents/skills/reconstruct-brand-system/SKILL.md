---
name: reconstruct-brand-system
description: "Route one brand project through three reviewed JSON-and-Storybook stages: time-boxed source research, extended target-brand anatomy, and landing materials. Enforce fixed React reports, automatic registration, and no HTML reports."
---

# Three-Stage Brand Reconstruction Router

Read [the pipeline specification](../../../docs/brand-research-pipeline-spec.md), [the chaining contract](references/chaining-contract.md), [the parallel execution contract](references/parallel-execution-contract.md), and [the Storybook report contract](references/storybook-report-contract.md) before starting a full pipeline.

## Pipeline rules

- Use exactly one Stage at a time.
- Stage JSON is canonical; Storybook is the only report reader.
- Every Stage must pass `pnpm finalize-brand-report -- <package>` before delivery.
- Never create, validate, route, or preserve an HTML report.
- Validation success never substitutes for user approval.
- The root coordinator is the only canonical writer in routed parallel mode.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Initialize

```bash
python3 scripts/init_pipeline.py <pipeline-directory> \
  [--stage-1-package <source-package>] \
  [--stage-2-package <extended-package>] \
  [--stage-3-package <landing-package>]
```

Use the printed `CURRENT_SKILL`. For a standalone Stage, do not initialize the chain.

## Stage sequence

1. `$research-brand-anatomy`: ten-minute rapid source research, fixed 18-section Storybook report, canonical JSON, and review checkpoint.
2. `$build-brand-from-anatomy`: fixed eight-section target anatomy, explicit product family and lineup, two registered anchor images, canonical JSON, and review checkpoint.
3. `$build-landing-materials`: fixed six-section landing materials, lineup copy and registered renders, canonical JSON, and review checkpoint.

## Review and transition

At each checkpoint ask only what should change in the current Stage. Use `pending`, `revision_requested`, or `accepted`.

On a user decision run:

```bash
python3 scripts/advance_pipeline.py <pipeline-directory-or-state> \
  --decision accepted \
  --feedback "<user response>"
```

`advance_pipeline.py` does not rerun the Stage validator. It checks the existing registration receipt and Storybook drift, updates the review record, re-registers the accepted checkpoint with the locked report ID, and advances only when that lightweight registration succeeds. A revision remains in the current Stage and receives one fresh full finalization after its canonical data changes. Stage 3 acceptance prints `CHAIN_ACTION=COMPLETE` and stops before page design or coding.
