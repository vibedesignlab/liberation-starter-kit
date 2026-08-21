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
| `.claude/agents/` (3개) | `ai-slop-fixer` · `stable-layout-auditor` · `typography-auditor` — 디자인/레이아웃/타이포 감사 |
| `.agents/skills/vdl-visual-asset-prompt/` | (Codex) 비주얼 에셋 생성 프롬프트 설계 스킬 |
| `.agents/skills/reconstruct-brand-system/` | (Codex) 브랜드 분석 → 전환 → 랜딩페이지 재료 준비를 연결하는 3단계 라우터 |
| `.agents/skills/research-brand-anatomy/` | (Codex) 기존 브랜드의 근거 기반 아나토미 리서치와 Storybook+JSON 산출 |
| `.agents/skills/build-brand-from-anatomy/` | (Codex) 승인된 분석을 신규 브랜드·제품 라인업·비주얼 시스템으로 전환 |
| `.agents/skills/build-landing-materials/` | (Codex) UX 카피와 제품별 이미지 렌더링 재료 작성 |
| `.agents/skills/commercial-photo-prompting/` | (Codex) 브랜드·제품 상업 사진 프롬프트 설계 |
| `.claude/settings.json` | 권한 설정 (Read/Write/pnpm/git 허용, .env 차단) |

### 브랜드 재구성 체인

`reconstruct-brand-system`을 시작점으로 사용하면 아래 순서가 연결됩니다.

1. `research-brand-anatomy` — 오리지널 브랜드 아나토미 분석
2. `build-brand-from-anatomy` — 사용자 입력을 반영한 확장 브랜드와 제품 방향 설계
3. `build-landing-materials` — 랜딩페이지용 카피, 제품 정보, 이미지 재료 준비

2·3단계의 상업 이미지 방향에는 `commercial-photo-prompting`을 사용합니다. 각 단계의 결과를 확인한 뒤 다음 단계로 넘어가는 구조이며, 한 브랜드 안에서 안전한 조사·작성 작업은 병렬 처리할 수 있습니다.

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

### 2. 컴포넌트 쌓기

라이트 버전은 MUI 기본 컴포넌트 데모만 제공합니다. 프로젝트에 필요한 컴포넌트를 `/component-work` 스킬 워크플로우로 추가하고, `pnpm generate-rules`를 실행하면 Storybook 시각화가 자동 갱신됩니다.

### 3. Rules 조정

`.claude/rules/` 파일을 프로젝트 컨벤션에 맞게 수정합니다.

- 다른 아이콘 라이브러리 사용 → `design-system.md` 수정
- TypeScript 도입 → `code-convention.md`에 TS 규칙 추가
- 폴더 구조 변경 → `directory-structure.md` 수정

### 4. Skills 확장

프로젝트 고유 워크플로우가 있다면 Claude용 스킬은 `.claude/skills/`, Codex용 스킬은 `.agents/skills/`에 추가합니다. 추가 후 `pnpm generate-rules`로 시각화를 갱신합니다.

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
