---
name: component-work
description: Create, modify, delete, refactor, or document React UI components and Storybook stories in the Liberation Starter Kit. Use whenever work touches `src/components`, `src/stories`, or `*.stories.jsx`, including component reuse, MUI `sx` styling, interaction behavior, Storybook controls, and component documentation. Do not use for report data or planning changes that leave component and story files untouched.
---

# Component Work

Keep the project's React, MUI, and Storybook layers synchronized without rebuilding the removed custom component library.

## Boundary

- Invoke this skill before changing files under `src/components` or any Storybook story.
- Prefer an existing MUI component or project component before creating a wrapper or new abstraction.
- Keep reusable components presentation-focused. Data loading, package registration, and application orchestration stay outside `src/components`.
- Use MUI components and the `sx` prop for styling. Reuse theme tokens instead of hard-coded visual values when a suitable token exists.
- Preserve neighboring stories and public behavior during edits and refactors.
- Never use Playwright, Chrome MCP, screenshots, or browser automation unless the user explicitly requests browser verification.
- Do not commit, push, deploy, install dependencies, or run external review agents unless separately authorized.

## Inspect before editing

1. Read repository instructions and the relevant directory rules.
2. Inspect actual inventory with `rg --files src/components src/stories`; do not rely on a static component list.
3. Read the target component, its callers, neighboring stories, and existing tests before deciding whether to create, modify, refactor, or delete.
4. Load only the references required by the work:
   - [references/storybook-writing.md](references/storybook-writing.md) for every story change;
   - [references/mui-theme.md](references/mui-theme.md) for theme or styling decisions;
   - [references/taxonomy-index.md](references/taxonomy-index.md) when the component category or interaction pattern is unclear;
   - [references/typography-criteria.md](references/typography-criteria.md) for text-heavy UI, headings, long-form text, form labels, tables, or Korean typesetting;
   - [references/interactive-principles.md](references/interactive-principles.md) for Framer Motion, scroll behavior, or interaction beyond ordinary CSS states;
   - [references/refactoring-guide.md](references/refactoring-guide.md) for behavior-preserving refactors.

## Choose the workflow

### Create

1. Restate the component's user-facing purpose and required states. Ask only when a missing choice would materially change its API or behavior.
2. Check whether MUI or an existing project component already covers the need. Extend by composition before creating a duplicate primitive.
3. Use the taxonomy as context, not as a mandatory catalog. Inspect `src/data/*TaxonomyData.js` only for the decision being made.
4. Place the component according to repository directory rules and give it a narrow, reusable API.
5. Add or update its Storybook story in the same change. Demonstrate meaningful states with controls rather than multiplying cosmetic stories.

### Modify

1. Inspect current API, callers, story coverage, and visible behavior.
2. Make the smallest change that satisfies the request and preserve compatible defaults unless the user requests a breaking change.
3. Synchronize args, controls, examples, and descriptions when the public API or behavior changes.

### Delete

1. Resolve imports, callers, stories, generated entries, and documentation before deleting anything.
2. Remove only the confirmed component and its dedicated story or documentation.
3. Report any callers that prevent safe deletion instead of silently breaking them.

### Refactor

Follow the refactoring reference. Preserve output, interaction, and public API unless the user explicitly broadens the task. Keep comments in user-visible behavior terms rather than implementation narration.

### Story-only work

Read the Storybook reference, inspect neighboring category conventions, and change only the story or documentation layer. Do not rewrite the component merely to make a demo easier.

## Conditional design guidance

- For composition-scale layouts, inspect the relevant entries in `src/data/layoutTaxonomyData.js` and define the spatial model, responsive reflow, and overflow behavior explicitly. Do not call a missing `stable-layout` skill.
- For text-heavy work, apply the generated typography criteria and translate them through the current MUI theme rather than copying numeric examples as fixed tokens.
- For interaction, use installed dependencies only. CSS and Framer Motion are available; GSAP and related plugins are not project dependencies unless the user separately authorizes adding them.
- Avoid default AI styling such as purple-blue surface gradients, uniform rounded cards, generic centered hero stacks, and unbounded decorative shadows. Use the project's flat theme and actual hierarchy.
- Claude-only auditors are not Codex dependencies. When the user requests design QA, use an available Codex review skill or perform a scoped local review.

## Validate

- Review the diff for component/story synchronization and unrelated changes.
- Run the narrowest relevant checks, then `pnpm lint` when code changed.
- Run `pnpm generate-rules` when skill, rule, or relationship data changed.
- Build Storybook only when explicitly requested. Do not use a browser for validation without explicit permission.
- Report changed files, preserved behavior, checks run, and any unverified visual risk.
