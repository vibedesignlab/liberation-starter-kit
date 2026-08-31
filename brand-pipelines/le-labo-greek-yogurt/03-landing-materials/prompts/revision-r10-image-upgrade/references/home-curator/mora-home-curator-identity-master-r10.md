# MORA R10 — Household Culinary Curator Identity Master

## Role

- Commercial-photo-prompting mode: Compile / Generate.
- Reusable human identity authority for the downstream READ and OPEN scenes only.
- This woman is a household culinary curator and must remain visibly distinct from the older workshop maker identity.
- Downstream frames may inherit facial identity, age, skin, hair and plain clothing only; this square portrait is not a scene, action, background or camera-composition template.

## Generation request

- Provider: fal.ai
- Model endpoint: `openai/gpt-image-2`
- Quality: `high`
- Output format: PNG
- Requested native size: `2048 × 2048`
- Mode: new generation with no image inputs

## Exact generation prompt

<!-- PROMPT_START -->
Use case: photorealistic-natural.

Asset type: high-fidelity square human identity reference for consistent READ and OPEN household editorial photography. This is an identity authority only, not a scene-composition reference.

Scene/backdrop: one plain, quiet neutral warm-grey background with even low-detail tone. No room, kitchen, workshop, architecture, gradient hotspot, texture pattern or set dressing.

Subject: exactly one Korean woman in her late 30s to early 40s, visibly distinct from the older workshop maker. She is a calm, analytical household culinary curator who takes responsibility for what reaches the family table without performing a social stereotype. Strict front-facing chest-up portrait, shoulders square and relaxed, head upright, eyes naturally open and looking directly toward the camera, mouth at rest, composed attentive expression. No smile performance, severity, maternal pose, glamour or fashion attitude.

Distinct identity: a softly angular oval face with a gently defined jaw, moderate cheek volume, naturally straight dark eyebrows, coherent almond-shaped brown eyes, a physically formed nose and unretouched lips. Maintain subtle natural left-right differences in brow height, eyelid fold and cheek contour without anatomy failure. She must not resemble the older workshop maker, inherit the maker's gathered-back hair silhouette or read as the same person at a younger age.

Skin and anatomy: natural age-appropriate unretouched skin with irregular pores that vary by facial region, fine lines around eyes and mouth, gentle under-eye variation, small tonal differences, restrained capillary warmth at cheeks, nose and ears, and a continuous natural skin-tone gradient. Both eyes and pupils align plausibly; eyelids, lashes, nostrils, lips, ears, jaw, neck and shoulder transitions are physically coherent. Retain individual skin texture without beauty smoothing, uniform pore grids, wax or plastic gloss.

Hair: dark brown to near-black shoulder-length hair worn naturally down, parted slightly off-centre and tucked behind both ears so the face and full hairline remain clear. Show many separate fine strands, varied strand thickness and direction, small irregular flyaways and believable overlap at the neck and shoulders. Hair must not become glossy ribbons, rope-like loops, molded waves, merged chunks, a helmet silhouette or the workshop maker's tied-back style.

Clothing: one plain charcoal matte cotton shirt with a simple flat collar and ordinary shoulder seams. Dense but natural fabric weave, restrained real creasing and no visible brand. No jacket, apron, patterned textile, embossed motif, jewelry, accessory or decorative makeup.

Composition and photographic behavior: exact 1:1 square requested at 2048 × 2048. Centered strict front view, chest-up framing from upper chest through the complete head, with generous margin above the hair and beside both shoulders. Eye-level camera and restrained 70–90 mm portrait perspective feel without wide-angle distortion. Both eyes, face, ears, hairline, neck and shoulders remain in clear natural focus. Hands and forearms stay fully below frame.

Lighting and color: one broad neutral daylight source with a warm-grey environment response, approximately 4800–5200 K in appearance. Soft directional facial modeling, one coherent highlight direction, restrained specular response and a subtle natural shadow side. Open midtones, natural Korean skin color and accurate charcoal fabric. No rim light, colored practical, dramatic shadow division or beauty-light symmetry.

Medium and finish: clean contemporary high-resolution digital editorial portrait, photorealistic, with natural microcontrast and invisible retouching that preserves real asymmetry and individual texture. No film grain, scan softness, halation, vignette, HDR, excessive clarity, cinematic grade, sepia, teal-orange treatment, CGI polish, glamour retouch, artificial sharpening or makeup-campaign finish.

Constraints: exactly one adult woman; no hands, forearms, tool, food, jar, label, plate, text, letter, number, logo, watermark, prop, room, kitchen, workshop, hat, apron, jewelry, smile pose, extreme expression, profile or three-quarter turn. No malformed anatomy, duplicated feature, crossed eyes, wax skin, plastic skin, uniform pore pattern, ribbon hair, merged strands, patterned fabric or resemblance to the older workshop maker.
<!-- PROMPT_END -->

## Acceptance gate

- Exact RGB PNG at 2048 × 2048 from fal.ai `openai/gpt-image-2`, quality `high`.
- One Korean woman in her late 30s–early 40s; strict front-facing chest-up view.
- Visibly separate identity and down/tucked shoulder-length hair silhouette from the older tied-back workshop maker.
- Calm analytical household food-curator presence without stereotype, smile performance or glamour.
- Natural regional pores, fine lines, tonal variation and coherent anatomy; no wax/plastic skin.
- Separate fine hair strands, believable hairline and flyaways; no ribbon or molded hair.
- Plain charcoal shirt; hands, props, text, logo and watermark absent.
- Neutral warm-grey background and clean digital response; no grain, scan softness or HDR.

## Retry rule

At most one targeted new-generation retry is allowed, only for wax/plastic skin, ribbon or merged hair, or facial anatomy failure. A retry must preserve identity concept, age, front-facing chest-up composition, clothing, background, lighting and all other locks.

## Production provenance

Generation result, request ID, dimensions, SHA-256 and original-size QA are recorded in the matching manifest.

## Production result

- fal.ai request ID: `01a0589b-8992-7b30-bfe5-38cf2fa70f34`.
- Model endpoint: `openai/gpt-image-2`.
- Request controls: `quality: high`; `image_size: { width: 2048, height: 2048 }`; `output_format: png`; `num_images: 1`; opaque background.
- Remote result: `https://v3b.fal.media/files/b/0aa890e3/SaxoakwAvphexFQsYI7Yo_73xF5TVb.png`.
- Local master: `assets/revision-r10-image-upgrade/references/home-curator/mora-home-curator-identity-master-r10.png`.
- Verified native format and dimensions: RGB PNG, 2048×2048, 6,075,815 bytes.
- SHA-256: `7615a382b9877d521a712fa69f2dbe4f72ceb1175811dda029c259d1642b951d`.
- Generation count: one primary result; no retry.

## Original-size QA

- Pass — one Korean woman in the requested late-30s to early-40s range, strict front-facing chest-up framing, direct calm analytical gaze and complete head/shoulder silhouette.
- Pass — visibly distinct from the older workshop maker through age, facial identity, shoulder-length hair worn down and flat-collar shirt rather than tied-back hair and work jacket.
- Pass — both eyes, pupils, eyelids, brows, nose, lips, ears, jaw and neck remain coherent, with subtle natural facial asymmetry.
- Pass — regional pores, fine forehead/eye/mouth lines, under-eye variation and restrained cheek/nose tonal warmth remain visible without wax or plastic gloss.
- Pass — hairline, individual strands, varied strand direction and small flyaways remain legible; no ribbon, molded loop, rope or helmet behavior.
- Pass — plain charcoal matte shirt; no hand, forearm, prop, food, jar, text, logo, watermark, jewelry or patterned fabric.
- Pass — neutral warm-grey background and clean digital response; no visible film grain, scan softness, HDR, glamour grade or artificial sharpening.
- Residual risk — the identity master is intentionally neutral and front-facing; downstream READ/OPEN prompts must inherit only identity, age, skin, hair and clothing rather than copying this centered portrait composition or direct gaze.
