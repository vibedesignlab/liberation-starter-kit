import {
  cardGridBlock,
  codeBlock,
  evidenceGridBlock,
  keyValueTable,
  listBlock,
  proseBlock,
  tableBlock,
  typographySpecimensBlock,
} from './blocks.js';
import {
  asArray,
  asRecord,
  firstText,
  hasContent,
  isRecord,
  makeSection,
  toText,
} from './helpers.js';
import { createAssetIndex, toPublicAssetUrl } from './paths.js';
import { normalizeReview } from './review.js';

const SOURCE_LAYER_ORDER = [
  ['source_synthesis', 'Source synthesis'],
  ['evidence_and_authorship', 'Evidence and authorship'],
  ['strategy', 'Strategic and cultural anatomy'],
  ['verbal_system', 'Verbal anatomy'],
  ['identity_and_channel_tokens', 'Identity and channel tokens'],
  ['key_visual_system', 'Key-visual system'],
  ['brand_mood_and_world', 'Brand mood and world'],
  ['photography_and_film', 'Photography and film'],
  ['product_representation', 'Product representation'],
  ['product_native_visual_and_cognitive_language', 'Product-native visual and cognitive language'],
  ['composition_and_cross_channel_grammar', 'Composition and cross-channel grammar'],
  ['product_interface_and_service_behavior', 'Product, interface, and service behavior'],
  ['system_synthesis', 'System synthesis'],
  ['global_brand_system', 'Global brand-system framework'],
];

const CLAIM_DOMAIN_BY_LAYER = {
  strategy: 'strategy',
  verbal_system: 'verbal_system',
  identity_and_channel_tokens: 'identity_and_tokens',
  key_visual_system: 'key_visual',
  brand_mood_and_world: 'brand_mood',
  photography_and_film: 'photography_and_film',
  product_representation: 'product_representation',
  product_native_visual_and_cognitive_language: 'product_native_language',
  composition_and_cross_channel_grammar: 'composition',
  product_interface_and_service_behavior: 'product_interface_service',
  system_synthesis: 'system_and_other',
};

function topicBlocks(topic) {
  const source = asRecord(topic);
  const blocks = [];
  const prose = proseBlock(source.title, source.notes);
  if (prose) blocks.push(prose);
  asArray(source.tables).forEach((table, tableIndex) => {
    const value = asRecord(table);
    const block = tableBlock(
      `${firstText(source.title, 'Details')} · ${tableIndex + 1}`,
      value.columns,
      value.rows,
    );
    if (block) blocks.push(block);
  });
  return blocks;
}

function areaBlocks(area) {
  const source = asRecord(area);
  const blocks = [];
  const notes = proseBlock(source.title, source.source_notes);
  if (notes) blocks.push(notes);

  [
    ['Roles', source.roles],
    ['Relationships', source.relationships],
    ['Invariants', source.invariants],
    ['Variables and exceptions', source.variables_and_exceptions],
    ['Limits', source.limits],
  ].forEach(([title, items]) => {
    const block = listBlock(`${firstText(source.title, 'System')} · ${title}`, items);
    if (block) blocks.push(block);
  });

  asArray(source.source_tables).forEach((table, index) => {
    const value = asRecord(table);
    const block = tableBlock(
      `${firstText(source.title, 'System')} · Observations ${index + 1}`,
      value.columns,
      value.rows,
    );
    if (block) blocks.push(block);
  });
  return blocks;
}

function typographyRows(area) {
  const source = asRecord(area);
  return [
    ...asArray(source.observed_references),
    ...asArray(source.source_tables).flatMap((table) => asArray(asRecord(table).rows)),
  ].filter(isRecord);
}

function sectionEvidence(layer, evidence, layerKey) {
  const ids = new Set(asArray(asRecord(layer).evidence_ids).map(toText).filter(Boolean));
  if (layerKey === 'evidence_and_authorship' && !ids.size) return evidence;
  return evidence.filter((item) => ids.has(toText(item.evidence_id)));
}

function reportIdentity(model, publicBasePath) {
  const identity = asRecord(model.report_identity);
  if (!hasContent(identity)) return undefined;
  const logo = asRecord(identity.logo);
  const src = toPublicAssetUrl(firstText(logo.local_path, logo.file_path), publicBasePath);
  const result = {
    backgroundColor: toText(identity.background_color),
    foregroundColor: toText(identity.foreground_color),
    colorLayer: toText(identity.color_layer),
    scope: toText(identity.identity_scope),
    logoSrc: src,
    logoAlt: firstText(logo.variant, 'Official masterbrand logo'),
    logoEvidenceId: toText(logo.evidence_id),
    logoSourceUrl: toText(logo.source_url),
    logoCredit: toText(logo.credit),
    logoRightsNote: toText(logo.rights_note),
    logoRenderTreatment: toText(logo.render_treatment),
  };
  return hasContent(result) ? result : undefined;
}

export function adaptSourceBrandAnalysis(input, context = {}) {
  const model = asRecord(input);
  const brand = asRecord(model.brand);
  const handoff = asRecord(model.handoff);
  const layers = asRecord(model.analysis_layers);
  const decisionIndex = asRecord(model.decision_index);
  const designSystem = asRecord(model.design_system);
  const evidence = asArray(model.evidence_index).filter(isRecord);
  const assetIndex = createAssetIndex(context.assetRegistry);
  const review = normalizeReview(context.review);

  const synthesis = asRecord(layers.source_synthesis);
  const synthesisSummary = asArray(synthesis.topics)
    .flatMap((topic) => asArray(asRecord(topic).notes))
    .map(toText)
    .find(Boolean);

  const sections = SOURCE_LAYER_ORDER.map(([layerKey, fallbackTitle], offset) => {
    const index = offset + 1;
    const layer = asRecord(layers[layerKey]);
    const blocks = asArray(layer.topics).flatMap(topicBlocks);

    if (layerKey === 'source_synthesis') {
      const scope = keyValueTable('Research scope', {
        entity_scope: brand.entity_scope,
        era_start: brand.era_start,
        era_end: brand.era_end,
        product_mode: brand.product_mode,
      });
      const markets = listBlock('Markets', brand.markets);
      const languages = listBlock('Languages', brand.languages);
      const channels = listBlock('Channels', brand.channels);
      blocks.unshift(...[scope, markets, languages, channels].filter(Boolean));
    }

    const claimDomain = CLAIM_DOMAIN_BY_LAYER[layerKey];
    const claims = claimDomain ? cardGridBlock('Material claims', decisionIndex[claimDomain], { idPrefix: 'claim' }) : null;
    if (claims) blocks.push(claims);

    if (layerKey === 'system_synthesis') {
      const grammar = cardGridBlock('Causal grammar rules', model.grammar_rules, { idPrefix: 'grammar' });
      if (grammar) blocks.push(grammar);
    }

    if (layerKey === 'global_brand_system') {
      ['brand_color_scheme', 'typography_hierarchy', 'spacing_strategy', 'layout_strategy']
        .forEach((key) => blocks.push(...areaBlocks(designSystem[key])));
      const specimens = typographySpecimensBlock(
        'Typography specimens',
        typographyRows(designSystem.typography_hierarchy),
      );
      const boundary = proseBlock('Implementation boundary', [designSystem.implementation_boundary]);
      if (specimens) blocks.push(specimens);
      if (boundary) blocks.push(boundary);
    }

    const evidenceBlock = evidenceGridBlock(
      'Direct evidence',
      sectionEvidence(layer, evidence, layerKey),
      { assetIndex, publicBasePath: context.publicBasePath },
    );
    if (evidenceBlock) blocks.push(evidenceBlock);

    return makeSection({
      id: layerKey,
      index,
      label: 'Stage 01',
      title: firstText(layer.title, fallbackTitle),
      blocks,
    });
  });

  const handoffBlocks = [
    keyValueTable('Package handoff', {
      status: handoff.status,
      package_version: handoff.package_version,
    }),
    listBlock('Protected surface families', handoff.protected_surface_families),
    listBlock('Approved grammar IDs', handoff.approved_grammar_ids),
    listBlock('Unresolved gaps', handoff.unresolved_gaps),
    codeBlock('Downstream contract', model.downstream_contract),
    evidenceGridBlock('Evidence index', evidence, {
      assetIndex,
      publicBasePath: context.publicBasePath,
    }),
  ].filter(Boolean);
  sections.push(makeSection({
    id: 'handoff-and-evidence-gaps',
    index: sections.length + 1,
    label: 'Stage 01',
    title: 'Handoff, evidence gaps, and evidence index',
    blocks: handoffBlocks,
  }));

  return {
    meta: {
      title: `${firstText(brand.name, 'Source brand')} — Source Brand Analysis`,
      brandName: firstText(brand.name, 'Source brand'),
      stage: 'source_brand_analysis',
      status: firstText(review?.status, handoff.status, 'pending'),
      version: firstText(handoff.package_version, model.schema_version),
      summary: firstText(synthesisSummary, brand.entity_scope, 'Evidence-backed source-brand anatomy.'),
      ...(reportIdentity(model, context.publicBasePath)
        ? { identity: reportIdentity(model, context.publicBasePath) }
        : {}),
    },
    sections,
    ...(review ? { review } : {}),
  };
}
