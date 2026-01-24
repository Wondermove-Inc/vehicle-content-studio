import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, FormControlLabel, EmptyError } from '@hmg-fe/hmg-design-system'
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('project.addDialog.title')}</DialogTitle>
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
          }}
        >
          {!searchQuery.trim() ? (
            // 검색 전 초기 상태
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <EmptyError
                hdsProps={{
                  size: 'small',
                  title: undefined,
                  description: t('project.addDialog.emptySearch'),
                  buttons: undefined,
                }}
              />
            </Box>
          ) : searchResults.length === 0 ? (
            // 검색 결과 없음
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
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
            <RadioGroup value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
              {searchResults.map((project) => (
                <Box
                  key={project.projectCode}
                  sx={{
                    borderBottom: '1px solid var(--outline)',
                    padding: '10px 8px',
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <FormControlLabel
                    value={project.projectCode}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {/* 프로젝트 코드 + 배지 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', height: '24px' }}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 400,
                              lineHeight: '22px',
                              color: 'var(--on_surface)',
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
                    }
                    sx={{
                      margin: 0,
                      width: '100%',
                      '& .MuiFormControlLabel-label': {
                        width: '100%',
                      },
                    }}
                  />
                </Box>
              ))}
            </RadioGroup>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          hdsProps={{
            size: 'large',
            style: 'primary',
            type: 'outline',
          }}
          onClick={handleClose}
        >
          {t('common.button.cancel')}
        </Button>
        <Button
          hdsProps={{
            size: 'large',
            style: 'primary',
            type: 'fill',
          }}
          onClick={handleNext}
          disabled={!selectedProject}
        >
          {t('project.addDialog.next')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog
