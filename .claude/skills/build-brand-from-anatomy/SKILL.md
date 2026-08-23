---
name: build-brand-from-anatomy
description: Build a target-brand Stage 2 anatomy from accepted source JSON and its registered Storybook report, then finalize the fixed eight-section React report.
---

# Stage 2 — Build Extended Brand Anatomy

Use [the normative pipeline specification](../../../docs/brand-research-pipeline-spec.md) and the complete platform-neutral workflow in [the Codex Stage 2 contract](../../../.agents/skills/build-brand-from-anatomy/SKILL.md).

Claude and Codex share the same canonical package, validators, finalizer, React report structure, and Storybook registry. Run the scripts under `.agents/skills/build-brand-from-anatomy/scripts/`.

Hard requirements:

- require accepted Stage 1 JSON and current Storybook registration;
- produce exactly eight fixed React sections and two registered anchor images;
- canonical output is `outputs/extended-brand-anatomy.json`, `asset-registry.json`, and `stage-review.json`;
- final delivery runs `pnpm finalize-brand-report -- <package>`;
- no HTML report or brand-specific report markup is created;
- stop for user review before Stage 3.
