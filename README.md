# Vehicle Content Studio

현대자동차그룹(HMG)의 차량 컨텐츠 관리 시스템

## 📋 프로젝트 개요

Vehicle Content Studio는 현대자동차그룹의 차량 이미지 및 컨텐츠를 효율적으로 관리하기 위한 웹 기반 플랫폼입니다. 멀티 브랜드(현대/기아/제네시스)와 다양한 채널(원앱/원웹/IVI/In-Store)의 차량 컨텐츠를 통합 관리합니다.

## ✨ 주요 기능

### 권한 시스템
- **5단계 권한 레벨** (L1~L5)
  - L1: 관리자 (시스템 전체 관리)
  - L2: 서비스 매니저 (프로젝트 관리 및 검수)
  - L3: 비즈니스 유저 (조회 및 다운로드)
  - L4: 3D 모델러 (차량 형상 제작)
  - L5: 컨텐츠 크리에이터 (컨텐츠 제작)
- **3개 권한 그룹** (관리/비즈니스/제작)
- **30개 이상의 세부 권한**으로 세밀한 접근 제어

### 컨텐츠 관리
- 프로젝트 기반 컨텐츠 구조
- VCM, Web CC, 2D 360, PI 등 다양한 컨텐츠 타입 지원
- 멀티 브랜드 및 멀티 채널 지원
- 실시간 검수 워크플로우

### 이미지 프리뷰
- 고급 줌 및 드래그 기능
- 네비게이션 및 정보 패널
- 반응형 이미지 뷰어

## 🛠 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 및 개발 서버
- **React Router v7** - 라우팅
- **HMG Design System** - UI 컴포넌트 라이브러리
- **Emotion** - CSS-in-JS 스타일링
- **react-i18next** - 국제화 (한국어/영어)

### Development Tools
- **ESLint** - 코드 품질 관리
- **TypeScript ESLint** - TS 린팅
- **Vite PWA** - 프로그레시브 웹 앱

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn
- HMG 내부 npm 레지스트리 접근 권한 (`.npmrc` 설정 필요)

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
vehicle-content-studio/
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── PermissionGate.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Sidebar.tsx
│   ├── config/              # 설정 파일
│   │   └── permissions.config.ts
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx
│   ├── i18n/                # 국제화 설정
│   │   ├── config.ts
│   │   └── locales/
│   ├── mocks/               # Mock 데이터
│   │   └── users.mock.ts
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Login.tsx
│   │   ├── Project.tsx
│   │   ├── ContentDetail.tsx
│   │   ├── ContentRequest.tsx
│   │   └── Preview.tsx
│   ├── types/               # TypeScript 타입
│   │   └── auth.types.ts
│   └── main.tsx             # 앱 진입점
├── docs/                    # 프로젝트 문서
│   └── PERMISSION_SYSTEM.md
├── public/                  # 정적 파일
├── CLAUDE.md                # Claude Code 가이드
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📚 문서

- **[CLAUDE.md](./CLAUDE.md)** - Claude Code 개발 가이드
- **[권한 시스템 문서](./docs/PERMISSION_SYSTEM.md)** - 권한 시스템 상세 설명 및 API 레퍼런스

## 🔐 테스트 계정

개발 및 테스트용 계정 정보:

| 레벨 | 이메일 | 비밀번호 | 역할 | 조직 |
|------|--------|----------|------|------|
| L1 | admin@company.com | admin123 | 관리자 | 현대차ICT/HAE |
| L2 | manager@company.com | manager123 | 서비스 매니저 | 이노션/HAE |
| L3 | business@company.com | business123 | 비즈니스 유저 | HQ/RHQ/Market |
| L4+L5 | partner@company.com | partner123 | 협력사 | 협력사 |

> 자세한 권한 정보는 [권한 시스템 문서](./docs/PERMISSION_SYSTEM.md)를 참고하세요.

## 🌐 지원 브랜드 및 채널

### 브랜드
- 현대자동차 (Hyundai)
- 기아 (Kia)
- 제네시스 (Genesis)

### 채널
- 원앱 (One App)
- 원웹 (One Web)
- IVI (In-Vehicle Infotainment)
- In-Store
- 기존 홈페이지 (Legacy Web)

## 🎨 HMG Design System

이 프로젝트는 HMG Design System을 사용합니다:

```typescript
// 개별 컴포넌트 import 방식 사용 (트리 쉐이킹 최적화)
import Button from '@hmg-fe/hmg-design-system/Button'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
```

**주의사항**: 전체 import (`import { Button } from '@hmg-fe/hmg-design-system'`)는 번들 크기를 증가시키므로 사용하지 않습니다.

## 🔧 개발 가이드

### 권한 체크

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { Permission } from '@/types/auth.types'

function MyComponent() {
  const { hasPermission } = useAuth()

  if (hasPermission(Permission.PROJECT_CREATE)) {
    // 프로젝트 생성 가능
  }
}
```

### UI 조건부 렌더링

```typescript
import PermissionGate from '@/components/PermissionGate'
import { Permission } from '@/types/auth.types'

<PermissionGate permissions={[Permission.PROJECT_CREATE]}>
  <Button>프로젝트 추가</Button>
</PermissionGate>
```

### 라우트 보호

```typescript
import ProtectedRoute from '@/components/ProtectedRoute'
import { Permission } from '@/types/auth.types'

<ProtectedRoute requiredPermissions={[Permission.PROJECT_CREATE]}>
  <ContentRequest />
</ProtectedRoute>
```

## 📝 라이선스

Copyright © 2024 Hyundai Motor Group. All rights reserved.

---

**개발**: Wondermove Inc.
**버전**: 1.0.4
**최종 업데이트**: 2026-01-23
