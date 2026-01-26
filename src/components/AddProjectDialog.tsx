import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogTitle, DialogContent, DialogActions, EmptyError, Divider, Radio, Chip, RadioGroup, FormControlLabel } from '@hmg-fe/hmg-design-system'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import DatePicker from '@hmg-fe/hmg-design-system/DatePicker'
import { Ic_search_bold, Ic_check_regular, Ic_arrow_left_regular, Ic_employ_card_filled, Ic_laptop_filled, Ic_pencil_filled } from '@hmg-fe/hmg-design-system/HmgIcon'
import { SEARCH_PROJECT_MOCK } from '@/mocks/searchProjects.mock'

interface AddProjectDialogProps {
  open: boolean
  onClose: () => void
  onNext: (projectCode: string) => void
}

function AddProjectDialog({ open, onClose, onNext }: AddProjectDialogProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState('')

  // Step 2 폼 필드
  const [salesModelYear, setSalesModelYear] = useState<Date | null>(new Date(2026, 0, 1))
  const [sop, setSop] = useState<Date | null>(new Date(2026, 2, 1))
  const [derivative, setDerivative] = useState('none')
  const [isPublic, setIsPublic] = useState(true)
  const [members, setMembers] = useState<string[]>([])
  const [memberSearchQuery, setMemberSearchQuery] = useState('')

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
    setStep(2)
  }

  const handlePrevious = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    if (!salesModelYear || !sop || !derivative || members.length === 0) return
    const projectCode = selectedProject
    // 먼저 onNext 호출 (스낵바 표시)
    onNext(projectCode)
    // 그 다음 onClose 호출 (다이얼로그 닫기)
    onClose()
  }

  // 다이얼로그가 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      // 다이얼로그가 완전히 닫힌 후 상태 초기화 (애니메이션 후)
      const timer = setTimeout(() => {
        setStep(1)
        setSearchQuery('')
        setSelectedProject('')
        setSalesModelYear(new Date(2026, 0, 1))
        setSop(new Date(2026, 2, 1))
        setDerivative('none')
        setIsPublic(true)
        setMembers([])
        setMemberSearchQuery('')
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleClose = (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => {
    // backdrop 클릭 시에는 닫히지 않도록 방지
    if (reason === 'backdropClick') {
      return
    }
    onClose()
  }

  // Mock 멤버 데이터
  const mockMembers = [
    { email: 'kim.cs@hyundai.com', role: 'businessUser', company: 'hyundai' },
    { email: 'lee.yh@hyundai.com', role: 'contentCreator', company: 'hyundai' },
    { email: 'park.ms@hyundai.com', role: '3dModeler', company: 'hyundai' },
    { email: 'choi.ys@hyundai.com', role: 'businessUser', company: 'hyundai' },
    { email: 'jung.mj@hyundai.com', role: 'contentCreator', company: 'hyundai' },
  ]

  // 역할별 아이콘 매핑
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

  // 선택되지 않은 멤버 목록 (선택된 멤버 제외 + 검색 필터링)
  const availableMembers = useMemo(() => {
    let filtered = mockMembers.filter(member => !members.includes(member.email))

    if (memberSearchQuery.trim()) {
      const query = memberSearchQuery.toLowerCase()
      filtered = filtered.filter(member =>
        member.email.toLowerCase().includes(query) ||
        member.company.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [members, memberSearchQuery])

  // 멤버 삭제 핸들러
  const handleDeleteMember = (memberToDelete: string) => {
    setMembers((prev) => prev.filter((item) => item !== memberToDelete))
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
          padding: '20px 24px',
          height: '620px',
          minHeight: '620px',
          maxHeight: '620px',
          overflow: 'hidden',
        }}
      >
        {step === 1 ? (
          <>
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
            gap: '12px',
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
                        {t('project.addDialog.myProject')}
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
                    {t('project.addDialog.vbomInfo')}
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
                    {t('project.addDialog.bomInfo')}
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
        </>
        ) : (
          /* Step 2: 프로젝트 정보 입력 */
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflowY: 'auto',
              height: '100%',
            }}
          >
            {/* 선택된 프로젝트 정보 */}
            {selectedProjectDetail && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: '26px', color: '#111111' }}>
                    {selectedProjectDetail.projectCode}
                  </Typography>
                  {selectedProjectDetail.canCreateMY && (
                    <Badge hdsProps={{ size: 'medium', type: 'strong', style: 'default', icon: false }}>
                      {t('project.addDialog.myProject')}
                    </Badge>
                  )}
                </Box>
                <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(101, 107, 118, 1)' }}>
                  {selectedProjectDetail.modelYear} ∙ {selectedProjectDetail.modelName}
                </Typography>
              </Box>
            )}

            {/* 폼 필드 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Sales Model Year */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.addDialog.salesModelYear')}
                  </Typography>
                  <Typography data-is-hds="true" sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <DatePicker
                  hdsProps={{ size: 'medium', isClear: true }}
                  selected={salesModelYear}
                  onChange={(date: Date | null) => setSalesModelYear(date || new Date(2026, 0, 1))}
                  showYearPicker
                  dateFormat="yyyy"
                />
              </Box>

              {/* SOP */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.addDialog.sop')}
                  </Typography>
                  <Typography data-is-hds="true" sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <DatePicker
                  hdsProps={{ size: 'medium', isClear: true }}
                  selected={sop}
                  onChange={(date: Date | null) => setSop(date || new Date(2026, 2, 1))}
                  showMonthYearPicker
                  dateFormat="yyyy-MM"
                />
              </Box>

              {/* 파생 상품 */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.addDialog.derivative')}
                  </Typography>
                  <Typography data-is-hds="true" sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <Select
                  hdsProps={{ size: 'medium', type: 'outline' }}
                  fullWidth
                  value={derivative}
                  onChange={(e) => setDerivative(e.target.value as string)}
                >
                  <MenuItem hdsProps value="none">{t('project.addDialog.noDerivative')}</MenuItem>
                  <MenuItem hdsProps value="nline">{t('project.addDialog.nLine')}</MenuItem>
                </Select>
              </Box>

              {/* 공개 설정 */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.addDialog.visibility')}
                  </Typography>
                  <Typography data-is-hds="true" sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <RadioGroup
                  value={isPublic ? 'public' : 'private'}
                  onChange={(e) => setIsPublic(e.target.value === 'public')}
                  sx={{ display: 'flex', flexDirection: 'row', gap: '16px', pl: 1 }}
                >
                  <FormControlLabel
                    value="public"
                    control={<Radio hdsProps={{ label: t('project.addDialog.public') }} />}
                    label=""
                  />
                  <FormControlLabel
                    value="private"
                    control={<Radio hdsProps={{ label: t('project.addDialog.private') }} />}
                    label=""
                  />
                </RadioGroup>
              </Box>

              {/* 프로젝트 멤버 */}
              <Box>
                <Box sx={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.addDialog.projectMembers')}
                  </Typography>
                  <Typography data-is-hds="true" sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--red)' }}>
                    *
                  </Typography>
                </Box>
                <Select
                  hdsProps={{ size: 'medium', type: 'underline' }}
                  fullWidth
                  multiple
                  value={members}
                  onChange={(e) => setMembers(e.target.value as string[])}
                  displayEmpty
                  sx={{
                    '& .MuiSelect-select': {
                      paddingTop: '4px !important',
                    }
                  }}
                  renderValue={(selected) => {
                    if ((selected as string[]).length === 0) {
                      return (
                        <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'var(--on_surface_mid)' }}>
                          {t('project.addDialog.selectMembers')}
                        </Typography>
                      )
                    }
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(selected as string[]).map((value) => (
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
                                e?.preventDefault()
                                handleDeleteMember(value)
                              }}
                              sx={{
                                maxWidth: 'none !important',
                                '& .chip_text': {
                                  maxWidth: 'none !important',
                                  whiteSpace: 'nowrap',
                                  overflow: 'visible',
                                  textOverflow: 'clip',
                                },
                                '& .MuiChip-label': {
                                  maxWidth: 'none !important',
                                  whiteSpace: 'nowrap',
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
                        ))}
                      </Box>
                    )
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: '400px',
                      }
                    },
                    MenuListProps: {
                      sx: {
                        paddingTop: '0px !important',
                      }
                    }
                  }}
                >
                  {/* 검색 필드 */}
                  <Box
                    sx={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: 'white',
                      padding: '8px',
                      borderBottom: '1px solid #EEEFF1',
                      zIndex: 1,
                    }}
                  >
                    <TextField
                      hdsProps={{ size: 'medium', isClear: true }}
                      fullWidth
                      placeholder={t('project.addDialog.searchMembers')}
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      inputProps={{
                        onClickClearButton: (e: React.MouseEvent) => {
                          e.stopPropagation()
                          e.preventDefault()
                          setMemberSearchQuery('')
                        },
                        onClick: (e: React.MouseEvent) => e.stopPropagation(),
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Ic_search_bold size="16px" color="#111" />
                          </InputAdornment>
                        ),
                        onClick: (e) => e.stopPropagation(),
                        onMouseDown: (e) => e.stopPropagation(),
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          '&:focus': {
                            backgroundColor: 'transparent !important',
                          },
                          '&:hover': {
                            backgroundColor: 'transparent !important',
                          }
                        }
                      }}
                    />
                  </Box>

                  {/* 멤버 목록 또는 Empty */}
                  {availableMembers.length === 0 ? (
                    <Box sx={{ padding: '40px 16px', display: 'flex', justifyContent: 'center' }}>
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
                    availableMembers.map((member) => (
                      <MenuItem
                        key={member.email}
                        hdsProps={{ size: 'medium', icon: false, nested: false }}
                        value={member.email}
                        sx={{
                          '& .option_text': {
                            width: '100% !important',
                            display: 'flex !important',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: 'rgba(18, 20, 22, 1)' }}>
                              {member.email}
                            </Typography>
                            <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: 'rgba(82, 87, 96, 1)' }}>
                              {t(`common.company.${member.company}`)}
                            </Typography>
                          </Box>
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
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          paddingTop: '16px',
        }}
      >
        {step === 1 ? (
          <>
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
          </>
        ) : (
          <>
            <Button
              hdsProps={{
                type: 'outline',
              }}
              onClick={handlePrevious}
              startIcon={<Ic_arrow_left_regular size="20px" />}
              sx={{
                minWidth: 'fit-content !important',
                padding: '8px 16px !important',
              }}
            >
              {t('project.addDialog.previous')}
            </Button>
            <Box sx={{ flex: 1 }} />
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
              {t('project.addDialog.cancel')}
            </Button>
            <Button
              hdsProps={{
                type: 'fill',
                style: 'primary',
              }}
              onClick={handleSubmit}
              disabled={!salesModelYear || !sop || !derivative || members.length === 0}
              sx={{
                minWidth: 'fit-content !important',
                padding: '8px 16px !important',
              }}
            >
              {t('project.addDialog.addProject')}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AddProjectDialog
