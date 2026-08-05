# 집중표적게임

8인 소셜 디덕션 파티 게임 (기획 문서: `docs/`). MVP 범위는 `docs/` 문서 중 핵심 게임루프 1세트만 구현한 것으로, 인원수 가변·특수 능력·재접속 등은 2차 작업입니다.

## 로컬 실행

```
npm install
npm run dev
```

- 진행자: http://localhost:3000/host — 방 만들기 → 방 코드 확인
- 플레이어(8명): http://localhost:3000/player — 방 코드 + 닉네임으로 입장
- TV(공용 화면): http://localhost:3000/tv — 방 코드 입력 후 연결

## 테스트

```
npm test
```

`server/src/game/resolveRound.test.ts`에서 밤 데미지 합산, 낮 투표, 승리조건 판정 로직을 검증합니다.

## 배포 (Render.com)

1. 이 폴더를 GitHub 저장소로 push
2. Render에서 "New Web Service" → 저장소 연결
3. Build Command: `npm install`
4. Start Command: `npm start`
5. 환경변수 `PORT`는 Render가 자동 주입 (서버 코드가 `process.env.PORT`를 사용)
