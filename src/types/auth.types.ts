/**
 * 권한 시스템 타입 정의
 * Vehicle Content Studio - Authorization & Permission System
 */

/**
 * 권한 레벨 정의
 * - L1: 관리자
 * - L2: 서비스 매니저
 * - L3: 비즈니스 유저
 * - L4: 3D 모델러
 * - L5: 컨텐츠 크리에이터
 */
export enum PermissionLevel {
  L1_ADMIN = 'L1_ADMIN',
  L2_SERVICE_MANAGER = 'L2_SERVICE_MANAGER',
  L3_BUSINESS_USER = 'L3_BUSINESS_USER',
  L4_3D_MODELER = 'L4_3D_MODELER',
  L5_CONTENT_CREATOR = 'L5_CONTENT_CREATOR',
}

/**
 * 권한 그룹 정의
 * - GROUP_1: L1 + L2 (관리자 + 서비스 매니저) - 전체 프로젝트 관리 및 검수
 * - GROUP_2: L3 (비즈니스 유저) - 조회 및 다운로드 중심
 * - GROUP_3: L4 + L5 (3D 모델러 + 컨텐츠 크리에이터) - 배정된 프로젝트의 제작
 */
export enum PermissionGroup {
  GROUP_1 = 'GROUP_1', // L1 + L2
  GROUP_2 = 'GROUP_2', // L3
  GROUP_3 = 'GROUP_3', // L4 + L5
}

/**
 * 세부 기능 권한 정의
 */
export enum Permission {
  // 프로젝트 관리
  PROJECT_CREATE = 'PROJECT_CREATE',
  PROJECT_UPDATE = 'PROJECT_UPDATE',
  PROJECT_DELETE = 'PROJECT_DELETE',
  PROJECT_VIEW_ALL = 'PROJECT_VIEW_ALL',
  PROJECT_VIEW_ASSIGNED = 'PROJECT_VIEW_ASSIGNED',

  // VCM 관리
  VCM_UPLOAD = 'VCM_UPLOAD',
  VCM_UPDATE = 'VCM_UPDATE',
  VCM_DELETE = 'VCM_DELETE',
  VCM_DOWNLOAD = 'VCM_DOWNLOAD',

  // 컨텐츠 관리
  CONTENT_CREATE = 'CONTENT_CREATE',
  CONTENT_UPDATE = 'CONTENT_UPDATE',
  CONTENT_DELETE = 'CONTENT_DELETE',
  CONTENT_VIEW = 'CONTENT_VIEW',
  CONTENT_DOWNLOAD = 'CONTENT_DOWNLOAD',

  // 차량 형상 관리 (3D 모델)
  VEHICLE_SHAPE_CREATE = 'VEHICLE_SHAPE_CREATE',
  VEHICLE_SHAPE_UPDATE = 'VEHICLE_SHAPE_UPDATE',
  VEHICLE_SHAPE_DELETE = 'VEHICLE_SHAPE_DELETE',
  VEHICLE_SHAPE_DOWNLOAD = 'VEHICLE_SHAPE_DOWNLOAD',

  // 검수 관리
  REVIEW_REQUEST = 'REVIEW_REQUEST',
  REVIEW_SUBMIT = 'REVIEW_SUBMIT',
  REVIEW_APPROVE = 'REVIEW_APPROVE',
  REVIEW_REJECT = 'REVIEW_REJECT',
  REVIEW_FEEDBACK = 'REVIEW_FEEDBACK',

  // 상태 관리
  STATUS_UPDATE = 'STATUS_UPDATE',
  STATUS_VIEW = 'STATUS_VIEW',

  // 팀 관리
  TEAM_ASSIGN = 'TEAM_ASSIGN',
  TEAM_VIEW = 'TEAM_VIEW',

  // 사용자 관리 (어드민 전용)
  USER_MANAGE = 'USER_MANAGE',
  USER_VIEW = 'USER_VIEW',

  // 시스템 관리 (어드민 전용)
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS',
  ADMIN_MENU_ACCESS = 'ADMIN_MENU_ACCESS',
}

/**
 * 사용자 인터페이스
 */
export interface User {
  id: string
  email: string
  name: string
  permissionLevel: PermissionLevel
  permissionGroup: PermissionGroup
  organization: string
  assignedProjects?: string[] // GROUP_3 (L4, L5) 전용 - 배정된 프로젝트 ID 목록
  createdAt?: string
  lastLoginAt?: string
}

/**
 * 권한 설정 인터페이스
 */
export interface PermissionConfig {
  level: PermissionLevel
  group: PermissionGroup
  permissions: Permission[]
  description: string
}

/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답 인터페이스
 */
export interface LoginResponse {
  user: User
  accessToken?: string
  refreshToken?: string
}

/**
 * 인증 컨텍스트 인터페이스
 */
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

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
