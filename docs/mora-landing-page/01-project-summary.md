# MORA 브랜드 랜딩페이지

> Stage 3 Landing Materials(R2/R3 확정 에셋 39장)와 12개 검증된 레퍼런스 사이트 응용 계획을 하나의 프로덕션 랜딩페이지로 구현한다.

## 배경 및 목적

- **왜 만드는가**: MORA Infused Greek Yogurt는 Stage 1(소스 브랜드 분석) → Stage 2(타겟 브랜드 해부) → Stage 3(랜딩 재료)까지 완료된 상태다. 확정된 카피 시스템, 39장의 등록 에셋, 8개 섹션의 독서 순서, 그리고 18개 원본 사이트를 직접 방문해 추출한 12개 레퍼런스 응용 계획이 있다. 이것들을 실제로 작동하는 하나의 랜딩페이지로 조립해야 한다.
- **기대 효과**: 브랜드 론칭 시 바로 배포할 수 있는 프로덕션 랜딩페이지. "재료가 머무는 방식까지 보이는 한 컵"이라는 핵심 메시지를 스크롤 한 번으로 전달하고, 제품 비교와 Vessel Record 경험까지 이어지는 전환 흐름을 만든다.

## 핵심 기능

| # | 기능 | 설명 | 우선순위 |
|---|------|------|---------|
| 1 | Hero — Empty Atelier 풀블리드 | `ST3-HERO-EMPTY-ATELIER-40` 16:9 이미지 위 좌측 38-42% 카피 오버레이. Olicatessen/Niksen 참조: 서사 우선 진입 | 필수 |
| 2 | Why MORA — Founding Question Editorial | 메이커 이미지 + 에칭 패럴랙스 + 4-pillar 밸류 탭 전환 (Bearaby 참조). ARENSBAK 아코디언 철학 구조 | 필수 |
| 3 | Measured Transformation — Process Carousel | 8단계 공정을 Olicatessen식 수평 캐러셀 또는 sticky 전환으로 표현. Step 5에서 에칭 오버레이, 마지막에 거름 천 풀블리드 전환(`ST3-TRANSITION-R3-72`) | 필수 |
| 4 | Material Method — Ingredient Atlas | 6재료 탭/호버 전환 (Graza/Chartogne-Taillet 참조). 호버 시 Material Folio 20% opacity 배경 등장. 4장 R2 실험 프레임 + 6개 원재료 aerial | 필수 |
| 5 | Core Collection — Product Triptych Grid | 4제품 x 3장(정면 유리→원재료→에칭) 고정 Triptych + 사용 순간 2장(`R3-69`, `R3-70`). NON/Measured 넘버링+카테고리 태그 구조 | 필수 |
| 6 | Studio Trials — Conditional Development Card | Core와 동일 Triptych + desaturation(0.9) + 상태 뱃지 + 조건부 저녁 사용 가설(`R3-71`) | 필수 |
| 7 | Vessel Record — SEE→READ→OPEN→TASTE | 4-phase sticky scroll (Dix Hectares/SOM 참조). Phase별 이미지 crossfade + Phase 2에서 SVG draw-in + 마지막 첫 스푼 매크로(`R3-68`) | 필수 |
| 8 | Product Truth — Fact/Sense Split | 좌측 감각 카피 + 우측 사실 정보 분리 스크롤. Cabi Kaizen Log + JNPR 인증 뱃지 참조 | 필수 |
| 9 | Etching Pattern System | 섹션 간 SVG draw-in 디바이더 + Hero/Why MORA/Closing 배경 5-8% opacity 에칭 레이어 | 필수 |
| 10 | Global Nav — Minimal Record Nav | 고정 상단 네비. MORA 로고 + 4 링크(Collection/Our Method/Vessel Record/Product Truth). 스크롤 > 100px 시 배경 전환 | 필수 |
| 11 | Six-Product Comparison Matrix | 6열 매트릭스 또는 NON식 수평 레인지. 호버 시 Triptych 확장. Studio Trial은 dashed border 구분 | 선택 |
| 12 | Statement Breaker 디바이더 | 섹션 전환점에 Niksen식 풀블리드 한 줄 선언 + 배경 이미지 삽입. 거름 천 aerial 또는 에칭 활용 | 선택 |
| 13 | Moment Capsule (사용 순간 갤러리) | Niksen Walking Capsule 응용. Core/Studio Trial 사용 순간 이미지를 시간대별 카드 전환으로 구성 | 선택 |

## 대상 사용자

- **주요 사용자**: MORA 브랜드에 처음 접하는 잠재 소비자. "요거트인데 왜 이렇게 다른가"를 스크롤 한 번으로 이해시켜야 한다.
- **보조 사용자**: 유통/투자 파트너, 식품 업계 관계자. 브랜드 포지셔닝과 제품 차별화 근거를 단일 URL로 공유할 수 있어야 한다.

## 기술적 범위

### 포함

- 단일 페이지 랜딩 (8개 섹션 + Global Nav + Etching System)
- Stage 3 확정 에셋 39장 전부 사용 (R2 28장 + R3 5장 + 원재료 레퍼런스 6장)
- Stage 3 확정 카피 시스템 전체 (hero headline, brand values, product USP, CTA 등)
- 스크롤 인터랙션: GSAP ScrollTrigger + Lenis smooth scroll
- 이미지 최적화: WebP/AVIF 변환, lazy loading, responsive srcset
- SVG 애니메이션: 에칭 draw-in (GSAP DrawSVG 또는 stroke-dasharray 폴백)
- 캐러셀: Embla Carousel (경량, 접근성)
- 반응형: Mobile-first, 3 breakpoints (sm 600 / md 900 / lg 1200)
- 접근성: 시맨틱 HTML, 키보드 네비게이션, prefers-reduced-motion 대응
- 퍼포먼스: LCP < 2.5s, CLS < 0.1

### 제외

- 이커머스/장바구니/결제 기능 (CTA는 "출시 소식 받기" 또는 제품 상세 앵커로 제한)
- CMS 통합
- 다국어 지원 (한국어 단일)
- 회원가입/로그인
- 백엔드 API
- Stage 3 에셋 신규 제작 (이미 R3까지 확정)
- 실제 창립자 정보 노출 (Founder Fact Gate 미승인)

### 제약사항

- MORA 브랜드 규칙 준수: Cultured Cream `#F5F1E8` 배경, Carbon `#171714` 텍스트, 65-70% 여백, editorial etching 스타일
- 금지 어휘: `elixir`, `alchemy`, `tincture`, `spirit`
- 감각 카피와 법정 정보(사실) 분리 — Product Truth 섹션에서만 사실 정보 노출
- Founder Table (`ST3-ETCH-R2-44`) 비공개 유지
- Studio Trial 제품은 출시/승인 상태를 암시하지 않는 조건부 표현만 사용
- 모든 이미지는 "상업 촬영 방향성 시각화"이며 실제 시설/SOP/성능 증거로 사용 불가
- 타이포그래피: Pretendard(한글 본문) + 영문 eyebrow 전용 서체 (Suisse Intl 또는 시스템 대체)

## 성공 기준

- S3 확정 재료 39장이 모두 적절한 섹션에 배치되어 있다
- 8개 섹션의 독서 순서(결→측정→기록)가 스크롤 흐름으로 체감된다
- 12개 검증 레퍼런스의 핵심 패턴(sticky scroll, value tab, process carousel, hover atlas, triptych grid, 4-phase vessel, fact/sense split)이 MORA 톤으로 적용되어 있다
- 제품 비교에서 Core Collection과 Studio Trials의 출시 상태 차이가 시각적으로 즉시 구분된다
- Lighthouse 퍼포먼스 점수 90+ (Desktop), 모바일 LCP < 3s
- 브랜드 규칙 위반 0건 (금지 어휘, 미승인 사실, Founder 노출)

---

**Phase 1 작성 완료.** 승인 또는 수정 요청을 해 주시면 Phase 2(UX Flow)로 진행하겠습니다.
