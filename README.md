# Liberation Starter Kit · 광복 스타터 키트

MUI, React, Storybook, 디자인 토큰과 Claude/Codex 작업 스킬만 남긴 가벼운 디자인 스타터 키트입니다. 완성된 브랜드 예시나 커스텀 컴포넌트 라이브러리를 제공하는 대신, 프로젝트에 필요한 시스템을 근거와 승인 절차에 따라 직접 쌓도록 설계했습니다.

현재 저장소에는 특정 브랜드 리서치 결과가 포함되어 있지 않습니다. 브랜드 리포트 레지스트리는 빈 상태로 시작하며, 실제 리서치 패키지는 스타터 키트 밖에서 만들고 승인된 결과만 Storybook에 등록합니다.

## 핵심 구성

| 영역 | 구성 |
| --- | --- |
| UI | React 19, MUI 7, 프로젝트 기본 테마 |
| 문서 | Storybook 10, 디자인 토큰, MUI 기본 컴포넌트 데모 |
| 브랜드 파이프라인 | Stage 1–3 정본 JSON, 고정 React 리포트, 리뷰 게이트 |
| 에이전트 환경 | Claude Code와 Codex용 Rules·Skills |
| 검증 | 비브라우저 계약 검사, 격리 fixture 파이프라인 테스트, ESLint |

커스텀 card·layout·motion·scroll·typography 라이브러리는 포함하지 않습니다. `Components`에는 MUI의 Button, TextField, Select, Card, Chip, Typography 데모만 제공합니다.

## 시작하기

CI 기준 환경은 Node.js 22, pnpm 9, Python 3.12입니다.

```bash
pnpm install
python3 -m pip install -r requirements-brand-reports.txt

pnpm storybook
pnpm dev
```

배포된 Storybook: [vibedesignlab.github.io/liberation-starter-kit](https://vibedesignlab.github.io/liberation-starter-kit/)

Storybook의 기본 분류는 다음과 같습니다.

- `Overview` — 프로젝트 소개와 룰 관계
- `Brand Reports` — 고정 Stage 1–3 템플릿과 등록된 리포트
- `Style` — 색상, 타이포그래피, 간격, 아이콘, 컴포넌트 토큰
- `Components` — MUI 기본 컴포넌트 데모

## 브랜드 리서치 파이프라인

브랜드 파이프라인의 목표는 조사 분량을 무한히 늘리는 것이 아니라, 제한된 시간 안에 근거를 정본 데이터로 만들고 같은 React 포맷으로 검토하는 것입니다.

```text
외부 Stage 패키지
  → Stage별 정본 JSON과 로컬 근거 자산
  → 결정론적 검증 1회
  → 고정 React 리포트로 정규화
  → Storybook 원자적 등록과 drift 검사
  → 사용자 리뷰
  → 승인된 경우에만 다음 Stage
```

### 고정 원칙

1. 각 Stage의 `outputs/*.json`만 정본 리포트 데이터입니다.
2. 모든 Stage에 `stage-review.json`이 필요합니다.
3. Stage 2와 Stage 3에는 `asset-registry.json`도 필요합니다.
4. HTML 리포트, 브랜드별 HTML/CSS, HTML renderer는 생성하거나 검증하지 않습니다.
5. 모든 리포트는 `src/utils/brand-reports`에서 정규화하고 하나의 `BrandReportDocument`로 표시합니다.
6. Stage별 섹션 ID·순서·개수는 고정됩니다. 브랜드마다 별도 JSX 리포트 템플릿을 만들지 않습니다.
7. 등록은 전달 절차의 일부입니다. 검증만 통과하고 Storybook에 등록되지 않은 패키지는 완료로 보지 않습니다.
8. 검증과 사용자 승인은 다릅니다. 등록 직후 리뷰 상태는 `pending`입니다.
9. Stage 1·2의 색상은 레이어별 스와치, 타이포그래피는 Display–Caption 웹 계층으로 고정 표시합니다. 링크한 웹폰트와 미리보기 값은 문서 전용이며 기본 테마 토큰에는 적용하지 않습니다.
10. Stage 1·2의 버벌 브랜딩은 브랜드 목적·본질, 포지셔닝·약속, 핵심 가치·브랜드 메시지, 보이스, USP·증거·CTA의 5단계 공통 위계로 표시합니다.

세부 규격은 [Brand Research Pipeline Specification](docs/brand-research-pipeline-spec.md)을 기준으로 합니다.

### 3단계 구조

| Stage | 스킬 | 정본 산출물 | 고정 섹션 |
| --- | --- | --- | ---: |
| 1. Source Brand Analysis | `research-brand-anatomy` | `outputs/source-brand-analysis.json` | 18 |
| 2. Extended Brand Anatomy | `build-brand-from-anatomy` | `outputs/extended-brand-anatomy.json` | 8 |
| 3. Landing Materials | `build-landing-materials` | `outputs/landing-materials.json` | 6 |

`reconstruct-brand-system`은 세 Stage의 리뷰 상태와 입력 연결을 관리하는 라우터입니다. Stage 1은 참고 브랜드에서 관찰된 문법만 다루고, Stage 2에서 사용자 방향을 받아 신규 브랜드 시스템으로 전환하며, Stage 3는 승인된 브랜드·제품 불변조건을 랜딩 카피와 이미지 재료로 확장합니다.

### Stage 1: 10분 rapid 계약

기본 모드는 `rapid`입니다. 리포트 구조는 줄이지 않고 근거의 수만 제한합니다.

| 구간 | 예산 |
| --- | ---: |
| 스코프 고정과 타이머 시작 | 1분 |
| 근거 검색과 로컬 수집 | 5분 |
| 아나토미와 문법 합성 | 2분 |
| JSON export·등록·확인 | 2분 |
| 전체 상한 | 10분 |

최소 기준:

- 구조 근거 4개 이상, 그중 1차 출처 3개 이상
- 서로 다른 로컬 시각 근거 8개 이상
- 적용 가능한 시각 레이어 4개 이상
- 핵심 주장 8개 이상
- 근거 2개 이상으로 지지되는 인과 문법 4개

8분 이후에는 새 검색을 시작하지 않습니다. 부족한 범위는 조사 시간을 연장하지 않고 `unresolved_gaps`에 기록합니다. 사용자가 명시적으로 깊은 조사를 요청한 경우에만 `expanded` 모드를 사용하며, 이 경우 10분 SLA를 주장하지 않습니다.

Stage 1은 유료 API를 필수로 요구하지 않습니다. 공개 공식 페이지, 직접 HTTP 요청, 공식 다운로드, 검색·스크래핑 도구 중 사용 가능한 경로를 선택할 수 있습니다. Firecrawl 같은 크레딧형 서비스는 선택적 수집 어댑터이며, 정본 JSON이나 검증 계약의 의존성이 아닙니다.

브라우저 자동화 역시 기본 절차가 아닙니다. Playwright, Chrome MCP, 스크린샷 기반 검사는 사용자가 명시적으로 요청한 경우에만 수행합니다.

### 경량 병렬 실행

전체 라우터의 `parallel_single_brand` 모드는 Stage를 건너뛰지 않고 현재 Stage 안의 독립 작업만 병렬화합니다. 소스·방향·shot plan을 먼저 고정한 뒤 루트 코디네이터가 고정 작업 계획을 생성합니다.

```bash
python3 .agents/skills/reconstruct-brand-system/scripts/plan_stage_jobs.py \
  <pipeline-directory-or-state> --stage stage_1
```

- worker는 생성된 `job-spec.json`과 자기 `.work/<job-id>/`만 사용합니다.
- worker는 pipeline state, 정본 JSON, review, registry를 수정하거나 라우터·검증 명령을 실행하지 않습니다.
- 루트만 `update_job.py`로 상태를 기록하고 결과를 병합해 정본을 한 번 작성합니다.
- 완료된 `result.json`의 Stage·Job identity, lineage, gap, 소유 파일 경계가 맞지 않으면 승인 barrier를 통과할 수 없습니다.
- Stage 1은 세 조사 lane이 같은 10분 deadline을 공유합니다.
- Stage 2 방향 질문은 한 번의 통합 direction lock을 기본으로 하며, 답변이 충돌할 때만 한 번 더 묻습니다.
- 외부 이미지 병렬 실행은 기본값이 `pilot_pending`입니다. 공급자 동시 처리·비용·rate limit·시각 일관성을 확인한 뒤에만 최대 두 worker로 활성화합니다.

측정은 검증을 추가로 돌리지 않고 read-only 요약 명령으로 확인합니다.

```bash
python3 .agents/skills/reconstruct-brand-system/scripts/summarize_parallel_run.py \
  <pipeline-directory-or-state> --stage stage_1
```

첫 운영 기준은 직렬 기준 대비 Stage 시작→리뷰 대기 시간이 20% 이상 줄고, Job 유실과 첫 finalization·revision 악화가 없는 것입니다. 병렬화는 대기시간을 줄이지만 총 worker compute는 늘어날 수 있습니다.

### 검증과 승인

전체 Stage 상태는 다음처럼 움직입니다.

```text
active
  → finalized_pending_review
  → revision_required → finalized_pending_review
  → accepted → next Stage
```

- 최초 작성이나 정본 수정 후에는 finalizer 내부에서 해당 Stage validator를 한 번 실행합니다.
- finalizer는 같은 실행에서 정규화, 등록, drift 검사를 완료하고 `registration-receipt.json`을 남깁니다.
- finalizer가 유일한 검증 진입점입니다. 별도 validator 사전 실행, 통과 후 수동 재검토·근거 재계수·다이제스트 재확인은 하지 않습니다.
- 사용자 승인 시에는 기존 receipt와 등록 상태를 확인한 뒤 리뷰 데이터만 같은 report ID로 갱신합니다.
- 승인 과정에서 현재 Stage나 상위 Stage validator를 다시 실행하지 않습니다.
- 정본 JSON, provenance, 이미지가 바뀐 경우에만 전체 finalization을 다시 수행합니다.

이 구조는 중복 재검증을 제거하면서도 등록 누락과 stale Storybook 데이터를 막습니다.

성공한 내부 명령의 상세 로그는 숨기고 `FINALIZED` 한 줄에 Stage, report ID, 검증·등록·drift 검사·전체 소요시간을 표시합니다. 실패한 경우에만 해당 validator나 등록 명령의 진단을 노출합니다. 사용자 전달에서도 내부 검증 항목을 다시 열거하지 않고 finalization 통과와 리뷰 대기 상태만 요약합니다.

## Storybook 리포트 등록

Stage 패키지는 저장소 밖의 별도 작업 디렉토리에 두는 것을 권장합니다. 스타터 키트 루트에서 다음 명령 하나로 검증과 등록을 완료합니다.

```bash
pnpm finalize-brand-report -- <stage-package-directory>
```

finalizer가 수행하는 작업:

1. 패키지 안에서 정확히 하나의 Stage 정본 JSON을 식별합니다.
2. 해당 Stage validator를 한 번 실행합니다.
3. 고정 섹션 계약으로 데이터를 정규화합니다.
4. JSON, review, 참조 이미지와 레지스트리를 원자적으로 갱신합니다.
5. `RegisteredBrandReport`를 사용하는 generated CSF story를 만듭니다.
6. 등록 결과와 원본 사이의 drift를 검사합니다.

다음 경로는 생성기 소유이므로 직접 편집하지 않습니다.

| 경로 | 역할 |
| --- | --- |
| `src/components/brand-documentation/` | 공통 React 리포트 프레젠테이션 |
| `src/utils/brand-reports/` | Stage별 정규화 어댑터와 섹션 계약 |
| `src/stories/brand-reports/` | 템플릿, 카탈로그, 정적 로더 |
| `src/stories/brand-reports/generated/` | 등록 명령이 생성하는 Storybook story |
| `public/brand-reports/` | 등록된 JSON·review·이미지와 레지스트리 |

등록만 검사하려면 다음 명령을 사용합니다.

```bash
pnpm register-brand-report -- <stage-package-directory> --check
```

등록물을 제거할 때는 registry나 generated story를 직접 삭제하지 않습니다.

```bash
pnpm unregister-brand-report -- <report-id> --dry-run
pnpm unregister-brand-report -- <report-id>
pnpm unregister-brand-report -- <report-id> --check
```

unregister는 Storybook용 복사본, generated story, registry entry만 제거합니다. 외부 Stage 정본 패키지는 자동으로 지우지 않습니다.

## 비브라우저 검증

기본 CI는 다음 세 명령으로 구성됩니다.

```bash
pnpm check-brand-report-contracts
pnpm test-brand-report-pipeline
pnpm lint
```

- `check-brand-report-contracts` — HTML 금지, 고정 섹션, 어댑터와 등록 계약 검사
- `test-brand-report-pipeline` — 임시 프로젝트에서 고정 Job 계획, fake-worker 병렬 wave, barrier와 Stage 1–3 전체 경로 검사
- `lint` — React, Storybook, 스크립트 정적 검사

fixture 테스트는 격리된 임시 프로젝트만 사용하므로 실제 저장소 registry에 예시 브랜드를 남기지 않습니다. Storybook 정적 빌드나 브라우저 기반 시각 검사는 사용자가 별도로 요청한 경우에 수행합니다.

## Claude Code와 Codex 스킬

Claude 스킬은 `.claude/skills/`, Codex 스킬은 `.agents/skills/`에 있습니다. 공통 기능은 같은 이름으로 대응하며 Claude에서는 `/skill-name`, Codex에서는 `$skill-name`으로 호출합니다.

| 스킬 | 역할 |
| --- | --- |
| `component-work` | MUI 컴포넌트와 Storybook story 작업 |
| `project-planning` | 승인 게이트 기반 프로젝트 기획 |
| `analyze-site-design-with-aside` | 사용자가 준비한 Aside 환경을 통한 사이트 분석 |
| `reconstruct-brand-system` | 브랜드 Stage 1–3 라우팅 |
| `research-brand-anatomy` | 10분 기본 참고 브랜드 리서치 |
| `build-brand-from-anatomy` | 승인된 분석을 신규 브랜드 시스템으로 전환 |
| `build-landing-materials` | 랜딩 카피와 제품 이미지 재료 구성 |
| `commercial-photo-prompting` | 웹 UI 역할별 상업 이미지 프롬프트 설계 |

Codex에는 `port-claude-skill-to-codex`와 `vdl-visual-asset-prompt`가 추가로 제공됩니다.

규칙이나 스킬 관계를 변경했다면 Storybook의 룰 관계 데이터를 갱신합니다.

```bash
pnpm generate-rules
```

## 디자인 시스템 기본값

기본 토큰은 `src/styles/themes/default.js`에 있습니다.

- Primary: Pure Blue `#0000FF`
- Secondary: Blue Grey `#263238`
- Typography: Outfit + Pretendard
- Shape: `borderRadius: 0`
- Elevation: 낮은 투명도의 블러 그림자

프로젝트에 적용할 때는 테마 토큰과 `.claude/rules/design-system.md`를 함께 갱신합니다. 새 컴포넌트는 기존 MUI 구성으로 해결할 수 있는지 먼저 확인하고, 필요한 경우 `component-work` 절차에 따라 컴포넌트와 Storybook story를 함께 추가합니다.

## 주요 명령

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | Vite 개발 서버 실행 |
| `pnpm storybook` | Storybook 개발 서버 실행 |
| `pnpm build` | 애플리케이션 프로덕션 빌드 |
| `pnpm build-storybook` | Storybook 정적 빌드 |
| `pnpm finalize-brand-report -- <package>` | Stage 검증·등록·drift 확인 |
| `pnpm register-brand-report -- <package> --check` | 등록된 패키지 일치 여부 확인 |
| `pnpm unregister-brand-report -- <id>` | 등록된 Storybook 리포트 제거 |
| `pnpm check-brand-report-contracts` | 고정 리포트 계약 검사 |
| `pnpm test-brand-report-pipeline` | 격리된 3단계 fixture 테스트 |
| `python3 .agents/skills/reconstruct-brand-system/scripts/plan_stage_jobs.py <pipeline> --stage <stage>` | 현재 Stage 고정 Job 계획 생성 |
| `python3 .agents/skills/reconstruct-brand-system/scripts/summarize_parallel_run.py <pipeline> --stage <stage>` | 병렬 Job·wave 실측 요약 |
| `pnpm lint` | ESLint 실행 |
| `pnpm generate-rules` | Rules·Skills 관계 데이터 갱신 |
| `pnpm aside:check` | 프로젝트 로컬 Aside 환경 진단 |

남은 실제 환경 검증 항목은 [Brand Research Pipeline To-do](docs/brand-research-pipeline-todo.md)에 기록합니다.
