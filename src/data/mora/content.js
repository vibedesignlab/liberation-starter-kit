/** MORA Landing — Stage 3 R5 content data. */

import assets from './assets';

export const brand = {
  headline: '좋은 재료를 고르는 데서 끝나지 않습니다.',
  support: 'MORA의 메이커는 재료를 고르고, 변환의 중간을 살피고, 내놓기 전 마지막 한 컵까지 확인합니다.',
  primaryCta: '여섯 레시피 비교하기',
  secondaryCta: '마지막 확인 보기',
};

export const statements = [
  { id: 'sb1', statement: '한 컵의 중간을 숨기지 않습니다.', image: assets.clothTransition },
  { id: 'sb2', statement: '재료마다 다르게 준비하고, 한 번 접습니다.', image: assets.methodProcessTable },
  { id: 'sb3', statement: '음식은 보이게, 확인한 사실은 부분 Batch Record에.', image: assets.vesselMaster },
];

export const values = [
  { name: '엄선하는 책임', copy: '좋은 재료를 모으는 것만큼 기준 밖의 것을 제외하고 선택의 이유를 남깁니다.' },
  { name: '보이는 변환', copy: '완제품만 보여 주지 않고 배양, 분리, 재료별 중간 상태와 마지막 fold의 인과를 드러냅니다.' },
  { name: '마지막까지 보는 정확성', copy: '한 컵을 내놓기 전 실제 상태를 확인하고, 확인한 사람과 결과만 제한적으로 기록합니다.' },
];

export const processSteps = [
  { step: 1, label: 'Selection', desc: '승인 기준 안과 밖의 원재료를 비교하고 분리합니다.' },
  { step: 2, label: 'Culturing', desc: '배양 조건과 멈춤 지점은 실제 R&D 기록으로 검증합니다.' },
  { step: 3, label: 'Separation', desc: '천에 남은 농축된 몸과 분리된 유청을 함께 확인합니다.', image: assets.etchClothToBody },
  { step: 4, label: 'Ingredient Preparation', desc: '각 재료를 서로 다른 사실적인 중간 상태로 준비합니다.', image: assets.methodInfusionLadder },
  { step: 5, label: 'Last Fold', desc: '넓은 도구의 한 번의 fold로 재료의 흔적을 남깁니다.', image: assets.methodFoldTrace },
  { step: 6, label: 'Packaging / Final Check', desc: '실제 음식과 부분 Batch Record를 함께 확인합니다.', image: assets.vesselClosureProof },
];

export const products = [
  {
    id: 'thyme-honey', name: 'Thyme Honey',
    role: 'core',
    product: assets.productThymeHoney, ingredient: assets.ingredientThymeHoney, etching: assets.etchThymeHoney,
    moment: assets.momentMorning, momentLabel: 'Morning',
  },
  {
    id: 'roasted-buckwheat', name: 'Roasted Buckwheat',
    role: 'core',
    product: assets.productBuckwheat, ingredient: assets.ingredientBuckwheat, etching: assets.etchBuckwheat,
    moment: assets.momentAfternoon, momentLabel: 'Afternoon',
  },
  {
    id: 'citrus-peel', name: 'Citrus Peel',
    role: 'core',
    product: assets.productCitrusPeel, ingredient: assets.ingredientCitrusPeel, etching: assets.etchCitrusPeel,
  },
  {
    id: 'black-sesame', name: 'Black Sesame',
    role: 'core',
    product: assets.productBlackSesame, ingredient: assets.ingredientBlackSesame, etching: assets.etchBlackSesame,
  },
  {
    id: 'fig-leaf', name: 'Fig Leaf',
    role: 'trial', status: 'Safety review',
    product: assets.productFigLeaf, ingredient: assets.ingredientFigLeaf, etching: assets.etchFigLeaf,
  },
  {
    id: 'olive-oil', name: 'Olive Oil & Sea Salt',
    role: 'trial', status: 'Stability testing',
    product: assets.productOliveOil, ingredient: assets.ingredientOliveOil, etching: assets.etchOliveOil,
    moment: assets.momentEvening, momentLabel: 'Evening (Studio Trial)',
  },
];

export const coreProducts = products.filter((p) => p.role === 'core');
export const trialProducts = products.filter((p) => p.role === 'trial');

export const vesselPhases = [
  { phase: 'SEE', label: 'See', desc: '실제 음식과 fill level, 부분 Batch Record를 함께 봅니다.', image: assets.vesselMaster },
  { phase: 'READ', label: 'Read', desc: '고정 식품 사실과 실제 maker-check 영역을 나눠 읽습니다.', image: assets.inspectionFront },
  { phase: 'OPEN', label: 'Open', desc: 'food seal을 제거하고 넓고 깨끗한 rim을 확인합니다.', image: assets.vesselOpenService },
  { phase: 'TASTE', label: 'Taste', desc: '첫 스푼의 단면에서 density와 internal trace를 확인합니다.', image: assets.firstSpoonMacro },
];

export const facts = [
  { label: 'Refrigerated direction', verified: false },
  { label: '150 g candidate', verified: false },
  { label: 'Wide-mouth vessel', verified: false },
  { label: 'Partial Batch Record', verified: false },
];

export const navLinks = [
  { label: '제품', href: '#collection' },
  { label: '제조', href: '#transformation' },
  { label: '용기', href: '#vessel' },
  { label: '확인된 사실', href: '#truth' },
];
