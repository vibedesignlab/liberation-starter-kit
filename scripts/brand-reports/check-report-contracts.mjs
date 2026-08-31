#!/usr/bin/env node

import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeBrandReport, REPORT_STRUCTURES } from '../../src/utils/brand-reports/index.js';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIRECTORY, '..', '..');

const sourceLayers = Object.fromEntries([
  'source_synthesis',
  'evidence_and_authorship',
  'strategy',
  'verbal_system',
  'identity_and_channel_tokens',
  'key_visual_system',
  'brand_mood_and_world',
  'photography_and_film',
  'product_representation',
  'product_native_visual_and_cognitive_language',
  'composition_and_cross_channel_grammar',
  'product_interface_and_service_behavior',
  'system_synthesis',
  'global_brand_system',
].map((key) => [key, { title: key, key_insight: `${key} insight.`, topics: [] }]));

const fixtures = {
  source_brand_analysis: {
    artifact_type: 'source_brand_analysis',
    schema_version: '1.2.0',
    brand: { name: 'Source', entity_scope: 'Masterbrand', product_mode: 'physical' },
    handoff: { status: 'pending', package_version: '1.0.0', unresolved_gaps: [] },
    analysis_layers: sourceLayers,
    decision_index: { strategy: [{ claim: 'Source claim.' }] },
    design_system: {},
    grammar_rules: [{ intended_effect: 'Grammar effect.' }],
    evidence_index: [],
    downstream_contract: { target_direction: null },
  },
  extended_brand_anatomy: {
    artifact_type: 'extended_brand_anatomy',
    schema_version: '1.1.0',
    target: { working_name: 'Target', category: 'Category', audience: 'Audience' },
    sections: Object.fromEntries([
      'source_grammar_application',
      'brand_positioning',
      'landing_product_concept',
      'verbal_branding_and_copy_hierarchy',
      'visual_branding_and_key_visual',
      'brand_mood_and_brand_imagery',
      'product_visual_traits_and_product_imagery',
      'design_token_direction',
    ].map((key) => [key, { key_insight: `${key} insight.` }])),
    registered_anchor_assets: [],
  },
  landing_materials: {
    artifact_type: 'landing_materials',
    schema_version: '1.1.0',
    selected_narrative_route: 'Route',
    landing_narrative: { key_insight: 'Narrative insight.', brand_message: 'Message.' },
    brand_value: { key_insight: 'Value insight.', values: [] },
    brand_story: { key_insight: 'Story insight.' },
    product_introduction: { key_insight: 'Family insight.', family_name: 'Family' },
    product_lineup_key_insight: 'Lineup insight.',
    product_lineup_copy: [],
    section_map_key_insight: 'Mapping insight.',
    section_map: [],
    registered_product_assets: [],
    boundaries: {},
  },
};

const reviewByType = {
  source_brand_analysis: 'source_brand_analysis',
  extended_brand_anatomy: 'extended_brand_anatomy',
  landing_materials: 'landing_materials',
};

fixtures.extended_brand_anatomy.sections.design_token_direction = {
  key_insight: 'Rendered token insight.',
  color: [{
    token: 'color.canvas',
    role: 'Canvas',
    relationship: 'new',
    source_basis: 'Source basis.',
    target_direction: 'Target direction.',
    landing_use: 'Landing background.',
    status: 'directional',
    value: '#F2EFE8',
    on_color: '#242522',
  }],
  typography: [{
    token: 'type.display',
    role: 'Display',
    relationship: 'new',
    source_basis: 'Source basis.',
    target_direction: 'Target direction.',
    landing_use: 'Hero headline.',
    status: 'directional',
    font_family: 'Outfit, sans-serif',
    font_size: '5.5rem',
    font_weight: 700,
    line_height: 0.95,
    sample: 'Live type specimen.',
  }],
};

fixtures.extended_brand_anatomy.sections.brand_mood_and_brand_imagery = {
  key_insight: 'Rendered mood insight.',
  supporting_series: [{
    asset_id: 'ST2-AMBIENT-CONTRACT-01',
    role: 'ambient_key_visual',
    local_path: '/brand-reports/contract-fixture/assets/ambient-contract.png',
  }],
};

for (const [artifactType, fixture] of Object.entries(fixtures)) {
  const report = normalizeBrandReport(fixture, {
    review: {
      artifact_type: 'stage_review',
      stage: reviewByType[artifactType],
      status: 'pending',
      adjustment_prompts: ['Review.'],
    },
    assetRegistry: { assets: [] },
    publicBasePath: '/brand-reports/contract-fixture',
  });
  const expectedIds = REPORT_STRUCTURES[artifactType].map(([id]) => id);
  const actualIds = report.sections.map(({ id }) => id);
  if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) {
    throw new Error(`${artifactType} section contract drifted.`);
  }
  if (artifactType === 'extended_brand_anatomy') {
    const tokenSection = report.sections.find(({ id }) => id === 'design-token-direction');
    const tokenBlockTypes = tokenSection?.blocks.map(({ type }) => type) ?? [];
    if (!tokenBlockTypes.includes('color-tokens')) {
      throw new Error('Extended report must render directional colors as swatches.');
    }
    if (!tokenBlockTypes.includes('typography-specimens')) {
      throw new Error('Extended report must render directional typography as live specimens.');
    }
    const conceptSection = report.sections.find(({ id }) => id === 'source-grammar-application');
    const ambientEvidence = conceptSection?.blocks.find((block) => (
      block.type === 'evidence-grid'
      && block.items?.some(({ id }) => id === 'ST2-AMBIENT-CONTRACT-01')
    ));
    if (!ambientEvidence) {
      throw new Error('Extended report must lead with ambient key visuals as image evidence.');
    }
  }
}

const forbiddenLegacyFiles = [
  '.agents/skills/research-brand-anatomy/assets/report.css',
  '.agents/skills/research-brand-anatomy/scripts/render_report.py',
  '.agents/skills/research-brand-anatomy/scripts/unify_existing_report.py',
  '.agents/skills/research-brand-anatomy/scripts/validate_report_language.py',
  '.agents/skills/build-brand-from-anatomy/scripts/render_extended_report.py',
  '.agents/skills/build-landing-materials/scripts/render_landing_report.py',
];

for (const relativePath of forbiddenLegacyFiles) {
  try {
    await access(path.join(PROJECT_ROOT, relativePath));
    throw new Error(`Forbidden legacy report file exists: ${relativePath}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

process.stdout.write('PASS fixed Stage 1–3 React report contracts and no legacy renderers.\n');
