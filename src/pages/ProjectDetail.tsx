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
  Ic_folder_filled,
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
                  padding: '20px 24px 16px',
                  borderBottom: '1px solid var(--outline)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
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
