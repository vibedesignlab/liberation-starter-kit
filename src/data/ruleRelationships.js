/**
 * 프로젝트 룰 관계 데이터 (자동 생성)
 *
 * 이 파일은 scripts/generate-rules.js 에 의해 자동 생성됩니다.
 * 직접 수정하지 마세요. 수정이 필요하면 스크립트를 수정하세요.
 *
 * 생성: pnpm generate-rules
 * 생성일: 2026-08-23
 */

export const priorityMeta = {
  root: { color: '#000000', label: 'Root', order: 0 },
  CRITICAL: { color: '#D32F2F', label: '절대 위반 불가', order: 1 },
  MUST: { color: '#ED6C02', label: '반드시 준수', order: 2 },
  SHOULD: { color: '#0288D1', label: '관련 작업 시 준수', order: 3 },
  Skill: { color: '#7B1FA2', label: 'Skill (의도 기반 활성화)', order: 4 },
  'Skill Resource': { color: '#9E9E9E', label: 'Skill Resource (on-demand)', order: 5 },
};

export const ruleNodes = [
  {
    "id": "claude-md",
    "name": "CLAUDE.md",
    "priority": "root",
    "path": "CLAUDE.md",
    "description": "프로젝트 규칙 진입점 (라우터 역할)"
  },
  {
    "id": "code-convention",
    "name": "code-convention.md",
    "priority": "MUST",
    "path": ".claude/rules/code-convention.md",
    "description": "JavaScript + React.js 코드 작성 규칙"
  },
  {
    "id": "design-system",
    "name": "design-system.md",
    "priority": "MUST",
    "path": ".claude/rules/design-system.md",
    "description": "새로운 컴포넌트를 만들기 전에 반드시 기존 컴포넌트로 대체 가능한지 확인하고, 가능하면 최대한 재활용해라. 불필요한 중복 컴포넌트 생성을 피해야 함."
  },
  {
    "id": "directory-structure",
    "name": "directory-structure.md",
    "priority": "MUST",
    "path": ".claude/rules/directory-structure.md",
    "description": "파일/컴포넌트 생성 시 반드시 아래 구조를 따른다."
  },
  {
    "id": "mui-grid-usage",
    "name": "mui-grid-usage.md",
    "priority": "CRITICAL",
    "path": ".claude/rules/mui-grid-usage.md",
    "description": "```jsx"
  },
  {
    "id": "analyze-site-design-with-aside",
    "name": "analyze-site-design-with-aside (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/analyze-site-design-with-aside/SKILL.md",
    "description": "Use this skill whenever the user explicitly asks Claude Code to use Aside, the Aside browser, or /analyze-site-design-with-aside to inspect a live public, authenticated, staging, or local website. Default to a rapid bounded pass that pairs minimal captures with site-structure inspection during the same sampled-page visits, then synthesize one design analysis. Expand only when the user requests deeper coverage. Do not activate for ordinary code review, static-file-only analysis, or unauthorized browser work."
  },
  {
    "id": "analyze-site-design-with-aside--aside-setup-spec",
    "name": "aside-setup-spec.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/analyze-site-design-with-aside/resources/aside-setup-spec.md",
    "description": "이 문서는 저장소를 clone한 사용자가 자신의 Aside 환경만 연결해 `/analyze-site-design-with-aside`를 실행할 수 있도록 하는 온보딩 계약이다. 안내 문구는 사용자의 언어에 맞추되, 아래 판정과 권한 경계는 유지한다."
  },
  {
    "id": "analyze-site-design-with-aside--design-analysis-contract",
    "name": "design-analysis-contract.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/analyze-site-design-with-aside/resources/design-analysis-contract.md",
    "description": "Use this contract to turn a user's analysis request into one bounded Aside task and a reviewable report. Analyze only dimensions relevant to the requested page or flow."
  },
  {
    "id": "build-brand-from-anatomy",
    "name": "build-brand-from-anatomy (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/build-brand-from-anatomy/SKILL.md",
    "description": "Build a target-brand Stage 2 anatomy from accepted source JSON and its registered Storybook report, then finalize the fixed eight-section React report."
  },
  {
    "id": "build-landing-materials",
    "name": "build-landing-materials (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/build-landing-materials/SKILL.md",
    "description": "Build Stage 3 landing copy and product-image materials from accepted Stage 2 JSON and finalize the fixed six-section React Storybook report."
  },
  {
    "id": "commercial-photo-prompting",
    "name": "commercial-photo-prompting (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/commercial-photo-prompting/SKILL.md",
    "description": "ALWAYS use this skill when Claude must plan, compile, diagnose, or refine realistic commercial or cinematic photography prompts, especially for web hero, PDP, feature, detail, grid, scale, gallery, or product-series imagery. It returns generation-ready prompt packs, negative constraints, continuity locks, and observable QA checklists only. It never calls an image model, image API, generation tool, or editing tool and never claims that an image was generated."
  },
  {
    "id": "commercial-photo-prompting--commercial-photographic-taxonomy",
    "name": "commercial-photographic-taxonomy.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/commercial-photo-prompting/resources/commercial-photographic-taxonomy.md",
    "description": "> 상업·시네마틱 실사 이미지의 촬영 어휘. 장르에서 스펙으로 내려가는 결정 순서로 프롬프트 조각을 조합합니다."
  },
  {
    "id": "commercial-photo-prompting--prompt-output-contract",
    "name": "prompt-output-contract.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/commercial-photo-prompting/resources/prompt-output-contract.md",
    "description": "Claude의 commercial-photo-prompting 산출물을 이미지 실행 주체가 바로 사용할 수 있는 self-contained handoff로 만든다. 이 계약은 이미지 생성이나 편집 실행을 허용하지 않는다."
  },
  {
    "id": "commercial-photo-prompting--web-editorial-composition",
    "name": "web-editorial-composition.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/commercial-photo-prompting/resources/web-editorial-composition.md",
    "description": "Use web placement as the first composition classifier for commercial photography. Most requested commercial images will be placed in a website or product interface, so do not wait for the user to say `web` before routing the shot."
  },
  {
    "id": "component-work",
    "name": "component-work (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/component-work/SKILL.md",
    "description": "ALWAYS invoke this skill when files under src/components/ are created, modified, or deleted. Do not edit component files directly. Use this skill first. Also trigger for any story file (.stories.jsx) work. Manages component taxonomy, design tokens, and interactive patterns for MUI-based design system."
  },
  {
    "id": "component-work--components",
    "name": "components.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/components.md",
    "description": "Vibe Dictionary 텍소노미 v0.4 기반 분류. 번호는 텍소노미 카테고리 번호."
  },
  {
    "id": "component-work--interactive-principles",
    "name": "interactive-principles.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/interactive-principles.md",
    "description": "> 기존 디자인 시스템 위에서 인터랙티브 컴포넌트 설계 시 따라야 할 원칙"
  },
  {
    "id": "component-work--mui-theme",
    "name": "mui-theme.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/mui-theme.md",
    "description": "MUI 커스텀 테마 설정 규칙"
  },
  {
    "id": "component-work--project-summary",
    "name": "project-summary.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/project-summary.md",
    "description": "**Liberation Starter Kit**은 React + MUI + Storybook 환경을 디자이너에게 마치 디자인 툴처럼 사용할 수 있도록 도와주는 개발 환경입니다."
  },
  {
    "id": "component-work--refactoring-guide",
    "name": "refactoring-guide.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/refactoring-guide.md",
    "description": "> 리팩토링 작업 시 준수해야 할 가이드."
  },
  {
    "id": "component-work--storybook-writing",
    "name": "storybook-writing.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/storybook-writing.md",
    "description": "Storybook 스토리 작성 시 준수해야 할 규칙"
  },
  {
    "id": "component-work--taxonomy-index",
    "name": "taxonomy-index.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/taxonomy-index.md",
    "description": "> 전체 분류체계 빠른 참조용 인덱스"
  },
  {
    "id": "component-work--taxonomy-v0-4",
    "name": "taxonomy-v0.4.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/taxonomy-v0.4.md",
    "description": "---"
  },
  {
    "id": "component-work--typography-criteria",
    "name": "typography-criteria.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/component-work/resources/typography-criteria.md",
    "description": "> 이 파일은 `scripts/extract-design-criteria.mjs` 가 `src/data/typographyTaxonomyData.js` 에서 추출한 파생 뷰입니다."
  },
  {
    "id": "project-planning",
    "name": "project-planning (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/project-planning/SKILL.md",
    "description": "Creates approval-gated planning documents for project-summary, ux-flow, and visual-direction phases, then immediately applies only design-token rows explicitly approved in visual-direction. Does not perform broad UI or component conversion."
  },
  {
    "id": "project-planning--doc-templates",
    "name": "doc-templates.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/project-planning/resources/doc-templates.md",
    "description": "> 각 Phase에서 문서 작성 시 이 템플릿의 구조를 따른다."
  },
  {
    "id": "project-planning--token-application-contract",
    "name": "token-application-contract.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/project-planning/resources/token-application-contract.md",
    "description": "이 계약은 사용자가 Phase 3 Visual Direction을 승인한 직후 사용한다. 승인은 제한된 디자인 토큰 패치를 활성화하며, 제품 전체를 시각적으로 변환할 권한은 주지 않는다."
  },
  {
    "id": "reconstruct-brand-system",
    "name": "reconstruct-brand-system (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/reconstruct-brand-system/SKILL.md",
    "description": "Route one brand project through three reviewed JSON-and-Storybook stages with fixed React reports, automatic registration, and no HTML reports."
  },
  {
    "id": "research-brand-anatomy",
    "name": "research-brand-anatomy (Claude Skill)",
    "priority": "Skill",
    "path": ".claude/skills/research-brand-anatomy/SKILL.md",
    "description": "Research one existing brand as a ten-minute source-only Stage 1 package with canonical JSON and a fixed automatically registered Storybook report."
  },
  {
    "id": "codex--analyze-site-design-with-aside",
    "name": "analyze-site-design-with-aside (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/analyze-site-design-with-aside/SKILL.md",
    "description": "Inspect a live public, authenticated, staging, or local website through the user's project-local Aside CLI setup and turn browser evidence into a structured design analysis. Default to a rapid bounded pass that pairs minimal captures with site-structure inspection during the same sampled-page visits; expand only when the user requests deeper coverage. Use when the user explicitly asks to use Aside, the Aside browser, or this skill to analyze a site's design. Do not activate for ordinary code review, static-file-only analysis, or unauthorized browser work."
  },
  {
    "id": "codex--analyze-site-design-with-aside--aside-setup-spec",
    "name": "aside-setup-spec.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/analyze-site-design-with-aside/references/aside-setup-spec.md",
    "description": "이 문서는 저장소를 clone한 사용자가 자신의 Aside 환경만 연결해 `$analyze-site-design-with-aside`를 실행할 수 있도록 하는 온보딩 계약이다. 안내 문구는 사용자의 언어에 맞추되, 아래 판정과 권한 경계는 유지한다."
  },
  {
    "id": "codex--analyze-site-design-with-aside--design-analysis-contract",
    "name": "design-analysis-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/analyze-site-design-with-aside/references/design-analysis-contract.md",
    "description": "Use this contract to turn a user's analysis request into one bounded Aside task and a reviewable report. Analyze only dimensions relevant to the requested page or flow."
  },
  {
    "id": "codex--build-brand-from-anatomy",
    "name": "build-brand-from-anatomy (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/build-brand-from-anatomy/SKILL.md",
    "description": "Build a target-brand Stage 2 anatomy from an accepted source JSON and registered Storybook report. Deliver canonical JSON, two registered anchor images, and the fixed Storybook reader; never create an HTML report."
  },
  {
    "id": "codex--build-brand-from-anatomy--transfer-direction-contract",
    "name": "transfer-direction-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/transfer-direction-contract.md",
    "description": "Deliver the registered Storybook document and `outputs/extended-brand-anatomy.json` as a pair. Storybook is the readable Stage 2 anatomy and must show the two registered anchor images. The JSON is the explicit input for Stage 3 landing copy and product-image production."
  },
  {
    "id": "codex--build-brand-from-anatomy--transfer-input-contract",
    "name": "transfer-input-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/transfer-input-contract.md",
    "description": "The intake exists only to obtain enough information to write a useful direction report. It is not a workshop or a second report."
  },
  {
    "id": "codex--build-brand-from-anatomy--tuning-framework",
    "name": "tuning-framework.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/tuning-framework.md",
    "description": "Apply the source anatomy as an operating model, not as a collection of recognizable surfaces."
  },
  {
    "id": "codex--build-landing-materials",
    "name": "build-landing-materials (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/build-landing-materials/SKILL.md",
    "description": "Build Stage 3 landing copy and product-image materials from an accepted Stage 2 JSON and registered Storybook report. Deliver canonical JSON and the fixed Storybook reader; never create an HTML report or coded landing page."
  },
  {
    "id": "codex--build-landing-materials--landing-materials-contract",
    "name": "landing-materials-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-landing-materials/references/landing-materials-contract.md",
    "description": "- accepted `extended-brand-anatomy.json` and registered Storybook document;"
  },
  {
    "id": "codex--commercial-photo-prompting",
    "name": "commercial-photo-prompting (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/commercial-photo-prompting/SKILL.md",
    "description": "Plan, compile, diagnose, and refine realistic commercial or cinematic photo prompts, with web-first routing for hero, PDP, feature, detail, grid, scale, and gallery imagery. Use when Codex needs to choose a web UI image role, angle, distance, copy-safe composition, or technical photographic behavior; build a coherent series; repair a CGI-looking result; or prepare a prompt for GPT Image or another image model."
  },
  {
    "id": "codex--commercial-photo-prompting--codex-image-profile",
    "name": "codex-image-profile.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/commercial-photo-prompting/references/codex-image-profile.md",
    "description": "Use this reference only when preparing for or executing with the Codex image tool or GPT Image. Treat it as mutable model guidance and recheck official documentation when model behavior or tool arguments may have changed."
  },
  {
    "id": "codex--commercial-photo-prompting--commercial-photographic-taxonomy",
    "name": "commercial-photographic-taxonomy.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/commercial-photo-prompting/references/commercial-photographic-taxonomy.md",
    "description": "> 상업·시네마틱 실사 이미지의 촬영 어휘. 장르에서 스펙으로 내려가는 결정 순서로 프롬프트 조각을 조합합니다."
  },
  {
    "id": "codex--commercial-photo-prompting--web-editorial-composition",
    "name": "web-editorial-composition.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/commercial-photo-prompting/references/web-editorial-composition.md",
    "description": "Use web placement as the first composition classifier for commercial photography. Most requested commercial images will be placed in a website or product interface, so do not wait for the user to say `web` before routing the shot."
  },
  {
    "id": "codex--component-work",
    "name": "component-work (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/component-work/SKILL.md",
    "description": "Create, modify, delete, refactor, or document React UI components and Storybook stories in the Liberation Starter Kit. Use whenever work touches `src/components`, `src/stories`, or `*.stories.jsx`, including component reuse, MUI `sx` styling, interaction behavior, Storybook controls, and component documentation. Do not use for report data or planning changes that leave component and story files untouched."
  },
  {
    "id": "codex--component-work--interactive-principles",
    "name": "interactive-principles.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/interactive-principles.md",
    "description": "Use this reference only for interaction beyond ordinary hover, focus, and disclosure states."
  },
  {
    "id": "codex--component-work--mui-theme",
    "name": "mui-theme.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/mui-theme.md",
    "description": "MUI 커스텀 테마 설정 규칙"
  },
  {
    "id": "codex--component-work--refactoring-guide",
    "name": "refactoring-guide.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/refactoring-guide.md",
    "description": "> 리팩토링 작업 시 준수해야 할 가이드."
  },
  {
    "id": "codex--component-work--storybook-writing",
    "name": "storybook-writing.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/storybook-writing.md",
    "description": "Use this reference for changes under `src/stories` or to `*.stories.jsx`."
  },
  {
    "id": "codex--component-work--taxonomy-index",
    "name": "taxonomy-index.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/taxonomy-index.md",
    "description": "> 전체 분류체계 빠른 참조용 인덱스"
  },
  {
    "id": "codex--component-work--typography-criteria",
    "name": "typography-criteria.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/component-work/references/typography-criteria.md",
    "description": "> 이 파일은 `scripts/extract-design-criteria.mjs` 가 `src/data/typographyTaxonomyData.js` 에서 추출한 파생 뷰입니다."
  },
  {
    "id": "port-claude-skill-to-codex",
    "name": "port-claude-skill-to-codex (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/port-claude-skill-to-codex/SKILL.md",
    "description": "Port or synchronize a project-local Claude skill from `.claude/skills` into a Codex-native `.agents/skills` package while preserving its intent, safety gates, and useful resources and translating invocation metadata, tool assumptions, paths, and project integration. Use when asked to make a Claude skill available to Codex, migrate or sync a Claude skill, create a Codex counterpart, or audit a Claude/Codex skill pair. Do not use for ordinary skill authoring without a Claude source."
  },
  {
    "id": "port-claude-skill-to-codex--codex-porting-contract",
    "name": "codex-porting-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/port-claude-skill-to-codex/references/codex-porting-contract.md",
    "description": "Use this contract to decide what to preserve, translate, share, or omit. The goal is behavioral equivalence in the current repository, not textual parity."
  },
  {
    "id": "codex--project-planning",
    "name": "project-planning (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/project-planning/SKILL.md",
    "description": "Create structured project planning documents in three approval-gated phases: project summary, UX flow, and visual direction, then apply only explicitly approved design-token changes immediately after visual-direction approval. Use only when the user explicitly invokes `$project-planning` or directly asks to run this named planning workflow. Do not activate for ordinary implementation plans, status updates, or broad UI conversion."
  },
  {
    "id": "codex--project-planning--doc-templates",
    "name": "doc-templates.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/project-planning/references/doc-templates.md",
    "description": "> 각 Phase에서 문서 작성 시 이 템플릿의 구조를 따른다."
  },
  {
    "id": "codex--project-planning--token-application-contract",
    "name": "token-application-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/project-planning/references/token-application-contract.md",
    "description": "Use this contract after the user approves Phase 3, Visual Direction. Approval activates a bounded design-token patch; it does not authorize a general visual conversion of the product."
  },
  {
    "id": "codex--reconstruct-brand-system",
    "name": "reconstruct-brand-system (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/reconstruct-brand-system/SKILL.md",
    "description": "Route one brand project through three reviewed JSON-and-Storybook stages: time-boxed source research, extended target-brand anatomy, and landing materials. Enforce fixed React reports, automatic registration, and no HTML reports."
  },
  {
    "id": "codex--reconstruct-brand-system--brand-anatomy-schema",
    "name": "brand-anatomy-schema.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/brand-anatomy-schema.md",
    "description": "Use this schema to convert evidence into a coherent model. Complete every applicable field, cite evidence IDs, and mark each entry `Observed` or `Inferred` with confidence."
  },
  {
    "id": "codex--reconstruct-brand-system--chaining-contract",
    "name": "chaining-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/chaining-contract.md",
    "description": "The pipeline uses one shared `pipeline-state.json`. Each stage keeps its own existing `stage-review.json`; no second approval format is introduced."
  },
  {
    "id": "codex--reconstruct-brand-system--evidence-protocol",
    "name": "evidence-protocol.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/evidence-protocol.md",
    "description": "Use this protocol to build a representative, provenance-rich corpus before interpreting a brand."
  },
  {
    "id": "codex--reconstruct-brand-system--output-schema",
    "name": "output-schema.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/output-schema.md",
    "description": "Use `assets/brand-dossier.md` as the drafting skeleton. Preserve the order below so later reviewers and scripts can find required sections."
  },
  {
    "id": "codex--reconstruct-brand-system--parallel-execution-contract",
    "name": "parallel-execution-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/parallel-execution-contract.md",
    "description": "Use this contract only for a full routed pipeline. Standalone stage skills keep their normal execution behavior."
  },
  {
    "id": "codex--reconstruct-brand-system--phase-gates",
    "name": "phase-gates.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/phase-gates.md",
    "description": "Use these gates as a state machine. Never skip, merge, rename, or retroactively waive a gate because a comparative or time-boxed artifact already exists."
  },
  {
    "id": "codex--reconstruct-brand-system--quality-rubric",
    "name": "quality-rubric.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/quality-rubric.md",
    "description": "Audit the completed case independently. Score each criterion, cite concrete locations, and fail critical violations regardless of total score."
  },
  {
    "id": "codex--reconstruct-brand-system--storybook-report-contract",
    "name": "storybook-report-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/storybook-report-contract.md",
    "description": "Brand reports are authored as canonical Stage JSON and read through one fixed React document system. This contract is subordinate to [the normative pipeline specification](../../../../docs/brand-research-pipeline-spec.md)."
  },
  {
    "id": "codex--reconstruct-brand-system--transfer-rules",
    "name": "transfer-rules.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/transfer-rules.md",
    "description": "Translate the source brand's causal logic into a new product system without reproducing source-owned signatures."
  },
  {
    "id": "codex--reconstruct-brand-system--verbal-visual-taxonomy",
    "name": "verbal-visual-taxonomy.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/verbal-visual-taxonomy.md",
    "description": "Use the relevant sections while extracting executable rules. Treat the dimensions as prompts, not a checklist that forces nonexistent traits."
  },
  {
    "id": "codex--research-brand-anatomy",
    "name": "research-brand-anatomy (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/research-brand-anatomy/SKILL.md",
    "description": "Research one existing reference brand as a time-boxed source-only Stage 1 package. Deliver canonical JSON and a fixed automatically registered Storybook report; do not create target-brand work or HTML reports."
  },
  {
    "id": "codex--research-brand-anatomy--brand-model-json-contract",
    "name": "brand-model-json-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/brand-model-json-contract.md",
    "description": "Create `outputs/source-brand-analysis.json` as the canonical handoff and register it in the reader-facing Storybook document. Storybook explains the analysis; this JSON is the explicit input used to draft a later transfer plan. It is not an implementation token file. Do not create an adjacent HTML report."
  },
  {
    "id": "codex--research-brand-anatomy--evidence-and-layer-model",
    "name": "evidence-and-layer-model.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/evidence-and-layer-model.md",
    "description": "- `primary`: official site, product, packaging, interface, press kit, campaign, store, social account, report, manual, or first-party interview."
  },
  {
    "id": "codex--research-brand-anatomy--global-brand-system-framework",
    "name": "global-brand-system-framework.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/global-brand-system-framework.md",
    "description": "Use this framework after the source anatomy and grammar are complete. It turns source observations into portable brand operating guidance without creating a target design system."
  },
  {
    "id": "codex--research-brand-anatomy--report-language-style",
    "name": "report-language-style.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/report-language-style.md",
    "description": "Use this reference only when turning the approved source anatomy into the reader-facing Storybook document. Do not rewrite the evidence register, Core Claim rows, or grammar source fields merely to make them sound simpler."
  },
  {
    "id": "codex--research-brand-anatomy--source-anatomy-schema",
    "name": "source-anatomy-schema.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/source-anatomy-schema.md",
    "description": "Every material statement uses `Observed` or `Inferred`, confidence, evidence IDs, scope, alternative explanation, and exception where relevant."
  },
  {
    "id": "vdl-visual-asset-prompt",
    "name": "vdl-visual-asset-prompt (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/vdl-visual-asset-prompt/SKILL.md",
    "description": "Use in the Vibe Design Lab repo when turning vague visual intent into a restrained generation-ready prompt spec for images, illustrations, heroes, thumbnails, diagrams, 3D objects, abstract backgrounds, icons, menu illustration series, or \"/visual-asset\" style requests. Start from the canonical Claude visual-asset-prompt source, lock an Asset Template first, FORMAT as ratio, composition, background, object scale, crop, margins, and asset type, then choose 1 to 2 LOOK keywords, and keep SUBJECT as the only variable for series. Target the Codex built-in image model (gpt-image 2.0 / latest), preserve user constraints, run independent steps in parallel, run the deterministic derive engine for negatives, and route to the appropriate VDL generation or implementation skill. Do not directly generate images mid-spec from this skill."
  }
];

export const edgeTypes = {
  loads: { label: '자동 로드', style: 'solid' },
  references: { label: '텍스트 참조', style: 'dashed' },
  conditional: { label: '조건부 참조', style: 'dotted' },
  activates: { label: '의도 기반 활성화', style: 'solid' },
  resources: { label: 'on-demand Read', style: 'dashed' },
};

export const ruleEdges = [
  {
    "from": "claude-md",
    "to": "code-convention",
    "type": "loads"
  },
  {
    "from": "claude-md",
    "to": "design-system",
    "type": "loads"
  },
  {
    "from": "claude-md",
    "to": "directory-structure",
    "type": "loads"
  },
  {
    "from": "claude-md",
    "to": "mui-grid-usage",
    "type": "loads"
  },
  {
    "from": "claude-md",
    "to": "analyze-site-design-with-aside",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "analyze-site-design-with-aside",
    "to": "analyze-site-design-with-aside--aside-setup-spec",
    "type": "resources",
    "note": ""
  },
  {
    "from": "analyze-site-design-with-aside",
    "to": "analyze-site-design-with-aside--design-analysis-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "build-brand-from-anatomy",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "claude-md",
    "to": "build-landing-materials",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "claude-md",
    "to": "commercial-photo-prompting",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "commercial-photo-prompting",
    "to": "commercial-photo-prompting--commercial-photographic-taxonomy",
    "type": "resources",
    "note": ""
  },
  {
    "from": "commercial-photo-prompting",
    "to": "commercial-photo-prompting--prompt-output-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "commercial-photo-prompting",
    "to": "commercial-photo-prompting--web-editorial-composition",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "component-work",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "component-work",
    "to": "component-work--components",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--interactive-principles",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--mui-theme",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--project-summary",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--refactoring-guide",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--storybook-writing",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--taxonomy-index",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--taxonomy-v0-4",
    "type": "resources",
    "note": ""
  },
  {
    "from": "component-work",
    "to": "component-work--typography-criteria",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "project-planning",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "project-planning",
    "to": "project-planning--doc-templates",
    "type": "resources",
    "note": ""
  },
  {
    "from": "project-planning",
    "to": "project-planning--token-application-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "reconstruct-brand-system",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "claude-md",
    "to": "research-brand-anatomy",
    "type": "activates",
    "note": "Claude"
  },
  {
    "from": "claude-md",
    "to": "codex--analyze-site-design-with-aside",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--analyze-site-design-with-aside",
    "to": "codex--analyze-site-design-with-aside--aside-setup-spec",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--analyze-site-design-with-aside",
    "to": "codex--analyze-site-design-with-aside--design-analysis-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--build-brand-from-anatomy",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--build-brand-from-anatomy",
    "to": "codex--build-brand-from-anatomy--transfer-direction-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--build-brand-from-anatomy",
    "to": "codex--build-brand-from-anatomy--transfer-input-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--build-brand-from-anatomy",
    "to": "codex--build-brand-from-anatomy--tuning-framework",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--build-landing-materials",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--build-landing-materials",
    "to": "codex--build-landing-materials--landing-materials-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--commercial-photo-prompting",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--commercial-photo-prompting",
    "to": "codex--commercial-photo-prompting--codex-image-profile",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--commercial-photo-prompting",
    "to": "codex--commercial-photo-prompting--commercial-photographic-taxonomy",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--commercial-photo-prompting",
    "to": "codex--commercial-photo-prompting--web-editorial-composition",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--component-work",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--interactive-principles",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--mui-theme",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--refactoring-guide",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--storybook-writing",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--taxonomy-index",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--component-work",
    "to": "codex--component-work--typography-criteria",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "port-claude-skill-to-codex",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "port-claude-skill-to-codex",
    "to": "port-claude-skill-to-codex--codex-porting-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--project-planning",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--project-planning",
    "to": "codex--project-planning--doc-templates",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--project-planning",
    "to": "codex--project-planning--token-application-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--reconstruct-brand-system",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--brand-anatomy-schema",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--chaining-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--evidence-protocol",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--output-schema",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--parallel-execution-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--phase-gates",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--quality-rubric",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--storybook-report-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--transfer-rules",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--reconstruct-brand-system",
    "to": "codex--reconstruct-brand-system--verbal-visual-taxonomy",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "codex--research-brand-anatomy",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "codex--research-brand-anatomy",
    "to": "codex--research-brand-anatomy--brand-model-json-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--research-brand-anatomy",
    "to": "codex--research-brand-anatomy--evidence-and-layer-model",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--research-brand-anatomy",
    "to": "codex--research-brand-anatomy--global-brand-system-framework",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--research-brand-anatomy",
    "to": "codex--research-brand-anatomy--report-language-style",
    "type": "resources",
    "note": ""
  },
  {
    "from": "codex--research-brand-anatomy",
    "to": "codex--research-brand-anatomy--source-anatomy-schema",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "vdl-visual-asset-prompt",
    "type": "activates",
    "note": "Codex"
  }
];

export const conditionMatrix = [
  {
    "task": "컴포넌트 생성",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "component-work",
    "skillResources": [
      "component-work--taxonomy-index",
      "component-work--storybook-writing"
    ]
  },
  {
    "task": "컴포넌트 수정",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "component-work",
    "skillResources": [
      "component-work--storybook-writing"
    ]
  },
  {
    "task": "컴포넌트 삭제",
    "rules": [],
    "skill": "component-work"
  },
  {
    "task": "인터랙티브 컴포넌트",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "component-work",
    "skillResources": [
      "component-work--taxonomy-index",
      "component-work--interactive-principles",
      "component-work--storybook-writing"
    ]
  },
  {
    "task": "스토리 작성/수정",
    "rules": [],
    "skill": "component-work",
    "skillResources": [
      "component-work--storybook-writing"
    ]
  },
  {
    "task": "외부 코드 변환",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "convert-external",
    "skillResources": []
  },
  {
    "task": "리팩토링",
    "rules": [
      "code-convention"
    ],
    "skill": "component-work",
    "skillResources": [
      "component-work--refactoring-guide"
    ]
  },
  {
    "task": "테마/스타일 수정",
    "rules": [
      "design-system"
    ],
    "skillResources": [
      "component-work--mui-theme"
    ]
  },
  {
    "task": "Grid 사용",
    "rules": [
      "mui-grid-usage"
    ]
  },
  {
    "task": "Codex · 컴포넌트 생성·수정·삭제",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "codex--component-work",
    "skillResources": [
      "codex--component-work--taxonomy-index",
      "codex--component-work--storybook-writing"
    ]
  },
  {
    "task": "Codex · 인터랙티브 컴포넌트",
    "rules": [
      "code-convention",
      "design-system"
    ],
    "skill": "codex--component-work",
    "skillResources": [
      "codex--component-work--interactive-principles",
      "codex--component-work--storybook-writing"
    ]
  },
  {
    "task": "Codex · Storybook 스토리",
    "rules": [],
    "skill": "codex--component-work",
    "skillResources": [
      "codex--component-work--storybook-writing"
    ]
  },
  {
    "task": "Codex · 컴포넌트 리팩토링",
    "rules": [
      "code-convention"
    ],
    "skill": "codex--component-work",
    "skillResources": [
      "codex--component-work--refactoring-guide"
    ]
  },
  {
    "task": "Codex · 테마/스타일 수정",
    "rules": [
      "design-system"
    ],
    "skill": "codex--component-work",
    "skillResources": [
      "codex--component-work--mui-theme"
    ]
  },
  {
    "task": "Claude · 프로젝트 기획 문서",
    "rules": [],
    "skill": "project-planning",
    "skillResources": [
      "project-planning--doc-templates"
    ]
  },
  {
    "task": "Codex · 프로젝트 기획 문서",
    "rules": [],
    "skill": "codex--project-planning",
    "skillResources": [
      "codex--project-planning--doc-templates"
    ]
  },
  {
    "task": "브랜드 재구성 전체 체인",
    "rules": [],
    "skill": "reconstruct-brand-system",
    "skillResources": []
  },
  {
    "task": "기존 브랜드 아나토미 분석",
    "rules": [],
    "skill": "research-brand-anatomy",
    "skillResources": []
  },
  {
    "task": "분석 브랜드를 신규 브랜드로 전환",
    "rules": [],
    "skill": "build-brand-from-anatomy",
    "skillResources": []
  },
  {
    "task": "랜딩페이지 카피·제품 이미지 재료 준비",
    "rules": [],
    "skill": "build-landing-materials",
    "skillResources": []
  },
  {
    "task": "상업용 브랜드·제품 사진 프롬프트",
    "rules": [],
    "skill": "commercial-photo-prompting",
    "skillResources": [
      "commercial-photo-prompting--web-editorial-composition",
      "commercial-photo-prompting--commercial-photographic-taxonomy"
    ]
  },
  {
    "task": "Claude 스킬을 Codex로 포팅",
    "rules": [],
    "skill": "port-claude-skill-to-codex",
    "skillResources": [
      "port-claude-skill-to-codex--codex-porting-contract"
    ]
  },
  {
    "task": "Claude · Aside로 사이트 디자인 분석",
    "rules": [],
    "skill": "analyze-site-design-with-aside",
    "skillResources": [
      "analyze-site-design-with-aside--aside-setup-spec",
      "analyze-site-design-with-aside--design-analysis-contract"
    ]
  },
  {
    "task": "Codex · Aside로 사이트 디자인 분석",
    "rules": [],
    "skill": "codex--analyze-site-design-with-aside",
    "skillResources": [
      "codex--analyze-site-design-with-aside--aside-setup-spec",
      "codex--analyze-site-design-with-aside--design-analysis-contract"
    ]
  }
];
