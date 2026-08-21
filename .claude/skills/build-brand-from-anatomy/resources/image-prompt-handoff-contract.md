# External image prompt handoff contract

Claude는 이 Stage에서 bitmap을 생성하지 않는다. 대신 외부 생성자가 바로 실행할 수 있는 prompt/spec과 검증 가능한 pending registry를 만든다.

## Required prompt set

- `representative_product_hero`: lead product를 설명하는 prompt/spec 1개
- `brand_mood`: 서로 다른 communication job을 담당하는 prompt/spec 최소 2개

Brand-mood 둘은 단순 색상 variation이 아니다. 하나는 브랜드 세계와 정서적 register를, 다른 하나는 사람·환경·사용 맥락 또는 감각적 proof를 담당하도록 역할을 분리한다.

## Prompt/spec fields

각 `prompts/<asset-id>.md`에는 다음 항목을 포함한다.

1. asset ID와 web image role
2. communication job
3. subject, scene, people/environment
4. product silhouette·proportion·material·color-placement invariants
5. camera angle, distance, lens character, crop, and copy-safe zone
6. lighting, palette, surface, atmosphere
7. aspect ratio and intended landing placement
8. negative constraints and source-brand boundaries
9. one allowed variation
10. final generation-ready prompt
11. external generation and return-file instructions

Prompt는 그 파일 하나만으로 실행 가능해야 한다. 전략적 공백을 사진 모델이 채우도록 맡기지 않는다.

## Registry states

| Status | Meaning | Required fields |
|---|---|---|
| `pending` | prompt가 아직 완성되지 않음 | asset ID, role |
| `external_pending` | prompt/spec은 완성됐고 외부 생성 대기 | prompt path, communication job, subject, aspect ratio, provenance, lineage, invariants, allowed variation |
| `registered` | 외부 bitmap이 로컬 Stage package에 등록되고 검토됨 | 위 필드 + file path, `invariant_check: pass` |

`generation_provenance`는 pending 단계에서 `external_generation_required`처럼 실제 상태를 쓰고, 등록 후 사용자가 제공한 생성 출처와 날짜 또는 식별자를 기록한다. 알 수 없는 모델이나 출처를 추정하지 않는다.

## Parallel timing

Canonical anatomy template과 JSON/report shell을 먼저 만든다. 그 뒤 독립적인 product-hero와 brand-mood prompt들을 병렬로 컴파일한다. 한 mood prompt가 완성된 product geometry 또는 다른 prompt의 확정값에 직접 의존할 때만 직렬화하고 이유를 job note에 남긴다.

## Storybook presentation

- `external_pending`: asset ID, role, communication job, prompt path, aspect ratio, status를 handoff card로 표시한다.
- `registered`: 실제 local bitmap을 intrinsic aspect ratio로 표시하고 같은 provenance를 유지한다.
- raw URL을 긴 visible text로 강제하지 않는다.
- pending card를 이미지처럼 꾸며 생성 완료로 오인시키지 않는다.
