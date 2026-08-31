/**
 * MORA Landing — Content Data (English)
 */

import assets from './assets';

export const brand = {
  headline: 'A cup where ingredients leave their trace.',
  support: 'We show the process before the product.',
  primaryCta: 'See six directions',
  secondaryCta: 'See the method',
};

export const statements = [
  { id: 'sb1', statement: 'Not what to add, but what to leave behind.', image: assets.clothTransition },
  { id: 'sb2', statement: 'Same density, six ingredient directions.', image: assets.methodProcessTable },
  { id: 'sb3', statement: 'Instead of a label, a record on glass.', image: assets.vesselMaster },
];

export const values = [
  { name: 'Visible materiality', copy: 'Ribbons, particles, peels, marbles and oil interfaces — real traces you eat.' },
  { name: 'Measured transformation', copy: 'Measurement is not the goal; it protects the trace from being destroyed.' },
  { name: 'Quiet precision', copy: 'Sense is vivid, facts are understated. Unverified numbers stay blank.' },
  { name: 'Brief presence', copy: 'A precise trace is experienced briefly and clearly in one opening and one spoon.' },
];

export const processSteps = [
  { step: 1, label: 'Milk → Measure', desc: 'Weigh and log approved pasteurized milk.' },
  { step: 2, label: 'Heat → Body', desc: 'Heat-treat to build dense protein structure.' },
  { step: 3, label: 'Culture → Set', desc: 'Inoculate with measured starter and incubate.' },
  { step: 4, label: 'Set → Still', desc: 'Cool to slow further acidification.' },
  { step: 5, label: 'Set → Whey', desc: 'Strain through food-grade cloth to separate whey.', image: assets.etchClothToBody },
  { step: 6, label: 'Ingredient → Prep', desc: 'Prepare each ingredient by its own honest method.', image: assets.methodInfusionLadder },
  { step: 7, label: 'Base → Trace', desc: 'Fold minimally with a broad paddle to leave the trace.', image: assets.methodFoldTrace },
  { step: 8, label: 'Glass Vessel → Seal', desc: 'Cold-fill and foil-seal immediately.', image: assets.vesselClosureProof },
];

export const products = [
  {
    id: 'thyme-honey', name: 'Thyme Honey',
    role: 'core',
    product: assets.productThymeHoney, ingredient: assets.ingredientThymeHoney, etching: assets.etchThymeHoney,
    moment: assets.momentMorning, momentLabel: 'Morning',
  },
  {
    id: 'roasted-buckwheat', name: 'Roasted Buckwheat',
    role: 'core',
    product: assets.productBuckwheat, ingredient: assets.ingredientBuckwheat, etching: assets.etchBuckwheat,
    moment: assets.momentAfternoon, momentLabel: 'Afternoon',
  },
  {
    id: 'citrus-peel', name: 'Citrus Peel',
    role: 'core',
    product: assets.productCitrusPeel, ingredient: assets.ingredientCitrusPeel, etching: assets.etchCitrusPeel,
  },
  {
    id: 'black-sesame', name: 'Black Sesame',
    role: 'core',
    product: assets.productBlackSesame, ingredient: assets.ingredientBlackSesame, etching: assets.etchBlackSesame,
  },
  {
    id: 'fig-leaf', name: 'Fig Leaf',
    role: 'trial', status: 'Safety review',
    product: assets.productFigLeaf, ingredient: assets.ingredientFigLeaf, etching: assets.etchFigLeaf,
  },
  {
    id: 'olive-oil', name: 'Olive Oil & Sea Salt',
    role: 'trial', status: 'Stability testing',
    product: assets.productOliveOil, ingredient: assets.ingredientOliveOil, etching: assets.etchOliveOil,
    moment: assets.momentEvening, momentLabel: 'Evening (Studio Trial)',
  },
];

export const coreProducts = products.filter((p) => p.role === 'core');
export const trialProducts = products.filter((p) => p.role === 'trial');

export const vesselPhases = [
  { phase: 'SEE', label: 'See', desc: 'Through clear glass, the actual food is visible.', image: assets.vesselMaster },
  { phase: 'READ', label: 'Read', desc: 'Ingredient, method, trace — printed directly on glass.', image: assets.inspectionFront },
  { phase: 'OPEN', label: 'Open', desc: 'Remove the thin cap and full-perimeter seal.', image: assets.vesselOpenService },
  { phase: 'TASTE', label: 'Taste', desc: 'Confirm the density and internal trace with the first spoon.', image: assets.firstSpoonMacro },
];

export const facts = [
  { label: 'Refrigerated', verified: true },
  { label: '150 g', verified: true },
  { label: 'Glass vessel', verified: true },
  { label: 'Direct print', verified: true },
];

export const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'Method', href: '#transformation' },
  { label: 'Vessel', href: '#vessel' },
  { label: 'Truth', href: '#truth' },
];
