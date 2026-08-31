# Revision R4 Parallel Orchestration

Pattern: pipeline with parallel artifact sharding
Effective concurrency: root plus three workers

## Ownership

| Branch | Exclusive write scope | Root consumer |
| --- | --- | --- |
| narrative-layout | `outputs/landing-materials.json` only | Root reviews hierarchy and preserves schema |
| hero-transition | Frame 73 and 75 prompt/image files only | Root registers and maps selected assets |
| why-maker | Frame 74 prompt/image files only | Root registers and maps selected asset |
| root | shared lock, `asset-registry.json`, `stage-review.json`, `landing-materials.md`, `worklog.md`, finalization | Final integrated Stage 3 package |

Workers share the same dirty workspace. No branch may revert, replace, or clean another branch's changes. Generated assets are versioned under `revision-r4`; R2/R3 files are preserved.

## Join contract

- Narrative branch returns one schema-preserving canonical JSON with the fixed six-report-section contract and a twelve-module `landing_page_composition`.
- Image branches return final project-local PNGs and self-contained prompt records that repeat the shared lock.
- Root checks file existence, image dimensions, unique IDs, asset provenance, every-asset section mapping, review state, deterministic validation, report registration, and registration drift.
- If one image branch fails, root may keep its preceding active asset while integrating the successful narrative and other image; no placeholder or invented provenance is allowed.
