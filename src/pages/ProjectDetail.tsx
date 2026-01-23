import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProjectLayout from '@/components/ProjectLayout'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@hmg-fe/hmg-design-system'
import {
  Ic_group_bold,
  Ic_setting_bold,
  Ic_star_filled,
  Ic_star_regular,
  Ic_picture_filled,
  Ic_plus_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { MOCK_PROJECTS, PROJECT_CODE_TO_TREE_ITEM, PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'

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
    // MOCK_PROJECTS에서 해당 프로젝트 찾기
    const mockProject = MOCK_PROJECTS.find((p) => p.projectCode === projectCode)

    if (mockProject) {
      sampleProjects[treeId] = {
        id: treeId,
        name: projectCode,
        code: projectCode,
        brand: mockProject.brand,
        sop: mockProject.sop,
        hasContent: !!mockProject.contentType, // contentType이 있으면 컨텐츠가 있는 것으로 간주
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
  const { t } = useTranslation()
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false)
  const [isMembersOpen, setIsMembersOpen] = useState(false)

  // 프로젝트 데이터 가져오기
  const projectData = projectId ? sampleProjects[projectId] : null
  const projectName = projectId ? projectNames[projectId] : null

  // 즐겨찾기 관련
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
        onAddProject={() => {}}
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
                      {t('projectDetail.header.manageMembers')}
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

              {/* Empty State - 컨텐츠 없는 상태 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 24px',
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

                  {/* Empty State 컨테이너 */}
                  <Box
                    sx={{
                      alignSelf: 'stretch',
                      flex: '1 1 0',
                      paddingLeft: '28px',
                      paddingRight: '28px',
                      paddingTop: '64px',
                      paddingBottom: '52px',
                      background: 'linear-gradient(180deg, #F4F5F6 0%, rgba(244, 245, 246, 0.50) 100%)',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      border: '1px dashed rgba(0, 0, 0, 0.15)',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '16px',
                      display: 'flex',
                    }}
                  >
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
                      <br />
                      {t('projectDetail.contents.emptyDescription')}
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
                        src="/images/contents_card.png"
                        alt="Content cards illustration"
                        style={{
                          width: '360px',
                          height: 'auto',
                        }}
                      />
                    </Box>

                    {/* Beauty Angle Cut 추가 버튼 섹션 */}
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
                        outline: '1px #EEEFF1 solid',
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
      </ProjectLayout>

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
    </>
  )
}

export default ProjectDetail
