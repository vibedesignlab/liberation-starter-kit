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

## Default rapid mode

Unless the user explicitly asks for deep coverage, use one bounded sample and collect structure and visual evidence together.

- Inspect the primary page plus at most two representative secondary pages chosen from distinct page families.
- Capture no more than three screenshots total. Prefer the primary desktop view, primary mobile view when responsiveness matters, and one representative secondary page or material state.
- Inspect one interaction state only when it changes hierarchy, navigation, or component behavior.
- Collect navigation, landmarks, section order, repeated modules, and primary actions while each sampled page is already open.
- Measure only representative heading/body type, the principal container, one recurring surface/component, and the palette or spacing values needed for material claims.
- Stop when the main page families and recurring visual grammar are represented or a new page adds no material pattern.

Use `focused` mode for a named flow or dimension. Use `deep` mode only when the user requests broad, exhaustive, or full-site analysis. Never silently turn rapid mode into a crawl.

## Aside task template

Adapt this template rather than copying it mechanically:

```text
Inspect [URL/ORIGINS] for a read-only design analysis of [PAGES/FLOW].

Goal: [ANALYSIS GOAL]
States and viewports: [STATES/VIEWPORTS]
Collect: [OBSERVATIONS/MEASUREMENTS/SCREENSHOTS/INTERACTION EVIDENCE]
Evidence budget: [RAPID DEFAULT OR USER-APPROVED EXPANSION]
Save artifacts to: [OUTPUT PATH, IF ANY]

For every material claim, record the page URL, viewport or state, and supporting artifact or observed value. Separate direct observations from interpretation. Do not submit forms, post, purchase, message, change account or site settings, accept consent, or download executables. Stop and ask the user for login, MFA, CAPTCHA, permission, or any action outside this scope. Do not expose credentials or unrelated personal data.

During each sampled-page visit, run two coordinated lanes: (A) structure — navigation, page family, landmarks, section order, repeated components and actions; (B) visual — one necessary capture plus representative computed values. Do not complete a full structure crawl before visual collection and do not revisit every page for a second pass.

Return a concise evidence index plus one synthesized set of findings for the requested design dimensions.
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

## Rapid paired proof floor

For the default visual-system analysis, collect structure and visual proof from the same page visits:

- viewport dimensions for each captured state
- one structural outline for each sampled page
- bounding boxes for the main container and representative recurring component
- computed font family, size, weight, line height, and color for representative heading and body text
- computed background, border, radius, shadow, or spacing only where those features support a material finding
- the single inspected interaction or responsive state when a state-dependent claim is included

Use values gathered during the paired visit first. Use targeted `aside repl` only when an important exact-value claim remains unresolved; do not measure every component. A screenshot supplements structure and measurements but does not replace them for exact-value claims. If a value cannot be collected inside the evidence budget, mark it `not inspected`; do not reconstruct it from memory or browser defaults.

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
