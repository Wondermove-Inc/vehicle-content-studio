import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import { Dialog, DialogTitle, DialogContent, DialogActions, SimpleTreeView, TreeItem, EmptyError } from '@hmg-fe/hmg-design-system'
import {
  Ic_star_filled,
  Ic_star_regular,
  Ic_setting_bold,
  Ic_group_bold,
  Ic_plus_regular,
  Ic_folder_filled,
  Ic_search_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import Sidebar from '../components/Sidebar'
import { PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'

// 프로젝트 데이터 타입
interface ProjectData {
  id: string
  name: string
  code: string
  brand: string
  sop: string
  hasContent: boolean
}

// 샘플 프로젝트 데이터
const sampleProjects: Record<string, ProjectData> = {
  'hev-25-fmc': {
    id: 'hev-25-fmc',
    name: 'CN7I(AL23)_HEV_25FMC',
    code: 'CN7I(AL23)_HEV_25FMC',
    brand: '현대자동차',
    sop: '2026-03',
    hasContent: false,
  },
  'hev-26-my': {
    id: 'hev-26-my',
    name: 'CN7I(AL23)_HEV_26MY',
    code: 'CN7I(AL23)_HEV_26MY',
    brand: '현대자동차',
    sop: '2026-06',
    hasContent: true,
  },
  'ev6-26-my': {
    id: 'ev6-26-my',
    name: 'EV6_26MY',
    code: 'EV6_26MY',
    brand: '기아',
    sop: '2026-03',
    hasContent: true,
  },
}

// 트리 노드 타입
type TreeNode = {
  id: string
  label: string
  count?: number
  children?: TreeNode[]
}

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [isMembersOpen, setIsMembersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])

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

  // 프로젝트 데이터 가져오기
  const projectData = projectId ? sampleProjects[projectId] : null
  const projectName = projectId ? projectNames[projectId] : null

  // 즐겨찾기 토글
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

  // 트리 데이터 구조
  const treeData: TreeNode[] = [
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
            { id: 'hev-27-my', label: 'CN7I(AL23)_HEV_27MY' },
            { id: 'hev-26-my', label: 'CN7I(AL23)_HEV_26MY' },
            { id: 'hev-25-fmc', label: 'CN7I(AL23)_HEV_25FMC' },
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

  // 검색어 변경 시 트리 노드 자동 확장
  useEffect(() => {
    if (searchQuery.trim()) {
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
      setExpandedItems([])
    }
  }, [searchQuery])

  // projectId가 변경될 때 트리 자동 확장 및 선택
  useEffect(() => {
    // 검색 중이 아니고 projectId가 있을 때만 실행
    if (projectId && !searchQuery.trim()) {
      // 트리를 순회하면서 projectId를 찾고, 부모 노드들의 ID를 수집
      const findParentIds = (nodes: TreeNode[], targetId: string, parents: string[] = []): string[] | null => {
        for (const node of nodes) {
          // 현재 노드가 타겟이면 부모들의 ID 반환
          if (node.id === targetId) {
            return parents
          }
          // 자식이 있으면 재귀적으로 탐색
          if (node.children) {
            const found = findParentIds(node.children, targetId, [...parents, node.id])
            if (found) return found
          }
        }
        return null
      }

      const parentIds = findParentIds(treeData, projectId)
      if (parentIds) {
        setExpandedItems(parentIds)
      }
    }
  }, [projectId, searchQuery])

  if (!projectData) {
    return (
      <Box sx={{ padding: '40px', textAlign: 'center' }}>
        <Typography>프로젝트를 찾을 수 없습니다.</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#F5F5F5',
      }}
    >
      {/* 사이드바 */}
      <Sidebar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
        selectedProject={projectId}
        onProjectSelect={(id) => navigate(`/project/${id}`)}
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
          {/* 헤더 영역 - Project.tsx와 동일 */}
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
                onClick={() => {
                  // TODO: 프로젝트 추가
                  console.log('프로젝트 추가')
                }}
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
                            onClick={() => navigate('/project')}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              height: '38px',
                              padding: '0 10px',
                              backgroundColor: 'transparent',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: '#FAFAFA',
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
                          selectedItems={projectId || ''}
                          onSelectedItemsChange={(_, itemId) => {
                            if (itemId) {
                              const id = itemId as string
                              // 2뎁스 아이템은 선택하지 않음
                              const depth2Items = ['cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
                              if (!depth2Items.includes(id) && id !== 'hyundai' && id !== 'kia' && id !== 'genesis') {
                                navigate(`/project/${id}`)
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
                                <TreeItem key={model.id} itemId={model.id} label={`${model.label} (${model.count})`} hdsProps={{ type: 'default' }}>
                                  {model.children?.map((project) => (
                                    <TreeItem
                                      key={project.id}
                                      itemId={project.id}
                                      label={
                                        <Typography sx={{ fontSize: 15, fontWeight: 500, lineHeight: 1, color: '#111111', display: 'flex', alignItems: 'center' }}>{project.label}</Typography>
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

            {/* 우측 패널 - 컨텐츠 영역 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* 프로젝트 정보 헤더 */}
              <Box
                sx={{
                  padding: '20px 24px 16px',
                  borderBottom: '1px solid var(--outline)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  {/* 좌측: 프로젝트 코드 + 즐겨찾기 */}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* SOP Badge */}
                    <Badge
                      hdsProps={{
                        size: 'medium',
                        style: 'default',
                        icon: false,
                        type: 'outlined',
                      }}
                      sx={{
                        '& .MuiBadge-badge': {
                          position: 'static',
                          transform: 'none',
                        },
                      }}
                    >
                      {t('projectDetail.header.sop')} {projectData.sop}
                    </Badge>

                    {/* 프로젝트 멤버 관리 */}
                    <Button
                      hdsProps={{
                        size: 'medium',
                        style: 'primary',
                        type: 'outline',
                        icon: <Ic_group_bold size="16px" />,
                      }}
                      onClick={() => setIsMembersOpen(true)}
                    >
                      {t('projectDetail.header.manageMembers')}
                    </Button>

                    {/* 프로젝트 설정 */}
                    <Button
                      hdsProps={{
                        size: 'medium',
                        style: 'primary',
                        type: 'outline',
                        icon: <Ic_setting_bold size="16px" />,
                        isIconOnly: true,
                      }}
                      aria-label={t('projectDetail.header.projectSettings')}
                      onClick={() => setIsProjectSettingsOpen(true)}
                    />
                  </Box>
                </Box>

                {/* 컨텐츠 타이틀 */}
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: 'var(--on_surface)',
                  }}
                >
                  {t('projectDetail.contents.title')}
                </Typography>
              </Box>

              {/* Empty State - 컨텐츠 없는 상태 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 24px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px',
                    maxWidth: '600px',
                  }}
                >
                  {/* Empty State 메시지 */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: '24px',
                        color: 'var(--on_surface)',
                        marginBottom: '8px',
                      }}
                    >
                      {t('projectDetail.contents.emptyTitle')}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: '21px',
                        color: 'var(--on_surface_mid)',
                      }}
                    >
                      {t('projectDetail.contents.emptyDescription')}
                    </Typography>
                  </Box>

                  {/* 일러스트레이션 (임시로 아이콘 사용) */}
                  <Box
                    sx={{
                      width: '200px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '8px',
                    }}
                  >
                    <Ic_folder_filled size="48px" color="var(--on_surface_low)" />
                  </Box>

                  {/* Beauty Angle Cut 추가 섹션 */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      border: '1px solid var(--outline)',
                      borderRadius: '8px',
                      width: '100%',
                    }}
                  >
                    {/* 아이콘 + 텍스트 */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flex: 1,
                      }}
                    >
                      {/* 보라색 아이콘 배경 */}
                      <Box
                        sx={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#8333E6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ic_folder_filled size="24px" color="#ffffff" />
                      </Box>

                      {/* 텍스트 */}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            lineHeight: '22px',
                            color: 'var(--on_surface)',
                          }}
                        >
                          {t('projectDetail.contents.beautyAngleCut.title')}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 400,
                            lineHeight: '19px',
                            color: 'var(--on_surface_mid)',
                          }}
                        >
                          {t('projectDetail.contents.beautyAngleCut.description')}
                        </Typography>
                      </Box>
                    </Box>

                    {/* 추가 버튼 */}
                    <Button
                      hdsProps={{
                        size: 'medium',
                        style: 'strong',
                        type: 'fill',
                        icon: <Ic_plus_regular size="16px" color="#fff" />,
                      }}
                      onClick={() => {
                        // TODO: 컨텐츠 추가 로직
                        console.log('Beauty Angle Cut 추가')
                      }}
                    >
                      {t('projectDetail.contents.beautyAngleCut.addButton')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 프로젝트 설정 다이얼로그 */}
      <Dialog open={isProjectSettingsOpen} onClose={() => setIsProjectSettingsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsProjectSettingsOpen(false) }}>
          {t('projectDetail.header.projectSettings')}
        </DialogTitle>
        <DialogContent hdsProps>
          <Box sx={{ padding: '20px 0' }}>
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>프로젝트 설정 기능이 구현될 예정입니다.</Typography>
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
            <Typography sx={{ color: 'var(--on_surface_mid)' }}>멤버 관리 기능이 구현될 예정입니다.</Typography>
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
    </Box>
  )
}

export default ProjectDetail
