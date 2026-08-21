# Post-approval design-token application contract

Use this contract after the user approves Phase 3, Visual Direction. Approval activates a bounded design-token patch; it does not authorize a general visual conversion of the product.

## Approval readiness

Apply tokens only when all of the following are true:

- The Visual Direction document is accepted.
- The approval prompt disclosed that approval would immediately apply only rows marked `apply`.
- Every `apply` row declares an exact token path, current value, approved value, target file, activation scope, and rationale.
- No approved value, target, scope, dependency, or overlapping dirty edit remains unresolved.

If any item is unresolved, ask only for the blocking decision and leave the code unchanged.

## Decision semantics

- `apply`: Change this token immediately after Visual Direction approval.
- `keep`: The token was reviewed and intentionally remains unchanged.
- `defer`: The direction is useful but unresolved, dependent on later work, or outside the token-only patch.

Only `apply` rows may mutate implementation files. A visual-direction statement does not become a token change unless it is represented by a complete `apply` row.

## Allowed changes

- The declared theme source file.
- The minimum theme export or registry change required to expose that theme.
- The minimum provider or theme-selection change required to activate the approved theme in the declared scope.
- The canonical Visual Direction document's application status and results.

## Disallowed changes

- Component markup, variants, or `sx` overrides.
- Page layouts, templates, routes, or navigation.
- Copy, content, fixtures, or application data.
- Images, illustrations, icons, or other assets.
- CSS overrides outside the declared theme target.
- Package installation, font download, or network-dependent setup unless separately authorized.
- Broad UI conversion, commit, push, or deployment.

If an approved font is not already available locally, mark that row `defer` or report it as blocked. Do not install or download it as part of this contract.

## Application method

1. Inspect the current theme implementation and dirty diff without changing unrelated work.
2. Derive the exact patch from complete `apply` rows only.
3. Patch the declared theme source with `apply_patch`.
4. Add only the minimum export, registry, provider, or selection wiring needed for the approved activation scope.
5. Verify every approved token's actual value in source.
6. Update the Visual Direction document's token-application result table and status.
7. Run focused static checks and the repository lint command.
8. Stop and report the applied scope. Treat component and page conversion as a separate, later task.

When an `apply` target overlaps edits that cannot safely be attributed to this task, pause and ask for the single blocking decision rather than overwriting the work.
