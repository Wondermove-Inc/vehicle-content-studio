import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import Tabs from '@hmg-fe/hmg-design-system/Tabs'
import Tab from '@hmg-fe/hmg-design-system/Tab'
import RadioGroup from '@hmg-fe/hmg-design-system/RadioGroup'
import Radio from '@hmg-fe/hmg-design-system/Radio'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { SimpleTreeView, TreeItem, Badge, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, TablePagination, EmptyError, Dialog, DialogPaper, DialogTitle, DialogContent, DialogActions, FormControlLabel, List, ListItem } from '@hmg-fe/hmg-design-system'
import {
  Ic_folder_filled,
  Ic_file_filled,
  Ic_person_filled,
  Ic_alarm_filled,
  Ic_setting_filled,
  Ic_setting_bold,
  Ic_search_regular,
  Ic_plus_regular,
  Ic_menu_regular,
  Ic_arrow_forward_regular,
  Ic_world_filled,
  Ic_refresh_bold,
  Ic_picture_filled,
  Ic_star_filled,
  Ic_star_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

// 사이드바 메뉴 아이템 컴포넌트
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  badge?: number
  collapsed?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, isActive, badge, collapsed, onClick }: SidebarItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: collapsed ? '10px 10px 10px 16px' : '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#E9EAEC' : 'transparent',
        transition: 'padding 0.2s ease',
        overflow: 'hidden',
        width: collapsed ? '46px' : 'auto',
        '&:hover': {
          backgroundColor: isActive ? '#E9EAEC' : '#EEEEEE',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 24, flexShrink: 0 }}>
        {icon}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: 15,
          fontWeight: 700,
          lineHeight: '22px',
          color: isActive ? '#111111' : 'var(--on_surface_high)',
          whiteSpace: 'nowrap',
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {label}
      </Typography>
      {badge !== undefined && badge > 0 && (
        <Box
          sx={{
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <Badge hdsProps={{ size: 'small', style: 'error', isDigit: true }}>{badge}</Badge>
        </Box>
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
  // 현대자동차 - CN7_HEV_25 (hev-25-fmc)
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
    id: 3,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI'],
    manager: '박미현',
    comments: 3,
  },
  {
    id: 4,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'PI',
    contentTypeColor: '#B8860B',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['In-Store'],
    manager: '여하은',
    comments: 0,
  },
  // 현대자동차 - CN7_HEV_26 (hev-26-my)
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_26',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06-15',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '박미현',
    comments: 5,
  },
  {
    id: 6,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_26',
    projectType: 'MY',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06-15',
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
    id: 8,
    brand: '기아',
    projectCode: 'EV6_26MY',
    projectType: 'MY',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'GT-Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03-15',
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
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: 'GT-Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-03-15',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-08-20',
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
  // 제네시스 - GV80_26MY (gv80-26-my)
  {
    id: 12,
    brand: '제네시스',
    projectCode: 'GV80_26MY',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01-10',
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
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01-10',
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
    contentType: 'PI',
    contentTypeColor: '#B8860B',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-01-10',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-09-30',
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
  // 기아 - EV6_25FMC (ev6-25-fmc)
  {
    id: 17,
    brand: '기아',
    projectCode: 'EV6_25FMC',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'GT',
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
  '/images/car_01.png',
  '/images/car_02.png',
  '/images/car_03.png',
  '/images/car_04.png',
  '/images/car_05.png',
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
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [activeTab, setActiveTab] = useState('컨텐츠')
  const [contentType, setContentType] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>('all')
  const [sopSortOrder, setSopSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeChannelWidth, setActiveChannelWidth] = useState(120)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set([
    'hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my'
  ]))
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'hyundai', 'cn7-0a25', 'cn7-oa22', 'kia', 'ev6-25', 'k8-24', 'genesis', 'gv80-25', 'g90-24'
  ])

  // 즐겨찾기 토글 함수
  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId)
      } else {
        newFavorites.add(projectId)
      }
      return newFavorites
    })
  }

  // 브랜드명 번역 함수
  const getBrandLabel = (brand: string): string => {
    const brandMap: Record<string, string> = {
      '현대자동차': t('common.brand.hyundai'),
      '기아': t('common.brand.kia'),
      '제네시스': t('common.brand.genesis'),
    }
    return brandMap[brand] || brand
  }

  // 채널명 번역 함수
  const getChannelLabel = (channel: string): string => {
    const channelMap: Record<string, string> = {
      '원앱': t('common.channel.oneApp'),
      '원웹': t('common.channel.oneWeb'),
      'IVI': t('common.channel.ivi'),
      'In-Store': t('common.channel.inStore'),
      '기존 홈페이지': t('common.channel.legacyWeb'),
    }
    return channelMap[channel] || channel
  }

  // Breadcrumb 이름 번역 함수
  const getBreadcrumbLabel = (id: string, name: string): string => {
    const labelMap: Record<string, string> = {
      'all': t('project.header.title'),
      'hyundai': t('common.brand.hyundai'),
      'kia': t('common.brand.kia'),
      'genesis': t('common.brand.genesis'),
    }
    return labelMap[id] || name
  }

  // 트리 데이터 구조
  const treeData = [
    {
      id: 'hyundai',
      label: t('common.brand.hyundai'),
      count: 2,
      children: [
        {
          id: 'cn7-0a25',
          label: 'CN7',
          count: 6,
          children: [
            { id: 'hev-27-my', label: 'HEV_27_MY' },
            { id: 'hev-26-my', label: 'HEV_26_MY' },
            { id: 'hev-25-fmc', label: 'HEV_25_FMC' },
          ],
        },
        {
          id: 'cn7-oa22',
          label: 'CN7',
          count: 3,
          children: [
            { id: 'ice-24-my', label: 'ICE_24_MY' },
            { id: 'ice-23-my', label: 'ICE_23_MY' },
            { id: 'ice-22-fl', label: 'ICE_22_FL' },
          ],
        },
      ],
    },
    {
      id: 'kia',
      label: t('common.brand.kia'),
      count: 8,
      children: [
        {
          id: 'ev6-25',
          label: 'EV6',
          count: 4,
          children: [
            { id: 'ev6-27-my', label: 'EV6_27_MY' },
            { id: 'ev6-26-my', label: 'EV6_26_MY' },
            { id: 'ev6-25-fmc', label: 'EV6_25_FMC' },
          ],
        },
        {
          id: 'k8-24',
          label: 'K8',
          count: 4,
          children: [
            { id: 'k8-26-my', label: 'K8_26_MY' },
            { id: 'k8-25-my', label: 'K8_25_MY' },
            { id: 'k8-24-fl', label: 'K8_24_FL' },
          ],
        },
      ],
    },
    {
      id: 'genesis',
      label: t('common.brand.genesis'),
      count: 10,
      children: [
        {
          id: 'gv80-25',
          label: 'GV80',
          count: 5,
          children: [
            { id: 'gv80-27-my', label: 'GV80_27_MY' },
            { id: 'gv80-26-my', label: 'GV80_26_MY' },
            { id: 'gv80-25-fmc', label: 'GV80_25_FMC' },
          ],
        },
        {
          id: 'g90-24',
          label: 'G90',
          count: 5,
          children: [
            { id: 'g90-26-my', label: 'G90_26_MY' },
            { id: 'g90-25-my', label: 'G90_25_MY' },
            { id: 'g90-24-fl', label: 'G90_24_FL' },
          ],
        },
      ],
    },
  ]

  // 검색어로 트리 필터링
  type TreeNode = {
    id: string
    label: string
    count?: number
    children?: TreeNode[]
  }

  const filterTree = (nodes: TreeNode[], query: string): TreeNode[] => {
    if (!query.trim()) return nodes

    const lowerQuery = query.toLowerCase()
    const result: TreeNode[] = []

    for (const node of nodes) {
      const labelMatch = node.label.toLowerCase().includes(lowerQuery)
      const filteredChildren = node.children ? filterTree(node.children, query) : []

      if (labelMatch || filteredChildren.length > 0) {
        result.push({
          ...node,
          children: labelMatch ? node.children : filteredChildren,
        })
      }
    }

    return result
  }

  const filteredTreeData = filterTree(treeData, searchQuery)

  const breadcrumb = getBreadcrumb(selectedProject)

  // 프로젝트 선택 또는 컨텐츠 유형 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0)
  }, [selectedProject, contentType])

  // 사이드바 접힐 때 즐겨찾기도 접기
  useEffect(() => {
    if (isSidebarCollapsed) {
      setIsFavoritesExpanded(false)
    }
  }, [isSidebarCollapsed])

  // 검색어 변경 시 트리 노드 자동 확장
  useEffect(() => {
    if (searchQuery.trim()) {
      // 검색 중일 때는 모든 필터된 노드 확장
      const filtered = filterTree(treeData, searchQuery)
      const expandedIds: string[] = []
      const collectIds = (nodes: TreeNode[]) => {
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            expandedIds.push(node.id)
            collectIds(node.children)
          }
        })
      }
      collectIds(filtered)
      setExpandedItems(expandedIds)
    } else {
      // 검색어가 없을 때는 기본 확장 상태로 복원
      setExpandedItems(['hyundai', 'cn7-0a25', 'cn7-oa22', 'kia', 'ev6-25', 'k8-24', 'genesis', 'gv80-25', 'g90-24'])
    }
  }, [searchQuery])

  // 트리 아이템 ID → 프로젝트 코드 매핑 (3뎁스)
  const treeItemToProjectCode: Record<string, string> = {
    // 현대자동차 - CN7
    'hev-27-my': 'CN7_HEV_27',
    'hev-26-my': 'CN7_HEV_26',
    'hev-25-fmc': 'CN7_HEV_25',
    'ice-24-my': 'CN7_ICE_24',
    'ice-23-my': 'CN7_ICE_23',
    'ice-22-fl': 'CN7_ICE_22',
    // 기아 - EV6, K8
    'ev6-27-my': 'EV6_27MY',
    'ev6-26-my': 'EV6_26MY',
    'ev6-25-fmc': 'EV6_25FMC',
    'k8-26-my': 'K8_26MY',
    'k8-25-my': 'K8_25MY',
    'k8-24-fl': 'K8_24FL',
    // 제네시스 - GV80, G90
    'gv80-27-my': 'GV80_27MY',
    'gv80-26-my': 'GV80_26MY',
    'gv80-25-fmc': 'GV80_25FMC',
    'g90-26-my': 'G90_26MY',
    'g90-25-my': 'G90_25MY',
    'g90-24-fl': 'G90_24FL',
  }

  // 선택된 프로젝트에 따른 브랜드 필터링
  const getBrandFromSelectedProject = (projectId: string | null): string | null => {
    if (!projectId || projectId === 'all') return null
    // 3뎁스 아이템이면 브랜드도 함께 필터링
    if (projectId === 'hyundai' || projectId.startsWith('cn7') || projectId.startsWith('hev') || projectId.startsWith('ice')) {
      return '현대자동차'
    }
    if (projectId === 'kia' || projectId.startsWith('ev6') || projectId.startsWith('k8')) {
      return '기아'
    }
    if (projectId === 'genesis' || projectId.startsWith('gv80') || projectId.startsWith('g90')) {
      return '제네시스'
    }
    return null
  }

  const selectedBrand = getBrandFromSelectedProject(selectedProject)
  const selectedProjectCode = selectedProject ? treeItemToProjectCode[selectedProject] : null

  // 컨텐츠 유형 셀렉트 값 → 실제 컨텐츠 유형 매핑
  const contentTypeMap: Record<string, string> = {
    'vcm': 'VCM',
    'webcc': 'Web CC',
    '360': '2D 360',
    'pi': 'PI',
  }

  const filteredProjects = sampleProjects.filter((project) => {
    // 프로젝트 필터링
    let projectMatch = true
    if (selectedProjectCode) {
      // 3뎁스 선택 시: 프로젝트 코드로 필터링
      projectMatch = project.projectCode === selectedProjectCode
    } else if (selectedBrand) {
      // 1뎁스(브랜드) 또는 2뎁스 선택 시: 브랜드로 필터링
      projectMatch = project.brand === selectedBrand
    }

    // 컨텐츠 유형 필터링
    let contentTypeMatch = true
    if (contentType !== 'all') {
      contentTypeMatch = project.contentType === contentTypeMap[contentType]
    }

    return projectMatch && contentTypeMatch
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
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
      const newWidth = Math.max(100, startWidth + (moveEvent.clientX - startX))
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
          width: isSidebarCollapsed ? '72px' : '260px',
          height: '100%',
          backgroundColor: 'var(--surface_container_lowest)',
          borderRight: '1px solid var(--outline)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          transition: 'width 0.2s ease',
          overflow: 'hidden',
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: isSidebarCollapsed ? '24px 16px 24px 32px' : '24px 24px 24px 32px',
            transition: 'padding 0.2s ease',
          }}
        >
          <Box
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            sx={{
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 24,
            }}
          >
            <Ic_menu_regular size="20px" color="#1E1E1E" />
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: '26px',
              color: '#0A0A0A',
              opacity: isSidebarCollapsed ? 0 : 1,
              transition: 'opacity 0.2s ease',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              pointerEvents: isSidebarCollapsed ? 'none' : 'auto',
            }}
          >
            {t('project.sidebar.hmgSystem')}
          </Typography>
        </Box>

        {/* 메뉴 그룹 1 - 프로젝트 및 컨텐츠 */}
        <Box sx={{ padding: isSidebarCollapsed ? '0 10px 8px 16px' : '0 16px 8px 16px', transition: 'padding 0.2s ease' }}>
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_folder_filled size="20px" color={activeMenu === '프로젝트' ? '#111111' : 'var(--surface_highest)'} />}
              label={t('common.menu.project')}
              isActive={activeMenu === '프로젝트'}
              collapsed={isSidebarCollapsed}
              onClick={() => setActiveMenu('프로젝트')}
            />
            <SidebarItem
              icon={<Ic_file_filled size="20px" color={activeMenu === '컨텐츠 요청' ? '#111111' : 'var(--surface_highest)'} />}
              label={t('common.menu.contentRequest')}
              isActive={activeMenu === '컨텐츠 요청'}
              collapsed={isSidebarCollapsed}
              onClick={() => setActiveMenu('컨텐츠 요청')}
            />
            <SidebarItem
              icon={<Ic_person_filled size="20px" color={activeMenu === '어드민' ? '#111111' : 'var(--surface_highest)'} />}
              label={t('common.menu.admin')}
              isActive={activeMenu === '어드민'}
              collapsed={isSidebarCollapsed}
              onClick={() => setActiveMenu('어드민')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: isSidebarCollapsed ? '0 10px 0 16px' : '0 16px', transition: 'padding 0.2s ease' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 메뉴 그룹 2 */}
        <Box sx={{ padding: isSidebarCollapsed ? '8px 10px 8px 16px' : '8px 16px', transition: 'padding 0.2s ease' }}>
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_setting_filled size="20px" color="var(--surface_highest)" />}
              label={t('common.menu.settings')}
              collapsed={isSidebarCollapsed}
              onClick={() => setIsSettingsOpen(true)}
            />
            <SidebarItem
              icon={<Ic_alarm_filled size="20px" color="var(--surface_highest)" />}
              label={t('common.menu.notification')}
              badge={14}
              collapsed={isSidebarCollapsed}
              onClick={() => setActiveMenu('알림')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: isSidebarCollapsed ? '0 10px 0 16px' : '0 16px', transition: 'padding 0.2s ease' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 즐겨찾기 섹션 */}
        <Box
          sx={{
            flex: 1,
            padding: '8px 16px',
            overflowY: 'auto',
            opacity: isSidebarCollapsed ? 0 : 1,
            visibility: isSidebarCollapsed ? 'hidden' : 'visible',
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
          }}
        >
          <Box
            onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 24,
                transition: 'transform 0.2s ease',
                transform: isFavoritesExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              <Ic_arrow_forward_regular size="20px" color="var(--surface_highest)" />
            </Box>
            <Typography
              sx={{
                flex: 1,
                fontSize: 15,
                fontWeight: 700,
                lineHeight: '22px',
                color: 'var(--on_surface_high)',
                whiteSpace: 'nowrap',
              }}
            >
              {t('common.menu.favorites')}
            </Typography>
          </Box>
          {isFavoritesExpanded && (
            <Stack spacing={0} sx={{ paddingLeft: '18px', position: 'relative' }}>
              {favorites.size === 0 ? (
                <Typography
                  sx={{
                    fontSize: 14,
                    color: 'var(--on_surface_mid)',
                    padding: '8px 16px',
                  }}
                >
                  즐겨찾기가 없습니다
                </Typography>
              ) : (
                Array.from(favorites).map((id, index, arr) => (
                  <Box
                    key={id}
                    onClick={() => setSelectedProject(id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 16px',
                      paddingLeft: '24px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '8px',
                        top: 0,
                        bottom: 0,
                        width: '1px',
                        backgroundColor: 'var(--outline_lowest)',
                      },
                      '&:hover': {
                        '& .favorite-label': {
                          color: '#111111',
                          fontWeight: 700,
                        },
                      },
                    }}
                  >
                    <Typography
                      className="favorite-label"
                      sx={{
                        fontSize: 15,
                        fontWeight: selectedProject === id ? 700 : 500,
                        lineHeight: '22px',
                        color: selectedProject === id ? '#000000' : 'var(--on_surface_highest)',
                        transition: 'color 0.15s ease, font-weight 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {projectNames[id] || id}
                    </Typography>
                  </Box>
                ))
              )}
            </Stack>
          )}
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: isSidebarCollapsed ? 'calc(100% - 72px)' : 'calc(100% - 260px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 16px 16px 0',
          gap: '10px',
          overflow: 'visible',
          backgroundColor: 'var(--surface_container_lowest)',
          transition: 'max-width 0.2s ease',
        }}
      >
        {activeMenu === '컨텐츠 요청' ? (
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
            {/* 컨텐츠 요청 헤더 */}
            <Box sx={{ padding: '20px 20px 16px 24px', borderBottom: '1px solid var(--outline)' }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: '36px',
                  color: 'var(--on_surface)',
                }}
              >
                {t('common.menu.contentRequest')}
              </Typography>
            </Box>
            {/* 컨텐츠 요청 본문 - Jira iframe */}
            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <iframe
                src="https://your-jira-instance.atlassian.net"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title="Jira Service"
              />
            </Box>
          </Box>
        ) : (
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
                        color: 'var(--on_surface)',
                        cursor: index === breadcrumb.length - 1 ? 'default' : 'pointer',
                        '&:hover': {
                          textDecoration: index === breadcrumb.length - 1 ? 'none' : 'underline',
                        },
                      }}
                    >
                      {getBreadcrumbLabel(item.id, item.name)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                hdsProps={{ size: 'medium', style: 'strong', type: 'fill', icon: <Ic_plus_regular size="16px" color="#fff" /> }}
                sx={{
                  flexShrink: 0,
                }}
                onClick={() => setIsAddProjectOpen(true)}
              >
                {t('project.header.addProject')}
              </Button>
            </Box>
          </Box>

          {/* 메인 영역 */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* 좌측 패널 - 프로젝트 트리 */}
            <Box
              sx={{
                width: '280px',
                borderRight: '1px solid var(--outline)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              {/* 검색 필드 */}
              <Box sx={{ padding: '16px 20px 0 20px' }}>
                <TextField
                  hdsProps={{ size: 'medium', isClear: true }}
                  placeholder={t('project.tree.searchPlaceholder')}
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Ic_search_regular size="16px" color="#949494" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    onClickClearButton: () => setSearchQuery(''),
                  }}
                />
              </Box>

              {/* 트리 영역 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 0 20px 20px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '14px',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'var(--outline)',
                      borderRadius: '3px',
                    },
                  }}
                >

                {/* 프로젝트 트리 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 검색 결과 없음 */}
                  {searchQuery.trim() && filteredTreeData.length === 0 ? (
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px' }}>
                      <EmptyError hdsProps={{ size: 'small', title: undefined, description: t('project.empty.noSearchResult'), buttons: undefined }} />
                    </Box>
                  ) : (
                    <>
                      {/* 전체 프로젝트 - 검색 중이 아닐 때만 표시 */}
                      {!searchQuery.trim() && (
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
                            {t('project.tree.allProjects')} (20)
                          </Typography>
                        </Box>
                      )}

                      {/* 트리 뷰 */}
                      <SimpleTreeView
                    hdsProps={{ size: 'medium', type: 'line' }}
                    expandedItems={expandedItems}
                    onExpandedItemsChange={(_, itemIds) => {
                      setExpandedItems(itemIds as string[])
                    }}
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
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '4px',
                        '&:hover': {
                          backgroundColor: '#FAFAFA',
                        },
                      },
                      '& .MuiTreeItem-iconContainer': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 0,
                      },
                      '& .MuiTreeItem-label': {
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 0,
                      },
                      '& .MuiTreeItem-content.Mui-selected': {
                        '&:hover': {
                          backgroundColor: '#F5F5F5',
                        },
                      },
                      // 2뎁스 hover 비활성화
                      '& .MuiTreeItem-group > .MuiTreeItem-root > .MuiTreeItem-content:hover': {
                        backgroundColor: 'transparent',
                      },
                      // 3뎁스 hover 다시 활성화
                      '& .MuiTreeItem-group .MuiTreeItem-group > .MuiTreeItem-root > .MuiTreeItem-content:hover': {
                        backgroundColor: '#FAFAFA',
                      },
                      // 3뎁스 설정 아이콘 기본 숨김
                      '& .tree-settings-icon': {
                        opacity: 0,
                        transition: 'opacity 0.15s ease',
                      },
                      // hover 또는 선택된 상태에서 설정 아이콘 표시
                      '& .MuiTreeItem-content:hover .tree-settings-icon, & .MuiTreeItem-content.Mui-selected .tree-settings-icon': {
                        opacity: 1,
                      },
                      '& .MuiTreeItem-group': {
                        marginLeft: '12px',
                      },
                      '& .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-label': {
                        marginLeft: '12px',
                      },
                    }}
                  >
                    {filteredTreeData.map((brand) => (
                      <TreeItem
                        key={brand.id}
                        itemId={brand.id}
                        label={
                          <Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: 1, color: '#111111', display: 'flex', alignItems: 'center' }}>
                            {brand.label} ({brand.count})
                          </Typography>
                        }
                        hdsProps={{ type: 'default' }}
                      >
                        {brand.children?.map((model) => (
                          <TreeItem
                            key={model.id}
                            itemId={model.id}
                            label={`${model.label} (${model.count})`}
                            hdsProps={{ type: 'default' }}
                          >
                            {model.children?.map((project) => (
                              <TreeItem
                                key={project.id}
                                itemId={project.id}
                                label={
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      pr: '4px',
                                    }}
                                  >
                                    <Typography sx={{ fontSize: 15, fontWeight: 500, lineHeight: 1, color: '#111111', display: 'flex', alignItems: 'center' }}>
                                      {project.label}
                                    </Typography>
                                    <Box
                                      className="tree-settings-icon"
                                      sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedProject(project.id)
                                      }}
                                    >
                                      <Box
                                        onClick={() => toggleFavorite(project.id)}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          cursor: 'pointer',
                                          '&:hover': {
                                            opacity: 0.7,
                                          },
                                          ...(favorites.has(project.id) && {
                                            '& svg': {
                                              filter: 'drop-shadow(0.5px 0 0 rgba(0,0,0,0.05)) drop-shadow(-0.5px 0 0 rgba(0,0,0,0.05)) drop-shadow(0 0.5px 0 rgba(0,0,0,0.05)) drop-shadow(0 -0.5px 0 rgba(0,0,0,0.05))',
                                            },
                                          }),
                                        }}
                                        aria-label="즐겨찾기"
                                      >
                                        {favorites.has(project.id)
                                          ? <Ic_star_filled size="16px" color="var(--yellow)" />
                                          : <Ic_star_regular size="16px" color="var(--on_surface_mid)" />
                                        }
                                      </Box>
                                      <Button
                                        hdsProps={{
                                          size: 'xxsmall',
                                          type: 'outline',
                                          icon: <Ic_setting_bold size="16px" />,
                                          style: undefined,
                                          isIconOnly: true,
                                        }}
                                        aria-label="설정"
                                        onClick={() => console.log('Settings clicked:', project.id)}
                                      />
                                    </Box>
                                  </Box>
                                }
                                hdsProps={{ type: 'default' }}
                              />
                            ))}
                          </TreeItem>
                        ))}
                      </TreeItem>
                    ))}
                      </SimpleTreeView>
                    </>
                  )}
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
                    '& .MuiTab-root .tab_text': {
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
                  <Tab hdsProps={{ size: 'medium' }} label={t('project.tabs.content')} value="컨텐츠" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
                  <Tab hdsProps={{ size: 'medium' }} label={t('project.tabs.dataPrep')} value="데이터 프랩" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', fontSize: '16px !important' }} />
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
                    <MenuItem hdsProps value="all">{t('common.contentType.all')}</MenuItem>
                    <MenuItem hdsProps value="vcm">{t('common.contentType.vcm')}</MenuItem>
                    <MenuItem hdsProps value="webcc">{t('common.contentType.webcc')}</MenuItem>
                    <MenuItem hdsProps value="360">{t('common.contentType.360')}</MenuItem>
                    <MenuItem hdsProps value="pi">{t('common.contentType.pi')}</MenuItem>
                  </Select>

                  {/* 컨텐츠 추가하기 버튼 */}
                  <Button
                    hdsProps={{
                      size: 'medium',
                      type: 'outline',
                      style: 'primary',
                      icon: <Ic_plus_regular size="16px" color="#002C5F" />,
                    }}
                    onClick={() => setIsAddContentOpen(true)}
                  >
                    {t('project.header.addContent')}
                  </Button>
                </Box>
              </Box>

              {/* 테이블 */}
              <Box sx={{ height: '16px', flexShrink: 0 }} />
              {filteredProjects.length === 0 ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EmptyError hdsProps={{ size: 'small', title: undefined, description: t('project.empty.noContent'), buttons: undefined }} />
                </Box>
              ) : (
              <>
              <TableContainer sx={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'var(--outline)',
                  borderRadius: '3px',
                },
              }}>
                <Table hdsProps={{ size: 'medium' }} sx={{ width: '100%', tableLayout: 'auto', '& .MuiTableCell-root': { whiteSpace: 'nowrap' }, '& .MuiTableBody-root .MuiTableCell-root': { padding: '0 12px !important', height: '64px !important', minHeight: '64px !important', maxHeight: '64px !important' }, '& .MuiTableBody-root .MuiTableCell-root .cell_text': { height: '64px !important', display: 'flex', alignItems: 'center' } }}>
                  <TableHead sx={{
                      '& .MuiTableCell-root': { fontSize: '14px !important' },
                      '& .MuiTableCell-root *': { fontSize: '14px !important' },
                      '& .MuiTableCell-root .cell_text': { fontSize: '14px !important' },
                      '& .MuiTableCell-root .cell_text *': { fontSize: '14px !important' },
                      '& .MuiTableSortLabel-root': { fontSize: '14px !important' },
                      '& span': { fontSize: '14px !important' },
                      '& .label_medium': { fontSize: '14px !important' },
                    }}>
                    <TableRow sx={{ height: '40px !important', minHeight: '40px !important', maxHeight: '40px !important', '& .MuiTableCell-root': { padding: '0 12px !important', height: '40px !important', minHeight: '40px !important', maxHeight: '40px !important', lineHeight: '40px !important' }, '& .MuiTableCell-root .cell_text': { height: '40px !important', display: 'flex', alignItems: 'center' } }}>
                      <TableCell sx={{ width: '1%', minWidth: 106 }}>{t('project.table.thumbnail')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 100 }}>{t('project.table.brand')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 160 }}>{t('project.table.projectCode')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 100 }}>{t('project.table.projectType')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 100 }}>{t('project.table.contentType')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 120 }}>
                        <TableSortLabel
                          active={sopSortOrder !== null}
                          direction={sopSortOrder === 'asc' ? 'asc' : 'desc'}
                          onClick={handleSopSort}
                        >
                          {t('project.table.sop')}
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 80, textAlign: 'center' }}>{t('project.table.comment')}</TableCell>
                      <TableCell sx={{ minWidth: 100, position: 'relative' }}>
                        {t('project.table.activeChannel')}
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
                      <TableCell sx={{ width: '1%', minWidth: 100 }}>{t('project.table.manager')}</TableCell>
                      <TableCell sx={{ width: '1%', minWidth: 48 }}></TableCell>
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
                        <TableCell>{getBrandLabel(project.brand)}</TableCell>
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
                            icon: project.contentType === 'VCM' ? <Ic_file_filled size="16px" color="currentColor" /> : project.contentType === 'Web CC' ? <Ic_world_filled size="16px" color="currentColor" /> : project.contentType === '2D 360' ? <Ic_refresh_bold size="16px" color="currentColor" /> : project.contentType === 'PI' ? <Ic_picture_filled size="16px" color="currentColor" /> : true,
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
                        <TableCell sx={{ minWidth: 100, overflow: 'hidden' }}>
                          <Box sx={{ overflow: 'hidden' }}>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                              {project.activeChannels.map((channel, idx) => (
                                <Badge key={idx} hdsProps={{ size: 'medium', style: 'default', icon: false, type: 'outlined' }}>
                                  {getChannelLabel(channel)}
                                </Badge>
                              ))}
                            </Stack>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ width: '1%', minWidth: 100 }}>
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
                        <TableCell sx={{ width: '1%', minWidth: 48 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.7,
                              },
                            }}
                            onClick={() => {
                              // TODO: 상세 페이지로 이동
                              console.log('Navigate to detail:', project.id)
                            }}
                          >
                            <Ic_arrow_forward_regular size="20px" color="var(--on_surface_mid)" />
                          </Box>
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
              </>
              )}
            </Box>
          </Box>
        </Box>
        )}
      </Box>

      {/* 설정 다이얼로그 */}
      <Dialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsSettingsOpen(false) }}>{t('project.settings.title')}</DialogTitle>
        <DialogContent hdsProps sx={{ py: '16px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0E0F11',
              marginBottom: '12px',
            }}
          >
            {t('project.settings.language')}
          </Typography>
          <RadioGroup value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} sx={{ pl: 1 }}>
            <List hdsProps={{ dialogType: 'radio' }}>
              <ListItem hdsProps={{ dialogType: 'radio', isDivider: false }}>
                <FormControlLabel
                  label=""
                  value="ko"
                  control={<Radio hdsProps={{ label: t('project.settings.languageKorean') }} />}
                />
              </ListItem>
              <ListItem hdsProps={{ dialogType: 'radio', isDivider: false }}>
                <FormControlLabel
                  label=""
                  value="en"
                  control={<Radio hdsProps={{ label: t('project.settings.languageEnglish') }} />}
                />
              </ListItem>
            </List>
          </RadioGroup>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsSettingsOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            onClick={() => setIsSettingsOpen(false)}
          >
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 프로젝트 추가 다이얼로그 */}
      <Dialog
        open={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsAddProjectOpen(false) }}>{t('project.header.addProject')}</DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            {/* 내용은 나중에 추가 */}
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>
              프로젝트 추가 기능이 구현될 예정입니다.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsAddProjectOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            onClick={() => {
              // TODO: 프로젝트 추가 로직
              setIsAddProjectOpen(false)
            }}
          >
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 컨텐츠 추가 다이얼로그 */}
      <Dialog
        open={isAddContentOpen}
        onClose={() => setIsAddContentOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsAddContentOpen(false) }}>{t('project.header.addContent')}</DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            {/* 내용은 나중에 추가 */}
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>
              컨텐츠 추가 기능이 구현될 예정입니다.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsAddContentOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            onClick={() => {
              // TODO: 컨텐츠 추가 로직
              setIsAddContentOpen(false)
            }}
          >
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Project
