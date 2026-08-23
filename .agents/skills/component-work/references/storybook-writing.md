# Storybook writing contract

Use this reference for changes under `src/stories` or to `*.stories.jsx`.

## Inspect the local convention first

Read the neighboring story and its imported component before editing. Preserve category naming, export style, layout parameters, and quote/format conventions unless the task requires a deliberate correction.

Current sidebar roots are:

| Content | Title prefix |
| --- | --- |
| Project introduction and rules | `Overview/` |
| Design tokens | `Style/` |
| MUI and reusable component demos | `Components/` |
| Registered Stage 1–3 reports | `Brand Reports/` |

Do not reintroduce removed `Custom Component`, `Template`, `Section`, or `Page` categories without an explicit information-architecture change.

## Component stories

- Point `component` at the real MUI or project component.
- Define useful `args` and type-appropriate `argTypes` for user-controllable props.
- Keep one primary playground and only a few comparison stories that communicate materially different behavior.
- Use existing MUI primitives for neutral demo layout. This repository has no shared `Placeholder` component; do not reference or recreate it as an incidental part of a story.
- Prefer relative imports for project components unless an existing configured alias is already used by neighboring stories.
- Keep demo content deterministic and avoid external image URLs unless remote loading is the behavior under test.

## Static documentation stories

- Use `DocumentTitle`, `PageContainer`, `SectionTitle`, and `TreeNode` from `src/components/storybookDocumentation` when their roles fit.
- For new static documents, prefer a first export named `Docs`; preserve a neighboring `Doc` convention during a narrow edit unless renaming is part of the task.
- Keep `DocumentTitle` metadata concise and in English; write explanatory body content in Korean unless the user requests another language.
- Use tables, dividers, and restrained `Box` layouts for information. Avoid decorative Paper/Card grids, gradients, elevation, and redundant surface styling.
- Reference actual theme values with `useTheme()` instead of duplicating token values when the document represents the live design system.

## Brand reports

- Use `Brand Reports/<brand>/<stage label>` for registered packages.
- Normalize canonical Stage JSON through `src/utils/brand-reports` and render it with `BrandReportDocument`.
- Keep data loading and static path resolution in `src/stories/brand-reports`; keep `src/components/brand-documentation` presentation-only.
- Never hand-edit `src/stories/brand-reports/generated/*.stories.jsx` or `public/brand-reports`. Use `pnpm finalize-brand-report -- <package>`; it validates, registers, and checks drift in one command.
- Preserve evidence IDs, source/credit/rights notes, asset provenance, and the review checkpoint. Rendering success is not user approval.

## Completion checks

- The title fits the existing sidebar hierarchy.
- Controls match the public props and defaults.
- Examples use current project components and resolvable paths.
- Static docs use existing documentation components and restrained styling.
- Generated report files remain generator-owned.
- Relevant lint or static checks pass. Browser automation remains opt-in.
