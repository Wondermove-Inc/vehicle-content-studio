import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import Button from '@hmg-fe/hmg-design-system/Button'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import IconButton from '@hmg-fe/hmg-design-system/IconButton'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import {
  Ic_folder_filled,
  Ic_view_regular,
  Ic_view_hidden_regular,
  Ic_help_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 이메일 형식 검증 (@가 포함되어야 함)
    if (!email.includes('@')) {
      setError(true)
      setLoginAttempts((prev) => prev + 1)
      return
    }

    // 에러 초기화 후 로그인 처리
    setError(false)
    navigate('/project')
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        spacing={0}
        sx={{
          width: '380px',
          alignItems: 'center',
        }}
      >
        {/* Header Section */}
        <Stack spacing={4.5} sx={{ width: '100%', paddingBottom: '36px' }}>
          <Stack spacing={0} sx={{ alignItems: 'center' }}>
            {/* Car Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(180deg, rgba(18, 20, 22, 1) 0%, rgba(18, 20, 22, 0.8) 100%)',
                borderRadius: '10px',
                border: '1px solid var(--hds-palette-variant-snackbar)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ic_folder_filled size="20px" color="#fff" />
            </Box>

            {/* Title */}
            <Stack spacing={0} sx={{ alignItems: 'center', width: '100%', marginTop: '16px' }}>
              <Typography
                hdsProps={{ variant: 'title', size: 'medium' }}
                sx={{
                  color: '#0E0F11',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: '32px',
                }}
              >
                {t('login.title.welcome')}
              </Typography>
              <Typography
                hdsProps={{ variant: 'title', size: 'medium' }}
                sx={{
                  color: '#0E0F11',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: '32px',
                }}
              >
                {t('login.title.welcomeSuffix')}
              </Typography>
            </Stack>

            {/* Subtitle */}
            <Typography
              hdsProps={{ variant: 'body', size: 'medium' }}
              sx={{
                color: 'var(--on_surface_high)',
                textAlign: 'center',
                marginTop: '8px',
                fontSize: 15,
              }}
            >
              {t('login.subtitle')}
            </Typography>
          </Stack>

          {/* Form Section */}
          <Stack component="form" spacing={0} onSubmit={handleLogin} sx={{ width: '100%', gap: '24px' }}>
            {/* Email Field */}
            <Stack spacing={1}>
              <Typography
                hdsProps={{ variant: 'title', size: 'small' }}
                sx={{ color: '#0E0F11', fontWeight: 700 }}
              >
                {t('login.form.emailLabel')}
              </Typography>
              <TextField
                hdsProps={{ size: 'medium', isInvalid: error }}
                placeholder={t('login.form.emailPlaceholder')}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Stack>

            {/* Password Field */}
            <Stack spacing={1}>
              <Typography
                hdsProps={{ variant: 'title', size: 'small' }}
                sx={{ color: '#0E0F11', fontWeight: 700 }}
              >
                {t('login.form.passwordLabel')}
              </Typography>
              <TextField
                hdsProps={{ size: 'medium', isInvalid: error }}
                placeholder={t('login.form.passwordPlaceholder')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <Ic_view_hidden_regular size="20px" /> : <Ic_view_regular size="20px" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <Typography
                  component="p"
                  sx={{
                    fontFamily: 'AstaSans, Malgun Gothic, 맑은고딕, Apple SD Gothic Neo, sans-serif',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: 'var(--red)',
                    marginTop: '4px',
                  }}
                >
                  {t('login.error.invalidCredentials', { count: loginAttempts })}
                </Typography>
              )}
            </Stack>

            {/* Login Button */}
            <Button
              hdsProps={{ size: 'large', style: 'primary', type: 'fill' }}
              type="submit"
              fullWidth
              disabled={!email || !password}
            >
              {t('login.button.login')}
            </Button>

            {/* Divider */}
            <Stack
              direction="row"
              spacing={0}
              sx={{ width: '100%', alignItems: 'center', gap: '8px' }}
            >
              <Divider hdsProps={{ style: 'lowest' }} sx={{ flexGrow: 1 }} />
              <Typography
                hdsProps={{ variant: 'body', size: 'small' }}
                sx={{ color: '#8E949F', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                {t('login.divider')}
              </Typography>
              <Divider hdsProps={{ style: 'lowest' }} sx={{ flexGrow: 1 }} />
            </Stack>

            {/* Secondary Actions */}
            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
              <Button
                hdsProps={{ size: 'large', type: 'outline' }}
                sx={{ flexGrow: 1 }}
              >
                {t('login.button.partnerLogin')}
              </Button>
              <Button
                hdsProps={{ size: 'large', type: 'outline' }}
                sx={{
                  minWidth: '40px !important',
                  width: '40px !important',
                  maxWidth: '40px',
                  padding: '0 !important',
                  flexShrink: 0,
                  display: 'flex !important',
                  alignItems: 'center !important',
                  justifyContent: 'center !important',
                  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                    margin: 0,
                  },
                }}
              >
                <Ic_help_regular size="16px" style={{ display: 'block', margin: 0 }} />
              </Button>
            </Box>
          </Stack>
        </Stack>

        {/* Footer Links */}
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            hdsProps={{ type: 'text', style: 'default', size: 'small' }}
            sx={{
              color: '#6B6B6B',
              fontSize: 14,
              lineHeight: '22px',
              minWidth: 'auto',
              padding: 0,
            }}
          >
            {t('login.footer.terms')}
          </Button>
          <Typography
            sx={{
              color: '#6B6B6B',
              fontSize: 14,
              lineHeight: '22px',
            }}
          >
            {t('login.footer.and')}
          </Typography>
          <Button
            hdsProps={{ type: 'text', style: 'default', size: 'small' }}
            sx={{
              color: '#6B6B6B',
              fontSize: 14,
              lineHeight: '22px',
              minWidth: 'auto',
              padding: 0,
            }}
          >
            {t('login.footer.privacy')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Login
