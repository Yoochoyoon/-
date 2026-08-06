# 집중표적게임 진행 화면 디자인 가이드

## 1. 디자인 콘셉트

> **느와르 사건기록실 스타일**

집중표적게임의 공용 진행 화면은 고전 마피아 조직의 비밀 사건 기록실과 현대적인 게임 UI를 결합한 방향으로 디자인한다.

화면을 보는 플레이어는 다음과 같은 느낌을 받아야 한다.

- 조직의 비밀 문서를 열람하는 느낌
- 누군가가 수배되고 추적되는 느낌
- 보스의 생존 여부가 모두의 관심사인 느낌
- 밤마다 새로운 사건 보고서가 갱신되는 느낌
- 친구들과 함께 즐기지만 분위기는 긴장감 있는 느낌

핵심 문장:

> **공용 TV는 마피아 조직의 사건 기록판이고, 개인 앱은 조직원이 받은 기밀 지령서다.**

---

## 2. 레퍼런스 방향

### 마피아42

- 역할 중심의 캐릭터성과 조직극 분위기
- 역할별 상징 아이콘
- 비공개 정보와 심리전
- 밤과 낮의 분위기 차이

### 어몽어스

- 생존·사망 상태의 직관적인 표시
- 플레이어 식별의 쉬운 구조
- 짧고 빠른 행동 흐름
- 복잡하지 않은 정보 전달

### 구스구스덕

- 역할별 목표 차이
- 능력에 따른 정보 비대칭
- 캐주얼한 접근성
- 역할별 행동의 시각적 구분

### 뱅

- 카드형 행동 구조
- 공격·방어·회복의 즉각적인 상징성
- 선택 행동의 손맛
- 캐릭터와 장비의 개성

### 집중표적게임의 차별화

위 게임들의 장점을 참고하되, 전체적인 외형은 다음 방향으로 통일한다.

```text
게임성   = 어몽어스 + 구스구스덕
역할극   = 마피아42
행동구조 = 뱅
비주얼   = 고전 마피아 조직 느와르
```

---

## 3. 무드보드

### 주요 키워드

- 1930~50년대 마피아 조직
- 비밀 조직의 내부 문서
- 낡은 수배 전단
- 검은 정장과 중절모
- 타자기로 작성한 보고서
- 붉은 도장과 잉크
- 총알 자국
- 담배 연기
- 어두운 재즈 바
- 낡은 목재 책상
- 금속 서류함
- 피로 얼룩진 사건 기록

### 질감

- 누렇게 변색된 종이
- 검은 가죽 또는 금속 서류철
- 짙은 월넛 목재
- 오래된 타자기 잉크
- 황동 모서리와 금속 태그
- 붉은 원형 도장
- 종이 클립과 검은 테이프
- 희미한 담배 연기
- 낡은 문서의 접힌 자국

피와 폭력은 직접적인 고어 표현보다 **붉은 도장, 잉크, 수배 표시, HP 감소 상태**를 표현하는 시각 언어로 사용한다.

---

## 4. 컬러 시스템

| 용도 | 색상 방향 | 사용처 |
|---|---|---|
| 배경 | 흑갈색·차콜 블랙 | 전체 화면, 외곽 영역 |
| 기본 패널 | 짙은 회색·월넛 브라운 | 사건 파일, 플레이어 카드 |
| 문서 카드 | 오래된 아이보리 | 보스 파일, 보고서, 안내 영역 |
| 보스 강조 | 묵직한 금색·황동색 | 보스 HP, 조직 인장, 중심 요소 |
| 공격·위험 | 암적색·다크 크림슨 | 공격, 수배, 위험, 타겟 표시 |
| 방어 | 탁한 청록색 | 방어 성공, 보호 상태 |
| 투표·의심 | 누런 황색 | 투표, 의심, 주의 상태 |
| 사망 | 저채도 회색 | 사망자 카드, 비활성 상태 |
| 본문 | 밝은 아이보리 | 일반 텍스트 |

### 사용 원칙

- 역할 색상보다 **상태 색상**을 우선한다.
- 공용 TV에서는 개인 역할을 색상으로 추측할 수 없도록 한다.
- 암적색은 중요한 사건에만 사용한다.
- 장식보다 가독성을 우선한다.
- 배경은 어둡게, 정보 패널은 밝게 대비시킨다.

---

## 5. 진행 화면의 역할

공용 TV 화면은 플레이어가 직접 조작하는 화면이 아니라 **게임쇼의 무대이자 사건 결과를 공개하는 화면**이다.

### 공용 TV가 보여줘야 하는 정보

- 현재 라운드
- 현재 페이즈
- 남은 시간
- 보스의 HP
- 플레이어 생존 여부
- 밤 공격 결과
- 투표 결과
- 사망자
- 지명 수배 대상
- 게임 종료 결과

### 공용 TV가 보여주면 안 되는 정보

- 개인 역할
- 개인 HP
- 개인 능력 사용 여부
- 스파이 팀 정보
- 배신자의 정체
- 투표자의 선택 과정
- 공격자의 확정 정체

### 플랫폼 역할 분리

```text
공용 TV   = 전체 상황과 결과를 보여주는 사건 기록판
개인 앱   = 비공개 정보와 행동을 선택하는 기밀 지령서
진행자 UI  = 게임을 통제하고 예외 상황을 처리하는 관리 화면
```

---

## 6. 화면 정보 구조

```text
┌────────────────────────────────┐
│  CONFIDENTIAL CASE FILE         │
│  집중표적게임 · ROUND 2 · NIGHT  │
│                         01:24   │
├────────────────┬───────────────┤
│                │               │
│   보스 사건파일  │   생존자 명단  │
│                │               │
│  [보스 초상화]   │  플레이어 01   │
│  HP 4 / 5       │  플레이어 02   │
│  집중표적        │  플레이어 03   │
│                │  플레이어 04   │
│  수배 중         │  플레이어 05   │
│                │  플레이어 06   │
├────────────────┴───────────────┤
│  NIGHT REPORT                  │
│  방어 / 공격 / 회복 처리 중      │
│  [RED STAMP] TARGET MARKED     │
└────────────────────────────────┘
```

### 화면 우선순위

1. 현재 페이즈
2. 남은 시간
3. 보스 HP
4. 플레이어 생존 상태
5. 현재 표적
6. 밤 행동 처리 상태
7. 장식과 분위기 요소

---

## 7. 진행 화면 구성 요소

### 7.1 상단 헤더

표시 내용:

- 게임명: `집중표적게임`
- 문서 라벨: `CONFIDENTIAL CASE FILE`
- 라운드: `ROUND 2`
- 페이즈: `NIGHT`
- 타이머: `01:24`

상단 헤더는 사건 파일의 문서 머리말처럼 보이게 한다. 타이머는 화면에서 가장 빠르게 인식되어야 하는 요소 중 하나이므로 큰 글씨로 표시한다.

### 7.2 보스 사건 파일

보스는 공개된 게임의 중심 인물이므로 화면 왼쪽에 크게 배치한다.

표시 내용:

- 보스 실루엣 또는 초상화
- `보스`
- `HP 4 / 5`
- HP 바
- 조직 인장
- 현재 상태: `집중표적`, `수배 중`, `위기`

보스가 피해를 받을수록 카드의 분위기를 변화시킨다.

| HP | 상태 표현 |
|---|---|
| 5~4 | 안정적인 문서 카드, 금색 인장 |
| 3 | 경고 도장, 약한 붉은 테두리 |
| 2 | 강한 붉은 테두리, 위기 라벨 |
| 1 | 깜빡이는 수배 도장, 긴급 상태 |
| 0 | 사건 종료 문서와 승리 연출 |

### 7.3 플레이어 수배 파일

8명의 플레이어는 작은 수배 전단 또는 조사 카드로 표시한다.

표시 내용:

- 플레이어 번호 또는 닉네임
- 생존 상태
- 의심·표적 상태
- 사망 여부
- 선택 가능 여부

상태 표현:

- 생존: 선명한 아이보리 카드
- 표적: 붉은 원형 도장과 암적색 테두리
- 사망: 저채도 회색, 검은 테이프, `사망` 라벨
- 비활성: 어두운 회색과 낮은 대비

### 7.4 사건 보고서 패널

하단 패널은 타자기로 작성된 밤 행동 처리 보고서처럼 구성한다.

기본 문구:

```text
밤 행동을 처리하고 있습니다...
```

처리 순서:

```text
방어 / 보호 → 공격 → 회복
```

상태별 문구 예시:

- `방어 작전을 확인하는 중...`
- `밤 공격 결과를 집계하는 중...`
- `회복 및 부가 효과를 적용하는 중...`
- `사건 결과를 공개할 준비가 되었습니다.`

### 7.5 수배 도장

수배 도장은 화면의 핵심 사건을 강조하는 장치다.

사용 문구:

- `집중표적`
- `수배 대상`
- `TARGET MARKED`
- `CONFIRMED`
- `DECEASED`
- `PROTECTED`

도장은 모든 곳에 사용하지 않고, 실제로 중요한 상태 변화가 있을 때만 사용한다.

---

## 8. 페이즈별 분위기

### 밤

- 가장 어두운 배경
- 암적색과 검은색 중심
- 타이머 강조
- 사건 파일과 보고서 중심
- 희미한 담배 연기와 그림자
- 긴장감 있는 낮은 채도의 조명

밤 화면의 핵심 문구:

```text
ROUND 2 · NIGHT
밤 행동을 처리하고 있습니다...
```

### 낮 결과 공개

- 아이보리 문서가 펼쳐지는 연출
- 결과를 순차적으로 공개
- 사망자와 피해 결과를 구분
- 보스 HP 변화 강조
- 붉은 도장과 판결문 스타일 사용

### 토론

- 배경을 조금 밝게 전환
- 플레이어 카드의 식별성 강화
- 장식 요소와 연기 효과 최소화
- 생존자 목록과 직전 사건 결과를 중심으로 표시

### 투표

- 판결문 또는 조직 내부 처분 문서 느낌
- 후보자 카드에 의심 도장
- 투표 결과를 봉인된 문서처럼 공개
- 최다 득표자를 붉은 선으로 강조

---

## 9. 개인 화면 방향

개인 화면은 **조직원이 받은 기밀 지령서**처럼 디자인한다.

상단 문구 예시:

```text
TOP SECRET
이 문서는 당신만 열람할 수 있습니다.
```

개인 화면의 구성:

- 내 역할
- 개인 HP
- 역할별 승리 목표
- 현재 페이즈
- 행동 선택 카드
- 대상 선택 목록
- 행동 확정 버튼
- 역할 설명 접이식 패널

행동 카드는 일반적인 웹 버튼이 아니라 지령 카드처럼 표현한다.

```text
┌────────────────────┐
│      기본 공격      │
│       🔫           │
│  대상 1명을 지목한다 │
│       [선택]        │
└────────────────────┘
```

```text
┌────────────────────┐
│      육탄 방어      │
│       🛡           │
│  보스의 피해를 막는다 │
│       [선택]        │
└────────────────────┘
```

선택된 대상에는 붉은 원형 도장을 사용하고, 선택이 끝난 뒤에는 `지령 실행` 또는 `행동 확정` 버튼을 제공한다.

---

## 10. 역할별 상징

### 보스

- 금색 왕관
- 권총
- 과녁
- 조직 인장
- 금색 시가 케이스

문구:

```text
WANTED
조직의 수장
```

### 경호원

- 방패
- 검은 정장 옷깃
- 방탄조끼
- 깨진 총알
- 경호 계약서

문구:

```text
PROTECT AT ALL COSTS
보스를 반드시 생존시켜라
```

### 스파이

- 봉인된 편지
- 눈 모양
- 소음기
- 가려진 얼굴
- 보라색 잉크

문구:

```text
OPERATION: ASSASSINATION
표적을 제거하라
```

### 배신자

- 웃는 가면
- 뒤집힌 카드
- 피 묻은 장갑
- 깨진 조직 인장
- 검붉은 초상화

문구:

```text
NO ALLIES
마지막까지 살아남아라
```

---

## 11. 타이포그래피

### 제목과 영문

- 클래식 세리프체
- 오래된 신문 헤드라인 느낌
- 타자기체
- 굵은 사건 문서 라벨

### 본문과 상태값

- 모바일과 TV에서 읽기 쉬운 고딕체
- 숫자와 HP는 굵은 고딕체
- 도장 문구는 손글씨 또는 거친 고무도장 느낌

기본 원칙:

```text
제목       = 분위기 형성
본문       = 가독성 확보
상태값     = 빠른 인식
도장 문구  = 사건 강조
```

---

## 12. 이미지 생성 프롬프트

```text
A high-fidelity 16:9 public TV game progress screen UI for an original Korean social deduction party game called “집중표적게임”.

Visual direction: classic mafia noir organization, vintage crime investigation room, old confidential case files, dark wooden desk, aged yellow paper, black suits, fedora silhouettes, brass details, red ink stamps, red target marks, subtle bullet holes, cigarette smoke atmosphere, dramatic low-key lighting. The design should feel like a secret mafia organization’s case board rather than a futuristic sci-fi dashboard.

The screen must clearly communicate the current game state and be highly readable from a distance.

Main composition:
- Top header: “집중표적게임”, “ROUND 2 · NIGHT”, and a large countdown timer “01:24”
- Center-left: a large confidential boss case file titled “보스”, with a noir-style silhouette portrait, gold organization emblem, HP indicator “HP 4 / 5”, and a red stamped label “집중표적”
- Center-right: an organized list of eight players displayed as vintage wanted posters or investigation cards
- Player labels: “플레이어 1”, “플레이어 2”, “플레이어 3”, “플레이어 4”, “플레이어 5”, “플레이어 6”, “플레이어 7”, “플레이어 8”
- Clearly distinguish alive players, dead players, and the currently targeted player
- One player card should have a bold red circular target stamp and the label “수배 대상”
- One dead player card should be desaturated, covered with a black strip, and labeled “사망”
- Bottom event log panel styled like a typewritten police report, with the text “밤 행동을 처리하고 있습니다...”
- A clear phase order indicator at the bottom: “방어 / 보호 → 공격 → 회복”
- Add a small red notification stamp reading “TARGET MARKED”
- Use large typography, strong contrast, simple card shapes, generous spacing, and clear visual hierarchy
- The boss HP, timer, current phase, target status, and player survival status must be immediately understandable

UI style:
- aged paper cards, black metal frames, dark walnut wood texture, brass corners, red wax seals, typewriter labels
- charcoal black, deep brown, ivory paper, muted gold, dark crimson red, desaturated teal
- vintage crime dossier mixed with modern clean game UI
- polished professional game interface, suitable for a large TV display
- cinematic but functional, atmospheric but not cluttered
- no realistic gore, no excessive blood, no overly dense decoration

Important:
- This is a functional game UI mockup, not a movie poster
- Keep all UI panels and information clearly visible
- Korean text must be correctly spelled, readable, and not distorted
- Do not hide the interface behind character art or smoke
- No futuristic neon cyberpunk style
- No fantasy castle, no military command center, no modern smartphone interface
- No extra characters, no physical TV frame, no watermark

Prioritize functional UI clarity over cinematic atmosphere. Every panel, label, timer, HP bar, player status, and target marker must be clearly visible and readable.
```

---

## 13. 네거티브 프롬프트

```text
futuristic cyberpunk, neon blue dashboard, sci-fi hologram, military command center, fantasy castle, medieval theme, smartphone screen, movie poster, excessive character illustration, unreadable text, distorted Korean letters, fake random text, cluttered layout, tiny UI elements, low contrast, excessive blood, gore, horror corpse, overly realistic violence, excessive smoke covering the interface, watermark, logo, cropped panels, tilted perspective, overly decorative background
```

---

## 14. 디자인 검수 기준

이미지 또는 실제 UI 시안은 다음 조건을 만족해야 한다.

### 가독성

- 멀리서도 라운드와 페이즈를 읽을 수 있는가?
- 타이머가 즉시 보이는가?
- 보스 HP가 가장 중요한 정보로 인식되는가?
- 생존자와 사망자를 빠르게 구분할 수 있는가?
- 수배 대상이 명확하게 보이는가?

### 분위기

- 고전 마피아 조직 느와르 느낌이 나는가?
- 낡은 사건 기록실의 질감이 느껴지는가?
- 네온 사이버펑크나 군사 지휘실처럼 보이지 않는가?
- 장식이 게임 정보를 방해하지 않는가?

### 기능성

- 공용 화면에 비공개 역할 정보가 노출되지 않는가?
- 게임 진행에 필요한 정보와 장식 요소가 구분되는가?
- 플레이어가 현재 상황을 3초 안에 파악할 수 있는가?
- 사건 결과가 순서대로 읽히는가?

### 일관성

- 개인 화면도 동일한 문서·도장·색상 체계를 사용하는가?
- 역할별 상징이 일관되게 적용되는가?
- 밤·낮·투표의 분위기 변화가 자연스러운가?

---

## 15. 최종 디자인 선언

집중표적게임의 디자인은 다음 문장으로 요약한다.

> **낡은 마피아 사건 기록실을 디지털 게임 화면으로 옮긴다.**

공용 TV는 전체 상황을 보여주는 **사건 기록판**, 개인 앱은 각 플레이어만 열람할 수 있는 **기밀 지령서**, 플레이어 정보는 **수배 파일**, 능력 사용은 **조직의 작전 카드**, 결과 공개는 **판결문과 사건 보고서**로 표현한다.

분위기는 어둡고 클래식하게 만들되, 사용성은 현대적인 파티게임처럼 단순하고 직관적으로 유지한다.

---

# 17. 구현 보완 사양

이 절은 앞선 디자인 콘셉트를 실제 HTML/CSS/JavaScript 구현으로 연결하기 위한 실행 사양이다. 분위기 표현보다 **가독성, 기존 기능 보존, 모바일 조작성**을 우선한다.

## 17.1 CSS 색상 팔레트

기존 코드에 이미 사용 중인 `#12131a`, `#5865f2`는 즉시 제거하지 않고 역할을 변경한다.

- `#12131a`: 앱 최상위 배경으로 유지한다.
- `#5865f2`: 기본 인터랙션 색상으로 유지하되, 느와르 테마에서는 보조색으로만 사용한다.
- 주요 위험·공격 색상은 기존 Discord 보라색보다 암적색을 우선한다.

```css
:root {
  /* Base */
  --color-bg: #12131a;
  --color-bg-deep: #0b0c10;
  --color-surface: #1b1a1b;
  --color-surface-raised: #242126;
  --color-border: #3a3430;
  --color-border-strong: #66584a;

  /* Paper / typography */
  --color-paper: #e7d8b8;
  --color-paper-muted: #c7b894;
  --color-paper-dark: #9d8a69;
  --color-ink: #211c18;
  --color-text: #f0e7d4;
  --color-text-muted: #b9ad98;
  --color-text-disabled: #746d64;

  /* Theme accents */
  --color-crimson: #8f2028;
  --color-crimson-bright: #c33a3f;
  --color-crimson-deep: #5b151c;
  --color-teal: #3f7772;
  --color-teal-bright: #67aaa1;
  --color-ochre: #b28a3e;
  --color-gold: #c7a55a;
  --color-gold-bright: #e3c477;
  --color-purple-legacy: #5865f2;

  /* Semantic states */
  --color-success: #5d9275;
  --color-warning: #c18d3e;
  --color-danger: var(--color-crimson-bright);
  --color-dead: #5e5b59;
  --color-focus: #d7b663;

  /* Layout */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --shadow-card: 0 8px 24px rgb(0 0 0 / 28%);
  --shadow-stamp: 0 2px 0 rgb(0 0 0 / 20%);
  --border-hairline: 1px solid rgb(231 216 184 / 16%);
}
```

### 색상 사용 규칙

- 공격·집중표적: `--color-crimson` 또는 `--color-crimson-bright`
- 방어·보호: `--color-teal`
- 투표·주의: `--color-ochre`
- 보스·중요 수치: `--color-gold`
- 종이 문서: `--color-paper`
- 비활성·사망: `--color-dead`
- 포커스 링: `--color-focus`

빨간색은 모든 강조에 사용하지 않는다. 공격, 표적, 사망 결과처럼 실제 위험 또는 사건 변화가 있을 때만 사용한다.

## 17.2 폰트 사양

### 한글

- 본문·버튼·상태값: **Noto Sans KR**
- 문서 제목·역할명·결과 제목: **Noto Serif KR**

### 영문·문서 라벨

- 타자기 라벨: **Special Elite**
- 영문 제목 대체: **Cormorant Garamond**

Special Elite는 한글을 지원하지 않으므로 한글 문장에 직접 적용하지 않는다. 한글은 Noto Sans KR 또는 Noto Serif KR로 표시하고, 영문 라벨과 사건 번호에만 Special Elite를 사용한다.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+KR:wght@500;600;700&family=Special+Elite&display=swap" rel="stylesheet">
```

```css
:root {
  --font-body: "Noto Sans KR", sans-serif;
  --font-display: "Noto Serif KR", serif;
  --font-typewriter: "Special Elite", "Courier New", monospace;
  --font-latin-display: "Cormorant Garamond", serif;
}

body { font-family: var(--font-body); }
.case-file__title,
.role-name,
.result-title { font-family: var(--font-display); }
.case-file__label,
.case-number,
.stamp { font-family: var(--font-typewriter); }
```

웹폰트 로드에 실패해도 한글 본문이 깨지지 않도록 반드시 시스템 폴백을 유지한다.

## 17.3 기존 HTML 구조 매핑

현재 코드에 존재하는 엘리먼트를 삭제하기보다 역할을 유지한 채 클래스와 내부 컴포넌트를 확장한다.

| 기존 엘리먼트 | 디자인 개념 | 변경 방향 |
|---|---|---|
| `#bossBanner` | 보스 사건 파일 | `boss-case-file` 클래스를 추가하고 HP, 인장, 상태 도장 영역을 내부에 둔다. |
| `#playerGrid` | 플레이어 수배 파일 목록 | CSS Grid 컨테이너로 유지한다. 인원수에 따라 열 수를 변경한다. |
| `.tv-player-card` | 개별 수배 파일 | `is-alive`, `is-dead`, `is-targeted`, `is-disabled` 상태 클래스를 사용한다. |
| `#phaseLabel` 또는 페이즈 표시 영역 | 사건 문서 헤더 | `phase-kicker`, `round-label`로 묶어 라운드와 페이즈를 분리한다. |
| `#timer` 또는 타이머 영역 | 사건 제한 시간 | `.countdown`과 `is-warning`, `is-critical` 상태를 추가한다. |
| 결과·로그 영역 | 밤 사건 보고서 | `.event-report`, `.event-report__line` 구조로 통일한다. |
| 기존 버튼 | 작전·지령 카드 | 기능은 유지하고 `.action-card`, `.action-card--attack`, `.action-card--defense` 스타일을 적용한다. |

권장 HTML 구조:

```html
<main class="game-shell" data-phase="night">
  <header class="case-header">
    <span class="case-header__label">CONFIDENTIAL CASE FILE</span>
    <h1>집중표적게임</h1>
    <div class="phase-status">
      <span id="roundLabel">ROUND 2</span>
      <span id="phaseLabel">NIGHT</span>
      <strong id="timer" class="countdown">01:24</strong>
    </div>
  </header>

  <section id="bossBanner" class="boss-case-file"></section>
  <section id="playerGrid" class="player-file-grid" aria-label="생존자 명단"></section>
  <section class="event-report" aria-live="polite"></section>
</main>
```

기존 JavaScript가 참조하는 ID는 유지한다. 디자인 변경을 위해 ID를 바꾸면 소켓 이벤트와 진행 로직이 끊길 수 있으므로, 구조 변경은 클래스·내부 자식 요소 추가 방식으로 진행한다.

## 17.4 전체 화면 상태

### 로비 대기

콘셉트: **조직 입단 대기실**

- 제목: `CONFIDENTIAL ORGANIZATION FILE`
- 방 코드: 큰 아이보리 문서 라벨 또는 금속 표찰
- 참가자: 빈 수배 파일 슬롯
- 진행 버튼: `작전 시작`
- 안내: `모든 조직원이 입장할 때까지 대기 중`

```text
[조직 사건번호] JIPJUNG-4821
현재 참가자 5 / 8
작전 시작까지 대기 중...
```

### 재접속 중

콘셉트: **통신 두절 후 연결 복구**

- 중앙에 봉인된 문서 아이콘
- 문구: `조직 통신을 복구하는 중...`
- 보조 문구: `잠시 후 이전 작전 상태로 돌아갑니다.`
- 자동 재시도 중에는 버튼을 반복해서 누르지 못하도록 한다.

### 네트워크 오류

콘셉트: **보고서 전송 실패**

- 붉은 도장 대신 황색 경고 라벨 사용
- 문구: `사건 보고서를 불러오지 못했습니다.`
- 버튼: `다시 연결`, `로비로 돌아가기`
- 오류 원인을 짧게 표시하되 내부 서버 정보는 노출하지 않는다.

### 게임 종료

콘셉트: **최종 판결문**

- 중앙에 `CASE CLOSED` 또는 `CASE FAILED` 문서
- 승리 진영을 먼저 공개
- 이후 역할 공개와 생존자 목록을 순차 표시
- 버튼: `로비로 돌아가기`, `새 작전 시작`

승리 진영 색상:

- 보스·경호원: 금색·청록색
- 스파이: 암적색·보라색
- 배신자: 검붉은색·회색

## 17.5 능력 카드 7종 사양

각 능력 카드는 **아이콘 + 능력명 + 한 줄 효과 + 사용 가능 상태**만 기본으로 표시한다. 자세한 규칙은 눌렀을 때 바텀시트 또는 역할 설명 패널에서 보여준다.

| 역할 | 능력 | 아이콘 방향 | 카드 문구 | 색상 |
|---|---|---|---|---|
| 보스 | 지명 수배 | 붉은 과녁이 찍힌 수배 전단 | `대상을 공개 표적으로 지정합니다.` | 암적색 |
| 보스 | 긴급 처형 | 금색 권총과 판결 도장 | `이번 밤 기본 공격력이 2가 됩니다.` | 금색 + 암적색 |
| 경호원 | 육탄 방어 | 깨진 총알이 박힌 방패 | `보스를 향한 피해를 대신 받습니다.` | 청록색 |
| 경호원 | 충성심 서약 | 봉인된 경호 계약서 | `지정한 대상을 향한 피해를 무효화합니다.` | 청록색 |
| 스파이 | 어둠의 공모 | 겹쳐진 봉인 편지 3장 | `스파이 팀과 작전 정보를 공유합니다.` | 짙은 보라색 |
| 스파이 | 교란 작전 | 끊어진 통신선과 검은 눈 | `대상의 기본 공격과 특수 능력을 봉쇄합니다.` | 보라색 + 암적색 |
| 배신자 | 흑막의 미소 | 뒤집힌 카드와 웃는 가면 | `밤 사망자 발생 시 HP를 회복하고 공격력이 증가합니다.` | 검붉은색 |

> **MVP 범위 확정:** 위 7종 중 **보스 지명 수배**와 **스파이 어둠의 공모**는 현재 백엔드(`socketHandlers.ts`의 `nightOptionsFor()`)에 대응하는 메커니즘이 없다. 이번 UI 개선에서는 실제 구현된 **5종**(보스 긴급 처형, 경호원 육탄 방어·충성심 서약, 스파이 교란 작전, 배신자 흑막의 미소)만 카드로 표시하고, 나머지 2종은 향후 백엔드 기능 추가 시 함께 작업한다.

기본 공격은 공통 행동 카드로 별도 제공한다.

```text
기본 공격
대상 1명을 지목합니다.
```

상태 라벨:

- `사용 가능`
- `선택됨`
- `사용 완료`
- `봉쇄됨`
- `이번 라운드 사용 불가`
- `대상 선택 필요`

## 17.6 애니메이션·인터랙션 사양

모든 애니메이션은 순수 CSS로 구현 가능하도록 한다. `prefers-reduced-motion: reduce`에서는 움직임을 즉시 정적 상태로 전환한다.

| 인터랙션 | 트리거 | 시간 | easing | 구현 |
|---|---|---:|---|---|
| 밤 전환 | `data-phase="night"` 변경 | 500ms | `ease-out` | 배경 밝기·오버레이 전환 |
| 표적 도장 등장 | 대상 지정 완료 | 260ms | `cubic-bezier(.2,.8,.2,1)` | scale .85→1, opacity 0→1 |
| 타겟 펄스 | 표적 상태 유지 | 2.2s 반복 | `ease-in-out` | 테두리와 도장만 점멸 |
| 타이머 경고 | 30초 이하 | 600ms 반복 | `ease-in-out` | 황색 테두리·숫자 강조 |
| 타이머 긴급 | 10초 이하 | 420ms 반복 | `ease-in-out` | 암적색 강조, 배경 전체 점멸 금지 |
| HP 감소 | HP 값 변경 | 700ms | `ease-out` | HP 바 감소 + 숫자 색상 전환 |
| 결과 공개 | 서버 결과 수신 | 항목당 450ms | `ease-out` | 보고서 줄이 순차 등장 |
| 사망 처리 | 사망 상태 수신 | 350ms | `ease-in` | 채도 감소 + 검은 테이프 등장 |
| 버튼 선택 | 클릭 또는 키보드 포커스 | 120ms | `ease-out` | translateY(-1px), 테두리 강조 |
| 능력 카드 비활성 | 봉쇄·쿨타임 | 180ms | `linear` | opacity .48, 필터 grayscale |
| 게임 종료 | 종료 이벤트 수신 | 900ms | `cubic-bezier(.16,1,.3,1)` | 판결문 scale .96→1 |

권장 CSS:

```css
@keyframes target-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgb(195 58 63 / 0%); }
  50% { box-shadow: 0 0 0 6px rgb(195 58 63 / 22%); }
}

.is-targeted {
  animation: target-pulse 2.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 인터랙션 원칙

- 중요한 상태는 애니메이션만으로 전달하지 않고 텍스트와 색상으로도 전달한다.
- 화면 전체가 깜빡이지 않게 한다.
- 타이머가 10초 이하일 때도 눈부신 전면 플래시는 사용하지 않는다.
- 소켓 지연으로 상태가 늦게 도착해도 중복 애니메이션이 발생하지 않도록 이벤트 ID 또는 상태값으로 한 번만 실행한다.

## 17.7 모바일 반응형 사양

개인 화면은 모바일 우선으로 구현한다.

### 브레이크포인트

```css
/* 기본: 320px 이상 모바일 */
/* 좁은 모바일 */
@media (max-width: 359px) { }

/* 일반 모바일 */
@media (min-width: 360px) and (max-width: 767px) { }

/* 태블릿 */
@media (min-width: 768px) and (max-width: 1199px) { }

/* TV·데스크톱 진행 화면 */
@media (min-width: 1200px) { }
```

### 모바일 규칙

- 화면 좌우 여백: 16px, 320px 화면에서는 12px
- 터치 대상 최소 크기: 44 × 44px
- 주요 확정 버튼 높이: 52px 이상
- 행동 카드는 모바일에서 1열 배치
- 플레이어 대상 목록은 1열, 필요 시 2열이 아닌 큰 행 카드로 유지
- 하단 확정 버튼은 `position: sticky; bottom: 12px` 사용
- 타이머는 상단에 고정하되 화면을 가리지 않게 한다.
- 역할 설명은 기본 접힘 상태로 둔다.
- 작은 화면에서 장식 배경, 종이 텍스처, 그림자는 줄인다.

```css
.action-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.confirm-action {
  position: sticky;
  bottom: 12px;
  min-height: 52px;
  width: 100%;
}

@media (min-width: 768px) {
  .action-card-grid { grid-template-columns: repeat(2, 1fr); }
  .confirm-action { position: static; }
}
```

### TV 규칙

- 1200px 이상에서만 장식 텍스처와 사건 파일 레이아웃을 충분히 노출한다.
- 정보 패널의 최소 글자 크기: 20px
- 타이머: 최소 48px
- 보스 HP와 현재 페이즈: 최소 24px
- 8인 플레이어 카드는 최소 160px 너비를 목표로 한다.

## 17.8 이미지·에셋 전략

MVP에서는 외부 이미지 파일 없이 **HTML/CSS 중심**으로 구현한다.

### CSS로 처리할 요소

- 종이 질감: 단색 배경 + `linear-gradient` + 미세한 `box-shadow`
- 타자기 문서: 폰트와 점선 테두리
- 붉은 도장: CSS 원형 테두리와 회전된 텍스트
- 금속 프레임: 그라디언트와 내부 그림자
- 담배 연기: CSS 장식으로 구현하지 않고, 배경 오버레이를 최소 사용
- 총알 자국: MVP에서는 생략하거나 작은 CSS 원형 장식으로 처리

### 이미지 에셋을 사용할 조건

- 캐릭터 초상화가 추가될 때
- 역할 카드의 대표 일러스트가 필요할 때
- 브랜딩용 로고 또는 시작 화면 일러스트가 필요할 때

### 에셋 폴더 규칙

```text
/public/assets/
  /icons/       역할·행동 SVG
  /textures/    선택적 배경 텍스처
  /portraits/   선택적 캐릭터 초상화
  /brand/       로고·인장
```

아이콘은 가능하면 인라인 SVG 또는 단색 SVG로 관리한다. PNG를 버튼 배경으로 사용하는 것은 피하고, 색상과 상태를 CSS로 제어할 수 있게 한다.

권장 MVP 에셋:

- 역할 아이콘 4개
- 행동 아이콘 7개
- 조직 인장 1개
- 사망 테이프 SVG 1개
- 수배 도장 SVG 1개

낡은 종이 이미지를 처음부터 넣지 않는 이유는 파일 용량, 모바일 성능, 색상 일관성, 저작권 문제를 줄이기 위해서다.

## 17.8-1 HP바 계산 버그 수정

기존 `host.js:47`, `player.js:101`의 HP바는 역할별 `MAX_HP`(보스 5, 경호원·스파이·배신자 4)를 무시하고 항상 `(hp / 5) * 100`으로 계산해 보스가 아닌 역할의 HP바가 부정확하게 표시된다. 이번 UI 개선에서 HP바 스타일을 새로 짜면서 역할별 `MAX_HP` 값을 반영해 정확한 비율로 고친다.

## 17.9 6~10인 가변 그리드

`#playerGrid`는 플레이어 수에 따라 자동으로 반응해야 한다.

```css
.player-file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

@media (max-width: 767px) {
  .player-file-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (min-width: 1200px) {
  .player-file-grid {
    grid-template-columns: repeat(5, minmax(150px, 1fr));
  }
}
```

### 인원별 TV 배치

| 인원 | 권장 배치 | 비고 |
|---:|---|---|
| 6명 | 3 × 2 | 카드 크기를 키운다. |
| 7명 | 4 + 3 | 빈 칸 없이 균형 배치한다. |
| 8명 | 4 × 2 | 기본 목업 기준이다. |
| 9명 | 5 + 4 | 보스 사건 파일 영역을 침범하지 않게 한다. |
| 10명 | 5 × 2 | 카드 내부 문구를 최소화한다. |

보스가 플레이어 그리드에 포함되는 구조라면 보스 카드는 별도 영역에 중복 표시하지 않는다. 보스 사건 파일은 상태 요약용이며, 플레이어 목록에는 보스의 현재 생존 상태를 작은 참조 카드로만 표시한다.

### 모바일 인원 표시

개인 앱에서는 모든 플레이어를 작은 카드로 우겨 넣지 않는다.

- 6~10명을 세로 목록으로 표시
- 생존·사망·선택 가능 상태를 행 단위로 표현
- 닉네임이 길면 말줄임표 처리
- 선택 불가능한 플레이어는 목록에서 제거하지 않고 비활성 상태로 남긴다.

## 17.10 가독성과 분위기가 충돌할 때의 우선순위

충돌 시 다음 순서로 판단한다.

```text
1. 조작 가능성
2. 정보 가독성
3. 오류 방지
4. 게임 상태 전달
5. 분위기와 장식
```

구체적인 예:

- 작은 화면에서 Noto Serif KR이 읽히지 않으면 Noto Sans KR로 전환한다.
- 종이 질감 때문에 글자 대비가 낮아지면 텍스처를 제거한다.
- 담배 연기가 타이머를 가리면 연기를 삭제한다.
- 붉은 도장이 플레이어 상태를 가리면 도장을 카드 모서리로 이동한다.
- 애니메이션이 선택 상태를 방해하면 애니메이션을 제거하고 테두리와 텍스트를 남긴다.
- 카드가 좁아져 문장이 두 줄 이상 늘어나면 설명을 한 줄로 줄이고 자세한 내용은 도움말로 이동한다.

최소 접근성 기준:

- 일반 본문 대비 4.5:1 이상을 목표로 한다.
- 큰 텍스트와 UI 요소는 3:1 이상을 목표로 한다.
- 색상만으로 생존·사망·표적 상태를 구분하지 않는다.
- 포커스 링은 항상 보이게 한다.
- 버튼의 `disabled` 상태는 색상뿐 아니라 텍스트 라벨과 아이콘으로도 표시한다.

## 17.11 구현 순서

1. CSS 변수와 폰트 적용
2. 기존 ID·소켓 로직을 유지한 HTML 클래스 확장
3. `#bossBanner`, `#playerGrid`, `.tv-player-card`를 사건 파일 스타일로 변경
4. 로비·재접속·오류·종료 상태 추가
5. 7개 능력 카드와 상태 라벨 추가
6. 모바일 브레이크포인트 적용
7. 인원수별 그리드 테스트
8. 타이머·HP·표적·사망 애니메이션 적용
9. 텍스처 없이 기능성 검수
10. 마지막으로 선택적 장식 에셋 추가

장식 에셋은 기능성 UI가 안정된 뒤 추가한다. 디자인 구현 중에는 항상 `가독성 > 조작성 > 분위기` 원칙을 적용한다.
