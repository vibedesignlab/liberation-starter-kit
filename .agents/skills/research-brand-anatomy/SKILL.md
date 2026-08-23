---
name: research-brand-anatomy
description: Research one existing reference brand as a time-boxed source-only Stage 1 package. Deliver canonical JSON and a fixed automatically registered Storybook report; do not create target-brand work or HTML reports.
---

# Stage 1 — Research Brand Anatomy

Produce one evidence-backed source-brand model, finalize it in Storybook, and stop for user review.

## Normative contract

- Before starting, read [the pipeline specification](../../../docs/brand-research-pipeline-spec.md), [the evidence model](references/evidence-and-layer-model.md), [the source schema](references/source-anatomy-schema.md), [the global system framework](references/global-brand-system-framework.md), [the report language rules](references/report-language-style.md), [the JSON contract](references/brand-model-json-contract.md), and [the Storybook report contract](../reconstruct-brand-system/references/storybook-report-contract.md).
- The JSON is canonical. Storybook is the only human-readable report surface.
- Never create or preserve an `outputs/*.html` report, brand-specific report CSS, or report screenshot.
- Record only `Observed` and `Inferred`; never add a target brand, transfer, fictional name, or target token.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Initialize and start the timer

```bash
python3 scripts/init_analysis.py <analysis-directory>
python3 scripts/research_timebox.py start <analysis-directory> --mode rapid --minutes 10
```

Required package artifacts:

- `research-run.json`
- `research-brief.yaml`
- `source-manifest.csv`
- `visual-corpus.csv`
- local evidence images and useful contact sheets
- `source-brand-anatomy.md`
- `grammar-kernel.md`
- `analysis-handoff.yaml`
- `analysis-status.yaml`
- `stage-review.json`
- `outputs/source-brand-analysis.json`

## Research depth

Use `rapid` unless the user explicitly requests a deeper study. Rapid mode preserves the complete report structure and changes only evidence volume.

| Mode | Structural evidence | Primary | Direct local visuals | Core claims | Grammar | Time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| rapid | 4+ | 3+ | 8+ | 8+ | 4–6 | 10 minutes maximum |
| expanded | 12+ | 8+ | 40–60 | 32+ | 5–8 | explicit user exception |

Expanded mode requires the user's explicit request in `expanded_depth_rationale` and does not claim the rapid SLA.

## Rapid procedure

### Minute 0–1 — Scope lock

Fill `research-brief.yaml`. Use the current global masterbrand when scope is clear. Ask at most one question only when entity, era, or portfolio scope would materially change the result.

### Minute 1–6 — Evidence

Lead with current first-party evidence. Capture four structural sources and eight representative local visuals across at least four applicable layers. Preserve source URL, capture date, credit, rights note, local path, and hash. Stop collecting when a rule is represented; repeated examples do not extend the run.

Register one official masterbrand logo and its verified identity-color field. Keep identity, key visual, brand mood, photography, product representation, and product-native language separate.

### Minute 6–8 — Anatomy and grammar

Use [the anatomy template](assets/source-brand-anatomy.md). Write the complete fixed report structure with concise sections, eight material claims, and four to six causal grammar rules. Every material claim needs evidence, confidence, an alternative, and scope or exception. Missing coverage becomes an explicit unresolved gap.

At minute 8 run:

```bash
python3 scripts/research_timebox.py check <analysis-directory>
```

Do not start new evidence searches after this checkpoint.

### Minute 8–10 — Export and finalize

Fill handoff metadata, export the canonical JSON, compute digests, complete the timer, then use the single finalization command from the starter-kit root:

```bash
python3 scripts/export_brand_model.py <analysis-directory>
python3 scripts/package_digests.py <analysis-directory> # copy the printed block into analysis-handoff.yaml
python3 scripts/research_timebox.py complete <analysis-directory> --reason coverage_complete
pnpm finalize-brand-report -- <analysis-directory>
```

`finalize-brand-report` runs Stage validation, enforces the exact React section contract, registers JSON/review/assets, generates the CSF story, and checks registration drift. Do not run a separate renderer or hand-edit generated Storybook files.

## Delivery checkpoint

Set `current_stage: SOURCE_REVIEW_REQUIRED`. Deliver the Storybook story path and canonical JSON, show the single adjustment prompt from `stage-review.json`, and stop. Record `accepted` or `revision_requested`; deterministic validation is not approval.

When the package is routed and the user responds, use the router's `advance_pipeline.py`. A revision remains in Stage 1. Acceptance re-registers the accepted review before Stage 2 begins.
