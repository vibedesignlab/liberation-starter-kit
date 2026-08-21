# Project Rules — Liberation Starter Kit

당신의 창의력을 해방한다는 의미와 8월 15일의 상징을 담은 스타터킷.
MUI 기본 컴포넌트와 디자인 토큰만 담은 라이트 구조를 유지한다.
커스텀 컴포넌트 라이브러리는 포함하지 않으며, MUI 대표 컴포넌트 데모와 토큰 문서만 제공한다.

## Workflow

- 컴포넌트 작업 → `/component-work` Skill이 워크플로우 담당
- 기존 브랜드 분석 → `research-brand-anatomy` Skill
- 분석부터 랜딩페이지 재료까지 전체 브랜드 체인 → `reconstruct-brand-system` Skill
- 리팩토링 → `refactoring-guide.md` 참조, 기존 스토리 통과 확인
- 룰 수정 시 → `pnpm generate-rules` 실행하여 Storybook 시각화 동기화

## 구성

- **Claude Skills**: `component-work`, `project-planning`
- **Codex Skills**: `reconstruct-brand-system`, `research-brand-anatomy`, `build-brand-from-anatomy`, `build-landing-materials`, `commercial-photo-prompting`, `vdl-visual-asset-prompt`
- **Agents**: `ai-slop-fixer`, `stable-layout-auditor`, `typography-auditor`
- **Storybook**: Overview · Brand Reports(Stage 1–3 모듈 문서) · Style(디자인 토큰) · Components(MUI 대표 컴포넌트 데모)
