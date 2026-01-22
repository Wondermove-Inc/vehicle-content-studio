# Vehicle Content Studio - 퍼블리싱 전달 문서

> **작성일**: 2026-01-22
> **프로젝트**: Vehicle Content Studio
> **버전**: 0.0.1

---

## 📋 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [기술 스택](#-기술-스택)
3. [프로젝트 구조](#-프로젝트-구조)
4. [개발 환경 설정](#-개발-환경-설정)
5. [HMG Design System 사용 가이드](#-hmg-design-system-사용-가이드)
6. [라우팅 및 권한 관리](#-라우팅-및-권한-관리)
7. [국제화 (i18n)](#-국제화-i18n)
8. [빌드 최적화](#-빌드-최적화)
9. [코드 컨벤션](#-코드-컨벤션)
10. [주요 참고사항](#-주요-참고사항)

---

## 🎯 프로젝트 개요

**Vehicle Content Studio**는 현대자동차그룹(HMG)의 차량 컨텐츠 관리 시스템입니다.

### 주요 기능
- 프로젝트 및 컨텐츠 관리
- 멀티 브랜드 지원 (현대/기아/제네시스)
- 다채널 컨텐츠 관리 (원앱/원웹/IVI/In-Store/레거시웹)
- 권한 기반 접근 제어
- 다국어 지원 (한국어/영어)

---

## 🛠 기술 스택

### Core
- **React** 18.3.1 - UI 라이브러리
- **TypeScript** 5.7.2 - 타입 안정성
- **Vite** 6.0.5 - 빌드 도구

### Styling
- **@hmg-fe/hmg-design-system** - HMG 디자인 시스템
- **@emotion/react** + **@emotion/styled** - CSS-in-JS

### Routing & State
- **React Router DOM** 7.1.1 - 라우팅
- **React Context API** - 상태 관리 (AuthContext)

### Internationalization
- **i18next** 25.7.3 - 국제화 프레임워크
- **react-i18next** 16.5.0 - React 통합
- **i18next-browser-languagedetector** 8.2.0 - 언어 자동 감지

### Development Tools
- **ESLint** 9.17.0 - 코드 품질
- **@vitejs/plugin-react-swc** 3.7.2 - 빠른 개발 서버

---

## 📁 프로젝트 구조

```
vehicle-content-studio/
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── ProtectedRoute.tsx    # 권한 기반 라우팅 가드
│   │   ├── PermissionGate.tsx    # 권한 기반 UI 제어
│   │   └── Sidebar.tsx           # 전역 사이드바
│   │
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Login.tsx             # 로그인 및 권한 신청
│   │   ├── Project.tsx           # 프로젝트 목록
│   │   ├── ContentDetail.tsx     # 컨텐츠 상세
│   │   ├── ContentRequest.tsx    # 컨텐츠 요청
│   │   └── Preview.tsx           # 이미지 프리뷰
│   │
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx       # 인증/권한 컨텍스트
│   │
│   ├── config/              # 설정 파일
│   │   └── permissions.config.ts # 권한 설정
│   │
│   ├── types/               # TypeScript 타입 정의
│   │   └── auth.types.ts         # 인증 관련 타입
│   │
│   ├── i18n/                # 국제화
│   │   ├── index.ts              # i18n 설정
│   │   └── locales/
│   │       ├── ko.json           # 한국어 번역
│   │       └── en.json           # 영어 번역
│   │
│   ├── mocks/               # Mock 데이터
│   │   └── users.mock.ts         # 사용자 Mock 데이터
│   │
│   ├── main.tsx             # 애플리케이션 진입점
│   └── App.tsx              # 루트 컴포넌트
│
├── package/                 # HMG Design System (로컬 패키지)
├── vite.config.ts          # Vite 설정
├── tsconfig.json           # TypeScript 설정
├── eslint.config.js        # ESLint 설정
└── package.json            # 의존성 관리
```

---

## 🚀 개발 환경 설정

### 1. 사전 요구사항
- **Node.js** 18.x 이상
- **npm** 9.x 이상
- HMG 내부 npm 레지스트리 접근 권한

### 2. 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview

# 코드 린트
npm run lint
```

### 3. 주요 명령어

| 명령어 | 설명 | 사용 시점 |
|--------|------|----------|
| `npm run dev` | Vite 개발 서버 실행 | 로컬 개발 시 |
| `npm run build` | TypeScript 컴파일 후 빌드 | 배포 전 |
| `npm run lint` | ESLint 코드 검사 | 커밋 전 |
| `npm run preview` | 빌드 결과물 확인 | 배포 전 검증 |

---

## 🎨 HMG Design System 사용 가이드

### 1. 설정 및 초기화

**main.tsx에서 필수 설정:**
```tsx
import '@hmg-fe/hmg-design-system/css'
import { setConfig, HdsThemeProvider } from '@hmg-fe/hmg-design-system'

// HDS 기본 설정 활성화
setConfig({ useDefaultHdsProps: true })

// 앱을 HdsThemeProvider로 감싸기
<HdsThemeProvider theme="hmg">
  {/* 앱 컴포넌트 */}
</HdsThemeProvider>
```

### 2. 컴포넌트 Import 규칙

**✅ 올바른 방식 - 개별 Import (트리 쉐이킹 최적화)**
```tsx
import Button from '@hmg-fe/hmg-design-system/Button'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
```

**❌ 피해야 할 방식 - 전체 Import**
```tsx
// 번들 사이즈 증가 원인
import { Button, Stack, Typography } from '@hmg-fe/hmg-design-system'
```

### 3. 컴포넌트 사용 패턴

#### 기본 사용
```tsx
import Button from '@hmg-fe/hmg-design-system/Button'
import Stack from '@hmg-fe/hmg-design-system/Stack'

function MyComponent() {
  return (
    <Stack spacing={2}>
      <Button hdsProps={{ size: 'large', style: 'primary' }}>
        저장
      </Button>
    </Stack>
  )
}
```

#### 아이콘 사용
```tsx
import { Ic_folder_filled, Ic_check_regular } from '@hmg-fe/hmg-design-system/HmgIcon'
import IconButton from '@hmg-fe/hmg-design-system/IconButton'

function IconExample() {
  return (
    <IconButton>
      <Ic_folder_filled />
    </IconButton>
  )
}
```

### 4. HDS Props 전달 규칙

HMG Design System 컴포넌트는 `hdsProps` 속성을 통해 디자인 시스템 전용 props를 전달합니다.

```tsx
<Button
  hdsProps={{
    size: 'large',      // 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    style: 'primary'    // 'primary' | 'secondary' | 'ghost' | 'text'
  }}
  onClick={handleClick}
>
  버튼 텍스트
</Button>
```

### 5. 자주 사용하는 컴포넌트

| 컴포넌트 | 용도 | Import Path |
|----------|------|-------------|
| `Box` | 레이아웃 컨테이너 | `@hmg-fe/hmg-design-system/Box` |
| `Stack` | 수직/수평 레이아웃 | `@hmg-fe/hmg-design-system/Stack` |
| `Typography` | 텍스트 표시 | `@hmg-fe/hmg-design-system/Typography` |
| `Button` | 버튼 | `@hmg-fe/hmg-design-system/Button` |
| `TextField` | 입력 필드 | `@hmg-fe/hmg-design-system/TextField` |
| `Card` | 카드 UI | `@hmg-fe/hmg-design-system/Card` |
| `Tabs` | 탭 네비게이션 | `@hmg-fe/hmg-design-system/Tabs` |
| `Select` | 드롭다운 선택 | `@hmg-fe/hmg-design-system/Select` |

---

## 🗺 라우팅 및 권한 관리

### 1. 라우팅 구조

**React Router v7 기반 중앙 집중식 라우팅 (main.tsx):**

| 경로 | 컴포넌트 | 필요 권한 | 설명 |
|------|----------|----------|------|
| `/` | `Login` | 없음 | 로그인 페이지 |
| `/project` | `Project` | `PROJECT_VIEW_ALL` 또는 `PROJECT_VIEW_ASSIGNED` | 프로젝트 목록 |
| `/project/content/:contentId` | `ContentDetail` | `CONTENT_VIEW` | 컨텐츠 상세 |
| `/preview/:imageIndex` | `Preview` | `CONTENT_VIEW` | 이미지 프리뷰 |
| `/content-request` | `ContentRequest` | `PROJECT_CREATE` 또는 `CONTENT_CREATE` | 컨텐츠 요청 |

### 2. 권한 시스템

#### 권한 타입 (types/auth.types.ts)
```tsx
export enum Permission {
  // 프로젝트 권한
  PROJECT_VIEW_ALL = 'project:view:all',
  PROJECT_VIEW_ASSIGNED = 'project:view:assigned',
  PROJECT_CREATE = 'project:create',
  PROJECT_EDIT = 'project:edit',

  // 컨텐츠 권한
  CONTENT_VIEW = 'content:view',
  CONTENT_CREATE = 'content:create',
  CONTENT_EDIT = 'content:edit',
  CONTENT_DELETE = 'content:delete',

  // 파일 권한
  FILE_UPLOAD = 'file:upload',
  FILE_DOWNLOAD = 'file:download',
  FILE_DELETE = 'file:delete',

  // 검수 권한
  REVIEW_SUBMIT = 'review:submit',
  REVIEW_APPROVE = 'review:approve',
}
```

#### 라우트 권한 보호 (ProtectedRoute)
```tsx
// 단일 권한 필요
<ProtectedRoute requiredPermissions={[Permission.CONTENT_VIEW]}>
  <ContentDetail />
</ProtectedRoute>

// 여러 권한 중 하나만 있으면 됨
<ProtectedRoute requiredAnyPermission={[Permission.PROJECT_VIEW_ALL, Permission.PROJECT_VIEW_ASSIGNED]}>
  <Project />
</ProtectedRoute>
```

#### UI 요소 권한 제어 (PermissionGate)
```tsx
import PermissionGate from '@/components/PermissionGate'
import { Permission } from '@/types/auth.types'

function MyComponent() {
  return (
    <PermissionGate permission={Permission.CONTENT_EDIT}>
      <Button>편집</Button>
    </PermissionGate>
  )
}
```

### 3. 인증 컨텍스트 사용

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, hasPermission, hasAnyPermission } = useAuth()

  // 단일 권한 체크
  const canEdit = hasPermission(Permission.CONTENT_EDIT)

  // 여러 권한 중 하나 체크
  const canView = hasAnyPermission([Permission.PROJECT_VIEW_ALL, Permission.PROJECT_VIEW_ASSIGNED])

  return <div>사용자: {user?.name}</div>
}
```

---

## 🌍 국제화 (i18n)

### 1. 설정 구조

**지원 언어:**
- 한국어 (`ko`) - 기본 언어
- 영어 (`en`)

**언어 파일 위치:**
- `src/i18n/locales/ko.json`
- `src/i18n/locales/en.json`

### 2. 사용 방법

#### 컴포넌트에서 사용
```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <Typography>{t('common.button.save')}</Typography>
      <Button onClick={() => i18n.changeLanguage('en')}>
        {t('common.language.english')}
      </Button>
    </div>
  )
}
```

#### 번역 키 구조 예시
```json
{
  "common": {
    "button": {
      "save": "저장",
      "cancel": "취소",
      "confirm": "확인"
    },
    "language": {
      "korean": "한국어",
      "english": "English"
    }
  },
  "project": {
    "title": "프로젝트",
    "create": "프로젝트 생성"
  }
}
```

### 3. 언어 감지 및 저장

**자동 언어 감지 순서:**
1. localStorage (`i18nextLng` 키)
2. 브라우저 언어 설정 (`navigator.language`)

**언어 변경 시:**
- localStorage에 자동 저장
- HTML `lang` 속성 자동 업데이트

---

## ⚡ 빌드 최적화

### 1. Vite 최적화 설정

#### Path Alias
```tsx
// vite.config.ts에서 설정됨
import Component from '@/components/Component'  // /src/components/Component
```

#### 청크 분할 전략

빌드 시 다음과 같이 청크가 분리됩니다:

| 청크 이름 | 포함 컴포넌트 | 용도 |
|----------|--------------|------|
| `hds-core` | Box, Stack, Typography, Button, Divider | 핵심 UI 컴포넌트 |
| `hds-form` | TextField, Select, Radio, IconButton | 폼 관련 컴포넌트 |
| `hds-navigation` | Tabs, Tab, ButtonGroup, Popover | 네비게이션 컴포넌트 |
| `hds-surface` | Card, CardContent, Paper | 표면 컴포넌트 |
| `hds-feedback` | Badge, CircularProgress | 피드백 컴포넌트 |
| `vendor` | @emotion/react, @emotion/styled | Emotion 라이브러리 |

### 2. 개발 서버 최적화

**서버 워밍업:** 초기 로딩 속도 개선을 위해 다음 파일들을 사전 로드합니다:
- `src/main.tsx`
- `src/pages/Login.tsx`

### 3. 의존성 사전 번들링

Vite는 다음 패키지들을 개발 시 사전 번들링하여 성능을 최적화합니다:
- HMG Design System 모든 컴포넌트
- React 관련 라이브러리
- Emotion styled-components

---

## 📝 코드 컨벤션

### 1. TypeScript

**타입 정의 위치:**
- `src/types/` 디렉토리에 도메인별 타입 파일 생성
- 파일명: `*.types.ts` 형식 사용

**타입 정의 예시:**
```tsx
// src/types/project.types.ts
export interface Project {
  id: string
  name: string
  brand: Brand
  status: ProjectStatus
}

export type Brand = 'hyundai' | 'kia' | 'genesis'
export type ProjectStatus = 'active' | 'completed' | 'archived'
```

### 2. Import 순서

ESLint `sort-imports` 규칙은 비활성화되어 있어 개발자 재량이지만, 다음 순서를 권장합니다:

```tsx
// 1. React 및 외부 라이브러리
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// 2. HMG Design System
import Button from '@hmg-fe/hmg-design-system/Button'
import Stack from '@hmg-fe/hmg-design-system/Stack'

// 3. 내부 컴포넌트 및 유틸리티
import { useAuth } from '@/contexts/AuthContext'
import { Permission } from '@/types/auth.types'
```

### 3. 컴포넌트 작성 규칙

**함수형 컴포넌트 사용:**
```tsx
// ✅ 권장
function MyComponent() {
  return <div>컴포넌트</div>
}

// ❌ 비권장
const MyComponent = () => {
  return <div>컴포넌트</div>
}
```

**Props 타입 정의:**
```tsx
interface MyComponentProps {
  title: string
  onSave?: () => void
}

function MyComponent({ title, onSave }: MyComponentProps) {
  return <div>{title}</div>
}
```

### 4. 파일 및 폴더 명명

- **컴포넌트 파일**: PascalCase (예: `ContentDetail.tsx`)
- **유틸리티 파일**: camelCase (예: `formatDate.ts`)
- **타입 파일**: `*.types.ts` 형식
- **Mock 파일**: `*.mock.ts` 형식
- **설정 파일**: `*.config.ts` 형식

---

## ⚠️ 주요 참고사항

### 1. HMG Design System 관련

#### ✅ 필수 체크리스트
- [ ] `main.tsx`에서 `@hmg-fe/hmg-design-system/css` import 확인
- [ ] `setConfig({ useDefaultHdsProps: true })` 호출 확인
- [ ] `HdsThemeProvider` 설정 확인
- [ ] 개별 컴포넌트 import 방식 사용 확인

#### ⚠️ 주의사항
- HDS 컴포넌트는 **반드시 개별 import** 사용 (트리 쉐이킹)
- `hdsProps`를 통해 디자인 시스템 전용 props 전달
- 내부 npm 레지스트리 설정 필요 (`.npmrc`)

### 2. 성능 관련

#### 최적화 팁
- 이미지 파일은 lazy loading 적용 권장
- 큰 데이터 목록은 가상화(virtualization) 고려
- 무거운 컴포넌트는 React.lazy로 코드 스플리팅

#### 번들 사이즈 모니터링
```bash
npm run build
# dist/ 폴더에서 생성된 청크 사이즈 확인
```

### 3. 권한 시스템 관련

#### 개발 시 확인사항
- 새 페이지 추가 시 `ProtectedRoute`로 감싸기
- 버튼/폼 등 민감한 UI는 `PermissionGate` 사용
- Mock 데이터의 권한 설정 확인 (`src/mocks/users.mock.ts`)

#### 권한 테스트
```tsx
// 다양한 권한 레벨로 테스트
// 1. 관리자 (모든 권한)
// 2. 협력사 (제한된 권한)
// 3. 미승인 사용자 (권한 없음)
```

### 4. 국제화 관련

#### 번역 추가 프로세스
1. `src/i18n/locales/ko.json`에 한국어 키 추가
2. `src/i18n/locales/en.json`에 영어 번역 추가
3. 컴포넌트에서 `t('키.경로')` 형태로 사용

#### 번역 키 네이밍 규칙
- 소문자 사용
- 점(`.`)으로 계층 구분
- 명확하고 설명적인 이름 사용
```json
{
  "feature.action.description": "번역 내용"
}
```

### 5. 배포 전 체크리스트

#### 필수 확인사항
- [ ] `npm run build` 성공 확인
- [ ] `npm run lint` 에러 없음 확인
- [ ] TypeScript 컴파일 에러 없음
- [ ] 모든 라우트에서 권한 체크 정상 작동
- [ ] 한국어/영어 번역 모두 적용 확인
- [ ] 빌드 결과물 사이즈 확인 (dist/ 폴더)

#### 성능 테스트
- [ ] 초기 로딩 시간 확인
- [ ] 페이지 전환 속도 확인
- [ ] 큰 목록 렌더링 성능 확인

---

## 📞 문의 및 지원

### 기술 지원
- **HMG Design System 문서**: 내부 문서 참조
- **프로젝트 이슈**: GitHub Issues 또는 내부 이슈 트래커

### 개발 환경 문제
1. **npm install 실패**
   - `.npmrc` 설정 확인
   - 내부 레지스트리 접근 권한 확인
   - 네트워크 연결 확인

2. **빌드 실패**
   - `node_modules` 삭제 후 재설치
   - TypeScript 에러 확인
   - Vite 캐시 삭제 (`node_modules/.vite`)

3. **HDS 컴포넌트 로드 실패**
   - `main.tsx`의 HDS 초기화 코드 확인
   - 개별 import 방식 사용 확인
   - 브라우저 콘솔 에러 확인

---

## 📚 추가 참고 자료

- **프로젝트 상세 가이드**: `CLAUDE.md`
- **TypeScript 설정**: `tsconfig.json`, `tsconfig.app.json`
- **Vite 설정**: `vite.config.ts`
- **ESLint 설정**: `eslint.config.js`

---

**문서 버전**: 1.0.0
**최종 수정**: 2026-01-22
