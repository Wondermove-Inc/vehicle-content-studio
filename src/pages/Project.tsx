import { useState } from 'react'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import Tabs from '@hmg-fe/hmg-design-system/Tabs'
import Tab from '@hmg-fe/hmg-design-system/Tab'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { SimpleTreeView, TreeItem, Badge, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, TablePagination } from '@hmg-fe/hmg-design-system'
import {
  Ic_folder_filled,
  Ic_file_filled,
  Ic_person_filled,
  Ic_alarm_filled,
  Ic_setting_filled,
  Ic_search_regular,
  Ic_plus_regular,
  Ic_menu_regular,
  Ic_arrow_forward_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

// 사이드바 메뉴 아이템 컴포넌트
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  badge?: number
  onClick?: () => void
}

function SidebarItem({ icon, label, isActive, badge, onClick }: SidebarItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#E9EAEC' : 'transparent',
        '&:hover': {
          backgroundColor: isActive ? '#E9EAEC' : '#F5F5F5',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 24 }}>
        {icon}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: 15,
          fontWeight: 700,
          lineHeight: '22px',
          color: isActive ? '#111111' : 'var(--on_surface_high)',
        }}
      >
        {label}
      </Typography>
      {badge !== undefined && badge > 0 && (
        <Badge hdsProps={{ size: 'small', style: 'error', isDigit: true }}>{badge}</Badge>
      )}
    </Box>
  )
}


// 사이드바 그룹 라벨 컴포넌트
interface SidebarGroupLabelProps {
  label: string
  count?: number
}

function SidebarGroupLabel({ label, count }: SidebarGroupLabelProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        marginBottom: '4px',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '18px',
          color: '#0A0A0A',
        }}
      >
        {label}
      </Typography>
      {count !== undefined && (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22px',
            color: '#111111',
          }}
        >
          {count}
        </Typography>
      )}
    </Box>
  )
}

// 테이블 데이터 타입
interface ProjectData {
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

// 샘플 데이터
const sampleProjects: ProjectData[] = [
  {
    id: 1,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 2,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 3,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 4,
    brand: '현대자동차',
    projectCode: 'DO 23_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'DO 23_25',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['IVI', '원웹'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 6,
    brand: '현대자동차',
    projectCode: 'NE 25MY FMC',
    projectType: 'MY',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원웹'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 7,
    brand: '기아',
    projectCode: 'CN7_HEV_25',
    projectType: 'MY',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '원웹'],
    manager: '박미현',
    comments: 0,
  },
  {
    id: 8,
    brand: '제네시스',
    projectCode: 'CN7_HEV_25_27',
    projectType: 'FMC',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 0,
  },
  {
    id: 9,
    brand: '기아',
    projectCode: 'EV6_26MY',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'GT-Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03-15',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '김지수',
    comments: 12,
  },
  {
    id: 10,
    brand: '기아',
    projectCode: 'K8_25MY',
    projectType: 'FMC',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-08-20',
    targetChannel: 'WebCC',
    activeChannels: ['IVI', '기존 홈페이지'],
    manager: '이서연, 최민준',
    comments: 5,
  },
  {
    id: 11,
    brand: '제네시스',
    projectCode: 'GV80_26MY',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01-10',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'In-Store'],
    manager: '정하늘',
    comments: 3,
  },
  {
    id: 12,
    brand: '현대자동차',
    projectCode: 'IONIQ6_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'Long Range',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-05-22',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'IVI'],
    manager: '박미현, 김지수',
    comments: 15,
  },
  {
    id: 13,
    brand: '제네시스',
    projectCode: 'G90_25FL',
    projectType: 'FL',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-09-30',
    targetChannel: 'WebCC',
    activeChannels: ['원웹', 'In-Store'],
    manager: '여하은',
    comments: 0,
  },
  {
    id: 14,
    brand: '기아',
    projectCode: 'SORENTO_26',
    projectType: 'FMC',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'Hybrid',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-02-28',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '원웹'],
    manager: '최민준',
    comments: 7,
  },
  {
    id: 15,
    brand: '현대자동차',
    projectCode: 'TUCSON_25MY',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-07-15',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '박미현',
    comments: 4,
  },
  {
    id: 16,
    brand: '현대자동차',
    projectCode: 'PALISADE_26',
    projectType: 'FMC',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: 'Calligraphy',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-04-10',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'In-Store', '기존 홈페이지'],
    manager: '이서연',
    comments: 9,
  },
  {
    id: 17,
    brand: '기아',
    projectCode: 'CARNIVAL_25',
    projectType: 'FL',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'Hi-Limousine',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-11-05',
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
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'Sport',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06-20',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'Hybrid',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-10-18',
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
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: 'X-Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-05-12',
    targetChannel: 'WebCC',
    activeChannels: ['원웹', '기존 홈페이지'],
    manager: '정하늘',
    comments: 6,
  },
]

// 프로젝트 ID와 이름 매핑
const projectNames: Record<string, string> = {
  'all': '전체 프로젝트',
  'hyundai': '현대자동차',
  'kia': '기아',
  'genesis': '제네시스',
  'cn7-0a25': 'CN7',
  'cn7-oa22': 'CN7',
  'ev6-25': 'EV6',
  'k8-24': 'K8',
  'gv80-25': 'GV80',
  'g90-24': 'G90',
  'hev-27-my': 'HEV_27_MY',
  'hev-26-my': 'HEV_26_MY',
  'hev-25-fmc': 'HEV_25_FMC',
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

// 부모 ID 매핑
const parentMap: Record<string, string> = {
  'hyundai': 'all',
  'kia': 'all',
  'genesis': 'all',
  'cn7-0a25': 'hyundai',
  'cn7-oa22': 'hyundai',
  'ev6-25': 'kia',
  'k8-24': 'kia',
  'gv80-25': 'genesis',
  'g90-24': 'genesis',
  'hev-27-my': 'cn7-0a25',
  'hev-26-my': 'cn7-0a25',
  'hev-25-fmc': 'cn7-0a25',
  'ice-24-my': 'cn7-oa22',
  'ice-23-my': 'cn7-oa22',
  'ice-22-fl': 'cn7-oa22',
  'ev6-27-my': 'ev6-25',
  'ev6-26-my': 'ev6-25',
  'ev6-25-fmc': 'ev6-25',
  'k8-26-my': 'k8-24',
  'k8-25-my': 'k8-24',
  'k8-24-fl': 'k8-24',
  'gv80-27-my': 'gv80-25',
  'gv80-26-my': 'gv80-25',
  'gv80-25-fmc': 'gv80-25',
  'g90-26-my': 'g90-24',
  'g90-25-my': 'g90-24',
  'g90-24-fl': 'g90-24',
}

// 2뎁스 항목 (선택 불가, 경로에서 생략)
const depth2Items = ['cn7-0a25', 'cn7-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']

// 썸네일 이미지 목록
const thumbnailImages = [
  '/images/thumbnails/car_01.png',
  '/images/thumbnails/car_02.png',
  '/images/thumbnails/car_03.png',
  '/images/thumbnails/car_04.png',
  '/images/thumbnails/car_05.png',
]

// 경로 생성 함수
function getBreadcrumb(projectId: string | null): { id: string; name: string }[] {
  if (!projectId || projectId === 'all') {
    return [{ id: 'all', name: '프로젝트' }]
  }

  const path: { id: string; name: string }[] = [{ id: 'all', name: '프로젝트' }]
  const ancestors: string[] = []

  let current = projectId
  while (current && current !== 'all') {
    ancestors.unshift(current)
    current = parentMap[current]
  }

  for (const id of ancestors) {
    // 2뎁스 항목은 경로에서 생략
    if (!depth2Items.includes(id)) {
      path.push({ id, name: projectNames[id] || id })
    }
  }

  return path
}

function Project() {
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [activeTab, setActiveTab] = useState('컨텐츠')
  const [contentType, setContentType] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>('all')
  const [sopSortOrder, setSopSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeChannelWidth, setActiveChannelWidth] = useState(120)

  const breadcrumb = getBreadcrumb(selectedProject)

  const sortedProjects = [...sampleProjects].sort((a, b) => {
    if (!sopSortOrder) return 0
    const dateA = new Date(a.sop).getTime()
    const dateB = new Date(b.sop).getTime()
    return sopSortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })

  const paginatedProjects = sortedProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleSopSort = () => {
    setSopSortOrder(prev => {
      if (prev === null) return 'asc'
      if (prev === 'asc') return 'desc'
      return null
    })
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = activeChannelWidth

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(60, startWidth + (moveEvent.clientX - startX))
      setActiveChannelWidth(newWidth)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#F5F5F5',
      }}
    >
      {/* 사이드바 */}
      <Box
        sx={{
          width: '260px',
          height: '100%',
          backgroundColor: 'var(--surface_container_lowest)',
          borderRight: '1px solid var(--outline)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: '26px',
              color: '#0A0A0A',
            }}
          >
            HMG System
          </Typography>
          <Box sx={{ cursor: 'pointer' }}>
            <Ic_menu_regular size="20px" color="#1E1E1E" />
          </Box>
        </Box>

        {/* 메뉴 그룹 1 - 프로젝트 및 컨텐츠 */}
        <Box sx={{ padding: '0 16px', paddingTop: '0', paddingBottom: '8px' }}>
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_folder_filled size="20px" color="#111111" />}
              label="프로젝트"
              isActive={true}
              onClick={() => setActiveMenu('프로젝트')}
            />
            <SidebarItem
              icon={<Ic_file_filled size="20px" color="var(--surface_highest)" />}
              label="컨텐츠 요청"
              onClick={() => setActiveMenu('컨텐츠 요청')}
            />
            <SidebarItem
              icon={<Ic_person_filled size="20px" color="var(--surface_highest)" />}
              label="어드민"
              onClick={() => setActiveMenu('어드민')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: '0 16px' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 메뉴 그룹 2 */}
        <Box sx={{ padding: '8px 16px' }}>
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_setting_filled size="20px" color="var(--surface_highest)" />}
              label="설정"
              onClick={() => setActiveMenu('설정')}
            />
            <SidebarItem
              icon={<Ic_alarm_filled size="20px" color="var(--surface_highest)" />}
              label="알림"
              badge={14}
              onClick={() => setActiveMenu('알림')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: '0 16px' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 즐겨찾기 섹션 */}
        <Box sx={{ flex: 1, padding: '8px 16px', overflowY: 'auto' }}>
          <SimpleTreeView
            hdsProps={{ size: 'medium', type: 'line' }}
            defaultExpandedItems={['favorites']}
          >
            <TreeItem itemId="favorites" label="즐겨찾기" hdsProps={{ type: 'default' }}>
              <TreeItem itemId="fav-1" label="26MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-2" label="27MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-3" label="28MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-4" label="29MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-5" label="29MY FMC Web CC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-6" label="29MY FMC VCM" hdsProps={{ type: 'default' }} />
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: 'calc(100% - 260px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 16px 16px 0',
          gap: '10px',
          overflow: 'visible',
          backgroundColor: 'var(--surface_container_lowest)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            minWidth: 0,
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.02)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 헤더 영역 */}
          <Box
            sx={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
              padding: '20px 20px 16px 24px',
              borderBottom: '1px solid var(--outline)',
              flexShrink: 0,
            }}
          >
            {/* 첫 번째 행: 제목 + 버튼 */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {breadcrumb.map((item, index) => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {index > 0 && (
                      <Ic_arrow_forward_regular size="20px" color="var(--on_surface_mid)" />
                    )}
                    <Typography
                      onClick={() => setSelectedProject(item.id)}
                      sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: '36px',
                        color: index === breadcrumb.length - 1 ? '#0A0A0A' : '#6B6B6B',
                        cursor: index === breadcrumb.length - 1 ? 'default' : 'pointer',
                        '&:hover': {
                          textDecoration: index === breadcrumb.length - 1 ? 'none' : 'underline',
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                hdsProps={{ size: 'medium', style: 'strong', type: 'fill', icon: <Ic_plus_regular size="16px" color="#fff" /> }}
                sx={{
                  flexShrink: 0,
                }}
              >
                프로젝트 추가하기
              </Button>
            </Box>
          </Box>

          {/* 메인 영역 */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* 좌측 패널 - 프로젝트 트리 */}
            <Box
              sx={{
                width: '260px',
                borderRight: '1px solid var(--outline)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              {/* 검색 필드 + 트리 영역 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '16px 0 20px 20px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    overflowY: 'auto',
                    paddingRight: '20px',
                  }}
                >
                {/* 검색 필드 */}
                <TextField
                  hdsProps={{ size: 'medium' }}
                  placeholder="프로젝트 검색"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Ic_search_regular size="16px" color="#949494" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* 프로젝트 트리 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 전체 프로젝트 */}
                  <Box
                    onClick={() => setSelectedProject('all')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '38px',
                      padding: '0 10px',
                      backgroundColor: selectedProject === 'all' ? '#F5F5F5' : 'transparent',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: selectedProject === 'all' ? '#F5F5F5' : '#FAFAFA',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: '22px',
                        color: '#111111',
                      }}
                    >
                      전체 프로젝트 (20)
                    </Typography>
                  </Box>

                  {/* 트리 뷰 */}
                  <SimpleTreeView
                    hdsProps={{ size: 'medium', type: 'line' }}
                    defaultExpandedItems={['hyundai', 'cn7-0a25', 'cn7-oa22', 'kia', 'ev6-25', 'k8-24', 'genesis', 'gv80-25', 'g90-24']}
                    selectedItems={selectedProject === 'all' ? '' : (selectedProject || '')}
                    onSelectedItemsChange={(_, itemId) => {
                      if (itemId) {
                        const id = itemId as string
                        // 2뎁스 아이템은 선택하지 않고 부모(1뎁스)를 선택
                        const depth2Items = ['cn7-0a25', 'cn7-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
                        if (depth2Items.includes(id)) {
                          // 부모 찾기
                          if (id.startsWith('cn7')) setSelectedProject('hyundai')
                          else if (id.startsWith('ev6') || id.startsWith('k8')) setSelectedProject('kia')
                          else if (id.startsWith('gv80') || id.startsWith('g90')) setSelectedProject('genesis')
                        } else {
                          setSelectedProject(id)
                        }
                      }
                    }}
                    sx={{
                      '& .MuiTreeItem-content': {
                        height: '34px',
                        minHeight: '34px',
                        alignItems: 'center',
                      },
                      '& .MuiTreeItem-group': {
                        marginLeft: '12px',
                      },
                      '& .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-label': {
                        marginLeft: '12px',
                      },
                    }}
                  >
                    <TreeItem itemId="hyundai" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>현대자동차 (2)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="cn7-0a25" label="CN7 (6)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="hev-27-my" label="HEV_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="hev-26-my" label="HEV_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="hev-25-fmc" label="HEV_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="cn7-oa22" label="CN7 (3)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="ice-24-my" label="ICE_24_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ice-23-my" label="ICE_23_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ice-22-fl" label="ICE_22_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="kia" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>기아 (8)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="ev6-25" label="EV6 (4)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="ev6-27-my" label="EV6_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ev6-26-my" label="EV6_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ev6-25-fmc" label="EV6_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="k8-24" label="K8 (4)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="k8-26-my" label="K8_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="k8-25-my" label="K8_25_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="k8-24-fl" label="K8_24_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="genesis" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>제네시스 (10)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="gv80-25" label="GV80 (5)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="gv80-27-my" label="GV80_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="gv80-26-my" label="GV80_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="gv80-25-fmc" label="GV80_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="g90-24" label="G90 (5)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="g90-26-my" label="G90_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="g90-25-my" label="G90_25_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="g90-24-fl" label="G90_24_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                  </SimpleTreeView>
                </Box>
                </Box>
              </Box>
            </Box>

            {/* 우측 패널 - 테이블 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '16px 20px 0' }}>
              {/* 테이블 헤더 영역 - 탭 구조 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* 좌측: 탭 */}
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  hdsProps={{ size: 'medium', type: 'line' }}
                  sx={{
                    borderBottom: 'none',
                    '&::before, &::after': {
                      display: 'none',
                    },
                    '& .MuiTabs-scroller': {
                      borderBottom: 'none',
                      '&::before, &::after': {
                        display: 'none',
                      },
                    },
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none',
                      gap: '16px !important',
                    },
                    '& .MuiTab-root': {
                      fontSize: '16px !important',
                    },
                    '& .MuiTab-root:not(.Mui-selected)': {
                      borderBottom: 'none',
                      boxShadow: 'none',
                      '&::before, &::after': {
                        display: 'none',
                      },
                    },
                  }}
                >
                  <Tab hdsProps={{ size: 'medium' }} label="컨텐츠" value="컨텐츠" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important' }} />
                  <Tab hdsProps={{ size: 'medium' }} label="데이터 프랩" value="데이터 프랩" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important' }} />
                </Tabs>

                {/* 우측: Select + 버튼 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Select 드롭다운 */}
                  <Select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as string)}
                    hdsProps={{ size: 'medium', type: 'outline' }}
                    sx={{ width: '180px' }}
                  >
                    <MenuItem value="all">전체 컨텐츠 유형</MenuItem>
                    <MenuItem value="vcm">VCM</MenuItem>
                    <MenuItem value="webcc">Web CC</MenuItem>
                    <MenuItem value="360">2D 360</MenuItem>
                  </Select>

                  {/* 컨텐츠 추가하기 버튼 */}
                  <Button
                    hdsProps={{
                      size: 'medium',
                      type: 'outline',
                      style: 'primary',
                      icon: <Ic_plus_regular size="16px" color="#002C5F" />,
                    }}
                  >
                    컨텐츠 추가하기
                  </Button>
                </Box>
              </Box>

              {/* 테이블 */}
              <TableContainer sx={{ flex: 1, paddingTop: '16px', overflow: 'auto', maxHeight: '100%' }}>
                <Table hdsProps={{ size: 'medium' }} sx={{ width: '100%', tableLayout: 'auto', '& .MuiTableCell-root': { whiteSpace: 'nowrap' }, '& .MuiTableBody-root .MuiTableCell-root': { padding: '0 12px !important', height: '64px !important', minHeight: '64px !important', maxHeight: '64px !important' }, '& .MuiTableBody-root .MuiTableCell-root .cell_text': { height: '64px !important', display: 'flex', alignItems: 'center' } }}>
                  <TableHead>
                    <TableRow sx={{ height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important', '& .MuiTableCell-root': { padding: '0 12px !important', height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important', lineHeight: '36px !important' }, '& .MuiTableCell-root .cell_text': { height: '36px !important', display: 'flex', alignItems: 'center' } }}>
                      <TableCell sx={{ width: 106, minWidth: 106, maxWidth: 106 }}>썸네일</TableCell>
                      <TableCell sx={{ width: 100, minWidth: 100, maxWidth: 100 }}>브랜드</TableCell>
                      <TableCell sx={{ width: 160, minWidth: 160, maxWidth: 160 }}>프로젝트 코드</TableCell>
                      <TableCell sx={{ width: 100, minWidth: 100, maxWidth: 100 }}>프로젝트 유형</TableCell>
                      <TableCell sx={{ width: 100, minWidth: 100, maxWidth: 100 }}>컨텐츠 유형</TableCell>
                      <TableCell sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                        <TableSortLabel
                          active={sopSortOrder !== null}
                          direction={sopSortOrder === 'asc' ? 'asc' : 'desc'}
                          onClick={handleSopSort}
                        >
                          SOP
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>코멘트</TableCell>
                      <TableCell sx={{ width: activeChannelWidth, minWidth: 60, position: 'relative' }}>
                        활성 채널
                        <Box
                          onMouseDown={handleResizeStart}
                          sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            cursor: 'col-resize',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              backgroundColor: 'var(--outline)',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>담당자</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <Box
                            component="img"
                            src={thumbnailImages[project.id % thumbnailImages.length]}
                            alt="thumbnail"
                            sx={{
                              width: 72,
                              height: 42,
                              backgroundColor: '#F5F5F5',
                              borderRadius: '4px',
                              border: '1px solid rgba(0, 0, 0, 0.15)',
                              objectFit: 'cover',
                            }}
                          />
                        </TableCell>
                        <TableCell>{project.brand}</TableCell>
                        <TableCell>{project.projectCode}</TableCell>
                        <TableCell>
                          <Badge hdsProps={{ size: 'medium', style: 'default', icon: false, type: 'strong' }}>
                            {project.projectType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge hdsProps={{
                            size: 'medium',
                            style: project.contentType === 'VCM' ? 'info' : project.contentType === 'Web CC' ? 'purple' : project.contentType === '2D 360' ? 'success' : project.contentType === 'PI' ? 'yellow' : 'default',
                            icon: true,
                            type: 'strong'
                          }}>
                            {project.contentType}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.sop}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {project.comments > 0 ? (
                            <Badge hdsProps={{ size: 'small', style: 'default', isDigit: true }}>
                              {project.comments}
                            </Badge>
                          ) : (
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 20,
                                height: 20,
                                padding: '1px 6px',
                                borderRadius: '999px',
                                border: '1px solid var(--outline)',
                                backgroundColor: 'var(--on_surface_container_lowest)',
                                color: 'var(--on_surface_container)',
                                fontSize: 12,
                                fontWeight: 500,
                                boxSizing: 'border-box',
                              }}
                            >
                              {project.comments}
                            </Box>
                          )}
                        </TableCell>
                        <TableCell sx={{ width: activeChannelWidth, maxWidth: activeChannelWidth, overflow: 'hidden' }}>
                          <Box sx={{ overflow: 'hidden' }}>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                              {project.activeChannels.map((channel, idx) => (
                                <Badge key={idx} hdsProps={{ size: 'medium', style: 'default', icon: false, type: 'outlined' }}>
                                  {channel}
                                </Badge>
                              ))}
                            </Stack>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                            {project.manager.split(', ').map((name, idx) => (
                              <Button
                                key={idx}
                                hdsProps={{ size: 'medium', type: 'text', icon: false, style: 'strong' }}
                                onClick={() => {
                                  // TODO: 어드민 페이지로 연결
                                  console.log('Navigate to admin:', name)
                                }}
                              >
                                {name}{idx < project.manager.split(', ').length - 1 ? ',' : ''}
                              </Button>
                            ))}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* 페이지네이션 */}
              <TablePagination
                component="div"
                count={sortedProjects.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                hdsProps={{ size: 'small', isRowsPerPage: true }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Project
