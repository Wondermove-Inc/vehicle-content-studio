# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Vehicle Content Studio**는 현대자동차그룹(HMG)의 차량 컨텐츠 관리 시스템입니다. React + TypeScript + Vite 기반으로 구축되었으며, HMG Design System을 사용합니다.

## 핵심 개발 명령어

### 개발 서버
```bash
npm run dev
```
- Vite 개발 서버 실행
- 기본적으로 http://localhost:5173 에서 실행

### 빌드
```bash
npm run build
```
- TypeScript 컴파일 (`tsc -b`) 후 Vite 빌드 실행
- 빌드 결과물은 `dist/` 디렉토리에 생성

### 린트
```bash
npm run lint
```
- ESLint를 사용한 코드 품질 검사
- TypeScript ESLint + React Hooks + React Refresh 플러그인 사용

### 프리뷰
```bash
npm run preview
```
- 빌드된 결과물을 로컬에서 미리보기

## 아키텍처 및 구조

### HMG Design System 통합

이 프로젝트는 **내부 npm 레지스트리**를 통해 `@hmg-fe/hmg-design-system`을 사용합니다.

**중요 설정:**
- `.npmrc`에 내부 레지스트리 설정이 필수적으로 필요합니다
- Design System은 `./package` 디렉토리에 로컬 패키지로 링크되어 있습니다
- 컴포넌트는 개별 import 방식을 사용합니다 (트리 쉐이킹 최적화)

**컴포넌트 Import 패턴:**
```typescript
// ✅ 올바른 방식 - 개별 import
import Button from '@hmg-fe/hmg-design-system/Button'
import Stack from '@hmg-fe/hmg-design-system/Stack'

// ❌ 피해야 할 방식 - 전체 import
import { Button, Stack } from '@hmg-fe/hmg-design-system'
```

**Design System 초기화:**
- `main.tsx`에서 `setConfig({ useDefaultHdsProps: true })` 호출 필수
- `HdsThemeProvider`로 앱 전체를 감싸고 테마 설정 (`theme="hmg"`)

### 라우팅 구조

React Router v7 사용, `main.tsx`에서 중앙 집중식 라우팅 정의:

- `/` - Login 페이지
- `/project` - 프로젝트 목록
- `/project/content/:contentId` - 컨텐츠 상세
- `/preview/:imageIndex` - 이미지 프리뷰
- `/content-request` - 컨텐츠 요청

### 국제화 (i18n)

**설정:**
- `react-i18next` + `i18next-browser-languagedetector` 사용
- 기본 언어: 한국어 (`ko`)
- 지원 언어: 한국어, 영어 (`ko`, `en`)
- 번역 파일 위치: `src/i18n/locales/`

**사용 패턴:**
```typescript
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()
  return <Typography>{t('common.button.save')}</Typography>
}
```

**언어 변경 시:**
- localStorage에 `i18nextLng` 키로 저장
- HTML `lang` 속성 자동 업데이트

### 빌드 최적화

**Vite 설정 (`vite.config.ts`):**

1. **Path Alias:** `@` → `/src`
2. **의존성 최적화:** HMG Design System 컴포넌트들이 `optimizeDeps.include`에 명시적으로 등록
3. **Chunk 분할 전략:**
   - `hds-core`: 핵심 UI 컴포넌트 (Box, Stack, Typography, Button)
   - `hds-form`: 폼 관련 컴포넌트 (TextField, InputAdornment, IconButton)
   - `vendor`: Emotion (styled-components)
4. **서버 워밍업:** 초기 로딩 최적화를 위해 `main.tsx`, `Login.tsx` 사전 로드

### 주요 페이지 컴포넌트

프로젝트의 페이지들은 모두 `src/pages/` 디렉토리에 위치:

- **Login.tsx** - 로그인 및 협력사 권한 신청 다이얼로그
- **Project.tsx** - 프로젝트 목록 및 필터링
- **ContentDetail.tsx** - 컨텐츠 상세 정보 및 편집
- **ContentRequest.tsx** - 새 컨텐츠 요청 생성
- **Preview.tsx** - 이미지 프리뷰 (줌, 드래그, 네비게이션 기능 포함)

### 공통 컴포넌트

`src/components/` 디렉토리:
- **Sidebar.tsx** - 애플리케이션 전역 사이드바

## 브랜드 및 채널 구조

프로젝트는 HMG의 멀티 브랜드 체계를 지원합니다:

**브랜드:**
- 현대자동차 (Hyundai)
- 기아 (Kia)
- 제네시스 (Genesis)

**채널:**
- 원앱 (One App)
- 원웹 (One Web)
- IVI (In-Vehicle Infotainment)
- In-Store
- 기존 홈페이지 (Legacy Web)

**컨텐츠 타입:**
- VCM (Vehicle Configuration Module)
- Web CC (Web Color Chip)
- 2D 360
- PI (Product Image)

## 개발 시 주의사항

### HMG Design System 사용

1. **컴포넌트 Props 전달:**
   - HDS 컴포넌트는 `hdsProps` 속성을 통해 Design System 전용 props 전달
   - 예: `<Button hdsProps={{ size: 'large', style: 'primary' }}>`

2. **아이콘 사용:**
   - HMG Icon은 `@hmg-fe/hmg-design-system/HmgIcon`에서 개별 import
   - 예: `import { Ic_folder_filled, Ic_check_regular } from '@hmg-fe/hmg-design-system/HmgIcon'`

3. **CSS Import:**
   - `main.tsx`에서 `@hmg-fe/hmg-design-system/css` import 필수

### ESLint 규칙

- `sort-imports` 규칙은 비활성화됨 (HMG Design System 권장사항)
- import 순서는 개발자 재량
- React Hooks 규칙 및 React Refresh 규칙 적용

### TypeScript 설정

- Project References 방식 사용 (`tsconfig.json`)
- 애플리케이션 코드: `tsconfig.app.json`
- Vite 설정: `tsconfig.node.json`
