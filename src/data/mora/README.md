# MORA landing module ownership

The landing is split into three independently editable surfaces. Keep these boundaries when working in separate sessions.

| Session | Owns | May change | Must not change |
| --- | --- | --- | --- |
| Text | `copy.js` | User-facing copy, labels, anchors, alt text | Asset paths, React, layout, theme |
| Image | `assets.js` and the registered Stage 3 image files | Asset role-to-file assignments | Copy, React, layout, theme |
| UI | `src/components/mora-landing/`, `src/pages/MoraLandingPage.jsx`, MORA stories, theme | Components, grid, spacing, typography, scroll behavior | Copy wording, registered asset paths |

`content.js` is the integration boundary. It joins stable copy IDs to stable asset roles and is not owned by an ordinary text, image, or UI session. Edit it only when a key, role, or schema changes.

## Working contract

- Text edits preserve section, product, statement, process, and phase keys.
- Image swaps preserve exported asset role names.
- UI consumes only `content.js`; components receive data through props.
- UI components must not import `copy.js`, `assets.js`, or `content.js`.
- Do not hand-edit generated files under `public/brand-reports/`.
- Run `pnpm check:mora-boundaries` before handing work to another session.
