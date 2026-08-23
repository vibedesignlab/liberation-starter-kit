# Brand Research Pipeline Specification

Status: normative
Version: 2.0.0
Applies to: `research-brand-anatomy`, `build-brand-from-anatomy`, `build-landing-materials`, and `reconstruct-brand-system`

## 1. Design objective

The pipeline produces one canonical JSON package per Stage and one fixed React reader in Storybook. It must not produce, validate, reference, or hand off an HTML report.

```text
Stage package JSON + review + local assets
  -> deterministic Stage validator
  -> fixed normalized report contract
  -> atomic Storybook registration
  -> registration drift check
  -> user review checkpoint
```

The package JSON owns content. React owns presentation. Generated Storybook stories own registration. No brand-specific report markup is allowed.

## 2. Normative invariants

1. `outputs/*.json` is the only canonical report payload.
2. `stage-review.json` is required for every Stage.
3. `asset-registry.json` is required for Stage 2 and Stage 3.
4. `outputs/*.html`, brand-specific HTML/CSS, HTML renderer scripts, and HTML validation are forbidden.
5. Every report is normalized through `src/utils/brand-reports` and rendered only by `BrandReportDocument`.
6. Every Stage has an exact ordered section-ID contract. Missing, extra, duplicated, or reordered sections fail registration.
7. Every section exposes one non-empty `insight` and a `blocks` array.
8. Registration is not an optional delivery step. A Stage is deliverable only after `finalize-brand-report` validates, registers, and checks the package.
9. Generated files under `src/stories/brand-reports/generated/` and copied packages under `public/brand-reports/` are CLI-owned.
10. Pipeline advancement checks the finalized registration receipt and re-registers the accepted review record with the same report ID before changing Stage state. It does not rerun the Stage validator.

## 3. Stage report structures

The React structures preserve the final legacy HTML information architecture while removing HTML as an artifact. The review checkpoint is rendered after the numbered sections by `BrandReportDocument`.

### Stage 1 — Source Brand Analysis

1. `terminology`
2. `source-brand-anatomy`
3. `evidence`
4. `strategy`
5. `verbal`
6. `identity-channel-tokens`
7. `key-visual`
8. `brand-mood`
9. `photography-film`
10. `product-representation`
11. `product-native-visual-language`
12. `composition`
13. `product-interface-service`
14. `grammar`
15. `global-brand-system-framework`
16. `core-claims`
17. `evidence-index`
18. `structured-data-handoff`

### Stage 2 — Extended Brand Anatomy

1. `source-grammar-application`
2. `brand-positioning`
3. `landing-product-concept`
4. `verbal-branding-and-copy-hierarchy`
5. `visual-branding-and-key-visual`
6. `brand-mood-and-brand-imagery`
7. `product-visual-traits-and-product-imagery`
8. `design-token-direction`

### Stage 3 — Landing Materials

1. `landing-narrative`
2. `brand-value`
3. `brand-story`
4. `product-family`
5. `product-lineup`
6. `product-assets-and-map`

Stage 3 boundaries remain canonical data and render inside `product-assets-and-map`; they do not create an unapproved seventh section.

## 4. Ten-minute Stage 1 contract

The default research mode is `rapid`. It preserves the complete Stage 1 report structure while limiting evidence volume.

| Budget | Limit |
| --- | ---: |
| Scope lock and timer start | 1 minute |
| Evidence search and capture | 5 minutes |
| Anatomy and grammar synthesis | 2 minutes |
| Export, finalize, and registration check | 2 minutes |
| Hard elapsed limit | 10 minutes |

Rapid minimums:

- 4 structural sources, including 3 primary sources;
- 8 direct local visuals across at least 4 applicable layers;
- 8 material claims;
- 4 causal grammar rules, each backed by at least 2 evidence items.

Coverage gaps do not extend the timer. Record them under `unresolved_gaps` and continue to finalization. Repeated examples do not count as new coverage.

An expanded study is permitted only when the user explicitly requests deeper research. It must record that request and does not claim compliance with the ten-minute rapid SLA.

`research-run.json` records start, deadline, completion, elapsed time, mode, and stop reason. A rapid package cannot pass delivery validation when the run record is missing, incomplete, or over ten minutes.

## 5. Finalization contract

From the starter-kit root, every Stage uses exactly one delivery command:

```bash
pnpm finalize-brand-report -- <stage-package-directory>
```

The command must:

1. identify exactly one canonical Stage JSON;
2. run that Stage's deterministic validator;
3. normalize the report and enforce the exact section contract;
4. atomically copy JSON, review, registry, and referenced local assets;
5. generate the fixed CSF story using `RegisteredBrandReport`;
6. run registration `--check` and fail on any drift.

The command is idempotent for identical canonical inputs. It validates the current Stage once and writes only one operational source-package file, `registration-receipt.json`, containing the locked report ID, registered package SHA, review status, and finalization time.

User acceptance uses the internal registration-only path. It checks the existing receipt and registered package, updates the review checkpoint, and re-registers that review with the locked ID without invoking a Stage validator again. Full finalization runs again only after canonical JSON, provenance, or image data changes.

Generated registration can be removed without hand-editing registry or story files:

```bash
pnpm unregister-brand-report -- <report-id> --dry-run
pnpm unregister-brand-report -- <report-id>
pnpm unregister-brand-report -- <report-id> --check
```

Unregister is limited to the derived `public/brand-reports/<report-id>` package, its generated story, and its registry entry. It never removes the canonical source Stage package, so the report can be restored with `finalize-brand-report`.

## 6. State transitions

```text
active
  -> finalized_pending_review
  -> revision_required -> finalized_pending_review
  -> accepted -> next Stage
```

- Deterministic validation does not equal user acceptance.
- A revision updates canonical package data and runs one fresh full finalization.
- Acceptance first checks the existing registration receipt and drift, then updates `stage-review.json` and refreshes only the registered checkpoint before advancing.
- Acceptance never reruns the current or upstream Stage validators.
- Registration failure leaves the current Stage active and prevents transition.

## 7. Acceptance tests

A pipeline implementation conforms only when all of the following pass:

- no brand skill or router references an HTML report;
- the three normalized Stage models match the exact ordered section contracts;
- registration rejects missing reviews and missing Stage 2/3 asset registries;
- registration is idempotent and `--check` detects drift;
- the router cannot accept a Stage whose Storybook registration is missing or stale, and restores the original review when finalization fails;
- acceptance succeeds even when the Stage validator is unavailable after a valid pending finalization, proving that the router does not revalidate;
- the full fixture route proves pending registration, accepted re-registration, Stage 1-to-2 and Stage 2-to-3 input wiring, and Stage 3 completion;
- a rapid Stage 1 package records an elapsed duration of ten minutes or less;
- lint and the non-browser contract checks pass;
- the Storybook template story exposes all three fixed Stage formats.

The required non-browser CI baseline is:

```bash
pnpm check-brand-report-contracts
pnpm test-brand-report-pipeline
pnpm lint
```

`pnpm test-brand-report-pipeline` must execute only against an isolated temporary project assembled from the committed Stage 1–3 fixtures. It must not register fixture reports into the working repository.

Browser automation is not part of this contract. Visual browser inspection requires separate explicit user authorization.
