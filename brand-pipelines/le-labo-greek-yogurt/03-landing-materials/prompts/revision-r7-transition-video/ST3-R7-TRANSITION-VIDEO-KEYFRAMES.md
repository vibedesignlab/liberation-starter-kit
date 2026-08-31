# ST3 R7 — “What happens in between” transition keyframes

## Purpose

Create a continuous 3:2 image sequence for the landing section headed “We do not hide what happens in between.” The current wide aerial photograph is `KF00`. The second yogurt vessel from the left—the small cloth-lined stainless strainer—is the sole camera target.

## Continuity contract

- Preserve the strict 90° aerial camera axis, workshop surface, upper-right motivated task light, neutral-warm grade and restrained analog magazine grain.
- `KF00 → KF03` is one continuous camera push. The target strainer moves to center because the camera reframes toward it.
- The large left vessel, right finished-yogurt bowl and surrounding props leave only through progressive edge cropping. They must never disappear, dissolve, morph or get independently replaced.
- Surface activity is restrained food-native evidence: sparse air cells, collapsed microbubble dimples and a shallow translucent acid-whey membrane with a real meniscus. Never boiling, soap, decorative foam or CGI liquid.
- `KF04` is a low-contrast photographic bridge. `KF05` is the exact runtime background token `#F5F1E8`, produced deterministically rather than color-guessed by the image model.
- No text, label, logo, watermark, hand, new vessel, new tool, garnish, split screen or montage.

## Sequence

| Frame | Motion progress | Visual role |
| --- | ---: | --- |
| `KF00` | 0.00 | Existing wide source photograph; headline is readable over the central worktop. |
| `KF01` | 0.22 | About 12% push-in; second vessel from left reaches center; all neighboring objects remain visible. |
| `KF02` | 0.46 | Center vessel reaches about half the frame width; neighbors remain as continuous edge crops; separation begins. |
| `KF03` | 0.70 | Yogurt surface dominates; cloth and steel rim remain; bubbles and shallow whey membrane are legible. |
| `KF04` | 0.88 | Extreme material field; hard environmental edges have passed beyond the crop; low-contrast warm-cream bridge. |
| `KF05` | 1.00 | Exact flat `#F5F1E8`; transition handoff to the following horizontal section. |

## Generated edit prompts

### KF01 — center push

Image 1 is the immutable base scene and continuity authority. Create the immediately following moment from Image 1. Change only the camera crop and spatial emphasis: make a restrained continuous push-in of about 12% toward the small cloth-lined stainless strainer that is second from the left among the three large yogurt vessels along the bottom edge. Shift that exact small strainer smoothly so its center lands on the horizontal centerline. Preserve every surrounding object. The larger cloth-lined vessel on the left and finished-yogurt bowl with spatula on the right remain visibly continuous and become only slightly more cropped at the edges. Preserve the upper-right cups, shaker, folded cloth, amber bowl and spoon, lower-left whey bowl, stainless grain, light, shadows, reflections, color and grain. Strict 90° aerial view; same 3:2 frame; no added or removed object, no text and no CGI gloss.

### KF02 — separation emerges

Image 1 is the immediately preceding frame and continuity authority. Push the same overhead camera farther toward the centered strainer until the vessel occupies approximately 48–52% of frame width. Preserve the target geometry, cloth folds, perforated metal and yogurt landmarks. Left and right neighboring vessels remain recognizable partial continuations at their corresponding edges and leave only through natural crop. On the centered yogurt only, reveal a few irregular pinhead and pea-sized air cells and two or three shallow translucent pale straw-grey acid-whey pockets at existing low points near the cloth edge. Preserve dense curd weight. This is early separation, not boiling, foam, soap or splashing. Lock light, reflection, shadow, color, grain and aerial axis.

### KF03 — material zoom

Image 1 is the immediately preceding frame and continuity authority. Continue the exact centered aerial push until the same yogurt surface occupies roughly 78–84% of frame area. Preserve arcs of the same cloth and perforated rim around the outer frame and thin naturally cropped fragments of neighboring vessels where geometry allows. Advance only the material evidence: sparse rounded air cells, collapsed microbubble dimples and a thin connected translucent acid-whey membrane along natural curd seams and one cloth-contact edge. Keep most yogurt matte, dense and gravity-set. Preserve the same light, grade, grain, contact and highlight detail.

### KF04 — cream blend bridge

Image 1 is the immediately preceding frame and continuity authority. Continue the same strict aerial push into one pale whey-rich region of the same yogurt surface until material alone fills the frame. Cloth, rim and neighbors leave only by passing beyond the crop. Show dense cultured-milk ivory relief beneath a shallow translucent whey veil, sparse collapsed bubble dimples, soft organic gradients and fine analog grain. Let focus settle slightly beyond the surface so the smallest detail becomes gently soft and low-contrast while broad dairy structure remains faintly legible. Lift the field naturally toward `#F5F1E8` without clipping, with nearly uniform warm-cream outer edges for the final crossfade. No metal, cloth, vessel, prop, text or hard dark edge remains in this final crop.

## Delivery notes

- Built-in image generation/editing was used for `KF01–KF04`.
- Generated native size: 1536 × 1024.
- Project delivery size: 3072 × 2048 PNG.
- `KF05` is a deterministic 3072 × 2048 PNG filled with the exact site background token `#F5F1E8`.
