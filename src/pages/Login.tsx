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
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@hmg-fe/hmg-design-system'
import {
  Ic_view_regular,
  Ic_view_hidden_regular,
  Ic_information_regular,
  Ic_close_bold,
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
  const [showPendingDialog, setShowPendingDialog] = useState(false)
  const [requestReason, setRequestReason] = useState('')
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
    console.log('Permission requested for:', unauthorizedEmail, 'Reason:', requestReason)

    // 권한 요청 다이얼로그 닫고 승인 대기 다이얼로그 열기
    setShowPermissionDialog(false)
    setShowPendingDialog(true)
    setRequestReason('')
  }

  const handleCancelPermissionRequest = () => {
    setShowPermissionDialog(false)
    setRequestReason('')
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
        PaperProps={{
          sx: {
            width: '480px',
            borderRadius: '8px',
            boxShadow: '0px 0px 2px 0px rgba(34, 34, 34, 0.1), 0px 24px 22px 0px rgba(34, 34, 34, 0.05)',
          }
        }}
      >
        <DialogTitle
          sx={{
            padding: '0 !important',
            margin: '0 !important',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              minHeight: '60px',
              paddingLeft: '24px',
              paddingRight: '10px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #F0F0F0',
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '24px',
              color: '#111111',
            }}
          >
            <Box
              component="span"
              sx={{
                flex: '1 0 0',
                minWidth: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {t('login.permissionRequest.title')}
            </Box>
            <IconButton
              onClick={handleCancelPermissionRequest}
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                flexShrink: 0,
                padding: 0,
              }}
            >
              <Ic_close_bold size="24px" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '18px 24px 24px 24px !important',
            margin: '0 !important',
          }}
        >
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontFamily: 'Asta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                color: '#0E0F11',
              }}
            >
              {t('login.permissionRequest.description')}
            </Typography>

            {/* ID (Email) 읽기 전용 */}
            <Stack spacing={1} sx={{ marginTop: '16px !important' }}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '22px',
                  color: '#0E0F11',
                }}
              >
                {t('login.permissionRequest.emailLabel')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#0E0F11',
                  marginTop: '0 !important',
                }}
              >
                {unauthorizedEmail}
              </Typography>
            </Stack>

            {/* 요청 사유 입력 */}
            <Stack spacing={1} sx={{ marginTop: '16px !important' }}>
              <Typography
                sx={{
                  fontFamily: 'Asta Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  lineHeight: '22px',
                  color: '#0E0F11',
                }}
              >
                {t('login.permissionRequest.reasonLabel')}
              </Typography>
              <TextField
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder={t('login.permissionRequest.reasonPlaceholder')}
                multiline
                rows={4}
                fullWidth
                hdsProps={{ size: 'medium' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '14px',
                    borderRadius: '4px',
                    '& fieldset': {
                      borderColor: '#D1D1D1',
                    },
                  },
                  '& textarea': {
                    resize: 'none',
                  },
                  '& textarea::placeholder': {
                    color: '#949494',
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '14px',
                  },
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            padding: '16px 24px 24px 24px !important',
            margin: '0 !important',
            borderTop: '1px solid #F0F0F0',
            justifyContent: 'flex-end',
            gap: '8px',
            '& > :not(:first-of-type)': {
              marginLeft: '0 !important',
            },
          }}
        >
          <Button
            onClick={handleCancelPermissionRequest}
            hdsProps={{ size: 'medium', style: 'strong', type: 'outline' }}
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              height: '36px',
              paddingLeft: '12px',
              paddingRight: '12px',
              borderRadius: '4px',
              borderColor: '#D1D1D1',
              width: 'fit-content',
              minWidth: 'unset !important',
            }}
          >
            {t('login.permissionRequest.button.cancel')}
          </Button>
          <Button
            onClick={handlePermissionRequest}
            disabled={!requestReason.trim()}
            hdsProps={{ size: 'medium', style: 'primary', type: 'fill' }}
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              height: '36px',
              paddingLeft: '12px',
              paddingRight: '12px',
              borderRadius: '4px',
              backgroundColor: '#111111',
              color: requestReason.trim() ? '#FFFFFF' : '#828282',
            }}
          >
            {t('login.permissionRequest.button.submit')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 승인 대기 다이얼로그 */}
      <Dialog
        open={showPendingDialog}
        onClose={() => {
          setShowPendingDialog(false)
          setEmail('')
          setPassword('')
        }}
        PaperProps={{
          sx: {
            width: '480px',
            borderRadius: '8px',
            boxShadow: '0px 0px 2px 0px rgba(34, 34, 34, 0.1), 0px 24px 22px 0px rgba(34, 34, 34, 0.05)',
          }
        }}
      >
        <DialogTitle
          sx={{
            padding: '0 !important',
            margin: '0 !important',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              minHeight: '60px',
              paddingLeft: '24px',
              paddingRight: '10px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #F0F0F0',
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '24px',
              color: '#111111',
            }}
          >
            <Box
              component="span"
              sx={{
                flex: '1 0 0',
                minWidth: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {t('login.permissionPending.title')}
            </Box>
            <IconButton
              onClick={() => {
                setShowPendingDialog(false)
                setEmail('')
                setPassword('')
              }}
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                flexShrink: 0,
                padding: 0,
              }}
            >
              <Ic_close_bold size="24px" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '18px 24px 24px 24px !important',
            margin: '0 !important',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '22px',
              color: '#0E0F11',
              whiteSpace: 'pre-line',
            }}
          >
            {t('login.permissionPending.description')}
          </Typography>
        </DialogContent>
        <DialogActions
          hdsProps={{ scrollable: false }}
          sx={{
            padding: '0 24px 24px 24px !important',
            margin: '0 !important',
            justifyContent: 'flex-end',
            gap: '8px',
            '& > :not(:first-of-type)': {
              marginLeft: '0 !important',
            },
          }}
        >
          <Button
            onClick={() => {
              setShowPendingDialog(false)
              setEmail('')
              setPassword('')
            }}
            hdsProps={{ type: 'fill', style: 'primary', size: 'medium' }}
            sx={{
              fontFamily: 'Asta Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              height: '36px',
              paddingLeft: '12px',
              paddingRight: '12px',
              borderRadius: '4px',
              width: 'fit-content',
              minWidth: 'unset !important',
            }}
          >
            {t('login.permissionPending.button.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Login
