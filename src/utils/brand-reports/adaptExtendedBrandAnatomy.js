import {
  cardGridBlock,
  colorTokenGuideBlock,
  evidenceGridBlock,
  keyValueTable,
  listBlock,
  proseBlock,
  recordToBlocks,
  tableBlock,
  typographySpecimensBlock,
  verbalHierarchyBlock,
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

const EXTENDED_SECTION_ORDER = [
  ['source_grammar_application', 'Brand story and concept overview'],
  ['brand_positioning', 'Positioning and founding premise'],
  ['landing_product_concept', 'Product family at a glance'],
  ['verbal_branding_and_copy_hierarchy', 'Verbal story and message hierarchy'],
  ['visual_branding_and_key_visual', 'Visual concept and key visual'],
  ['brand_mood_and_brand_imagery', 'Brand mood and image world'],
  ['product_visual_traits_and_product_imagery', 'Product detail and image system'],
  ['design_token_direction', 'Detailed references and design tokens'],
];

function compactBlocks(blocks) {
  return blocks.filter(Boolean);
}

function pickRecord(record, keys) {
  const source = asRecord(record);
  return Object.fromEntries(keys.filter((key) => source[key] !== undefined).map((key) => [key, source[key]]));
}

function productOverviewTable(products) {
  return tableBlock('Six-product concept overview', [
    { key: 'product_name', label: 'Product' },
    { key: 'lineup_role', label: 'Role' },
    { key: 'product_usp', label: 'Product concept' },
    { key: 'landing_message', label: 'Landing message' },
  ], products);
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

function colorTokensBlock(records) {
  const items = asArray(records)
    .filter(isRecord)
    .map((record, index) => ({
      id: firstText(record.token, `color-${index + 1}`),
      token: firstText(record.token, `color.${index + 1}`),
      label: firstText(record.name, record.role, `Color ${index + 1}`),
      role: firstText(record.role),
      value: firstText(record.value, record.hex),
      onColor: firstText(record.on_color, record.foreground),
      description: firstText(record.target_direction),
      relationship: firstText(record.relationship),
      contrastPair: firstText(record.contrast_pair),
      contrastRatio: firstText(record.contrast_ratio),
      usageRatio: firstText(record.usage_ratio),
      landingUse: firstText(record.landing_use),
      status: firstText(record.status),
      details: [
        { label: 'Relationship', value: firstText(record.relationship) },
        { label: 'Contrast pair', value: firstText(record.contrast_pair) },
        { label: 'Contrast ratio', value: firstText(record.contrast_ratio) },
        { label: 'Usage ratio', value: firstText(record.usage_ratio) },
        { label: 'Landing use', value: firstText(record.landing_use) },
        { label: 'Source basis', value: firstText(record.source_basis) },
        { label: 'Status', value: firstText(record.status) },
      ].filter(({ value }) => value),
    }))
    .filter((item) => item.value);

  if (!items.length) return null;
  return {
    type: 'color-tokens',
    title: 'Color tokens — rendered swatches',
    description: '실제 색상값, 권장 전경색, 명도 대비, 사용 비율과 랜딩 역할을 함께 표시합니다.',
    items,
  };
}

function typographyTokensBlock(records) {
  const items = asArray(records)
    .filter(isRecord)
    .map((record, index) => ({
      id: firstText(record.token, `typography-${index + 1}`),
      token: firstText(record.token, `type.${index + 1}`),
      label: firstText(record.name, record.role, `Typography ${index + 1}`),
      sample: firstText(record.sample, record.sample_text, 'Give work in progress room. 작업에 필요한 여백.'),
      fontFamily: firstText(record.font_family, record.fontFamily),
      fontSize: firstText(record.preview_size, record.font_size, record.fontSize),
      fontWeight: firstText(record.font_weight, record.fontWeight),
      lineHeight: firstText(record.line_height, record.lineHeight),
      letterSpacing: firstText(record.letter_spacing, record.letterSpacing),
      textTransform: firstText(record.text_transform, record.textTransform),
      details: [
        { label: 'Token', value: firstText(record.token) },
        { label: 'Scale', value: firstText(record.font_size) },
        { label: 'Responsive', value: firstText(record.responsive_range) },
        { label: 'Measure', value: firstText(record.measure) },
        { label: 'Landing use', value: firstText(record.landing_use) },
        { label: 'Relationship', value: firstText(record.relationship) },
      ].filter(({ value }) => value),
      description: [
        firstText(record.target_direction),
        firstText(record.source_basis) ? `Source basis: ${firstText(record.source_basis)}` : '',
      ].filter(Boolean).join('\n'),
    }))
    .filter((item) => item.fontFamily || item.fontSize || item.fontWeight);

  if (!items.length) return null;
  return {
    type: 'typography-specimens',
    title: 'Typography tokens — live specimens',
    description: '각 토큰의 폰트 패밀리, 크기, 굵기, 행간, 자간을 아래 문장에 직접 적용한 렌더링입니다.',
    items,
  };
}

function sectionInsight(section) {
  const source = asRecord(section);
  const firstStringValue = Object.entries(source)
    .filter(([key, value]) => (
      typeof value === 'string'
      && !/(^|_)(id|url|path|status|version|evidence|reference)(_|$)/iu.test(key)
    ))
    .map(([, value]) => value)
    .find(Boolean);

  function nestedNarrativeValue(value) {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      return value.map(nestedNarrativeValue).find(Boolean) || '';
    }
    if (!isRecord(value)) return '';

    const preferredKeys = [
      'key_insight',
      'summary',
      'positioning_statement',
      'promise',
      'one_line_definition',
      'brand_message',
      'family_usp',
      'communication_job',
      'target_direction',
      'premise',
      'description',
      'statement',
    ];
    const preferred = preferredKeys
      .map((key) => value[key])
      .map(nestedNarrativeValue)
      .find(Boolean);
    if (preferred) return preferred;

    return Object.entries(value)
      .filter(([key]) => !/(^|_)(id|url|path|status|version|evidence|reference)(_|$)/iu.test(key))
      .map(([, item]) => nestedNarrativeValue(item))
      .find(Boolean) || '';
  }

  return firstInsight(
    source.key_insight,
    source.keyInsight,
    source.insight,
    source.summary,
    source.positioning_statement,
    source.promise,
    source.one_line_definition,
    source.brand_message,
    source.family_usp,
    source.communication_job,
    source.headline,
    source.description,
    firstStringValue,
    nestedNarrativeValue(source),
  );
}

export function adaptExtendedBrandAnatomy(input, context = {}) {
  const model = asRecord(input);
  const target = asRecord(model.target);
  const sourceSections = asRecord(model.sections);
  const assetRegistry = asRecord(context.assetRegistry);
  const supportingAssets = asArray(
    asRecord(sourceSections.brand_mood_and_brand_imagery).supporting_series,
  );
  const referenceMasterAssets = asArray(
    asRecord(sourceSections.brand_mood_and_brand_imagery).reference_master_series,
  );
  const moodProductionAssets = asArray(
    asRecord(sourceSections.brand_mood_and_brand_imagery).production_series,
  );
  const uiProductAssets = asArray(
    asRecord(sourceSections.product_visual_traits_and_product_imagery).ui_product_series,
  );
  const uiMaterialAssets = asArray(
    asRecord(sourceSections.product_visual_traits_and_product_imagery).ui_material_series,
  );
  const allAssetRecords = [
    ...asArray(assetRegistry.assets),
    ...supportingAssets,
    ...referenceMasterAssets,
    ...moodProductionAssets,
    ...uiProductAssets,
    ...uiMaterialAssets,
  ];
  const assetIndex = createAssetIndex(allAssetRecords);
  const registered = asArray(model.registered_anchor_assets).map((asset) => resolveAsset(asset, assetIndex));
  const assets = uniqueAssets([...allAssetRecords, ...registered]);
  const review = normalizeReview(context.review);

  const positioning = asRecord(sourceSections.brand_positioning);
  const concept = asRecord(sourceSections.landing_product_concept);
  const verbal = asRecord(sourceSections.verbal_branding_and_copy_hierarchy);
  const visual = asRecord(sourceSections.visual_branding_and_key_visual);
  const mood = asRecord(sourceSections.brand_mood_and_brand_imagery);
  const productVisual = asRecord(sourceSections.product_visual_traits_and_product_imagery);
  const designTokens = asRecord(sourceSections.design_token_direction);
  const productFamily = asRecord(concept.product_family);
  const productLineup = asArray(concept.product_lineup).filter(isRecord);
  const editorialStructure = asRecord(model.editorial_structure);
  const conceptSnapshot = asRecord(editorialStructure.concept_snapshot);
  const boundaries = asRecord(model.boundaries);
  const factualLimits = asArray(boundaries.factual_limits).map(toText).filter(Boolean);
  const criticalBoundaries = [
    factualLimits.find((item) => item.startsWith('All recipes')),
    factualLimits.find((item) => item.startsWith('No nutrition')),
    factualLimits.find((item) => item.includes('working names without trademark')),
    factualLimits.find((item) => item.startsWith('The Background Is the Batch')),
  ].filter(Boolean);
  const productHeroEvidence = evidenceGridBlock(
    'Representative product hero',
    assets.filter((asset) => firstText(asset.asset_id) === 'ST2-PRODUCT-HERO-01'),
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const ambientKeyVisualEvidence = evidenceGridBlock(
    'The Background Is the Batch — ambient key visual series',
    assets.filter((asset) => firstText(asset.role) === 'ambient_key_visual'),
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const referenceMasterEvidence = evidenceGridBlock(
    'Reusable Reference Masters — approve before assembly',
    referenceMasterAssets,
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const moodProductionEvidence = evidenceGridBlock(
    'Brand Mood Image Series — Current Production',
    moodProductionAssets,
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const uiProductEvidence = evidenceGridBlock(
    'UI Product Series — REF-07 locked',
    uiProductAssets,
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const uiMaterialEvidence = evidenceGridBlock(
    'UI Material Series — REF-07 locked',
    uiMaterialAssets,
    { assetIndex, publicBasePath: context.publicBasePath },
  );
  const productEvidence = evidenceGridBlock(
    'Product and process image system',
    assetsForSection('product_visual_traits_and_product_imagery', assets),
    { assetIndex, publicBasePath: context.publicBasePath },
  );

  const sectionBlocks = {
    source_grammar_application: compactBlocks([
      proseBlock('MORA in one sentence', [
        editorialStructure.brand_in_one_sentence,
        editorialStructure.key_insight,
      ]),
      cardGridBlock('The story — from problem to experience', editorialStructure.story_arc, {
        idPrefix: 'brand-story',
      }),
      proseBlock('The Background Is the Batch', [
        visual.premise,
        '분리, 인퓨전, 한 번의 폴딩, 잔향을 네 개의 배경 상태로 보여 준다.',
      ]),
      ambientKeyVisualEvidence,
      keyValueTable('Concept lock', pickRecord(conceptSnapshot, [
        'brand_world',
        'product_system',
        'hero_product',
        'verbal_premise',
      ])),
    ]),
    brand_positioning: compactBlocks([
      cardGridBlock('Problem → question → answer', [
        { title: '01. Human problem', body: positioning.human_problem },
        { title: '02. Founding question', body: positioning.founding_question },
        { title: '03. Founding answer', body: positioning.founding_answer },
      ], { idPrefix: 'founding-premise' }),
      keyValueTable('Positioning lock', {
        audience: firstText(positioning.audience, target.audience),
        category: firstText(positioning.category_frame, target.category),
        ...pickRecord(positioning, [
        'brand_world_position',
        'positioning_statement',
        'promise',
        'user_outcome',
        ]),
      }),
    ]),
    landing_product_concept: compactBlocks([
      keyValueTable('Product concept', {
        family: productFamily.working_name,
        ...pickRecord(concept, [
        'one_line_definition',
        'core_value',
        'user_and_use_situation',
        'hero_product',
        ]),
        family_promise: productFamily.promise,
      }),
      productOverviewTable(productLineup),
    ]),
    verbal_branding_and_copy_hierarchy: compactBlocks([
      keyValueTable('Core message hierarchy', pickRecord(verbal, [
        'brand_message',
        'brand_message_support',
        'family_usp',
      ])),
      cardGridBlock('Brand values', verbal.brand_values, { idPrefix: 'brand-value' }),
      listBlock('Message sequence', verbal.message_hierarchy, { ordered: true }),
    ]),
    visual_branding_and_key_visual: compactBlocks([
      keyValueTable('Visual operating system', pickRecord(visual, [
        'communication_job',
        'focal_actor',
        'series_rule',
      ])),
      productHeroEvidence,
      listBlock('Identity behavior', visual.identity_behavior),
      listBlock('Do not use', visual.avoid),
    ]),
    brand_mood_and_brand_imagery: compactBlocks([
      keyValueTable('Image-world concept', pickRecord(mood, [
        'communication_job',
        'series_rule',
      ])),
      referenceMasterEvidence,
      moodProductionEvidence,
      listBlock('Materials and sensory cues', mood.materials_and_sensory_cues),
      listBlock('Camera, light and color', mood.camera_light_color),
    ]),
    product_visual_traits_and_product_imagery: compactBlocks([
      uiProductEvidence,
      uiMaterialEvidence,
      productEvidence,
      keyValueTable('Product-image communication job', pickRecord(productVisual, [
        'communication_job',
        'registered_product_anchor',
      ])),
      cardGridBlock('Six products, six visible traces', productVisual.lineup_visual_map, {
        idPrefix: 'lineup-visual',
      }),
      listBlock('Product truth rules', productVisual.truth_boundaries),
      keyValueTable('Manufacturing direction — validation required', pickRecord(
        asRecord(concept.actual_manufacturing_direction),
        ['selected_pilot_route', 'validation_gate'],
      )),
    ]),
    design_token_direction: compactBlocks([
      colorTokensBlock(designTokens.color),
      typographyTokensBlock(designTokens.typography),
      ...recordToBlocks(pickRecord(designTokens, ['layout', 'motion'])),
      keyValueTable('Implementation boundary', pickRecord(designTokens, ['implementation_boundary'])),
      listBlock('Protected source boundaries', boundaries.source_traits_not_to_copy),
      listBlock('Critical factual boundaries', criticalBoundaries),
    ]),
  };

  const sections = EXTENDED_SECTION_ORDER.map(([sectionKey, title], offset) => {
    const index = offset + 1;
    const section = asRecord(sourceSections[sectionKey]);
    let blocks;
    if (sectionKey === 'verbal_branding_and_copy_hierarchy') {
      const positioning = asRecord(sourceSections.brand_positioning);
      const genericVerbalFields = Object.fromEntries(
        Object.entries(section).filter(([key]) => ![
          'key_insight',
          'brand_purpose',
          'brand_essence',
          'brand_message',
          'brand_values',
          'voice',
          'vocabulary',
          'sentence_behavior',
          'message_hierarchy',
          'selected_narrative_route',
          'family_usp',
          'product_usps',
          'headline_direction',
          'supporting_copy_direction',
          'cta_direction',
        ].includes(key)),
      );
      blocks = [
        verbalHierarchyBlock(
          'Verbal brand hierarchy',
          {
            ...section,
            positioning: positioning.positioning_statement,
            brand_promise: positioning.promise,
            proof: positioning.proof,
          },
          {
            status: 'directional',
            description: 'The target verbal platform is ordered from brand foundation to landing-page activation.',
          },
        ),
        ...recordToBlocks(genericVerbalFields),
      ].filter(Boolean);
    } else if (sectionKey === 'design_token_direction') {
      const genericTokenFields = Object.fromEntries(
        Object.entries(section).filter(([key]) => ![
          'color',
          'typography',
          'typography_sources',
          'typography_specimens',
          'documentation_only',
          'webfont_gap',
        ].includes(key)),
      );
      blocks = [
        colorTokenGuideBlock(
          'Color token direction',
          section.color,
          { description: 'Target color direction shown with keep, tune, or new lineage. Documentation only.' },
        ),
        typographySpecimensBlock(
          'Typography hierarchy direction',
          {
            typography: section.typography_specimens ?? section.typography,
            typography_sources: section.typography_sources,
            webfont_gap: section.webfont_gap,
          },
          {
            explicitValueStatus: 'directional',
            description: 'Target typography direction shown as a standard web hierarchy with linked document fonts. It is not applied to the project theme.',
          },
        ),
        ...recordToBlocks(genericTokenFields),
      ].filter(Boolean);
    } else {
      blocks = recordToBlocks(section);
    }
    if (sectionKey === 'source_grammar_application') {
      blocks.unshift(
        ...recordToBlocks(model.source_analysis, { overviewTitle: 'Source analysis' }),
        ...recordToBlocks(model.boundaries, { overviewTitle: 'Protected boundaries' }),
      );
    }
    if (sectionKey === 'brand_positioning') {
      blocks.unshift(...recordToBlocks(target, { overviewTitle: 'Target scope' }));
    }
    if (sectionKey === 'brand_mood_and_brand_imagery') {
      blocks.push(...recordToBlocks(model.moodboard_inputs, { overviewTitle: 'Moodboard inputs' }));
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
      insight: sectionInsight(section),
      blocks,
    });
  });

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
