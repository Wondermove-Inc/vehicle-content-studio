/**
 * Mock 프로젝트 데이터
 * 개발 및 테스트용 프로젝트 샘플 데이터
 */

/**
 * 프로젝트 데이터 타입
 */
export interface ProjectData {
  id: number
  thumbnail?: string
  brand: string
  projectCode: string
  projectType: string
  contentType: string
  contentTypeColor: string
  derivative: string
  modifiedDate: string
  sop: string
  targetChannel: string
  activeChannels: string[]
  manager: string
  comments: number
}

/**
 * 샘플 프로젝트 목록
 */
export const MOCK_PROJECTS: ProjectData[] = [
  // 현대자동차 - CN7I(AL23)_HEV_25FMC (hev-25-fmc)
  {
    id: 1,
    thumbnail: '/images/car_01.png',
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_25FMC',
    projectType: 'FMC',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 2,
    thumbnail: '/images/car_02.png',
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_25FMC',
    projectType: 'FMC',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 3,
    thumbnail: '/images/car_03.png',
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_25FMC',
    projectType: 'FMC',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI'],
    manager: '박미현',
    comments: 3,
  },
  {
    id: 4,
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_25FMC',
    projectType: 'FMC',
    contentType: '',
    contentTypeColor: '',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12',
    targetChannel: 'WebCC',
    activeChannels: ['In-Store'],
    manager: '여하은',
    comments: 0,
  },
  // 현대자동차 - CN7I(AL23)_HEV_26MY (hev-26-my)
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '박미현',
    comments: 5,
  },
  {
    id: 6,
    brand: '현대자동차',
    projectCode: 'CN7I(AL23)_HEV_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06',
    targetChannel: 'WebCC',
    activeChannels: ['원웹'],
    manager: '박미현',
    comments: 2,
  },
  // 기아 - EV6_26MY (ev6-26-my)
  {
    id: 7,
    brand: '기아',
    projectCode: 'EV6_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '김지수',
    comments: 12,
  },
  {
    id: 8,
    brand: '기아',
    projectCode: 'EV6_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03',
    targetChannel: 'WebCC',
    activeChannels: ['원웹', 'IVI'],
    manager: '김지수',
    comments: 8,
  },
  {
    id: 9,
    brand: '기아',
    projectCode: 'EV6_26MY',
    projectType: 'MY',
    contentType: '',
    contentTypeColor: '',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '원웹'],
    manager: '김지수',
    comments: 0,
  },
  // 기아 - K8_25MY (k8-25-my)
  {
    id: 10,
    brand: '기아',
    projectCode: 'K8_25MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-08',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '이서연',
    comments: 6,
  },
  {
    id: 11,
    brand: '기아',
    projectCode: 'K8_25MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-08',
    targetChannel: 'WebCC',
    activeChannels: ['IVI', '기존 홈페이지'],
    manager: '이서연, 최민준',
    comments: 5,
  },
  // 제네시스 - GV80_26MY (gv80-26-my)
  {
    id: 12,
    brand: '제네시스',
    projectCode: 'GV80_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '정하늘',
    comments: 7,
  },
  {
    id: 13,
    brand: '제네시스',
    projectCode: 'GV80_26MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01',
    targetChannel: 'WebCC',
    activeChannels: ['원웹'],
    manager: '정하늘',
    comments: 4,
  },
  {
    id: 14,
    brand: '제네시스',
    projectCode: 'GV80_26MY',
    projectType: 'MY',
    contentType: '',
    contentTypeColor: '',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'In-Store'],
    manager: '정하늘',
    comments: 3,
  },
  // 제네시스 - G90_25MY (g90-25-my)
  {
    id: 15,
    brand: '제네시스',
    projectCode: 'G90_25MY',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-09',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '여하은',
    comments: 2,
  },
  {
    id: 16,
    brand: '제네시스',
    projectCode: 'G90_25MY',
    projectType: 'MY',
    contentType: '',
    contentTypeColor: '',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-09',
    targetChannel: 'WebCC',
    activeChannels: ['원웹', 'In-Store'],
    manager: '여하은',
    comments: 0,
  },
  // 기아 - EV6_25FMC (ev6-25-fmc)
  {
    id: 17,
    brand: '기아',
    projectCode: 'EV6_25FMC',
    projectType: 'FMC',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-11',
    targetChannel: 'WebCC',
    activeChannels: ['IVI', '원웹'],
    manager: '김지수, 정하늘',
    comments: 2,
  },
  {
    id: 18,
    brand: '제네시스',
    projectCode: 'GV70_26MY',
    projectType: 'MY',
    contentType: '',
    contentTypeColor: '',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '여하은, 박미현',
    comments: 0,
  },
  {
    id: 19,
    brand: '현대자동차',
    projectCode: 'SANTA_FE_25',
    projectType: 'FMC',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-10',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI'],
    manager: '최민준, 이서연',
    comments: 11,
  },
  {
    id: 20,
    brand: '기아',
    projectCode: 'SPORTAGE_26',
    projectType: 'MY',
    contentType: 'Beauty Angle Cut',
    contentTypeColor: '#8333E6',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-05',
    targetChannel: 'WebCC',
    activeChannels: ['원웹', '기존 홈페이지'],
    manager: '정하늘',
    comments: 6,
  },
]

/**
 * 프로젝트 ID와 이름 매핑
 * 트리뷰 및 네비게이션에서 사용
 */
export const PROJECT_NAMES: Record<string, string> = {
  'all': '전체 프로젝트',
  'hyundai': '현대자동차',
  'kia': '기아',
  'genesis': '제네시스',
  'cn7-0a25': 'CN7I(AL23)_HEV',
  'cn6-oa22': 'CN7I(AL23)_EV',
  'ev6-25': 'EV6',
  'k8-24': 'K8',
  'gv80-25': 'GV80',
  'g90-24': 'G90',
  'hev-27-my': 'CN7I(AL23)_HEV_27MY',
  'hev-26-my': 'CN7I(AL23)_HEV_26MY',
  'hev-25-fmc': 'CN7I(AL23)_HEV_25FMC',
  'ice-24-my': 'ICE_24_MY',
  'ice-23-my': 'ICE_23_MY',
  'ice-22-fl': 'ICE_22_FL',
  'ev6-27-my': 'EV6_27_MY',
  'ev6-26-my': 'EV6_26_MY',
  'ev6-25-fmc': 'EV6_25_FMC',
  'k8-26-my': 'K8_26_MY',
  'k8-25-my': 'K8_25_MY',
  'k8-24-fl': 'K8_24_FL',
  'gv80-27-my': 'GV80_27_MY',
  'gv80-26-my': 'GV80_26_MY',
  'gv80-25-fmc': 'GV80_25_FMC',
  'g90-26-my': 'G90_26_MY',
  'g90-25-my': 'G90_25_MY',
  'g90-24-fl': 'G90_24_FL',
}

/**
 * 프로젝트 코드 → 트리 아이템 ID 역매핑
 * 테이블에서 프로젝트 클릭 시 사용
 */
export const PROJECT_CODE_TO_TREE_ITEM: Record<string, string> = {
  'CN7I(AL23)_HEV_27MY': 'hev-27-my',
  'CN7I(AL23)_HEV_26MY': 'hev-26-my',
  'CN7I(AL23)_HEV_25FMC': 'hev-25-fmc',
  'CN7_ICE_24': 'ice-24-my',
  'CN7_ICE_23': 'ice-23-my',
  'CN7_ICE_22': 'ice-22-fl',
  'EV6_27MY': 'ev6-27-my',
  'EV6_26MY': 'ev6-26-my',
  'EV6_25FMC': 'ev6-25-fmc',
  'K8_26MY': 'k8-26-my',
  'K8_25MY': 'k8-25-my',
  'K8_24FL': 'k8-24-fl',
  'GV80_27MY': 'gv80-27-my',
  'GV80_26MY': 'gv80-26-my',
  'GV80_25FMC': 'gv80-25-fmc',
  'G90_26MY': 'g90-26-my',
  'G90_25MY': 'g90-25-my',
  'G90_24FL': 'g90-24-fl',
}

/**
 * 프로젝트 ID로 프로젝트 찾기
 */
export function findProjectById(projectId: number): ProjectData | undefined {
  return MOCK_PROJECTS.find((project) => project.id === projectId)
}

/**
 * 프로젝트 코드로 프로젝트 목록 찾기
 */
export function findProjectsByCode(projectCode: string): ProjectData[] {
  return MOCK_PROJECTS.filter((project) => project.projectCode === projectCode)
}

/**
 * 브랜드별 프로젝트 필터링
 */
export function findProjectsByBrand(brand: string): ProjectData[] {
  return MOCK_PROJECTS.filter((project) => project.brand === brand)
}

/**
 * 컨텐츠 타입별 프로젝트 필터링
 */
export function findProjectsByContentType(contentType: string): ProjectData[] {
  if (contentType === 'all' || contentType === '') {
    return MOCK_PROJECTS
  }
  return MOCK_PROJECTS.filter((project) => project.contentType === contentType)
}
