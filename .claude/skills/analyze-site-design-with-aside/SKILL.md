---
name: analyze-site-design-with-aside
description: Use this skill whenever the user explicitly asks Claude Code to use Aside, the Aside browser, or /analyze-site-design-with-aside to inspect a live public, authenticated, staging, or local website and analyze its visual system, layout, components, responsiveness, or interaction behavior. Do not activate for ordinary code review, static-file-only analysis, or browser work the user did not explicitly authorize.
compatibility: Requires macOS 15 or later, Aside Browser, the local Aside CLI, Node.js, and this project's pnpm scripts.
---

# Analyze Site Design with Aside

Use the user's own Aside Browser account and local `aside` CLI to inspect a website, collect reviewable evidence, and return a design analysis. The repository ships this skill and a shared diagnostic command; it never ships Aside credentials, browser state, or a shared account.

## Invocation architecture

The user invokes `/analyze-site-design-with-aside` from Claude Code while the cloned repository is the active project. Claude loads `.claude/skills/analyze-site-design-with-aside`, performs onboarding, and calls the user's `aside` executable. Aside owns browser execution; Claude owns the reusable design-analysis procedure and final report.

Do not claim that a bare `aside` process automatically discovers `.claude/skills`. Aside's public CLI documentation does not define that project-skill discovery contract. A user who runs `aside` directly must supply the task prompt themselves; `/analyze-site-design-with-aside` is the portable Claude project entrypoint.

## Boundaries

- Work only from this project-local package under `.claude/skills`. Never install or copy this skill into a global skill directory.
- Treat an explicit invocation of `/analyze-site-design-with-aside`, or a request that explicitly names Aside for site analysis, as browser-automation authorization for the stated site and analysis scope.
- If Aside was not explicitly requested, do not start it. Offer the static-file path or ask whether the user wants Aside browser analysis.
- Keep the Aside run read-only unless the user separately authorizes a concrete state-changing action. Do not submit forms, publish, purchase, message, change settings, or save credentials as part of a design analysis.
- Never read, print, store, or commit the user's Aside tokens, cookies, passwords, browser profile, or provider keys.
- Do not bundle the Aside application or CLI in this repository. Installation comes from Aside's official installer after explicit user approval.

## Start at CLI onboarding

This skill owns steps 3–6 of the user journey: install the CLI, validate setup, prepare the analysis, and run Aside.

1. Run the project-shared preflight from the repository root:

   ```bash
   pnpm aside:check
   ```

2. Route the result:
   - `ready`: continue to analysis.
   - `setup-required`: read [resources/aside-setup-spec.md](resources/aside-setup-spec.md), report the matching scenario, and guide the user through it.
   - `unsupported`: stop and explain the supported environment. Do not attempt a workaround or another browser tool without the user's direction.
3. If the CLI is missing, show the official install command and ask for confirmation immediately before running it. Never run a remote install script based only on the original analysis request.
4. After installation or account repair, rerun the preflight. Do not begin analysis until the required checks pass.
5. Leave user-interactive setup to the user: opening Aside, signing in, selecting an account, completing MFA or CAPTCHA, connecting a model provider, and granting site or folder permissions.

Do not impose a hard-coded minimum CLI version while Aside publishes no separate CLI compatibility floor. Record the installed CLI version when available and treat an unreadable version as a warning when documented account checks still pass.

If an Aside run prints an update-available banner, report the installed and offered versions and route to `cli-update-available` in the setup spec. Do not run `aside --update` without separate user confirmation because it mutates the user's local installation.

## Prepare the analysis

Require a target URL. Infer ordinary analysis depth from the request; ask only when a missing choice would materially change coverage, such as which authenticated account, a destructive flow, or several unrelated page families.

Before launching Aside, state:

- the URL or allowed origin set
- public, authenticated, staging, or localhost context
- pages or flow in scope
- viewport or responsive coverage when relevant
- evidence expected: observations, screenshots, measurements, interaction states, or all applicable evidence
- output destination if the user requested files
- read-only and privacy constraints

Read [resources/design-analysis-contract.md](resources/design-analysis-contract.md) before composing the Aside task or report.

## Run Aside

Use the smallest Aside interface that fits:

- `aside "<task>"` for an agent-led page or flow analysis.
- `aside repl "<JavaScript>"` for deterministic inspection of a known page, locator, computed value, responsive state, or screenshot.
- `aside mcp` only when the user's coding client is already configured to use Aside through MCP. CLI is the portable baseline for cloned repositories.

Build one self-contained Aside task from the analysis contract. Name the allowed site, requested states and viewports, evidence destination, and read-only constraints. Require Aside to stop for login, MFA, CAPTCHA, consent, or an action outside scope.

For visual claims about typography, color, spacing, size, alignment, or responsive behavior, use a two-pass evidence floor: first collect structure and visible states, then use the REPL for computed styles, bounding boxes, and viewport-specific values. An accessibility snapshot alone is not sufficient evidence for those claims. Never substitute prior knowledge of a well-known site for a browser observation.

Use a reusable terminal session for a long-running command and relay meaningful progress. Do not silently retry failed account, permission, or site-auth checks. If Aside requests user input, report the exact visible action the user must complete and resume only after they do it.

## Return the result

Separate observed evidence from interpretation and recommendation. Include URLs, viewport/state context, and artifact paths for claims that depend on browser evidence. Mark unavailable or blocked evidence instead of guessing.

Before returning, remove or downgrade any claim whose evidence does not support it. If the Aside agent describes a font, color, geometry, breakpoint, or surface without a computed value or visual artifact, run a targeted REPL check or label the claim `inferred` or `not inspected`.

Return:

1. scope and run status
2. executive design reading
3. evidence-backed findings by relevant design dimension
4. reusable patterns and distinctive decisions
5. responsive and interaction behavior, when inspected
6. accessibility or usability risks visible in the inspected states
7. prioritized adaptation guidance that does not copy proprietary code or assets
8. evidence index and unresolved gaps

Do not claim full-site coverage when only sampled pages or states were inspected. Preserve the user's requested format; otherwise return concise Markdown and offer structured JSON only when it will feed another project workflow.
