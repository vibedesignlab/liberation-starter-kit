---
name: reconstruct-brand-system
description: Route one brand project through three reviewed JSON-and-Storybook stages with fixed React reports, automatic registration, and no HTML reports.
---

# Three-Stage Brand Reconstruction Router

Use [the normative pipeline specification](../../../docs/brand-research-pipeline-spec.md) and the complete platform-neutral router contract in [the Codex router](../../../.agents/skills/reconstruct-brand-system/SKILL.md).

Claude and Codex share the same pipeline state, validators, finalizer, fixed React report structures, and Storybook registry. Run the router scripts under `.agents/skills/reconstruct-brand-system/scripts/`.

Hard requirements:

- run only one Stage at a time;
- require `pnpm finalize-brand-report -- <package>` before every checkpoint;
- re-finalize the accepted review record before advancing;
- never create, validate, route, or preserve an HTML report;
- deterministic validation does not equal user approval.
