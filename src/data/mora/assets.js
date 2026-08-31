/**
 * MORA Landing — Asset Map
 * S3 Landing Materials R2/R3 확정 에셋 38장 + SVG 1장
 * 자동 생성 금지 — canonical source: asset-registry.json
 */

const A = '/mora-assets';

const assets = {
  // Hero
  heroAtelier: `${A}/st3-hero-empty-atelier-40.png`,

  // Why MORA
  whyMoraMaker: `${A}/st3-why-mora-maker-41.png`,

  // Etchings — narrative
  etchBrandTrace: `${A}/st3-etch-r2-42.png`,
  etchFirstFurrow: `${A}/st3-etch-r2-43.png`,
  etchClothToBody: `${A}/st3-etch-r2-45.png`,

  // Etchings — material plates
  etchThymeHoney: `${A}/st3-etch-r2-46.png`,
  etchFigLeaf: `${A}/st3-etch-r2-47.png`,
  etchBuckwheat: `${A}/st3-etch-r2-48.png`,
  etchCitrusPeel: `${A}/st3-etch-r2-49.png`,
  etchBlackSesame: `${A}/st3-etch-r2-50.png`,
  etchOliveOil: `${A}/st3-etch-r2-51.png`,

  // Material Method
  methodProcessTable: `${A}/st3-method-r2-52.png`,
  methodIngredientAtlas: `${A}/st3-method-r2-53.png`,
  methodInfusionLadder: `${A}/st3-method-r2-54.png`,
  methodFoldTrace: `${A}/st3-method-r2-55.png`,

  // Vessel
  vesselMaster: `${A}/st3-vessel-glass-r2-56.png`,
  vesselOpenService: `${A}/st3-vessel-glass-r2-57.png`,
  vesselClosureProof: `${A}/st3-vessel-glass-r2-58.png`,
  vesselSvg: `${A}/vessel-record-spec.svg`,

  // Products — glass front R2
  productThymeHoney: `${A}/st3-product-glass-thyme-honey-59.png`,
  productFigLeaf: `${A}/st3-product-glass-fig-leaf-60.png`,
  productBuckwheat: `${A}/st3-product-glass-roasted-buckwheat-61.png`,
  productCitrusPeel: `${A}/st3-product-glass-citrus-peel-62.png`,
  productBlackSesame: `${A}/st3-product-glass-black-sesame-63.png`,
  productOliveOil: `${A}/st3-product-glass-olive-oil-sea-salt-64.png`,

  // Glass Context
  inspectionFront: `${A}/st3-glass-context-r2-65.png`,
  inspectionSide: `${A}/st3-glass-context-r2-66.png`,
  customerPeelSpoon: `${A}/st3-glass-context-r2-67.png`,

  // Ingredients — aerial
  ingredientThymeHoney: `${A}/st3-ref-ingredient-thyme-honey-19.png`,
  ingredientFigLeaf: `${A}/st3-ref-ingredient-fig-leaf-20.png`,
  ingredientBuckwheat: `${A}/st3-ref-ingredient-roasted-buckwheat-21.png`,
  ingredientCitrusPeel: `${A}/st3-ref-ingredient-citrus-peel-22.png`,
  ingredientBlackSesame: `${A}/st3-ref-ingredient-black-sesame-23.png`,
  ingredientOliveOil: `${A}/st3-ref-ingredient-olive-oil-sea-salt-24.png`,

  // R3 — detail
  firstSpoonMacro: `${A}/st3-detail-r3-68.png`,

  // R3 — use moments
  momentMorning: `${A}/st3-moment-r3-69.png`,
  momentAfternoon: `${A}/st3-moment-r3-70.png`,
  momentEvening: `${A}/st3-moment-r3-71.png`,

  // R3 — transition
  clothTransition: `${A}/st3-transition-r3-72.png`,
};

// Etching groups for easy access
export const narrativeEtchings = {
  brandTrace: assets.etchBrandTrace,
  firstFurrow: assets.etchFirstFurrow,
  clothToBody: assets.etchClothToBody,
};

export const ingredientEtchings = {
  'thyme-honey': assets.etchThymeHoney,
  'roasted-buckwheat': assets.etchBuckwheat,
  'citrus-peel': assets.etchCitrusPeel,
  'black-sesame': assets.etchBlackSesame,
  'fig-leaf': assets.etchFigLeaf,
  'olive-oil': assets.etchOliveOil,
};

export default assets;
