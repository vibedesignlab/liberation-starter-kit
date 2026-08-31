# ST3-PACKAGING-VESSEL-RECORD-SPEC-25 — Exact Vector Print & Form Specification

## Purpose

Create the deterministic 1536 × 1536 vector authority for the MORA Vessel Record package. This file compensates for generated-photo text limitations and defines the exact form proportions, front direct-print hierarchy, one-ink production logic, and rear Material Plate micro-mark concept.

## Authority and boundary

- Output: `assets/reference-system/mora-vessel-record-print-spec.svg`.
- Background: Cultured Cream `#F5F1E8`; technical lines and copy: Record Black `#171714`; glass indication uses restrained warm-grey transparent strokes only.
- Source distance: translate Le Labo's disciplined record logic and raw-material visibility only. Never reproduce LE LABO or SANTAL wording, paper-label rectangles, formula grid, scent-number naming, city/name/date personalization, exact typography, or bottle trade dress.
- The SVG is a MORA technical specification, not proof of manufacturing feasibility, food-contact compliance, regulatory compliance, or an actual production lot.

## Artboard structure

1. Header: `MORA VESSEL RECORD` and `PRINT & FORM SPECIFICATION / REV 03`.
2. Primary front elevation: clear vessel silhouette, low graphite overcap, wide mouth, short shoulder, heavy base, centerline and dimension arrows.
3. Directional dimensions: body diameter `70 mm`, total height `110 mm`, wide mouth `55 mm`, shoulder `14% H`, heavy base `9% H`; mark all values `DIRECTIONAL / VERIFY WITH SUPPLIER`.
4. Exact front record column placed on the primary elevation.
5. Enlarged print-detail panel with exact hierarchy, font-class guidance, sizes, spacing, single 0.5 pt vertical rule and short baselines.
6. Rear-lower 16 mm Material Plate micro-mark concept, recipe-specific and subordinate to the front.
7. Production notes: one neutral-black direct print on clear glass; no paper/opaque backing; `24A01` is a sample batch-format token and must be replaced with a verified lot code before production.

## Exact front copy

`MORA`

`THYME HONEY / 01`

`INFUSED GREEK YOGURT`

`PREP / HONEY–THYME SYRUP`

`TRACE / AMBER RIBBON`

`150 g`

`BATCH / 24A01`

No city, customer name, personal name, prepared-for field, compounded-on field, date, handwritten personalization, or invented claim may appear.

## Typographic hierarchy

- Product name: compact grotesk uppercase, visually largest line.
- Brand: compact grotesk uppercase, 60–70% of product-name size.
- Category and field values: monospaced uppercase with open tracking.
- Field labels: monospaced uppercase, smaller and lighter than values.
- Numerals: tabular where supported.
- Print column: left aligned and narrow, not centered branding.
- Rule: one continuous 0.5 pt vertical rule; only short functional baselines. Never surround the copy with a rectangle or full grid.

## QA

- SVG parses without error at 1536 × 1536.
- All required copy is live SVG text and exactly spelled.
- Vessel silhouette shows the specified shoulder/base/mouth relationships and directional dimensions.
- Front hierarchy is legible at full size and remains a single one-ink direct-print column.
- Rear micro-mark remains 15–18 mm and does not compete with the front.
- Source-brand wording, paper label, personalization and unsupported claims are absent.
