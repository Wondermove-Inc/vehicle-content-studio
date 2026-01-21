import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import RadioGroup from '@hmg-fe/hmg-design-system/RadioGroup'
import Radio from '@hmg-fe/hmg-design-system/Radio'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, List, ListItem, Divider } from '@hmg-fe/hmg-design-system'
import { Ic_log_out_regular } from '@hmg-fe/hmg-design-system/HmgIcon'

function ContentRequest() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState('컨텐츠 요청')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // localStorage에서 즐겨찾기 초기화
  const [favorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('project-favorites')
    if (saved) {
      try {
        return new Set(JSON.parse(saved))
      } catch {
        return new Set(['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my'])
      }
    }
    return new Set(['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my'])
  })

  const [projectNames] = useState<Record<string, string>>({
    'hev-26-my': 'HEV_26_MY',
    'hev-27-my': 'HEV_27_MY',
    'ev6-26-my': 'EV6_26_MY',
    'ev6-27-my': 'EV6_27_MY',
    'gv80-26-my': 'GV80_26_MY',
    'g90-25-my': 'G90_25_MY',
  })

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
        selectedProject={undefined}
        onProjectSelect={undefined}
        favorites={favorites}
        projectNames={projectNames}
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
          {/* 컨텐츠 요청 헤더 */}
          <Box sx={{ padding: '20px 20px 16px 24px', borderBottom: '1px solid var(--outline)' }}>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: '36px',
                color: 'var(--on_surface)',
              }}
            >
              {t('common.menu.contentRequest')}
            </Typography>
          </Box>
          {/* 컨텐츠 요청 본문 - Jira iframe */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <iframe
              src="https://your-jira-instance.atlassian.net"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Jira Service"
            />
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
          {/* 언어 설정 */}
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

          {/* 구분선 */}
          <Divider sx={{ my: 3 }} />

          {/* 로그아웃 섹션 */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0E0F11',
              marginBottom: '12px',
            }}
          >
            계정
          </Typography>
          <Button
            hdsProps={{ type: 'outline', style: 'critical' }}
            fullWidth
            startIcon={<Ic_log_out_regular size="16px" />}
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            로그아웃
          </Button>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setIsSettingsOpen(false)}>
            {t('common.button.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ContentRequest
