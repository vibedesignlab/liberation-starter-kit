# Source brand-model JSON contract

Create `outputs/source-brand-analysis.json` as the canonical handoff and register it in the reader-facing Storybook document. Storybook explains the analysis; this JSON is the explicit input used to draft a later transfer plan. It is not an implementation token file. Keep the adjacent HTML only as a migration-compatibility artifact.

## Required top-level records

| Record | Purpose |
|---|---|
| `schema_version`, `artifact_type`, `generated_at` | Version and artifact identity |
| `brand` | Name, entity scope, market, era, channel, language, and physical/digital/hybrid product mode |
| `report_identity` | Verified hero background/foreground identity colors, scope, official logo evidence, local path, source, credit, rights, variant, and permitted rendering treatment |
| `handoff` | Source-only status, package version, approved grammar IDs, protected boundaries, unresolved gaps, and `target_direction: null` |
| `decision_index` | Material source claims grouped by strategy, verbal, identity, key visual, mood, photography, product representation, product-native language, composition, behavior, and system |
| `analysis_layers` | Complete qualitative findings by report layer and subsection, with evidence IDs |
| `design_system` | Brand color scheme, typography hierarchy, spacing strategy, and layout strategy as roles, relationships, invariants, variables, exact observed references, evidence, and limits |
| `grammar_rules` | Causal source rules with input, transformation, effect, evidence, confidence, alternative, exception, acceptance/rejection tests, and protected expression |
| `evidence_index` | EV ID, source tier, layer, title, source URL, local path, market/era, credit, and rights note |
| `downstream_contract` | Which records a transfer plan, second-brand model, product-photo brief, and landing-page brief must consume |

## Qualitative data worth carrying forward

Do not reduce the handoff to visual token values. Preserve these decision-making records because later work depends on them:

- category frame, audience situation, tension, promise, reasons to believe, portfolio logic, and cultural role;
- vocabulary, syntax, message order, naming behavior, CTA, support/error language, and verbal prohibitions;
- key-visual premise, focal actor, type-message-image relationship, graphic device, surface translations, motion behavior, invariants, variables, and exceptions;
- brand mood causes: settings, people, material imagination, emotional temperature, reality/fiction boundary, and sensory behavior;
- photography and film: subject, camera, light, set, crop, color, post-production, sequence, and channel role;
- product representation: packshot, use, detail, UI mockup, screen capture, factual demonstration, service, packaging, failure, and recovery;
- product-native language for physical, digital, or hybrid products: mental model, hierarchy, structure, controls, affordances, states, feedback, family resemblance, onboarding, error, recovery, and continuity; add form/CMF for physical products and IA/components/motion/localization/accessibility for digital products;
- behavior across product, interface, service, care, repair, support, and post-purchase;
- protected source expressions, scope exceptions, evidence gaps, confidence, alternative explanations, and falsifiers.

## Design-system record

Each of the four global areas must expose these as explicit JSON fields, not only as prose or copied table cells:

- `role` or operating purpose;
- relationship to adjacent elements;
- invariants that survive tools, channels, and locales;
- variables and exceptions;
- observed first-party reference values with channel, market, date, evidence IDs, and limits;
- implementation boundary.

Use `roles`, `relationships`, `invariants`, `variables_and_exceptions`, `observed_references`, `evidence_ids`, and `limits` in every area. Preserve `source_notes` and `source_tables` only as supporting context.

Keep identity color, interaction/status color, product/campaign color, and photographic color as different layers. Exact values are source observations, not ready-made target tokens.

`report_identity` is a presentation record, not a new brand rule. Its background must come from the verified identity layer, and its logo must resolve to one included official evidence item. A monochrome filter is allowed only when the official guidance permits that logo color; record the treatment explicitly.

## Downstream use

The transfer plan must read the Storybook document and JSON together. It may not infer the target from either artifact. During migration, the compatibility HTML may be used only when Storybook registration is unavailable. After a new user direction arrives, the transfer plan uses source claims, grammar, design-system relationships, protected boundaries, and gaps to propose layer-by-layer tuning.

The later second-brand JSON should keep the same semantic areas and add source lineage, approved tuning operation, target evidence, decision status, implementation guidance, and downstream briefs. Product-photo and landing-page work consume the second-brand JSON, never the source JSON alone.

## Package integrity

During the compatibility phase, `analysis-handoff.yaml` pins the source JSON schema version and SHA-256 digests for `source-brand-anatomy.md`, `grammar-kernel.md`, `outputs/source-brand-analysis.html`, and `outputs/source-brand-analysis.json`. A later transfer brief copies those values. If a material source decision changes, increment the source package version, regenerate the digests, and re-register the Storybook report; do not silently approve a changed package under the old version.
