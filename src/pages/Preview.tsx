import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import ButtonGroup from '@hmg-fe/hmg-design-system/ButtonGroup'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import Popover from '@hmg-fe/hmg-design-system/Popover'
import Paper from '@hmg-fe/hmg-design-system/Paper'
import MenuList from '@hmg-fe/hmg-design-system/MenuList'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
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
  const [zoomMenuAnchor, setZoomMenuAnchor] = useState<null | HTMLElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 이미지 경로 가져오기
  const getImagePath = () => {
    return thumbnailImages[(contentData.id % thumbnailImages.length)]
  }

  // 네비게이션 핸들러
  const handlePrev = () => {
    const newIndex = currentIndex > 1 ? currentIndex - 1 : 16
    setCurrentIndex(newIndex)
    setZoomLevel(1.0) // 이미지 변경 시 줌 리셋
    navigate(`/preview/${newIndex}`, { replace: true, state })
  }

  const handleNext = () => {
    const newIndex = currentIndex < 16 ? currentIndex + 1 : 1
    setCurrentIndex(newIndex)
    setZoomLevel(1.0) // 이미지 변경 시 줌 리셋
    navigate(`/preview/${newIndex}`, { replace: true, state })
  }

  // 줌 프리셋 값들
  const zoomPresets = [0.5, 0.75, 1.0, 1.25, 2.0, 3.0]

  // 줌 핸들러
  const handleZoomIn = () => {
    const currentIndex = zoomPresets.findIndex(preset => preset >= zoomLevel)
    if (currentIndex < zoomPresets.length - 1) {
      setZoomLevel(zoomPresets[currentIndex + 1])
    }
  }

  const handleZoomOut = () => {
    const currentIndex = zoomPresets.findIndex(preset => preset >= zoomLevel)
    if (currentIndex > 0) {
      setZoomLevel(zoomPresets[currentIndex - 1])
    } else if (currentIndex === -1) {
      // 현재 줌이 최대 프리셋보다 크면 최대 프리셋으로
      setZoomLevel(zoomPresets[zoomPresets.length - 1])
    }
  }

  const handleZoomMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setZoomMenuAnchor(event.currentTarget)
  }

  const handleZoomMenuClose = () => {
    setZoomMenuAnchor(null)
  }

  const handleZoomSelect = (zoom: number | 'fit') => {
    if (zoom === 'fit') {
      setZoomLevel(1.0) // 화면에 맞춤 (기본값으로 설정)
    } else {
      setZoomLevel(zoom)
    }
    handleZoomMenuClose()
  }

  // 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel >= 1.25) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 줌 레벨 변경 시 이미지 위치 리셋
  useEffect(() => {
    setImagePosition({ x: 0, y: 0 })
  }, [zoomLevel, currentIndex])

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
        setZoomLevel(1.0)
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

  const canGoPrev = true // 순환 구조로 항상 가능
  const canGoNext = true // 순환 구조로 항상 가능

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                lineHeight: '24px',
                color: '#0A0A0A',
              }}
            >
              {contentData.projectCode} {contentData.contentType}
            </Typography>
            <Badge hdsProps={{ size: 'medium', style: 'yellow', icon: false }}>
              C{String(currentIndex).padStart(3, '0')}
            </Badge>
          </Box>
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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            sx={{
              width: `${zoomLevel * 100}%`,
              height: `${zoomLevel * 100}%`,
              maxWidth: 'none',
              maxHeight: 'none',
              objectFit: 'contain',
              transition: isDragging ? 'none' : 'width 0.3s ease, height 0.3s ease',
              cursor: zoomLevel >= 1.25 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
              userSelect: 'none',
              WebkitUserDrag: 'none',
            }}
          />

          {/* 이전 이미지 버튼 */}
          <Button
            hdsProps={{
              size: 'large',
              type: 'filter',
              icon: <Ic_arrow_back_regular size="24px" color="#FFFFFF" />,
              style: undefined,
              isIconOnly: true,
            }}
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label={t('preview.controls.previous')}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none !important',
              outline: 'none !important',
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                border: 'none !important',
                outline: 'none !important',
              },
              '&:focus': {
                outline: 'none !important',
                border: 'none !important',
              },
              '&:active': {
                outline: 'none !important',
                border: 'none !important',
              },
            }}
          />

          {/* 다음 이미지 버튼 */}
          <Button
            hdsProps={{
              size: 'large',
              type: 'filter',
              icon: <Ic_arrow_forward_regular size="24px" color="#FFFFFF" />,
              style: undefined,
              isIconOnly: true,
            }}
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label={t('preview.controls.next')}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none !important',
              outline: 'none !important',
              backgroundColor: 'rgba(0, 0, 0, 0.40)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                border: 'none !important',
                outline: 'none !important',
              },
              '&:focus': {
                outline: 'none !important',
                border: 'none !important',
              },
              '&:active': {
                outline: 'none !important',
                border: 'none !important',
              },
            }}
          />

          {/* 줌 컨트롤 */}
          <ButtonGroup
            hdsProps={{ isAttached: true }}
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              borderRadius: '24px',
            }}
          >
            <Button
              hdsProps={{
                size: 'small',
                style: undefined,
                type: 'outline',
                icon: <Ic_minus_regular size="16px" color="#1E1E1E" />,
                isIconOnly: true,
              }}
              onClick={handleZoomOut}
              disabled={zoomLevel <= zoomPresets[0]}
              aria-label={t('preview.controls.zoomOut')}
            />
            <Button
              hdsProps={{
                size: 'small',
                style: undefined,
                type: 'outline',
              }}
              onClick={handleZoomMenuOpen}
              sx={{
                minWidth: 60,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {Math.round(zoomLevel * 100)}%
            </Button>
            <Button
              hdsProps={{
                size: 'small',
                style: undefined,
                type: 'outline',
                icon: <Ic_plus_regular size="16px" color="#1E1E1E" />,
                isIconOnly: true,
              }}
              onClick={handleZoomIn}
              disabled={zoomLevel >= zoomPresets[zoomPresets.length - 1]}
              aria-label={t('preview.controls.zoomIn')}
            />
          </ButtonGroup>

          {/* 줌 옵션 메뉴 */}
          <Popover
            open={Boolean(zoomMenuAnchor)}
            anchorEl={zoomMenuAnchor}
            onClose={handleZoomMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Paper hdsProps={{ size: 'small' }}>
              <MenuList hdsProps>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 0.5} onClick={() => handleZoomSelect(0.5)}>
                  50%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 0.75} onClick={() => handleZoomSelect(0.75)}>
                  75%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 1.0} onClick={() => handleZoomSelect(1.0)}>
                  100%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 1.25} onClick={() => handleZoomSelect(1.25)}>
                  125%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 2.0} onClick={() => handleZoomSelect(2.0)}>
                  200%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} selected={zoomLevel === 3.0} onClick={() => handleZoomSelect(3.0)}>
                  300%
                </MenuItem>
                <MenuItem hdsProps={{ size: 'small' }} onClick={() => handleZoomSelect('fit')}>
                  화면에 맞춤
                </MenuItem>
              </MenuList>
            </Paper>
          </Popover>
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
