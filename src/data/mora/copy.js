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
      headline: 'The work continues at the table.',
      body: 'The maker decides what may leave. Someone else decides how it belongs.',
      imageAlt: 'A lived-in shared table after serving MORA Thyme Honey yogurt with rye and roasted pear',
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
    {
      phase: 'SEE',
      label: 'The Last Check',
      desc: 'The food, the fold and the person who passed it leave the workshop together.',
      imageAlt: 'MORA maker completing the final check beside yogurt, whey and a populated Batch Record',
    },
    {
      phase: 'READ',
      label: 'The Handover',
      desc: 'Recipe, process and final check are recorded before the cup reaches the table.',
      imageAlt: 'Household culinary curator reading the populated MORA Thyme Honey Batch Record',
    },
    {
      phase: 'OPEN',
      label: 'The Pairing',
      desc: 'The seal breaks on a working counter, beside warm rye and roasted pear.',
      imageAlt: 'MORA Thyme Honey yogurt opened beside warm rye and roasted pear on a working kitchen counter',
    },
    {
      phase: 'TASTE',
      label: 'The First Plate',
      desc: 'Thyme Honey stays inside the yogurt; the first spoon carries the fold into the meal.',
      imageAlt: 'Thyme Honey yogurt served with rye and roasted pear while the open MORA jar remains nearby',
    },
  ],

  recipeSlides: [
    {
      id: 'thyme-honey',
      number: '01',
      name: 'Thyme Honey',
      headline: 'Honey folded with thyme, not poured on top.',
      desc: 'Wild thyme steeped into raw honey at low heat. The infused honey is folded once into strained yogurt — no drizzle, no swirl.',
    },
    {
      id: 'roasted-buckwheat',
      number: '02',
      name: 'Roasted Buckwheat',
      headline: 'Toasted grain traced inside, not scattered on the surface.',
      desc: 'Hulled buckwheat dry-roasted until the kernel darkens. Ground to a coarse meal and folded through, leaving the grain visible in every spoon.',
    },
    {
      id: 'citrus-peel',
      number: '03',
      name: 'Citrus Peel',
      headline: 'Peel threaded through, not tinted across.',
      desc: 'Hand-peeled zest blanched twice to remove bitterness. Fine threads are folded in so aroma arrives without altering the yogurt body.',
    },
    {
      id: 'black-sesame',
      number: '04',
      name: 'Black Sesame',
      headline: 'Sesame depth meeting yogurt brightness in one fold.',
      desc: 'Seeds slow-roasted and stone-ground into a dense paste. The dark fold meets the bright yogurt in one pass — no blending, no uniform tone.',
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
