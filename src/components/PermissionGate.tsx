/**
 * PermissionGate 컴포넌트
 * UI 조건부 렌더링을 위한 권한 게이트
 */

import { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Permission, PermissionGroup, PermissionLevel } from '@/types/auth.types'

/**
 * PermissionGate Props
 */
interface PermissionGateProps {
  children: ReactNode

  // 권한 요구사항 (하나만 지정 가능)
  permissions?: Permission[] // 필요한 권한 목록 (모두 보유해야 함)
  anyPermission?: Permission[] // 필요한 권한 목록 (하나 이상 보유)
  groups?: PermissionGroup[] // 필요한 그룹 목록
  levels?: PermissionLevel[] // 필요한 레벨 목록

  // 프로젝트 접근 체크 (선택사항)
  projectId?: string // 특정 프로젝트 접근 권한 체크

  // 권한 없을 때 표시할 내용 (선택사항)
  fallback?: ReactNode
}

/**
 * PermissionGate 컴포넌트
 *
 * 권한에 따라 UI 요소를 조건부로 렌더링합니다.
 *
 * 사용 예시:
 * ```tsx
 * <PermissionGate permissions={[Permission.PROJECT_CREATE]}>
 *   <Button>프로젝트 추가</Button>
 * </PermissionGate>
 *
 * <PermissionGate levels={[PermissionLevel.L1_ADMIN]}>
 *   <MenuItem>어드민 메뉴</MenuItem>
 * </PermissionGate>
 *
 * <PermissionGate groups={[PermissionGroup.GROUP_1]}>
 *   <Button>검수 승인</Button>
 * </PermissionGate>
 *
 * <PermissionGate projectId={projectId} fallback={<Typography>접근 불가</Typography>}>
 *   <ContentEditor />
 * </PermissionGate>
 * ```
 */
export default function PermissionGate({
  children,
  permissions,
  anyPermission,
  groups,
  levels,
  projectId,
  fallback = null,
}: PermissionGateProps) {
  const {
    isAuthenticated,
    hasAllPermissions,
    hasAnyPermission,
    isInGroup,
    hasLevel,
    canAccessProject,
  } = useAuth()

  // 미인증 사용자는 항상 fallback
  if (!isAuthenticated) {
    return <>{fallback}</>
  }

  // 권한 체크
  let hasRequiredPermission = true

  // 1. permissions 체크 (모두 보유)
  if (permissions && permissions.length > 0) {
    hasRequiredPermission = hasAllPermissions(permissions)
  }

  // 2. anyPermission 체크 (하나 이상 보유)
  if (anyPermission && anyPermission.length > 0) {
    hasRequiredPermission = hasAnyPermission(anyPermission)
  }

  // 3. groups 체크
  if (groups && groups.length > 0) {
    hasRequiredPermission = groups.some((group) => isInGroup(group))
  }

  // 4. levels 체크
  if (levels && levels.length > 0) {
    hasRequiredPermission = levels.some((level) => hasLevel(level))
  }

  // 5. projectId 체크 (프로젝트 접근 권한)
  if (projectId) {
    hasRequiredPermission = canAccessProject(projectId)
  }

  // 권한이 있으면 children, 없으면 fallback
  return <>{hasRequiredPermission ? children : fallback}</>
}
