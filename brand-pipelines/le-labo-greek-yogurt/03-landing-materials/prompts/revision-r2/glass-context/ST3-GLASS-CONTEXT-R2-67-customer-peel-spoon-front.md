# ST3-GLASS-CONTEXT-R2-67 — Customer Peel and Spoon, Strict Front

## Mode and reference roles

- Mode: commercial-photo edit.
- Image 1: legacy open-and-spoon photograph; authority for the strict-frontal action crop, one natural hand, foil-peel phase, spoon placement, dense-yogurt furrow, plain mineral counter and soft daylight.
- Image 2: R2 Vessel Record master; sole authority for premium glass geometry, thick wall and base, short shoulder, wide mouth, thin graphite cap, direct-print identity and internal yogurt trace.
- Web role: customer-experience feature explainer. The information goal is the recognizable sequence cap removed -> real foil peeled -> dense food revealed -> first spoon trace.

## Exact edit prompt

Photorealistic premium food photograph. Replace only the old low plastic cup and packaging in Image 1 with one MORA R2 heavy clear-glass Greek-yogurt jar derived from Image 2, then adapt the existing hand/foil/spoon contact to the real glass mouth. Camera stays strict 0° frontal azimuth to the jar’s direct-printed face, with a restrained 10–12° downward elevation only to reveal the opening and action. The jar is cylindrical with a short rounded shoulder, wide spoonable mouth, optically clear thick wall, heavy base and believable edge refraction.

Show the opening sequence in one physically readable moment: the very thin flush graphite anodized-aluminum cap has already been unscrewed and lies flat on the counter to the jar’s left; exactly one natural adult hand enters from upper right and peels the real foil seal about 65% from its full-perimeter glass-mouth bond; the remaining foil-to-rim connection, clean peel edge and practical pull tab are visible; exactly one stainless teaspoon rests in the exposed dense yogurt, its bowl holding one restrained spoonful and leaving one clean furrow with an amber honey ribbon and sparse thyme flecks at edible scale. The spoon is supported by yogurt and rim, not by an invisible second hand.

Print exactly `MORA` and `THYME HONEY` in restrained neutral-black direct print on the glass front; no other words, numbers, batch data or pseudo-copy. Preserve Image 1’s hand identity and pose, nail and skin texture, foil-peel direction, spoon direction, product-centered crop, plain pale mineral surface, focus, soft upper-left daylight, neutral white balance, grounded contact shadows and invisible retouching. Maintain realistic skin pores and fine lines, foil crumple, brushed-steel spoon reflection, glass refraction, yogurt density and natural food asymmetry.

Constraints: exactly one hand, one glass jar, one cap, one foil and one spoon; no face, second hand, extra utensil, extra jar, plastic cup/case, molded flange, acrylic haze, paper label, sticker, sleeve, carton, carrier, tall cap, decorative top disk, narrow perfume neck, atomizer, dropper, medicine, whiskey, amber apothecary cue, prop ingredients, rustic styling, pseudo-copy, mutated logo or watermark. Do not imply freshness, food-contact approval, leak proof, sustainability or validated packaging performance.

Output: `assets/revision-r2/glass-context/mora-glass-customer-peel-spoon-front-r2.png`.

## QA gates

- Strict front azimuth; exact direct print remains readable and glass wall/base remain unobstructed.
- Cap is thin and removed; foil is the real attached seal and is 60–70% peeled.
- One natural hand, one supported spoon, dense yogurt and one internal trace are physically credible.
- No plastic, paper label, bulky closure, extra hand, extra jar or pseudo-copy.

## Production record

- Built-in imagegen edit with legacy customer-action photo as Image 1 and R2 vessel master as Image 2.
- Candidate 1 passed glass, foil, one-hand action, spoon support, direct print and food trace but the separate cap edge remained too tall.
- Delta 1 changed `cap_thickness` only, preserving every passing axis. Accepted.
- Native final: 1535 × 1024; SHA-256 `58d752094481f5363c837b572b82963d25edf363e4e7d40824915a1a8999c3c2`.
