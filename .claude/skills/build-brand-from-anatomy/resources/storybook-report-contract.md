# Storybook brand-report contract

Brand reports are authored from their stage package and read in this repository's Storybook. The stage JSON remains the canonical content model; Storybook is the reader and component-composition layer.

## Source of truth

- Stage 1: `outputs/source-brand-analysis.json`, `stage-review.json`, and locally registered evidence assets.
- Stage 2: `outputs/extended-brand-anatomy.json`, `stage-review.json`, `asset-registry.json`, and the referenced prompt/spec files. Claude Stage 2 may contain `external_pending` asset handoffs instead of bitmaps.
- Stage 3: `outputs/landing-materials.json`, `stage-review.json`, and `asset-registry.json`.
- Do not hand-edit generated Storybook story files or the copied public report package. Update the stage package, validate it, and register it again.
- Storybook adapters may reorganize content for reading but must not invent, omit, or reinterpret material decisions.

## Registration

From the Liberation Starter Kit repository root, run:

```bash
pnpm register-brand-report -- <stage-package-directory>
pnpm register-brand-report -- <stage-package-directory> --check
```

Registration copies the canonical JSON, review record, asset registry when present, referenced prompt/spec records, and available local images into `public/brand-reports/<report-id>/`. It also updates `public/brand-reports/registry.json` and the generated CSF entry under `src/stories/brand-reports/generated/`.

Re-register after any material JSON, review, provenance, or image change. Registration never changes the stage package.

## Delivery

Treat `Brand Reports/<brand>/<stage>` in Storybook as the primary human-readable report. Deliver the canonical JSON and registered assets beside that reader path. The review checkpoint remains data from `stage-review.json`; Storybook validation is not user approval.

## Reader presentation rules

- Give every normalized report section one `insight` sentence. Prefer an explicit canonical `key_insight`; for legacy packages, derive it from the first material statement without adding a new claim. Never summarize by combining unrelated claims.
- Keep the report title, section titles, and block titles in a clear display hierarchy. Headings may scale responsively, but they must wrap inside their container without clipping, ellipsis, or horizontal scrolling.
- Render evidence images at their intrinsic aspect ratio. Do not force a shared crop or default aspect ratio; a missing-image placeholder may use a fixed ratio because it has no source dimensions.
- Render an `external_pending` Stage 2 asset as an honest handoff card with its ID, role, communication job, prompt path, aspect ratio, and status. Never present the card as a generated image.
- Report content must wrap. Do not use `text-overflow: ellipsis`, line clamping, `nowrap`, or hidden overflow to shorten prose, labels, table cells, captions, provenance, or review copy.
- Preserve the complete URL in `href` and canonical provenance, but use the source title, credit, or hostname as visible link text. Show a raw URL only when the literal address is itself evidence or appears in a code/data block.

During the compatibility phase, continue generating the existing `outputs/*.html` file because current package validators and pipeline lineage still reference it. It is a deterministic legacy artifact, not a second editable report. Remove it only after all of the following are migrated:

1. Stage validators check the canonical JSON, registered asset package, generated CSF entry, and review record without parsing HTML.
2. Stage 2 and Stage 3 lineage records no longer require an HTML path.
3. The pipeline router validates Storybook registration instead of report HTML.
4. Report-language and image-visibility checks operate on normalized report data or a static Storybook build.

Never use browser automation merely to validate registration. Use the registration check, lint, and a static Storybook build unless the user explicitly requests browser inspection.
