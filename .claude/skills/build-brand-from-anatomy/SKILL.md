---
name: build-brand-from-anatomy
description: Stage 2 of the local brand pipeline. Use this skill whenever Claude must turn an accepted source-brand Storybook+JSON anatomy and a short target-brand brief into an extended target-brand anatomy, explicit product family and lineup, verbal and visual systems, key visual, at least two brand-mood directions, landing-page design tokens, generation-ready commercial-photo prompts, a pending external-asset registry, and an approval checkpoint. Claude must not call an image model; it prepares prompts and registers externally generated files later.
compatibility: Requires Python 3 and this repository's pnpm Storybook report registration scripts. Bitmap generation happens outside Claude and is not required for prompt-handoff validation.
---

# Stage 2 — Build Extended Brand Anatomy

승인된 Stage 1 브랜드 해부를 기반으로 타깃 브랜드와 제품 방향을 하나의 체계로 확장한다. Storybook 문서와 canonical JSON, 이미지 생성용 prompt/spec, pending asset registry를 전달하고 사용자 조정 또는 승인을 기다린다.

## 경계

- `outputs/source-brand-analysis.json`, 등록된 Stage 1 Storybook 리포트, 승인된 `stage-review.json`을 요구한다. 마이그레이션 기간에는 `outputs/source-brand-analysis.html`도 확인한다.
- Stage 2는 타깃 브랜드, 제품군과 라인업, 제품 형태, 언어·이미지 시스템, 랜딩 토큰 방향을 정의한다. PRD, 컴포넌트 시스템, 완성 랜딩 페이지는 만들지 않는다.
- Claude에는 이미지 생성 모델이 없다고 가정한다. 이미지 도구를 호출하거나 생성 완료를 주장하지 않는다.
- 이미지 역할은 generation-ready prompt/spec과 `external_pending` registry handoff로 만든다. 사용자가 외부 생성 파일을 제공한 뒤에만 `registered`로 전환한다.
- 검증 성공은 사용자 승인이 아니다. `stage-review.json`에 명시적 응답을 기록하기 전에는 Stage 3를 시작하지 않는다.
- 사용자가 명시적으로 요청하지 않으면 Playwright, Chrome MCP, 브라우저 자동화를 사용하지 않는다.

## 작업 전 읽기

1. intake 전에 [resources/transfer-input-contract.md](resources/transfer-input-contract.md)를 읽는다.
2. 합성 전에 [resources/tuning-framework.md](resources/tuning-framework.md)를 읽는다.
3. 납품 전에 [resources/transfer-direction-contract.md](resources/transfer-direction-contract.md)를 읽는다.
4. 이미지 prompt handoff 전에 [resources/image-prompt-handoff-contract.md](resources/image-prompt-handoff-contract.md)를 읽는다.
5. Storybook 등록 전에 [resources/storybook-report-contract.md](resources/storybook-report-contract.md)를 읽는다.
6. 라우팅된 전체 파이프라인이면 [resources/parallel-execution-contract.md](resources/parallel-execution-contract.md)를 따른다. canonical Stage 2 파일은 루트 coordinator만 쓴다.
7. 사진 prompt를 작성할 때 프로젝트 로컬 `/commercial-photo-prompting`을 호출한다. 그 스킬은 prompt/spec만 만들며 이미지 도구를 호출하지 않는다.

## 초기화

```bash
python3 .claude/skills/build-brand-from-anatomy/scripts/init_transfer.py <stage-2-directory>
```

Canonical artifacts:

- `transfer-input.json`
- `extended-brand-anatomy.md`
- `outputs/extended-brand-anatomy.html`
- `outputs/extended-brand-anatomy.json`
- `asset-registry.json`
- `assets/brand-mood/`
- `assets/product-hero/`
- `prompts/`
- `stage-review.json`

JSON이 canonical source이고, `Brand Reports/<brand>/Stage 2 — Extended Brand Anatomy` Storybook 문서가 주 reader다. HTML은 마이그레이션 호환 산출물로만 유지한다.

## 워크플로우

### B0 — 승인된 source 로드

Stage 1 JSON에서 명시적 grammar, 디자인 시스템 관계, 제품 언어, 보호 경계와 gap을 읽는다. Storybook 문서는 서사와 시각 맥락에 사용하고 HTML은 fallback으로만 사용한다. source audit을 다시 실행하지 않는다.

### B1 — 타깃 방향을 한 번만 잠금

사용자 요청과 source package에서 이미 이해한 제품, 라인업, 사용자, source distance, 시각 우선순위, token 관계를 먼저 짧게 재진술한다. 포지셔닝, 라인업, 제품 형태·인지 구조, 이미지, 토큰 관계 또는 랜딩 목표를 바꾸는 누락값만 한 번에 한 질문씩 묻는다.

- 최대 3개 질문과 물질적 모순에 대한 후속 1개만 허용한다.
- 사용자가 이름을 언급한 모든 제품을 라인업 범위에 보존한다.
- `single_product`, `focused_family`(2–3개), `exploratory_family`(3–5개) 중 하나를 선택한다.
- source distance는 내부적으로 `keep`, `tune`, `new`로 정규화하되 사용자에게 전문용어를 강요하지 않는다.
- fan-out 전에 target, audience, lineup, source distance, 3–5개 공통 불변성, accent behavior, visual priority, landing goal을 `transfer-input.json`에 잠근다.

### B2 — 확장 브랜드 해부 작성

다음 8개 numbered section만 작성한다.

1. source-grammar application
2. target-brand positioning
3. product family, explicit lineup, landing-focused product detail
4. verbal branding and copy hierarchy
5. visual branding and key visual
6. brand mood and brand-image system
7. product-native visual traits and product-image system
8. landing-page design-token direction

각 섹션에 승인 대상인 핵심 결정을 한 문장으로 요약한 `key_insight`를 쓴다. 제품 라인업의 각 항목에는 이름, 유형, 역할, 사용 상황, 차이, 상세 form cue, 허용 variation, product USP, landing message, proof-image role이 있어야 한다. 제품 차이는 색이나 크기만으로 만들지 않는다.

언어 시스템은 brand message → 2–3 brand values → family USP → 각 제품 USP 순서로 만든다. 필요할 때만 서로 실제로 다른 narrative route 2–3개를 제시하고 Stage 3용 route 하나를 고른다. message와 key visual, value와 brand mood, USP와 product imagery의 연결을 명시한다.

key visual, brand image, product image, product-native trait를 섞지 않는다. 토큰은 color, typography, spacing, layout, shape/border/radius, 필요한 motion까지만 정의하고 각 항목에 `keep`, `tune`, `new`와 source 관계를 기록한다.

Typography token은 위계를 실제 수치로 보여준다. 최소한 display, page headline, section heading, body, support/label 수준의 size, line-height, weight와 responsive behavior를 기록한다. 작은 source 값을 관성적으로 복제하지 말고 읽기 가능한 body와 명확히 큰 headline을 만든다. 기본 방향은 display `clamp(3rem, 7vw, 6rem)`, page headline `clamp(2.5rem, 6vw, 5rem)`, section heading `clamp(1.875rem, 4vw, 3.5rem)`, body `1rem–1.25rem`, support/label `0.75rem–0.875rem`이며 source grammar나 언어 조판 근거가 있을 때만 조정한다.

### B3 — 이미지 prompt/spec와 pending registry 준비

기본 anatomy template, canonical JSON shell, report structure가 준비된 뒤 이미지 작업을 시작한다. 이미지 전략을 먼저 만들어 canonical 방향을 완성한 다음, 독립적인 prompt compile은 병렬로 진행한다.

필수 handoff는 다음 3개 이상이다.

1. lead product의 representative-product hero prompt/spec 1개
2. 서로 다른 communication job을 가진 brand-mood prompt/spec 최소 2개

각 prompt는 `/commercial-photo-prompting`으로 기술적으로 컴파일한다. Stage 2 anatomy가 전략 contract이며 사진 스킬이 새 전략을 발명해서는 안 된다. 제품 hero와 두 brand-mood prompt는 서로 독립적이면 동시에 작성한다. 직접 geometry reference가 필요할 때만 직렬화하고 이유를 기록한다.

각 asset record에 ID, role, communication job, prompt path, subject, aspect ratio, external generation provenance, reference lineage, invariants, one allowed variation, invariant check, status를 기록한다. prompt 완성 후 상태는 `external_pending`이다. `file_path`는 외부 이미지가 실제로 전달되기 전까지 비워 둔다.

외부 파일이 제공되면 scope와 provenance를 확인하고 지정된 `assets/` 폴더에 등록한다. 실제 파일이 존재하고 invariant 검토가 끝난 항목만 `status: registered`, `invariant_check: pass`로 바꾼다. 등록되지 않은 항목을 생성됐다고 표현하지 않는다.

### B4 — Storybook+JSON 전달과 승인 정지

Canonical JSON, registry, 3개 이상의 prompt/spec, Storybook 문서를 전달한다. Storybook은 explicit lineup과 모든 pending/registered asset handoff를 보여야 한다. 등록된 이미지는 원본 비율로 보여주고, pending 항목은 prompt 경로·역할·상태를 카드로 표시한다.

모델 또는 registry를 바꾼 뒤 deterministic report를 만들고 등록한다.

```bash
python3 .claude/skills/build-brand-from-anatomy/scripts/render_extended_report.py <stage-2-directory>
pnpm register-brand-report -- <stage-2-directory>
pnpm register-brand-report -- <stage-2-directory> --check
```

사용자에게 브랜드 방향, 제품군, 이미지 prompt/handoff에서 바꿀 부분을 한 문장으로 묻는다. `없음`, `승인` 또는 동등한 명시 응답만 `accepted`로 기록한다. 사용자가 실제 bitmap 평가를 요구하면 해당 파일이 등록될 때까지 승인 checkpoint를 유지한다. `accepted` 전에는 Stage 3를 시작하지 않는다.

## 검증

```bash
python3 .claude/skills/build-brand-from-anatomy/scripts/validate_extended.py <stage-2-directory> all
```

검증은 8개 section, explicit lineup, typography hierarchy, Storybook 호환 HTML, 제품 hero prompt 1개, brand-mood prompt 최소 2개, pending/registered registry 무결성, token 관계, review checkpoint를 확인한다. 취향이나 설득력은 판정하지 않는다.
