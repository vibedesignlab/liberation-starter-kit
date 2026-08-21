---
name: build-landing-materials
description: Stage 3 of the local brand pipeline. Use this skill whenever an accepted extended-brand anatomy must become a modular Storybook+JSON landing-material package with UX copy hierarchy, brand value, brand story, full product-lineup copy, inherited mood and product constraints, and generation-ready product-image prompt handoffs. Claude does not generate or edit images in this skill; it records prompt specs and pending assets, then stops at the user approval gate. Do not build the landing page.
when_to_use: Use after Stage 2 extended-brand anatomy is explicitly accepted, or whenever the user asks for Stage 3 landing materials, landing copy materials, lineup copy, or product-image prompt handoffs from an approved brand anatomy.
user-invocable: true
---

# Build Landing Materials

승인된 Stage 2 브랜드 구조를 후속 랜딩 설계가 바로 소비할 수 있는 카피, 섹션 맵, 제품 이미지 프롬프트 패키지로 변환한다. 이 스킬의 완료 단위는 Storybook 문서와 canonical JSON이며, 실제 랜딩 페이지나 이미지 파일이 아니다.

## 경계

- Stage 2의 포지셔닝, 제품군, 제품 형태, key visual, 두 개 이상의 brand-mood anchor, 디자인 토큰 방향을 그대로 상속한다.
- 브랜드 전략을 다시 만들거나 라인업을 임의로 추가하지 않는다.
- 컴포넌트, 페이지 마크업, 최종 UX 구현을 작성하지 않는다.
- 이미지 모델, 이미지 API, 이미지 생성·편집 도구를 호출하지 않는다. 제품별 generation-ready prompt와 `pending_generation` asset handoff까지만 만든다.
- 사용자의 명시적 승인 없이 `stage-review.json`을 `accepted`로 바꾸거나 다음 단계로 진행하지 않는다.
- 사용자가 브라우저·스크린샷·Playwright를 명시적으로 요청하지 않으면 Playwright, Chrome MCP 등 브라우저 자동화를 사용하지 않는다.

## 작업 전 읽기

1. `resources/landing-materials-contract.md`를 읽어 canonical 산출물과 승인 조건을 확인한다.
2. 제품 이미지 방향을 작성하기 전에 `/commercial-photo-prompting`을 사용한다. 이 호출은 프롬프트 설계만 수행하며 생성은 수행하지 않는다.
3. 전체 파이프라인에서 실행 중이면 `.claude/skills/reconstruct-brand-system/resources/storybook-report-contract.md`와 `parallel-execution-contract.md`를 읽고 router의 작성권 규칙을 따른다.

## 초기화

스킬 디렉터리에서 실행한다.

```bash
python3 scripts/init_landing.py <stage-3-directory>
```

Canonical artifacts:

- `landing-input.json`
- `landing-materials.md`
- `outputs/landing-materials.json`
- `asset-registry.json`
- `prompts/`
- `stage-review.json`
- `outputs/landing-materials.html` — 이전 독자 호환용

JSON이 canonical source이고 등록된 `Brand Reports/<brand>/Stage 3 — Landing Materials` Storybook 문서가 기본 reader다.

## 워크플로우

### C0 — 승인된 Stage 2 패키지 로드

- `outputs/extended-brand-anatomy.json`, Storybook 등록, `asset-registry.json`, `stage-review.json`을 확인한다.
- Stage 2 review가 `accepted`인지, 제품 라인업이 명시적인지, 대표 제품 anchor와 brand-mood anchor가 각각 존재하는지 확인한다.
- 대표 제품 anchor는 형상·재질의 authority로, brand-mood anchors는 환경·색·빛의 authority로 사용한다.
- landing goal이나 narrative route가 비어 작업 결과가 달라질 때만 한 번에 하나의 짧은 질문과 추천 기본값을 제시한다.

### C1 — 랜딩 서사와 UX 카피 작성

카피와 프롬프트 작업을 나누기 전에 제품별 shot plan을 고정한다.

- product USP
- communication job
- protected invariants
- 허용 variation 한 가지
- 예정 asset ID와 landing section

승인된 언어와 `brand message → brand values → family USP → product USP` 위계를 사용한다. hero, brand value, brand story, product family, 모든 제품의 lineup copy, feature/proof/caption/CTA를 작성한다. 확인되지 않은 성능이나 효능을 만들지 않는다.

각 Storybook 섹션에 기존 내용을 요약한 `key_insight` 한 문장을 둔다. 헤드라인은 큰 위계를 유지하고, 텍스트는 잘리거나 overflow 되지 않게 하며, 링크는 짧은 label로 표시한다.

### C2 — 제품 이미지 prompt handoff 작성

`/commercial-photo-prompting`을 Series mode로 적용하되 프롬프트 산출만 요청한다.

- Stage 2의 제품 silhouette, construction, proportion, material, color placement를 고정한다.
- brand mood의 light, color, environment, capture family, retouching level, avoid conditions를 상속한다.
- 라인업의 모든 제품에 최소 한 개의 prompt spec을 만든다.
- 각 프롬프트는 독립 실행 가능하도록 invariants를 반복하며 variation axis는 한 번에 하나만 바꾼다.
- `prompts/<asset-id>.md` 또는 `.json`에 prompt, negative constraints, continuity lock, QA checklist를 저장한다.
- `asset-registry.json`에는 `status: pending_generation`, 빈 `file_path`, prompt provenance, reference lineage, allowed variation, `invariant_check: pending_asset_qa`를 기록한다.

Claude는 생성 결과가 없는 상태를 실패로 위장하지 않는다. 프롬프트 패키지가 완결되면 다음 이미지 실행 주체가 처리할 수 있는 pending asset handoff로 명시한다.

### C3 — 랜딩 섹션에 재료 매핑

각 섹션에 다음을 짝짓는다.

- communication job
- headline/support copy
- `proof_of`
- pending asset ID
- CTA 또는 다음 읽기 행동

모든 lineup product가 카피와 prompt handoff 양쪽에 존재해야 한다. 실제 이미지가 아직 없으므로 Storybook에는 prompt status, intended role, reference lineage, reserved aspect ratio를 렌더한다.

### C4 — Storybook+JSON 전달 후 승인 대기

Canonical JSON을 기준으로 Markdown과 호환 HTML을 생성하고 Storybook에 등록한다.

```bash
python3 scripts/render_landing_report.py <stage-3-directory>
pnpm register-brand-report -- <stage-3-directory>
pnpm register-brand-report -- <stage-3-directory> --check
python3 scripts/validate_landing.py <stage-3-directory>
```

`pnpm` 명령은 저장소 루트에서 실행한다. model, review, provenance, prompt handoff가 바뀌면 다시 등록한다.

마지막에는 카피 위계, 스토리, 라인업 차이, mood 계승, 프롬프트 일관성을 한 번에 검토하는 조정 질문을 남긴다. 사용자 응답에 따라 `pending`, `accepted`, `revision_requested`만 기록한다. Acceptance 뒤에도 페이지 구현이나 이미지 생성을 시작하지 않는다.

## 병렬 작업 규칙

Shot-plan barrier 뒤에는 카피/section mapping과 제품별 prompt compilation을 병렬화할 수 있다. 작업자는 서로 다른 `.work/` shard와 고유 prompt path만 소유한다. canonical JSON, registry, review 파일은 coordinator만 합친다.

## 완료 조건

- Stage 2 lineage와 승인 상태가 유효하다.
- 모든 Stage 2 제품이 lineup copy에 정확히 대응한다.
- 모든 제품에 generation-ready prompt handoff가 있고 상태가 `pending_generation`이다.
- brand mood와 제품 불변조건의 reference lineage가 기록돼 있다.
- 모든 pending asset이 landing section에 매핑돼 있다.
- Storybook registration check와 정적 validator가 통과한다.
- 사용자의 checkpoint 응답 전에는 stage가 완료 처리되지 않는다.
