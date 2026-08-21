# 브랜드 리포트 Storybook 마이그레이션 계획

## 목표와 경계

Stage 1·2·3의 정적 HTML을 최종 소비 형식으로 사용하던 구조를 JSON 기반의 Storybook 문서 화면으로 전환한다. 브랜드 스킬이 생성하는 canonical JSON, 검토 상태, 에셋 provenance는 그대로 유지하고 Storybook은 이를 읽어 공통 문서 컴포넌트로 표현한다.

- canonical 산출물은 각 스킬 패키지 안의 JSON이다. Storybook 코드는 canonical 데이터를 수정하거나 보강하지 않는다.
- 기존 HTML 생성과 검증은 호환 기간 동안 유지한다. Storybook 등록은 검증을 통과한 패키지를 별도 정적 공간에 복제하는 후속 단계다.
- 등록 과정은 원본 패키지를 변경하지 않는다.
- 브라우저 자동화는 이 마이그레이션의 기본 검증 수단이 아니다. 데이터 계약, 정적 빌드, 단위 테스트로 우선 검증한다.

## 목표 디렉터리 규칙

```text
public/brand-reports/
├── registry.json
└── <report-id>/
    ├── report.json
    ├── review.json                 # 원본에 stage-review.json이 있을 때
    ├── asset-registry.json         # 원본에 asset-registry.json이 있을 때
    └── assets/
        └── <safe-stem>-<sha256>.<ext>

src/components/brand-documentation/ # 단계 공통 순수 프레젠테이션
├── BrandReportDocument.jsx
├── BrandBlockRenderer.jsx
└── ...                             # hero, section, evidence, review 블록

src/utils/brand-reports/            # Stage JSON → 공통 문서 모델 어댑터
├── adaptSourceBrandAnalysis.js
├── adaptExtendedBrandAnatomy.js
├── adaptLandingMaterials.js
└── ...                             # 공통 정규화·경로 유틸리티

src/stories/brand-reports/          # Storybook 로더·카탈로그·정적 CSF
├── RegisteredBrandReport.jsx
├── BrandReportCatalog.jsx
├── Overview.stories.jsx
└── generated/
    └── <report-id>.stories.jsx     # 등록 CLI가 소유하는 정적 CSF
```

규칙은 다음과 같다.

1. `<report-id>`는 소문자 ASCII, 숫자, 단일 하이픈만 허용한다. 명시하지 않으면 브랜드명과 단계에서 결정론적으로 파생한다.
2. Storybook이 직접 제공할 데이터와 이미지만 `public/brand-reports/`에 둔다. React 코드에서 특정 브랜드 JSON을 import하지 않는다.
3. 원본 이미지의 모든 provenance 필드는 보존한다. 복제된 JSON의 로컬 이미지 경로만 `/brand-reports/<report-id>/assets/...`로 바꾼다.
4. 이미지 파일명은 안전한 stem과 콘텐츠 SHA-256으로 만든다. 같은 이름의 서로 다른 파일이 충돌하지 않고, 동일 입력의 재등록 결과는 같다.
5. `registry.json`은 `id` 순으로 정렬한다. 시간이나 머신별 절대 경로를 넣지 않는다.
6. `generated/`는 사람 손으로 편집하지 않는다. 각 파일은 `RegisteredBrandReport`를 import하고 `Docs` 스토리에 `reportId`만 전달한다.
7. Storybook 사이드바 제목은 `Brand Reports/<brand>/<Stage label>`을 사용한다.

## 데이터 등록 계약

등록 명령은 Stage 패키지 디렉터리에서 아래 파일 중 정확히 하나를 감지한다.

| 단계 | canonical JSON | 필수 `artifact_type` |
|---|---|---|
| Stage 1 | `outputs/source-brand-analysis.json` | `source_brand_analysis` |
| Stage 2 | `outputs/extended-brand-anatomy.json` | `extended_brand_anatomy` |
| Stage 3 | `outputs/landing-materials.json` | `landing_materials` |

`stage-review.json`과 `asset-registry.json`은 존재할 때 복제한다. 경로 이탈, 누락된 로컬 이미지, artifact/stage 불일치, 여러 canonical JSON이 동시에 있는 패키지는 명확한 오류로 중단한다.

```bash
node scripts/brand-reports/register-brand-report.mjs /absolute/or/relative/package
node scripts/brand-reports/register-brand-report.mjs ./package --id acme-stage-1
node scripts/brand-reports/register-brand-report.mjs ./package --id acme-stage-1 --check
```

정상 등록은 다음을 한 번에 갱신한다.

- `public/brand-reports/<report-id>/`의 정규화된 JSON과 복제 에셋
- `public/brand-reports/registry.json`의 정렬된 단일 레코드
- `src/stories/brand-reports/generated/<report-id>.stories.jsx`의 정적 CSF

재등록할 때 해당 report-id의 public 패키지와 해당 generated story만 교체한다. 다른 브랜드 패키지와 generated story는 건드리지 않는다. `--check`는 같은 변환을 메모리에서 계산해 public 패키지의 파일 집합과 내용, registry 레코드, generated story, 에셋 바이트를 비교하며 어떤 파일도 쓰지 않는다.

## Storybook 문서 컴포넌트 원칙

공통 프레젠테이션 컴포넌트는 정규화된 문서 모델의 의미를 표현하고 Stage별 어댑터는 섹션 순서와 가용 필드를 결정한다.

- `RegisteredBrandReport`는 `reportId`로 registry와 report/review/asset registry를 로드하고 loading, error, unsupported artifact 상태를 명시적으로 보여준다.
- `BrandReportDocument`는 hero, section, review checkpoint를 포함하는 공통 문서 셸이다.
- `BrandBlockRenderer`는 prose, list, table, card grid, evidence grid, token 관계 등 정규화된 블록 유형을 렌더링한다.
- `adaptSourceBrandAnalysis`는 evidence, claim, grammar, global system 관계를 공통 문서 모델로 구성한다.
- `adaptExtendedBrandAnatomy`는 positioning, product family/lineup, verbal/visual system, token direction, 두 anchor asset을 구성한다.
- `adaptLandingMaterials`는 narrative, brand value/story, lineup copy, section map, product render를 구성한다.
- 데이터가 비어 있을 때 임의 카피를 만들지 않는다. `없음`, evidence gap, pending 상태를 계약에 맞춰 표시한다.
- JSON의 exact source values를 테마 토큰으로 승격하지 않는다. 리포트 콘텐츠는 프로젝트 전역 MUI 테마와 분리된 문서 표면에서 표현한다.

## 단계별 마이그레이션

### Phase 0 — 기반과 계약 잠금

1. 등록 CLI, public registry schema, generated CSF 규칙을 추가한다.
2. Storybook 공통 loader와 문서 프리미티브를 만든다.
3. 잘못된 artifact, 경로 이탈, 누락 이미지, 충돌 ID, 재등록, `--check`를 스크립트 테스트로 고정한다.
4. 기존 HTML renderer와 JSON exporter는 수정하지 않는다.

완료 조건은 예제 fixture 세 단계가 동일한 등록 명령으로 public package와 CSF를 만들고 정적 Storybook 빌드가 통과하는 것이다.

### Phase 1 — Stage 1 Source Brand Analysis

1. 기존 HTML 섹션 순서에 맞춰 scope, evidence, strategy, verbal, identity/tokens, key visual, mood, photography, product representation, product-native language, behavior, grammar, global system, gaps, evidence index를 매핑한다.
2. `report_identity.logo.local_path`와 `evidence_index[].local_path`를 복제 에셋 URL로 검증한다.
3. claim의 evidence ID, confidence, alternative, exception을 축약하지 않고 모듈로 표시한다.
4. 기존 HTML 한 건과 Storybook 문서의 섹션/이미지/evidence 수를 구조적으로 비교한다.

### Phase 2 — Stage 2 Extended Brand Anatomy

1. Stage 1 프리미티브를 재사용하되 target positioning과 lineup 전용 모듈을 추가한다.
2. `asset-registry.json`의 representative product hero와 brand mood 이미지를 `AssetFigure`로 연결한다.
3. source lineage, protected boundaries, token의 keep/tune/new 관계가 사라지지 않는지 검증한다.
4. review 상태와 adjustment prompt를 `ReviewCheckpoint`에 표시한다.

### Phase 3 — Stage 3 Landing Materials

1. landing narrative, value, story, product introduction, lineup copy, section map 전용 모듈을 추가한다.
2. 등록된 모든 제품 렌더가 lineup/section map과 연결되는지 검증한다.
3. Stage 2의 제품명과 Stage 3 lineup parity를 정적 데이터 검사로 확인한다.
4. Storybook 문서를 향후 랜딩 구현 입력으로 사용하되, 리포트 컴포넌트가 실제 랜딩페이지 컴포넌트로 오해되지 않게 경계를 표시한다.

### Phase 4 — 스킬 파이프라인 통합

1. 각 Stage의 기존 export/render/validate가 성공한 뒤 등록 CLI를 실행하도록 스킬 지침을 갱신한다.
2. 사용자 검토 링크는 HTML 파일과 Storybook story를 호환 기간 동안 함께 제시한다.
3. `stage-review.json` 변경 뒤 재등록과 `--check`를 수행해 Storybook checkpoint가 최신인지 보장한다.
4. 세 단계가 안정화되면 HTML을 필수 handoff에서 호환 산출물로 낮추는 별도 승인 결정을 한다.

## 호환 기간

최소 한 개의 완전한 3단계 브랜드 체인을 양쪽 형식으로 운용한다.

- canonical JSON과 stage review는 양쪽 형식이 공유한다.
- 기존 HTML validation은 유지하고 Storybook 등록 `--check`와 정적 빌드를 추가한다.
- 사용자 검토에서 발견된 차이는 먼저 JSON 계약 누락인지 렌더러 누락인지 분류한다.
- Storybook이 HTML의 섹션, 직접 이미지, review checkpoint, evidence lineage를 모두 대체하기 전에는 HTML 생성을 제거하지 않는다.
- 호환 종료는 Stage별 스킬과 router 계약을 함께 갱신하는 별도 변경으로 처리한다.

## 수용 기준

- 세 canonical `artifact_type`이 각자 올바른 Stage 컴포넌트로 라우팅된다.
- 원본 패키지의 파일 해시가 등록 전후 동일하다.
- registry와 generated CSF는 동일 입력으로 재실행해 diff가 없다.
- public package에는 참조된 모든 로컬 이미지가 있고 JSON/registry의 경로가 해당 URL을 가리킨다.
- provenance, evidence ID, source URL, credit, rights note, source lineage, protected boundary가 보존된다.
- 누락된 선택 파일은 오류가 아니라 명시적인 UI 부재 상태로 처리한다.
- 누락된 필수 report, 잘못된 artifact, 누락 이미지, package 밖 경로는 등록 전에 실패한다.
- `--check`가 report/review/asset registry, 파일 집합, 에셋 바이트, registry 레코드, generated story의 drift를 비변경 방식으로 탐지한다.
- `pnpm lint`와 `pnpm build-storybook`이 통과한다. 시각 확인이 별도로 필요하면 사용자에게 브라우저 사용 승인을 먼저 받는다.

## 롤백

1. 스킬 파이프라인의 등록 호출을 끄고 기존 HTML 전달 링크를 다시 단일 진입점으로 사용한다.
2. 문제가 있는 `<report-id>`의 registry 레코드, public package, generated story를 같은 변경에서 제거한다. 원본 Stage 패키지는 그대로 남아 있다.
3. Storybook 공통 컴포넌트 회귀라면 마지막 통과 버전으로 코드만 되돌리고 public package는 보존한다.
4. registry schema 변경이 원인이면 이전 schema reader를 복원하고 신규 등록을 일시 중단한다.
5. 수정 후 원본 package로 다시 등록하고 `--check`, lint, 정적 Storybook 빌드를 순서대로 실행한다.

등록 CLI는 패키지 교체 중 오류가 나면 기존 public package, registry, generated story를 복원하도록 구성한다. 따라서 원본 Stage 패키지가 롤백의 기준점이며 별도 HTML 재생성이 필요하지 않다.
