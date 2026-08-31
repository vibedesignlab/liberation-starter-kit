# Brand Research Pipeline — Remaining To-do

The core specification and enforcement path are implemented. This list contains only work that still needs real-world or broader integration validation.

## P0 — Required before calling the pipeline production-proven

- [x] Run one new `rapid` source-brand study from an empty package and confirm the recorded wall-clock time is ten minutes or less without omitting any of the 18 fixed sections. Verified in 476 seconds on 2026-08-23; the disposable test package and registration were removed afterward.
- [x] Add committed Stage 1, Stage 2, and Stage 3 fixture packages with lightweight local images so `finalize-brand-report` can be exercised without external research or image-generation cost.
- [x] Add automated tests for the full router acceptance path: pending review registration, accepted review re-registration, next-stage wiring, registration failure rollback, and Stage 3 completion.
- [x] Exercise the production `parallel_single_brand` path with fixed Stage 1–3 job plans, delayed fake workers, missing-result barriers, atomic state updates, and deterministic completion without external API cost.
- [x] Add the following non-browser commands to CI: `pnpm check-brand-report-contracts`, `pnpm lint`, and the fixture finalization tests.

## P1 — Release verification

- [x] Run `pnpm build-storybook` when the user explicitly requests a Storybook build verification. Verified on 2026-08-23 without browser automation.
- [ ] With explicit browser authorization, inspect the three template stories at representative desktop and mobile widths and record any typography, wrapping, intrinsic-ratio image, or overflow defects.
- [ ] Complete one real Stage 2 and Stage 3 run to verify image generation, asset lineage, lineup coverage, and accepted-review re-registration with production-like data.
- [ ] Run one live Stage 1 parallel pilot against the 476-second serial observation. Promote it only if stage start to pending registration improves by at least 20% with no lost jobs, first-pass finalization regression, or additional revision.
- [ ] Run one controlled image-provider pilot for true concurrent processing, rate limits, duplicate billing, cancellation behavior, and cross-worker visual consistency. Keep `image_parallelism.mode: pilot_pending` until it passes; enabled mode remains capped at two workers.

## P2 — Existing package migration

- [ ] If any external legacy report package should remain executable by the new pipeline, migrate it to package version 2: add a truthful `research-run.json`, remove legacy report files, refresh JSON/handoff digests, and finalize it from the starter-kit root.
- [x] Define an explicit archive or unregister command for reports that should be removed from Storybook without manually editing the registry, public package, or generated story.

## Completion definition

The remaining list is complete when the live Stage 1 parallel pilot meets its speed and quality gate, one full three-Stage chain passes the fixed React contract and automatic registration, the image-provider pilot decides whether two-worker generation is safe, and the remaining CI, static Storybook build, and explicitly authorized visual QA checks pass.
