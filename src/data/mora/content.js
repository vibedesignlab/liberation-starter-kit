/**
 * MORA landing composition layer.
 *
 * Integration ownership only: join stable copy IDs to stable asset roles.
 * Ordinary text edits belong in copy.js; ordinary image swaps belong in assets.js.
 */

import assets from './assets';
import copy from './copy';

const statementMedia = {
  sb1: assets.clothTransition,
  sb2: assets.methodProcessTable,
  sb3: assets.vesselMaster,
};

const processMedia = {
  3: assets.etchClothToBody,
  4: assets.methodInfusionLadder,
  5: assets.methodFoldTrace,
  6: assets.vesselClosureProof,
};

const productMedia = {
  'thyme-honey': {
    product: assets.productThymeHoney,
    ingredient: assets.ingredientThymeHoney,
    etching: assets.etchThymeHoney,
    motion: assets.recipeThymeHoney,
    moment: assets.momentMorning,
  },
  'roasted-buckwheat': {
    product: assets.productBuckwheat,
    ingredient: assets.ingredientBuckwheat,
    etching: assets.etchBuckwheat,
    motion: assets.recipeBuckwheat,
    moment: assets.momentAfternoon,
  },
  'citrus-peel': {
    product: assets.productCitrusPeel,
    ingredient: assets.ingredientCitrusPeel,
    etching: assets.etchCitrusPeel,
    motion: assets.recipeCitrusPeel,
  },
  'black-sesame': {
    product: assets.productBlackSesame,
    ingredient: assets.ingredientBlackSesame,
    etching: assets.etchBlackSesame,
    motion: assets.recipeBlackSesame,
  },
  'fig-leaf': {
    product: assets.productFigLeaf,
    ingredient: assets.ingredientFigLeaf,
    etching: assets.etchFigLeaf,
  },
  'olive-oil': {
    product: assets.productOliveOil,
    ingredient: assets.ingredientOliveOil,
    etching: assets.etchOliveOil,
    moment: assets.momentEvening,
  },
};

const vesselMedia = {
  SEE: assets.vesselStorySee,
  READ: assets.vesselStoryRead,
  OPEN: assets.vesselStoryOpen,
  TASTE: assets.vesselStoryTaste,
};

export const navigation = copy.navigation;
export const newsletter = copy.newsletter;
export const footer = copy.footer;
export const values = copy.values;
export const facts = copy.facts;
export const navLinks = navigation.links;

export const statements = copy.statements.map((item) => ({
  ...item,
  image: statementMedia[item.id],
}));

export const processSteps = copy.processSteps.map((item) => ({
  ...item,
  ...(processMedia[item.step] ? { image: processMedia[item.step] } : {}),
}));

export const products = copy.products.map((product) => ({
  ...product,
  ...productMedia[product.id],
}));

export const coreProducts = products.filter((product) => product.role === 'core');
export const trialProducts = products.filter((product) => product.role === 'trial');

export const vesselPhases = copy.vesselPhases.map((phase) => ({
  ...phase,
  alt: phase.imageAlt,
  image: vesselMedia[phase.phase],
}));

export const sections = {
  hero: {
    ...copy.sections.hero,
    image: assets.heroAtelier,
  },
  brandTrace: {
    ...copy.sections.brandTrace,
    image: assets.etchBrandTrace,
  },
  transition: {
    ...copy.sections.transition,
    image: assets.clothTransition,
  },
  whyMora: {
    ...copy.sections.whyMora,
    makerImage: assets.whyMoraMaker,
    etchingImage: assets.etchFirstFurrow,
  },
  coreCollection: {
    ...copy.sections.coreCollection,
    mainImage: assets.momentMorning,
  },
  studioTrials: {
    ...copy.sections.studioTrials,
    mainImage: assets.momentAfternoon,
  },
  clothToBody: {
    ...copy.sections.clothToBody,
    image: assets.etchClothToBody,
  },
  materialMethod: {
    ...copy.sections.materialMethod,
    image: assets.methodProcessTable,
  },
  evening: {
    ...copy.sections.evening,
    image: assets.tableStory,
  },
};

export const recipeSlides = copy.recipeSlides.map((slide) => ({
  ...slide,
  etching: productMedia[slide.id]?.etching,
  motion: productMedia[slide.id]?.motion,
}));

export const brand = {
  headline: sections.hero.headline,
  support: sections.hero.support,
  primaryCta: sections.hero.ctaLabel,
  secondaryCta: sections.transition.ctaLabel,
};

const landingContent = {
  navigation,
  sections,
  newsletter,
  footer,
  statements,
  values,
  processSteps,
  products,
  coreProducts,
  trialProducts,
  vesselPhases,
  recipeSlides,
  facts,
};

export default landingContent;
