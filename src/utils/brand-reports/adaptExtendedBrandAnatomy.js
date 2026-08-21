import { evidenceGridBlock, recordToBlocks } from './blocks.js';
import {
  asArray,
  asRecord,
  firstText,
  isRecord,
  makeSection,
  toText,
} from './helpers.js';
import { createAssetIndex, resolveAsset } from './paths.js';
import { normalizeReview } from './review.js';

const EXTENDED_SECTION_ORDER = [
  ['source_grammar_application', 'Source-grammar application'],
  ['brand_positioning', 'Target-brand positioning'],
  ['landing_product_concept', 'Product family and lineup'],
  ['verbal_branding_and_copy_hierarchy', 'Verbal branding and copy hierarchy'],
  ['visual_branding_and_key_visual', 'Visual branding and key visual'],
  ['brand_mood_and_brand_imagery', 'Brand mood and brand imagery'],
  ['product_visual_traits_and_product_imagery', 'Product-native visual traits and imagery'],
  ['design_token_direction', 'Landing-page design-token direction'],
];

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

function assetsForSection(sectionKey, assets) {
  if (sectionKey === 'brand_mood_and_brand_imagery') {
    return assets.filter((asset) => /mood|world|imagery/i.test(firstText(asset.role, asset.communication_job)));
  }
  if (sectionKey === 'product_visual_traits_and_product_imagery') {
    return assets.filter((asset) => /product|hero|detail|proof/i.test(firstText(asset.role, asset.communication_job)));
  }
  if (sectionKey === 'visual_branding_and_key_visual') {
    return assets.filter((asset) => /key.visual|identity|anchor/i.test(firstText(asset.role, asset.communication_job)));
  }
  return [];
}

export function adaptExtendedBrandAnatomy(input, context = {}) {
  const model = asRecord(input);
  const target = asRecord(model.target);
  const sourceSections = asRecord(model.sections);
  const assetRegistry = asRecord(context.assetRegistry);
  const assetIndex = createAssetIndex(assetRegistry);
  const registered = asArray(model.registered_anchor_assets).map((asset) => resolveAsset(asset, assetIndex));
  const assets = uniqueAssets([...asArray(assetRegistry.assets), ...registered]);
  const review = normalizeReview(context.review);

  const sections = EXTENDED_SECTION_ORDER.map(([sectionKey, title], offset) => {
    const index = offset + 1;
    const section = asRecord(sourceSections[sectionKey]);
    const blocks = recordToBlocks(section);
    if (sectionKey === 'brand_positioning') {
      blocks.unshift(...recordToBlocks(target, { overviewTitle: 'Target scope' }));
    }
    const evidence = evidenceGridBlock(
      'Registered anchor assets',
      assetsForSection(sectionKey, assets),
      { assetIndex, publicBasePath: context.publicBasePath },
    );
    if (evidence) blocks.push(evidence);

    return makeSection({
      id: sectionKey,
      index,
      label: 'Stage 02',
      title,
      blocks,
    });
  });

  const appendixBlocks = [
    ...recordToBlocks(model.source_analysis, { overviewTitle: 'Source analysis' }),
    ...recordToBlocks(model.moodboard_inputs, { overviewTitle: 'Moodboard inputs' }),
    ...recordToBlocks(model.boundaries, { overviewTitle: 'Boundaries' }),
  ];
  const allAssets = evidenceGridBlock('Registered anchor assets', assets, {
    assetIndex,
    publicBasePath: context.publicBasePath,
  });
  if (allAssets) appendixBlocks.push(allAssets);
  sections.push(makeSection({
    id: 'inputs-and-boundaries',
    index: sections.length + 1,
    label: 'Stage 02',
    title: 'Inputs, evidence, and boundaries',
    blocks: appendixBlocks,
  }));

  const positioning = asRecord(sourceSections.brand_positioning);
  const concept = asRecord(sourceSections.landing_product_concept);
  const brandName = firstText(target.working_name, 'Working brand');

  return {
    meta: {
      title: `${brandName} — Extended Brand Anatomy`,
      brandName,
      stage: 'extended_brand_anatomy',
      status: firstText(review?.status, target.direction_status, 'pending'),
      version: toText(model.schema_version),
      summary: firstText(
        positioning.positioning_statement,
        positioning.promise,
        concept.one_line_definition,
        [target.category, target.audience].filter(Boolean).join(' · '),
        'Extended target-brand anatomy.',
      ),
    },
    sections,
    ...(review ? { review } : {}),
  };
}
