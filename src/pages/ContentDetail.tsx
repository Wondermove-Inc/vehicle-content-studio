import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, List, ListItem, FormControlLabel } from '@hmg-fe/hmg-design-system'
import { Ic_arrow_back_regular } from '@hmg-fe/hmg-design-system/HmgIcon'
import Sidebar from '../components/Sidebar'

function ContentDetail() {
  const { contentId } = useParams<{ contentId: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleBack = () => {
    navigate('/project')
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
          transition: 'max-width 0.2s ease',
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            padding: '20px 24px',
            backgroundColor: '#fff',
            borderBottom: '1px solid var(--outline)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Button
            hdsProps={{
              size: 'medium',
              type: 'text',
              icon: <Ic_arrow_back_regular size="20px" color="#002C5F" />,
              isIconOnly: true,
            }}
            onClick={handleBack}
            aria-label="뒤로 가기"
          />
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: '36px',
              color: 'var(--on_surface)',
            }}
          >
            컨텐츠 상세
          </Typography>
        </Box>

        {/* 메인 콘텐츠 */}
        <Box
          sx={{
            flex: 1,
            padding: '24px',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.02)',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--on_surface_mid)',
                marginBottom: '16px',
              }}
            >
              컨텐츠 ID: {contentId}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: 'var(--on_surface_mid)',
              }}
            >
              컨텐츠 상세 페이지가 구현될 예정입니다.
            </Typography>
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
