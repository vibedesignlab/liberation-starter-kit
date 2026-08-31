import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const stage3 = path.resolve('brand-pipelines/le-labo-greek-yogurt/03-landing-materials');
const stage2 = path.resolve('brand-pipelines/le-labo-greek-yogurt/02-extended-brand');
const modelPath = path.join(stage3, 'outputs/landing-materials.json');
const registryPath = path.join(stage3, 'asset-registry.json');
const reviewPath = path.join(stage3, 'stage-review.json');
const markdownPath = path.join(stage3, 'landing-materials.md');

const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
const oldRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
const source = JSON.parse(fs.readFileSync(path.join(stage2, 'outputs/extended-brand-anatomy.json'), 'utf8'));

const now = '2026-08-31T12:40:00Z';
const sourceVerbal = source.sections.verbal_branding_and_copy_hierarchy;
const sourcePositioning = source.sections.brand_positioning;
const sourceLineup = source.sections.landing_product_concept.product_lineup;

const sha256 = (relativePath) => {
  const full = path.join(stage3, relativePath);
  if (!fs.existsSync(full)) throw new Error(`Missing asset: ${relativePath}`);
  return crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
};

const ids = {
  hero: 'ST3-R5-HERO-SELECTION-76',
  why: 'ST3-R5-WHY-MORA-SELECTION-77',
  coreSticky: 'ST3-R5-CORE-STICKY-78',
  trialSticky: 'ST3-R5-TRIAL-STICKY-79',
  method: 'ST3-R5-METHOD-LEFT-SAFE-80',
  transition: 'ST3-R5-TRANSITION-CENTER-SAFE-81',
  see: 'ST3-R5-VESSEL-SEE-82',
  read: 'ST3-R5-VESSEL-READ-83',
  open: 'ST3-R5-VESSEL-OPEN-84',
  taste: 'ST3-R5-VESSEL-TASTE-85',
  evening: 'ST3-R5-EVENING-USE-86',
  products: {
    'Thyme Honey': 'ST3-R5-PRODUCT-THYME-HONEY-87',
    'Fig Leaf': 'ST3-R5-PRODUCT-FIG-LEAF-88',
    'Roasted Buckwheat': 'ST3-R5-PRODUCT-ROASTED-BUCKWHEAT-89',
    'Citrus Peel': 'ST3-R5-PRODUCT-CITRUS-PEEL-90',
    'Black Sesame': 'ST3-R5-PRODUCT-BLACK-SESAME-91',
    'Olive Oil & Sea Salt': 'ST3-R5-PRODUCT-OLIVE-OIL-SEA-SALT-92',
  },
  ingredients: {
    'Thyme Honey': 'ST3-R5-INGREDIENT-THYME-HONEY-93',
    'Fig Leaf': 'ST3-R5-INGREDIENT-FIG-LEAF-94',
    'Roasted Buckwheat': 'ST3-R5-INGREDIENT-ROASTED-BUCKWHEAT-95',
    'Citrus Peel': 'ST3-R5-INGREDIENT-CITRUS-PEEL-96',
    'Black Sesame': 'ST3-R5-INGREDIENT-BLACK-SESAME-97',
    'Olive Oil & Sea Salt': 'ST3-R5-INGREDIENT-OLIVE-OIL-SEA-SALT-98',
  },
};

const productSlugs = {
  'Thyme Honey': 'thyme-honey',
  'Fig Leaf': 'fig-leaf',
  'Roasted Buckwheat': 'roasted-buckwheat',
  'Citrus Peel': 'citrus-peel',
  'Black Sesame': 'black-sesame',
  'Olive Oil & Sea Salt': 'olive-oil-sea-salt',
};

const promptForProduct = {
  'Thyme Honey': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-THYME-HONEY-01.md',
  'Fig Leaf': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-FIG-LEAF-SQUARE.md',
  'Roasted Buckwheat': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-ROASTED-BUCKWHEAT-SQUARE.md',
  'Citrus Peel': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-CITRUS-PEEL-SQUARE.md',
  'Black Sesame': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-BLACK-SESAME-SQUARE.md',
  'Olive Oil & Sea Salt': 'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-OLIVE-OIL-SEA-SALT-SQUARE.md',
};

const dimensionsByRatio = {
  '3:2 landscape': '3072 × 2048',
  '1:2 portrait': '2048 × 4096',
  '1:1 square': '2048 × 2048',
};

const makeAsset = ({
  asset_id,
  product_name = 'MORA Brand World',
  role,
  communication_job,
  file_path,
  prompt_path,
  subject,
  aspect_ratio,
  reference_lineage,
  invariants,
  allowed_variation,
  provenance,
}) => ({
  asset_id,
  product_name,
  role,
  communication_job,
  file_path,
  prompt_path,
  subject,
  aspect_ratio,
  delivery_dimensions: dimensionsByRatio[aspect_ratio],
  generation_provenance: `${provenance} Delivery SHA-256 ${sha256(file_path)}.`,
  reference_lineage,
  invariants,
  allowed_variation,
  invariant_check: 'pass',
  status: 'registered',
});

const editorialBase = {
  reference_lineage: [
    'Accepted Stage 2 Revision 10 strategy',
    'Stage 2 Revision 16 analog editorial maker/workshop family',
    'Stage 3 R5 layout slot contract',
  ],
  invariants: [
    'exact source ratio matches the rendered landing slot',
    'critical evidence remains inside the declared safe area under object-fit cover',
    'believable lived-in urban food workshop with hygienic stainless contact zones',
    'restrained visible analog magazine grain without fake distress',
    'female maker authority is shown by one observable decision or action, never a gender stereotype',
  ],
  allowed_variation: ['minor responsive edge trim inside the declared sacrificial zone only'],
  provenance: 'OpenAI built-in image generation; untouched native preserved; high-resolution delivery master is an explicitly recorded resample, not newly generated optical detail.',
};

const newAssets = [
  makeAsset({
    ...editorialBase,
    asset_id: ids.hero,
    role: 'layout_aware_landing_hero_selection',
    communication_job: '첫 화면에서 여성 메이커가 원재료를 승인·제외하는 한 판단을 보여 주고 좌측 중앙 카피를 보존한다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-01-hero-selection-left-safe-3x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/ST3-R5-HERO-SELECTION-01.md',
    subject: 'Female maker selecting and rejecting raw materials in the lived-in MORA workshop',
    aspect_ratio: '3:2 landscape',
    invariants: [...editorialBase.invariants, 'left 42% remains uninterrupted low-frequency copy space'],
  }),
  makeAsset({
    ...editorialBase,
    asset_id: ids.why,
    role: 'layout_aware_why_mora_selection',
    communication_job: 'Why MORA split에서 한 명의 메이커가 accepted와 rejected 재료 상태를 직접 비교한다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-02-why-mora-selection-3x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/editorial/st3-r5-02-why-mora-selection-3x2.md',
    subject: 'Strict-front maker comparison of accepted and rejected ingredient states',
    aspect_ratio: '3:2 landscape',
  }),
  makeAsset({
    ...editorialBase,
    asset_id: ids.coreSticky,
    role: 'layout_aware_core_sticky_story',
    communication_job: 'Core 2×2 제품 그리드의 긴 스크롤 동안 한 번의 last-fold와 final-check 행동을 1:2 세로 서사로 유지한다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-03-core-sticky-story-1x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/editorial/st3-r5-03-core-sticky-story-1x2.md',
    subject: 'Vertical Core Collection last-fold and final-check story',
    aspect_ratio: '1:2 portrait',
    invariants: [...editorialBase.invariants, 'all maker, hand, tool, bowl, jar and record evidence survives the native exact 1:2 frame'],
    provenance: 'OpenAI built-in exact 1:2 portrait generation; untouched native preserved; delivery is a high-quality resample only, not a crop and not newly generated optical detail.',
  }),
  makeAsset({
    ...editorialBase,
    asset_id: ids.trialSticky,
    role: 'layout_aware_trial_sticky_story',
    communication_job: 'Studio Trials 스크롤에서 Fig Leaf와 Olive Oil & Sea Salt를 승인 제품과 분리된 조건부 중간 상태로 점검한다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-04-trial-sticky-story-1x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/editorial/st3-r5-04-trial-sticky-story-1x2.md',
    subject: 'Vertical Studio Trials conditional intermediate-state check',
    aspect_ratio: '1:2 portrait',
    invariants: [...editorialBase.invariants, 'all maker, trial vessels and conditional record evidence survives the exact 1:2 center crop'],
    provenance: 'OpenAI built-in portrait generation; untouched native preserved; delivery is a declared exact 1:2 center crop followed by high-quality resampling, not newly generated optical detail.',
  }),
  makeAsset({
    ...editorialBase,
    asset_id: ids.method,
    role: 'layout_aware_material_method',
    communication_job: '여섯 재료의 서로 다른 중간 상태와 넓은 도구의 한 번의 폴딩을 우측에 두고 좌측 중앙 카피를 보존한다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-05-material-method-left-safe-3x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/editorial/st3-r5-05-material-method-left-safe-3x2.md',
    subject: 'Six factual intermediate states and one low-shear fold on the right side of frame',
    aspect_ratio: '3:2 landscape',
    invariants: [...editorialBase.invariants, 'left 42% remains uninterrupted low-frequency copy space', 'intermediate vessels remain culinary scale'],
  }),
  makeAsset({
    ...editorialBase,
    asset_id: ids.transition,
    role: 'layout_aware_center_copy_straining_transition',
    communication_job: '거름 천·농축된 몸·유청의 분리를 주변부에 남기고 중앙 카피 영역을 비운다.',
    file_path: 'assets/revision-r5-layout-aware/editorial/st3-r5-06-transition-straining-center-safe-3x2.png',
    prompt_path: 'prompts/revision-r5-layout-aware/editorial/ST3-R5-TRANSITION-STRAINING-06.md',
    subject: 'True-aerial straining evidence around a centered copy field',
    aspect_ratio: '3:2 landscape',
    invariants: [...editorialBase.invariants, 'central 44% width by 42% height remains low-frequency copy space'],
  }),
];

const vesselDefinitions = [
  [ids.see, 'vessel_see_fullbleed', 'transparent jar, food visibility and partial Batch Record를 한 실루엣으로 본다.', 'st3-r5-07-vessel-see-bottom-left-3x2', 'Complete sealed MORA jar and edible witness area'],
  [ids.read, 'vessel_read_fullbleed', '고정 Batch Record 필드와 제한된 실제 maker-check 영역의 정보 위계를 읽는다.', 'st3-r5-08-vessel-read-bottom-left-3x2', 'Partial Batch Record hierarchy on a low-wide jar'],
  [ids.open, 'vessel_open_fullbleed', '한 손이 기능적 식품 seal을 열고 wide mouth와 깨끗한 rim을 드러낸다.', 'st3-r5-09-vessel-open-bottom-left-3x2', 'One physically plausible food-seal opening action'],
  [ids.taste, 'vessel_taste_fullbleed', '첫 스푼의 단면에서 밀도와 Thyme Honey의 실제 내부 trace를 확인한다.', 'st3-r5-10-vessel-taste-bottom-left-3x2', 'First spoon exposing yogurt density and internal trace'],
  [ids.evening, 'evening_use_fullbleed', '한 컵이 놓인 절제된 저녁 사용 맥락을 보여 주되 Studio Trial 또는 효능 주장으로 확대하지 않는다.', 'st3-r5-11-evening-use-bottom-left-3x2', 'Restrained evening use with one jar and one spoon'],
];

for (const [asset_id, role, communication_job, basename, subject] of vesselDefinitions) {
  newAssets.push(makeAsset({
    ...editorialBase,
    asset_id,
    role,
    communication_job,
    file_path: `assets/revision-r5-layout-aware/vessel/${basename}.png`,
    prompt_path: `prompts/revision-r5-layout-aware/vessel/${basename}.md`,
    subject,
    aspect_ratio: '3:2 landscape',
    reference_lineage: [...editorialBase.reference_lineage, 'Stage 2 Revision 18 plain Thyme Honey product master'],
    invariants: [...editorialBase.invariants, 'bottom-left 40% by 30% remains calm and clear for the sticky copy', 'current partial paper Batch Record replaces the archived direct-print-only glass system'],
  }));
}

for (const product of sourceLineup) {
  const name = product.product_name;
  const slug = productSlugs[name];
  const file_path = `assets/revision-r5-layout-aware/products/st3-r5-product-${slug}.png`;
  newAssets.push(makeAsset({
    asset_id: ids.products[name],
    product_name: name,
    role: 'layout_aware_product_card_strict_front',
    communication_job: `${name}을 다른 SKU와 동일한 strict-front 좌표·크기·배경에서 비교하고 음식 차이만 보여 준다.`,
    file_path,
    prompt_path: promptForProduct[name],
    subject: `Strict-front ${name} low-wide jar on Cultured Cream UI field`,
    aspect_ratio: '1:1 square',
    reference_lineage: [
      'Accepted Stage 2 Revision 10 package system',
      'ST2-R18-UI-PRODUCT-01 strict-front Thyme Honey master',
      'Runtime theme.palette.background.default #F5F1E8',
    ],
    invariants: [
      'exact 1:1 source matches ProductCard',
      'strict-front low-wide transparent wide-mouth jar with complete silhouette and generous margins',
      'uniform flat #F5F1E8 UI field with no physical floor, wall, horizon, gradient or prop',
      'partial Batch Record covers no more than 30–40% of the visible sidewall and edible witness remains dominant',
      'recipe-specific food trace is factual and not a garnish or cosmetic color treatment',
    ],
    allowed_variation: ['food trace visibility may reduce after real R&D validation; jar, label, scale, axis and UI field stay locked'],
    provenance: 'OpenAI built-in reference-based image generation; untouched 1254 × 1254 native preserved; delivery is a high-quality 2048 × 2048 resample, not newly generated optical detail.',
  }));
}

for (const product of sourceLineup) {
  const name = product.product_name;
  const slug = productSlugs[name];
  const file_path = `assets/revision-r5-layout-aware/ingredients/st3-r5-ingredient-aerial-${slug}.png`;
  newAssets.push(makeAsset({
    asset_id: ids.ingredients[name],
    product_name: name,
    role: 'layout_aware_raw_ingredient_aerial',
    communication_job: `${name}의 raw input을 제품·요거트·중간 preparation과 분리해 true-aerial 사실 이미지로 보여 준다.`,
    file_path,
    prompt_path: 'prompts/revision-r5-layout-aware/ingredients/ST3-R5-INGREDIENT-AERIAL-SERIES.md',
    subject: `True-aerial raw ingredient evidence for ${name}`,
    aspect_ratio: '1:1 square',
    reference_lineage: ['Accepted Stage 2 Revision 18 raw ingredient aerial series', 'Stage 3 R5 square folio slot contract'],
    invariants: [
      'exact 1:1 source matches the ingredient folio slot',
      'strict 90-degree aerial with complete vessel silhouettes',
      'actual culinary scale and factual ingredient color',
      'stainless-only food-contact field with no product, yogurt, label, hand, prop or text',
    ],
    allowed_variation: [name === 'Fig Leaf' ? 'recorded 10–11% horizontal margin is accepted for this layout-matched square because no ratio crop occurs' : 'minor edge trim may affect stainless field only'],
    provenance: 'Accepted Stage 2 Revision 18 built-in image generation; 1254 × 1254 native preserved byte-for-byte in Stage 3; delivery is a high-quality 2048 × 2048 resample, not newly generated optical detail.',
  }));
}

const retainedEtchingIds = ['ST3-ETCH-R2-42', 'ST3-ETCH-R2-43', 'ST3-ETCH-R2-45', 'ST3-ETCH-R2-46', 'ST3-ETCH-R2-47', 'ST3-ETCH-R2-48', 'ST3-ETCH-R2-49', 'ST3-ETCH-R2-50', 'ST3-ETCH-R2-51'];
const retainedPath = {
  'ST3-ETCH-R2-42': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-brand-trace-3x2.png',
  'ST3-ETCH-R2-43': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-first-furrow-3x2.png',
  'ST3-ETCH-R2-45': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-cloth-to-body-3x2.png',
  'ST3-ETCH-R2-46': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-thyme-honey-square.png',
  'ST3-ETCH-R2-47': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-fig-leaf-square.png',
  'ST3-ETCH-R2-48': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-roasted-buckwheat-square.png',
  'ST3-ETCH-R2-49': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-citrus-peel-square.png',
  'ST3-ETCH-R2-50': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-black-sesame-square.png',
  'ST3-ETCH-R2-51': 'assets/revision-r5-layout-aware/etchings/st3-r5-etch-olive-oil-sea-salt-square.png',
};

const retainedEtchings = retainedEtchingIds.map((assetId) => {
  const previous = oldRegistry.assets.find((item) => item.asset_id === assetId);
  if (!previous) throw new Error(`Missing retained registry record ${assetId}`);
  const file_path = retainedPath[assetId];
  const aspect_ratio = previous.aspect_ratio;
  return {
    ...previous,
    file_path,
    delivery_dimensions: dimensionsByRatio[aspect_ratio],
    generation_provenance: `${previous.generation_provenance} R5 preserves the artwork and resamples it to the layout delivery master; no new drawn detail is claimed. Delivery SHA-256 ${sha256(file_path)}.`,
    reference_lineage: [...previous.reference_lineage, 'Stage 3 R5 layout-preservation decision'],
    invariants: [
      'fine #171714 physical-process linework on uniform #F5F1E8 field',
      'complete artwork survives its exact-ratio landing slot',
      'no artwork text, founder identity claim, facility claim or production-proof caption',
      ...(assetId === 'ST3-ETCH-R2-47' ? ['Fig Leaf remains a directional conditional folio and is not release or safety proof'] : []),
    ],
    allowed_variation: ['responsive display scale only; do not crop the physical causal sequence'],
    invariant_check: 'pass',
    status: 'registered',
  };
});

const registry = {
  schema_version: '1.1.0',
  artifact_type: 'landing_product_asset_registry',
  stage: 'landing_materials',
  generated_at: now,
  active_revision: 'R5-layout-aware',
  assets: [...newAssets, ...retainedEtchings],
};

const productAssetId = (name) => ids.products[name];
const ingredientAssetId = (name) => ids.ingredients[name];
const etchingByProduct = {
  'Thyme Honey': 'ST3-ETCH-R2-46',
  'Fig Leaf': 'ST3-ETCH-R2-47',
  'Roasted Buckwheat': 'ST3-ETCH-R2-48',
  'Citrus Peel': 'ST3-ETCH-R2-49',
  'Black Sesame': 'ST3-ETCH-R2-50',
  'Olive Oil & Sea Salt': 'ST3-ETCH-R2-51',
};

model.generated_at = now;
model.extended_brand_source = {
  package_path: stage2,
  json_path: 'outputs/extended-brand-anatomy.json',
  review_status: 'accepted',
  report_id: 'mora-extended-anatomy',
  accepted_revision: 'Revision 10 strategy with Revision 16–18 active imagery',
  registered_anchor_assets: ['ST2-PRODUCT-HERO-01', 'ST2-BRAND-MOOD-01'],
  transferred_supporting_assets: [
    'ST2-R18-UI-PRODUCT-01',
    'ST2-R18-RAW-AERIAL-01',
    'ST2-R18-RAW-AERIAL-02',
    'ST2-R18-RAW-AERIAL-03',
    'ST2-R18-RAW-AERIAL-04',
    'ST2-R18-RAW-AERIAL-05',
    'ST2-R18-RAW-AERIAL-06',
  ],
};
model.selected_narrative_route = 'NR-10-01 — 마지막까지 보는 사람';
model.message_visual_map = {
  brand_message_to_key_visual: '‘좋은 재료를 고르는 데서 끝나지 않습니다’는 left-safe Hero에서 한 여성 메이커가 원재료를 승인·제외하는 행동으로 시작하고, true-aerial 분리, 1:2 last-fold 스크롤, partial Batch Record의 SEE–READ–OPEN–TASTE로 이어진다.',
  brand_values_to_brand_mood: [
    '엄선하는 책임 → strict-front maker selection과 accepted / rejected material의 물리적 분리',
    '보이는 변환 → true-aerial cloth–concentrate–whey, 여섯 intermediate state, one broad-paddle fold',
    '마지막까지 보는 정확성 → 1:2 final-check story와 partial Batch Record의 실제 정보 위계·개봉·첫 스푼',
  ],
  family_and_product_usp_to_product_imagery: [
    '제품 6종은 실제 런타임 Cultured Cream #F5F1E8 위의 동일 1:1 strict-front jar로 먼저 비교한다.',
    '원재료 6종은 true-aerial 1:1 evidence로, Material Folio 6종은 별도의 물리 인과 주석으로 짝지어 보여 준다.',
    'dark analog process mood, color-accurate product proof, actual-scale ingredient proof는 서로의 색보정과 증거 역할을 침범하지 않는다.',
    'generic landscape master를 square 또는 1:2 slot에 재사용하지 않는다.',
  ],
};
model.landing_narrative = {
  key_insight: '현재 랜딩의 그리드와 sticky scroll은 유지하되, 각 사진이 실제 슬롯과 같은 비율로 만들어져야 선택→변환→마지막 확인의 증거가 crop 없이 이어진다.',
  brand_message: sourceVerbal.brand_message,
  hero_eyebrow: 'MORA CRAFT GREEK YOGURT',
  hero_headline: sourceVerbal.brand_message,
  hero_support: sourceVerbal.brand_message_support,
  section_sequence: [
    'Hero — 3:2 left-center copy-safe 원재료 선택과 제외 행동.',
    'Brand Trace — 전체가 보이는 3:2 물리 공정 에칭.',
    'Straining Transition — 중앙 카피를 비운 3:2 true-aerial 분리 장면.',
    'Why MORA — 3:2 maker selection과 First Furrow split.',
    'Core Collection — dedicated 1:2 last-fold sticky story와 1:1 제품 4종.',
    'Core Ingredient Folios — 1:1 aerial 원재료와 1:1 물리 인과 에칭 4쌍.',
    'Studio Trials — dedicated 1:2 conditional-state sticky story와 1:1 제품 카드.',
    'Trial Ingredient Folios — Fig Leaf와 Olive Oil & Sea Salt의 조건부 1:1 증거 2쌍.',
    'Cloth to Body — crop 없는 공정 에칭 pause.',
    'Material Method — 3:2 left-center copy-safe 여섯 중간 상태와 last fold.',
    'Vessel Record — 3:2 bottom-left copy-safe SEE / READ / OPEN / TASTE.',
    'Evening Use — 3:2 bottom-left copy-safe 사용 맥락 뒤 Product Truth CTA.',
  ],
  primary_cta: '여섯 레시피 비교하기',
  secondary_cta: '마지막 확인 보기',
};
model.hero_craft_space_series = {
  key_insight: '첫 화면의 권위는 빈 제조실이 아니라 한 사람이 무엇을 승인하고 제외하는지에서 시작한다.',
  status: 'final_selected_revision_r5_layout_aware',
  series_lock: {
    web_role: 'exact 3:2 FullBleedSection landing hero',
    composition: 'left 42% low-frequency copy-safe; maker and selection action in right 48%; all evidence inside inner 82%',
    space: 'believable lived-in urban food workshop, never a studio set',
    people: 'one accountable female maker performing one observable selection decision',
    capture: 'strict-front 45–55 mm environmental editorial with restrained visible 35 mm grain',
  },
  selected_version: {
    version: 'R5',
    name: 'Selection Before Claim',
    asset_id: ids.hero,
    action: 'accepted and rejected raw materials are physically separated by one maker',
    selection_reason: 'Stage 2 NR-10-01과 현재 left-center Hero 구도를 동시에 만족하고 기존 16:9 crop을 제거한다.',
    use: 'final layout-aware landing hero',
  },
};
model.brand_value = {
  key_insight: '여성 메이커의 권위는 부드러운 스타일이 아니라 선택·중간 상태·마지막 확인의 공개된 기준에서 생긴다.',
  values: sourceVerbal.brand_values.map((item) => ({
    name: item.value,
    statement: item.statement,
    behavior: item.behavior,
    proof: item.proof_required,
    status: item.status,
  })),
  statement: sourceVerbal.brand_message_support,
  proof: sourcePositioning.proof,
  short_variants: sourceVerbal.headline_direction,
};
model.brand_story = {
  key_insight: 'MORA는 “여성이 만든 예쁜 요거트”가 아니라, 가족의 미식을 맡아 온 사람에게 요구되던 선택·기억·마지막 책임을 현대적인 여성 식품 장인의 공개된 판단 체계로 바꾼다.',
  headline: '마지막까지 보는 사람.',
  body: '주방의 주인, 엄선된 수집가, 엄마와 아내라는 계보는 고정된 역할이나 감상적인 희생을 뜻하지 않습니다. 먹을 사람을 생각하며 작은 차이를 기억하고, 기준 밖의 것을 제외하고, 내놓기 전 마지막 상태까지 확인해 온 책임의 상징입니다. MORA의 여성 메이커는 재료를 고르고, 배양과 거름의 중간을 살피고, 재료마다 다른 preparation을 비교하고, 한 번의 fold 뒤 실제 음식의 상태를 확인합니다. 좋은 재료라는 말보다 어떤 판단이 한 컵을 통과했는지를 보여 주는 것. 그것이 MORA의 마지막 집요함입니다.',
  product_connection: 'Selection → Culturing → Separation → Ingredient Preparation → Last Fold → Packaging / Final Check의 각 장면은 one input, one tool, one action, one intermediate output, one record로 설명됩니다. 부분 Batch Record는 고정 제품 사실과 실제 maker check를 분리해 마지막 책임을 남기되, 검증되지 않은 이름·날짜·수치·서명을 만들어 내지 않습니다.',
  visual_storytelling: {
    system_name: 'What She Checked / Material Under Care',
    principle: '한 프레임에 한 판단만 두고 input–tool–action–output–record의 인과를 남긴다.',
    hero: '원재료 승인과 제외',
    process: 'true-aerial separation과 six intermediate states',
    last_measure: '1:2 last-fold / final-check scroll story',
    record: 'partial Batch Record and SEE–READ–OPEN–TASTE sequence',
    use_moment_rule: '한 컵과 한 스푼, 최대 한 개의 보조 cue만 허용하며 가족 역할이나 여성성 클리셰를 연출하지 않는다.',
  },
  founder_release_gate: model.brand_story.founder_release_gate,
};
model.product_introduction = {
  key_insight: '같은 low-wide jar와 기록 구조 안에서 재료별 실제 preparation과 edible trace가 제품 선택 차이를 만든다.',
  family_name: 'MORA Craft Greek Yogurt',
  headline: '여섯 재료, 여섯 중간 상태, 여섯 가지 마지막 결.',
  description: 'MORA는 되직한 cultured base를 낮고 넓은 transparent wide-mouth jar에 담고, 재료마다 다른 preparation을 마지막 fold에서 실제 음식의 결로 남깁니다. 부분 Batch Record는 MORA, recipe와 승인된 식품 사실을 고정 인쇄하고, 실제 maker initials와 final check는 제한된 가변 영역에만 남깁니다. 종이가 기록을 맡아도 음식과 fill level이 가장 큰 시각 면적을 유지합니다.',
  shared_promise: sourcePositioning.promise,
  family_usp: sourceVerbal.family_usp,
  lineup_groups: [
    { name: 'Core Collection', description: 'Thyme Honey, Roasted Buckwheat, Citrus Peel, Black Sesame. 실제 R&D와 출시 검증을 전제로 한 네 방향.' },
    { name: 'Studio Trials', description: 'Fig Leaf, Olive Oil & Sea Salt. 안전성·안정성·사용 맥락이 확인된 경우에만 전환되는 두 조건부 방향.' },
  ],
  packaging_architecture: 'low-wide transparent 150 g wide-mouth spoon jar / edible witness area 60–70% minimum / partial uncoated-looking Batch Record 30–40% maximum / fixed printed food fields plus limited authentic maker-check area / validated full-perimeter food seal / optional functional low-profile overcap',
  customer_experience: [
    'SEE — transparent wall과 wide mouth에서 실제 음식·fill level·recipe trace를 본다.',
    'READ — 부분 Batch Record의 고정 사실과 제한된 maker-check 영역을 구분해 읽는다.',
    'OPEN — food seal을 완전히 제거하고 깨끗한 rim과 untouched surface를 확인한다.',
    'TASTE — 첫 스푼의 단면에서 density와 internal trace를 확인한다.',
  ],
  use_moments: [
    { asset_id: ids.coreSticky, product_name: 'Core Collection', moment: 'last fold and final check', status: 'directional process context' },
    { asset_id: ids.trialSticky, product_name: 'Studio Trials', moment: 'conditional intermediate-state check', status: 'not release proof' },
    { asset_id: ids.evening, product_name: 'MORA family', moment: 'restrained evening table', status: 'context only' },
  ],
};
model.reference_system = {
  key_insight: 'Stage 2 R16은 maker·workshop·film response를, R18은 true-aerial raw input과 plain UI product를 고정하며 R5는 이 정체성을 실제 landing slot 비율로 새로 조립한다.',
  status: 'Revision 10 strategy / Revision 16 mood / Revision 18 product and ingredient references / Revision 5 layout-aware landing delivery',
  golden_masters: [ids.hero, ids.coreSticky, ids.trialSticky, ids.products['Thyme Honey'], ids.ingredients['Thyme Honey']],
  individual_ingredient_references: Object.values(ids.ingredients),
  prompt_modules: [
    'prompts/revision-r5-layout-aware/ST3-R5-HERO-SELECTION-01.md',
    'prompts/revision-r5-layout-aware/ingredients/ST3-R5-INGREDIENT-AERIAL-SERIES.md',
    'prompts/revision-r5-layout-aware/products/ST3-R5-PRODUCT-THYME-HONEY-01.md',
    '.work/revision-r5-layout-aware/stage3-image-production-contract.md',
    '.work/revision-r5-layout-aware/landing-slot-contract.md',
  ],
  series_lock: {
    runtime_ui_background: '#F5F1E8 theme.palette.background.default',
    product_camera: 'strict front / exact 1:1 / identical centerline and baseline',
    ingredient_camera: 'strict 90-degree aerial / exact 1:1 / complete group',
    fullbleed_camera: 'exact 3:2 source with overlay-specific safe field',
    sticky_camera: 'dedicated exact 1:2 portrait; no landscape reuse',
    object_fit_rule: 'cover may remove only the declared sacrificial edge zone',
  },
  qa_loop: ['lock role and slot', 'generate once at maximum native size', 'correct only a wrong role/axis/crop/identity', 'preserve native', 'derive exact-ratio high-resolution delivery', 'record actual provenance'],
  dual_authority: 'Stage 2 controls brand/product identity; current JSX controls frame ratio, copy-safe area and responsive crop tolerance.',
};
model.vessel_record_system = {
  name: 'MORA Partial Batch Record',
  design_intent: '실제 음식과 fill level을 가장 크게 남기면서 승인된 고정 식품 사실과 한 배치의 실제 final check를 분리해 기록하는 떠먹는 식품 용기 체계.',
  physical_architecture: [
    'low-wide transparent 150 g wide-mouth spoon jar; diameter:height candidate approximately 1.45–1.65:1',
    'edible witness area at least 60–70%',
    'partial tactile uncoated-looking paper Batch Record covering no more than 30–40% of the visible sidewall',
    'functional full-perimeter food seal; optional low-profile overcap only after engineering validation',
  ],
  print_rule: 'MORA, recipe, approved category/weight and standardized food fields are fixed print. Real maker initials, final check and batch condition occupy only a small designated variable area. No full-wrap pharmacy grid, decorative signature, handwritten legal information or fabricated city/date ritual.',
  opening_sequence: 'see food and record → read fixed facts and real check → peel validated food seal → inspect wide clean rim → take one spoon',
  variable_data_rule: '승인된 실제 production or inspection event에 해당하는 mark만 사용하며 가짜 개인화 기록은 만들지 않는다.',
  production_gate: 'jar material, closure stack, wet-strength paper, adhesive, ink, coating, migration, condensation, rub, scan, line compatibility, food contact, seal and cold-chain performance remain directional until supplier and regulatory validation.',
};
model.layout_aware_image_system = {
  key_insight: '해상도보다 먼저 source master ratio를 실제 CSS slot ratio와 일치시켜야 crop이 사라진다.',
  preserved_implementation: ['MoraLandingPage section order', 'FullBleedSection 3:2', 'SplitEditorial 2-column responsive stack', 'StickyProductGrid 1:2 main plus sticky 2×2 cards', 'VesselPhaseBlock sticky bottom-left copy'],
  slot_families: [
    { role: 'FullBleed', ratio: '3:2', delivery: '3072×2048 minimum', safe_area: 'inner 82% plus overlay-specific left-center / center / bottom-left field' },
    { role: 'Sticky main', ratio: '1:2', delivery: '2048×4096 minimum', safe_area: 'center 68% width and inner 88% height before exact center crop' },
    { role: 'Product and ingredient', ratio: '1:1', delivery: '2048×2048 minimum', safe_area: 'complete subject with minimum 12% edge clearance; Fig Leaf aerial exception recorded' },
  ],
  high_resolution_truth: 'Built-in native generations are preserved. Delivery masters are resampled to the required pixel dimensions when native output is smaller; the package does not claim that resampling created new optical detail.',
  no_reuse_rule: 'A 3:2 environment is never reused for 1:2 sticky or 1:1 evidence. Only an identical product master may repeat in more than one ProductCard occurrence.',
};

const proofCopy = {
  'Thyme Honey': '방향성 레시피. honey viscosity, thyme preparation, particle scale, sweetness와 stability는 실제 R&D로 확인합니다.',
  'Fig Leaf': 'Studio Trial / release-blocked. edible part, jurisdiction, extraction route, safety와 allergen 검증 전에는 출시·섭취 사실로 말하지 않습니다.',
  'Roasted Buckwheat': '방향성 레시피. roast state, grind size, hydration, distribution, allergen와 shelf stability를 확인합니다.',
  'Citrus Peel': '방향성 레시피. edible peel, bitterness, particle size, color stability와 distribution을 확인합니다.',
  'Black Sesame': '방향성 레시피. sesame allergen control, grind, oil migration, oxidation과 실제 grey value를 확인합니다.',
  'Olive Oil & Sea Salt': 'Studio Trial. oil stability, emulsion, salt dissolution, sensory balance와 shelf life를 확인합니다.',
};
const eyebrow = {
  'Thyme Honey': 'CORE / HERBAL',
  'Fig Leaf': 'STUDIO TRIAL / GREEN',
  'Roasted Buckwheat': 'CORE / TOASTED',
  'Citrus Peel': 'CORE / BRIGHT',
  'Black Sesame': 'CORE / DEEP',
  'Olive Oil & Sea Salt': 'STUDIO TRIAL / SAVORY',
};
model.product_lineup_copy = sourceLineup.map((product) => ({
  lineup_group: 'individual_product',
  product_name: product.product_name,
  product_usp: product.product_usp,
  eyebrow: eyebrow[product.product_name],
  headline: product.landing_message,
  description: product.differentiator,
  feature_copy: `${product.use_case} / ${product.form_cues.intermediate_state}`,
  proof_copy: proofCopy[product.product_name],
  cta: product.product_name === 'Fig Leaf' || product.product_name === 'Olive Oil & Sea Salt' ? `${product.product_name} 검증 상태 보기` : `${product.product_name} 보기`,
  asset_id: productAssetId(product.product_name),
}));

const coreNames = ['Thyme Honey', 'Roasted Buckwheat', 'Citrus Peel', 'Black Sesame'];
const trialNames = ['Fig Leaf', 'Olive Oil & Sea Salt'];
model.landing_page_composition = [
  { order: '01', section: 'Hero', headline: sourceVerbal.brand_message, body: sourceVerbal.brand_message_support, asset_layout: 'FullBleedSection exact 3:2 / left-center / left 42% clear', asset_ids: [ids.hero], cta: '여섯 레시피 비교하기' },
  { order: '02', section: 'Brand Trace', headline: '고른 것보다, 끝까지 본 것.', body: '선택·변환·마지막 확인의 인과를 물리적 에칭으로 짧게 남깁니다.', asset_layout: 'intrinsic 3:2 narrative plate / no crop', asset_ids: ['ST3-ETCH-R2-42'], cta: '제조의 중간 보기' },
  { order: '03', section: 'Straining Transition', headline: '한 컵의 중간을 숨기지 않습니다.', body: '천에 남은 농축된 몸과 분리된 유청을 중앙 카피 주변의 실제 물성으로 보여 줍니다.', asset_layout: 'FullBleedSection exact 3:2 / center / central 44%×42% clear', asset_ids: [ids.transition], cta: '변환 보기' },
  { order: '04', section: 'Why MORA', headline: '무엇을 남길지 판단하는 사람.', body: '한 명의 메이커가 기준 안과 밖의 재료를 직접 비교합니다.', asset_layout: 'SplitEditorial 3:2 maker + 3:2 etching', asset_ids: [ids.why, 'ST3-ETCH-R2-43'], cta: '선택 기준 보기' },
  { order: '05', section: 'Core Collection Sticky', headline: 'Vol. 1 — Four Directions', body: '1:2 last-fold story가 고정되는 동안 네 1:1 제품을 비교합니다.', asset_layout: 'StickyProductGrid exact 1:2 main + sticky 2×2 product cards', asset_ids: [ids.coreSticky, ...coreNames.map(productAssetId)], cta: 'Core Collection 보기' },
  { order: '06', section: 'Core Ingredient Folios', headline: '재료와 변환을 한 쌍으로.', body: '각 원재료 aerial과 Material Folio를 같은 1:1 규격으로 이어 봅니다.', asset_layout: 'four SplitEditorial 1:1 aerial / 1:1 etching pairs', asset_ids: coreNames.flatMap((name) => [ingredientAssetId(name), etchingByProduct[name]]), cta: 'Core 재료 보기' },
  { order: '07', section: 'Studio Trials Sticky', headline: '확인되기 전에는 출시하지 않습니다.', body: 'Fig Leaf와 Olive Oil & Sea Salt를 조건부 중간 상태와 기록으로 분리합니다.', asset_layout: 'reversed StickyProductGrid exact 1:2 main + sticky 2×2 product cards', asset_ids: [ids.trialSticky, ...trialNames.map(productAssetId)], cta: '검증 기준 보기' },
  { order: '08', section: 'Trial Ingredient Folios', headline: '조건부 재료도 같은 사실 규격으로.', body: 'raw input과 방향성 process folio를 release proof와 분리합니다.', asset_layout: 'two SplitEditorial 1:1 aerial / 1:1 etching pairs', asset_ids: trialNames.flatMap((name) => [ingredientAssetId(name), etchingByProduct[name]]), cta: 'Trial 재료 보기' },
  { order: '09', section: 'Cloth to Body', headline: '천에서 몸으로.', body: '거름의 물리적 인과를 crop 없는 3:2 에칭으로 보여 줍니다.', asset_layout: 'intrinsic 3:2 narrative plate / no crop', asset_ids: ['ST3-ETCH-R2-45'], cta: '공정 보기' },
  { order: '10', section: 'Material Method', headline: '재료마다 다르게 준비하고, 한 번 접습니다.', body: '여섯 중간 상태와 하나의 broad-paddle action을 우측에 모읍니다.', asset_layout: 'FullBleedSection exact 3:2 / left-center / left 42% clear', asset_ids: [ids.method], cta: 'Batch Record 보기' },
  { order: '11', section: 'Vessel SEE', headline: 'SEE', body: '실제 음식과 부분 Batch Record를 함께 봅니다.', asset_layout: 'FullBleedSection exact 3:2 / bottom-left clear', asset_ids: [ids.see], cta: '다음 단계' },
  { order: '12', section: 'Vessel READ', headline: 'READ', body: '고정 식품 사실과 실제 maker-check 영역을 나눠 읽습니다.', asset_layout: 'FullBleedSection exact 3:2 / bottom-left clear', asset_ids: [ids.read], cta: '다음 단계' },
  { order: '13', section: 'Vessel OPEN', headline: 'OPEN', body: 'food seal을 제거하고 wide clean rim을 확인합니다.', asset_layout: 'FullBleedSection exact 3:2 / bottom-left clear', asset_ids: [ids.open], cta: '다음 단계' },
  { order: '14', section: 'Vessel TASTE', headline: 'TASTE', body: '첫 스푼 단면에서 density와 internal trace를 확인합니다.', asset_layout: 'FullBleedSection exact 3:2 / bottom-left clear', asset_ids: [ids.taste], cta: '제품 사실 보기' },
  { order: '15', section: 'Evening Use', headline: '한 컵이 놓이는 식탁.', body: '한 jar와 한 spoon만으로 절제된 사용 맥락을 남깁니다.', asset_layout: 'FullBleedSection exact 3:2 / bottom-left clear', asset_ids: [ids.evening], cta: '출시 소식 받기' },
  { order: '16', section: 'Product Truth / CTA', headline: '확인한 것만 기록합니다.', body: '창립자 전기·레시피 수치·효능·포장 성능·출시 정보는 실제 검증 뒤에만 공개합니다.', asset_layout: 'text-only NewsletterCTA and footer; no new raster', asset_ids: [], cta: '출시 소식 받기' },
];

const sectionMap = [];
const addMap = (section, communication_job, copy, proof_of, asset_id, cta) => sectionMap.push({ section, communication_job, copy, proof_of, asset_id, cta });
addMap('Hero', '원재료를 승인·제외하는 여성 메이커의 권위와 브랜드 메시지를 첫 화면에서 연결한다.', sourceVerbal.brand_message_support, 'selection and responsibility', ids.hero, '여섯 레시피 비교하기');
addMap('Brand Trace', '선택부터 마지막 trace까지의 물리 인과를 작은 설명 이미지로 남긴다.', '고른 것보다, 끝까지 본 것.', 'physical process lineage', 'ST3-ETCH-R2-42', '제조의 중간 보기');
addMap('Straining Transition', '농축된 몸과 유청의 분리를 centered-copy full bleed로 보여 준다.', '한 컵의 중간을 숨기지 않습니다.', 'visible separation', ids.transition, '변환 보기');
addMap('Why MORA', 'accepted/rejected 재료 비교로 maker judgment를 증명한다.', '무엇을 남길지 판단하는 사람.', 'selection criteria', ids.why, '선택 기준 보기');
addMap('Why MORA', '첫 furrow와 one-fold의 차이를 물리 주석으로 보완한다.', '한 번의 fold가 남긴 결과를 읽습니다.', 'one-fold causal annotation', 'ST3-ETCH-R2-43', '선택 기준 보기');
addMap('Core Collection Sticky', 'Core scroll 동안 last fold와 final check의 한 행동을 유지한다.', '네 방향을 한 번의 마지막 판단으로 묶습니다.', 'last-fold responsibility', ids.coreSticky, 'Core Collection 보기');
for (const name of coreNames) addMap('Core Collection Sticky', `${name}을 동일한 strict-front 제품 규격에서 비교한다.`, name, 'product identity and edible trace', productAssetId(name), `${name} 보기`);
for (const name of coreNames) {
  addMap('Core Ingredient Folios', `${name} raw input을 true-aerial로 분리한다.`, name, 'raw ingredient identity', ingredientAssetId(name), '재료 보기');
  addMap('Core Ingredient Folios', `${name} preparation과 finished trace의 방향성 인과를 주석으로 보여 준다.`, name, 'directional physical process', etchingByProduct[name], '변환 보기');
}
addMap('Studio Trials Sticky', '두 조건부 레시피의 중간 상태와 기록을 승인 제품과 분리한다.', '확인되기 전에는 출시하지 않습니다.', 'conditional trial gate', ids.trialSticky, '검증 기준 보기');
for (const name of trialNames) addMap('Studio Trials Sticky', `${name}의 조건부 제품 방향을 동일한 strict-front 규격으로 보여 준다.`, name, 'directional product identity', productAssetId(name), `${name} 검증 상태 보기`);
for (const name of trialNames) {
  addMap('Trial Ingredient Folios', `${name} raw input을 true-aerial로 분리한다.`, name, 'raw ingredient identity, not release proof', ingredientAssetId(name), '재료 보기');
  addMap('Trial Ingredient Folios', `${name} process folio를 안전·출시 증명과 분리된 방향성 주석으로 보여 준다.`, name, 'conditional physical process', etchingByProduct[name], '검증 기준 보기');
}
addMap('Cloth to Body', 'cloth–whey–concentrate의 물리 인과를 crop 없이 설명한다.', '천에서 몸으로.', 'straining causality', 'ST3-ETCH-R2-45', '공정 보기');
addMap('Material Method', '여섯 intermediate state와 one-fold action을 left-safe frame으로 보여 준다.', '재료마다 다르게 준비하고, 한 번 접습니다.', 'measured transformation', ids.method, 'Batch Record 보기');
addMap('Vessel SEE', '음식과 partial Batch Record의 동시 가시성을 보여 준다.', 'SEE', 'edible witness area and record coverage', ids.see, '다음 단계');
addMap('Vessel READ', 'fixed facts와 authentic-variable mark 영역을 분리한다.', 'READ', 'information hierarchy', ids.read, '다음 단계');
addMap('Vessel OPEN', 'food seal의 실제 opening sequence를 보여 준다.', 'OPEN', 'opening usability', ids.open, '다음 단계');
addMap('Vessel TASTE', '첫 spoon section에서 density와 trace를 보여 준다.', 'TASTE', 'first-spoon product truth', ids.taste, '제품 사실 보기');
addMap('Evening Use', '한 컵과 한 스푼의 절제된 사용 맥락으로 닫는다.', '한 컵이 놓이는 식탁.', 'context only', ids.evening, '출시 소식 받기');
model.section_map = sectionMap;
model.registered_product_assets = registry.assets.map((asset) => asset.asset_id);
model.production_reference_appendix = {
  key_insight: 'R1–R4 자산은 삭제하지 않지만 R5 active registry와 공개 landing composition에서는 제외한다.',
  archived_registry_path: 'asset-registry.json prior to R5 migration is recoverable from version control or working history',
  current_contracts: ['.work/revision-r5-layout-aware/stage3-image-production-contract.md', '.work/revision-r5-layout-aware/landing-slot-contract.md', '.work/revision-r5-layout-aware/current-asset-fit-audit.md'],
};
model.previous_version_archive = {
  key_insight: 'R5는 현재 landing DOM에 실제로 쓰이는 32 unique raster 역할만 active로 남긴다.',
  status: 'archive_only_not_registered',
  items: [
    { version: 'R2/R3 product and vessel', name: 'direct-print tall glass system', reason_archived: 'Stage 2 Revision 10의 low-wide partial Batch Record와 충돌' },
    { version: 'R2/R3 use moments', name: 'generic 3:2 moments reused in 1:2 sticky slots', reason_archived: 'source ratio mismatch causes 66.7% width loss' },
    { version: 'R2/R4 fullbleed', name: '16:9 Hero / transition / method sources', reason_archived: 'current FullBleedSection is exact 3:2' },
    { version: 'Unused current assets', name: 'six dormant raster keys', reason_archived: 'not mounted by MoraLandingPage' },
  ],
  retention_rule: 'Old files and prompts remain in their revision folders for lineage. They do not appear in active registry, section map, product lineup or landing composition.',
};
model.boundaries = {
  key_insight: '이 패키지는 현재 layout에 맞는 copy·photo direction·delivery master를 제공하지만 실제 창립자·레시피·공정·라벨·포장 성능·출시 상태를 증명하지 않는다.',
  unverified_claims: [
    'founder name, biography, family role, career, first experiment, quote and current operational role',
    'recipe quantities, culture/straining/folding conditions, pH, yield, shelf life, nutrition, benefit and sensory performance',
    'Fig Leaf edible species/part, jurisdiction, toxicology, allergen and release suitability',
    'jar, seal, paper, adhesive, ink, condensation, migration, rub, scan, line, cold-chain and legal-label performance',
    'price, launch date, retail channel, inventory and purchase availability',
  ],
  protected_brand_and_product_invariants: [
    sourceVerbal.brand_message,
    'female maker authority is observable selection, memory, measured care and final responsibility; never a stereotype',
    'one input, one tool, one action, one intermediate output and one record per process frame',
    'low-wide transparent 150 g wide-mouth jar, edible witness 60–70%, partial Batch Record 30–40% maximum',
    'fixed printed facts and limited authentic-variable maker check remain separate',
    'product 1:1, ingredient 1:1 true aerial, FullBleed 3:2 and sticky 1:2 remain distinct source masters',
    'new delivery masters meet the recorded high-resolution pixel dimensions; resampling provenance remains explicit',
    'generated maker is not captioned as founder; generated workshop is not captioned as actual facility',
    'Fig Leaf and Olive Oil & Sea Salt remain conditional Studio Trials',
    'no Le Labo wordmark, perfume silhouette, pharmacy label grid, ingredient-plus-number naming, city/date ritual or trade dress',
  ],
  out_of_scope: ['landing component or interaction redesign', 'browser visual QA', 'founder biography without factual intake', 'food R&D or HACCP approval', 'regulatory label approval', 'packaging engineering approval', 'e-commerce implementation'],
};

review.status = 'pending';
review.review_targets = [
  'R5가 현재 MoraLandingPage의 32 unique raster 역할과 정확히 대응하고 기존 grid·sticky scroll·section order를 바꾸지 않는지',
  'Hero·Transition·Method·Vessel·Evening이 exact 3:2와 left-center / center / bottom-left safe area를 지키는지',
  'Core와 Trial sticky가 generic landscape 재사용 없이 exact 1:2로 제작되어 maker action과 product evidence를 자르지 않는지',
  '제품 6종이 exact 1:1 strict-front, 동일 jar scale·좌표·#F5F1E8 UI field·부분 Batch Record를 유지하는지',
  '원재료 6종이 exact 1:1 true-aerial, complete vessels와 실제 조리 규모를 유지하는지',
  'R5 process imagery가 lived-in urban workshop와 위생적 stainless contact zone을 함께 보여 주며 방송 세트로 보이지 않는지',
  'Stage 2 NR-10-01 여성 메이커 서사가 외모·모성·가사 클리셰가 아니라 selection·transformation·last check 행동으로 이어지는지',
  '모든 active raster가 요구 delivery dimensions를 충족하며 native / crop / resample provenance를 숨기지 않는지',
];
review.adjustment_prompts = ['필요한 수정은 개별 R5 asset ID와 역할을 지정해 주세요. 기존 layout이나 interaction 변경은 별도 요청으로 분리합니다.'];
review.user_feedback.push({
  decision: 'revision_completed_pending_review',
  message: '변경된 Stage 2 Revision 10/R16–R18을 기준으로 Stage 3을 R5 layout-aware package로 교체했다. 현재 landing component, 2열 grid, 2×2 sticky product matrix와 scroll sequence는 유지하고, 32 unique raster 역할을 3:2 FullBleed, 1:2 sticky, 1:1 product/ingredient exact source masters로 맞췄다. 신규 delivery는 3072×2048, 2048×4096, 2048×2048로 제공하며 native 생성본과 crop/resample provenance를 분리 기록했다. direct-print tall glass와 mismatched legacy imagery는 active registry에서 제외하고 partial Batch Record 체계로 통일했다.',
  recorded_at: '2026-08-31T21:40:00+09:00',
});
review.updated_at = '2026-08-31T21:40:00+09:00';

const markdown = `# MORA Stage 3 — Landing Materials R5\n\n## 1. Landing narrative and hierarchy\n\n**${model.landing_narrative.brand_message}**\n\n${model.landing_narrative.hero_support}\n\nR5는 현재 랜딩 컴포넌트와 스크롤 구조를 유지하고 Selection → Visible Transformation → Last Measure → Product / Ingredient Proof → SEE–READ–OPEN–TASTE 순서로 이미지를 교체한다.\n\n## 2. Brand value copy\n\n${model.brand_value.values.map((item) => `- **${item.name}** — ${item.statement}`).join('\n')}\n\n## 3. Brand story copy\n\n### ${model.brand_story.headline}\n\n${model.brand_story.body}\n\n${model.brand_story.product_connection}\n\n## 4. Product-family introduction\n\n### ${model.product_introduction.headline}\n\n${model.product_introduction.description}\n\n## 5. Product-lineup copy\n\n${model.product_lineup_copy.map((item) => `### ${item.product_name}\n\n${item.headline}\n\n${item.description}\n\n${item.proof_copy}`).join('\n\n')}\n\n## 6. Layout-aware image renders and section mapping\n\n- FullBleed: exact 3:2, 3072×2048 delivery, overlay-specific safe field.\n- Sticky main: exact 1:2, 2048×4096 delivery, dedicated portrait composition.\n- Product / ingredient: exact 1:1, 2048×2048 delivery, complete subject.\n- Active registry: ${registry.assets.length} unique raster masters, matching the current landing DOM.\n- Existing component grid and scroll interactions are preserved.\n- Native generation, crop and resample provenance are recorded separately; resampling is not claimed as new optical detail.\n\nReview status: pending.\n`;

fs.writeFileSync(modelPath, `${JSON.stringify(model, null, 2)}\n`);
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
fs.writeFileSync(markdownPath, markdown);

console.log(`Wrote R5 canonical model with ${registry.assets.length} active assets and ${sectionMap.length} section-map records.`);
