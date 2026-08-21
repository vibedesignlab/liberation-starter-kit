# Aside CLI Setup and Recovery Spec

이 문서는 저장소를 clone한 사용자가 자신의 Aside 환경만 연결해 `$analyze-site-design-with-aside`를 실행할 수 있도록 하는 온보딩 계약이다. 안내 문구는 사용자의 언어에 맞추되, 아래 판정과 권한 경계는 유지한다.

호출 주체는 현재 프로젝트를 연 Codex다. Codex가 프로젝트 로컬 스킬을 읽고 사용자의 `aside` CLI를 실행한다. Aside CLI 자체가 `.agents/skills`를 자동 탐색한다고 가정하지 않는다.

공식 문서 기준 확인일: 2026-08-21

## 책임 경계

| 단계 | 담당 | 완료 조건 |
|---|---|---|
| 저장소 clone | 사용자 | 프로젝트 파일을 로컬에서 열 수 있음 |
| Aside Browser 설치·개인 계정 준비 | 사용자 | Aside를 열고 본인 계정으로 로그인할 수 있음 |
| Aside CLI 설치 | 스킬 안내·사용자 승인 | `aside` 실행 파일이 `PATH`에서 발견됨 |
| 환경 검증 | 스킬 | OS, CLI, 계정 상태 필수 검사를 통과함 |
| 사이트 분석 | 스킬 + 로컬 Aside | 허용된 URL 범위에서 증거를 수집하고 결과를 반환함 |

스킬은 설치 명령을 제안하고 사용자가 승인하면 실행할 수 있다. 계정 생성, 로그인, MFA, CAPTCHA, 비밀번호 저장, 모델 공급자 연결과 권한 승인은 사용자가 Aside 화면에서 직접 처리한다.

## 필수 요구사항

- macOS 15.0 이상. Aside 공식 시작 가이드가 명시한 현재 지원 범위다.
- Aside Browser와 사용자의 Aside 계정.
- `aside` CLI가 현재 셸의 `PATH`에 설치되어 있어야 한다.
- `aside account status`가 사용할 계정을 정상적으로 확인해야 한다.
- 분석 대상이 비공개라면 사용자가 Aside Browser에서 해당 사이트에 로그인해야 한다.
- Aside에 사용 가능한 모델이 설정되어 있어야 한다. Aside 플랜 모델, 지원 구독 또는 사용자 API 공급자 중 하나를 사용할 수 있다.
- 대상 사이트와 산출물 폴더에 필요한 Aside 권한을 사용자가 승인해야 한다.

저장소는 Aside 앱, CLI 바이너리, 계정, 쿠키, 토큰, API 키 또는 브라우저 프로필을 포함하지 않는다.

## 설치와 검증

공식 CLI 설치 명령:

```bash
curl -fsSL https://releases.aside.com/install.sh | bash
```

원격 설치 스크립트이므로 에이전트는 실행 직전에 명령과 출처를 보여주고 사용자 승인을 받아야 한다. 사용자는 Aside의 Developer settings에서도 CLI를 설치·업데이트·재설치할 수 있다.

설치 후 새 셸을 열거나 `PATH`를 새로 고친 다음 다음 검사를 실행한다.

```bash
pnpm aside:check
aside account list
aside account status
```

여러 계정이 있으면 사용자가 기본 계정을 선택한다.

```bash
aside account use <account-id>
```

한 번의 분석만 특정 계정으로 실행하려면 `--account <account-id>`를 사용한다.

## 상태별 사용자 가이드

### `unsupported-platform`

증상: macOS가 아니거나 macOS 15 미만이다.

조치: 자동 설치와 Aside 실행을 중단한다. 현재 공식 지원 환경을 안내하고, 사용자가 원할 때만 정적 파일 분석 같은 별도 경로를 제안한다. 다른 브라우저 자동화 도구를 임의로 실행하지 않는다.

### `browser-not-found`

증상: 표준 Applications 경로에서 Aside 앱을 찾지 못했지만 CLI 상태는 아직 확정되지 않았다.

조치: 사용자가 Aside를 비표준 위치에 설치했는지 확인한다. CLI와 계정 검사가 통과하면 경고로만 취급할 수 있다. 둘도 실패하면 공식 다운로드에서 Aside Browser를 설치하고 로그인하도록 안내한다.

### `os-version-unknown`

증상: macOS는 감지했지만 정확한 시스템 버전을 확인하지 못했다.

조치: 자동 설치와 분석을 보류하고 `sw_vers -productVersion`을 사용자가 직접 확인하게 한다. macOS 15.0 이상임이 확인된 뒤 preflight를 다시 실행한다.

### `cli-not-found`

증상: `aside` 명령이 `PATH`에 없다.

조치: 공식 설치 명령을 제시하고 실행 승인을 요청한다. 승인 전에는 설치하지 않는다. 사용자가 Aside Developer settings를 통한 설치를 선택해도 된다.

### `cli-version-unknown`

증상: CLI는 존재하지만 버전 문자열을 읽을 수 없다.

조치: `aside account status`가 통과하면 경고로 기록하고 계속할 수 있다. 계정 검사도 실패하면 Aside Developer settings에서 CLI를 업데이트하거나 재설치하도록 안내한다. Aside가 별도 최소 CLI 버전을 공개하지 않는 동안 임의의 버전 하한을 만들지 않는다.

### `cli-update-available`

증상: 분석 실행 시 Aside가 현재 CLI보다 새로운 버전을 사용할 수 있다고 알린다.

조치: 현재 버전과 제안된 버전을 사용자에게 알린다. 현재 실행이 정상이라면 분석은 계속할 수 있지만 결과에 경고를 남긴다. 업데이트가 필요하면 별도 승인을 받은 뒤에만 `aside --update`를 실행하고 preflight를 다시 수행한다.

### `account-unavailable`

증상: `aside account status`가 실패하거나 signed-out 상태를 보고한다.

조치: `aside account list`로 로컬 계정을 확인한다. Aside의 `Settings > Account`에서 로그인하거나 `aside account use <account-id>`로 정상 계정을 선택하게 한다. 계정 문제를 우회하기 위해 토큰이나 인증 파일을 읽지 않는다.

### `model-unavailable`

증상: 계정은 연결되었지만 실행할 모델 공급자가 없다.

조치: Aside의 `Settings > Models`에서 Aside 플랜 모델, 지원 구독 또는 사용자 API 공급자를 사용자가 직접 연결하게 한다. 키 값을 터미널 출력이나 프로젝트 파일로 요청하지 않는다.

### `site-auth-required`

증상: 대상 페이지가 로그인, MFA, passkey, CAPTCHA 또는 본인 확인을 요구한다.

조치: 작업을 멈추고 사용자가 Aside 화면에서 가시적인 단계를 완료하도록 안내한다. 완료 후 동일 세션을 재개한다. 인증값을 에이전트에게 붙여넣도록 요청하지 않는다.

### `permission-denied`

증상: Aside의 브라우징, 도구 또는 파일 권한이 분석을 차단한다.

조치: 필요한 URL·폴더·도구 범위를 설명하고 사용자가 Aside 설정에서 최소 권한만 승인하게 한다. 단순 디자인 분석은 읽기 전용을 기본으로 유지한다.

### `task-stalled-or-waiting`

증상: Aside 작업이 승인, 답변 또는 브라우저 이벤트를 기다린다.

조치: Aside 작업 화면의 요청을 사용자에게 정확히 전달한다. 승인·거절·응답 후 재개하고, 같은 실패를 무한 재시도하지 않는다.

## 준비 완료 판정

다음 조건을 모두 만족하면 분석을 시작할 수 있다.

- 지원 OS 검사 통과
- `aside` CLI 발견
- `aside account status` 성공 및 signed-out 신호 없음
- 비공개 사이트에 필요한 사용자 로그인 완료
- 요청한 증거를 저장할 권한과 위치 확인

표준 앱 경로 또는 CLI 버전 문자열을 확인하지 못한 것은 나머지 필수 검사가 통과하면 경고일 수 있다.

## 공식 참조

- 시작 요구사항: https://docs.aside.com/help/get-started
- CLI, MCP, REPL: https://docs.aside.com/help/developers
- 권한 설정: https://docs.aside.com/help/security
- 문제 해결: https://docs.aside.com/help/troubleshooting
- AI 공급자: https://docs.aside.com/help/ai
