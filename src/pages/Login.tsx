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
import {
  Ic_view_regular,
  Ic_view_hidden_regular,
  Ic_information_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { useAuth } from '@/contexts/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
      await login(email, password)

      // 로그인 성공 시 프로젝트 페이지로 이동
      navigate('/project')
    } catch (err) {
      // 로그인 실패 처리
      setError(true)
      setLoginAttempts((prev) => prev + 1)

      // 에러 메시지 설정
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } finally {
      setIsLoading(false)
    }
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
            차량 컨텐츠 제작 시스템에{'\n'}오신 것을 환영합니다
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
                ID (Email)
              </Typography>
              <TextField
                hdsProps={{ size: 'medium', isInvalid: error }}
                placeholder="이메일 입력"
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
                비밀번호
              </Typography>
              <TextField
                hdsProps={{ size: 'medium', isInvalid: error }}
                placeholder="비밀번호 입력"
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
              {error && (
                <Typography
                  component="p"
                  sx={{
                    fontFamily: 'Asta Sans, sans-serif',
                    fontSize: '12px',
                    lineHeight: '18px',
                    color: 'var(--red)',
                    marginTop: '4px',
                  }}
                >
                  {errorMessage || t('login.error.invalidCredentials', { count: loginAttempts })}
                </Typography>
              )}
            </Stack>

            {/* Login Button */}
            <Button
              hdsProps={{ size: 'large', style: 'primary', type: 'fill' }}
              type="submit"
              fullWidth
              sx={{
                fontFamily: 'Asta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {isLoading ? '로그인 중...' : '로그인'}
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
                현대자동차그룹 회원이 아니신가요?
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
                차량 컨텐츠 제작 시스템은 현대자동차그룹 SSO 가입 후 이용 가능합니다.
                <br />
                가입이 필요하신 경우, 아래 담당자 이메일로 문의해 주세요.
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
    </Box>
  )
}

export default Login
