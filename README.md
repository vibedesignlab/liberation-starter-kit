# Liberation Starter Kit · 광복 스타터 키트

**당신의 창의력을 해방한다**는 목적과 **8월 15일**의 상징을 함께 담은 Vibe Design Starter Kit의 라이트 버전입니다.
커스텀 컴포넌트 라이브러리를 걷어내고 **MUI 기본 컴포넌트 + 디자인 토큰 + 핵심 Claude/Codex 도구**만 담았습니다.
가볍게 시작해 필요한 컴포넌트와 브랜드 시스템을 직접 쌓아가는 방식의 스타터킷입니다.

## 구성 요소

```
├── MUI 7 + React 19          UI 프레임워크 + 커스텀 테마
├── Storybook 10               브랜드 리포트 + 디자인 토큰 문서 + MUI 컴포넌트 데모
├── 디자인 토큰                 색상 · 타이포 · 간격 · 아이콘
└── Claude Code / Codex 설정    Rules + Skills + Agents + Settings
```

> 커스텀 컴포넌트(card·layout·motion·scroll·typography 계열)는 포함하지 않습니다.
> Components 카테고리에는 MUI 대표 기본 컴포넌트(Button·TextField·Select·Card·Chip·Typography) 데모만 제공합니다.

### Storybook

컴포넌트를 시각적으로 탐색하고 Props를 조작하는 도구입니다.

```bash
pnpm storybook
```

배포된 Storybook: [vibedesignlab.github.io/liberation-starter-kit](https://vibedesignlab.github.io/liberation-starter-kit/)

- **Overview** — 프로젝트 소개, 룰 관계 시각화
- **Brand Reports** — 브랜드 파이프라인 Stage 1–3 모듈 문서
- **Style** — 색상, 타이포, 간격, 아이콘 등 디자인 토큰
- **Components** — MUI 대표 기본 컴포넌트 데모

### Claude Code / Codex 설정

Claude Code와 Codex가 이 프로젝트의 규칙과 작업 스킬을 찾도록 설정되어 있습니다.

| 구성 | 역할 |
|------|------|
| `.claude/rules/` (4파일) | 코드 컨벤션, 디자인 시스템, Grid 규칙, 디렉토리 구조 — 매 세션 자동 로드 |
| `.claude/skills/component-work/` | 컴포넌트 생성/수정/삭제 워크플로우 + 택소노미 참조 |
| `.claude/skills/project-planning/` | 승인 게이트 기반 기획·Storybook 등록과 비주얼 방향 승인 후 선택된 디자인 토큰 적용 |
| `.claude/skills/reconstruct-brand-system/` | (Claude) 브랜드 분석 → 전환 → 랜딩 재료의 3단계 승인 라우터 |
| `.claude/skills/research-brand-anatomy/` | (Claude) 기존 브랜드의 근거 기반 아나토미 리서치와 Storybook+JSON 산출 |
| `.claude/skills/build-brand-from-anatomy/` | (Claude) 승인된 분석을 신규 브랜드·제품 라인업·비주얼 시스템으로 전환 |
| `.claude/skills/build-landing-materials/` | (Claude) UX 카피와 제품별 이미지 프롬프트 재료 작성 |
| `.claude/skills/commercial-photo-prompting/` | (Claude) 이미지 모델 호출 없이 웹 UI 역할별 상업 사진 프롬프트 팩 산출 |
| `.claude/skills/analyze-site-design-with-aside/` | (Claude) 사용자 로컬 Aside CLI 온보딩·검증과 근거 기반 사이트 디자인 분석 |
| `.claude/agents/` (3개) | `ai-slop-fixer` · `stable-layout-auditor` · `typography-auditor` — 디자인/레이아웃/타이포 감사 |
| `.agents/skills/component-work/` | (Codex) MUI 컴포넌트와 Storybook 스토리 생성·수정·리팩토링 |
| `.agents/skills/project-planning/` | (Codex) 명시 호출형 3단계 기획·Storybook 등록과 비주얼 방향 승인 후 선택된 디자인 토큰 적용 |
| `.agents/skills/vdl-visual-asset-prompt/` | (Codex) 비주얼 에셋 생성 프롬프트 설계 스킬 |
| `.agents/skills/reconstruct-brand-system/` | (Codex) 브랜드 분석 → 전환 → 랜딩페이지 재료 준비를 연결하는 3단계 라우터 |
| `.agents/skills/research-brand-anatomy/` | (Codex) 기존 브랜드의 근거 기반 아나토미 리서치와 Storybook+JSON 산출 |
| `.agents/skills/build-brand-from-anatomy/` | (Codex) 승인된 분석을 신규 브랜드·제품 라인업·비주얼 시스템으로 전환 |
| `.agents/skills/build-landing-materials/` | (Codex) UX 카피와 제품별 이미지 렌더링 재료 작성 |
| `.agents/skills/commercial-photo-prompting/` | (Codex) 웹 UI 역할별 상업 사진 구도·앵글·프롬프트 설계 |
| `.agents/skills/port-claude-skill-to-codex/` | (Codex) 프로젝트 Claude 스킬을 Codex 네이티브 패키지로 포팅·동기화·감사 |
| `.agents/skills/analyze-site-design-with-aside/` | (Codex) 사용자 로컬 Aside CLI 온보딩·검증과 근거 기반 사이트 디자인 분석 |
| `.claude/settings.json` | 권한 설정 (Read/Write/pnpm/git 허용, .env 차단) |

#### Claude·Codex 스킬 대응 현황

현재 아래 8개 기능은 프로젝트 로컬 Claude·Codex 스킬이 한 쌍으로 제공됩니다. Claude에서는 `/skill-name`, Codex에서는 `$skill-name` 형식으로 호출합니다.

- `component-work`
- `project-planning`
- `analyze-site-design-with-aside`
- `reconstruct-brand-system`
- `research-brand-anatomy`
- `build-brand-from-anatomy`
- `build-landing-materials`
- `commercial-photo-prompting`

Codex 전용 예외는 `port-claude-skill-to-codex`, `vdl-visual-asset-prompt` 두 개입니다. `vdl-visual-asset-prompt`는 신규 Claude 포팅 대상에서 제외했고, 기존 Codex 패키지만 유지합니다.

### 브랜드 재구성 체인

`reconstruct-brand-system`을 시작점으로 사용하면 아래 순서가 연결됩니다.

1. `research-brand-anatomy` — 오리지널 브랜드 아나토미 분석
2. `build-brand-from-anatomy` — 사용자 입력을 반영한 확장 브랜드와 제품 방향 설계
3. `build-landing-materials` — 랜딩페이지용 카피, 제품 정보, 이미지 재료 준비

Stage 2는 명시적인 제품 라인업, 큰 headline부터 support/label까지의 타이포 위계, 대표 제품 hero 방향 1개와 서로 다른 communication job을 가진 brand-mood 방향 최소 2개를 요구합니다. Stage 3는 이 제품·mood 불변조건을 상속해 모든 제품의 카피와 이미지 재료를 대응시킵니다.

2·3단계의 상업 이미지 방향에는 `commercial-photo-prompting`을 사용합니다. 목적지가 별도로 지정되지 않으면 hero, PDP, feature, detail, grid, scale, gallery 같은 웹 UI 역할을 먼저 정하고 구도·앵글·카피 안전영역을 설계합니다. Claude 버전은 이미지 모델이나 생성 API를 호출하지 않고 generation-ready prompt, negative constraint, continuity lock, QA checklist와 `pending_generation` 또는 `external_pending` asset handoff까지만 만듭니다. 실제 외부 이미지가 제공되고 invariant 검토를 통과한 뒤에만 `registered`로 전환합니다. 각 단계의 결과를 확인한 뒤 다음 단계로 넘어가는 구조이며, 한 브랜드 안에서 안전한 조사·작성 작업은 병렬 처리할 수 있습니다.

Storybook 브랜드 리포트는 각 섹션에 주요 insight 한 문장을 먼저 보여주고, headline 위계를 크게 유지합니다. 근거 이미지는 원본 비율로 표시하며, 본문·표·캡션은 ellipsis나 line clamp 없이 줄바꿈합니다. 링크는 전체 URL을 `href`와 provenance에 보존하되 화면에는 출처명이나 hostname처럼 짧은 label을 사용합니다.

각 단계의 JSON은 정본으로 유지하고, 아래 명령으로 Storybook 리포트와 근거 이미지를 등록합니다. 기존 HTML은 검증 체계를 옮기는 동안만 호환 산출물로 유지합니다.

```bash
pnpm register-brand-report -- <stage-package-directory>
pnpm register-brand-report -- <stage-package-directory> --check
```

디렉토리 규칙과 단계별 전환 계획은 [`docs/brand-report-storybook-migration.md`](docs/brand-report-storybook-migration.md)에 정리되어 있습니다.

### 커스텀 테마

`src/styles/themes/default.js`에 정의된 디자인 토큰:

- **Primary**: Pure Blue (`#0000FF`) / **Secondary**: Blue-Grey (`#263238`)
- **Typography**: Outfit (영문) + Pretendard (한글)
- **Shape**: borderRadius 0 (플랫 디자인)
- **Elevation**: 저투명도 블러 그림자

## 시작하기

```bash
# 설치
pnpm install

# Storybook 실행
pnpm storybook

# 개발 서버
pnpm dev
```

## 내 프로젝트에 최적화하기

이 스타터킷을 실제 프로젝트에 맞게 커스터마이즈하는 방향입니다.

### 1. 테마 교체

`src/styles/themes/default.js`에서 색상, 타이포, 간격을 프로젝트 브랜드에 맞게 수정합니다. `.claude/rules/design-system.md`의 토큰 예시도 함께 업데이트하면 Claude가 새 토큰을 사용합니다.

`project-planning`의 Visual Direction 단계에서는 토큰을 `apply`, `keep`, `defer`로 구분합니다. 승인 요청에서 즉시 적용 효과를 먼저 알리고, 승인 후에는 `apply` 행과 해당 theme을 활성화하는 최소 export/provider 연결만 바로 수정합니다. 컴포넌트, 페이지, 레이아웃, 카피, 콘텐츠, 이미지 전체 변환은 별도 요청 없이는 진행하지 않습니다.

### 2. 컴포넌트 쌓기

라이트 버전은 MUI 기본 컴포넌트 데모만 제공합니다. 프로젝트에 필요한 컴포넌트를 `/component-work` 스킬 워크플로우로 추가하고, `pnpm generate-rules`를 실행하면 Storybook 시각화가 자동 갱신됩니다.

### 3. Rules 조정

`.claude/rules/` 파일을 프로젝트 컨벤션에 맞게 수정합니다.

- 다른 아이콘 라이브러리 사용 → `design-system.md` 수정
- TypeScript 도입 → `code-convention.md`에 TS 규칙 추가
- 폴더 구조 변경 → `directory-structure.md` 수정

### 4. Skills 확장

프로젝트 고유 워크플로우가 있다면 Claude용 스킬은 `.claude/skills/`, Codex용 스킬은 `.agents/skills/`에 추가합니다. 추가 후 `pnpm generate-rules`로 시각화를 갱신합니다.

기존 Claude 스킬을 Codex에서도 사용하려면 `$port-claude-skill-to-codex`를 호출합니다. 원본을 그대로 복사하지 않고 Codex용 트리거, 호출 메타데이터, 도구 가정, 리소스 경로와 프로젝트 관계를 변환하고 검증합니다.

웹사이트를 사용자의 Aside Browser에서 직접 분석하려면 Claude Code에서는 `/analyze-site-design-with-aside`, Codex에서는 `$analyze-site-design-with-aside`를 호출합니다. 두 프로젝트 로컬 스킬은 같은 `pnpm aside:check` 진단을 사용합니다. 스킬은 프로젝트에 포함되지만 Aside 앱·계정·인증정보는 포함하지 않습니다. 기본값은 빠른 종합 분석입니다. 한 번의 제한된 페이지 샘플링에서 사이트 구조와 최소 캡처를 병행하고, primary page와 대표 secondary page 최대 2개, 스크린샷 최대 3개 안에서 공통 디자인 문법을 합성합니다. 전체 crawl이나 deep 분석은 사용자가 명시할 때만 확장합니다. 현재 공식 요구사항은 macOS 15.0 이상이며 자세한 상태별 가이드는 각 스킬의 `resources/` 또는 `references/`에 있습니다.

이 스킬은 clone한 프로젝트를 연 Claude Code 또는 Codex에서 호출하고 해당 에이전트가 로컬 `aside` 명령을 실행하는 구조입니다. `aside` 명령 자체가 `.claude/skills`나 `.agents/skills`를 자동 탐색한다고 가정하지 않습니다.

| 단계 | 담당 | 내용 |
|---|---|---|
| 1 | 사용자 | 저장소를 clone하고 Claude Code 또는 Codex에서 프로젝트를 엽니다. |
| 2 | 사용자 | Aside Browser, 개인 계정, 모델 연결과 필요한 사이트 로그인을 준비합니다. |
| 3 | 사용자 → 스킬 | Claude에서는 `/analyze-site-design-with-aside`, Codex에서는 `$analyze-site-design-with-aside`를 대상 URL·목표와 함께 호출합니다. |
| 4 | 스킬 | `pnpm aside:check`로 OS·앱·CLI·계정 상태를 판정하고 설치나 업데이트가 필요하면 실행 직전에 승인을 받습니다. |
| 5 | 스킬 + Aside | 허용 URL·페이지·뷰포트·읽기 전용 경계를 정하고 구조·스크린샷·측정값·상태 증거를 수집합니다. |
| 6 | 스킬 | 관찰·추론·권고·미확인 항목을 분리한 디자인 분석 리포트를 반환합니다. |

프로젝트 로컬 스킬의 책임은 3단계부터 시작합니다. 로그인, MFA, CAPTCHA, 계정 선택, 모델 공급자 연결은 사용자가 Aside 화면에서 직접 처리합니다.

```bash
pnpm aside:check
```

### 5. Hooks 도입 (선택)

코드 포매팅 자동화가 필요하다면 Prettier PostToolUse hook을 추가할 수 있습니다.

```bash
pnpm add -D prettier
```

`.claude/settings.json`에 hook 설정 추가:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
      }]
    }]
  }
}
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | Vite 개발 서버 |
| `pnpm storybook` | Storybook 실행 (포트 6006) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm build-storybook` | Storybook 정적 빌드 |
| `pnpm register-brand-report -- <package>` | Stage 1–3 JSON·이미지를 Storybook 리포트로 등록 |
| `pnpm lint` | ESLint 실행 |
| `pnpm generate-rules` | `.claude/` 규칙·스킬과 `.agents/skills/`를 스캔하여 룰 시각화 데이터 재생성 |
