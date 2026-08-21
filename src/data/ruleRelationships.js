/**
 * 프로젝트 룰 관계 데이터 (자동 생성)
 *
 * 이 파일은 scripts/generate-rules.js 에 의해 자동 생성됩니다.
 * 직접 수정하지 마세요. 수정이 필요하면 스크립트를 수정하세요.
 *
 * 생성: pnpm generate-rules
 * 생성일: 2026-08-21
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
    "description": "Creates structured planning documents (project-summary, ux-flow, visual-direction) in docs/ for new feature or project initiatives."
  },
  {
    "id": "project-planning--doc-templates",
    "name": "doc-templates.md",
    "priority": "Skill Resource",
    "path": ".claude/skills/project-planning/resources/doc-templates.md",
    "description": "> 각 Phase에서 문서 작성 시 이 템플릿의 구조를 따른다."
  },
  {
    "id": "build-brand-from-anatomy",
    "name": "build-brand-from-anatomy (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/build-brand-from-anatomy/SKILL.md",
    "description": "Stage 2 of the brand pipeline. Turn an accepted source-brand Storybook+JSON anatomy and a short user brief into an extended target-brand anatomy with explicit product family and lineup, product detail, verbal and visual systems, key visual, brand mood, product-native visual language, landing-page design tokens, one generated representative-product image, and one generated brand-mood image. Keep deterministic HTML only as a migration-compatibility artifact. Stop for user adjustment before landing-material production."
  },
  {
    "id": "build-brand-from-anatomy--transfer-direction-contract",
    "name": "transfer-direction-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/transfer-direction-contract.md",
    "description": "Deliver the registered Storybook document and `outputs/extended-brand-anatomy.json` as a pair. Storybook is the readable Stage 2 anatomy and must show the two registered anchor images. The JSON is the explicit input for Stage 3 landing copy and product-image production. Keep `outputs/extended-brand-anatomy.html` only as a migration-compatibility artifact."
  },
  {
    "id": "build-brand-from-anatomy--transfer-input-contract",
    "name": "transfer-input-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/transfer-input-contract.md",
    "description": "The intake exists only to obtain enough information to write a useful direction report. It is not a workshop or a second report."
  },
  {
    "id": "build-brand-from-anatomy--tuning-framework",
    "name": "tuning-framework.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-brand-from-anatomy/references/tuning-framework.md",
    "description": "Apply the source anatomy as an operating model, not as a collection of recognizable surfaces."
  },
  {
    "id": "build-landing-materials",
    "name": "build-landing-materials (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/build-landing-materials/SKILL.md",
    "description": "Stage 3 of the brand pipeline. Turn an accepted extended-brand anatomy into a modular Storybook+JSON landing-material report: UX copy hierarchy, brand value, brand story, product introduction, explicit product-lineup copy, and registered product-image renders. Use commercial-photo-prompting to preserve the approved product and image system, then stop for user adjustment. Keep deterministic HTML only as a migration-compatibility artifact; do not build or code the final landing page."
  },
  {
    "id": "build-landing-materials--landing-materials-contract",
    "name": "landing-materials-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/build-landing-materials/references/landing-materials-contract.md",
    "description": "- accepted `extended-brand-anatomy.json` and registered Storybook document;"
  },
  {
    "id": "commercial-photo-prompting",
    "name": "commercial-photo-prompting (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/commercial-photo-prompting/SKILL.md",
    "description": "Plan, compile, diagnose, and iteratively refine prompts for realistic commercial or cinematic photography using a technical taxonomy of optics, lighting, color, composition, materials, production craft, and physical consistency. Use when Codex needs to develop a shot direction, turn an approved visual brief into a generation or edit prompt, build a coherent photo series, repair a prompt or generated image that looks CGI or physically inconsistent, or prepare a final prompt for GPT Image or another image model."
  },
  {
    "id": "commercial-photo-prompting--codex-image-profile",
    "name": "codex-image-profile.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/commercial-photo-prompting/references/codex-image-profile.md",
    "description": "Use this reference only when preparing for or executing with the Codex image tool or GPT Image. Treat it as mutable model guidance and recheck official documentation when model behavior or tool arguments may have changed."
  },
  {
    "id": "commercial-photo-prompting--commercial-photographic-taxonomy",
    "name": "commercial-photographic-taxonomy.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/commercial-photo-prompting/references/commercial-photographic-taxonomy.md",
    "description": "> 상업·시네마틱 실사 이미지의 촬영 어휘. 장르에서 스펙으로 내려가는 결정 순서로 프롬프트 조각을 조합합니다."
  },
  {
    "id": "reconstruct-brand-system",
    "name": "reconstruct-brand-system (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/reconstruct-brand-system/SKILL.md",
    "description": "Route one brand-reconstruction project through three reviewed Storybook+JSON stages while parallelizing safe work inside the active stage: source-brand research, extended target-brand anatomy with two anchor images, then landing UX copy and product-render materials."
  },
  {
    "id": "reconstruct-brand-system--brand-anatomy-schema",
    "name": "brand-anatomy-schema.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/brand-anatomy-schema.md",
    "description": "Use this schema to convert evidence into a coherent model. Complete every applicable field, cite evidence IDs, and mark each entry `Observed` or `Inferred` with confidence."
  },
  {
    "id": "reconstruct-brand-system--chaining-contract",
    "name": "chaining-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/chaining-contract.md",
    "description": "The pipeline uses one shared `pipeline-state.json`. Each stage keeps its own existing `stage-review.json`; no second approval format is introduced."
  },
  {
    "id": "reconstruct-brand-system--evidence-protocol",
    "name": "evidence-protocol.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/evidence-protocol.md",
    "description": "Use this protocol to build a representative, provenance-rich corpus before interpreting a brand."
  },
  {
    "id": "reconstruct-brand-system--output-schema",
    "name": "output-schema.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/output-schema.md",
    "description": "Use `assets/brand-dossier.md` as the drafting skeleton. Preserve the order below so later reviewers and scripts can find required sections."
  },
  {
    "id": "reconstruct-brand-system--parallel-execution-contract",
    "name": "parallel-execution-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/parallel-execution-contract.md",
    "description": "Use this contract only for a full routed pipeline. Standalone stage skills keep their normal execution behavior."
  },
  {
    "id": "reconstruct-brand-system--phase-gates",
    "name": "phase-gates.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/phase-gates.md",
    "description": "Use these gates as a state machine. Never skip, merge, rename, or retroactively waive a gate because a comparative or time-boxed artifact already exists."
  },
  {
    "id": "reconstruct-brand-system--quality-rubric",
    "name": "quality-rubric.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/quality-rubric.md",
    "description": "Audit the completed case independently. Score each criterion, cite concrete locations, and fail critical violations regardless of total score."
  },
  {
    "id": "reconstruct-brand-system--storybook-report-contract",
    "name": "storybook-report-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/storybook-report-contract.md",
    "description": "Brand reports are authored from their stage package and read in this repository's Storybook. The stage JSON remains the canonical content model; Storybook is the reader and component-composition layer."
  },
  {
    "id": "reconstruct-brand-system--transfer-rules",
    "name": "transfer-rules.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/transfer-rules.md",
    "description": "Translate the source brand's causal logic into a new product system without reproducing source-owned signatures."
  },
  {
    "id": "reconstruct-brand-system--verbal-visual-taxonomy",
    "name": "verbal-visual-taxonomy.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/reconstruct-brand-system/references/verbal-visual-taxonomy.md",
    "description": "Use the relevant sections while extracting executable rules. Treat the dimensions as prompts, not a checklist that forces nonexistent traits."
  },
  {
    "id": "research-brand-anatomy",
    "name": "research-brand-anatomy (Codex Skill)",
    "priority": "Skill",
    "path": ".agents/skills/research-brand-anatomy/SKILL.md",
    "description": "Research and model one existing reference brand without inventing, mapping, or planning a target brand. Deliver an evidence-backed Storybook document and structured JSON handoff covering strategy, verbal systems, identity, key visuals, brand mood, photography, product representation, physical or digital product-native language, behavior, and a portable global framework for color, typography, spacing, and layout. Keep deterministic HTML only as a migration-compatibility artifact. Stop before any transfer or fictional-brand work."
  },
  {
    "id": "research-brand-anatomy--brand-model-json-contract",
    "name": "brand-model-json-contract.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/brand-model-json-contract.md",
    "description": "Create `outputs/source-brand-analysis.json` as the canonical handoff and register it in the reader-facing Storybook document. Storybook explains the analysis; this JSON is the explicit input used to draft a later transfer plan. It is not an implementation token file. Keep the adjacent HTML only as a migration-compatibility artifact."
  },
  {
    "id": "research-brand-anatomy--evidence-and-layer-model",
    "name": "evidence-and-layer-model.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/evidence-and-layer-model.md",
    "description": "- `primary`: official site, product, packaging, interface, press kit, campaign, store, social account, report, manual, or first-party interview."
  },
  {
    "id": "research-brand-anatomy--global-brand-system-framework",
    "name": "global-brand-system-framework.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/global-brand-system-framework.md",
    "description": "Use this framework after the source anatomy and grammar are complete. It turns source observations into portable brand operating guidance without creating a target design system."
  },
  {
    "id": "research-brand-anatomy--report-language-style",
    "name": "report-language-style.md",
    "priority": "Skill Resource",
    "path": ".agents/skills/research-brand-anatomy/references/report-language-style.md",
    "description": "Use this reference only when turning the approved source anatomy into the reader-facing Storybook document and its compatibility HTML. Do not rewrite the evidence register, Core Claim rows, or grammar source fields merely to make them sound simpler."
  },
  {
    "id": "research-brand-anatomy--source-anatomy-schema",
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
    "from": "claude-md",
    "to": "build-brand-from-anatomy",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "build-brand-from-anatomy",
    "to": "build-brand-from-anatomy--transfer-direction-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "build-brand-from-anatomy",
    "to": "build-brand-from-anatomy--transfer-input-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "build-brand-from-anatomy",
    "to": "build-brand-from-anatomy--tuning-framework",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "build-landing-materials",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "build-landing-materials",
    "to": "build-landing-materials--landing-materials-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "commercial-photo-prompting",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "commercial-photo-prompting",
    "to": "commercial-photo-prompting--codex-image-profile",
    "type": "resources",
    "note": ""
  },
  {
    "from": "commercial-photo-prompting",
    "to": "commercial-photo-prompting--commercial-photographic-taxonomy",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "reconstruct-brand-system",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--brand-anatomy-schema",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--chaining-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--evidence-protocol",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--output-schema",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--parallel-execution-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--phase-gates",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--quality-rubric",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--storybook-report-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--transfer-rules",
    "type": "resources",
    "note": ""
  },
  {
    "from": "reconstruct-brand-system",
    "to": "reconstruct-brand-system--verbal-visual-taxonomy",
    "type": "resources",
    "note": ""
  },
  {
    "from": "claude-md",
    "to": "research-brand-anatomy",
    "type": "activates",
    "note": "Codex"
  },
  {
    "from": "research-brand-anatomy",
    "to": "research-brand-anatomy--brand-model-json-contract",
    "type": "resources",
    "note": ""
  },
  {
    "from": "research-brand-anatomy",
    "to": "research-brand-anatomy--evidence-and-layer-model",
    "type": "resources",
    "note": ""
  },
  {
    "from": "research-brand-anatomy",
    "to": "research-brand-anatomy--global-brand-system-framework",
    "type": "resources",
    "note": ""
  },
  {
    "from": "research-brand-anatomy",
    "to": "research-brand-anatomy--report-language-style",
    "type": "resources",
    "note": ""
  },
  {
    "from": "research-brand-anatomy",
    "to": "research-brand-anatomy--source-anatomy-schema",
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
    "task": "브랜드 재구성 전체 체인",
    "rules": [],
    "skill": "reconstruct-brand-system",
    "skillResources": [
      "reconstruct-brand-system--chaining-contract",
      "reconstruct-brand-system--parallel-execution-contract"
    ]
  },
  {
    "task": "기존 브랜드 아나토미 분석",
    "rules": [],
    "skill": "research-brand-anatomy",
    "skillResources": [
      "research-brand-anatomy--source-anatomy-schema",
      "research-brand-anatomy--brand-model-json-contract"
    ]
  },
  {
    "task": "분석 브랜드를 신규 브랜드로 전환",
    "rules": [],
    "skill": "build-brand-from-anatomy",
    "skillResources": [
      "build-brand-from-anatomy--transfer-direction-contract",
      "build-brand-from-anatomy--tuning-framework"
    ]
  },
  {
    "task": "랜딩페이지 카피·제품 이미지 재료 준비",
    "rules": [],
    "skill": "build-landing-materials",
    "skillResources": [
      "build-landing-materials--landing-materials-contract"
    ]
  },
  {
    "task": "상업용 브랜드·제품 사진 프롬프트",
    "rules": [],
    "skill": "commercial-photo-prompting",
    "skillResources": [
      "commercial-photo-prompting--commercial-photographic-taxonomy"
    ]
  }
];
