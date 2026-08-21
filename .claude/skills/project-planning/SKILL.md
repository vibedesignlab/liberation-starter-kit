---
name: project-planning
description: Creates approval-gated planning documents for project-summary, ux-flow, and visual-direction phases, then immediately applies only design-token rows explicitly approved in visual-direction. Does not perform broad UI or component conversion.
when_to_use: When user explicitly invokes /project-planning. Do not auto-activate — wait for direct user invocation.
user-invocable: true
disable-model-invocation: true
---

# Project Planning Skill

> 기획 문서(project-summary → ux-flow → visual-direction)를 순차 작성한 뒤, 비주얼 방향 승인 시 `apply`로 확정된 디자인 토큰만 즉시 반영하는 워크플로우

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 기획 시작 | "기획 문서 작성해줘", "프로젝트 계획", "새 기능 기획" |
| 개별 문서 | "project-summary 작성", "ux-flow 만들어줘", "visual-direction" |
| 이어서 작성 | "다음 단계 진행해줘", "ux-flow 이어서" |

---

## 워크플로우

### 전체 흐름

```
Phase 1          Phase 2              Phase 3
project-summary → ux-flow            → visual-direction
     │                │                    │
  [승인 게이트]    [승인 게이트]        [승인 → 토큰만 적용]
```

### Phase 1: project-summary

1. 사용자에게 프로젝트 목적/범위 질문
2. `resources/doc-templates.md` Read → project-summary 템플릿 확인
3. `docs/{project-name}/01-project-summary.md` 작성
   - 프로젝트명, 목적, 핵심 기능 개조식
   - 대상 사용자, 기술적 제약사항
4. **승인 게이트**: 사용자에게 요약 제시 → 수정/승인

### Phase 2: ux-flow

**Phase 1 승인 후에만 진행**

1. `docs/{project-name}/01-project-summary.md` Read (승인된 문서)
2. `resources/doc-templates.md` Read → ux-flow 템플릿 확인
3. `component-work/resources/components.md` Read → 기존 컴포넌트 확인
4. `component-work/resources/taxonomy-index.md` Read → 카테고리 매핑
5. `docs/{project-name}/02-ux-flow.md` 작성:
   - 유저 시나리오 (핵심 플로우별)
   - UX 플로우 다이어그램 (Mermaid)
   - 정보 구조 (IA)
   - 데이터 모델
   - 컴포넌트 리스트: 기존 재활용 vs 신규 필요
6. **승인 게이트**: 사용자에게 제시 → 수정/승인

### Phase 3: visual-direction

**Phase 2 승인 후에만 진행** (Phase 1만으로도 작성 가능 — 사용자 요청 시)

1. `docs/{project-name}/01-project-summary.md` Read
2. `resources/doc-templates.md` Read → visual-direction 템플릿 확인
3. `component-work/resources/mui-theme.md` Read → 현재 토큰 확인
4. `resources/token-application-contract.md` Read → 승인 후 적용 범위와 금지 범위 확인
5. `docs/{project-name}/03-visual-direction.md` 작성:
   - 디자인 토큰 커스텀 방향 (색상, 타이포, 간격)
   - 현재 테마 대비 변경 필요 사항
   - 레퍼런스 이미지/사이트 목록 (사용자 제공)
   - 톤앤매너 키워드
   - 각 토큰의 `apply` / `keep` / `defer` 결정, 대상 theme 파일과 활성 범위
6. **승인 게이트**: 승인하면 `apply` 토큰만 즉시 반영되고 컴포넌트·페이지 변환은 하지 않는다는 점과 정확한 토큰 diff를 함께 제시 → 수정/승인

### Phase 3 승인 후: 디자인 토큰 적용

사용자가 비주얼 방향을 명시적으로 승인하면 별도의 포괄적 구현 확인 없이 `resources/token-application-contract.md`에 따라 바로 진행한다.

1. `03-visual-direction.md`에서 `apply`로 승인된 정확한 토큰만 대상 theme 파일에 반영한다.
2. 승인 범위에서 테마를 실제 활성화하는 데 필요한 최소 export 또는 provider 선택만 함께 수정할 수 있다.
3. `keep`과 `defer`는 변경하지 않는다.
4. 컴포넌트 스타일, 페이지 마크업, 레이아웃 변환, 카피·콘텐츠·이미지·에셋 변경은 하지 않는다.
5. 토큰값·대상 파일·활성 범위·의존성 또는 다른 작업과의 충돌이 불명확하면 그 항목만 질문하고 전체 구현으로 넓히지 않는다.
6. 적용 파일과 토큰별 결과를 `03-visual-direction.md`에 기록한 뒤 정적 검사와 lint를 실행하고 멈춘다.

토큰 이후의 전체 UI 변환은 별도 사용자 요청이 있어야 시작한다.

### 개별 문서 직접 작성

사용자가 특정 Phase만 요청할 수 있음:
- "ux-flow만 작성해줘" → 기존 project-summary 확인 후 Phase 2 진행
- 기존 project-summary가 없으면 → Phase 1부터 시작하도록 안내

---

## Resources

| 파일 | 용도 | 언제 Read |
|------|------|----------|
| `doc-templates.md` | 3개 문서 유형 템플릿 | 각 Phase 시작 시 |
| `token-application-contract.md` | Phase 3 승인 후 토큰만 적용하는 범위·검증 계약 | Phase 3 승인 전과 승인 직후 |

### 참조하는 외부 리소스 (복제하지 않음)

| 파일 | 위치 | 언제 Read |
|------|------|----------|
| `components.md` | `component-work/resources/` | Phase 2 (재활용성 확인) |
| `taxonomy-index.md` | `component-work/resources/` | Phase 2 (카테고리 매핑) |
| `mui-theme.md` | `component-work/resources/` | Phase 3 (현재 토큰 확인) |

---

## 핵심 원칙

- **승인 없이 다음 Phase 진행 금지** — 각 Phase는 독립적 승인 단위
- **개조식 우선** — 기획 문서는 산문보다 구조화된 목록/표 사용
- **기존 컴포넌트 재활용 우선** — ux-flow의 컴포넌트 리스트에서 반드시 기존 것 먼저 확인
- **Mermaid 다이어그램 활용** — UX 플로우, IA를 시각적으로 표현
- **레퍼런스 이미지는 사용자 제공** — Claude가 임의로 URL 생성하지 않음
- **승인 후 토큰 즉시 적용** — `apply` 토큰과 최소 활성화 연결만 반영하고 전체 UI 변환은 별도 요청으로 남김
