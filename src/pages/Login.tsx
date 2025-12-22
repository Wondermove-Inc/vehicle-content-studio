import { useState } from 'react'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import Button from '@hmg-fe/hmg-design-system/Button'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import IconButton from '@hmg-fe/hmg-design-system/IconButton'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import DirectionsCar from '@hmg-fe/hmg-design-system/icons-material/DirectionsCar'
import Visibility from '@hmg-fe/hmg-design-system/icons-material/Visibility'
import VisibilityOff from '@hmg-fe/hmg-design-system/icons-material/VisibilityOff'
import HelpOutline from '@hmg-fe/hmg-design-system/icons-material/HelpOutline'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
      }}
    >
      <Stack
        spacing={0}
        sx={{
          width: '380px',
          alignItems: 'center',
          marginTop: '-40px',
        }}
      >
        {/* Header Section */}
        <Stack spacing={4.5} sx={{ width: '100%', paddingBottom: '36px' }}>
          <Stack spacing={0} sx={{ alignItems: 'center' }}>
            {/* Car Icon */}
            <Box
              sx={{
                background: 'linear-gradient(180deg, rgba(18, 20, 22, 1) 0%, rgba(18, 20, 22, 0.85) 100%)',
                padding: '8px',
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DirectionsCar sx={{ color: '#fff', fontSize: 20 }} />
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
                차량 컨텐츠 제작 시스템에
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
                오신 것을 환영합니다
              </Typography>
            </Stack>

            {/* Subtitle */}
            <Typography
              hdsProps={{ variant: 'body', size: 'small' }}
              sx={{
                color: 'var(--hds-palette-on-surface-ultimate)',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              차량 컨텐츠 제작을 진행하기 위해 로그인 해주세요
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
                ID (Email)
              </Typography>
              <TextField
                hdsProps={{ size: 'medium' }}
                placeholder="이메일 입력"
                type="email"
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
                비밀번호
              </Typography>
              <TextField
                hdsProps={{ size: 'medium' }}
                placeholder="비밀번호 입력"
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Login Button */}
            <Button
              hdsProps={{ size: 'large', style: 'primary', type: 'fill' }}
              type="submit"
              fullWidth
            >
              로그인
            </Button>

            {/* Divider with "또는" */}
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
                또는
              </Typography>
              <Divider hdsProps={{ style: 'lowest' }} sx={{ flexGrow: 1 }} />
            </Stack>

            {/* Secondary Actions */}
            <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
              <Button
                hdsProps={{ size: 'large', type: 'outline' }}
                sx={{ flexGrow: 1 }}
              >
                협력사 로그인 권한 신청
              </Button>
              <Button
                hdsProps={{ size: 'large', type: 'outline' }}
                sx={{
                  minWidth: '40px !important',
                  width: '40px !important',
                  maxWidth: '40px',
                  padding: '0 !important',
                  flexShrink: 0,
                }}
              >
                <HelpOutline sx={{ fontSize: 16 }} />
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
            서비스 약관
          </Button>
          <Typography
            sx={{
              color: '#6B6B6B',
              fontSize: 14,
              lineHeight: '22px',
            }}
          >
            및
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
            개인정보 보호정책
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Login
