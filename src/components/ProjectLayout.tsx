import { useState, useEffect, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sidebar from '@/components/Sidebar'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import { SimpleTreeView, TreeItem, EmptyError } from '@hmg-fe/hmg-design-system'
import { Ic_search_regular, Ic_plus_regular } from '@hmg-fe/hmg-design-system/HmgIcon'
import { PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'
import { useAuth } from '@/contexts/AuthContext'
import { PermissionLevel } from '@/types/auth.types'

// 트리 노드 타입
type TreeNode = {
  id: string
  label: string
  count?: number
  children?: TreeNode[]
}

interface ProjectLayoutProps {
  children: ReactNode
  selectedProject?: string
  onProjectSelect?: (projectId: string) => void
  onAddProject?: () => void
}

function ProjectLayout({ children, selectedProject, onProjectSelect, onAddProject }: ProjectLayoutProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // 권한 레벨 체크 - L1, L2만 프로젝트 추가 가능
  const canAddProject = user?.permissionLevel === PermissionLevel.L1_ADMIN ||
                        user?.permissionLevel === PermissionLevel.L2_SERVICE_MANAGER

  // localStorage에서 트리 확장 상태 초기화
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // 키 이름 변경으로 이전 상태 초기화
    const saved = localStorage.getItem('project-tree-expanded-v2')

    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    // 기본값: 모든 트리 닫힌 상태
    return []
  })

  // localStorage에서 프로젝트 즐겨찾기 초기화
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

  // localStorage에서 컨텐츠 즐겨찾기 초기화
  const [contentFavorites, setContentFavorites] = useState<Array<{
    id: string
    type: string
    projectCode: string
    projectId: string
  }>>(() => {
    const defaultFavorites = [
      {
        id: 'hev-25-fmc-beauty-angle-cut-1',
        type: 'Beauty Angle Cut',
        projectCode: 'CN7I(AL23)_HEV_25FMC',
        projectId: 'hev-25-fmc',
      },
      {
        id: 'hev-26-my-beauty-angle-cut-2',
        type: 'Beauty Angle Cut',
        projectCode: 'CN7I(AL23)_HEV_26MY',
        projectId: 'hev-26-my',
      },
      {
        id: 'gv80-26-my-beauty-angle-cut-3',
        type: 'Beauty Angle Cut',
        projectCode: 'GV80_26MY',
        projectId: 'gv80-26-my',
      },
    ]

    const saved = localStorage.getItem('content-favorites')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // 파싱 실패시 기본값 저장 후 반환
        localStorage.setItem('content-favorites', JSON.stringify(defaultFavorites))
        return defaultFavorites
      }
    }
    // localStorage에 데이터가 없으면 기본값 저장 후 반환
    localStorage.setItem('content-favorites', JSON.stringify(defaultFavorites))
    return defaultFavorites
  })

  // localStorage 변경 감지 (즐겨찾기 동기화)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProjects = localStorage.getItem('project-favorites')
      if (savedProjects) {
        try {
          setFavorites(new Set(JSON.parse(savedProjects)))
        } catch {
          setFavorites(new Set())
        }
      } else {
        setFavorites(new Set())
      }

      const savedContents = localStorage.getItem('content-favorites')
      if (savedContents) {
        try {
          setContentFavorites(JSON.parse(savedContents))
        } catch {
          setContentFavorites([])
        }
      } else {
        setContentFavorites([])
      }
    }

    // storage 이벤트는 다른 탭에서만 발생하므로, 같은 탭 내 변경을 위해 interval 사용
    const intervalId = setInterval(handleStorageChange, 500)

    return () => clearInterval(intervalId)
  }, [])

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

  // 이전 localStorage 키 정리 (마운트 시 한 번만 실행)
  useEffect(() => {
    localStorage.removeItem('project-tree-expanded')
  }, [])

  // expandedItems 변경 시 localStorage에 저장 (검색 중이 아닐 때만)
  useEffect(() => {
    if (!searchQuery.trim()) {
      localStorage.setItem('project-tree-expanded-v2', JSON.stringify(expandedItems))
    }
  }, [expandedItems, searchQuery])

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
      // 검색어가 비어질 때는 localStorage에서 복원하거나 빈 상태 유지
      const saved = localStorage.getItem('project-tree-expanded-v2')
      if (saved) {
        try {
          setExpandedItems(JSON.parse(saved))
        } catch {
          setExpandedItems([])
        }
      } else {
        setExpandedItems([])
      }
    }
  }, [searchQuery])

  // selectedProject가 변경될 때 트리 자동 확장/축소
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (selectedProject === 'all') {
        // 'all' 선택 시 모든 트리 닫기
        setExpandedItems([])
      } else if (selectedProject) {
        // 특정 프로젝트 선택 시 해당 경로만 열기
        const findParentIds = (nodes: TreeNode[], targetId: string, parents: string[] = []): string[] | null => {
          for (const node of nodes) {
            if (node.id === targetId) {
              return parents
            }
            if (node.children) {
              const found = findParentIds(node.children, targetId, [...parents, node.id])
              if (found) return found
            }
          }
          return null
        }

        const parentIds = findParentIds(treeData, selectedProject)
        if (parentIds) {
          // 기존 확장 상태와 병합하여 유지
          setExpandedItems(prev => {
            const newIds = parentIds.filter(id => !prev.includes(id))
            return newIds.length > 0 ? [...prev, ...newIds] : prev
          })
        }
      }
    }
  }, [selectedProject, searchQuery])

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
        selectedProject={selectedProject}
        onProjectSelect={onProjectSelect}
        favorites={favorites}
        projectNames={projectNames}
        contentFavorites={contentFavorites}
        onContentSelect={(projectId, contentId) => {
          navigate(`/project/${projectId}`)
        }}
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
            minHeight: 0,
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
              padding: '20px 24px 16px 24px',
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
              {/* 프로젝트 추가 버튼 - L1, L2 권한만 표시 */}
              {canAddProject && (
                <Button
                  hdsProps={{
                    size: 'medium',
                    style: 'strong',
                    type: 'fill',
                    icon: <Ic_plus_regular size="16px" color="#fff" />,
                  }}
                  sx={{
                    flexShrink: 0,
                  }}
                  onClick={onAddProject}
                >
                  {t('project.header.addProject')}
                </Button>
              )}
            </Box>
          </Box>

          {/* 메인 영역 */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
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
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          paddingTop: '80px',
                        }}
                      >
                        <EmptyError
                          hdsProps={{
                            size: 'small',
                            title: undefined,
                            description: t('project.empty.noSearchResult'),
                            buttons: undefined,
                          }}
                        />
                      </Box>
                    ) : (
                      <>
                        {/* 전체 프로젝트 - 검색 중이 아닐 때만 표시 */}
                        {!searchQuery.trim() && (
                          <Box
                            onClick={() => {
                              const isProjectListPage = location.pathname === '/project'
                              if (!isProjectListPage) {
                                navigate('/project?selected=all')
                              } else if (onProjectSelect) {
                                onProjectSelect('all')
                              }
                            }}
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
                            // SimpleTreeView의 기본 동작을 그대로 사용
                            setExpandedItems(itemIds as string[])
                          }}
                          selectedItems={selectedProject === 'all' ? '' : selectedProject || ''}
                          onSelectedItemsChange={(_, itemId) => {
                            if (itemId) {
                              const id = itemId as string
                              const depth2Items = ['cn7-0a25', 'cn6-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
                              const brandItems = ['hyundai', 'kia', 'genesis']
                              const isProjectListPage = location.pathname === '/project'

                              if (brandItems.includes(id)) {
                                // 브랜드 선택 시: 프로젝트 목록 페이지로 이동 (쿼리 파라미터로 필터링)
                                if (!isProjectListPage) {
                                  navigate(`/project?selected=${id}`)
                                } else if (onProjectSelect) {
                                  onProjectSelect(id)
                                }
                              } else if (depth2Items.includes(id)) {
                                // 2뎁스 모델 선택 시: 부모 브랜드로 필터링
                                let brandId = ''
                                if (id.startsWith('cn7') || id.startsWith('cn6')) brandId = 'hyundai'
                                else if (id.startsWith('ev6') || id.startsWith('k8')) brandId = 'kia'
                                else if (id.startsWith('gv80') || id.startsWith('g90')) brandId = 'genesis'

                                if (!isProjectListPage) {
                                  navigate(`/project?selected=${brandId}`)
                                } else if (onProjectSelect) {
                                  onProjectSelect(brandId)
                                }
                              } else {
                                // 3뎁스 프로젝트: 상세 페이지로 이동
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
                            '& .MuiTreeItem-group > .MuiTreeItem-root > .MuiTreeItem-content:hover': {
                              backgroundColor: 'transparent',
                            },
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
                                <Typography
                                  sx={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: '#111111',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
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
                                        <Typography
                                          sx={{
                                            fontSize: 15,
                                            fontWeight: 500,
                                            lineHeight: 1,
                                            color: '#111111',
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          {project.label}
                                        </Typography>
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

            {/* 우측 패널 - 콘텐츠 영역 */}
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectLayout
