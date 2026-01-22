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
import CardActionArea from '@hmg-fe/hmg-design-system/CardActionArea'
import CardContent from '@hmg-fe/hmg-design-system/CardContent'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import { Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, List, ListItem, FormControlLabel } from '@hmg-fe/hmg-design-system'
import { Ic_arrow_forward_regular, Ic_download_bold } from '@hmg-fe/hmg-design-system/HmgIcon'
import Sidebar from '../components/Sidebar'
import { MOCK_PROJECTS as sampleProjects } from '@/mocks/projects.mock'

// 썸네일 이미지 목록
const thumbnailImages = [
  '/images/car_01.png',
  '/images/car_02.png',
  '/images/car_03.png',
  '/images/car_04.png',
  '/images/car_05.png',
]

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
  'gv70-26-my': 'GV70_26MY',
  'santa-fe-25': 'SANTA_FE_25',
  'sportage-26': 'SPORTAGE_26',
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
  'gv70-26-my': 'genesis',
  'santa-fe-25': 'hyundai',
  'sportage-26': 'kia',
}

function ContentDetail() {
  const { projectId, contentId } = useParams<{ projectId: string; contentId: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')

  // 필터 상태
  const [country, setCountry] = useState('all')
  const [fsc, setFsc] = useState('all')
  const [exterior, setExterior] = useState('all')
  const [interior, setInterior] = useState('all')
  const [sortOrder, setSortOrder] = useState('camera_asc')
  const [format, setFormat] = useState('all')

  // contentId로 프로젝트 데이터 찾기
  const contentData = sampleProjects.find(p => p.id === Number(contentId))

  // Breadcrumb 생성 함수
  const getBreadcrumb = (projectId: string | null | undefined, contentType: string): { id: string; name: string }[] => {
    const path: { id: string; name: string }[] = [{ id: 'all', name: t('project.header.title') }]

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
        path.push({ id, name: t('common.brand.hyundai') })
      } else if (id === 'kia') {
        path.push({ id, name: t('common.brand.kia') })
      } else if (id === 'genesis') {
        path.push({ id, name: t('common.brand.genesis') })
      } else {
        path.push({ id, name: projectNames[id] || id })
      }
    }

    // 컨텐츠 유형 추가 (contentType이 이미 VCM, Web CC 등으로 되어 있으므로 그대로 사용)
    path.push({ id: 'content', name: contentType })

    return path
  }

  // Breadcrumb 생성
  const breadcrumb = contentData ? getBreadcrumb(projectId, contentData.contentType) : [{ id: 'all', name: t('project.header.title') }]

  const handleBreadcrumbClick = (itemId: string) => {
    if (itemId === 'content') return // 현재 페이지이므로 클릭 불가

    // 클릭한 항목에 따라 적절한 경로로 이동
    if (itemId === 'all') {
      navigate('/project')
    } else if (itemId === projectId) {
      // 프로젝트 상세 페이지로 이동
      navigate(`/project/${itemId}`)
    } else {
      // 선택된 프로젝트 ID로 프로젝트 목록 페이지 이동
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
              <Tab hdsProps={{ size: 'medium' }} label={t('contentDetail.tabs.preview')} value="preview" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label={t('contentDetail.tabs.contentSettings')} value="contentSettings" sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label={t('contentDetail.tabs.visualConceptCreation')} value="visualConceptCreation" disabled sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', mr: '16px !important', fontSize: '16px !important' }} />
              <Tab hdsProps={{ size: 'medium' }} label={t('contentDetail.tabs.visualProduction')} value="visualProduction" disabled sx={{ px: '0 !important', pt: '5px !important', pb: '9px !important', fontSize: '16px !important' }} />
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
              {t('contentDetail.button.bulkDownload')}
            </Button>
          </Box>

          {/* 컨텐츠 필터 섹션 */}
          <Box
            sx={{
              padding: '16px 20px 0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
              <MenuItem hdsProps value="all">{t('contentDetail.filter.country.all')}</MenuItem>
              <MenuItem hdsProps value="kr">{t('contentDetail.filter.country.kr')}</MenuItem>
              <MenuItem hdsProps value="us">{t('contentDetail.filter.country.us')}</MenuItem>
              <MenuItem hdsProps value="eu">{t('contentDetail.filter.country.eu')}</MenuItem>
            </Select>

            {/* FSC */}
            <Select
              value={fsc}
              onChange={(e) => setFsc(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">{t('contentDetail.filter.fsc.all')}</MenuItem>
              <MenuItem hdsProps value="fsc1">{t('contentDetail.filter.fsc.fsc1')}</MenuItem>
              <MenuItem hdsProps value="fsc2">{t('contentDetail.filter.fsc.fsc2')}</MenuItem>
            </Select>

            {/* 외장 */}
            <Select
              value={exterior}
              onChange={(e) => setExterior(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">{t('contentDetail.filter.exterior.all')}</MenuItem>
              <MenuItem hdsProps value="white">{t('contentDetail.filter.exterior.white')}</MenuItem>
              <MenuItem hdsProps value="black">{t('contentDetail.filter.exterior.black')}</MenuItem>
              <MenuItem hdsProps value="silver">{t('contentDetail.filter.exterior.silver')}</MenuItem>
            </Select>

            {/* 내장 */}
            <Select
              value={interior}
              onChange={(e) => setInterior(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">{t('contentDetail.filter.interior.all')}</MenuItem>
              <MenuItem hdsProps value="black">{t('contentDetail.filter.interior.black')}</MenuItem>
              <MenuItem hdsProps value="beige">{t('contentDetail.filter.interior.beige')}</MenuItem>
            </Select>

            {/* 포맷 */}
            <Select
              value={format}
              onChange={(e) => setFormat(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '140px' }}
            >
              <MenuItem hdsProps value="all">{t('contentDetail.filter.format.all')}</MenuItem>
              <MenuItem hdsProps value="png">{t('contentDetail.filter.format.png')}</MenuItem>
              <MenuItem hdsProps value="jpg">{t('contentDetail.filter.format.jpg')}</MenuItem>
              <MenuItem hdsProps value="webp">{t('contentDetail.filter.format.webp')}</MenuItem>
            </Select>

            {/* 정렬 순서 */}
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as string)}
              hdsProps={{ size: 'medium', type: 'outline' }}
              sx={{ minWidth: '180px' }}
            >
              <MenuItem hdsProps value="camera_asc">{t('contentDetail.filter.sort.cameraAsc')}</MenuItem>
              <MenuItem hdsProps value="camera_desc">{t('contentDetail.filter.sort.cameraDesc')}</MenuItem>
              <MenuItem hdsProps value="recent">{t('contentDetail.filter.sort.recent')}</MenuItem>
              <MenuItem hdsProps value="comment_desc">{t('contentDetail.filter.sort.commentDesc')}</MenuItem>
            </Select>
          </Box>

          {/* 탭 내용 영역 - 차 이미지 카드 그리드 */}
          <Box
            sx={{
              flex: 1,
              pt: '16px',
              px: '20px',
              pb: '20px',
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
                gap: '16px',
              }}
            >
              {/* 샘플 차 이미지 카드들 */}
              {(() => {
                // 카드 인덱스 배열 생성
                const cardIndices = Array.from({ length: 16 }, (_, i) => i + 1)

                // 정렬 적용
                const sortedIndices = [...cardIndices].sort((a, b) => {
                  switch (sortOrder) {
                    case 'camera_asc':
                      return a - b
                    case 'camera_desc':
                      return b - a
                    case 'recent':
                      // 수정일 패턴 인덱스가 낮을수록 최근
                      return ((a - 1) % 8) - ((b - 1) % 8)
                    case 'comment_desc':
                      // 코멘트 개수가 많은 순
                      const commentA = ((a - 1) % 15) + 1
                      const commentB = ((b - 1) % 15) + 1
                      return commentB - commentA
                    default:
                      return a - b
                  }
                })

                // 수정일 생성 로직
                const getModifiedTime = (idx: number) => {
                  const patterns = [
                    t('contentDetail.modifiedTime.justNow'),
                    t('contentDetail.modifiedTime.oneHourAgo'),
                    t('contentDetail.modifiedTime.threeHoursAgo'),
                    t('contentDetail.modifiedTime.oneDayAgo'),
                    t('contentDetail.modifiedTime.twoDaysAgo'),
                    t('contentDetail.modifiedTime.threeDaysAgo'),
                    t('contentDetail.modifiedTime.fiveDaysAgo'),
                    t('contentDetail.modifiedTime.oneWeekAgo'),
                  ]
                  return patterns[idx % patterns.length]
                }

                return sortedIndices.map((index) => {
                  // 코멘트 개수 생성 로직 (1-15 사이의 랜덤한 값)
                  const commentCount = ((index - 1) % 15) + 1

                  return (
                  <Card
                    key={index}
                    hdsProps={{ type: 'action' }}
                    sx={{
                      position: 'relative',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    {/* 코멘트 개수 Badge */}
                    <Badge
                      hdsProps={{ size: 'medium', style: 'default', isDigit: true }}
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 1,
                      }}
                    >
                      {commentCount}
                    </Badge>
                    <CardActionArea
                      hdsProps
                      onClick={() => {
                        if (!contentData || !projectId) return
                        navigate(`/preview/${index}`, {
                          state: {
                            contentData,
                            projectId,
                            contentType: contentData.contentType,
                            totalImages: 16,
                          },
                        })
                      }}
                    >
                      <CardContent
                        hdsProps={{
                          title: `C${String(index).padStart(3, '0')}`,
                          description: getModifiedTime(index - 1),
                        image: (
                          <Box
                            component="img"
                            src={thumbnailImages[(contentData?.id ?? 0) % thumbnailImages.length]}
                            alt={`Car ${index}`}
                            sx={{
                              width: 'calc(100% + 32px)',
                              height: '140px',
                              objectFit: 'cover',
                              margin: '0 -16px 0 -16px',
                            }}
                          />
                        ),
                      }}
                      sx={{
                        padding: '0 16px 16px 16px !important',
                        '& .card_title': {
                          paddingTop: '12px',
                        },
                      }}
                    />
                  </CardActionArea>
                </Card>
                  )
                })
              })()}
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
