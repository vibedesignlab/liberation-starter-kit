# ST3 R10 — MORA Environment Master, Strict Front

## Role

Reusable environment, human-scale, material, and motivated-light authority for the MORA Revision 10 photographic series. This frame does not define a person, product, foreground action, or final page crop.

## Generation request

- Provider: fal.ai
- Model route: `openai/gpt-image-2`
- Quality: `high`
- Output format: PNG
- Requested native size: `2304 × 1536` (3:2)
- Mode: new generation

## Compiled prompt

Create a photorealistic architectural editorial photograph of one real, small, lived-in urban Greek-yogurt manufactury. This is an environment, material, and practical-light reference only: no person, no retail product, no hero action, no branding.

CAMERA AND GEOMETRY — exact 3:2 landscape, requested at 2304 × 1536. Strict straight-on 100% front view. The camera sensor plane is parallel to the rear wall and to the front face of the main workbench; verticals stay vertical and the bench front edge stays perfectly horizontal. Human eye/chest height, 45–50 mm documentary architectural feel, about 4–5 metres perceived distance. Level camera, no Dutch angle, no wide-angle stretching, no overhead view, no corner-perspective room reveal. Show an ordinary human-scale room rather than a grand factory.

SPACE — a compact working food manufactory with an irregular, repaired shell: one area of genuinely aged red-brown brick with uneven mortar and varied individual bricks, one separate area of sealed grey concrete with restrained trowel marks, and one separate area of patched warm-grey mineral plaster with irregular repair edges. These materials must remain physically distinct and must not share a repeating surface pattern. The room has a modest stainless food-preparation bench at normal waist height, not an oversized island. Food-contact surfaces are hygienically clean, while non-contact walls, floor edges, crate corners, bench legs, and hardware show accumulated ordinary use: localized scuffs, repairs, rubbed edges, slight misalignment, and small inconsistencies that follow real contact and gravity.

WORKING EVIDENCE — keep props sparse and functional. Include two or three food-safe cloth strainers or cloth-lined draining forms with natural woven cotton tension, folds, damp weight, and believable support; a few small fermentation record sheets or cards clipped near the work zone but turned, distant, blank, or otherwise carrying no readable characters; two or three scuffed food-safe storage crates placed where workers would actually reach them; and a limited number of plain stainless or glass working vessels at real culinary scale. No packaged MORA jar, no direct-print container, no decorative ingredient spread. Nothing floats. Supports, contact pressure, shadows, and reflections must agree.

MATERIAL RESPONSE — every surface has its own optical behaviour. Aged brick has irregular porous faces and non-uniform mortar joints. Sealed concrete has sparse trowel variation rather than speckles or cellular loops. Mineral plaster has matte patch boundaries and fine aggregate only where physically plausible. Brushed stainless has directional grain, subtle real scratches, rolled edges, welds, and long asymmetrical reflections caused by the room; never chrome CGI. Cotton cloth has fine separate weave and gravity-led creases, never a stamped or embossed motif. Glass is transparent with plausible refraction, thickness, and contact shadow. Do not apply one common texture, wear map, noise field, mottling, or distress overlay across different materials.

LIGHT — believable practical working light only. Cool-neutral daylight enters from a plausible off-camera side opening and is supplemented gently by one ordinary warm-neutral task fixture already mounted for work. One coherent light direction, continuous contact shadows, open readable midtones, restrained contrast, and realistic stainless reflections. No spotlighting, theatrical shafts, colored gels, glowing edges, fake window reflections, volumetric haze, or unexplained fill.

LIVED-IN CHARACTER — the arrangement is useful, slightly off-centre, and imperfect rather than art-directed. Bench, strainers, records, crates, and vessels should not form a symmetrical display. Leave small practical gaps, one slightly shifted crate, unevenly used hooks, and believable negative space. The room should feel maintained by a capable craftsperson across many batches, not newly distressed for a campaign.

CAPTURE AND FINISH — clean high-resolution digital editorial capture with natural acuity, moderate depth of field around an f/8 architectural photograph, realistic edge detail, and neutral color. No generated film grain, no scan softness, no halation, no HDR clarity, no excessive microcontrast, no bloom, no vignette, no mist, no global softness, and no fake analogue defects.

HARD EXCLUSIONS — no people, hands, faces, text, letters, numbers, logos, signs, labels, watermarks, product packaging, perfume silhouette, shop counter, retail display, farmhouse kitchen, domestic-styling cliché, broadcast studio, television kitchen, soundstage, luxury showroom, symmetrical set, CGI room, procedural textures, repeating bricks, tiled-looking concrete, identical wear marks, repeated cloth folds, ornamental props, floral styling, dark moody underexposure, or cinematic smoke.

The final image must read immediately as a real small Greek-yogurt working room photographed straight-on during an ordinary workday: repaired architecture, modest stainless equipment, genuine food-production evidence, real scale, coherent light, and accumulated use without staged nostalgia.

## Acceptance gate

- Exact returned dimensions are 2304 × 1536.
- Strict front axis is legible through horizontal bench edge and parallel wall plane.
- Room reads as a small real manufactury, not a set, showroom, boutique, or domestic kitchen.
- Brick, concrete, plaster, stainless, cloth, and glass retain materially different non-repeating responses.
- Practical daylight/task-light physics remain coherent and midtones readable.
- No person, brand, logo, readable text, product jar, generated grain, HDR finish, or global softness.

## Retry rule

At most one targeted new-generation retry is allowed, and only if the first result reads as a studio/set or multiple materials share an obvious procedural texture. Any retry must change only that failed axis while preserving the camera, scale, scene purpose, and all other locks above.
