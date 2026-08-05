---
name: 커밋푸시
description: 변경사항을 확인하고 git add, commit, push를 자동으로 진행한다.
---

# 커밋푸시 스킬

현재 변경사항을 자동으로 staging, commit, push 한다.

## 절차

1. `git status --short`로 변경사항 확인
2. 변경된 파일 목록 표시
3. `git add .`로 모든 변경사항 staging
4. 커밋 메시지 작성 (사용자가 제공하지 않으면 기본값 사용)
5. `git commit -m "메시지"`로 커밋
6. `git push origin main`으로 GitHub 푸시
7. 완료 메시지 출력

## 사용 예

- `/커밋푸시` — 기본 커밋 메시지로 진행
- 사용자가 커밋 메시지를 제공하면 그것을 사용

## 주의

- 커밋 전 변경사항을 반드시 확인하고 사용자 승인이 필요
- Push는 main 브랜치에만 진행
- 충돌 발생 시 사용자에게 알림
