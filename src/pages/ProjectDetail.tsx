import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProjectLayout from '@/components/ProjectLayout'
import AddProjectDialog from '@/components/AddProjectDialog'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Checkbox from '@hmg-fe/hmg-design-system/Checkbox'
import Chip from '@hmg-fe/hmg-design-system/Chip'
import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, DatePicker, Select, MenuItem, Snackbar, SnackbarContent } from '@hmg-fe/hmg-design-system'
import {
  Ic_group_bold,
  Ic_setting_bold,
  Ic_star_filled,
  Ic_star_regular,
  Ic_picture_filled,
  Ic_plus_regular,
  Ic_calendar_bold,
  Ic_search_regular,
  Ic_search_bold,
  Ic_caution_bold,
  Ic_employ_card_filled,
  Ic_laptop_filled,
  Ic_pencil_filled,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { MOCK_PROJECTS, PROJECT_CODE_TO_TREE_ITEM, PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'
import { useAuth } from '@/contexts/AuthContext'
import { PermissionLevel } from '@/types/auth.types'

// 프로젝트 데이터 타입
interface ProjectData {
  id: string
  name: string
  code: string
  brand: string
  sop: string
  hasContent: boolean
}

// Tree Item ID -> Project Code 역매핑 생성
const TREE_ITEM_TO_PROJECT_CODE: Record<string, string> = {}
Object.entries(PROJECT_CODE_TO_TREE_ITEM).forEach(([code, treeId]) => {
  TREE_ITEM_TO_PROJECT_CODE[treeId] = code
})

// Mock 데이터를 사용하여 모든 프로젝트 데이터 생성
const sampleProjects: Record<string, ProjectData> = {}
Object.keys(projectNames).forEach((treeId) => {
  const projectCode = TREE_ITEM_TO_PROJECT_CODE[treeId]
  if (projectCode) {
    // MOCK_PROJECTS에서 해당 프로젝트의 모든 항목 찾기
    const mockProjects = MOCK_PROJECTS.filter((p) => p.projectCode === projectCode)

    if (mockProjects.length > 0) {
      // 하나라도 contentType이 있으면 컨텐츠가 있는 것으로 간주
      const hasAnyContent = mockProjects.some(p => p.contentType && p.contentType.trim() !== '')

      sampleProjects[treeId] = {
        id: treeId,
        name: projectCode,
        code: projectCode,
        brand: mockProjects[0].brand,
        sop: mockProjects[0].sop,
        hasContent: hasAnyContent,
      }
    } else {
      // Mock 데이터에 없는 경우 기본값 생성
      sampleProjects[treeId] = {
        id: treeId,
        name: projectNames[treeId],
        code: projectCode,
        brand: '현대자동차', // 기본값
        sop: '2026-01', // 기본값
        hasContent: false,
      }
    }
  }
})

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [isMembersOpen, setIsMembersOpen] = useState(false)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [launchDate, setLaunchDate] = useState<Date | null>(null)
  const [activeChannel, setActiveChannel] = useState<string[]>([])
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showProjectSnackbar, setShowProjectSnackbar] = useState(false)

  // 컨텐츠 추가 여부 상태 (세션 전용 - 새로고침 시 초기화)
  const [addedContents, setAddedContents] = useState<Set<string>>(new Set())

  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('')

  // 테이블 체크박스 상태
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(new Set())

  // 테이블 정렬 상태
  const [orderBy, setOrderBy] = useState<'email' | 'role' | 'company'>('email')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (totalMembers === 0) return // 검색 결과가 없으면 동작 안함

    if (selectedMembers.size === totalMembers) {
      setSelectedMembers(new Set())
    } else {
      // 현재 필터링된 멤버들의 인덱스로 선택
      const allIndices = sortedMembers.map((_, idx) => idx)
      setSelectedMembers(new Set(allIndices))
    }
  }

  // 개별 선택/해제
  const handleSelectMember = (index: number) => {
    const newSelected = new Set(selectedMembers)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedMembers(newSelected)
  }

  // 정렬 핸들러
  const handleSort = (column: 'email' | 'role' | 'company') => {
    const isAsc = orderBy === column && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(column)
  }

  // 멤버 데이터
  const members = [
    { email: 'username@kia.com', role: 'businessUser', company: 'hyundai' },
    { email: 'username@hyundai.com', role: 'businessUser', company: 'hyundai' },
    { email: 'superusername@hyundai.com', role: 'contentCreator', company: 'hyundai' },
    { email: 'username@genesis', role: 'contentCreator', company: 'partner' },
    { email: 'username@email.com', role: '3dModeler', company: 'partner' },
  ]

  // 역할별 아이콘 반환 함수
  const getRoleIcon = (role: string) => {
    if (role === 'businessUser') {
      return <Ic_employ_card_filled size="12px" color="currentColor" />
    } else if (role === '3dModeler') {
      return <Ic_laptop_filled size="12px" color="currentColor" />
    } else if (role === 'contentCreator') {
      return <Ic_pencil_filled size="12px" color="currentColor" />
    }
    return undefined
  }

  // 활성 채널 Chip 삭제 핸들러
  const handleDeleteChannel = (channelToDelete: string) => {
    setActiveChannel((prev) => prev.filter((item) => item !== channelToDelete))
  }

  // 선택된 멤버 Chip 삭제 핸들러
  const handleDeleteMember = (indexToDelete: number) => {
    const newSelected = new Set(selectedMembers)
    newSelected.delete(indexToDelete)
    setSelectedMembers(newSelected)
  }

  // 다이얼로그 닫을 때 폼 초기화
  const handleCloseAddContentDialog = () => {
    setIsAddContentOpen(false)
    setLaunchDate(null)
    setActiveChannel([])
    setSelectedMembers(new Set())
    setSearchQuery('')
  }

  // 정렬 및 필터링된 멤버 데이터
  const sortedMembers = useMemo(() => {
    // 1. 검색 필터링
    let filtered = members
    if (searchQuery.trim()) {
      filtered = members.filter((member) =>
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 2. 정렬
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      let aValue = ''
      let bValue = ''

      if (orderBy === 'email') {
        aValue = a.email
        bValue = b.email
      } else if (orderBy === 'role') {
        aValue = a.role
        bValue = b.role
      } else if (orderBy === 'company') {
        aValue = a.company
        bValue = b.company
      }

      if (order === 'asc') {
        return aValue.localeCompare(bValue, 'ko')
      } else {
        return bValue.localeCompare(aValue, 'ko')
      }
    })
    return sorted
  }, [orderBy, order, searchQuery])

  // 총 멤버 수 (필터링된 결과 기준)
  const totalMembers = sortedMembers.length

  // URL에서 contentId 가져오기
  const contentId = searchParams.get('contentId')

  // 권한 레벨 체크 - L1, L2만 컨텐츠 추가 가능
  const canAddContent = user?.permissionLevel === PermissionLevel.L1_ADMIN ||
                        user?.permissionLevel === PermissionLevel.L2_SERVICE_MANAGER

  // 프로젝트 데이터 가져오기
  const projectData = projectId ? sampleProjects[projectId] : null
  const projectName = projectId ? projectNames[projectId] : null

  // contentId가 있으면 해당 컨텐츠의 hasContent 상태 확인
  let actualHasContent = false
  if (contentId && projectData) {
    // contentId가 명시적으로 있으면 해당 컨텐츠 확인
    const specificContent = MOCK_PROJECTS.find(p => p.id === parseInt(contentId))
    if (specificContent) {
      actualHasContent = !!(specificContent.contentType && specificContent.contentType.trim() !== '')
    }
  } else if (projectData && projectId) {
    // contentId가 없으면 해당 프로젝트의 첫 번째 컨텐츠를 찾아봄
    const projectCode = TREE_ITEM_TO_PROJECT_CODE[projectId]
    if (projectCode) {
      const firstContent = MOCK_PROJECTS.find(p =>
        p.projectCode === projectCode &&
        p.contentType &&
        p.contentType.trim() !== ''
      )
      // 첫 번째 컨텐츠가 있으면 true, 없으면 false (컨텐츠 추가 화면 표시)
      actualHasContent = !!firstContent
    }
  }
  // 컨텐츠를 추가한 경우 true로 설정
  if (projectId && addedContents.has(projectId)) {
    actualHasContent = true
  }

  // 프로젝트 즐겨찾기 관련
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('project-favorites')
    if (saved) {
      try {
        return new Set(JSON.parse(saved))
      } catch {
        return new Set()
      }
    }
    return new Set()
  })

  const toggleFavorite = () => {
    if (!projectId) return
    const newFavorites = new Set(favorites)
    if (newFavorites.has(projectId)) {
      newFavorites.delete(projectId)
    } else {
      newFavorites.add(projectId)
    }
    setFavorites(newFavorites)
    localStorage.setItem('project-favorites', JSON.stringify(Array.from(newFavorites)))
  }

  const isFavorite = projectId ? favorites.has(projectId) : false

  // 오래된 localStorage 키 정리 (마이그레이션)
  useEffect(() => {
    const oldKeys = ['added-contents', 'added-contents-v2']
    oldKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key)
      }
    })
  }, [])

  // 잘못된 projectId(all, 브랜드, 2뎁스)로 접근 시 /project로 리다이렉트
  useEffect(() => {
    const invalidIds = ['all', 'hyundai', 'kia', 'genesis', 'cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
    if (projectId && invalidIds.includes(projectId)) {
      navigate('/project', { replace: true })
    }
  }, [projectId, navigate])

  if (!projectData) {
    return (
      <Box sx={{ padding: '40px', textAlign: 'center' }}>
        <Typography>프로젝트를 찾을 수 없습니다.</Typography>
      </Box>
    )
  }

  return (
    <>
      <ProjectLayout
        selectedProject={projectId}
        onProjectSelect={(id) => {
          const brandItems = ['hyundai', 'kia', 'genesis']
          const depth2Items = ['cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']

          if (id === 'all') {
            // 전체 프로젝트 선택 시
            navigate('/project?selected=all')
          } else if (brandItems.includes(id)) {
            // 브랜드 선택 시: 해당 브랜드로 필터링된 프로젝트 목록으로 이동
            navigate(`/project?selected=${id}`)
          } else if (depth2Items.includes(id)) {
            // 2뎁스 모델 선택 시: 부모 브랜드로 필터링된 프로젝트 목록으로 이동
            let brandId = ''
            if (id.startsWith('cn7') || id.startsWith('cn6')) brandId = 'hyundai'
            else if (id.startsWith('ev6') || id.startsWith('k8')) brandId = 'kia'
            else if (id.startsWith('gv80') || id.startsWith('g90')) brandId = 'genesis'
            navigate(`/project?selected=${brandId}`)
          } else {
            // 3뎁스 프로젝트는 해당 프로젝트 상세로 이동
            navigate(`/project/${id}`)
          }
        }}
        onAddProject={() => setIsAddProjectOpen(true)}
      >
        {/* 우측 패널 - 프로젝트 상세 정보 */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* 프로젝트 정보 헤더 */}
              <Box
                sx={{
                  padding: '16px 24px 0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  {/* 좌측: 프로젝트 코드 + 즐겨찾기 */}
                  <Box
                    sx={{
                      flex: '1 1 auto',
                      minWidth: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: '30px',
                        color: 'var(--on_surface)',
                      }}
                    >
                      {projectName || projectData.code}
                    </Typography>
                    <Box
                      onClick={toggleFavorite}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.7,
                        },
                      }}
                      aria-label="즐겨찾기"
                    >
                      {isFavorite ? (
                        <Ic_star_filled size="20px" color="var(--yellow)" />
                      ) : (
                        <Ic_star_regular size="20px" color="var(--on_surface_mid)" />
                      )}
                    </Box>
                  </Box>

                  {/* 우측: SOP + 버튼들 */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap',
                      flex: '0 1 auto',
                    }}
                  >
                    {/* SOP Badge */}
                    <Badge
                      hdsProps={{
                        size: 'small',
                        style: 'default',
                        icon: false,
                        type: 'strong',
                      }}
                      sx={{
                        marginRight: '12px',
                        '& .MuiBadge-badge': {
                          position: 'static',
                          transform: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: 'var(--on_surface_mid)',
                          }}
                        >
                          {t('projectDetail.header.sop')}
                        </Typography>
                        <Box
                          sx={{
                            width: '1px',
                            height: '10px',
                            backgroundColor: 'var(--outline_low)',
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '18px',
                          }}
                        >
                          {projectData.sop}
                        </Typography>
                      </Box>
                    </Badge>

                    {/* 프로젝트 멤버 관리 */}
                    <Button
                      hdsProps={{
                        size: 'medium',
                        type: 'outline',
                        icon: (
                          <>
                            <Ic_group_bold size="16px" />
                          </>
                        ),
                        style: undefined,
                      }}
                      onClick={() => setIsMembersOpen(true)}
                    >
                      {canAddContent ? t('projectDetail.header.manageMembers') : t('projectDetail.header.members')}
                    </Button>

                    {/* 프로젝트 설정 */}
                    <Button
                      hdsProps={{
                        size: 'medium',
                        type: 'outline',
                        icon: (
                          <>
                            <Ic_setting_bold size="16px" />
                          </>
                        ),
                        style: undefined,
                      }}
                      aria-label={t('projectDetail.header.projectSettings')}
                      onClick={() => setIsProjectSettingsOpen(true)}
                    >
                      {t('projectDetail.header.projectSettings')}
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* 컨텐츠 섹션 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 24px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '12px',
                    display: 'inline-flex',
                  }}
                >
                  {/* 컨텐츠 타이틀 */}
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: '24px',
                      color: 'var(--primary)',
                    }}
                  >
                    {t('projectDetail.contents.title')}
                  </Typography>

                  {/* 컨텐츠 컨테이너 */}
                  <Box
                    sx={{
                      alignSelf: 'stretch',
                      flex: '1 1 0',
                      paddingLeft: actualHasContent ? '12px' : '28px',
                      paddingRight: actualHasContent ? '12px' : '28px',
                      paddingTop: actualHasContent ? '12px' : (canAddContent ? '64px' : '120px'),
                      paddingBottom: actualHasContent ? '12px' : '52px',
                      background: 'linear-gradient(180deg, #F4F5F6 0%, rgba(244, 245, 246, 0.50) 100%)',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      border: actualHasContent ? '1px solid var(--outline)' : '1px dashed rgba(0, 0, 0, 0.12)',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: actualHasContent ? 'flex-start' : 'center',
                      gap: '16px',
                      display: 'flex',
                    }}
                  >
                    {actualHasContent ? (
                      /* 컨텐츠 카드 */
                      <Box
                        onClick={() => {
                          if (!projectId) return

                          // contentId가 있으면 사용하고, 없으면 해당 프로젝트의 첫 번째 컨텐츠 ID 찾기
                          let targetContentId = contentId
                          if (!targetContentId) {
                            const projectCode = TREE_ITEM_TO_PROJECT_CODE[projectId]
                            const projectContent = MOCK_PROJECTS.find(p =>
                              p.projectCode === projectCode &&
                              p.contentType &&
                              p.contentType.trim() !== ''
                            )
                            if (projectContent) {
                              targetContentId = String(projectContent.id)
                            }
                          }

                          if (targetContentId) {
                            navigate(`/project/${projectId}/content/${targetContentId}`)
                          }
                        }}
                        sx={{
                          width: '220px',
                          background: 'white',
                          boxShadow: '0px 4px 12px rgba(34, 34, 34, 0.1)',
                          borderRadius: '8px',
                          border: '1px solid rgba(238, 239, 241, 1)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0px 8px 20px rgba(34, 34, 34, 0.15)',
                          },
                        }}
                      >
                        {/* 이미지 섹션 */}
                        <Box
                          sx={{
                            position: 'relative',
                            width: '208px',
                            height: '110px',
                            margin: '6px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          {/* 메인 이미지 */}
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(180deg, #C4C6C9 0%, #E8E9EB 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <img
                              src="/images/car_05.png"
                              alt="Vehicle"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                        </Box>

                        {/* 카드 내용 */}
                        <Box
                          sx={{
                            padding: '8px 12px 12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                          }}
                        >
                          {/* Beauty Angle Cut 배지 + 타임스탬프 */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Badge
                              hdsProps={{
                                size: 'medium',
                                style: 'purple',
                                icon: <Ic_picture_filled size="16px" color="currentColor" />,
                                type: 'strong',
                              }}
                              sx={{
                                width: 'fit-content',
                                '& .MuiBadge-badge': {
                                  position: 'static',
                                  transform: 'none',
                                },
                              }}
                            >
                              {t('common.contentType.beautyAngleCut')}
                            </Badge>

                            {/* 타임스탬프 */}
                            <Typography
                              sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                                lineHeight: '18px',
                                color: 'var(--on_surface_mid)',
                              }}
                            >
                              {t('projectDetail.recentlyVisited.timeAgo.hoursAgo', { hours: 4 })}
                            </Typography>
                          </Box>

                          {/* 태그들 */}
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '6px',
                            }}
                          >
                            <Badge
                              hdsProps={{
                                size: 'small',
                                style: 'default',
                                icon: false,
                                type: 'strong',
                              }}
                            >
                              {t('common.channel.ivi')}
                            </Badge>
                            <Badge
                              hdsProps={{
                                size: 'small',
                                style: 'default',
                                icon: false,
                                type: 'strong',
                              }}
                            >
                              {t('common.channel.oneWeb')}
                            </Badge>
                            <Badge
                              hdsProps={{
                                size: 'small',
                                style: 'default',
                                icon: false,
                                type: 'strong',
                              }}
                            >
                              {t('common.channel.oneApp')}
                            </Badge>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      /* Empty State */
                      <>
                    {/* 안내 메시지 */}
                    <Typography
                      sx={{
                        alignSelf: 'stretch',
                        textAlign: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'var(--on_primary_highest)',
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: '22px',
                      }}
                    >
                      {t('projectDetail.contents.emptyTitle')}
                      {canAddContent && (
                        <>
                          <br />
                          {t('projectDetail.contents.emptyDescription')}
                        </>
                      )}
                    </Typography>

                    {/* 일러스트레이션 */}
                    <Box
                      sx={{
                        alignSelf: 'stretch',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={i18n.language === 'en' ? '/images/contents_card_en.png' : '/images/contents_card.png'}
                        alt="Content cards illustration"
                        style={{
                          width: '360px',
                          height: 'auto',
                        }}
                      />
                    </Box>

                    {/* Beauty Angle Cut 추가 버튼 섹션 - L1, L2 권한만 표시 */}
                    {canAddContent && (
                      <Box
                        sx={{
                          width: '360px',
                          maxWidth: '360px',
                          minWidth: '360px',
                          paddingLeft: '13px',
                          paddingRight: '13px',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          background: 'white',
                          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
                          overflow: 'hidden',
                          borderRadius: '8px',
                          outline: '1px var(--outline) solid',
                          outlineOffset: '-1px',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          display: 'inline-flex',
                        }}
                      >
                        <Box
                          sx={{
                            flex: '1 1 0',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '10px',
                            display: 'flex',
                          }}
                        >
                          {/* 아이콘 */}
                          <Box
                            sx={{
                              width: '36px',
                              height: '36px',
                              background: 'linear-gradient(180deg, #8333E6 40%, rgba(131, 51, 230, 0.85) 100%)',
                              borderRadius: '4px',
                              outline: '1px rgba(0, 0, 0, 0.10) solid',
                              outlineOffset: '-1px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            <Ic_picture_filled size="16px" color="white" />
                          </Box>

                          {/* 텍스트와 버튼 */}
                          <Box
                            sx={{
                              flex: '1 1 0',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            <Box
                              sx={{
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                display: 'inline-flex',
                              }}
                            >
                              <Typography
                                sx={{
                                  color: 'var(--primary)',
                                  fontSize: 16,
                                  fontWeight: 700,
                                  lineHeight: '24px',
                                }}
                              >
                                {t('projectDetail.contents.beautyAngleCut.title')}
                              </Typography>
                              <Typography
                                sx={{
                                  justifyContent: 'center',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  color: 'var(--on_surface_high)',
                                  fontSize: 12,
                                  fontWeight: 500,
                                  lineHeight: '18px',
                                }}
                              >
                                {t('projectDetail.contents.beautyAngleCut.description')}
                              </Typography>
                            </Box>

                            {/* 추가 버튼 */}
                            <Button
                              hdsProps={{
                                size: 'medium',
                                type: 'fill',
                                icon: <Ic_plus_regular size="16px" color="white" />,
                                style: undefined,
                              }}
                              sx={{
                                width: 'fit-content',
                                minWidth: '0 !important',
                                '&.MuiButton-root': {
                                  minWidth: '0 !important',
                                }
                              }}
                              onClick={() => setIsAddContentOpen(true)}
                            >
                              {t('projectDetail.contents.beautyAngleCut.addButton')}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
      </ProjectLayout>

      {/* 프로젝트 설정 다이얼로그 */}
      <Dialog open={isProjectSettingsOpen} onClose={() => setIsProjectSettingsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsProjectSettingsOpen(false) }}>
          {t('projectDetail.header.projectSettings')}
        </DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>{t('projectDetail.dialogs.projectSettings.placeholder')}</Typography>
          </Box>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsProjectSettingsOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button hdsProps={{ type: 'fill', style: 'primary' }} onClick={() => setIsProjectSettingsOpen(false)}>
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 멤버 관리 다이얼로그 */}
      <Dialog open={isMembersOpen} onClose={() => setIsMembersOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsMembersOpen(false) }}>
          {t('projectDetail.header.manageMembers')}
        </DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>{t('projectDetail.dialogs.members.placeholder')}</Typography>
          </Box>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsMembersOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button hdsProps={{ type: 'fill', style: 'primary' }} onClick={() => setIsMembersOpen(false)}>
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 컨텐츠 추가 다이얼로그 */}
      <Dialog
        open={isAddContentOpen}
        onClose={handleCloseAddContentDialog}
        maxWidth={false}
        PaperProps={{
          sx: { width: '620px', height: 'auto' }
        }}
      >
        <DialogTitle hdsProps={{ closeIcon: true, onClose: handleCloseAddContentDialog }}>{t('projectDetail.dialogs.addContent.title')}</DialogTitle>
        <DialogContent hdsProps sx={{ paddingTop: '20px !important', paddingBottom: '0px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 프로젝트 정보 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: '26px', color: 'var(--primary)' }}>
                    CN7(AL23)_HEV_25FMC
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'var(--on_surface_high)' }}>
                    OA 25 ∙ AVANTE(CN7)
                  </Typography>
                </Box>
              </Box>

              {/* Beauty Angle Cut 버튼 */}
              <Box
                sx={{
                  background: 'var(--surface_container)',
                  border: '1px solid var(--outline)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px 8px 8px',
                }}
              >
                <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '34px',
                      height: '34px',
                      background: 'linear-gradient(180deg, #8333E6 40%, rgba(131, 51, 230, 0.85) 100%)',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ic_picture_filled size="16px" color="white" />
                  </Box>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: 'var(--primary)' }}>
                    {t('projectDetail.contents.beautyAngleCut.title')}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'var(--on_surface_high)' }}>
                  {t('projectDetail.contents.beautyAngleCut.description')}
                </Typography>
              </Box>
            </Box>

            {/* 런칭 일정 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--on_surface)' }}>
                    {t('projectDetail.dialogs.addContent.launchDate')}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <DatePicker
                  hdsProps={{
                    size: 'medium',
                    isClear: true,
                    helpText: undefined,
                    isInvalid: false,
                    isReadOnly: false
                  }}
                  selected={launchDate}
                  onChange={(date: Date | null) => setLaunchDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText={t('projectDetail.dialogs.addContent.selectLaunchDate')}
                />
              </Box>

              {/* 활성 채널 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--on_surface)' }}>
                    {t('projectDetail.dialogs.addContent.activeChannel')}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <Select
                  multiple
                  hdsProps={{
                    size: 'medium',
                    type: 'underline',
                  }}
                  placeholder={t('projectDetail.dialogs.addContent.selectChannel')}
                  value={activeChannel}
                  onChange={(e) => setActiveChannel(e.target.value as string[])}
                  renderValue={(selected) => {
                    const selectedArray = selected as string[]
                    if (selectedArray.length === 0) {
                      return (
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22px',
                            color: 'var(--on_surface_mid)',
                          }}
                        >
                          {t('projectDetail.dialogs.addContent.selectChannel')}
                        </Typography>
                      )
                    }
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {selectedArray.map((value) => (
                          <Box
                            key={value}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <Chip
                              hdsProps={{
                                label: value,
                                size: 'medium',
                                icon: undefined,
                                type: 'fill_low',
                              }}
                              onDelete={(e) => {
                                e?.stopPropagation()
                                handleDeleteChannel(value)
                              }}
                              sx={{
                                '& .MuiChip-deleteIcon': {
                                  padding: '4px',
                                  margin: '0 4px 0 -4px',
                                  '&:hover': {
                                    opacity: 0.7,
                                  }
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )
                  }}
                  style={{ width: '100%' }}
                  sx={{
                    '& .input_text': {
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: 'var(--on_surface_mid)',
                    },
                    '& .input_box': {
                      paddingTop: '4px !important',
                    }
                  }}
                >
                  <MenuItem hdsProps={{ size: 'medium', icon: false, nested: false, multiple: true }} value={t('common.channel.oneApp')}>
                    {t('common.channel.oneApp')}
                  </MenuItem>
                  <MenuItem hdsProps={{ size: 'medium', icon: false, nested: false, multiple: true }} value={t('common.channel.oneWeb')}>
                    {t('common.channel.oneWeb')}
                  </MenuItem>
                  <MenuItem hdsProps={{ size: 'medium', icon: false, nested: false, multiple: true }} value={t('common.channel.ivi')}>
                    {t('common.channel.ivi')}
                  </MenuItem>
                  <MenuItem hdsProps={{ size: 'medium', icon: false, nested: false, multiple: true }} value={t('common.channel.legacyWeb')}>
                    {t('common.channel.legacyWeb')}
                  </MenuItem>
                </Select>
              </Box>

              {/* 컨텐츠 접근 권한 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--on_surface)' }}>
                    {t('projectDetail.dialogs.addContent.accessPermission')}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>

                {/* 선택된 멤버 Chip 표시 영역 */}
                <Box
                  sx={{
                    minHeight: '22px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {selectedMembers.size === 0 ? (
                    <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--on_surface_mid)' }}>
                      {t('projectDetail.dialogs.addContent.selectMembers')}
                    </Typography>
                  ) : (
                    Array.from(selectedMembers).map((index) => {
                      const member = sortedMembers[index]
                      return (
                        <Box
                          key={index}
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <Chip
                            hdsProps={{
                              label: member.email,
                              size: 'medium',
                              icon: undefined,
                              type: 'fill_low',
                            }}
                            onDelete={(e) => {
                              e?.stopPropagation()
                              handleDeleteMember(index)
                            }}
                            sx={{
                              maxWidth: 'none',
                              '& .MuiChip-label': {
                                overflow: 'visible',
                                textOverflow: 'clip',
                              },
                              '& .MuiChip-deleteIcon': {
                                padding: '4px',
                                margin: '0 4px 0 -4px',
                                '&:hover': {
                                  opacity: 0.7,
                                }
                              }
                            }}
                          />
                        </Box>
                      )
                    })
                  )}
                </Box>

                {/* 검색 필드 */}
                <TextField
                  type="text"
                  placeholder={t('projectDetail.dialogs.addContent.searchMembers')}
                  hdsProps={{
                    size: 'medium',
                    isClear: true,
                    startIcon: (
                      <>
                        <Ic_search_bold size="16px" />
                      </>
                    ),
                    endIcon: null,
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />

                {/* 테이블 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '292px',
                    maxHeight: '292px',
                    overflow: sortedMembers.length === 0 ? 'hidden' : 'auto',
                  }}
                >
                  <Table hdsProps={{ size: 'medium' }} stickyHeader>
                    <TableHead>
                      <TableRow sx={{ height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important' }}>
                        <TableCell sx={{ width: '56px', padding: '6px 16px !important', height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important' }}>
                          <Checkbox
                            hdsProps={{ size: 'medium' }}
                            checked={totalMembers > 0 && selectedMembers.size === totalMembers}
                            indeterminate={selectedMembers.size > 0 && selectedMembers.size < totalMembers}
                            onChange={handleSelectAll}
                            disabled={totalMembers === 0}
                            sx={{
                              '& .label_checkbox': {
                                padding: '0 !important',
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important', padding: '6px 16px !important' }}>
                          <TableSortLabel
                            active={orderBy === 'email'}
                            direction={orderBy === 'email' ? order : 'asc'}
                            onClick={() => handleSort('email')}
                          >
                            {t('login.form.emailLabel')}
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '180px', height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important', padding: '6px 16px !important' }}>
                          <TableSortLabel
                            active={orderBy === 'role'}
                            direction={orderBy === 'role' ? order : 'asc'}
                            onClick={() => handleSort('role')}
                          >
                            {t('projectDetail.dialogs.addContent.role')}
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ width: '120px', height: '36px !important', minHeight: '36px !important', maxHeight: '36px !important', padding: '6px 16px !important' }}>
                          <TableSortLabel
                            active={orderBy === 'company'}
                            direction={orderBy === 'company' ? order : 'asc'}
                            onClick={() => handleSort('company')}
                          >
                            {t('projectDetail.dialogs.addContent.company')}
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedMembers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} sx={{ border: 'none' }}>
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '80px 0',
                              }}
                            >
                              <Ic_caution_bold size="40px" color="var(--on_surface_mid)" />
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    lineHeight: '22px',
                                    color: 'var(--on_surface_mid)',
                                    textAlign: 'center',
                                  }}
                                >
                                  {t('project.empty.noSearchResult')}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedMembers.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: '0 16px' }}>
                            <Checkbox
                              hdsProps={{ size: 'medium' }}
                              checked={selectedMembers.has(index)}
                              onChange={() => handleSelectMember(index)}
                              sx={{
                                '& .label_checkbox': {
                                  padding: '0 !important',
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
                              {member.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Badge
                              hdsProps={{
                                size: 'medium',
                                style: 'default',
                                icon: getRoleIcon(member.role),
                                type: 'strong',
                              }}
                            >
                              {t(`common.role.${member.role}`)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>
                              {t(`common.company.${member.company}`)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions hdsProps sx={{ paddingTop: '16px !important' }}>
          <Button
            hdsProps
            onClick={handleCloseAddContentDialog}
            sx={{
              minWidth: '0 !important',
              width: 'fit-content',
              padding: '8px 16px !important',
            }}
          >
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            disabled={!(launchDate && activeChannel.length > 0 && selectedMembers.size > 0)}
            onClick={() => {
              // 컨텐츠 추가 처리
              if (projectId) {
                const newAddedContents = new Set(addedContents)
                newAddedContents.add(projectId)
                setAddedContents(newAddedContents)
                setShowSnackbar(true)
              }
              handleCloseAddContentDialog()
            }}
          >
            {t('projectDetail.dialogs.addContent.addButton')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 컨텐츠 추가 완료 스낵바 */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          bottom: '40px !important',
        }}
      >
        <SnackbarContent
          hdsProps={{
            type: 'dark_low',
            isClose: true,
            icon: true,
          }}
          message={t('projectDetail.dialogs.addContent.success')}
        />
      </Snackbar>

      {/* 프로젝트 추가 다이얼로그 */}
      <AddProjectDialog
        open={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onNext={(projectCode) => {
          console.log('Selected project:', projectCode)
          setIsAddProjectOpen(false)
          setShowProjectSnackbar(true)
        }}
      />

      {/* 프로젝트 추가 완료 스낵바 */}
      <Snackbar
        open={showProjectSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowProjectSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          bottom: '40px !important',
        }}
      >
        <SnackbarContent
          hdsProps={{
            type: 'dark_low',
            isClose: true,
            icon: true,
          }}
          message={t('project.addDialog.success')}
        />
      </Snackbar>
    </>
  )
}

export default ProjectDetail
