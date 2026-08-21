# Aside Site Design Analysis Contract

Use this contract to turn a user's analysis request into one bounded Aside task and a reviewable report. Analyze only dimensions relevant to the requested page or flow.

## Intake

Capture:

- target URL and allowed origins
- public, authenticated, staging, or localhost context
- page set, user flow, and excluded actions
- desktop, tablet, and mobile viewport expectations
- requested focus: visual identity, layout, typography, color, component patterns, content hierarchy, imagery, responsive behavior, motion, accessibility, or implementation clues
- evidence type and output destination
- whether the user wants observation only, comparison, or adaptation guidance

Do not widen one page into a full-site crawl without consent. Do not cross from a public site into signed-in areas unless the user included them.

## Aside task template

Adapt this template rather than copying it mechanically:

```text
Inspect [URL/ORIGINS] for a read-only design analysis of [PAGES/FLOW].

Goal: [ANALYSIS GOAL]
States and viewports: [STATES/VIEWPORTS]
Collect: [OBSERVATIONS/MEASUREMENTS/SCREENSHOTS/INTERACTION EVIDENCE]
Save artifacts to: [OUTPUT PATH, IF ANY]

For every material claim, record the page URL, viewport or state, and supporting artifact or observed value. Separate direct observations from interpretation. Do not submit forms, post, purchase, message, change account or site settings, accept consent, or download executables. Stop and ask the user for login, MFA, CAPTCHA, permission, or any action outside this scope. Do not expose credentials or unrelated personal data.

Return a concise evidence index plus structured findings for the requested design dimensions.
```

For private or personalized pages, instruct Aside to omit names, email addresses, account identifiers, financial information, and unrelated content from screenshots and written output whenever possible.

## Evidence quality

Prefer evidence that another reviewer can verify:

- exact page URL and observed timestamp
- viewport dimensions and interaction state
- screenshots of the relevant region rather than unrelated full-page personal data
- measured or computed values when a claim depends on size, spacing, color, type, timing, or breakpoint behavior
- before/after states for hover, focus, expansion, navigation, or responsive changes
- explicit `blocked`, `not inspected`, or `inferred` labels where direct evidence is unavailable

Do not treat minified source, generated class names, or private implementation details as design intent. Do not copy proprietary source code, copywriting, imagery, or assets into the user's project.

Do not use general knowledge of the site as evidence. An accessibility snapshot establishes structure, roles, names, and visible text; it does not by itself establish font family, exact color, centering, width, spacing, shadows, gradients, or breakpoint behavior.

## Visual proof floor

For a visual-system analysis, collect at least:

- viewport dimensions
- bounding boxes for the main page regions and representative components
- computed font family, size, weight, line height, and color for representative heading and body text
- computed background, border, radius, shadow, and spacing values where those features are discussed
- the inspected interaction or responsive state for state-dependent claims

Use `aside repl` for these deterministic values. A screenshot can supplement them when the user authorized capture, but it does not replace measurements for exact-value claims. If a value cannot be collected, mark it `not inspected`; do not reconstruct it from memory or browser defaults.

## Analysis dimensions

Select only what serves the request:

1. **Information architecture and hierarchy**: navigation, page regions, content order, calls to action, scanning path.
2. **Layout system**: container behavior, grid, alignment, density, spacing rhythm, section transitions.
3. **Typography**: family clues, scale, weight, line height, measure, hierarchy, responsive changes.
4. **Color and surface**: palette roles, contrast, borders, elevation, background transitions, state colors.
5. **Components and patterns**: headers, cards, buttons, forms, navigation, repeated modules, variants and states.
6. **Imagery and art direction**: subject treatment, crop, aspect, composition, copy-safe space, consistency.
7. **Responsive behavior**: reflow, hide/show logic, navigation changes, content priority, breakpoint discontinuities.
8. **Motion and interaction**: trigger, duration, easing, transform, opacity, continuity, reduced-motion behavior when observable.
9. **Accessibility and usability signals**: focus visibility, apparent contrast, target size, keyboard route, zoom or overflow risks. Report visible evidence, not an unperformed compliance certification.
10. **Distinctive system decisions**: recurring choices that create the site's recognizable design character.

## Report contract

Default to concise Markdown with this structure:

```markdown
# Site Design Analysis: <site/page>

## Scope and status
## Executive reading
## Evidence-backed findings
## Reusable patterns
## Responsive and interaction behavior
## Risks and gaps
## Adaptation guidance
## Evidence index
```

Within findings, distinguish:

- **Observed**: directly supported by browser evidence.
- **Inferred**: a design-system interpretation based on repeated observations.
- **Recommended**: guidance for adapting the principle to the user's project.

If structured output is requested, return JSON with these top-level keys:

```json
{
  "schemaVersion": 1,
  "target": {},
  "scope": {},
  "runStatus": "complete|partial|blocked",
  "executiveReading": "",
  "findings": [],
  "patterns": [],
  "responsiveBehavior": [],
  "interactionBehavior": [],
  "risks": [],
  "recommendations": [],
  "evidence": [],
  "gaps": []
}
```

Each finding should include `dimension`, `statement`, `evidenceIds`, and `confidence`. Each evidence item should include `id`, `url`, `viewportOrState`, `artifactPathOrObservation`, and `capturedAt` when available.
