import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@hmg-fe/hmg-design-system'
import { Ic_log_out_regular } from '@hmg-fe/hmg-design-system/HmgIcon'

interface ServiceSettingsDialogProps {
  open: boolean
  onClose: () => void
}

function ServiceSettingsDialog({ open, onClose }: ServiceSettingsDialogProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [timezone, setTimezone] = useState('Asia/Seoul')
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    onClose()
    setLogoutConfirmOpen(false)
  }

  return (
    <>
      <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          width: '480px',
          maxWidth: '480px',
        },
      }}
    >
      <DialogTitle hdsProps={{ closeIcon: true, onClose }}>
        {t('project.settings.title')}
      </DialogTitle>
      <DialogContent hdsProps sx={{ pt: '18px', pb: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 서비스 언어 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '22px',
              color: '#0E0F11',
            }}
          >
            {t('project.settings.language')}
          </Typography>
          <Select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
            hdsProps={{ size: 'medium' }}
            fullWidth
          >
            <MenuItem value="ko">{t('project.settings.languageKorean')}</MenuItem>
            <MenuItem value="en">{t('project.settings.languageEnglish')}</MenuItem>
          </Select>
        </Box>

        {/* 시간대 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '22px',
              color: '#0E0F11',
            }}
          >
            {t('project.settings.timezone')}
          </Typography>
          <Select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value as string)}
            hdsProps={{ size: 'medium' }}
            fullWidth
          >
            <MenuItem value="Asia/Seoul">{t('project.settings.timezoneSeoul')}</MenuItem>
            <MenuItem value="America/New_York">{t('project.settings.timezoneNewYork')}</MenuItem>
            <MenuItem value="Europe/London">{t('project.settings.timezoneLondon')}</MenuItem>
            <MenuItem value="Asia/Tokyo">{t('project.settings.timezoneTokyo')}</MenuItem>
          </Select>
        </Box>

        {/* 로그인 정보 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: '22px',
              color: '#0E0F11',
            }}
          >
            {t('project.settings.loginInfo')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 로그인 정보 테이블 */}
            <Box sx={{ display: 'flex', gap: 0 }}>
              {/* 현재 접속 정보 컬럼 */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* 헤더 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container_lowest)',
                    borderTop: '1px solid var(--outline_lowest)',
                    borderBottom: '1px solid var(--outline_lowest)',
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    minHeight: '40px',
                    maxHeight: '40px',
                    px: '16px',
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.settings.currentSession')}
                  </Typography>
                </Box>
                {/* IP 셀 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container)',
                    borderBottom: '1px solid var(--outline)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: '16px',
                    py: '12px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', py: '1px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#111111' }}>
                      {t('project.settings.ip')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#6b6b6b' }}>
                      123.123.123.123
                    </Typography>
                  </Box>
                </Box>
                {/* 세션 시작 셀 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container)',
                    borderBottom: '1px solid var(--outline)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: '16px',
                    py: '12px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', py: '1px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#111111' }}>
                      {t('project.settings.sessionStart')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#6b6b6b' }}>
                      2025-11-14 10:10:20
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* 최근 접속 정보 컬럼 */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* 헤더 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container_lowest)',
                    borderTop: '1px solid var(--outline_lowest)',
                    borderBottom: '1px solid var(--outline_lowest)',
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    minHeight: '40px',
                    maxHeight: '40px',
                    px: '16px',
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>
                    {t('project.settings.recentSession')}
                  </Typography>
                </Box>
                {/* IP 셀 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container)',
                    borderBottom: '1px solid var(--outline)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: '16px',
                    py: '12px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', py: '1px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#ce302c' }}>
                      {t('project.settings.ip')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#ce302c' }}>
                      123.123.123.100
                    </Typography>
                  </Box>
                </Box>
                {/* 세션 시작 셀 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container)',
                    borderBottom: '1px solid var(--outline)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: '16px',
                    py: '12px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', py: '1px' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#111111' }}>
                      {t('project.settings.sessionStart')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#6b6b6b' }}>
                      2025-11-12 10:10:20
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 로그아웃 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                hdsProps={{ type: 'outline', size: 'medium' }}
                startIcon={<Ic_log_out_regular size="16px" />}
                onClick={() => setLogoutConfirmOpen(true)}
              >
                {t('project.settings.logout')}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      </Dialog>

      {/* 로그아웃 확인 모달 */}
      <Dialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} hdsProps={{ size: 'small' }}>
        <DialogTitle hdsProps={{ closeIcon: true, onClose: () => setLogoutConfirmOpen(false) }}>
          {t('project.settings.logoutConfirm')}
        </DialogTitle>
        <DialogContent hdsProps>
          <Typography>{t('project.settings.logoutMessage')}</Typography>
        </DialogContent>
        <DialogActions hdsProps>
          <Button hdsProps onClick={() => setLogoutConfirmOpen(false)} sx={{ width: 'fit-content', minWidth: 'unset !important' }}>
            {t('common.button.cancel')}
          </Button>
          <Button hdsProps={{ type: 'fill', style: 'primary' }} onClick={handleLogout}>
            {t('project.settings.logout')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ServiceSettingsDialog
