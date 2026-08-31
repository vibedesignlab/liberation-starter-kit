/**
 * MORA Landing — Stage 3 R5 active asset map.
 * The public report registry owns the immutable, content-hashed delivery files.
 */

const A = '/brand-reports/mora-infused-greek-yogurt-landing-materials/assets';

const assets = {
  // Hero
  heroAtelier: `${A}/st3-r5-01-hero-selection-left-safe-3x2-497d1ecd4032fe2e4436263456323707d311ac69294a4bf8104827df09b4d590.png`,

  // Why MORA
  whyMoraMaker: `${A}/st3-r5-02-why-mora-selection-3x2-e09ba351ddf9901cdbdd2ec02312111a1e95c3da30d89d309b4f1336f8c60fa6.png`,

  // Etchings — narrative
  etchBrandTrace: `${A}/st3-r5-etch-brand-trace-3x2-3023c3ab5dde60b22854199a2f0868e01f6acd705d497e5b7286e1982f1a0840.png`,
  etchFirstFurrow: `${A}/st3-r5-etch-first-furrow-3x2-c3f2ee7eabf00fb10c8fb8e5648821069b60620372b90bd14e0d5850d30bae96.png`,
  etchClothToBody: `${A}/st3-r5-etch-cloth-to-body-3x2-da45f515c8fc2b9adf52ac6c400e77d8bcfa00076343322f76bf1d71de47b6c5.png`,

  // Etchings — material plates
  etchThymeHoney: `${A}/st3-r5-etch-thyme-honey-square-4129d745d65cc3ace9884a714228cc9b06ebe880c8d4d46db0ca2952e1bcb2e4.png`,
  etchFigLeaf: `${A}/st3-r5-etch-fig-leaf-square-c3270b858cb0c4d5f8a8d2211dd7db8370d5ed689ee04d01930a1e8a9c909839.png`,
  etchBuckwheat: `${A}/st3-r5-etch-roasted-buckwheat-square-cbf38107b1cca5db3c11771d4fdd65f875ea87eb9517127fc2e05eab12b38e45.png`,
  etchCitrusPeel: `${A}/st3-r5-etch-citrus-peel-square-6d5dd0e9047fefc61e1a432c51a5731385b571d6beb3e6c236979f08961831b6.png`,
  etchBlackSesame: `${A}/st3-r5-etch-black-sesame-square-4d3ea69300d467ef6b8612ca2c2bebbbeb11c998c3f9f59de530fe340a03caf2.png`,
  etchOliveOil: `${A}/st3-r5-etch-olive-oil-sea-salt-square-5ef11a98a485120c793419f55c7b6f80d7ecfc83cb954a83cf1141eeb78839c9.png`,

  // Material Method
  methodProcessTable: `${A}/st3-r5-05-material-method-left-safe-3x2-ec12bd1c9cf14ab8b3c65451c00a0c32c3335fb86d934bb85eedbbecce7ba978.png`,
  methodIngredientAtlas: `${A}/st3-r5-05-material-method-left-safe-3x2-ec12bd1c9cf14ab8b3c65451c00a0c32c3335fb86d934bb85eedbbecce7ba978.png`,
  methodInfusionLadder: `${A}/st3-r5-05-material-method-left-safe-3x2-ec12bd1c9cf14ab8b3c65451c00a0c32c3335fb86d934bb85eedbbecce7ba978.png`,
  methodFoldTrace: `${A}/st3-r5-05-material-method-left-safe-3x2-ec12bd1c9cf14ab8b3c65451c00a0c32c3335fb86d934bb85eedbbecce7ba978.png`,

  // Vessel
  vesselMaster: `${A}/st3-r5-07-vessel-see-bottom-left-3x2-152d09840ca13ccdea5eab6f64467b01f744448f5d7aa64ca5862a20aded4d9e.png`,
  inspectionFront: `${A}/st3-r5-08-vessel-read-bottom-left-3x2-30880ab90211bab56adb2b79ad0b33c26de0ef39a08262ab6b71077eb86ffc9b.png`,
  vesselOpenService: `${A}/st3-r5-09-vessel-open-bottom-left-3x2-a6db33619b02b20cb495848a68e61e99c9ed3a8c1d5dd04b6da242011956b46e.png`,
  firstSpoonMacro: `${A}/st3-r5-10-vessel-taste-bottom-left-3x2-43194c49a1d7a39d0dd6323c3fba533f69416b688eb6cd8ded6321beba4ad636.png`,
  vesselClosureProof: `${A}/st3-r5-07-vessel-see-bottom-left-3x2-152d09840ca13ccdea5eab6f64467b01f744448f5d7aa64ca5862a20aded4d9e.png`,

  // Products — glass front R2
  productThymeHoney: `${A}/st3-r5-product-thyme-honey-b62b8575d48cb3833b1b30fb8c8e035adbf99a012a335583bc937ca9853a39d5.png`,
  productFigLeaf: `${A}/st3-r5-product-fig-leaf-c0f1943e25ec6abed989e707281cd8d43ec3b564b28925a8be05645ed762a119.png`,
  productBuckwheat: `${A}/st3-r5-product-roasted-buckwheat-e212bd866e0cc6766c8c51bb2a68c2ddf39b3478e68403bb9e529dc0ad6f0bdb.png`,
  productCitrusPeel: `${A}/st3-r5-product-citrus-peel-89ed6d6d8cdb5bce6c6c694e94037128137162bbccd00cf1d1d3d1a057fd5750.png`,
  productBlackSesame: `${A}/st3-r5-product-black-sesame-5ed7e9e4b35142502e8a4c29817c92f8fdb7198136632f498e4d45a94ba84c46.png`,
  productOliveOil: `${A}/st3-r5-product-olive-oil-sea-salt-f3e21299281bf3a155055dcf64797eaee3f4117f388fc61a8ce3d309e1512791.png`,

  // Vessel context aliases used by component stories.
  inspectionSide: `${A}/st3-r5-08-vessel-read-bottom-left-3x2-30880ab90211bab56adb2b79ad0b33c26de0ef39a08262ab6b71077eb86ffc9b.png`,
  customerPeelSpoon: `${A}/st3-r5-09-vessel-open-bottom-left-3x2-a6db33619b02b20cb495848a68e61e99c9ed3a8c1d5dd04b6da242011956b46e.png`,

  // Ingredients — aerial
  ingredientThymeHoney: `${A}/st3-r5-ingredient-aerial-thyme-honey-01c48a52a17a857284c20c468d912a01864f501b29e6a882c1f608fe1988c182.png`,
  ingredientFigLeaf: `${A}/st3-r5-ingredient-aerial-fig-leaf-14de68fc7af35fbf97c0fad4e631ec8df2214a2ab568b98f9d682ecd83200ff7.png`,
  ingredientBuckwheat: `${A}/st3-r5-ingredient-aerial-roasted-buckwheat-8e3c41f0789c920f670da3c5800eca26c2ad411f5ad94c5ee72f254170c5041e.png`,
  ingredientCitrusPeel: `${A}/st3-r5-ingredient-aerial-citrus-peel-7467b55dfa59f0619bb3a1bd47ba0eebb70f9a01aa0f6de497a976334a8cca63.png`,
  ingredientBlackSesame: `${A}/st3-r5-ingredient-aerial-black-sesame-3ee21130bc4a9efdc7263e3c5319b21bc1d6d02fa05c039e090b0fd794c1a40f.png`,
  ingredientOliveOil: `${A}/st3-r5-ingredient-aerial-olive-oil-sea-salt-b5b75532308cd0442086dbc21921d7522dc96d53f270188f248c21adf077bda5.png`,

  // Dedicated 1:2 sticky stories and 3:2 closing use moment.
  momentMorning: `${A}/st3-r5-03-core-sticky-story-1x2-db5c7fc06917dfe253e0778da03fa5b56da22e741dc295db595c3a83948e28a2.png`,
  momentAfternoon: `${A}/st3-r5-04-trial-sticky-story-1x2-d0adbc679ddafadc770a85b064d52305858b8ce0a8d7bf6d8fbbc0a3e3e5aad1.png`,
  momentEvening: `${A}/st3-r5-11-evening-use-bottom-left-3x2-3c807155c37b2ec28b768761e19eb03619299ad6a2658a5d75d9101480c58c55.png`,

  clothTransition: `${A}/st3-r5-06-transition-straining-center-safe-3x2-8bc97b3a026b000e1855fc6c950985576e0d53cb3a8644688a824b7c330cc69e.png`,
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
