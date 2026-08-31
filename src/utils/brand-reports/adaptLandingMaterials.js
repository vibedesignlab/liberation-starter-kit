import {
  cardGridBlock,
  evidenceGridBlock,
  keyValueTable,
  listBlock,
  proseBlock,
  tableBlock,
} from './blocks.js';
import {
  asArray,
  asRecord,
  firstInsight,
  firstText,
  isRecord,
  makeSection,
  toText,
} from './helpers.js';
import { createAssetIndex, resolveAsset } from './paths.js';
import { normalizeReview } from './review.js';

function compactBlocks(blocks) {
  return blocks.filter(Boolean);
}

function productLineupTable(products) {
  return tableBlock('Product-lineup copy matrix', [
    { key: 'lineup_group', label: 'Group' },
    { key: 'product_name', label: 'Product' },
    { key: 'product_usp', label: 'USP' },
    { key: 'headline', label: 'Headline' },
    { key: 'description', label: 'Description' },
    { key: 'feature_copy', label: 'Features' },
    { key: 'proof_copy', label: 'Proof' },
    { key: 'cta', label: 'CTA' },
  ], products);
}

function sectionMapTable(items) {
  return tableBlock('Landing-section mapping', [
    { key: 'section', label: 'Section' },
    { key: 'communication_job', label: 'Communication job' },
    { key: 'copy', label: 'Copy' },
    { key: 'proof_of', label: 'Proof of' },
    { key: 'asset_id', label: 'Asset' },
    { key: 'cta', label: 'CTA / next action' },
  ], items);
}

function uniqueAssets(items) {
  const result = [];
  const seen = new Set();
  asArray(items).filter(isRecord).forEach((asset, index) => {
    const id = firstText(asset.asset_id, asset.evidence_id, asset.id, `asset-${index + 1}`);
    if (seen.has(id)) return;
    seen.add(id);
    result.push(asset);
  });
  return result;
}

function assetId(item) {
  if (isRecord(item)) {
    return firstText(item.asset_id, item.evidence_id, item.id);
  }
  return toText(item);
}

function landingCompositionBlocks(items, { assetIndex, publicBasePath } = {}) {
  return asArray(items).filter(isRecord).flatMap((item, index) => {
    const order = firstText(item.order, String(index + 1).padStart(2, '0'));
    const section = firstText(item.section, `Landing section ${order}`);
    const label = `${order}. ${section}`;
    const copyBlock = cardGridBlock(`${label} — Copy`, [{
      eyebrow: item.eyebrow,
      headline: item.headline,
      description: item.body,
      image_sequence: item.asset_layout,
      cta: item.cta,
    }], { idPrefix: `landing-composition-${order}` });
    const imageBlock = evidenceGridBlock(`${label} — Images`, item.asset_ids, {
      assetIndex,
      publicBasePath,
    });
    return compactBlocks([copyBlock, imageBlock]);
  });
}

export function adaptLandingMaterials(input, context = {}) {
  const model = asRecord(input);
  const narrative = asRecord(model.landing_narrative);
  const values = asRecord(model.brand_value);
  const story = asRecord(model.brand_story);
  const family = asRecord(model.product_introduction);
  const heroSeries = asRecord(model.hero_craft_space_series);
  const referenceSystem = asRecord(model.reference_system);
  const vesselSystem = asRecord(model.vessel_record_system);
  const layoutImageSystem = asRecord(model.layout_aware_image_system);
  const products = asArray(model.product_lineup_copy).filter(isRecord);
  const sectionMap = asArray(model.section_map).filter(isRecord);
  const assetRegistry = asRecord(context.assetRegistry);
  const assetIndex = createAssetIndex(assetRegistry);
  const registered = asArray(model.registered_product_assets).map((asset) => resolveAsset(asset, assetIndex));
  const assets = uniqueAssets([...asArray(assetRegistry.assets), ...registered]);
  const landingComposition = asArray(model.landing_page_composition).filter(isRecord);
  const productionAppendix = asRecord(model.production_reference_appendix);
  const previousVersionArchive = asRecord(model.previous_version_archive);
  const source = asRecord(model.extended_brand_source);
  const review = normalizeReview(context.review);

  const narrativeBlocks = compactBlocks([
    keyValueTable('Narrative route', {
      selected_narrative_route: model.selected_narrative_route,
      brand_message: narrative.brand_message,
      hero_eyebrow: narrative.hero_eyebrow,
      hero_headline: narrative.hero_headline,
      hero_support: narrative.hero_support,
      primary_cta: narrative.primary_cta,
    }),
    listBlock('Section sequence', narrative.section_sequence, { ordered: true }),
    keyValueTable('Message-to-visual map', model.message_visual_map),
    listBlock('Brand value to brand mood', asRecord(model.message_visual_map).brand_values_to_brand_mood),
    listBlock('Family and product USP to imagery', asRecord(model.message_visual_map).family_and_product_usp_to_product_imagery),
  ]);

  const valueBlocks = compactBlocks([
    proseBlock('Value statement', [values.statement]),
    cardGridBlock('Brand values', values.values, { idPrefix: 'value' }),
    listBlock('Supporting proof', values.proof),
    listBlock('Short-form variants', values.short_variants),
  ]);

  const storyBlocks = compactBlocks([
    proseBlock(story.headline, [story.body]),
    proseBlock('Product connection', [story.product_connection]),
    keyValueTable('Visual storytelling system', story.visual_storytelling),
    listBlock('Founder story release gate', story.founder_release_gate),
    proseBlock('Hero craft-space series', [heroSeries.key_insight]),
    keyValueTable('Hero series lock', heroSeries.series_lock),
    keyValueTable('Selected hero version', heroSeries.selected_version),
  ]);

  const familyBlocks = compactBlocks([
    proseBlock(family.headline, [family.description]),
    cardGridBlock('Lineup groups', family.lineup_groups, { idPrefix: 'lineup-group' }),
    keyValueTable('Product-family introduction', {
      family_name: family.family_name,
      shared_promise: family.shared_promise,
      family_usp: family.family_usp,
      packaging_architecture: family.packaging_architecture,
    }),
    listBlock('Customer experience', family.customer_experience, { ordered: true }),
    cardGridBlock('Use moments', family.use_moments, { idPrefix: 'use-moment' }),
    keyValueTable('Partial Batch Record system', {
      name: vesselSystem.name,
      design_intent: vesselSystem.design_intent,
      print_rule: vesselSystem.print_rule,
      opening_sequence: vesselSystem.opening_sequence,
      variable_data_rule: vesselSystem.variable_data_rule,
      production_gate: vesselSystem.production_gate,
    }),
    listBlock('Vessel physical architecture', vesselSystem.physical_architecture),
  ]);

  const individualProducts = products.filter((product) => product.lineup_group === 'individual_product');
  const workspaceTemplates = products.filter((product) => product.lineup_group === 'workspace_template_module');
  const ungroupedProducts = products.filter((product) => !product.lineup_group);
  const lineupBlocks = compactBlocks([
    cardGridBlock('Individual products', individualProducts, { idPrefix: 'individual-product' }),
    cardGridBlock('Workspace template modules', workspaceTemplates, { idPrefix: 'workspace-template' }),
    cardGridBlock('Product lineup', ungroupedProducts, { idPrefix: 'product' }),
    productLineupTable(products),
  ]);

  const composedAssetIds = new Set([
    ...landingComposition.flatMap((item) => asArray(item.asset_ids).map(assetId)),
    ...asArray(productionAppendix.asset_ids).map(assetId),
  ].filter(Boolean));
  const unplacedAssets = assets.filter((asset) => !composedAssetIds.has(assetId(asset)));
  const mappingBlocks = landingComposition.length
    ? compactBlocks([
      ...landingCompositionBlocks(landingComposition, {
        assetIndex,
        publicBasePath: context.publicBasePath,
      }),
      proseBlock('Production Reference — moved behind the landing composition', [
        productionAppendix.key_insight,
        productionAppendix.description,
        productionAppendix.archived_registry_path,
      ]),
      listBlock('Current production contracts', productionAppendix.current_contracts),
      cardGridBlock('Production Reference index', productionAppendix.items, {
        idPrefix: 'production-reference',
      }),
      evidenceGridBlock('Production Reference assets — not public', productionAppendix.asset_ids, {
        assetIndex,
        publicBasePath: context.publicBasePath,
      }),
      evidenceGridBlock('Unplaced registered assets — audit', unplacedAssets, {
        assetIndex,
        publicBasePath: context.publicBasePath,
      }),
      sectionMapTable(sectionMap),
      cardGridBlock('Complete asset-role map', sectionMap, { idPrefix: 'landing-section' }),
    ])
    : compactBlocks([
      evidenceGridBlock('Product-image renders', assets, {
        assetIndex,
        publicBasePath: context.publicBasePath,
      }),
      sectionMapTable(sectionMap),
      cardGridBlock('Landing-section roles', sectionMap, { idPrefix: 'landing-section' }),
    ]);

  mappingBlocks.push(...compactBlocks([
    proseBlock('Reference system', [
      referenceSystem.key_insight,
      referenceSystem.status,
      referenceSystem.dual_authority,
    ]),
    keyValueTable('Reference series lock', referenceSystem.series_lock),
    listBlock('Reference QA loop', referenceSystem.qa_loop, { ordered: true }),
    listBlock('Reference prompt modules', referenceSystem.prompt_modules),
    proseBlock('Layout-aware image system', [
      layoutImageSystem.key_insight,
      layoutImageSystem.high_resolution_truth,
      layoutImageSystem.no_reuse_rule,
    ]),
    listBlock('Preserved landing implementation', layoutImageSystem.preserved_implementation),
    cardGridBlock('Exact-ratio delivery families', layoutImageSystem.slot_families, {
      idPrefix: 'layout-image-slot',
    }),
    listBlock('Unverified claims', asRecord(model.boundaries).unverified_claims),
    listBlock('Protected brand and product invariants', asRecord(model.boundaries).protected_brand_and_product_invariants),
    listBlock('Out of scope', asRecord(model.boundaries).out_of_scope),
  ]));

  mappingBlocks.push(...compactBlocks([
    proseBlock('Previous versions — archive', [
      previousVersionArchive.key_insight,
      previousVersionArchive.retention_rule,
    ]),
    cardGridBlock('Archived alternatives', previousVersionArchive.items, {
      idPrefix: 'previous-version',
    }),
  ]));

  const firstValue = asRecord(asArray(values.values)[0]);
  const firstProduct = asRecord(products[0]);
  const firstMappedSection = asRecord(sectionMap[0]);

  const sectionDefinitions = [
    [
      'landing-narrative',
      'Landing narrative and hierarchy',
      narrativeBlocks,
      firstInsight(narrative.key_insight, narrative.brand_message, narrative.hero_headline),
    ],
    [
      'brand-value',
      'Brand value copy',
      valueBlocks,
      firstInsight(values.key_insight, values.statement, firstValue.statement, firstValue.description),
    ],
    [
      'brand-story',
      'Brand story copy',
      storyBlocks,
      firstInsight(story.key_insight, story.headline, story.body),
    ],
    [
      'product-family',
      'Product-family introduction',
      familyBlocks,
      firstInsight(family.key_insight, family.shared_promise, family.family_usp, family.description),
    ],
    [
      'product-lineup',
      'Product-lineup copy',
      lineupBlocks,
      firstInsight(model.product_lineup_key_insight, firstProduct.product_usp, firstProduct.headline),
    ],
    [
      'product-assets-and-map',
      'Product images and landing-section map',
      mappingBlocks,
      firstInsight(
        model.section_map_key_insight,
        firstMappedSection.communication_job,
        firstMappedSection.proof_of,
      ),
    ],
  ];
  const sections = sectionDefinitions.map(([id, title, blocks, insight], offset) => makeSection({
    id,
    index: offset + 1,
    label: 'Stage 03',
    title,
    insight,
    blocks,
  }));

  const brandName = firstText(family.family_name, narrative.hero_eyebrow, 'Working brand');
  return {
    meta: {
      title: `${brandName} — Landing Materials`,
      brandName,
      stage: 'landing_materials',
      status: firstText(review?.status, source.review_status, 'pending'),
      version: toText(model.schema_version),
      summary: firstText(
        narrative.brand_message,
        narrative.hero_headline,
        family.shared_promise,
        'Landing-page source materials.',
      ),
    },
    sections,
    ...(review ? { review } : {}),
  };
}
