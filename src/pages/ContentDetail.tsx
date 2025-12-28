import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import Tabs from '@hmg-fe/hmg-design-system/Tabs'
import Tab from '@hmg-fe/hmg-design-system/Tab'
import Card from '@hmg-fe/hmg-design-system/Card'
import { Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, List, ListItem, FormControlLabel } from '@hmg-fe/hmg-design-system'
import { Ic_arrow_forward_regular, Ic_download_bold } from '@hmg-fe/hmg-design-system/HmgIcon'
import Sidebar from '../components/Sidebar'

// 프로젝트 데이터 타입 (Project.tsx와 동일)
interface ProjectData {
  id: number
  thumbnail?: string
  brand: string
  projectCode: string
  projectType: string
  contentType: string
  contentTypeColor: string
  derivative: string
  modifiedDate: string
  sop: string
  targetChannel: string
  activeChannels: string[]
  manager: string
  comments: number
}

// 샘플 데이터 (Project.tsx에서 가져옴)
const sampleProjects: ProjectData[] = [
  {
    id: 1,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 2,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 3,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI'],
    manager: '박미현',
    comments: 3,
  },
  {
    id: 4,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'PI',
    contentTypeColor: '#B8860B',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['In-Store'],
    manager: '여하은',
    comments: 0,
  },
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_26',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2026-06-15',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹'],
    manager: '박미현',
    comments: 5,
  },
]

// 썸네일 이미지 목록
const thumbnailImages = [
  '/images/car_01.png',
  '/images/car_02.png',
  '/images/car_03.png',
  '/images/car_04.png',
  '/images/car_05.png',
]

// 프로젝트 코드 -> 트리 아이템 ID 매핑
const projectCodeToTreeId: Record<string, string> = {
  'CN7_HEV_27': 'hev-27-my',
  'CN7_HEV_26': 'hev-26-my',
  'CN7_HEV_25': 'hev-25-fmc',
  'CN7_ICE_24': 'ice-24-my',
  'CN7_ICE_23': 'ice-23-my',
  'CN7_ICE_22': 'ice-22-fl',
  'EV6_27MY': 'ev6-27-my',
  'EV6_26MY': 'ev6-26-my',
  'EV6_25FMC': 'ev6-25-fmc',
  'K8_26MY': 'k8-26-my',
  'K8_25MY': 'k8-25-my',
  'K8_24FL': 'k8-24-fl',
  'GV80_27MY': 'gv80-27-my',
  'GV80_26MY': 'gv80-26-my',
  'GV80_25FMC': 'gv80-25-fmc',
  'G90_26MY': 'g90-26-my',
  'G90_25MY': 'g90-25-my',
  'G90_24FL': 'g90-24-fl',
}

// 트리 아이템 ID -> 이름 매핑
const projectNames: Record<string, string> = {
  'hev-27-my': 'HEV_27_MY',
  'hev-26-my': 'HEV_26_MY',
  'hev-25-fmc': 'HEV_25_FMC',
  'ice-24-my': 'ICE_24_MY',
  'ice-23-my': 'ICE_23_MY',
  'ice-22-fl': 'ICE_22_FL',
  'ev6-27-my': 'EV6_27_MY',
  'ev6-26-my': 'EV6_26_MY',
  'ev6-25-fmc': 'EV6_25_FMC',
  'k8-26-my': 'K8_26_MY',
  'k8-25-my': 'K8_25_MY',
  'k8-24-fl': 'K8_24_FL',
  'gv80-27-my': 'GV80_27_MY',
  'gv80-26-my': 'GV80_26_MY',
  'gv80-25-fmc': 'GV80_25_FMC',
  'g90-26-my': 'G90_26_MY',
  'g90-25-my': 'G90_25_MY',
  'g90-24-fl': 'G90_24_FL',
}

// 부모 매핑
const parentMap: Record<string, string> = {
  'hyundai': 'all',
  'kia': 'all',
  'genesis': 'all',
  'hev-27-my': 'hyundai',
  'hev-26-my': 'hyundai',
  'hev-25-fmc': 'hyundai',
  'ice-24-my': 'hyundai',
  'ice-23-my': 'hyundai',
  'ice-22-fl': 'hyundai',
  'ev6-27-my': 'kia',
  'ev6-26-my': 'kia',
  'ev6-25-fmc': 'kia',
  'k8-26-my': 'kia',
  'k8-25-my': 'kia',
  'k8-24-fl': 'kia',
  'gv80-27-my': 'genesis',
  'gv80-26-my': 'genesis',
  'gv80-25-fmc': 'genesis',
  'g90-26-my': 'genesis',
  'g90-25-my': 'genesis',
  'g90-24-fl': 'genesis',
}

// Breadcrumb 생성 함수
function getBreadcrumb(projectId: string | null, contentType: string): { id: string; name: string }[] {
  const path: { id: string; name: string }[] = [{ id: 'all', name: '프로젝트' }]

  if (!projectId || projectId === 'all') {
    return path
  }

  const ancestors: string[] = []
  let current = projectId
  while (current && current !== 'all') {
    ancestors.unshift(current)
    current = parentMap[current]
  }

  for (const id of ancestors) {
    if (id === 'hyundai') {
      path.push({ id, name: '현대자동차' })
    } else if (id === 'kia') {
      path.push({ id, name: '기아' })
    } else if (id === 'genesis') {
      path.push({ id, name: '제네시스' })
    } else {
      path.push({ id, name: projectNames[id] || id })
    }
  }

  // 컨텐츠 유형 추가
  path.push({ id: 'content', name: contentType })

  return path
}

function ContentDetail() {
  const { contentId } = useParams<{ contentId: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('미리보기')

  // 필터 상태
  const [country, setCountry] = useState('all')
  const [fsc, setFsc] = useState('all')
  const [exterior, setExterior] = useState('all')
  const [interior, setInterior] = useState('all')
  const [cameraId, setCameraId] = useState('all')
  const [format, setFormat] = useState('all')

  // contentId로 프로젝트 데이터 찾기
  const contentData = sampleProjects.find(p => p.id === Number(contentId))

  // 프로젝트 ID 찾기
  const projectId = contentData ? projectCodeToTreeId[contentData.projectCode] : null

  // Breadcrumb 생성
  const breadcrumb = contentData ? getBreadcrumb(projectId, contentData.contentType) : [{ id: 'all', name: '프로젝트' }]

  // 브랜드명 번역 함수
  const getBrandLabel = (brand: string): string => {
    const brandMap: Record<string, string> = {
      '현대자동차': t('common.brand.hyundai'),
      '기아': t('common.brand.kia'),
      '제네시스': t('common.brand.genesis'),
    }
    return brandMap[brand] || brand
  }

  const handleBreadcrumbClick = (itemId: string) => {
    if (itemId === 'content') return // 현재 페이지이므로 클릭 불가

    // 클릭한 항목에 따라 적절한 경로로 이동
    if (itemId === 'all') {
      navigate('/project')
    } else {
      // 선택된 프로젝트 ID를 URL 쿼리 파라미터로 전달
      navigate(`/project?selected=${itemId}`)
    }
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
        onSettingsOpen={() => setIsSettingsOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
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
          {/* 헤더 영역 - Breadcrumb */}
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
                {breadcrumb.map((item, index) => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {index > 0 && (
                      <Ic_arrow_forward_regular size="20px" color="var(--on_surface_mid)" />
                    )}
                    <Typography
                      onClick={() => handleBreadcrumbClick(item.id)}
                      sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: '36px',
                        color: 'var(--on_surface)',
                        cursor: index === breadcrumb.length - 1 ? 'default' : 'pointer',
                        '&:hover': {
                          textDecoration: index === breadcrumb.length - 1 ? 'none' : 'underline',
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* 탭 영역 */}
          <Box
            sx={{
              padding: '16px 20px 0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              hdsProps={{ size: 'medium', type: 'line' }}
              sx={{
                borderBottom: 'none',
                '&::before, &::after': {
                  display: 'none',
                },
                '& .MuiTabs-scroller': {
                  borderBottom: 'none',
                  '&::before, &::after': {
                    display: 'none',
                  },
                },
                '& .MuiTabs-flexContainer': {
                  borderBottom: 'none',
                  gap: '16px !important',
                },
                '& .MuiTab-root': {
                  fontSize: '16px !important',
                },
                '& .MuiTab-root .tab_text': {
                  fontSize: '16px !important',
                },
                '& .MuiTab-root:not(.Mui-selected)': {
                  borderBottom: 'none',
                  boxShadow: 'none',
                  '&::before, &::after': {
                    display: 'none',
                  },
                },
              }}
            >
              <Tab hdsProps={{ size: 'medium' }} label="미리보기" value="미리보기" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label="컨텐츠 설정" value="컨텐츠 설정" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label="비주얼 컨셉 제작" value="비주얼 컨셉 제작" disabled sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label="비주얼 프로덕션" value="비주얼 프로덕션" disabled sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', fontSize: '16px !important' }} />
            </Tabs>
            <Button
              hdsProps={{
                size: 'medium',
                type: 'filter',
                icon: <Ic_download_bold size="16px" />,
                style: undefined,
              }}
              sx={{
                flexShrink: 0,
              }}
            >
              일괄 다운로드
            </Button>
          </Box>

          {/* 컨텐츠 필터 섹션 */}
          <Box
            sx={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {/* 국가 */}
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">전체 (국가)</MenuItem>
              <MenuItem hdsProps value="kr">한국 (국가)</MenuItem>
              <MenuItem hdsProps value="us">미국 (국가)</MenuItem>
              <MenuItem hdsProps value="eu">유럽 (국가)</MenuItem>
            </Select>

            {/* FSC */}
            <Select
              value={fsc}
              onChange={(e) => setFsc(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">전체 (FSC)</MenuItem>
              <MenuItem hdsProps value="fsc1">FSC-1 (FSC)</MenuItem>
              <MenuItem hdsProps value="fsc2">FSC-2 (FSC)</MenuItem>
            </Select>

            {/* 외장 */}
            <Select
              value={exterior}
              onChange={(e) => setExterior(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">전체 (외장)</MenuItem>
              <MenuItem hdsProps value="white">흰색 (외장)</MenuItem>
              <MenuItem hdsProps value="black">검정 (외장)</MenuItem>
              <MenuItem hdsProps value="silver">은색 (외장)</MenuItem>
            </Select>

            {/* 내장 */}
            <Select
              value={interior}
              onChange={(e) => setInterior(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">전체 (내장)</MenuItem>
              <MenuItem hdsProps value="black">블랙 (내장)</MenuItem>
              <MenuItem hdsProps value="beige">베이지 (내장)</MenuItem>
            </Select>

            {/* 카메라 ID */}
            <Select
              value={cameraId}
              onChange={(e) => setCameraId(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '160px' }}
            >
              <MenuItem hdsProps value="all">전체 (카메라 ID)</MenuItem>
              <MenuItem hdsProps value="cam1">Camera-01 (카메라 ID)</MenuItem>
              <MenuItem hdsProps value="cam2">Camera-02 (카메라 ID)</MenuItem>
            </Select>

            {/* 포맷 */}
            <Select
              value={format}
              onChange={(e) => setFormat(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">전체 (포맷)</MenuItem>
              <MenuItem hdsProps value="png">PNG (포맷)</MenuItem>
              <MenuItem hdsProps value="jpg">JPG (포맷)</MenuItem>
              <MenuItem hdsProps value="webp">WebP (포맷)</MenuItem>
            </Select>
          </Box>

          {/* 탭 내용 영역 - 차 이미지 카드 그리드 */}
          <Box
            sx={{
              flex: 1,
              padding: '0 20px 20px 20px',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
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
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {/* 샘플 차 이미지 카드들 */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={thumbnailImages[(index - 1) % thumbnailImages.length]}
                    alt={`Car ${index}`}
                    sx={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      backgroundColor: '#F5F5F5',
                    }}
                  />
                  <Box sx={{ padding: '16px' }}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--on_surface)',
                        marginBottom: '8px',
                      }}
                    >
                      {contentData?.contentType} - View {index}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: 'var(--on_surface_mid)',
                      }}
                    >
                      Camera-{String(index).padStart(2, '0')} • 외장: 흰색 • 내장: 블랙
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 설정 다이얼로그 */}
      <Dialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setIsSettingsOpen(false) }}>{t('project.settings.title')}</DialogTitle>
        <DialogContent hdsProps sx={{ py: '16px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0E0F11',
              marginBottom: '12px',
            }}
          >
            {t('project.settings.language')}
          </Typography>
          <RadioGroup value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} sx={{ pl: 1 }}>
            <List hdsProps={{ dialogType: 'radio' }}>
              <ListItem hdsProps={{ dialogType: 'radio', isDivider: false }}>
                <FormControlLabel
                  label=""
                  value="ko"
                  control={<Radio hdsProps={{ label: t('project.settings.languageKorean') }} />}
                />
              </ListItem>
              <ListItem hdsProps={{ dialogType: 'radio', isDivider: false }}>
                <FormControlLabel
                  label=""
                  value="en"
                  control={<Radio hdsProps={{ label: t('project.settings.languageEnglish') }} />}
                />
              </ListItem>
            </List>
          </RadioGroup>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsSettingsOpen(false)}>
            {t('common.button.cancel')}
          </Button>
          <Button
            hdsProps={{ type: 'fill', style: 'primary' }}
            onClick={() => setIsSettingsOpen(false)}
          >
            {t('common.button.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ContentDetail
