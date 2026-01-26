import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, Radio, EmptyError } from '@hmg-fe/hmg-design-system'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import { Ic_search_bold, Ic_information_bold } from '@hmg-fe/hmg-design-system/HmgIcon'
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
          paddingTop: '20px',
          paddingBottom: '20px',
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

        {/* 검색 결과 영역 */}
        <Box
          sx={{
            flex: 1,
            minHeight: '400px',
            maxHeight: '400px',
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
                  onClick={() => {
                    // MY 생성 가능한 항목은 클릭 불가
                    if (!project.canCreateMY) {
                      setSelectedProject(project.projectCode)
                    }
                  }}
                  sx={{
                    borderBottom: '1px solid #EEEFF1',
                    padding: '10px 8px',
                    cursor: project.canCreateMY ? 'default' : 'pointer',
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
                    }}
                  >
                    {/* 라디오 버튼 - MY 생성 가능한 항목에는 없음 */}
                    {!project.canCreateMY && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '24px',
                          height: '24px',
                          flexShrink: 0,
                        }}
                      >
                        <Radio
                          checked={selectedProject === project.projectCode}
                          onChange={() => setSelectedProject(project.projectCode)}
                          value={project.projectCode}
                        />
                      </Box>
                    )}

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
                              size: 'medium',
                              type: 'strong',
                              style: 'default',
                              icon: <Ic_information_bold size="16px" color="#1967FF" />,
                            }}
                            sx={{
                              '& .MuiBadge-badge': {
                                backgroundColor: '#E2F1FD',
                                color: '#1967FF',
                                fontSize: 12,
                                fontWeight: 400,
                                height: '24px',
                                padding: '0 8px 0 6px',
                              },
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
                  </Box>
                </Box>
              ))}
            </>
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
