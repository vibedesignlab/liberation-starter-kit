import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const stage3 = path.resolve('brand-pipelines/le-labo-greek-yogurt/03-landing-materials');
const registryPath = path.join(stage3, 'asset-registry.json');
const modelPath = path.join(stage3, 'outputs/landing-materials.json');
const reviewPath = path.join(stage3, 'stage-review.json');

const now = new Date().toISOString();

const sha256 = (relativePath) => {
  const fullPath = path.join(stage3, relativePath);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing R6 asset: ${relativePath}`);
  return crypto.createHash('sha256').update(fs.readFileSync(fullPath)).digest('hex');
};

const replacements = {
  'ST3-R5-HERO-SELECTION-76': 'ST3-R6-HERO-SELECTION-WHEY-99',
  'ST3-ETCH-R2-46': 'ST3-R6-ETCH-THYME-HONEY-100',
  'ST3-ETCH-R2-47': 'ST3-R6-ETCH-FIG-LEAF-101',
  'ST3-ETCH-R2-48': 'ST3-R6-ETCH-ROASTED-BUCKWHEAT-102',
  'ST3-ETCH-R2-49': 'ST3-R6-ETCH-CITRUS-PEEL-103',
  'ST3-ETCH-R2-50': 'ST3-R6-ETCH-BLACK-SESAME-104',
  'ST3-ETCH-R2-51': 'ST3-R6-ETCH-OLIVE-OIL-SEA-SALT-105',
};

const heroPath = 'assets/revision-r6-feedback/editorial/st3-r6-01-hero-selection-whey-left-safe-3x2.png';
const heroPrompt = 'prompts/revision-r6-feedback/hero/ST3-R6-HERO-WHEY-01.md';

const etchings = {
  'ST3-ETCH-R2-46': {
    product: 'Thyme Honey',
    slug: 'thyme-honey',
    subject: 'Thyme and honey process',
    prompt: 'prompts/revision-r6-feedback/etchings/core/st3-r6-etch-thyme-honey-square.md',
  },
  'ST3-ETCH-R2-47': {
    product: 'Fig Leaf',
    slug: 'fig-leaf',
    subject: 'Fig leaf process',
    prompt: 'prompts/revision-r6-feedback/etchings/trials/st3-r6-etch-fig-leaf-square.md',
    paletteNote: 'Dominant generated background measures near Cultured Cream at RGB 248/244/236 rather than exact #F5F1E8.',
  },
  'ST3-ETCH-R2-48': {
    product: 'Roasted Buckwheat',
    slug: 'roasted-buckwheat',
    subject: 'Roasted buckwheat process',
    prompt: 'prompts/revision-r6-feedback/etchings/core/st3-r6-etch-roasted-buckwheat-square.md',
  },
  'ST3-ETCH-R2-49': {
    product: 'Citrus Peel',
    slug: 'citrus-peel',
    subject: 'Citrus peel process',
    prompt: 'prompts/revision-r6-feedback/etchings/core/st3-r6-etch-citrus-peel-square.md',
  },
  'ST3-ETCH-R2-50': {
    product: 'Black Sesame',
    slug: 'black-sesame',
    subject: 'Black sesame process',
    prompt: 'prompts/revision-r6-feedback/etchings/core/st3-r6-etch-black-sesame-square.md',
  },
  'ST3-ETCH-R2-51': {
    product: 'Olive Oil & Sea Salt',
    slug: 'olive-oil-sea-salt',
    subject: 'Olive oil and sea salt process',
    prompt: 'prompts/revision-r6-feedback/etchings/trials/st3-r6-etch-olive-oil-sea-salt-square.md',
    paletteNote: 'Dominant generated background measures near Cultured Cream at RGB 249/245/237 rather than exact #F5F1E8.',
  },
};

const replaceIds = (value) => {
  if (typeof value === 'string') return replacements[value] || value;
  if (Array.isArray(value)) return value.map(replaceIds);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceIds(item)]));
  }
  return value;
};

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
registry.generated_at = now;
registry.active_revision = 'R6-feedback';
registry.assets = registry.assets.map((asset) => {
  if (asset.asset_id === 'ST3-R5-HERO-SELECTION-76' || asset.asset_id === replacements['ST3-R5-HERO-SELECTION-76']) {
    return {
      ...asset,
      asset_id: replacements['ST3-R5-HERO-SELECTION-76'],
      role: 'layout_aware_landing_hero_selection_whey',
      communication_job: '첫 화면에서 여성 메이커의 원재료 승인·제외 판단과 농축 요거트·유청의 물리적 분리를 함께 보여 주며 좌측 중앙 카피를 보존한다.',
      file_path: heroPath,
      prompt_path: heroPrompt,
      subject: 'Female maker selecting raw materials beside retained Greek-yogurt body and gravity-collected whey',
      delivery_dimensions: '6144 × 4096',
      generation_provenance: `OpenAI built-in image generation using the accepted R5 hero as composition and world reference; untouched R6 native preserved. The 6144 × 4096 delivery master is a documented high-quality resample when native output is smaller and does not claim resampling created new optical detail. Delivery SHA-256 ${sha256(heroPath)}.`,
      reference_lineage: [
        'Accepted Stage 2 Revision 10 strategy',
        'Stage 2 Revision 16 analog editorial maker/workshop family',
        'Stage 3 R5 layout-aware hero composition',
        'Stage 3 R6 user feedback: higher-detail hero with visible yogurt-body and whey separation',
      ],
      invariants: [
        'exact 3:2 source matches the FullBleedSection landing slot',
        'left 42% remains uninterrupted low-frequency copy space',
        'maker, selection decision, retained yogurt body and whey collector remain inside the inner 82% safe area',
        'retained body sits above cloth and pale translucent whey collects directly below under gravity',
        'believable lived-in urban food workshop with hygienic stainless contact zones',
        'strict-front 45–55 mm environmental editorial camera with restrained visible analog magazine grain',
        'female maker authority is shown by an observable decision, never a gender stereotype',
      ],
      invariant_check: 'pass',
      status: 'registered',
    };
  }

  const priorAssetId = Object.entries(replacements).find(([, newAssetId]) => newAssetId === asset.asset_id)?.[0] || asset.asset_id;
  const spec = etchings[priorAssetId];
  if (!spec) return asset;
  const filePath = `assets/revision-r6-feedback/etchings/${['fig-leaf', 'olive-oil-sea-salt'].includes(spec.slug) ? 'trials' : 'core'}/st3-r6-etch-${spec.slug}-square.png`;
  return {
    ...asset,
    asset_id: replacements[priorAssetId],
    product_name: spec.product,
    role: 'ingredient_process_etching_breathing_room',
    file_path: filePath,
    prompt_path: spec.prompt,
    subject: spec.subject,
    delivery_dimensions: '3072 × 3072',
    generation_provenance: `OpenAI built-in image edit using the accepted R5 material folio as the direct edit target; untouched R6 native preserved. The 3072 × 3072 delivery master is a documented high-quality resample when native output is smaller and does not claim resampling created new drawn detail.${spec.paletteNote ? ` ${spec.paletteNote}` : ''} Delivery SHA-256 ${sha256(filePath)}.`,
    reference_lineage: [
      'MORA Revision R2 physical-process illustration lock',
      'Stage 3 R5 exact-square material folio',
      'Stage 3 R6 user feedback: smaller object group and increased background/inter-object breathing room',
    ],
    invariants: [
      spec.paletteNote
        ? 'fine near-Carbon physical-process linework on a visually flat near-Cultured-Cream field; exact palette drift is recorded in provenance'
        : 'fine #171714 physical-process linework on a uniform flat #F5F1E8 field',
      'complete causal process identity and tool sequence remain legible',
      'object group stays within the R6 occupancy contract and every contour clears the outer edge',
      'no artwork text, pseudo-text, arrow, label, founder identity claim or production-proof caption',
    ],
    allowed_variation: ['responsive display scale only; do not crop or enlarge the physical causal sequence'],
    invariant_check: 'pass',
    status: 'registered',
  };
});

let model = replaceIds(JSON.parse(fs.readFileSync(modelPath, 'utf8')));
model.hero_craft_space_series = {
  ...model.hero_craft_space_series,
  key_insight: '첫 화면은 한 사람의 승인·제외 판단을 유지하면서 농축된 몸과 그 아래 모인 유청까지 한 제조 인과로 보여 준다.',
  status: 'final_selected_revision_r6_feedback',
  selected_version: {
    ...model.hero_craft_space_series.selected_version,
    version: 'R6',
    name: 'Selection with Separation Evidence',
    asset_id: replacements['ST3-R5-HERO-SELECTION-76'],
    action: 'one maker separates accepted and rejected raw materials beside a gravity-aligned yogurt-body and whey witness',
    selection_reason: 'R5의 left-center Hero 구도와 여성 메이커 권위를 유지하면서 요거트 제조 증거와 더 큰 delivery master를 추가한다.',
    use: 'final R6 layout-aware landing hero',
  },
};

model.message_visual_map = {
  ...model.message_visual_map,
  brand_message_to_key_visual: '‘좋은 재료를 고르는 데서 끝나지 않습니다’는 left-safe Hero에서 한 여성 메이커의 원재료 승인·제외 판단과 농축 body–cloth–whey의 수직 분리 증거로 시작하고, true-aerial 재료, 1:2 last-fold 스크롤, partial Batch Record의 SEE–READ–OPEN–TASTE로 이어진다.',
};

model.brand_story = {
  ...model.brand_story,
  visual_storytelling: {
    ...model.brand_story.visual_storytelling,
    hero: '원재료 승인·제외와 농축 body–cloth–whey의 수직 분리 증거',
  },
};

model.section_map = model.section_map.map((section) => {
  if (section.section !== 'Hero') return section;
  return {
    ...section,
    communication_job: '원재료를 승인·제외하는 여성 메이커의 권위와 농축 요거트·유청 분리의 제조 증거를 첫 화면에서 연결한다.',
    proof_of: 'selection, separation and responsibility',
  };
});

model.landing_page_composition = model.landing_page_composition.map((section) => {
  if (section.section === 'Core Ingredient Folios') {
    return {
      ...section,
      asset_layout: 'full-width 4×2 square grid / row 1 process folios / row 2 true-aerial ingredients',
      asset_ids: [
        replacements['ST3-ETCH-R2-46'],
        replacements['ST3-ETCH-R2-48'],
        replacements['ST3-ETCH-R2-49'],
        replacements['ST3-ETCH-R2-50'],
        'ST3-R5-INGREDIENT-THYME-HONEY-93',
        'ST3-R5-INGREDIENT-ROASTED-BUCKWHEAT-95',
        'ST3-R5-INGREDIENT-CITRUS-PEEL-96',
        'ST3-R5-INGREDIENT-BLACK-SESAME-97',
      ],
    };
  }
  if (section.section === 'Trial Ingredient Folios') {
    return {
      ...section,
      asset_layout: 'full-width 2×2 square grid / row 1 process folios / row 2 true-aerial ingredients',
      asset_ids: [
        replacements['ST3-ETCH-R2-47'],
        replacements['ST3-ETCH-R2-51'],
        'ST3-R5-INGREDIENT-FIG-LEAF-94',
        'ST3-R5-INGREDIENT-OLIVE-OIL-SEA-SALT-98',
      ],
    };
  }
  return section;
});

model.material_folios_system = {
  ...model.material_folios_system,
  key_insight: '1행 일러스트는 제조 인과를 유지하되 오브젝트를 축소하고 배경과 각 단계 사이의 호흡을 늘려 4열 그리드에서 읽히게 한다.',
  style_lock: 'uniform flat #F5F1E8 field, fine #171714 line, object group within 60–64% width and 52–58% height, minimum 16–18% outer clearance, no text inside artwork.',
};

model.layout_aware_image_system = {
  ...model.layout_aware_image_system,
  key_insight: 'R6는 기존 CSS slot ratio를 유지하면서 Hero delivery와 1행 illustration의 내부 여백만 역할별로 강화한다.',
  high_resolution_truth: 'The R6 hero delivers at 6144×4096 and the six R6 material folios at 3072×3072. Built-in native generations remain preserved; any larger delivery resample is disclosed and is not claimed as new optical detail.',
};

model.layout_aware_image_system.slot_families = model.layout_aware_image_system.slot_families.map((slot) => {
  if (slot.role === 'FullBleed') {
    return { ...slot, delivery: '3072×2048 minimum; active R6 Hero 6144×4096' };
  }
  if (slot.role === 'Product and ingredient') {
    return { ...slot, delivery: '2048×2048 minimum; active R6 material folios 3072×3072' };
  }
  return slot;
});

model.production_reference_appendix = {
  ...model.production_reference_appendix,
  key_insight: 'R1–R5 자산은 삭제하지 않지만 R6 active registry와 공개 landing composition에서는 교체된 역할을 제외한다.',
};

model.previous_version_archive = {
  ...model.previous_version_archive,
  key_insight: 'R6는 현재 landing DOM의 32 unique raster 역할을 유지하고 교체된 R5 Hero와 material folios를 lineage로만 보존한다.',
  items: [
    ...model.previous_version_archive.items.filter((item) => item.version !== 'R5 hero and material folios'),
    {
      version: 'R5 hero and material folios',
      name: 'selection-only hero and denser square process groups',
      reason_archived: 'R6 adds explicit yogurt-body/whey evidence and more breathing room without changing the landing layout',
    },
  ],
};

const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
review.review_targets = review.review_targets.map((target) => target.replaceAll('R5', 'R6'));
review.adjustment_prompts = [
  '필요한 수정은 개별 R6 asset ID와 역할을 지정해 주세요. 기존 layout이나 interaction 변경은 별도 요청으로 분리합니다.',
];
const feedbackMessage = 'R6 이미지 피드백을 병렬 반영했다. Hero는 기존 여성 메이커·strict-front 제조실·좌측 42% 카피 영역을 유지하면서 농축 요거트와 중력으로 분리된 유청을 추가하고 6144×4096 delivery로 갱신했다. Core 4종과 Trial 2종의 1행 process folio는 제조 인과와 동판화 스타일을 유지한 채 오브젝트 점유율을 낮추고 외곽·오브젝트 간 여백을 확대했으며, 랜딩 컴포넌트·4×2 grid·scroll interaction은 변경하지 않았다.';
review.user_feedback = review.user_feedback.filter((feedback) => !String(feedback.message || '').startsWith('R6 이미지 피드백을 병렬 반영했다.'));
review.user_feedback.push({
  decision: 'revision_completed_pending_review',
  message: feedbackMessage,
  recorded_at: now,
});
review.updated_at = now;

fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
fs.writeFileSync(modelPath, `${JSON.stringify(model, null, 2)}\n`);
fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);

console.log(`Integrated ${registry.active_revision} with ${registry.assets.length} active assets.`);
