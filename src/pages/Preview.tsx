import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import IconButton from '@hmg-fe/hmg-design-system/IconButton'
import Button from '@hmg-fe/hmg-design-system/Button'
import {
  IcArrowLeftRegular,
  Ic_arrow_back_regular,
  Ic_arrow_forward_regular,
  Ic_plus_regular,
  Ic_minus_regular,
  Ic_download_bold,
  Ic_information_filled,
  Ic_information_bold,
  Ic_close_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

// 썸네일 이미지 목록
const thumbnailImages = [
  '/images/car_01.png',
  '/images/car_02.png',
  '/images/car_03.png',
  '/images/car_04.png',
  '/images/car_05.png',
]

// Location state 인터페이스
interface LocationState {
  contentData?: {
    id: number
    projectCode: string
    contentType: string
    brand: string
  }
  projectId?: string
  contentType?: string
  totalImages?: number
}

function Preview() {
  const { imageIndex } = useParams<{ imageIndex: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  // URL 파라미터 유효성 검증
  const index = Number(imageIndex)
  if (isNaN(index) || index < 1 || index > 16) {
    navigate('/project', { replace: true })
    return null
  }

  // Location state에서 데이터 가져오기
  const state = location.state as LocationState
  const { contentData, projectId } = state || {}

  // state 데이터가 없으면 프로젝트 페이지로 리다이렉트
  if (!contentData || !projectId) {
    navigate('/project', { replace: true })
    return null
  }

  // 상태 관리
  const [currentIndex, setCurrentIndex] = useState(index)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [isInfoSelected, setIsInfoSelected] = useState(true)

  // 이미지 경로 가져오기
  const getImagePath = () => {
    return thumbnailImages[(contentData.id % thumbnailImages.length)]
  }

  // 네비게이션 핸들러
  const handlePrev = () => {
    if (currentIndex > 1) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setZoomLevel(1.0) // 이미지 변경 시 줌 리셋
      navigate(`/preview/${newIndex}`, { replace: true, state })
    }
  }

  const handleNext = () => {
    if (currentIndex < 16) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setZoomLevel(1.0) // 이미지 변경 시 줌 리셋
      navigate(`/preview/${newIndex}`, { replace: true, state })
    }
  }

  // 줌 핸들러
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3.0))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1.0))
  }

  const handleZoomReset = () => {
    setZoomLevel(1.0)
  }

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        navigate(-1)
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut()
      } else if (e.key === '0') {
        handleZoomReset()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, zoomLevel])

  // URL 파라미터 변경 시 currentIndex 동기화
  useEffect(() => {
    setCurrentIndex(index)
  }, [index])

  const canGoPrev = currentIndex > 1
  const canGoNext = currentIndex < 16

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Button
            hdsProps={{
              size: 'medium',
              type: 'filter',
              icon: <IcArrowLeftRegular size="20px" />,
              style: undefined,
              isIconOnly: true,
            }}
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          />
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: '24px',
              color: '#0A0A0A',
            }}
          >
            {contentData.projectCode} {contentData.contentType} C{String(currentIndex).padStart(3, '0')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            hdsProps={{
              size: 'medium',
              type: 'filter',
              icon: isInfoSelected ? <Ic_information_filled size="20px" /> : <Ic_information_bold size="20px" />,
              style: undefined,
              isIconOnly: true,
            }}
            onClick={() => setIsInfoSelected(!isInfoSelected)}
            aria-label="설정"
            sx={{
              backgroundColor: isInfoSelected ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
              '&:hover': {
                backgroundColor: isInfoSelected ? 'rgba(0, 0, 0, 0.08)' : undefined,
              },
            }}
          />
          <Button
            hdsProps={{
              size: 'medium',
              type: 'fill',
              icon: <Ic_download_bold size="16px" color="currentColor" />,
              style: undefined,
            }}
          >
            다운로드 받기
          </Button>
        </Box>
      </Box>

      {/* 메인 컨텐츠 영역 - 2단 레이아웃 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* 좌측 이미지 패널 */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'var(--surface_container_low)',
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            mt: '0px',
            mx: '16px',
            mb: '16px',
          }}
        >
          <Box
            component="img"
            src={getImagePath()}
            alt={`C${String(currentIndex).padStart(3, '0')}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.3s ease',
              cursor: zoomLevel > 1 ? 'grab' : 'default',
            }}
          />

          {/* 이전 이미지 버튼 */}
          <IconButton
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label={t('preview.controls.previous')}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <Ic_arrow_back_regular size="24px" color="#1E1E1E" />
          </IconButton>

          {/* 다음 이미지 버튼 */}
          <IconButton
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label={t('preview.controls.next')}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 48,
              height: 48,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <Ic_arrow_forward_regular size="24px" color="#1E1E1E" />
          </IconButton>

          {/* 이미지 카운터 */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '20px',
              }}
            >
              C{String(currentIndex).padStart(3, '0')} / C016
            </Typography>
          </Box>

          {/* 줌 컨트롤 */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '24px',
              padding: '8px',
            }}
          >
            <IconButton
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1.0}
              aria-label={t('preview.controls.zoomOut')}
              sx={{
                width: 40,
                height: 40,
                '&:disabled': {
                  opacity: 0.3,
                },
              }}
            >
              <Ic_minus_regular size="20px" color="#1E1E1E" />
            </IconButton>
            <Typography
              onClick={handleZoomReset}
              sx={{
                minWidth: 60,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '20px',
                color: '#1E1E1E',
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {Math.round(zoomLevel * 100)}%
            </Typography>
            <IconButton
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3.0}
              aria-label={t('preview.controls.zoomIn')}
              sx={{
                width: 40,
                height: 40,
                '&:disabled': {
                  opacity: 0.3,
                },
              }}
            >
              <Ic_plus_regular size="20px" color="#1E1E1E" />
            </IconButton>
          </Box>
        </Box>

        {/* 우측 정보 패널 */}
        {isInfoSelected && (
          <Box
            sx={{
              width: '240px',
              backgroundColor: '#FFFFFF',
              px: '16px',
              py: '16px',
              overflow: 'auto',
              border: '1px solid var(--outline_lowest)',
              borderRadius: '10px',
              mr: '16px',
              mb: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: '30px',
                  color: '#0A0A0A',
                }}
              >
                이미지 정보
              </Typography>
              <Button
                hdsProps={{
                  size: 'medium',
                  type: 'filter',
                  icon: <Ic_close_regular size="16px" />,
                  style: undefined,
                  isIconOnly: true,
                }}
                onClick={() => setIsInfoSelected(false)}
                aria-label="닫기"
              />
            </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: '4px' }}>
                프로젝트
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#0A0A0A' }}>
                {contentData.projectCode}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: '4px' }}>
                컨텐츠 유형
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#0A0A0A' }}>
                {contentData.contentType}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: '4px' }}>
                카메라 ID
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#0A0A0A' }}>
                C{String(currentIndex).padStart(3, '0')}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#666', marginBottom: '4px' }}>
                브랜드
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#0A0A0A' }}>
                {contentData.brand}
              </Typography>
            </Box>
          </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Preview
