import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, EmptyError, Divider } from '@hmg-fe/hmg-design-system'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import { Ic_search_bold, Ic_check_regular } from '@hmg-fe/hmg-design-system/HmgIcon'
import { SEARCH_PROJECT_MOCK } from '@/mocks/searchProjects.mock'

interface AddProjectDialogProps {
  open: boolean
  onClose: () => void
  onNext: (projectCode: string) => void
}

function AddProjectDialog({ open, onClose, onNext }: AddProjectDialogProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState('')

  // 검색 결과 필터링
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return SEARCH_PROJECT_MOCK.filter(
      (project) =>
        project.projectCode.toLowerCase().includes(query) ||
        project.modelName.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // 선택된 프로젝트의 상세 정보
  const selectedProjectDetail = useMemo(() => {
    if (!selectedProject) return null
    return SEARCH_PROJECT_MOCK.find(p => p.projectCode === selectedProject)
  }, [selectedProject])

  const handleNext = () => {
    if (!selectedProject) return
    onNext(selectedProject)
    handleClose()
  }

  const handleClose = () => {
    setSearchQuery('')
    setSelectedProject('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: '620px',
          maxWidth: '620px',
        },
      }}
    >
      <DialogTitle hdsProps={{ closeIcon: true, onClose: handleClose }}>
        {t('project.addDialog.title')}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px 16px',
        }}
      >
        {/* 검색 필드 */}
        <TextField
          hdsProps={{ size: 'medium', isClear: true }}
          fullWidth
          placeholder={t('project.addDialog.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Ic_search_bold size="16px" color="#111" />
              </InputAdornment>
            ),
          }}
          inputProps={{
            onClickClearButton: () => setSearchQuery(''),
          }}
        />

        {/* 하단 영역: 리스트 + 정보 패널 */}
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'stretch',
          }}
        >
          {/* 좌측 패널: 검색 결과 리스트 */}
          <Box
            sx={{
              flex: selectedProject ? '0 0 300px' : '1 1 auto',
              transition: 'flex-basis 0.3s ease',
              height: '548px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          {/* 검색 결과 영역 */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          {!searchQuery.trim() ? (
            // 검색 전 초기 상태
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                padding: '24px 0',
                flexGrow: 1,
                alignSelf: 'stretch',
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: '22px',
                  color: 'var(--on_surface)',
                  textAlign: 'center',
                }}
              >
                {t('project.addDialog.emptySearchTitle')}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: 'var(--on_surface_mid)',
                  textAlign: 'center',
                }}
              >
                {t('project.addDialog.emptySearchDesc')}
              </Typography>
            </Box>
          ) : searchResults.length === 0 ? (
            // 검색 결과 없음
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                padding: '24px 0',
                flexGrow: 1,
                alignSelf: 'stretch',
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
            // 검색 결과 리스트
            <>
              {searchResults.map((project) => (
                <Box
                  key={project.projectCode}
                  onClick={() => setSelectedProject(project.projectCode)}
                  sx={{
                    borderBottom: '1px solid #EEEFF1',
                    padding: '10px 8px',
                    cursor: 'pointer',
                    backgroundColor: selectedProject === project.projectCode ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* 텍스트 영역 */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        flex: 1,
                      }}
                    >
                      {/* 프로젝트 코드 + 배지 */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          height: '24px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '22px',
                            color: '#0E0F11',
                          }}
                        >
                          {project.projectCode}
                        </Typography>
                        {project.canCreateMY && (
                          <Badge
                            hdsProps={{
                              size: 'small',
                              type: 'strong',
                              style: 'info',
                              icon: true,
                            }}
                          >
                            {t('project.addDialog.canCreateMY')}
                          </Badge>
                        )}
                      </Box>

                      {/* 서브 텍스트 */}
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: '#8E949F',
                        }}
                      >
                        {project.modelYear} ∙ {project.modelName}
                      </Typography>
                    </Box>

                    {/* 체크마크 아이콘 (오른쪽) */}
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {selectedProject === project.projectCode && (
                        <Ic_check_regular size="20px" color="var(--primary)" />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          )}
          </Box>
        </Box>

        {/* 우측 패널: 선택된 프로젝트 정보 */}
        {selectedProject && selectedProjectDetail && (
          <Box
              sx={{
                flex: '1 1 0',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                overflowY: 'auto',
                height: '548px',
                minHeight: '548px',
                maxHeight: '548px',
                padding: '16px 20px',
                border: '1px solid #EEEFF1',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.04)',
                boxSizing: 'border-box',
              }}
            >
              {/* 헤더 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: '26px', color: '#111111', wordBreak: 'break-word', flex: 1 }}>
                    {selectedProjectDetail.projectCode}
                  </Typography>
                  {selectedProjectDetail.canCreateMY && (
                    <Box sx={{ flexShrink: 0 }}>
                      <Badge hdsProps={{ size: 'medium', type: 'strong', style: 'default', icon: false }}>
                        MY 프로젝트
                      </Badge>
                    </Box>
                  )}
                </Box>
                <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(101, 107, 118, 1)' }}>
                  {selectedProjectDetail.modelYear} ∙ {selectedProjectDetail.modelName}
                </Typography>
              </Box>

              {/* V-BOM 정보 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: '#111111' }}>
                    V-BOM 정보
                  </Typography>
                  <Divider />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      V-BOM Project Code
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.vbom.projectCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      V-BOM Project Year
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.vbom.projectYear}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      V-BOM Project Type
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.vbom.projectType}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      V-BOM DESC.
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.vbom.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* BOM 정보 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: '#111111' }}>
                    BOM 정보
                  </Typography>
                  <Divider />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      Model Code
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.modelCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      Model Number
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.modelNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      Model Year
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.modelYear}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      Grade
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.grade}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      BOM Project Code
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.projectCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      BOM Code
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.code}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      BOM Spec Region
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.specRegion}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(130, 130, 130, 1)' }}>
                      BOM DESC.
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#111111', textAlign: 'right' }}>
                      {selectedProjectDetail.bom.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
        )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          hdsProps={{
            type: 'outline',
          }}
          onClick={handleClose}
          sx={{
            minWidth: 'fit-content !important',
            padding: '8px 16px !important',
          }}
        >
          {t('common.button.cancel')}
        </Button>
        <Button
          hdsProps={{
            type: 'fill',
            style: 'primary',
          }}
          onClick={handleNext}
          disabled={!selectedProject}
          sx={{
            minWidth: 'fit-content !important',
            padding: '8px 16px !important',
          }}
        >
          {t('project.addDialog.next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog
