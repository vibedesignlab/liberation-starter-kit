---
name: research-brand-anatomy
description: Research and model one existing reference brand without inventing, mapping, or planning a target brand. Deliver an evidence-backed Storybook document and structured JSON handoff covering strategy, verbal systems, identity, key visuals, brand mood, photography, product representation, physical or digital product-native language, behavior, and a portable global framework for color, typography, spacing, and layout. Keep deterministic HTML only as a migration-compatibility artifact. Stop before any transfer or fictional-brand work.
---

# Stage 1 — Research Brand Anatomy

Build one source-only brand model, deliver it, and stop for a short user adjustment check before any target-brand work.

## Boundary

- Record only the reference brand, scope, markets, channels, era, language, exclusions, and research priorities.
- If brand entity, era, or portfolio scope is materially ambiguous, ask one short question at a time and wait for the answer. Ask no more than two scope questions; otherwise use the current global masterbrand and clearly record the assumption.
- Use `Observed` and `Inferred`; never use `Transferred`.
- Do not research or propose a target category, fictional brand, mapping, naming, target positioning, or target tokens.
- End at `SOURCE_REVIEW_REQUIRED`. Ask only whether the delivered scope, grammar, key visual, brand mood, product language, or global design-system relationships need correction. This is a user adjustment checkpoint, not a scored audit.
- Record the result in `stage-review.json`. Stage 2 may start only after its status is `accepted`; use `revision_requested` while changes remain.
- When `stage-review.json.pipeline_state_path` is non-empty, follow the router chaining contract after the user's explicit checkpoint response. Validation success alone is not approval.
- Never use Playwright, Chrome MCP, or browser automation unless the user explicitly requests it.

## Read progressively

- Before evidence work, read [references/evidence-and-layer-model.md](references/evidence-and-layer-model.md).
- Before anatomy and grammar, read [references/source-anatomy-schema.md](references/source-anatomy-schema.md).
- Before the global system, read [references/global-brand-system-framework.md](references/global-brand-system-framework.md).
- Before delivery, read [references/report-language-style.md](references/report-language-style.md).
- Before exporting the handoff JSON, read [references/brand-model-json-contract.md](references/brand-model-json-contract.md).
- Before registering the reader document, read the router's [Storybook report contract](../reconstruct-brand-system/references/storybook-report-contract.md).

## Initialize

```bash
python3 scripts/init_analysis.py <analysis-directory>
```

Required artifacts:

- `research-brief.yaml`
- `source-manifest.csv`
- `visual-corpus.csv`
- local EV evidence and contact sheets
- `source-brand-anatomy.md`
- `grammar-kernel.md`
- `analysis-handoff.yaml`
- `analysis-status.yaml`
- `stage-review.json`
- `outputs/source-brand-analysis.html`
- `outputs/source-brand-analysis.json`

The JSON is canonical. The Storybook entry registered under `Brand Reports/<brand>/Source Brand Analysis` is the primary reader. Keep the HTML only while the compatibility gates in the Storybook report contract remain open.

Do not create a scored audit artifact.

## Depth

Use `standard` unless the user asks for a deep study or the locked scope spans materially different eras, markets, or product systems.

| Depth | Structural evidence | Direct local visuals | Core claims | Grammar |
|---|---:|---:|---:|---:|
| standard | 8+, including 6 primary | 24+ | 20+ | 5–7 |
| expanded | 12+, including 8 primary | 40–60 | 32+ | 5–8 |

Coverage decides when to stop. Expand only when a required layer, major variation, or important inference lacks representative evidence. Do not collect more examples when they only repeat an established rule.

For standalone use, subagents remain optional. In a routed full pipeline whose state declares `parallel_single_brand`, follow the router's [parallel execution contract](../reconstruct-brand-system/references/parallel-execution-contract.md): after scope lock, use available worker slots for the three non-overlapping research lanes and keep the root coordinator as the only canonical writer. If slots are unavailable, record a serial fallback reason and continue. Do not add a subjective audit agent.

## Workflow

### A0 — Lock scope

Complete `research-brief.yaml`. It intentionally has no target fields. Choose `standard` or `expanded` and record why expanded depth is necessary. Do not present a questionnaire when the user's brand and scope are already clear.

### A1 — Build the evidence package

Lead with current first-party evidence. Use credited agencies, designers, or authoritative publications only for authorship, intent, history, use, or reception.

Register structural and visual evidence, download legitimate source images locally, preserve provenance and hashes, remove exact duplicates, and make an overview plus only the layer sheets that are useful for this scope. A missing applicable layer is a visible evidence gap.

In routed parallel mode, workers write only structured evidence shards and uniquely owned downloads under `.work/<job-id>/`. Use separate lanes for strategy/authorship/verbal/identity, key-visual/UI/content/photography assets, and product-native behavior. Merge and deduplicate before assigning final evidence IDs. For a completed manifest, use `scripts/fetch_manifest_assets.py` to download independent local assets concurrently and fill hashes instead of issuing serial one-file commands.

Register one current official masterbrand logo or wordmark and the verified identity-color field used behind the report hero. Keep this presentational identity evidence separate from interaction, status, product, campaign, and photographic colors. If a current official logo cannot be obtained, record a visible gap; do not redraw or approximate it.

For key visual, collect identity, UI, content/campaign, imagery, and motion examples. A campaign photograph or product-photo sequence cannot define the whole key visual.

### A2 — Write the source anatomy

Use [assets/source-brand-anatomy.md](assets/source-brand-anatomy.md). Keep these visual systems separate:

1. identity and channel tokens;
2. key-visual system;
3. brand mood and world;
4. photography, film, and product representation;
5. product-native visual and cognitive language.

Write the narrative in `deliverable.language`. Keep official names, evidence IDs, and source quotations in their original language. The shared renderer uses this anatomy directly, so do not create a second reader-copy document.

The coordinator owns the final anatomy. A worker may draft a bounded section or grammar shard only after the evidence barrier; do not concatenate worker prose into the report without resolving terminology, confidence, scope, and cross-layer conflicts.

`Product-native visual and cognitive language` means the product as users perceive, understand, and operate it, whether it is physical, digital, or hybrid.

- Shared: category archetype or mental model, hierarchy, structure, boundaries, controls, affordances, state, feedback, family resemblance, onboarding, use, error, and recovery.
- Physical: silhouette, massing, proportion, geometry, CMF, seams, ports, joints, movement, care, storage, and repair.
- Digital: information architecture, screen anatomy, navigation, component geometry, density, content framing, state model, motion, feedback, personalization, accessibility, localization, and cross-device continuity.
- Hybrid: the continuity between physical control, digital state, service, and feedback.

Separate representation from the product itself:

- physical product photography is not physical product form;
- a marketing mockup or styled screenshot is not the actual interface structure or interaction model.

For each material claim cite evidence, state semantic function, test a plausible alternative, record confidence, and bound scope and exceptions.

Treat key visual as the cross-surface operating grammar connecting identity, typography, color, graphic form, layout, UI, content, imagery, and motion. The report must show its operating model and at least six direct EV examples across identity, UI, and content plus any relevant imagery or motion roles.

### A3 — Extract grammar and global system

Write five to eight causal source-only rules in `grammar-kernel.md`. Each rule needs input, transformation, effect, two or more EV items, confidence, alternative, exception, acceptance and rejection tests, and a protected source boundary.

Then describe the source brand's portable operating guidance for:

- brand color scheme;
- typography hierarchy;
- spacing strategy;
- layout strategy.

Separate identity color, interaction/status color, product/campaign color, and photographic color before recording exact values. Exact first-party typography or color values are dated channel observations, not universal tokens. Never invent a fixed scale, framework syntax, JSON, CSS variables, or target implementation.

### A4 — Export, render compatibility output, register in Storybook, check, deliver, and stop for review

Use the shared renderer; do not build brand-specific HTML or CSS.

Before export, fill the handoff package version, grammar IDs, protected surfaces, unresolved gaps, and delivery metadata, leaving only the four digest fields blank. The exporter reads those records into the source JSON. After rendering, calculate and copy the final digests, then validate.

```bash
python3 scripts/export_brand_model.py <analysis-directory>
python3 scripts/render_report.py <analysis-directory>
python3 scripts/package_digests.py <analysis-directory>
python3 scripts/validate_analysis.py <analysis-directory> all
python3 scripts/validate_report_language.py <analysis-directory>/outputs/source-brand-analysis.html
pnpm register-brand-report -- <analysis-directory>
pnpm register-brand-report -- <analysis-directory> --check
```

Run the `pnpm` commands from the Liberation Starter Kit repository root. Registration copies the validated JSON, review record, provenance, and referenced assets into Storybook without changing the analysis package.

Copy the printed `package_integrity` block into `analysis-handoff.yaml` before validation.

The shared Storybook document order is: scope, evidence, strategy, verbal, identity/tokens, key visual, brand mood, photography/film, product representation, product-native visual and cognitive language, product/interface/service behavior, grammar, global brand system, evidence gaps, and evidence index. The compatibility HTML mirrors the same order.

Identify one evidence-backed key-insight sentence for every Storybook section. Put it first in that section's canonical narrative content so the adapter can expose it as `insight` without inventing or merging claims. Follow the shared report contract for larger wrap-safe headlines, intrinsic-ratio evidence images, non-clipped text, and concise visible link labels.

The report must use direct EV source images in its main sections. Contact sheets belong only in the evidence appendix. It must render a verified first-party webfont specimen or show a visible webfont gap.

Begin the report with one official masterbrand logo on a verified identity-color background. Keep the report title and short synthesis secondary to the logo. The logo needs the same local-file provenance metadata as every other displayed image, and the chosen background/color role must also be exported under `report_identity` in JSON. Never substitute an interaction, status, product, campaign, or photographic color merely because it is visually prominent.

The Storybook document and JSON are a paired handoff. Storybook explains context, evidence, and interpretation through shared document components. The JSON explicitly records the material claims, qualitative operating rules, global design-system relationships, evidence lineage, protected boundaries, exceptions, and gaps needed by the later transfer plan. It must cover physical, digital, or hybrid product-native language as applicable; design tokens alone are insufficient. Export each global design-system area as explicit roles, relationships, invariants, variables, observed references, evidence, and limits rather than leaving the transfer step to reinterpret prose tables.

The JSON is not a target token file. Keep exact source values dated and scoped, keep `target_direction: null`, and state that the later transfer step requires new user direction and approval. A later second-brand model will add tuning lineage and implementation guidance before product-photography or landing-page planning begins.

The deterministic completion check verifies structure, evidence traceability, layer separation, key-visual surfaces, image provenance, font disclosure, global-system layers, target contamination, and delivery state. It returns `PASS` or `NEEDS COMPLETION`; it does not assign a quality score or judge conceptual interest.

Create `analysis-handoff.yaml` with package version, source-JSON schema version, SHA-256 digests for the anatomy, grammar, compatibility HTML, and final JSON, grammar IDs, protected surfaces, unresolved gaps, and `validation_status: pass`. Compute the digests only after the final export and render; any material content change requires new digests and a package-version bump followed by Storybook re-registration. Keep `target_direction: null`, set `current_stage: SOURCE_REVIEW_REQUIRED`, deliver the Storybook reader path and JSON, show the single short prompt from `stage-review.json`, and stop. After the user responds, record `accepted` or `revision_requested`; do not begin Stage 2 while revisions remain.

If `pipeline_state_path` is registered and the user approves, do not stop after editing the review JSON manually. Run the router's `advance_pipeline.py` with the user's decision and feedback. On `CHAIN_ACTION=CALL_SKILL`, immediately read and execute `$build-brand-from-anatomy` using the printed source and destination package paths. On a revision request, remain in this skill.
