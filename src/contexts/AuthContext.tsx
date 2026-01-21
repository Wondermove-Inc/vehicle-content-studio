/**
 * 인증 및 권한 관리 Context
 * 전역 사용자 상태 및 권한 체크 로직을 제공합니다.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthContextType, Permission, PermissionGroup, PermissionLevel, User } from '@/types/auth.types'
import { PERMISSION_MATRIX } from '@/config/permissions.config'
import { mockLogin } from '@/mocks/users.mock'

// LocalStorage 키
const AUTH_STORAGE_KEY = 'vcs_auth_user'

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider Props
 */
interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider 컴포넌트
 * 앱 전체를 감싸서 인증 상태를 제공합니다.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 초기 로드 시 localStorage에서 사용자 정보 복원
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  /**
   * 로그인 처리
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true)
      // Mock 로그인 호출
      const loggedInUser = await mockLogin(email, password)

      // 상태 업데이트
      setUser(loggedInUser)

      // localStorage에 저장
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser))
    } catch (error) {
      // 에러는 상위에서 처리하도록 throw
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 로그아웃 처리
   */
  const logout = (): void => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  /**
   * 특정 권한 보유 여부 확인
   */
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false

    const permissionConfig = PERMISSION_MATRIX[user.permissionLevel]
    return permissionConfig.permissions.includes(permission)
  }

  /**
   * 여러 권한 중 하나라도 보유 여부 확인
   */
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false

    return permissions.some((permission) => hasPermission(permission))
  }

  /**
   * 여러 권한 모두 보유 여부 확인
   */
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false

    return permissions.every((permission) => hasPermission(permission))
  }

  /**
   * 프로젝트 접근 권한 확인
   * - GROUP_1, GROUP_2: 모든 프로젝트 접근 가능
   * - GROUP_3: 배정된 프로젝트만 접근 가능
   */
  const canAccessProject = (projectId: string): boolean => {
    if (!user) return false

    // GROUP_1, GROUP_2는 모든 프로젝트 접근 가능
    if (
      user.permissionGroup === PermissionGroup.GROUP_1 ||
      user.permissionGroup === PermissionGroup.GROUP_2
    ) {
      return true
    }

    // GROUP_3는 배정된 프로젝트만 접근 가능
    if (user.permissionGroup === PermissionGroup.GROUP_3) {
      return user.assignedProjects?.includes(projectId) ?? false
    }

    return false
  }

  /**
   * 특정 권한 그룹에 속하는지 확인
   */
  const isInGroup = (group: PermissionGroup): boolean => {
    if (!user) return false

    return user.permissionGroup === group
  }

  /**
   * 특정 권한 레벨인지 확인
   */
  const hasLevel = (level: PermissionLevel): boolean => {
    if (!user) return false

    return user.permissionLevel === level
  }

  // Context 값
  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessProject,
    isInGroup,
    hasLevel,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth 커스텀 훅
 * AuthContext를 쉽게 사용할 수 있도록 제공합니다.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
