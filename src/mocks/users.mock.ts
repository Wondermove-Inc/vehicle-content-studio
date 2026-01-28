/**
 * Mock 사용자 데이터
 * 개발 및 테스트용 사용자 계정
 */

import { PermissionGroup, PermissionLevel, User } from '@/types/auth.types'

/**
 * 테스트 사용자 계정 목록
 *
 * 5개의 테스트 계정:
 * 0. 미권한 (권한 요청 필요) - unknown@company.com
 * 1. GROUP_1 (L1 관리자) - admin@company.com
 * 2. GROUP_1 (L2 서비스 매니저) - manager@company.com
 * 3. GROUP_2 (L3 비즈니스 유저) - business@company.com
 * 4. GROUP_3 (L5 컨텐츠 크리에이터) - partner@company.com
 */
export const MOCK_USERS: User[] = [
  {
    id: 'user-000',
    email: 'unknown@company.com',
    name: '미권한 사용자',
    permissionLevel: PermissionLevel.UNAUTHORIZED,
    permissionGroup: null,
    organization: null,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: undefined,
    region: 'KR',
    company: '현대자동차',
    department: '사업부',
    position: '책임',
    phone: '010-1234-5678',
  },
  {
    id: 'user-001',
    email: 'admin@company.com',
    name: '관리자',
    permissionLevel: PermissionLevel.L1_ADMIN,
    permissionGroup: PermissionGroup.GROUP_1,
    organization: '현대차ICT/HAE',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-20T09:00:00Z',
  },
  {
    id: 'user-002',
    email: 'manager@company.com',
    name: '서비스 매니저',
    permissionLevel: PermissionLevel.L2_SERVICE_MANAGER,
    permissionGroup: PermissionGroup.GROUP_1,
    organization: '이노션/HAE',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-20T08:30:00Z',
  },
  {
    id: 'user-003',
    email: 'business@company.com',
    name: '비즈니스 유저',
    permissionLevel: PermissionLevel.L3_BUSINESS_USER,
    permissionGroup: PermissionGroup.GROUP_2,
    organization: 'HQ/RHQ/Market',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-19T14:30:00Z',
  },
  {
    id: 'user-004',
    email: 'partner@company.com',
    name: '협력사',
    permissionLevel: PermissionLevel.L5_CONTENT_CREATOR,
    permissionGroup: PermissionGroup.GROUP_3,
    organization: '협력사',
    assignedProjects: ['project-001', 'project-002'], // 배정된 프로젝트 ID 목록
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-20T10:15:00Z',
  },
]

/**
 * Mock 로그인 자격증명
 * 이메일: password 형태로 저장
 */
export const MOCK_CREDENTIALS: Record<string, string> = {
  'unknown@company.com': 'unknown123',
  'admin@company.com': 'admin123',
  'manager@company.com': 'manager123',
  'business@company.com': 'business123',
  'partner@company.com': 'partner123',
}

/**
 * 이메일로 사용자 찾기
 */
export function findUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find((user) => user.email === email)
}

/**
 * 로그인 자격증명 검증
 */
export function validateCredentials(email: string, password: string): boolean {
  return MOCK_CREDENTIALS[email] === password
}

/**
 * Mock 로그인 처리
 * 실제 API 호출을 시뮬레이션합니다.
 */
export async function mockLogin(email: string, password: string): Promise<User> {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 자격증명 검증
  if (!validateCredentials(email, password)) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  }

  // 사용자 찾기
  const user = findUserByEmail(email)
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.')
  }

  // 마지막 로그인 시간 업데이트
  user.lastLoginAt = new Date().toISOString()

  return user
}

/**
 * 사용자 ID로 사용자 찾기
 */
export function findUserById(userId: string): User | undefined {
  return MOCK_USERS.find((user) => user.id === userId)
}
