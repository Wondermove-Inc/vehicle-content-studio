# Vehicle Content Studio - 권한 시스템 문서

## 📋 목차

1. [개요](#개요)
2. [권한 레벨](#권한-레벨)
3. [권한 그룹](#권한-그룹)
4. [세부 권한 목록](#세부-권한-목록)
5. [테스트 계정](#테스트-계정)
6. [개발자 가이드](#개발자-가이드)
7. [API 레퍼런스](#api-레퍼런스)
8. [업데이트 히스토리](#업데이트-히스토리)

---

## 개요

Vehicle Content Studio는 L1~L5의 5단계 권한 레벨을 기반으로 한 역할 기반 접근 제어(RBAC) 시스템을 사용합니다. 각 권한 레벨은 3개의 그룹으로 분류되며, 30개 이상의 세부 권한으로 구성됩니다.

### 시스템 특징

- **계층적 권한 구조**: L1(최고 권한) ~ L5(제한된 권한)
- **그룹 기반 분류**: 업무 역할에 따른 3개 그룹 (관리/비즈니스/제작)
- **세밀한 권한 제어**: 30개 이상의 기능별 세부 권한
- **프로젝트 기반 접근 제어**: GROUP_3는 배정된 프로젝트만 접근 가능
- **Mock 기반 개발**: 백엔드 없이 프론트엔드 개발 가능

---

## 권한 레벨

### L1 - 관리자 (Administrator)

**대상**: 현대차 ICT / HAE
**권한 그룹**: GROUP_1

**주요 권한**:
- ✅ 시스템 모든 기능 접근
- ✅ 사용자 관리
- ✅ VCM 최초 업로드
- ✅ 프로젝트 생성/수정/삭제
- ✅ 어드민 메뉴 접근
- ✅ 시스템 설정

**제한 사항**: 없음

---

### L2 - 서비스 매니저 (Service Manager)

**대상**: 오앤오 / HAE
**권한 그룹**: GROUP_1

**주요 권한**:
- ✅ 모든 프로젝트 조회 및 관리
- ✅ 프로젝트 생성/수정
- ✅ 검수 피드백
- ✅ VCM 수정/삭제/다운로드
- ✅ 컨텐츠 관리 (전체)
- ✅ 팀 할당

**제한 사항**:
- ❌ VCM 최초 업로드 불가
- ❌ 프로젝트 삭제 불가
- ❌ 사용자 관리 불가
- ❌ 어드민 메뉴 접근 불가

---

### L3 - 비즈니스 유저 (Business User)

**대상**: HQ / RHQ / Market
**권한 그룹**: GROUP_2

**주요 권한**:
- ✅ 오픈 프로젝트 조회
- ✅ 최종 컨텐츠 다운로드
- ✅ 검수 피드백
- ✅ 제작팀 할당
- ✅ 상태 조회

**제한 사항**:
- ❌ 프로젝트 생성/수정/삭제 불가
- ❌ 컨텐츠 편집 불가
- ❌ VCM 업로드/수정/삭제 불가
- ❌ 컨텐츠 요청 메뉴 접근 불가

---

### L4 - 3D 모델러 (3D Modeler)

**대상**: 벤더
**권한 그룹**: GROUP_3

**주요 권한**:
- ✅ 배정된 프로젝트 조회
- ✅ 차량 형상 생성/수정/삭제
- ✅ 차량 형상 다운로드
- ✅ 검수 코멘트 확인
- ✅ VCM 다운로드

**제한 사항**:
- ❌ 배정되지 않은 프로젝트 접근 불가
- ❌ 프로젝트 생성/수정/삭제 불가
- ❌ 컨텐츠 생성/수정 불가
- ❌ 검수 요청 불가

---

### L5 - 컨텐츠 크리에이터 (Content Creator)

**대상**: 벤더
**권한 그룹**: GROUP_3

**주요 권한**:
- ✅ 배정된 프로젝트 조회
- ✅ 컨텐츠 생성/수정/삭제
- ✅ 컨텐츠 다운로드
- ✅ 검수 요청
- ✅ 검수 코멘트 확인
- ✅ VCM 다운로드

**제한 사항**:
- ❌ 배정되지 않은 프로젝트 접근 불가
- ❌ 프로젝트 생성/수정/삭제 불가
- ❌ 차량 형상 편집 불가

---

## 권한 그룹

### GROUP_1 (L1 + L2) - 관리자 그룹

**역할**: 전체 프로젝트 관리 및 검수

**특징**:
- 모든 프로젝트 조회 가능
- 프로젝트 생성/수정 권한
- 진행 상태 업데이트
- 검수 관련 기능
- L1만 프로젝트 삭제 및 어드민 메뉴 접근 가능

**사용 시나리오**:
- 프로젝트 전체 관리
- VCM 업로드 및 관리 (L1만 최초 업로드)
- 검수 승인/거부
- 팀 할당

---

### GROUP_2 (L3) - 비즈니스 유저 그룹

**역할**: 조회 및 다운로드 중심

**특징**:
- 읽기 전용 중심
- 모든 프로젝트 조회 (오픈 프로젝트)
- 최종 컨텐츠 다운로드
- 제작팀 할당
- 검수 피드백

**사용 시나리오**:
- 프로젝트 진행 상황 모니터링
- 최종 컨텐츠 다운로드
- 제작팀에 피드백 전달

---

### GROUP_3 (L4 + L5) - 제작 그룹

**역할**: 배정된 프로젝트의 제작

**특징**:
- **배정된 프로젝트만 조회 가능** (중요!)
- L4: 차량 형상 제작
- L5: 컨텐츠 제작
- 검수 코멘트 확인
- L5만 검수 요청 가능

**사용 시나리오**:
- 배정된 프로젝트의 3D 모델링 (L4)
- 배정된 프로젝트의 컨텐츠 제작 (L5)
- 검수 요청 및 피드백 확인

**프로젝트 배정**:
```typescript
// 사용자 객체에 assignedProjects 배열 포함
{
  assignedProjects: ['project-001', 'project-002']
}
```

---

## 세부 권한 목록

### 프로젝트 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `PROJECT_CREATE` | 프로젝트 생성 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `PROJECT_UPDATE` | 프로젝트 수정 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `PROJECT_DELETE` | 프로젝트 삭제 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `PROJECT_VIEW_ALL` | 모든 프로젝트 조회 | ✅ | ✅ | ✅ | ❌ | ❌ |
| `PROJECT_VIEW_ASSIGNED` | 배정된 프로젝트 조회 | ❌ | ❌ | ❌ | ✅ | ✅ |

### VCM 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `VCM_UPLOAD` | VCM 업로드 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `VCM_UPDATE` | VCM 수정 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `VCM_DELETE` | VCM 삭제 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `VCM_DOWNLOAD` | VCM 다운로드 | ✅ | ✅ | ✅ | ✅ | ✅ |

### 컨텐츠 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `CONTENT_CREATE` | 컨텐츠 생성 | ✅ | ✅ | ❌ | ❌ | ✅ |
| `CONTENT_UPDATE` | 컨텐츠 수정 | ✅ | ✅ | ❌ | ❌ | ✅ |
| `CONTENT_DELETE` | 컨텐츠 삭제 | ✅ | ✅ | ❌ | ❌ | ✅ |
| `CONTENT_VIEW` | 컨텐츠 조회 | ✅ | ✅ | ✅ | ✅ | ✅ |
| `CONTENT_DOWNLOAD` | 컨텐츠 다운로드 | ✅ | ✅ | ✅ | ❌ | ✅ |

### 차량 형상 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `VEHICLE_SHAPE_CREATE` | 차량 형상 생성 | ✅ | ✅ | ❌ | ✅ | ❌ |
| `VEHICLE_SHAPE_UPDATE` | 차량 형상 수정 | ✅ | ✅ | ❌ | ✅ | ❌ |
| `VEHICLE_SHAPE_DELETE` | 차량 형상 삭제 | ✅ | ✅ | ❌ | ✅ | ❌ |
| `VEHICLE_SHAPE_DOWNLOAD` | 차량 형상 다운로드 | ✅ | ✅ | ✅ | ✅ | ✅ |

### 검수 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `REVIEW_REQUEST` | 검수 요청 | ✅ | ✅ | ❌ | ❌ | ✅ |
| `REVIEW_SUBMIT` | 검수 제출 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `REVIEW_APPROVE` | 검수 승인 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `REVIEW_REJECT` | 검수 거부 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `REVIEW_FEEDBACK` | 검수 피드백 | ✅ | ✅ | ✅ | ✅ | ✅ |

### 상태 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `STATUS_UPDATE` | 상태 업데이트 | ✅ | ✅ | ❌ | ❌ | ❌ |
| `STATUS_VIEW` | 상태 조회 | ✅ | ✅ | ✅ | ✅ | ✅ |

### 팀 관리

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `TEAM_ASSIGN` | 팀 할당 | ✅ | ✅ | ✅ | ❌ | ❌ |
| `TEAM_VIEW` | 팀 조회 | ✅ | ✅ | ✅ | ✅ | ✅ |

### 시스템 관리 (어드민 전용)

| 권한 코드 | 설명 | L1 | L2 | L3 | L4 | L5 |
|----------|------|----|----|----|----|-----|
| `USER_MANAGE` | 사용자 관리 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `USER_VIEW` | 사용자 조회 | ✅ | ✅ | ✅ | ❌ | ❌ |
| `SYSTEM_SETTINGS` | 시스템 설정 | ✅ | ❌ | ❌ | ❌ | ❌ |
| `ADMIN_MENU_ACCESS` | 어드민 메뉴 접근 | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 테스트 계정

### GROUP_1 - 관리자

```
이메일: admin@company.com
비밀번호: admin123
권한 레벨: L1_ADMIN
권한 그룹: GROUP_1
조직: 현대자동차 ICT

접근 가능 메뉴:
✅ 프로젝트
✅ 컨텐츠 요청
✅ 어드민

주요 기능:
- 모든 프로젝트 조회
- 프로젝트 생성/수정/삭제
- VCM 업로드/수정/삭제
- 사용자 관리
- 시스템 설정
```

### GROUP_2 - 비즈니스 유저

```
이메일: business@company.com
비밀번호: business123
권한 레벨: L3_BUSINESS_USER
권한 그룹: GROUP_2
조직: HMG HQ

접근 가능 메뉴:
✅ 프로젝트
❌ 컨텐츠 요청 (숨김)
❌ 어드민 (숨김)

주요 기능:
- 모든 프로젝트 조회 (읽기 전용)
- 최종 컨텐츠 다운로드
- 검수 피드백
- 제작팀 할당
```

### GROUP_3 - 협력사 크리에이터

```
이메일: partner@company.com
비밀번호: partner123
권한 레벨: L5_CONTENT_CREATOR
권한 그룹: GROUP_3
조직: 벤더 파트너
배정된 프로젝트: project-001, project-002

접근 가능 메뉴:
✅ 프로젝트 (배정된 프로젝트만)
✅ 컨텐츠 요청
❌ 어드민 (숨김)

주요 기능:
- 배정된 프로젝트만 조회
- 컨텐츠 생성/수정/삭제
- 검수 요청
- 검수 피드백 확인
```

---

## 개발자 가이드

### 1. 권한 체크 방법

#### useAuth 훅 사용

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { Permission } from '@/types/auth.types'

function MyComponent() {
  const { hasPermission, canAccessProject } = useAuth()

  // 단일 권한 체크
  if (hasPermission(Permission.PROJECT_CREATE)) {
    // 프로젝트 생성 가능
  }

  // 프로젝트 접근 권한 체크
  if (canAccessProject('project-001')) {
    // 프로젝트 접근 가능
  }
}
```

#### PermissionGate 컴포넌트

```typescript
import PermissionGate from '@/components/PermissionGate'
import { Permission, PermissionLevel } from '@/types/auth.types'

// 권한으로 체크
<PermissionGate permissions={[Permission.PROJECT_CREATE]}>
  <Button>프로젝트 추가</Button>
</PermissionGate>

// 여러 권한 중 하나라도 있으면 표시
<PermissionGate anyPermission={[Permission.PROJECT_CREATE, Permission.CONTENT_CREATE]}>
  <Button>컨텐츠 요청</Button>
</PermissionGate>

// 권한 레벨로 체크
<PermissionGate levels={[PermissionLevel.L1_ADMIN]}>
  <MenuItem>어드민 메뉴</MenuItem>
</PermissionGate>

// 프로젝트 접근 권한 체크
<PermissionGate projectId={projectId}>
  <ContentEditor />
</PermissionGate>
```

#### ProtectedRoute 컴포넌트

```typescript
import ProtectedRoute from '@/components/ProtectedRoute'
import { Permission } from '@/types/auth.types'

// 라우팅 보호
<ProtectedRoute requiredPermissions={[Permission.PROJECT_CREATE]}>
  <ContentRequest />
</ProtectedRoute>

// 여러 권한 중 하나라도 있으면 접근 허용
<ProtectedRoute
  requiredAnyPermission={[Permission.PROJECT_VIEW_ALL, Permission.PROJECT_VIEW_ASSIGNED]}
>
  <Project />
</ProtectedRoute>
```

### 2. 프로젝트 필터링 (GROUP_3)

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { PermissionGroup } from '@/types/auth.types'

function ProjectList() {
  const { user, isInGroup } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // GROUP_3 사용자는 배정된 프로젝트만 필터링
    if (isInGroup(PermissionGroup.GROUP_3)) {
      const filteredProjects = allProjects.filter((project) =>
        user?.assignedProjects?.includes(project.id)
      )
      setProjects(filteredProjects)
    } else {
      // GROUP_1, GROUP_2는 모든 프로젝트
      setProjects(allProjects)
    }
  }, [user])

  return <ProjectTree projects={projects} />
}
```

### 3. 로그인/로그아웃

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password)
      navigate('/project')
    } catch (error) {
      console.error('로그인 실패:', error.message)
    }
  }
}

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
}
```

### 4. 새로운 권한 추가하기

#### Step 1: Permission enum에 추가

```typescript
// src/types/auth.types.ts
export enum Permission {
  // 기존 권한들...

  // 새로운 권한 추가
  NEW_FEATURE_ACCESS = 'NEW_FEATURE_ACCESS',
  NEW_FEATURE_EDIT = 'NEW_FEATURE_EDIT',
}
```

#### Step 2: 권한 매트릭스에 추가

```typescript
// src/config/permissions.config.ts
const L1_ADMIN_PERMISSIONS: Permission[] = [
  // 기존 권한들...
  Permission.NEW_FEATURE_ACCESS,
  Permission.NEW_FEATURE_EDIT,
]

const L2_SERVICE_MANAGER_PERMISSIONS: Permission[] = [
  // 기존 권한들...
  Permission.NEW_FEATURE_ACCESS,
  // Permission.NEW_FEATURE_EDIT, // L2는 편집 불가
]
```

#### Step 3: UI에서 사용

```typescript
<PermissionGate permissions={[Permission.NEW_FEATURE_ACCESS]}>
  <NewFeatureButton />
</PermissionGate>
```

---

## API 레퍼런스

### AuthContextType

```typescript
interface AuthContextType {
  // 상태
  user: User | null                    // 현재 로그인한 사용자
  isAuthenticated: boolean             // 인증 여부
  isLoading: boolean                   // 로딩 상태

  // 권한 체크 함수
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  canAccessProject: (projectId: string) => boolean
  isInGroup: (group: PermissionGroup) => boolean
  hasLevel: (level: PermissionLevel) => boolean

  // 인증 함수
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
```

### User Interface

```typescript
interface User {
  id: string                           // 사용자 ID
  email: string                        // 이메일
  name: string                         // 이름
  permissionLevel: PermissionLevel     // 권한 레벨
  permissionGroup: PermissionGroup     // 권한 그룹
  organization: string                 // 조직
  assignedProjects?: string[]          // 배정된 프로젝트 (GROUP_3만)
  createdAt?: string                   // 생성일
  lastLoginAt?: string                 // 마지막 로그인 일시
}
```

### PermissionGate Props

```typescript
interface PermissionGateProps {
  children: ReactNode
  permissions?: Permission[]           // 필요한 권한 (모두 필요)
  anyPermission?: Permission[]         // 필요한 권한 (하나 이상)
  groups?: PermissionGroup[]           // 필요한 그룹
  levels?: PermissionLevel[]           // 필요한 레벨
  projectId?: string                   // 프로젝트 접근 체크
  fallback?: ReactNode                 // 권한 없을 때 표시
}
```

### ProtectedRoute Props

```typescript
interface ProtectedRouteProps {
  children: ReactNode
  requiredPermissions?: Permission[]   // 필요한 권한 (모두 필요)
  requiredAnyPermission?: Permission[] // 필요한 권한 (하나 이상)
  requiredGroups?: PermissionGroup[]   // 필요한 그룹
  requiredLevels?: PermissionLevel[]   // 필요한 레벨
  fallback?: ReactNode                 // 권한 없을 때 표시
  redirectTo?: string                  // 리다이렉트 경로 (기본: '/')
}
```

---

## 업데이트 히스토리

### v1.0.0 (2026-01-21)

**초기 구현**

- ✅ 권한 시스템 타입 정의 (PermissionLevel, PermissionGroup, Permission)
- ✅ 3개 권한 그룹 (GROUP_1: L1+L2, GROUP_2: L3, GROUP_3: L4+L5)
- ✅ 권한 매트릭스 구성 (각 레벨별 30개 이상 세부 권한)
- ✅ AuthContext 및 Provider 구현 (전역 권한 상태 관리)
- ✅ ProtectedRoute 컴포넌트 (라우팅 보호)
- ✅ PermissionGate 컴포넌트 (UI 조건부 렌더링)
- ✅ Mock 사용자 데이터 (3개 테스트 계정)
- ✅ Login 페이지 인증 로직 연동
- ✅ Sidebar 메뉴 권한별 분기
- ✅ 사용자 정보 표시 및 로그아웃 기능

**파일 구조**:
```
src/
├── types/
│   └── auth.types.ts                 # 권한 시스템 타입 정의
├── config/
│   └── permissions.config.ts         # 권한 매트릭스
├── contexts/
│   └── AuthContext.tsx               # 인증 Context
├── components/
│   ├── ProtectedRoute.tsx            # 라우팅 보호
│   └── PermissionGate.tsx            # UI 조건부 렌더링
├── mocks/
│   └── users.mock.ts                 # Mock 사용자 데이터
└── pages/
    └── Login.tsx                     # 로그인 페이지
```

**커밋**: `45193fae` - feat: L1~L5 권한 레벨 기반 인증 시스템 구현

---

### 향후 계획

#### Phase 4 - 프로젝트 접근 제어 (예정)
- [ ] Project.tsx 프로젝트 목록 필터링 (GROUP_3 배정 프로젝트만)
- [ ] Project.tsx 버튼 권한 분기 (추가/삭제 등)
- [ ] ContentDetail.tsx 편집/삭제/검수 버튼 권한
- [ ] URL 직접 접근 차단

#### Phase 5 - 테스트 및 검증 (예정)
- [ ] 권한별 E2E 테스트
- [ ] 엣지 케이스 검증
- [ ] 문서화 완성

#### 백엔드 연동 대비 (향후)
- [ ] API 인증 토큰 시스템
- [ ] Refresh Token 관리
- [ ] 서버 기반 권한 검증
- [ ] 실시간 권한 업데이트

---

## 📞 문의

권한 시스템 관련 문의사항이나 개선 제안은 개발팀에 연락해주세요.

**업데이트 날짜**: 2026-01-21
**작성자**: Claude Sonnet 4.5
**버전**: 1.0.0
