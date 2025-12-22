# Project Instructions for Claude

## 로컬 서버 실행 지침

### Storybook 서버 백그라운드 실행
프로젝트에서 Storybook이나 다른 개발 서버를 실행할 때는 항상 백그라운드에서 실행해주세요:

```bash
# Storybook 백그라운드 실행
nohup npm run storybook > storybook.log 2>&1 &

# Next.js 개발 서버 백그라운드 실행
nohup npm run dev > dev.log 2>&1 &

# 기타 서버도 동일한 패턴으로 실행
nohup [명령어] > [로그파일명].log 2>&1 &
```

### 프로세스 확인 및 종료
```bash
# 실행 중인 프로세스 확인
ps aux | grep [프로세스명] | grep -v grep

# 프로세스 종료
pkill -f "[프로세스명]"
```

### 로그 확인
백그라운드에서 실행되는 서버의 로그는 해당 로그 파일에서 확인할 수 있습니다:
```bash
tail -f storybook.log  # 실시간 로그 확인
cat storybook.log      # 전체 로그 확인
```

## 프로젝트 특성

이 프로젝트는 shadcn UI 컴포넌트를 Storybook으로 문서화하고 테스트하는 레지스트리입니다.

- **프레임워크**: Next.js with TypeScript
- **UI 라이브러리**: shadcn/ui
- **문서화 도구**: Storybook
- **스타일링**: Tailwind CSS
- **테스트**: Vitest

## 기본 명령어

- `npm run storybook`: Storybook 개발 서버 실행 (포트 6006)
- `npm run dev`: Next.js 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run test`: 테스트 실행
- `npm run lint`: 코드 린팅