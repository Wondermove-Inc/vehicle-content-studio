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
import Dialog from '@hmg-fe/hmg-design-system/Dialog'
import DialogTitle from '@hmg-fe/hmg-design-system/DialogTitle'
import DialogContent from '@hmg-fe/hmg-design-system/DialogContent'
import DialogActions from '@hmg-fe/hmg-design-system/DialogActions'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import ButtonGroup from '@hmg-fe/hmg-design-system/ButtonGroup'
import {
  Ic_folder_filled,
  Ic_view_regular,
  Ic_view_hidden_regular,
  Ic_help_regular,
  Ic_close_bold,
  Ic_check_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false)

  // Partner request form states
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: 'domestic',
    company: '',
    department: '',
    position: '',
    phone: '',
    reason: '',
  })
  const [showPartnerPassword, setShowPartnerPassword] = useState(false)
  const [showPartnerConfirmPassword, setShowPartnerConfirmPassword] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  // 비밀번호 검증
  const validatePassword = (password: string) => {
    return {
      hasUpperOrLower: /[A-Za-z]/.test(password) && (/[A-Z]/.test(password) || /[a-z]/.test(password)),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~;]/.test(password),
      isMinLength: password.length >= 8,
    }
  }

  const passwordValidation = validatePassword(partnerForm.password)

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
                onClick={() => setIsPartnerDialogOpen(true)}
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

      {/* Partner Login Dialog */}
      <Dialog
        open={isPartnerDialogOpen}
        onClose={() => setIsPartnerDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0px 0px 2px 0px rgba(34, 34, 34, 0.1)',
          },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{
            backgroundColor: '#fff',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px 0 24px',
            borderBottom: '1px solid #F0F0F0',
            color: '#111',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '24px',
            position: 'relative',
          }}
        >
          로그인 권한 요청
          <IconButton
            onClick={() => setIsPartnerDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: 40,
              borderRadius: '4px',
            }}
          >
            <Ic_close_bold size="24px" color="#6B6B6B" />
          </IconButton>
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent
          sx={{
            backgroundColor: '#fff',
            paddingTop: '12px !important',
            paddingLeft: '24px !important',
            paddingRight: '16px !important',
            paddingBottom: '24px !important',
          }}
        >
          <Stack spacing={1.5}>
            {/* Description */}
            <Typography
              hdsProps={{ variant: 'body', size: 'small' }}
              sx={{
                color: '#0E0F11',
                fontSize: 14,
                lineHeight: '22px',
              }}
            >
              아래 양식에 따라 모든 정보를 입력한 후 권한을 요청해 주세요.
            </Typography>

            {/* Form Table */}
            <Stack
              spacing={0}
              sx={{
                border: '1px solid #F0F0F0',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {/* Row 1 - Name */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    이름
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="이름 입력"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 2 - Email */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    ID (Email)
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="회사 이메일 입력"
                    type="email"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 3 - Password */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    비밀번호
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px 8px' }}>
                  <Stack spacing={0.75}>
                    <TextField
                      hdsProps={{
                        size: 'medium',
                        isClear: true,
                        timer: false,
                        isRequired: true,
                        isMultiline: false,
                        isUnderline: false,
                      }}
                      placeholder="비밀번호 입력"
                      type={showPartnerPassword ? 'text' : 'password'}
                      value={partnerForm.password}
                      onChange={(e) => setPartnerForm({ ...partnerForm, password: e.target.value })}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPartnerPassword(!showPartnerPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPartnerPassword ? (
                                <Ic_view_hidden_regular size="16px" />
                              ) : (
                                <Ic_view_regular size="16px" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {passwordValidation.hasUpperOrLower ? (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'success.main',
                            }}
                          >
                            <Ic_check_regular size="12px" />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography sx={{ fontSize: 12, lineHeight: 1, color: '#949494' }}>•</Typography>
                          </Box>
                        )}
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: '18px',
                            color: passwordValidation.hasUpperOrLower ? 'success.main' : '#949494',
                          }}
                        >
                          영문 대/소문자 한 자 이상
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {passwordValidation.hasNumber ? (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'success.main',
                            }}
                          >
                            <Ic_check_regular size="12px" />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography sx={{ fontSize: 12, lineHeight: 1, color: '#949494' }}>•</Typography>
                          </Box>
                        )}
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: '18px',
                            color: passwordValidation.hasNumber ? 'success.main' : '#949494',
                          }}
                        >
                          숫자 한 자 이상
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {passwordValidation.hasSpecialChar ? (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'success.main',
                            }}
                          >
                            <Ic_check_regular size="12px" />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography sx={{ fontSize: 12, lineHeight: 1, color: '#949494' }}>•</Typography>
                          </Box>
                        )}
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: '18px',
                            color: passwordValidation.hasSpecialChar ? 'success.main' : '#949494',
                          }}
                        >
                          특수문자 한 자 이상
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {passwordValidation.isMinLength ? (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'success.main',
                            }}
                          >
                            <Ic_check_regular size="12px" />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: '12px',
                              height: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography sx={{ fontSize: 12, lineHeight: 1, color: '#949494' }}>•</Typography>
                          </Box>
                        )}
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: '18px',
                            color: passwordValidation.isMinLength ? 'success.main' : '#949494',
                          }}
                        >
                          최소 8자리
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Box>

              {/* Row 4 - Confirm Password */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    비밀번호 확인
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                      isError: confirmPasswordError,
                    }}
                    placeholder="비밀번호 재입력"
                    type={showPartnerConfirmPassword ? 'text' : 'password'}
                    value={partnerForm.confirmPassword}
                    onChange={(e) => {
                      setPartnerForm({ ...partnerForm, confirmPassword: e.target.value })
                      // 입력 중에는 에러 상태 초기화
                      if (confirmPasswordError) {
                        setConfirmPasswordError(false)
                      }
                    }}
                    onBlur={() => {
                      // 비밀번호 확인 필드에 값이 있고, 비밀번호와 다를 경우 에러 표시
                      if (
                        partnerForm.confirmPassword &&
                        partnerForm.password !== partnerForm.confirmPassword
                      ) {
                        setConfirmPasswordError(true)
                      }
                    }}
                    helperText={confirmPasswordError ? '비밀번호를 다시 확인해 주세요' : ''}
                    fullWidth
                    FormHelperTextProps={{
                      sx: { color: 'error.main' },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPartnerConfirmPassword(!showPartnerConfirmPassword)
                            }
                            edge="end"
                            size="small"
                          >
                            {showPartnerConfirmPassword ? (
                              <Ic_view_hidden_regular size="16px" />
                            ) : (
                              <Ic_view_regular size="16px" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>

              {/* Row 5 - Region */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    권역
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <Select
                    hdsProps={{ size: 'medium', type: 'outline', helperText: undefined }}
                    value={partnerForm.region}
                    onChange={(e) => setPartnerForm({ ...partnerForm, region: e.target.value })}
                    fullWidth
                  >
                    <MenuItem hdsProps={{ size: 'medium' }} value="domestic">
                      국내
                    </MenuItem>
                    <MenuItem hdsProps={{ size: 'medium' }} value="overseas">
                      해외
                    </MenuItem>
                  </Select>
                </Box>
              </Box>

              {/* Row 6 - Company */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    회사
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="회사 입력"
                    value={partnerForm.company}
                    onChange={(e) => setPartnerForm({ ...partnerForm, company: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 7 - Department */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    부서
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="부서 입력"
                    value={partnerForm.department}
                    onChange={(e) => setPartnerForm({ ...partnerForm, department: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 8 - Position */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    직위
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="직위 입력"
                    value={partnerForm.position}
                    onChange={(e) => setPartnerForm({ ...partnerForm, position: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 9 - Phone */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid #F0F0F0' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    이동전화
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: false,
                      isUnderline: false,
                    }}
                    placeholder="전화번호 입력 (- 포함)"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Row 10 - Reason */}
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '140px',
                    backgroundColor: '#F5F5F5',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    hdsProps={{ variant: 'body', size: 'small' }}
                    sx={{ color: '#111', fontSize: 14, lineHeight: '22px' }}
                  >
                    권한 요청 사유
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, backgroundColor: '#fff', padding: '12px 16px' }}>
                  <TextField
                    hdsProps={{
                      size: 'medium',
                      isClear: true,
                      timer: false,
                      isRequired: true,
                      isMultiline: true,
                      isUnderline: false,
                    }}
                    placeholder="로그인 권한 요청 사유 입력"
                    value={partnerForm.reason}
                    onChange={(e) => setPartnerForm({ ...partnerForm, reason: e.target.value })}
                    fullWidth
                    multiline
                    rows={1}
                  />
                </Box>
              </Box>
            </Stack>
          </Stack>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions
          hdsProps={{ fitted: false }}
          sx={{
            backgroundColor: '#fff',
            padding: '16px 24px 24px',
            borderTop: '1px solid #F0F0F0',
            justifyContent: 'flex-end',
          }}
        >
          <ButtonGroup hdsProps>
            <Button
              hdsProps={{ size: 'medium', type: 'outline' }}
              onClick={() => setIsPartnerDialogOpen(false)}
              sx={{ height: 36 }}
            >
              취소
            </Button>
            <Button
              hdsProps={{ size: 'medium', style: 'primary', type: 'fill' }}
              disabled={
                !partnerForm.name ||
                !partnerForm.email ||
                !partnerForm.password ||
                !partnerForm.confirmPassword ||
                !partnerForm.company ||
                !partnerForm.department ||
                !partnerForm.position ||
                !partnerForm.phone ||
                !partnerForm.reason ||
                confirmPasswordError ||
                partnerForm.password !== partnerForm.confirmPassword
              }
              sx={{ height: 36 }}
            >
              권한 요청하기
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Login
