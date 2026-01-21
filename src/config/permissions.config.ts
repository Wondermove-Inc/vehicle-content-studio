/**
 * 권한 매트릭스 설정
 * 각 권한 레벨별로 허용되는 기능 권한을 정의합니다.
 */

import { Permission, PermissionConfig, PermissionGroup, PermissionLevel } from '@/types/auth.types'

/**
 * L1 - 관리자 권한
 * 대상: 현대차 ICT / HAE
 * 특징: 시스템 모든 기능 접근, 사용자 관리, VCM 최초 업로드
 */
const L1_ADMIN_PERMISSIONS: Permission[] = [
  // 프로젝트 관리 (전체)
  Permission.PROJECT_CREATE,
  Permission.PROJECT_UPDATE,
  Permission.PROJECT_DELETE,
  Permission.PROJECT_VIEW_ALL,

  // VCM 관리 (전체)
  Permission.VCM_UPLOAD,
  Permission.VCM_UPDATE,
  Permission.VCM_DELETE,
  Permission.VCM_DOWNLOAD,

  // 컨텐츠 관리 (전체)
  Permission.CONTENT_CREATE,
  Permission.CONTENT_UPDATE,
  Permission.CONTENT_DELETE,
  Permission.CONTENT_VIEW,
  Permission.CONTENT_DOWNLOAD,

  // 차량 형상 관리 (전체)
  Permission.VEHICLE_SHAPE_CREATE,
  Permission.VEHICLE_SHAPE_UPDATE,
  Permission.VEHICLE_SHAPE_DELETE,
  Permission.VEHICLE_SHAPE_DOWNLOAD,

  // 검수 관리 (전체)
  Permission.REVIEW_REQUEST,
  Permission.REVIEW_SUBMIT,
  Permission.REVIEW_APPROVE,
  Permission.REVIEW_REJECT,
  Permission.REVIEW_FEEDBACK,

  // 상태 관리
  Permission.STATUS_UPDATE,
  Permission.STATUS_VIEW,

  // 팀 관리
  Permission.TEAM_ASSIGN,
  Permission.TEAM_VIEW,

  // 사용자 관리 (어드민 전용)
  Permission.USER_MANAGE,
  Permission.USER_VIEW,

  // 시스템 관리 (어드민 전용)
  Permission.SYSTEM_SETTINGS,
  Permission.ADMIN_MENU_ACCESS,
]

/**
 * L2 - 서비스 매니저 권한
 * 대상: 오앤오 / HAE
 * 특징: 모든 프로젝트 조회 및 관리, 검수 피드백 (VCM 업로드, 프로젝트 삭제, 사용자 관리 제외)
 */
const L2_SERVICE_MANAGER_PERMISSIONS: Permission[] = [
  // 프로젝트 관리 (삭제 제외)
  Permission.PROJECT_CREATE,
  Permission.PROJECT_UPDATE,
  // Permission.PROJECT_DELETE, // 제한
  Permission.PROJECT_VIEW_ALL,

  // VCM 관리 (업로드 제외, 조회/수정만)
  // Permission.VCM_UPLOAD, // 제한
  Permission.VCM_UPDATE,
  Permission.VCM_DELETE,
  Permission.VCM_DOWNLOAD,

  // 컨텐츠 관리 (전체)
  Permission.CONTENT_CREATE,
  Permission.CONTENT_UPDATE,
  Permission.CONTENT_DELETE,
  Permission.CONTENT_VIEW,
  Permission.CONTENT_DOWNLOAD,

  // 차량 형상 관리 (전체)
  Permission.VEHICLE_SHAPE_CREATE,
  Permission.VEHICLE_SHAPE_UPDATE,
  Permission.VEHICLE_SHAPE_DELETE,
  Permission.VEHICLE_SHAPE_DOWNLOAD,

  // 검수 관리 (전체)
  Permission.REVIEW_REQUEST,
  Permission.REVIEW_SUBMIT,
  Permission.REVIEW_APPROVE,
  Permission.REVIEW_REJECT,
  Permission.REVIEW_FEEDBACK,

  // 상태 관리
  Permission.STATUS_UPDATE,
  Permission.STATUS_VIEW,

  // 팀 관리
  Permission.TEAM_ASSIGN,
  Permission.TEAM_VIEW,

  // 사용자 조회만
  Permission.USER_VIEW,

  // 시스템 관리 제한
  // Permission.USER_MANAGE, // 제한
  // Permission.SYSTEM_SETTINGS, // 제한
  // Permission.ADMIN_MENU_ACCESS, // 제한
]

/**
 * L3 - 비즈니스 유저 권한
 * 대상: HQ / RHQ / Market
 * 특징: 오픈 프로젝트 조회, 최종 컨텐츠 다운로드, 읽기 전용 중심
 */
const L3_BUSINESS_USER_PERMISSIONS: Permission[] = [
  // 프로젝트 조회만
  Permission.PROJECT_VIEW_ALL,

  // VCM 다운로드만
  Permission.VCM_DOWNLOAD,

  // 컨텐츠 조회 및 다운로드
  Permission.CONTENT_VIEW,
  Permission.CONTENT_DOWNLOAD,

  // 차량 형상 다운로드
  Permission.VEHICLE_SHAPE_DOWNLOAD,

  // 검수 피드백 (제한적)
  Permission.REVIEW_FEEDBACK,

  // 상태 조회
  Permission.STATUS_VIEW,

  // 팀 조회 및 할당
  Permission.TEAM_ASSIGN,
  Permission.TEAM_VIEW,

  // 사용자 조회
  Permission.USER_VIEW,
]

/**
 * L4 - 3D 모델러 권한
 * 대상: 벤더
 * 특징: 배정된 프로젝트의 차량 형상 제작, 검수 코멘트 확인
 */
const L4_3D_MODELER_PERMISSIONS: Permission[] = [
  // 프로젝트 조회 (배정된 프로젝트만)
  Permission.PROJECT_VIEW_ASSIGNED,

  // VCM 다운로드
  Permission.VCM_DOWNLOAD,

  // 컨텐츠 조회
  Permission.CONTENT_VIEW,

  // 차량 형상 관리 (배정된 프로젝트)
  Permission.VEHICLE_SHAPE_CREATE,
  Permission.VEHICLE_SHAPE_UPDATE,
  Permission.VEHICLE_SHAPE_DELETE,
  Permission.VEHICLE_SHAPE_DOWNLOAD,

  // 검수 코멘트 확인
  Permission.REVIEW_FEEDBACK,

  // 상태 조회
  Permission.STATUS_VIEW,

  // 팀 조회
  Permission.TEAM_VIEW,
]

/**
 * L5 - 컨텐츠 크리에이터 권한
 * 대상: 벤더
 * 특징: 배정된 프로젝트의 컨텐츠 제작, 검수 요청
 */
const L5_CONTENT_CREATOR_PERMISSIONS: Permission[] = [
  // 프로젝트 조회 (배정된 프로젝트만)
  Permission.PROJECT_VIEW_ASSIGNED,

  // VCM 다운로드
  Permission.VCM_DOWNLOAD,

  // 컨텐츠 관리 (배정된 프로젝트)
  Permission.CONTENT_CREATE,
  Permission.CONTENT_UPDATE,
  Permission.CONTENT_DELETE,
  Permission.CONTENT_VIEW,
  Permission.CONTENT_DOWNLOAD,

  // 차량 형상 조회
  Permission.VEHICLE_SHAPE_DOWNLOAD,

  // 검수 요청 및 코멘트 확인
  Permission.REVIEW_REQUEST,
  Permission.REVIEW_FEEDBACK,

  // 상태 조회
  Permission.STATUS_VIEW,

  // 팀 조회
  Permission.TEAM_VIEW,
]

/**
 * 권한 레벨별 권한 매트릭스
 */
export const PERMISSION_MATRIX: Record<PermissionLevel, PermissionConfig> = {
  [PermissionLevel.L1_ADMIN]: {
    level: PermissionLevel.L1_ADMIN,
    group: PermissionGroup.GROUP_1,
    permissions: L1_ADMIN_PERMISSIONS,
    description: '관리자 - 시스템 모든 기능 접근, 사용자 관리, VCM 최초 업로드',
  },
  [PermissionLevel.L2_SERVICE_MANAGER]: {
    level: PermissionLevel.L2_SERVICE_MANAGER,
    group: PermissionGroup.GROUP_1,
    permissions: L2_SERVICE_MANAGER_PERMISSIONS,
    description: '서비스 매니저 - 모든 프로젝트 조회 및 관리, 검수 피드백 (VCM 업로드, 프로젝트 삭제 제외)',
  },
  [PermissionLevel.L3_BUSINESS_USER]: {
    level: PermissionLevel.L3_BUSINESS_USER,
    group: PermissionGroup.GROUP_2,
    permissions: L3_BUSINESS_USER_PERMISSIONS,
    description: '비즈니스 유저 - 오픈 프로젝트 조회, 최종 컨텐츠 다운로드',
  },
  [PermissionLevel.L4_3D_MODELER]: {
    level: PermissionLevel.L4_3D_MODELER,
    group: PermissionGroup.GROUP_3,
    permissions: L4_3D_MODELER_PERMISSIONS,
    description: '3D 모델러 - 배정된 프로젝트의 차량 형상 제작',
  },
  [PermissionLevel.L5_CONTENT_CREATOR]: {
    level: PermissionLevel.L5_CONTENT_CREATOR,
    group: PermissionGroup.GROUP_3,
    permissions: L5_CONTENT_CREATOR_PERMISSIONS,
    description: '컨텐츠 크리에이터 - 배정된 프로젝트의 컨텐츠 제작, 검수 요청',
  },
}

/**
 * 권한 그룹별 권한 레벨 매핑
 */
export const GROUP_TO_LEVELS: Record<PermissionGroup, PermissionLevel[]> = {
  [PermissionGroup.GROUP_1]: [PermissionLevel.L1_ADMIN, PermissionLevel.L2_SERVICE_MANAGER],
  [PermissionGroup.GROUP_2]: [PermissionLevel.L3_BUSINESS_USER],
  [PermissionGroup.GROUP_3]: [PermissionLevel.L4_3D_MODELER, PermissionLevel.L5_CONTENT_CREATOR],
}

/**
 * 권한 레벨에서 그룹 가져오기
 */
export function getGroupFromLevel(level: PermissionLevel): PermissionGroup {
  return PERMISSION_MATRIX[level].group
}

/**
 * 특정 권한을 가진 레벨 목록 가져오기
 */
export function getLevelsWithPermission(permission: Permission): PermissionLevel[] {
  return Object.entries(PERMISSION_MATRIX)
    .filter(([, config]) => config.permissions.includes(permission))
    .map(([level]) => level as PermissionLevel)
}
