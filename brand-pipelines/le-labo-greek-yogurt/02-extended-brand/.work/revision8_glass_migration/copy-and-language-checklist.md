+# Stage 2 Revision 8 — Glass Migration Copy & Language Checklist
+
+## Audit boundary
+
+- Canonical source audited: `outputs/extended-brand-anatomy.json`.
+- Registry source audited: `asset-registry.json`.
+- Active/rendered visual audit: 14 file-path pointer occurrences, resolving to 14 active assets; 11 visual assets require migration and 3 process assets are retained.
+- Text audit: 176 canonical locations plus 17 registry locations require context-aware migration, for 193 total.
+- Protected serving language: 55 ordinary Korean `한 컵` locations remain unchanged. Six additional `한 컵` occurrences sit inside sentences that also define physical package architecture; review and rewrite those full sentences without deleting the serving meaning.
+- This checklist prepares integration only. Do not rewrite Stage 2 canonical JSON, the registry, report, review, registration, or existing assets from this folder.
+
+## Deterministic replacement order
+
+Apply these rules in order to each exact location listed in `migration-manifest.json`. Read the full sentence before changing a noun.
+
+### 1. Rename the named package system
+
+- Replace the exact named system `MORA Clear Witness Cup` with `MORA Glass Vessel Record`.
+- Replace abbreviated named-system uses such as `Clear Witness` only when they refer to the same MORA package system.
+- Do not rename a historical source filename or legacy generation record in place. Preserve that evidence in an archived/history field and write a new active record for the glass asset.
+
+### 2. Classify “cup” before touching it
+
+Use this decision:
+
+1. If `cup/컵/한 컵` means a serving, eating moment, customer ritual, or amount, preserve it.
+2. If it is modified by package-architecture language such as transparent/clear, wall, sidewall, rim, flange, foil, seal, fill line, low-wide, diameter-height ratio, direct print, open/closed/sealed, primary, single-serve, or unit pack, replace the physical package description with the glass-vessel system.
+3. If it names a process tool such as a dose cup or measuring cup, preserve the tool term and explicitly keep it food-safe glass only where the scene requires it.
+4. If it describes an external molded-fiber two-unit carrier or multipack, preserve it as secondary packaging.
+
+Never run a generic `cup → jar` substitution. Prefer `MORA Glass Vessel Record`, `heavy clear-glass wide-mouth vessel`, or the natural Korean equivalent `두꺼운 투명 유리 광구 용기` for primary packaging.
+
+### 3. Lock the new physical architecture
+
+Any sentence that defines the primary package must remain compatible with all of the following:
+
+- Heavy optically clear flint glass, with a credible thick wall and base.
+- Cylindrical food-native body, short shoulder, and wide spoonable mouth.
+- A very thin graphite anodized-aluminum cap equal to 4–6% of the closed vessel height.
+- A real full-perimeter peelable foil tamper seal beneath the cap.
+- Restrained neutral-black direct print on the glass.
+- No plastic/polymer primary cup, molded flange, paper label, sticker, sleeve, opaque backing field, tall cap, perfume neck, dropper, or apothecary fantasy.
+
+Do not turn directional imagery into unverified production claims. Resin, glass formulation, foil laminate, coating, print method, recyclability, leak performance, food-contact approval, shelf life, and line feasibility remain validation items unless a verified source is supplied.
+
+### 4. Rebuild closure language as a stack
+
+When a sentence describes opening, sealing, or package anatomy, write the sequence in this physical order:
+
+`food → heavy glass vessel → direct print on glass → peelable foil seal bonded at the glass mouth → thin graphite cap → optional external fiber multipack`
+
+- `Foil lid` must not read as the outermost permanent closure. It is the tamper seal beneath the cap.
+- Replace `cup sealer` only when it refers to the active packaging line; use a neutral phrase such as `glass-mouth foil-sealing station` and keep validation boundaries.
+- Replace `flange` or molded-rim language with a credible glass mouth/finish and foil-bonding surface. Do not invent thread, torque, or line specifications.
+- Opening sequence: cap removed first, foil peeled second, spoon enters third.
+
+### 5. Preserve direct print, but move its substrate
+
+- Keep the direct-print principle and restrained black identity.
+- Rewrite `print on transparent cup/polymer wall` as `direct black print on the clear glass wall`.
+- Approved visible front identity for product imagery is limited to `MORA` plus the recipe name unless a later copy system explicitly authorizes more.
+- Do not add a paper label, adhesive label, backing patch, shrink sleeve, or flavor-color block.
+
+### 6. Preserve ordinary “한 컵”
+
+Keep phrases such as `오늘의 한 컵`, `한 컵을 고른다`, `한 컵의 경험`, or `한 컵으로 먹는다` when they refer to serving or experience. A package migration does not require deleting the brand’s ordinary food language.
+
+If the same sentence also says `낮고 넓은 컵`, `밀봉된 한 컵`, `한 컵 반경`, or otherwise encodes package geometry, preserve the serving proposition but rewrite the physical clause. Example:
+
+- Before: `낮고 넓은 투명 컵 안에서 한 컵의 흔적을 본다.`
+- After: `두꺼운 투명 유리 광구 용기 안에서 한 컵의 흔적을 본다.`
+
+### 7. Preserve external fiber only as secondary packaging
+
+- An external molded-fiber two-unit carrier or multipack may remain.
+- State explicitly that it does not touch food and is not the primary vessel.
+- Remove any wording that wraps, collars, sleeves, or obscures the individual glass vessel.
+- Do not infer sustainability, recyclability, or material certification.
+
+## Exact system substitutions
+
+| Legacy meaning | Required active meaning |
+| --- | --- |
+| MORA Clear Witness Cup | MORA Glass Vessel Record |
+| transparent polymer/resin primary cup | heavy optically clear flint-glass wide-mouth primary vessel |
+| low-wide molded cup architecture | cylindrical heavy-glass body, short shoulder, wide spoonable mouth, thick wall/base |
+| foil as exposed top lid | peelable foil tamper seal beneath a thin cap |
+| rigid or bulky lid | graphite anodized-aluminum cap, 4–6% of closed-vessel height |
+| direct black print on clear polymer wall | restrained neutral-black direct print on clear glass |
+| individual paper label/sleeve | remove; direct print remains |
+| external molded-fiber multipack | preserve as optional secondary packaging only |
+| ordinary Korean 한 컵 | preserve when it means serving, ritual, or experience |
+
+## Provenance rule
+
+Legacy generation provenance is historical evidence. Do not rewrite “this image was generated as a polymer cup” into a false glass claim. Instead:
+
+1. archive the old entry or move its provenance to migration history;
+2. create a new active asset record for the glass result;
+3. record the Stage 3 R2 reference ID, new Stage 2 destination, generation/copy action, date, dimensions, and QA;
+4. rebind active report pointers only after the new file exists.
+
+## Integration QA
+
+- Every destination in `migration-manifest.json` exists before a canonical or registry pointer is changed.
+- Each active asset ID resolves to exactly one current file and one communication job.
+- The overloaded old `ST2-BRAND-MOOD-01` binding is split: Why MORA becomes the registered story anchor; the frontal final-inspection image remains a separate glass-context support role.
+- No active primary-package copy retains `Clear Witness`, polymer, plastic, resin, low-wide molded cup, primary flange, or exposed foil-as-lid semantics.
+- No protected ordinary `한 컵` phrase was removed merely because it contains `컵`.
+- External fiber language remains clearly secondary and external.
+- Cap height is stated as 4–6% wherever it is quantified.
+- Foil is beneath the cap and direct print is on the glass.
+- New registry provenance describes the new raster truth; legacy provenance remains archived rather than falsified.
+- File existence, dimensions, aspect ratio, text legibility, glass refraction, closure anatomy, contact shadows, and no-plastic constraints are checked before activation.
+

