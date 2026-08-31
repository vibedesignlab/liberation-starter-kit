# MORA 브랜드 랜딩페이지 — Visual Direction

## 톤앤매너

- **키워드**: Cultured Cream / Carbon Editorial / Generous Negative Space / Quiet Precision
- **설명**: Niksen의 "clothes worn for living" 감각을 식품 랜딩으로 번역한다. 크림색 배경에 거의 블랙 텍스트, 큰 이미지와 넓은 여백이 전부다. 장식 없이 재료와 결이 말한다.

## 컬러 방향

S3 브랜드 규칙에서 확정된 색상 체계를 테마 토큰으로 번역한다.

| 용도 | 현재 토큰 | 현재값 | 변경 방향 | 근거 |
|------|----------|--------|----------|------|
| Primary | `primary.main` | `#0000FF` | `#171714` (Carbon) | MORA의 유일한 강조색은 Carbon. CTA, 링크, 활성 상태 모두 Carbon |
| Primary light | `primary.light` | `#6666FF` | `#8A8780` | Carbon의 60% 밝기. 보조 텍스트, 비활성 상태 |
| Primary dark | `primary.dark` | `#0000B2` | `#0D0D0B` | Carbon보다 약간 어두운 hover 상태 |
| Primary contrast | `primary.contrastText` | `#FFFFFF` | `#F5F1E8` | Cultured Cream이 Carbon 위의 반전 텍스트 |
| Secondary | `secondary.main` | `#263238` | `#C6973B` (Amber) | 포인트 악센트. Statement Breaker 배경 오버레이, 역제안 강조 |
| Text primary | `text.primary` | `rgba(0,0,0,0.87)` | `#171714` | 불투명 Carbon으로 교체. Niksen의 거의 블랙 텍스트 |
| Text secondary | `text.secondary` | `rgba(0,0,0,0.6)` | `#8A8780` | MORA mid tone. 서브카피, 캡션, eyebrow |
| Background default | `background.default` | `#FFFFFF` | `#F5F1E8` | Cultured Cream. 전체 페이지 배경 |
| Background paper | `background.paper` | `#FFFFFF` | `#FDFCF9` | Cream보다 미세하게 밝은 카드/오버레이 배경 |
| Divider | `divider` | `rgba(0,0,0,0.12)` | `#D6D2C9` | MORA line color. 에칭 디바이더와 통일 |

## 타이포그래피 방향

Niksen 랜딩의 핵심은 **대형 타이틀 + 작은 본문**의 극단적 크기 대비다. MORA는 한글 본문(Pretendard)과 영문 eyebrow/라벨의 이중 구조를 추가한다.

| 요소 | 현재 설정 | 변경 방향 | 근거 |
|------|----------|----------|------|
| headingFontFamily | `"Outfit"` | 유지 | 영문 헤딩용. 한글은 Pretendard 자동 폴백 |
| h1 fontSize | `2.5rem` (40px) | `3.5rem` (56px) | Niksen Hero H1 크기. 풀블리드 위에서 존재감 |
| h1 fontWeight | `900` | `600` | Niksen은 semi-bold 헤딩. MORA의 "차분한 정확성"에 맞춤 |
| h1 lineHeight | `1.2` | `1.15` | 한글 2줄 시 여백 조정 |
| h1 letterSpacing | `-0.02em` | `-0.01em` | 한글에서 너무 좁으면 가독성 저하 |
| h2 fontSize | `2rem` (32px) | `2.5rem` (40px) | Statement Breaker, 섹션 헤드라인용 |
| h2 fontWeight | `900` | `600` | h1과 동일하게 semi-bold |
| h3 fontSize | `1.75rem` (28px) | `1.5rem` (24px) | 제품명, 서브섹션. 현재보다 약간 줄임 |
| h3 fontWeight | `800` | `600` | 통일 |
| body1 fontSize | `1rem` (16px) | `1.0625rem` (17px) | 넓은 여백 안에서 본문 가독성 확보 |
| body1 lineHeight | `1.6` | `1.72` | MORA 기획안 HTML에서 사용한 line-height |
| overline fontSize | `0.75rem` (12px) | `0.6875rem` (11px) | eyebrow: "MORA INFUSED GREEK YOGURT", "HERBAL / CORE 01" |
| overline letterSpacing | `0.08em` | `0.25em` | Niksen의 넓은 tracking eyebrow |
| overline fontWeight | `600` | `600` | 유지 |

## 간격 및 레이아웃

| 항목 | 현재 | 변경 방향 | 근거 |
|------|------|----------|------|
| spacing 기본 단위 | 8px | 유지 | 8px 그리드 유지 |
| 섹션 상하 패딩 | 없음 (컴포넌트별) | `spacing(16)` = 128px | Niksen의 넉넉한 섹션 간 호흡. 65-70% 여백 규칙 |
| 콘텐츠 최대 폭 | 없음 | 1100px | 레퍼런스 기획안의 `--w: 1100px` 유지 |
| Hero 카피 영역 | 없음 | 좌측 38-42% | S3 hero-empty-atelier copy-safe 규격 |
| borderRadius | 0 | 유지 | MORA의 날카로운 모서리. Niksen도 sharp |
| Statement Breaker 높이 | 없음 | 100vh 또는 60vh | Niksen 풀블리드 리듬 |
| 제품 카드 여백 | 없음 | `spacing(3)` = 24px gap | 카드 간 넉넉한 간격 |

## 레퍼런스

사용자가 제공/승인한 레퍼런스만 사용한다.

| # | 레퍼런스 | 참고 포인트 |
|---|---------|------------|
| 1 | [Estudio Niksen](https://estudioniksen.com/) | 전체 레이아웃 문법: 풀블리드 + 대형 H1 + 짧은 서사 + CTA 반복 리듬 |
| 2 | `mora-niksen-application.html` | Niksen→MORA 패턴 매핑 7가지, 응용안 N-01~N-05 |
| 3 | `mora-landing-reference-plans.html` | 12개 검증 레퍼런스, 11개 컴포넌트 기획안 |
| 4 | S3 `landing-materials.md` v5 | 8개 섹션 독서 순서, 39장 확정 에셋, 카피 시스템 |

## 승인 및 적용 계약

- **대상 theme 파일**: `src/styles/themes/default.js` (직접 수정)
- **활성 범위**: 전체 프로젝트
- **승인 효과**: Visual Direction 승인 직후 아래 표의 `apply` 행을 `default.js`에 적용
- **제외 범위**: 컴포넌트, 페이지, 레이아웃, 카피, 콘텐츠, 이미지, 에셋의 변환
- **미해결 항목**: Suisse Intl 폰트 미설치 → eyebrow 전용 서체는 `defer`. 시스템 sans-serif로 폴백

## 변경 필요 토큰 요약

| 토큰 경로 | 현재값 | 승인값 | 결정 | 대상 파일 | 활성 범위 | 근거 |
|-----------|--------|--------|------|----------|-----------|------|
| `palette.primary.main` | `#0000FF` | `#171714` | `apply` | `default.js` | 전체 | Carbon이 유일한 강조색 |
| `palette.primary.light` | `#6666FF` | `#8A8780` | `apply` | `default.js` | 전체 | Mid tone 보조 |
| `palette.primary.dark` | `#0000B2` | `#0D0D0B` | `apply` | `default.js` | 전체 | Hover 상태 |
| `palette.primary.contrastText` | `#FFFFFF` | `#F5F1E8` | `apply` | `default.js` | 전체 | Cream 반전 |
| `palette.secondary.main` | `#263238` | `#C6973B` | `apply` | `default.js` | 전체 | Amber 악센트 |
| `palette.text.primary` | `rgba(0,0,0,0.87)` | `#171714` | `apply` | `default.js` | 전체 | 불투명 Carbon |
| `palette.text.secondary` | `rgba(0,0,0,0.6)` | `#8A8780` | `apply` | `default.js` | 전체 | Mid tone |
| `palette.background.default` | `#FFFFFF` | `#F5F1E8` | `apply` | `default.js` | 전체 | Cultured Cream |
| `palette.background.paper` | `#FFFFFF` | `#FDFCF9` | `apply` | `default.js` | 전체 | 카드/오버레이 |
| `palette.divider` | `rgba(0,0,0,0.12)` | `#D6D2C9` | `apply` | `default.js` | 전체 | MORA line |
| `typography.h1.fontSize` | `2.5rem` | `3.5rem` | `apply` | `default.js` | 전체 | Niksen 대형 H1 |
| `typography.h1.fontWeight` | `900` | `600` | `apply` | `default.js` | 전체 | Semi-bold 차분함 |
| `typography.h1.lineHeight` | `1.2` | `1.15` | `apply` | `default.js` | 전체 | 한글 2줄 조정 |
| `typography.h1.letterSpacing` | `-0.02em` | `-0.01em` | `apply` | `default.js` | 전체 | 한글 가독성 |
| `typography.h2.fontSize` | `2rem` | `2.5rem` | `apply` | `default.js` | 전체 | Statement/섹션 헤드 |
| `typography.h2.fontWeight` | `900` | `600` | `apply` | `default.js` | 전체 | 통일 |
| `typography.h3.fontSize` | `1.75rem` | `1.5rem` | `apply` | `default.js` | 전체 | 제품명/서브섹션 |
| `typography.h3.fontWeight` | `800` | `600` | `apply` | `default.js` | 전체 | 통일 |
| `typography.body1.fontSize` | `1rem` | `1.0625rem` | `apply` | `default.js` | 전체 | 여백 내 가독성 |
| `typography.body1.lineHeight` | `1.6` | `1.72` | `apply` | `default.js` | 전체 | MORA 기획안 line-height |
| `typography.overline.fontSize` | `0.75rem` | `0.6875rem` | `apply` | `default.js` | 전체 | Eyebrow 크기 |
| `typography.overline.letterSpacing` | `0.08em` | `0.25em` | `apply` | `default.js` | 전체 | Niksen 넓은 tracking |
| `typography.fontFamily` | Pretendard stack | 유지 | `keep` | `default.js` | 전체 | 한글 본문 유지 |
| `typography.headingFontFamily` | `"Outfit"` | 유지 | `keep` | `default.js` | 전체 | 영문 헤딩 유지 |
| `typography.overline.fontFamily` | Pretendard stack | `"Suisse Intl"` 대기 | `defer` | `default.js` | 전체 | 폰트 미설치 |
| `shape.borderRadius` | `0` | `0` | `keep` | `default.js` | 전체 | Sharp 유지 |
| `spacing` | `8` | `8` | `keep` | `default.js` | 전체 | 8px 그리드 유지 |

## 토큰 적용 결과 (승인 후)

- 상태: `applied`
- 적용 파일: `src/styles/themes/default.js`
- 검증: 24/24 토큰 일치 확인, lint 통과

| 토큰 경로 | 승인값 | 실제값 | 결과 |
|-----------|--------|--------|------|
| `palette.primary.main` | `#171714` | `#171714` | ✅ |
| `palette.primary.light` | `#8A8780` | `#8A8780` | ✅ |
| `palette.primary.dark` | `#0D0D0B` | `#0D0D0B` | ✅ |
| `palette.primary.contrastText` | `#F5F1E8` | `#F5F1E8` | ✅ |
| `palette.secondary.main` | `#C6973B` | `#C6973B` | ✅ |
| `palette.text.primary` | `#171714` | `#171714` | ✅ |
| `palette.text.secondary` | `#8A8780` | `#8A8780` | ✅ |
| `palette.background.default` | `#F5F1E8` | `#F5F1E8` | ✅ |
| `palette.background.paper` | `#FDFCF9` | `#FDFCF9` | ✅ |
| `palette.divider` | `#D6D2C9` | `#D6D2C9` | ✅ |
| `typography.h1.fontSize` | `3.5rem` | `3.5rem` | ✅ |
| `typography.h1.fontWeight` | `600` | `600` | ✅ |
| `typography.h1.lineHeight` | `1.15` | `1.15` | ✅ |
| `typography.h1.letterSpacing` | `-0.01em` | `-0.01em` | ✅ |
| `typography.h2.fontSize` | `2.5rem` | `2.5rem` | ✅ |
| `typography.h2.fontWeight` | `600` | `600` | ✅ |
| `typography.h3.fontSize` | `1.5rem` | `1.5rem` | ✅ |
| `typography.h3.fontWeight` | `600` | `600` | ✅ |
| `typography.body1.fontSize` | `1.0625rem` | `1.0625rem` | ✅ |
| `typography.body1.lineHeight` | `1.72` | `1.72` | ✅ |
| `typography.overline.fontSize` | `0.6875rem` | `0.6875rem` | ✅ |
| `typography.overline.letterSpacing` | `0.25em` | `0.25em` | ✅ |

---

**Phase 3 작성 완료.** `docs/mora-landing-page/03-visual-direction.md`

**적용 완료.** `src/styles/themes/default.js`에 22개 `apply` 토큰 반영, 24/24 검증 통과.
