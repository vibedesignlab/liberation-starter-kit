---
name: project-planning
description: "Create structured project planning documents in three approval-gated phases: project summary, UX flow, and visual direction, then apply only explicitly approved design-token changes immediately after visual-direction approval. Use only when the user explicitly invokes `$project-planning` or directly asks to run this named planning workflow. Do not activate for ordinary implementation plans, status updates, or broad UI conversion."
---

# Project Planning

Create durable planning documents under `docs/<project-name>/` and stop for user approval between phases. After Phase 3 approval, apply only the approved design-token rows; do not continue into a general visual or component conversion.

## Boundary

- This skill is explicit-only. Do not infer it from a generic request to plan coding work.
- Produce planning documents and the bounded post-approval token patch. Phase 3 approval does not authorize component restyling, page implementation, content or asset changes, broad visual conversion, commits, deployments, or external coordination.
- Preserve existing documents and user decisions. Do not overwrite an accepted phase without a revision request.
- Use only references the user supplies. Do not invent URLs, screenshots, research findings, or visual references.
- Never use browser automation unless the user explicitly requests it.

## Read before working

1. Read repository instructions and inspect any existing `docs/<project-name>/` files.
2. Read the relevant section of [references/doc-templates.md](references/doc-templates.md) at the start of each phase.
3. For Phase 2, inspect the actual component inventory and read the Codex component references at [../component-work/references/taxonomy-index.md](../component-work/references/taxonomy-index.md) when category mapping is needed.
4. For Phase 3, read [../component-work/references/mui-theme.md](../component-work/references/mui-theme.md) and inspect the live theme at `src/styles/themes/default.js`.
5. Before presenting Phase 3 for approval, read [references/token-application-contract.md](references/token-application-contract.md).

## Phase 1 — Project summary

Obtain only the missing decisions needed to define purpose, target users, scope, core capabilities, constraints, and success criteria. Write:

`docs/<project-name>/01-project-summary.md`

Prefer structured bullets and tables. Present the completed phase and wait for explicit approval or revision before Phase 2.

## Phase 2 — UX flow

Start only after Phase 1 is approved, unless the user explicitly requests only this phase and an adequate project summary already exists.

Read the accepted summary, inspect actual reusable components, and write:

`docs/<project-name>/02-ux-flow.md`

Include the essential user scenarios, a Mermaid flow, information architecture, the frontend-facing data model, and a component plan distinguishing reuse, modification, and creation. Present the phase and wait for approval before Phase 3.

## Phase 3 — Visual direction

Start after Phase 2 approval. The user may explicitly request this phase after Phase 1 when a UX flow is not needed.

Read the accepted summary, current MUI tokens, and user-provided references. Write:

`docs/<project-name>/03-visual-direction.md`

Describe tone, color, typography, spacing, layout, and the exact theme-token changes or intentional keeps. Do not present speculative token values as current project values. In the token table, classify every row as `apply`, `keep`, or `defer`, and name the target theme file and activation scope. Only `apply` rows may change code after approval.

Before asking for approval, state plainly that approval will immediately apply the listed `apply` token rows and nothing else. Present the exact token diff, excluded conversion scope, and stop for approval.

## After Phase 3 approval — Apply approved tokens

When the user explicitly approves the visual direction, continue immediately under the token-application contract. Do not ask for a second generic implementation confirmation when the approval prompt already disclosed this effect.

Apply only exact `apply` rows to the named theme source plus the minimum export or provider selection needed to activate that theme in the approved scope. Leave `keep` and `defer` rows unchanged. Do not edit components, page markup, layouts, copy, content data, images, or unrelated styles. If a token value, target file, activation scope, dependency, or dirty-worktree overlap remains unresolved, stop and request only that blocking decision rather than widening the implementation.

Record the applied files and per-token result in `03-visual-direction.md`, run static validation and lint, then stop. Any UI conversion beyond the token layer requires a separate user request.

## Direct phase requests

- If the user requests a later phase and its required prior document exists and is accepted, continue from that artifact.
- If the required context is missing, ask for the smallest blocking input or offer to create the prerequisite phase.
- Do not manufacture a full three-phase package when the user requested only one valid phase.

## Validate and report

- Confirm the document path, phase identity, required sections, and consistency with accepted prior phases.
- Check Mermaid syntax and repository-relative links statically; do not open a browser.
- Review the diff so unrelated docs and implementation files remain untouched.
- After Phase 3 approval, confirm that the implementation diff contains only approved token values and their declared theme/export/provider activation path. Confirm that no component, page, content, or asset conversion entered the diff.
- Report the created or revised document and the exact approval decision needed next.
