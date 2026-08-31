# MORA Stage 3 R5 — Current Asset Fit & Migration Audit

## 결론

현재 `src/data/mora/assets.js`에는 PNG 38장이 매핑되어 있고, `public/mora-assets`에도 같은 38장이 존재한다. 이 중 현재 랜딩에 실제로 마운트되는 것은 **32개 고유 래스터 / 34회 노출**이며, 6개는 데이터에만 있고 페이지에는 마운트되지 않는다.

- 크롭과 의미가 모두 안전해 현행 유지 가능한 그룹은 **원재료 항공 6장**과 아래에서 명시한 **설명용 에칭 일부**다.
- 제품 카드가 정사각 슬롯에 정확히 맞는다는 사실은 유지 근거가 아니다. 현행 제품·용기·검수·첫 스푼·사용 순간은 모두 세로형 직접 인쇄 유리를 보여 주므로, Revision 10의 **low-wide wide-mouth jar + partial Batch Record**와 충돌한다.
- 가장 심한 레이아웃 결함은 `momentMorning`과 `momentAfternoon`이다. 3:2 원본을 1:2 `cover` 슬롯에 넣어 원본 가로의 66.7%를 버리고, 제품–커피 또는 제품–책 관계를 반쪽씩 잘라낸다.
- 현재 Stage 3 canonical은 R2 Hero·Why MORA·R3 Transition을 이미 `Previous Version / not public`으로 분류하고 R4로 교체하도록 했지만, `assets.js`와 `public/mora-assets`는 여전히 R2/R3를 서비스한다.
- 더 중요한 상위 충돌은 Stage 3 canonical/registry가 여전히 `direct print only / no paper label`을 잠근 반면, Stage 2 Revision 10은 이 방향을 명시적으로 폐기하고 부분 무코팅 Batch Record를 채택했다는 점이다.

## 감사 기준과 범위

- 런타임 매핑: `src/data/mora/assets.js`
- 실제 파일: `public/mora-assets/*.png`; 치수는 macOS `sips -g pixelWidth -g pixelHeight`로 측정했다.
- 렌더 슬롯: `src/pages/MoraLandingPage.jsx`, `FullBleedSection`, `StickyProductGrid`, `ProductCard`, `VesselPhaseBlock`, `SplitEditorial`
- Stage 3 기준: `03-landing-materials/outputs/landing-materials.json`, `03-landing-materials/asset-registry.json`
- 상위 브랜드 기준: `02-extended-brand/outputs/extended-brand-anatomy.json` Revision 10
- SVG `vessel-record-spec.svg`는 이 래스터 감사에서 제외했다.

크롭률은 `object-fit: cover`의 중앙 크롭을 기준으로 계산했다. `3:2 → 1:2`는 가로 66.7%, `1:1 → 3:2`는 세로 33.3%, `4:5 → 3:2`는 세로 46.7%, `16:9 → 3:2`는 가로 15.5%가 제거된다.

## 선행 정합성 위험

| 중요도 | 불일치 | 근거와 영향 |
| --- | --- | --- |
| Blocker | Stage 2 상태 표기가 아직 승인 완료가 아니다 | Stage 2 `target.direction_status`는 `directional_open_concept_revision10_pending_review`, `stage-review.json.status`도 `pending`이다. 또한 boundary에는 “S3 must not be synchronized before S2 acceptance”가 남아 있다. R5를 승인 정본으로 등록하기 전에 상태를 실제 사용자 결정과 맞춰야 한다. |
| Blocker | Stage 3 포장 정본이 Revision 10과 반대다 | Stage 3 `vessel_record_system.print_rule`, `boundaries.protected_brand_and_product_invariants`, `message_visual_map`은 직접 인쇄와 종이 라벨 금지를 고정한다. Stage 2 Revision 10 `boundaries.factual_limits`는 이 방향을 supersede하고 partial food-native Batch Record를 현행으로 선언한다. |
| Blocker | Stage 3 registry가 구형 포장을 통과 조건으로 둔다 | R2/R3 제품·용기·컨텍스트·사용 순간 registry invariants의 `no ... paper label`과 `direct print`가 Revision 10의 부분 종이 기록을 불합격 처리한다. 새 이미지를 등록하기 전에 이 불변항을 교체해야 한다. |
| High | Canonical 선택과 런타임 매핑이 다르다 | Stage 3 canonical의 현행 Hero/Why/Transition은 R4 `73/74/75`지만 `assets.js`는 R2/R3 `40/41/72`를 가리킨다. R4도 Revision 10의 lived-in workshop 이전 방향이므로 R5에서 기계적으로 승격하면 안 된다. |
| High | 사용자에게 보이는 문구도 구형 포장을 주장한다 | `src/data/mora/content.js`의 `Instead of a label, a record on glass.`, `printed directly on glass`, `Direct print`와 `MoraLandingPage.jsx` footer의 `Direct print`가 이미지 교체 후에도 새 Batch Record 의미를 뒤집는다. 본 감사는 코드를 수정하지 않지만 R5 migration에 반드시 포함해야 한다. |
| Medium | 현행 파일은 R5 납품 해상도보다 작다 | FullBleed 1536/1672 px, square 1254/1536 px가 R5 production contract의 3072×2048, 2048² 권장 납품보다 작다. 기존 에칭은 “sharp existing source retain” 예외를 적용할 수 있으나 새 제품·무드 컷은 현행 크기를 재사용하지 않는다. |

## 현재 래스터 그룹별 판정

| 현재 그룹 / 실제 파일 | 원본 비율 → 현재 렌더 슬롯 | 크롭 심각도 | 핵심 피사체 생존 | Revision 10 의미·포장 충돌 | 판정 |
| --- | --- | --- | --- | --- | --- |
| **Hero** — `st3-hero-empty-atelier-40.png`, 1672×941 | 16:9 → 3:2 FullBleed `cover`, left-center copy | 중간: 가로 15.5% 제거 | 중앙 거름 트레이와 우측 작업대는 남지만 양 끝 재고와 좌측 카피 필드 폭이 줄어든다. | 밝고 무결점인 cream/stainless 작업실이며 여성 메이커의 선택·마지막 책임이나 lived-in urban workshop이 없다. Stage 3 canonical도 이미 Previous Version으로 분류한다. | **archive-only**; 현행 서비스는 즉시 교체 |
| **Why MORA maker** — `st3-why-mora-maker-41.png`, 1536×1024 | 3:2 → 3:2 SplitEditorial `cover` | 없음 | 메이커, 양손, 세 그릇 모두 생존 | 세 상태 비교는 읽히지만 pristine boutique-workshop이고, Revision 10의 한 번의 실제 선택·제외·중단·기록 권한과 lived-in 공간을 충분히 보여 주지 않는다. Stage 3 canonical도 Previous Version으로 분류한다. | **archive-only**; R16 Selection 계열로 교체 |
| **Narrative etchings** — `42`, `43`, `45`, 각 1536×1024 | `42`·`45`: intrinsic 3:2, `43`: 3:2 SplitEditorial | 없음 | 세 장 모두 전체 드로잉 생존 | 포장 충돌은 없다. `42`와 `45`는 공정 인과 설명으로 유효하다. `43`은 현재 카피의 topping / total mix / one fold 세 상태 비교를 실제로 보여 주지 못한다. 에칭은 실제 SOP 증거가 아니라 방향성 주석이어야 한다. | **retain:** `42`, `45`; **replace-now/재배치:** `43` |
| **Material folio etchings** — `46`–`51`, 각 1254×1254 | 1:1 → 1:1 SplitEditorial `cover` | 없음 | 전체 드로잉과 여백 생존 | 포장 충돌은 없고 재료→중간재→fold의 인과는 남는다. 다만 recipe·도구는 검증된 SOP가 아니다. `47 Fig Leaf`는 edible suitability 승인 전 공개 공정으로 읽히면 안 된다. | **retain as small directional annotation:** `46`, `48`, `49`, `50`, `51`; **archive-only/public hold:** `47` until safety gate |
| **Material Method** — `52` 1672×941, `53` 1448×1086, `54` 1672×941, `55` 1448×1086 | 활성 `52`: 16:9 → 3:2 FullBleed; `53` 4:3, `54` 16:9, `55` 4:3은 현재 미마운트 | 활성 `52` 중간: 가로 15.5%; 나머지 N/A | `52` 우측 도구군은 대체로 남지만 끝 물체는 위험. 미마운트 3장은 N/A | 밝고 지나치게 정돈된 표본대이며 여성 메이커의 판단 행동, lived-in food workshop, 실제 기록 인과가 없다. `53`–`55`는 코드에 있어도 사용자에게 보이지 않는다. | **replace-now:** 활성 `52`; **archive-only:** 미마운트 `53`–`55` |
| **Vessel** — `56`–`58`, 각 1254×1254 | 활성 `56`,`57`: 1:1 → 3:2 Vessel FullBleed; `58` 미마운트 | 활성 두 장 높음: 세로 33.3%; `58` N/A | `56` 병은 남지만 상하 안전 여백이 사라진다. `57`은 하단 캡·foil·스푼과 상단 입구가 동시에 위험하다. | 투명 유리라는 재료만 이어진다. 실제 형상은 높고 좁으며, `56/57`은 직접 인쇄와 허구 `BATCH / 24A01`을 사용한다. Revision 10의 low-wide jar, partial Batch Record, 실제 값 gate와 모두 충돌한다. | **replace-now:** `56`,`57`; **archive-only:** `58` |
| **Product fronts** — `59`–`64`, 각 1254×1254 | 1:1 → 1:1 ProductCard | 없음 | jar 전체, 내용물 trace, 그림자 생존 | 여섯 장 모두 직접 인쇄·세로형 jar·종이 기록 부재다. 새 시스템의 60–70% edible witness, 부분 Batch Record, 실제 maker check를 설명하지 못한다. `Fig Leaf`와 `Olive Oil & Sea Salt`의 조건부 상태도 이미지 자체에는 없다. | **replace-now** six-up; 구형 여섯 장은 교체 후 archive-only |
| **Glass context** — `65` 1536×1024 활성, `66` 1536×1024·`67` 1535×1024 미마운트 | 활성 `65`: 3:2 → 3:2 Vessel READ; `66`,`67`: N/A | 활성 없음; 나머지 N/A | `65`의 여성·양손·jar는 생존하며 bottom-left overlay도 핵심 jar와 크게 겹치지 않는다. | 메이커는 있으나 직접 인쇄 세로형 jar를 검사하고, 부분 Batch Record의 genuine final check를 하지 않는다. 공간도 lived-in 판단 장면이 아니라 clean production tableau다. | **replace-now:** `65`; **archive-only:** `66`,`67` until R10-native reauthoring |
| **Ingredient aerials** — `19`–`24`, 각 1536×1536 | 1:1 → 1:1 IngredientFolioPair | 없음 | 접시와 재료 전부 생존; 가장자리 여백 충분 | 제품 포장 충돌이 없고, raw ingredient proof가 mood/product proof와 분리된다. 단 `Fig Leaf`는 식용 승인 증거가 아니며, 여섯 장 모두 원산지·효능·품질 증명이 아니다. 1536²는 R5 신규 납품 권장보다 작지만 현행 UI에서는 ratio/subject fit이 좋다. | **retain**; `Fig Leaf`는 conditional copy gate 유지 |
| **First-spoon detail** — `68`, 1120×1400 | 4:5 → 3:2 Vessel TASTE FullBleed | 매우 높음: 세로 46.7% 제거 | 위 손·스푼과 아래 jar/base를 함께 보존할 수 없어 행동 증거가 깨진다. | 직접 인쇄 세로형 jar이며 부분 Batch Record가 없다. 현행 해상도도 FullBleed에 부족하다. | **replace-now**, old master archive-only |
| **Use moments** — `69`–`71`, 각 1536×1024 | `69`,`70`: 3:2 → 1:2 sticky; `71`: 3:2 → 3:2 FullBleed | `69`,`70` 치명적: 가로 66.7%; `71` 없음 | `69`는 jar와 coffee, `70`은 book과 jar가 각각 반쪽으로 잘려 관계가 생존하지 않는다. `71`의 bread–jar 관계는 생존한다. | 세 장 모두 직접 인쇄 세로형 jar와 깨끗한 lifestyle 미감이다. `71`은 Studio Trial임을 주변 카피에 의존한다. | **replace-now** all three; `69`,`70`은 native 1:2 필수 |
| **Straining transition** — `72`, 1672×941 | 16:9 → 3:2 FullBleed `cover`, center overlay | 중간: 가로 15.5% 제거 | 중앙 cloth/yogurt body는 남지만 외곽 기구가 잘리고 중앙 카피가 핵심 food state를 덮는다. | 식품 공정 자체는 유효하지만 밝고 정돈된 R3 톤이며 R10의 analog process mood와 다르다. Stage 3 canonical도 이미 Previous Version으로 분류한다. | **archive-only**; dedicated 3:2 center-copy-safe process transition 필요 |

## 미마운트 6장

아래 파일은 `assets.js`와 `public/mora-assets`에는 있지만 현재 `MoraLandingPage`에서 렌더되지 않는다. 따라서 현재 slot ratio와 crop은 `N/A`다.

| 키 | 파일 | 치수 / 비율 | 처리 |
| --- | --- | --- | --- |
| `methodIngredientAtlas` | `st3-method-r2-53.png` | 1448×1086 / 4:3 | archive-only |
| `methodInfusionLadder` | `st3-method-r2-54.png` | 1672×941 / 16:9 | archive-only |
| `methodFoldTrace` | `st3-method-r2-55.png` | 1448×1086 / 4:3 | archive-only |
| `vesselClosureProof` | `st3-vessel-glass-r2-58.png` | 1254×1254 / 1:1 | archive-only; old vessel |
| `inspectionSide` | `st3-glass-context-r2-66.png` | 1536×1024 / 3:2 | archive-only; old direct-print vessel |
| `customerPeelSpoon` | `st3-glass-context-r2-67.png` | 1535×1024 / 약 3:2 | archive-only; old direct-print vessel |

## 기존 에칭 유지 범위

### 그대로 유지 가능한 에칭

- `ST3-ETCH-R2-42` Brand Trace: 실제 SOP가 아닌 작은 공정 인과 주석으로만 유지.
- `ST3-ETCH-R2-45` Cloth to Body: 천, 농축된 몸, 분리된 유청의 물리 관계가 Revision 10과 직접 맞는다.
- `ST3-ETCH-R2-46` Thyme Honey, `48` Roasted Buckwheat, `49` Citrus Peel, `50` Black Sesame, `51` Olive Oil & Sea Salt: 각 recipe의 **directional preparation annotation**으로 유지하되, 검증된 recipe·공정·효능 증거라고 캡션하지 않는다. `51`은 Studio Trial 조건을 항상 함께 표시한다.

### 유지하면 안 되는 현재 역할

- `ST3-ETCH-R2-43` First Furrow: 현재 Why MORA 문장의 세 상태 비교를 실제로 보여 주지 않는다. 다른 일반 공정 주석으로 재배치하지 않는다면 archive-only다.
- `ST3-ETCH-R2-47` Fig Leaf: species, edible part, latex/furanocoumarin, preparation, safety, jurisdiction 검토 전에는 공개 제조 경로로 사용하지 않는다.

어떤 에칭도 여성 메이커·실제 시설·실제 SOP·실제 배치의 사진 증거를 대신할 수 없으며, 제품·무드 풀블리드로 확대하지 않는다.

## Active R5 migration list

1. **승인/정본 gate를 먼저 정리한다.** Stage 2 `pending` 상태와 “acceptance 전 S3 sync 금지” boundary를 실제 사용자 결정과 맞춘 뒤, Stage 3의 direct-print-only canonical·registry invariants를 partial Batch Record 방향으로 교체한다.
2. **구형 공개 Hero/Why/Transition 매핑을 제거한다.** R2 `40/41`과 R3 `72`는 현 Stage 3 canonical에서도 archive다. R4 `73/74/75`는 임시 승격하지 말고 Revision 10 lived-in world를 기준으로 3:2 슬롯별 후보를 정한다.
3. **R16 아날로그 스토리를 슬롯별 출발점으로 쓴다.** `r16-03-last-measure-analog-editorial-front.png`는 Hero/Final Record, `r16-01-selection-analog-editorial-front.png`는 Why MORA, `r16-02-process-analog-editorial-side.png`는 Method의 의미 기준 후보다. 모두 1536×1024이므로 R5 고해상도 납품과 overlay-safe 영역은 별도 확인이 필요하며, 같은 파일을 서로 다른 비율 슬롯에 재사용하지 않는다.
4. **제품 카드 6장을 새 포장 정본으로 교체한다.** native 1:1, 동일 strict-front geometry, low-wide wide-mouth, 60–70% visible food, partial Batch Record, SKU별 실제 trace를 고정한다. Stage 2 R10 product hero는 identity reference일 뿐 3:2 dark frame을 square product proof로 잘라 쓰지 않는다. `r18-07`은 square 후보지만 실제 1254²이고 label field 완전성/가독성 검증 전 최종본으로 등록하지 않는다.
5. **Vessel SEE/READ/OPEN/TASTE 4장을 각각 native 3:2로 제작한다.** 닫힌 wide-mouth jar, 부분 Batch Record 읽기와 genuine check, 실제 seal/opening, 첫 spoon을 분리한다. 기존 `56/57/65/68`은 crop 또는 포장 의미 중 하나 이상에서 실패한다.
6. **Sticky main 2장을 전용 1:2로 제작한다.** `momentMorning`과 `momentAfternoon`의 가로 center-crop 재사용을 금지하고, 완전한 jar·행동·테이블 접점을 중앙 68% 폭에 넣는다. partial Batch Record와 제품명은 작은 화면에서도 식별돼야 한다.
7. **Evening 3:2를 다시 제작한다.** 현행 `71`의 슬롯 적합성은 좋지만 구형 포장 때문에 교체한다. Olive Oil & Sea Salt는 모든 캡션과 이미지 메타데이터에서 conditional Studio Trial로 남긴다.
8. **원재료 항공 6장은 우선 유지한다.** 현행 1:1 composition과 피사체 안전 여백은 페이지에 맞는다. 신규 2048²+ 납품이 필요할 때만 동일한 factual-color/true-aerial 역할로 승격하며, Fig Leaf의 안전 gate를 유지한다.
9. **에칭은 위 유지 목록만 재사용한다.** `42`, `45`, `46`, `48`, `49`, `50`, `51`은 작은 설명 주석으로 남기고, `43`은 현 역할에서 교체, `47`은 public hold한다.
10. **미마운트 6장과 교체된 R2/R3 사진은 archive-only로 정리한다.** `assets.js`에 남겨 둘 이유가 없다면 후속 코드 변경에서 active mapping과 archive provenance를 분리하되, 본 감사에서는 파일·코드·registry를 수정하지 않는다.

## 최종 retain / replace-now / archive-only 요약

- **retain:** ingredient aerials `19`–`24`; etchings `42`, `45`, `46`, `48`, `49`, `50`, `51`의 제한된 설명 역할.
- **replace-now:** 활성 Hero, Why MORA, Method `52`, Vessel `56/57/65/68`, products `59`–`64`, moments `69`–`71`, etching `43`의 현재 역할.
- **archive-only:** current `40/41/72`, 미마운트 `53/54/55/58/66/67`, Fig Leaf etching `47` until safety approval, 그리고 모든 교체 완료된 direct-print product/vessel/context master.
