# Contributing

감사합니다! 이 프로젝트에 기여해 주셔서 기쁩니다. 아래 가이드라인을 따라주시면 코드 리뷰와 병합이 더 빠르게 진행됩니다.

## 커밋 메시지 규칙

커밋 히스토리를 일관되게 유지하기 위해 아래 컨벤션을 따릅니다.

- 형식: `<type>(<scope>): <subject>`

아래 표는 `type`에 대한 상세 설명입니다. 각 타입의 사용 시점과 간단한 예시를 함께 제공합니다.

| Type     | 설명                                                      | 사용 시점                                    | 예시                                           |
| -------- | --------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| feat     | 새로운 기능 추가                                          | 사용자에게 보이는 기능을 새로 추가할 때      | `feat(chat): add ChatInput component`          |
| fix      | 버그 수정                                                 | 동작이 잘못되거나 오류를 수정할 때           | `fix(api): validate request body in /api/chat` |
| docs     | 문서 관련 변경                                            | README, 주석, 문서 업데이트만 있을 때        | `docs: update README with setup steps`         |
| style    | 코드 포맷팅·공백·세미콜론 등 스타일 변경 (로직 변경 없음) | 코드 동작에는 영향이 없고 스타일만 변경할 때 | `style: format code with prettier`             |
| refactor | 코드 리팩터링(동작 변경 없음)                             | 버그 수정/기능 추가 없이 구조 개선할 때      | `refactor(lib): extract gemini client`         |
| perf     | 성능 개선                                                 | 속도/메모리 등 성능이 향상될 때              | `perf(cache): improve response caching`        |
| test     | 테스트 추가/수정                                          | 단위/통합/e2e 테스트를 추가하거나 수정할 때  | `test(api): add unit tests for chat route`     |
| chore    | 빌드 업무/패키지 업데이트/잡무                            | 코드 변경(기능/버그/테스트)이 아닌 작업      | `chore(deps): upgrade eslint`                  |
| ci       | CI 설정 변경                                              | GitHub Actions 등 CI 설정을 변경할 때        | `ci(github): add commitlint check`             |

- 바디(선택): 필요 시 변경 이유와 구현 상세를 한두 문단으로 설명합니다.
- 푸터(선택): `BREAKING CHANGE:` 또는 이슈 번호(`#123`)를 명시합니다.

예시:

```
feat(chat): add ChatInput component for user messages

- 채팅 입력 컴포넌트 추가
- Enter 키로 전송, 빈 메시지 방지 로직 포함

Refs: #42
```

`README.md`에도 커밋 메시지 컨벤션이 요약되어 있으니 참고하세요.

### 로컬 설정 (한 번만)

1. 의존성 설치

```bash
npm install
```

2. Husky 훅 설치 (prepare 스크립트가 `package.json`에 추가되어 있습니다)

```bash
npm run prepare
# 또는
npx husky install
```

3. 훅이 정상 동작하는지 확인하려면 커밋을 시도해 보세요. 메시지가 컨벤션을 따르지 않으면 훅이 실패합니다.

### Commitizen 사용 예시

Commitizen을 통해 인터랙티브하게 커밋 메시지를 작성할 수 있습니다. 아래 예시는 일반적인 질문 흐름과 최종 생성되는 메시지 예시입니다.

1. 커밋 시작

```bash
npm run commit
# 또는
npx cz
```

2. 질문 예시(간단 요약)

- `type` 선택: feat
- `scope` 입력: chat
- `subject` 입력: add ChatInput component
- `body` 입력: Enter 키 전송과 빈 메시지 방지 로직 구현
- `footer` 입력(선택): Refs: #42

3. Commitizen이 생성하는 최종 커밋 메시지 예시

```
feat(chat): add ChatInput component

- Enter 키 전송과 빈 메시지 방지 로직 구현

Refs: #42
```

4. 훅 검증

생성된 메시지는 `.husky/commit-msg` 훅을 통해 `commitlint`로 검증됩니다. 규칙을 위반하면 커밋이 차단되므로 메시지를 수정하고 다시 시도하세요.

## 브랜치 네이밍

- 기능: `feat/<short-description>`
- 버그 픽스: `fix/<short-description>`
- 문서: `docs/<short-description>`

예: `feat/chat-add-input`, `fix/api-validate-body`

## Pull Request 템플릿(요청 시 자동화 가능)

병합 전에 PR에 아래 항목을 채워주세요.

### 제목 규칙

PR 제목도 커밋 규칙과 비슷하게 작성합니다: `type(scope): subject`

### PR 본문 템플릿

```
## 요약
- 변경 내용 한두 문장 요약

## 변경 상세
- 변경한 파일/핵심 로직 설명
- 주의할 점이나 마이그레이션 필요 여부

## 체크리스트
- [ ] 로컬에서 빌드/테스트 통과
- [ ] 커밋 메시지 규칙 준수
- [ ] 필요한 문서(README/CONTRIBUTING) 수정

## 관련 이슈
- Fixes #<issue-number> (해당 시)

```

### 리뷰 가이드라인

- 작은 단위로 PR을 보내세요. 가능하면 한 PR은 한 목적에 집중합니다.
- 변경 사항이 크면 단계별로 분할해서 설명을 추가하세요.

## 코드 스타일 / 린트

- 코드 포맷: `prettier` 사용
- ESLint 규칙을 따르세요. 로컬에서 `npm run lint`로 확인 가능합니다.

## 기여 감사

기여에 감사드리며, 질문이나 논의가 필요하면 PR에 코멘트 남겨주세요.
