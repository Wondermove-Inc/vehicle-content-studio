import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import RadioGroup from '@hmg-fe/hmg-design-system/RadioGroup'
import Radio from '@hmg-fe/hmg-design-system/Radio'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { SimpleTreeView, TreeItem, Badge, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, TablePagination, EmptyError, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, List, ListItem } from '@hmg-fe/hmg-design-system'
import {
  Ic_setting_bold,
  Ic_search_regular,
  Ic_plus_regular,
  Ic_world_filled,
  Ic_star_filled,
  Ic_star_regular,
  Ic_log_out_regular,
  Ic_arrow_forward_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

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
    sop: '2025-12',
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
    sop: '2025-12',
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
    sop: '2025-12',
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
  // 현대자동차 - CN7_HEV_26 (hev-26-my)
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_26',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    projectCode: 'CN7_HEV_26',
    projectType: 'MY',
    contentType: 'Web CC',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: 'Web CC',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: 'Web CC',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: 'Web CC',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
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
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-05',
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
  'cn7-0a25': 'CN7I(AL23)_HEV',
  'cn6-oa22': 'CN7I(AL23)_EV',
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
  'cn6-oa22': 'hyundai',
  'ev6-25': 'kia',
  'k8-24': 'kia',
  'gv80-25': 'genesis',
  'g90-24': 'genesis',
  'hev-27-my': 'cn7-0a25',
  'hev-26-my': 'cn7-0a25',
  'hev-25-fmc': 'cn7-0a25',
  'ice-24-my': 'cn6-oa22',
  'ice-23-my': 'cn6-oa22',
  'ice-22-fl': 'cn6-oa22',
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
const depth2Items = ['cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']

// 썸네일 이미지 목록
const thumbnailImages = [
  '/images/car_01.png',
  '/images/car_02.png',
  '/images/car_03.png',
  '/images/car_04.png',
  '/images/car_05.png',
]

function Project() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [searchParams] = useSearchParams()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [contentType, setContentType] = useState('all')

  // URL 쿼리 파라미터에서 선택된 프로젝트 읽기
  const initialSelectedProject = searchParams.get('selected') || 'all'
  const [selectedProject, setSelectedProject] = useState<string | null>(initialSelectedProject)
  const [sopSortOrder, setSopSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeChannelWidth, setActiveChannelWidth] = useState(120)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [selectedProjectForSettings, setSelectedProjectForSettings] = useState<string | null>(null)
  // localStorage에서 즐겨찾기 초기화
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('project-favorites')
    if (saved) {
      try {
        return new Set(JSON.parse(saved))
      } catch {
        return new Set(['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my'])
      }
    }
    return new Set(['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my'])
  })
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // 즐겨찾기가 변경되면 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('project-favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

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

  // 트리 데이터 구조
  const treeData = [
    {
      id: 'hyundai',
      label: t('common.brand.hyundai'),
      count: 6,
      children: [
        {
          id: 'cn7-0a25',
          label: 'CN7I(AL23)_HEV',
          count: 3,
          children: [
            { id: 'hev-27-my', label: 'HEV_27_MY' },
            { id: 'hev-26-my', label: 'HEV_26_MY' },
            { id: 'hev-25-fmc', label: 'HEV_25_FMC' },
          ],
        },
        {
          id: 'cn6-oa22',
          label: 'CN7I(AL23)_EV',
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

  // 프로젝트 선택 또는 컨텐츠 유형 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0)
  }, [selectedProject, contentType])

  // URL 쿼리 파라미터 변경 시 selectedProject 업데이트
  useEffect(() => {
    const selected = searchParams.get('selected') || 'all'
    setSelectedProject(selected)
  }, [searchParams])

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
      // 검색어가 없을 때는 기본 확장 상태로 복원 (모두 닫힘)
      setExpandedItems([])
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
    if (projectId === 'hyundai' || projectId.startsWith('cn7') || projectId.startsWith('cn6') || projectId.startsWith('hev') || projectId.startsWith('ice')) {
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
    if (contentType === 'none') {
      // "컨텐츠 없음" 선택 시: contentType이 없거나 빈 문자열인 항목만 표시
      contentTypeMatch = !project.contentType || project.contentType.trim() === ''
    }
    // "all"과 "beautyAngleCut"은 모두 전체 표시 (실제로는 모든 컨텐츠가 Beauty Angle Cut으로 표시됨)

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
      <Sidebar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
        selectedProject={selectedProject ?? undefined}
        onProjectSelect={setSelectedProject}
        favorites={favorites}
        projectNames={projectNames}
      />

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
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: '36px',
                    color: 'var(--on_surface)',
                  }}
                >
                  {t('project.header.title')}
                </Typography>
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
                            {t('project.tree.allProjects')}
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
                        const depth2Items = ['cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
                        if (depth2Items.includes(id)) {
                          // 부모 찾기
                          if (id.startsWith('cn7') || id.startsWith('cn6')) setSelectedProject('hyundai')
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
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedProjectForSettings(project.id)
                                          setIsProjectSettingsOpen(true)
                                        }}
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
              {/* 테이블 헤더 영역 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* 좌측: 제목 */}
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: '30px',
                    color: 'var(--primary)',
                  }}
                >
                  {t('project.tree.recentUpdates')}
                </Typography>

                {/* 우측: Select + 버튼 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Select 드롭다운 */}
                  <Select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as string)}
                    hdsProps={{ size: 'medium', type: 'filter' }}
                    style={{ width: 'fit-content' }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          width: '186px',
                        }
                      },
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                      },
                    }}
                  >
                    <MenuItem hdsProps={{ size: 'medium', icon: false, nested: true, multiple: true }} value="all">
                      {t('common.contentType.all')}
                    </MenuItem>
                    <MenuItem hdsProps={{ size: 'medium', icon: false, nested: true, multiple: true }} value="beautyAngleCut">
                      {t('common.contentType.beautyAngleCut')}
                    </MenuItem>
                    <MenuItem hdsProps={{ size: 'medium', icon: false, nested: true, multiple: true }} value="none">
                      {t('common.contentType.none')}
                    </MenuItem>
                  </Select>
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
                        {t('project.table.derivative')}
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
                      <TableRow
                        key={project.id}
                        onClick={() => navigate(`/project/content/${project.id}?project=${selectedProject}`)}
                        sx={{
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 44, 95, 0.04)',
                          },
                        }}
                      >
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
                          {project.contentType ? (
                            <Badge hdsProps={{
                              size: 'medium',
                              style: 'purple',
                              icon: <Ic_world_filled size="16px" color="currentColor" />,
                              type: 'strong'
                            }}>
                              Beauty Angle Cut
                            </Badge>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 400,
                                lineHeight: '21px',
                                color: 'var(--on_surface_mid)',
                              }}
                            >
                              {t('common.contentType.none')}
                            </Typography>
                          )}
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
                        <TableCell sx={{ minWidth: 100 }}>
                          {project.derivative ? (
                            <Badge hdsProps={{ size: 'medium', style: 'default', icon: false, type: 'outlined' }}>
                              {project.derivative}
                            </Badge>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 400,
                                lineHeight: '21px',
                                color: 'var(--on_surface_mid)',
                              }}
                            >
                              {t('project.table.noDerivative')}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ width: '1%', minWidth: 100 }}>
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
                            {project.manager.split(', ').map((name, idx) => (
                              <Button
                                key={idx}
                                hdsProps={{ size: 'medium', type: 'text', icon: false, style: 'strong' }}
                                onClick={(e) => {
                                  e.stopPropagation()
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
                            }}
                          >
                            <Ic_arrow_forward_regular size="16px" color="var(--on_surface_mid)" />
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
          {/* 언어 설정 */}
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

          {/* 구분선 */}
          <Divider sx={{ my: 3 }} />

          {/* 로그아웃 섹션 */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0E0F11',
              marginBottom: '12px',
            }}
          >
            계정
          </Typography>
          <Button
            hdsProps={{ type: 'outline', style: 'critical' }}
            fullWidth
            startIcon={<Ic_log_out_regular size="16px" />}
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            로그아웃
          </Button>
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

      {/* 프로젝트 설정 다이얼로그 */}
      <Dialog
        open={isProjectSettingsOpen}
        onClose={() => {
          setIsProjectSettingsOpen(false)
          setSelectedProjectForSettings(null)
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle hdsProps={{
          closeIcon: true,
          onClose: () => {
            setIsProjectSettingsOpen(false)
            setSelectedProjectForSettings(null)
          }
        }}>
          프로젝트 설정 {selectedProjectForSettings && `- ${projectNames[selectedProjectForSettings] || selectedProjectForSettings}`}
        </DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            {/* 내용은 나중에 추가 */}
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>
              프로젝트 설정 내용이 구현될 예정입니다.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => {
            setIsProjectSettingsOpen(false)
            setSelectedProjectForSettings(null)
          }}>
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            onClick={() => {
              // TODO: 프로젝트 설정 저장 로직
              setIsProjectSettingsOpen(false)
              setSelectedProjectForSettings(null)
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
