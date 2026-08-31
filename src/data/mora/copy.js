/**
 * MORA landing copy source.
 *
 * Text-session ownership: user-visible language, labels, alt text and anchors.
 * This module must stay free of image imports, image URLs and React/UI code.
 */

const copy = {
  navigation: {
    brandLabel: 'MORA',
    brandHref: '#',
    links: [
      { label: 'Collection', href: '#collection' },
      { label: 'Method', href: '#transformation' },
      { label: 'Vessel', href: '#vessel' },
      { label: 'Truth', href: '#truth' },
    ],
  },

  sections: {
    hero: {
      headline: 'Choosing good ingredients is not where we stop.',
      support: 'MORA’s maker selects each ingredient, watches every transformation, and checks the final cup before it leaves the workshop.',
      ctaLabel: 'Compare all six recipes',
      ctaHref: '#collection',
      imageAlt: 'MORA maker selecting raw ingredients',
    },
    brandTrace: {
      imageAlt: 'The Trace That Remains',
    },
    transition: {
      headline: 'We do not hide\nwhat happens in between.',
      ctaLabel: 'See the final check',
      ctaHref: '#vessel',
      imageAlt: 'Straining cloth separating concentrated yogurt and whey',
    },
    whyMora: {
      makerAlt: 'MORA maker comparing accepted and rejected ingredients',
      etchingAlt: 'The First Furrow',
    },
    coreCollection: {
      title: 'Vol. 1 — Four Directions',
      body: 'Four directions held to one final judgment.',
      ctaLabel: 'See Core Collection',
      ctaHref: '#collection',
      mainImageAlt: 'Core Collection last fold and final check',
    },
    studioTrials: {
      title: 'Studio Trials',
      body: 'Two conditional directions, never released before verification.',
      ctaLabel: 'See verification criteria',
      ctaHref: '#truth',
      mainImageAlt: 'Studio Trials conditional intermediate-state check',
    },
    clothToBody: {
      imageAlt: 'From Cloth to Body',
    },
    materialMethod: {
      headline: 'Each ingredient prepared\ndifferently. Folded once.',
      ctaLabel: 'See the Batch Record',
      ctaHref: '#vessel',
      imageAlt: 'Six ingredient preparations and one final fold',
    },
    evening: {
      headline: 'A table for one cup.',
      body: 'One jar, one spoon, and nothing staged beyond use.',
      imageAlt: 'MORA yogurt and spoon on a quiet evening table',
      productName: 'MORA Craft Greek Yogurt',
    },
  },

  newsletter: {
    headline: 'Only what we checked gets recorded.',
    body: 'Launch information and records, only after real verification.',
    emailPlaceholder: 'Email',
    ctaLabel: 'Get launch notes',
    ctaHref: '#',
  },

  footer: {
    legal: '© 2026 MORA. All images are commercial photography direction visualizations.',
    facts: 'Refrigerated direction · 150 g candidate · Wide-mouth vessel · Partial Batch Record',
  },

  statements: [
    { id: 'sb1', statement: 'We do not hide what happens in between.' },
    { id: 'sb2', statement: 'Each ingredient prepared differently. Folded once.' },
    { id: 'sb3', statement: 'Food in view. Verified facts on a partial Batch Record.' },
  ],

  values: [
    { name: 'Responsible selection', copy: 'What falls outside the standard matters as much as what is chosen, and every choice leaves a reason.' },
    { name: 'Visible transformation', copy: 'Culturing, separation, ingredient preparation and the last fold remain visible before the finished cup.' },
    { name: 'Precision to the final cup', copy: 'The actual state is checked before release, and only the responsible maker and verified result are recorded.' },
  ],

  processSteps: [
    { step: 1, label: 'Selection', desc: 'Compare and separate ingredients inside and outside the approved standard.' },
    { step: 2, label: 'Culturing', desc: 'Validate culture conditions and the stopping point through real R&D records.' },
    { step: 3, label: 'Separation', desc: 'Inspect the concentrated body in cloth alongside the whey that leaves it.' },
    { step: 4, label: 'Ingredient Preparation', desc: 'Prepare each ingredient as its own factual intermediate state.' },
    { step: 5, label: 'Last Fold', desc: 'Use one broad-tool fold to leave the ingredient trace intact.' },
    { step: 6, label: 'Packaging / Final Check', desc: 'Inspect the actual food and its partial Batch Record together.' },
  ],

  products: [
    {
      id: 'thyme-honey', name: 'Thyme Honey', role: 'core', momentLabel: 'Morning',
      productAlt: 'Thyme Honey MORA yogurt jar', ingredientAlt: 'Thyme and honey raw ingredients', etchingAlt: 'Thyme Honey material folio',
    },
    {
      id: 'roasted-buckwheat', name: 'Roasted Buckwheat', role: 'core', momentLabel: 'Afternoon',
      productAlt: 'Roasted Buckwheat MORA yogurt jar', ingredientAlt: 'Roasted buckwheat raw ingredient', etchingAlt: 'Roasted Buckwheat material folio',
    },
    {
      id: 'citrus-peel', name: 'Citrus Peel', role: 'core',
      productAlt: 'Citrus Peel MORA yogurt jar', ingredientAlt: 'Citrus peel raw ingredient', etchingAlt: 'Citrus Peel material folio',
    },
    {
      id: 'black-sesame', name: 'Black Sesame', role: 'core',
      productAlt: 'Black Sesame MORA yogurt jar', ingredientAlt: 'Black sesame raw ingredient', etchingAlt: 'Black Sesame material folio',
    },
    {
      id: 'fig-leaf', name: 'Fig Leaf', role: 'trial', status: 'Safety review',
      productAlt: 'Fig Leaf MORA yogurt trial jar', ingredientAlt: 'Fig leaf raw ingredient', etchingAlt: 'Fig Leaf material folio',
    },
    {
      id: 'olive-oil', name: 'Olive Oil & Sea Salt', role: 'trial', status: 'Stability testing', momentLabel: 'Evening (Studio Trial)',
      productAlt: 'Olive Oil and Sea Salt MORA yogurt trial jar', ingredientAlt: 'Olive oil and sea salt raw ingredients', etchingAlt: 'Olive Oil and Sea Salt material folio',
    },
  ],

  vesselPhases: [
    { phase: 'SEE', label: 'See', desc: 'See the actual food, fill level and partial Batch Record together.', imageAlt: 'Sealed MORA jar showing food and partial Batch Record' },
    { phase: 'READ', label: 'Read', desc: 'Separate fixed food facts from the authentic maker-check field.', imageAlt: 'Partial Batch Record with fixed facts and blank maker-check field' },
    { phase: 'OPEN', label: 'Open', desc: 'Remove the food seal and inspect the wide, clean rim.', imageAlt: 'Hand removing the food seal from a wide-mouth MORA jar' },
    { phase: 'TASTE', label: 'Taste', desc: 'Confirm density and internal trace in the first spoon section.', imageAlt: 'First spoon showing yogurt density and ingredient trace' },
  ],

  recipeSlides: [
    {
      id: 'thyme-honey',
      number: '01',
      name: 'Thyme Honey',
      headline: 'Honey folded with thyme, not poured on top.',
    },
    {
      id: 'roasted-buckwheat',
      number: '02',
      name: 'Roasted Buckwheat',
      headline: 'Toasted grain traced inside, not scattered on the surface.',
    },
    {
      id: 'citrus-peel',
      number: '03',
      name: 'Citrus Peel',
      headline: 'Peel threaded through, not tinted across.',
    },
    {
      id: 'black-sesame',
      number: '04',
      name: 'Black Sesame',
      headline: 'Sesame depth meeting yogurt brightness in one fold.',
    },
  ],

  facts: [
    { label: 'Refrigerated direction', verified: false },
    { label: '150 g candidate', verified: false },
    { label: 'Wide-mouth vessel', verified: false },
    { label: 'Partial Batch Record', verified: false },
  ],
};

export default copy;
