---
name: research-brand-anatomy
description: Research one existing brand as a ten-minute source-only Stage 1 package with canonical JSON and a fixed automatically registered Storybook report.
---

# Stage 1 — Research Brand Anatomy

Use [the normative pipeline specification](../../../docs/brand-research-pipeline-spec.md) and the complete platform-neutral workflow in [the Codex Stage 1 contract](../../../.agents/skills/research-brand-anatomy/SKILL.md).

Claude and Codex share the same canonical package, timer, validators, finalizer, React report structure, and Storybook registry. Run the scripts under `.agents/skills/research-brand-anatomy/scripts/`; do not use legacy platform-specific renderers.

Hard requirements:

- rapid mode preserves all 18 fixed React sections and stops within ten minutes;
- canonical output is `outputs/source-brand-analysis.json` plus `stage-review.json` and local evidence;
- final delivery runs `pnpm finalize-brand-report -- <package>` from the starter-kit root;
- no HTML report or brand-specific report markup is created;
- stop for user review before any target-brand work.
