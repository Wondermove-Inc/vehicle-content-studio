import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProjectLayout from '@/components/ProjectLayout'
import AddProjectDialog from '@/components/AddProjectDialog'
import RecentlyVisitedContents from '@/components/RecentlyVisitedContents'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { Badge, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableSortLabel, TablePagination, EmptyError, Dialog, DialogTitle, DialogContent, DialogActions, Logo, Snackbar, SnackbarContent } from '@hmg-fe/hmg-design-system'
import {
  Ic_world_filled,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { MOCK_PROJECTS as sampleProjects, PROJECT_CODE_TO_TREE_ITEM as projectCodeToTreeItem, PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'

// 썸네일 이미지 목록
function Project() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [contentType, setContentType] = useState('all')

  // URL 쿼리 파라미터에서 선택된 프로젝트 읽기
  const initialSelectedProject = searchParams.get('selected') || 'all'
  const [selectedProject, setSelectedProject] = useState<string | null>(initialSelectedProject)
  const [sopSortOrder, setSopSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeChannelWidth, setActiveChannelWidth] = useState(120)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [selectedProjectForSettings, setSelectedProjectForSettings] = useState<string | null>(null)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // 브랜드명 번역 함수
  const getBrandLabel = (brand: string): string => {
    const brandMap: Record<string, string> = {
      '현대자동차': t('common.brand.hyundai'),
      '기아': t('common.brand.kia'),
      '제네시스': t('common.brand.genesis'),
    }
    return brandMap[brand] || brand
  }

  // 프로젝트 선택 또는 컨텐츠 유형 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0)
  }, [selectedProject, contentType])

  // URL 쿼리 파라미터 변경 시 selectedProject 업데이트
  useEffect(() => {
    const selected = searchParams.get('selected') || 'all'
    setSelectedProject(selected)
  }, [searchParams])

  // 컴포넌트 언마운트 시 스크롤 타이머 정리
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // 트리 아이템 ID → 프로젝트 코드 매핑 (3뎁스)
  const treeItemToProjectCode: Record<string, string> = {
    // 현대자동차 - CN7I(AL23)
    'hev-27-my': 'CN7I(AL23)_HEV_27MY',
    'hev-26-my': 'CN7I(AL23)_HEV_26MY',
    'hev-25-fmc': 'CN7I(AL23)_HEV_25FMC',
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
    } else if (contentType === 'beautyAngleCut') {
      // "Beauty Angle Cut" 선택 시: contentType이 있는 항목만 표시
      contentTypeMatch = !!project.contentType && project.contentType.trim() !== ''
    }
    // "all"은 전체 표시 (필터링 없음)

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

  const handleScroll = () => {
    setIsScrolling(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  // 1뎁스 브랜드 선택 여부 확인 (페이지네이션 고정 조건)
  const isBrandSelected = selectedProject === 'hyundai' || selectedProject === 'kia' || selectedProject === 'genesis'

  return (
    <>
      <ProjectLayout
        selectedProject={selectedProject ?? undefined}
        onProjectSelect={(id) => {
          setSelectedProject(id)
          // URL 쿼리 파라미터 업데이트 (navigate 대신 history API 사용하여 리렌더링 방지)
          const newUrl = `/project?selected=${id}`
          window.history.replaceState(null, '', newUrl)
        }}
        onAddProject={() => setIsAddProjectOpen(true)}
      >
        {/* 우측 패널 - 테이블 */}
        <Box
          onScroll={!isBrandSelected ? handleScroll : undefined}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: isBrandSelected ? 'hidden' : 'auto',
            minWidth: 0,
            minHeight: 0,
            // 스크롤바 스타일링 - 스크롤 동작 중에만 표시 (1뎁스가 아닐 때만)
            ...(!isBrandSelected && {
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isScrolling ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(0, 0, 0, 0.3)',
              },
              // Firefox 지원
              scrollbarWidth: 'thin',
              scrollbarColor: isScrolling ? 'rgba(0, 0, 0, 0.2) transparent' : 'transparent transparent',
            }),
          }}
        >
              {/* 최근 방문한 컨텐츠 섹션 - "전체" 선택 시에만 표시 */}
              {selectedProject === 'all' && (
                <Box sx={{ padding: '16px 24px 0', minWidth: 0 }}>
                  <RecentlyVisitedContents />
                </Box>
              )}

              {/* 테이블 영역 */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 24px 0',
                ...(isBrandSelected && { flex: 1, overflow: 'hidden', minHeight: 0 }),
              }}>
                {/* 테이블 헤더 영역 */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    marginBottom: '12px',
                  }}
                >
                {/* 좌측: 제목 */}
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: '26px',
                    color: 'var(--primary)',
                  }}
                >
                  {selectedProject === 'all' ? t('project.tree.recentUpdates') :
                   selectedProject === 'hyundai' ? t('common.brand.hyundai') :
                   selectedProject === 'kia' ? t('common.brand.kia') :
                   selectedProject === 'genesis' ? t('common.brand.genesis') :
                   selectedProject && projectNames[selectedProject] ? projectNames[selectedProject] :
                   t('project.tree.recentUpdates')}
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
              {filteredProjects.length === 0 ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EmptyError hdsProps={{ size: 'small', title: undefined, description: t('project.empty.noContent'), buttons: undefined }} />
                </Box>
              ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                ...(isBrandSelected && { flex: 1, overflow: 'hidden', minHeight: 0 }),
              }}>
              <TableContainer
                onScroll={isBrandSelected ? handleScroll : undefined}
                sx={{
                  overflowX: 'auto',
                  ...(isBrandSelected && {
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: 0,
                    // 스크롤바 스타일링 - 1뎁스 선택 시 테이블 컨테이너에 적용
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: isScrolling ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                      borderRadius: '4px',
                      transition: 'background 0.2s ease',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'rgba(0, 0, 0, 0.3)',
                    },
                    // Firefox 지원
                    scrollbarWidth: 'thin',
                    scrollbarColor: isScrolling ? 'rgba(0, 0, 0, 0.2) transparent' : 'transparent transparent',
                  }),
                }}
              >
                <Table hdsProps={{ size: 'medium' }} sx={{ width: '100%', tableLayout: 'fixed', '& .MuiTableBody-root .MuiTableCell-root': { padding: '0 12px !important', minHeight: '64px', verticalAlign: 'middle' }, '& .MuiTableBody-root .MuiTableCell-root:first-child': { padding: '0 !important' }, '& .MuiTableBody-root .MuiTableCell-root:nth-child(2)': { paddingLeft: '0 !important' }, '& .MuiTableBody-root .MuiTableCell-root .cell_text': { display: 'flex', alignItems: 'center' } }}>
                  <TableHead sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      backgroundColor: 'var(--surface)',
                      '& .MuiTableCell-root': { fontSize: '14px !important' },
                      '& .MuiTableCell-root *': { fontSize: '14px !important' },
                      '& .MuiTableCell-root .cell_text': { fontSize: '14px !important' },
                      '& .MuiTableCell-root .cell_text *': { fontSize: '14px !important' },
                      '& .MuiTableSortLabel-root': { fontSize: '14px !important' },
                      '& span': { fontSize: '14px !important' },
                      '& .label_medium': { fontSize: '14px !important' },
                    }}>
                    <TableRow sx={{ height: '40px !important', minHeight: '40px !important', maxHeight: '40px !important', '& .MuiTableCell-root': { padding: '0 12px !important', height: '40px !important', minHeight: '40px !important', maxHeight: '40px !important', lineHeight: '40px !important', whiteSpace: 'nowrap' }, '& .MuiTableCell-root:first-child': { padding: '0 !important' }, '& .MuiTableCell-root:nth-child(2)': { paddingLeft: '0 !important' }, '& .MuiTableCell-root .cell_text': { height: '40px !important', display: 'flex', alignItems: 'center' } }}>
                      <TableCell sx={{ width: '7%', textAlign: 'center', '& .cell_text': { padding: '0 !important', display: 'flex', justifyContent: 'center', width: '100%', height: '40px', alignItems: 'center' } }}>{t('project.table.brand')}</TableCell>
                      <TableCell sx={{ width: '10%' }}></TableCell>
                      <TableCell sx={{ width: '10%' }}>{t('project.table.projectType')}</TableCell>
                      <TableCell sx={{ width: '26%' }}>{t('project.table.projectCode')}</TableCell>
                      <TableCell sx={{ width: '17%' }}>{t('project.table.contentType')}</TableCell>
                      <TableCell sx={{ width: '14%' }}>
                        <TableSortLabel
                          active={sopSortOrder !== null}
                          direction={sopSortOrder === 'asc' ? 'asc' : 'desc'}
                          onClick={handleSopSort}
                        >
                          {t('project.table.sop')}
                        </TableSortLabel>
                      </TableCell>
                      <TableCell sx={{ width: '16%', position: 'relative' }}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProjects.map((project) => {
                      // 프로젝트 코드로 트리 아이템 ID 찾기
                      const projectTreeId = projectCodeToTreeItem[project.projectCode]
                      return (
                      <TableRow
                        key={project.id}
                        onClick={() => {
                          if (projectTreeId) {
                            // 모든 경우에 contentId를 전달 (컨텐츠 유무는 ProjectDetail에서 판단)
                            navigate(`/project/${projectTreeId}?contentId=${project.id}`)
                          }
                        }}
                        sx={{
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 44, 95, 0.04)',
                          },
                        }}
                      >
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                              minHeight: '64px',
                              '& .cell_text': {
                                width: 'fit-content !important',
                                padding: '0 !important',
                              }
                            }}
                          >
                            <Logo
                              hdsProps={{
                                type: project.brand === '현대자동차' ? 'hyundai' : project.brand === '기아' ? 'kia' : 'genesis'
                              }}
                              style={{
                                width: project.brand === '현대자동차' ? '26px' : project.brand === '기아' ? '31px' : '46px',
                                height: project.brand === '현대자동차' ? '15px' : '13px',
                                display: 'block'
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{getBrandLabel(project.brand)}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          <Badge hdsProps={{ size: 'medium', style: 'default', icon: false, type: 'strong' }}>
                            {project.projectType}
                          </Badge>
                        </TableCell>
                        <TableCell sx={{
                          whiteSpace: 'normal !important',
                          wordBreak: 'break-word',
                          lineHeight: '1.5',
                          padding: '12px !important',
                          overflow: 'visible !important',
                        }}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 400,
                              lineHeight: '1.5',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                            }}
                          >
                            {project.projectCode}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
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
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          {project.sop}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
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
                      </TableRow>
                      )
                    })}
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
                hdsProps={{ size: 'xsmall', isRowsPerPage: true }}
                sx={{
                  height: '60px',
                  minHeight: '60px',
                  ...(isBrandSelected && { flexShrink: 0 }),
                }}
              />
              </Box>
              )}
              </Box>
        </Box>
      </ProjectLayout>

      {/* 프로젝트 추가 다이얼로그 */}
      <AddProjectDialog
        open={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onNext={(projectCode) => {
          console.log('Selected project:', projectCode)
          setIsAddProjectOpen(false)
          setShowSnackbar(true)
        }}
      />

      {/* 프로젝트 추가 완료 스낵바 */}
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
          message={t('project.addDialog.success')}
        />
      </Snackbar>

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
    </>
  )
}

export default Project
