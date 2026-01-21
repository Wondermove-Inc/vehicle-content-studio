/**
 * ProtectedRoute 컴포넌트
 * 라우팅 보호 및 권한 체크를 담당합니다.
 */

import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { Permission, PermissionGroup, PermissionLevel } from '@/types/auth.types'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Stack from '@hmg-fe/hmg-design-system/Stack'

/**
 * ProtectedRoute Props
 */
interface ProtectedRouteProps {
  children: ReactNode

  // 권한 요구사항 (하나만 지정 가능)
  requiredPermissions?: Permission[] // 필요한 권한 목록 (모두 보유해야 함)
  requiredAnyPermission?: Permission[] // 필요한 권한 목록 (하나 이상 보유)
  requiredGroups?: PermissionGroup[] // 필요한 그룹 목록
  requiredLevels?: PermissionLevel[] // 필요한 레벨 목록

  // 권한 없을 때 설정
  fallback?: ReactNode // 권한 없을 때 표시할 컴포넌트
  redirectTo?: string // 권한 없을 때 리다이렉트할 경로 (기본: '/login')
}

/**
 * ProtectedRoute 컴포넌트
 *
 * 사용 예시:
 * ```tsx
 * <ProtectedRoute requiredPermissions={[Permission.PROJECT_CREATE]}>
 *   <ContentRequest />
 * </ProtectedRoute>
 *
 * <ProtectedRoute requiredGroups={[PermissionGroup.GROUP_1]}>
 *   <AdminPanel />
 * </ProtectedRoute>
 *
 * <ProtectedRoute requiredLevels={[PermissionLevel.L1_ADMIN]}>
 *   <SystemSettings />
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({
  children,
  requiredPermissions,
  requiredAnyPermission,
  requiredGroups,
  requiredLevels,
  fallback,
  redirectTo = '/',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasAllPermissions, hasAnyPermission, isInGroup, hasLevel } =
    useAuth()

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography sx={{ fontSize: 15 }}>로딩 중...</Typography>
      </Box>
    )
  }

  // 미인증 사용자는 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // 권한 체크
  let hasRequiredPermission = true

  // 1. requiredPermissions 체크 (모두 보유)
  if (requiredPermissions && requiredPermissions.length > 0) {
    hasRequiredPermission = hasAllPermissions(requiredPermissions)
  }

  // 2. requiredAnyPermission 체크 (하나 이상 보유)
  if (requiredAnyPermission && requiredAnyPermission.length > 0) {
    hasRequiredPermission = hasAnyPermission(requiredAnyPermission)
  }

  // 3. requiredGroups 체크
  if (requiredGroups && requiredGroups.length > 0) {
    hasRequiredPermission = requiredGroups.some((group) => isInGroup(group))
  }

  // 4. requiredLevels 체크
  if (requiredLevels && requiredLevels.length > 0) {
    hasRequiredPermission = requiredLevels.some((level) => hasLevel(level))
  }

  // 권한이 없는 경우
  if (!hasRequiredPermission) {
    // fallback이 제공된 경우
    if (fallback) {
      return <>{fallback}</>
    }

    // 기본 에러 메시지 표시
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#D32F2F' }}>
            접근 권한이 없습니다
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.
          </Typography>
        </Stack>
      </Box>
    )
  }

  // 권한이 있는 경우 children 렌더링
  return <>{children}</>
}
