import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import Button from '@hmg-fe/hmg-design-system/Button'
import IconButton from '@hmg-fe/hmg-design-system/IconButton'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import CircularProgress from '@hmg-fe/hmg-design-system/CircularProgress'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@hmg-fe/hmg-design-system'
import {
  Ic_view_regular,
  Ic_view_hidden_regular,
  Ic_information_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { useAuth } from '@/contexts/AuthContext'
import { PermissionLevel } from '@/types/auth.types'

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState('')
  const [unauthorizedEmail, setUnauthorizedEmail] = useState('')

  // 이미 로그인된 사용자는 프로젝트 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/project')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setError(false)
      setErrorMessage('')

      // 로그인 시도
      const user = await login(email, password)

      // 미권한 사용자 처리
      if (user.permissionLevel === PermissionLevel.UNAUTHORIZED) {
        setUnauthorizedEmail(email)
        setShowPermissionDialog(true)
        setIsLoading(false)
        return
      }

      // 로그인 성공 시 프로젝트 페이지로 이동
      navigate('/project')
    } catch (err) {
      // 로그인 실패 처리
      setError(true)

      // 에러 메시지 설정
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage(t('login.error.invalidCredentials'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePermissionRequest = () => {
    // 권한 요청 로직 (실제로는 API 호출)
    console.log('Permission requested for:', unauthorizedEmail, 'Organization:', selectedOrganization)

    // 성공 메시지 표시 후 다이얼로그 닫기
    alert(t('login.permissionRequest.success'))
    setShowPermissionDialog(false)
    setSelectedOrganization('')
    setEmail('')
    setPassword('')
  }

  const handleCancelPermissionRequest = () => {
    setShowPermissionDialog(false)
    setSelectedOrganization('')
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '170px',
          paddingBottom: '16px',
        }}
      >
        <Stack
          spacing={8}
          sx={{
            width: '100%',
            maxWidth: '470px',
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '42px',
              color: '#121416',
              whiteSpace: 'pre-line',
            }}
          >
            {t('login.title.welcome')}{'\n'}{t('login.title.welcomeSuffix')}
          </Typography>

          {/* Login Form */}
          <Stack
            component="form"
            spacing={3}
            onSubmit={handleLogin}
            sx={{ width: '100%' }}
          >
            {/* Email Field */}
            <Stack spacing={1}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0E0F11',
                }}
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
                sx={{
                  '& input::placeholder': {
                    color: '#8E949F',
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                  },
                }}
              />
            </Stack>

            {/* Password Field */}
            <Stack spacing={1}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0E0F11',
                }}
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
                sx={{
                  '& input::placeholder': {
                    color: '#949494',
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#D1D1D1',
                      borderRadius: '4px',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <Ic_view_hidden_regular size="20px" />
                        ) : (
                          <Ic_view_regular size="20px" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Error Message */}
            {error && (
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: 'var(--red)',
                  marginTop: '24px !important',
                  marginBottom: '24px !important',
                }}
              >
                {errorMessage || t('login.error.invalidCredentials')}
              </Typography>
            )}

            {/* Login Button */}
            <Button
              hdsProps={{
                size: 'large',
                style: 'primary',
                type: 'fill',
                isLoading,
                icon: isLoading ? <CircularProgress hdsProps={{ size: 'small', style: 'primary' }} /> : undefined
              }}
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{
                fontFamily: 'Asta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                marginTop: error ? '0 !important' : '24px !important',
              }}
            >
              {!isLoading && t('login.button.login')}
            </Button>
          </Stack>

          {/* SSO Information Section */}
          <Stack spacing={0.75} sx={{ marginTop: '44px !important' }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Ic_information_regular
                size="16px"
                style={{ color: '#525760' }}
              />
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#383B42',
                }}
              >
                {t('login.sso.notMember')}
              </Typography>
            </Stack>
            <Stack spacing={0.25}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#656B76',
                }}
              >
                {t('login.sso.description')}
                <br />
                {t('login.sso.contact')}
              </Typography>
              <Typography
                component="a"
                href="mailto:aaa@hyundai.com"
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#1347AF',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                aaa@hyundai.com
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Right Side - Background Image */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            bottom: '16px',
            left: '0',
            backgroundImage: 'url(/images/login-image.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
        />

        {/* Logo */}
        <Box
          component="img"
          src="/images/Hyundai_Motor_Group_CI.svg"
          alt="Hyundai Motor Group"
          sx={{
            position: 'absolute',
            top: '52px', // 16px (parent top) + 36px = 52px
            right: '52px', // 16px (parent right) + 36px = 52px
            width: '134px',
            height: '42px',
          }}
        />

        {/* Copyright */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: '38px', // 16px (parent bottom) + 22px = 38px
            left: '28px',
            fontSize: '13px',
            lineHeight: '19px',
            color: 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'Asta Sans, sans-serif',
          }}
        >
          ⓒ 2026. Hyundai Motor Group. All rights reserved.
        </Typography>
      </Box>

      {/* 권한 요청 다이얼로그 */}
      <Dialog
        open={showPermissionDialog}
        onClose={() => {}} // 배경 클릭으로 닫히지 않도록 비활성화
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#0A0A0A',
            }}
          >
            {t('login.permissionRequest.title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ paddingTop: '8px' }}>
            <Typography
              sx={{
                fontFamily: 'Asta Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#525760',
                whiteSpace: 'pre-line',
              }}
            >
              {t('login.permissionRequest.description')}
            </Typography>

            <Stack spacing={1}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0E0F11',
                }}
              >
                {t('login.permissionRequest.organizationLabel')}
              </Typography>
              <Select
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value as string)}
                displayEmpty
                fullWidth
                hdsProps={{ size: 'medium' }}
                sx={{
                  '& .MuiSelect-select': {
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '14px',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <Typography
                    sx={{
                      fontFamily: 'Asta Sans, sans-serif',
                      fontSize: '14px',
                      color: '#8E949F',
                    }}
                  >
                    {t('login.permissionRequest.organizationPlaceholder')}
                  </Typography>
                </MenuItem>
                <MenuItem value="studio_a">
                  {t('login.permissionRequest.organizations.studio_a')}
                </MenuItem>
                <MenuItem value="studio_b">
                  {t('login.permissionRequest.organizations.studio_b')}
                </MenuItem>
                <MenuItem value="studio_c">
                  {t('login.permissionRequest.organizations.studio_c')}
                </MenuItem>
                <MenuItem value="wondermove">
                  {t('login.permissionRequest.organizations.wondermove')}
                </MenuItem>
                <MenuItem value="other">
                  {t('login.permissionRequest.organizations.other')}
                </MenuItem>
              </Select>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelPermissionRequest}
            hdsProps={{ size: 'medium', style: 'strong' }}
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            {t('login.permissionRequest.button.cancel')}
          </Button>
          <Button
            onClick={handlePermissionRequest}
            disabled={!selectedOrganization}
            hdsProps={{ size: 'medium', style: 'primary' }}
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            {t('login.permissionRequest.button.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Login
