import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import { Ic_arrow_back_regular } from '@hmg-fe/hmg-design-system/HmgIcon'

function ContentRequest() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Button
          hdsProps={{
            size: 'small',
            type: 'outline',
            icon: <Ic_arrow_back_regular size="20px" />,
            isIconOnly: true,
          }}
          onClick={() => navigate('/project')}
        />
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {t('common.menu.contentRequest')}
        </Typography>
      </Box>

      {/* 컨텐츠 영역 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: 'var(--on_surface_mid)' }}>
          컨텐츠 요청 기능이 구현될 예정입니다.
        </Typography>
      </Box>
    </Box>
  )
}

export default ContentRequest
