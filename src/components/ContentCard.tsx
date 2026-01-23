import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Badge from '@hmg-fe/hmg-design-system/Badge'
import { Ic_star_filled, Ic_picture_filled } from '@hmg-fe/hmg-design-system/HmgIcon'
import { ContentCardData } from '@/types/content.types'

interface ContentCardProps {
  data: ContentCardData
  onFavoriteToggle?: (id: string, contentType: string) => void
  onClick?: () => void
  timestamp?: string
}

function ContentCard({ data, onFavoriteToggle, onClick, timestamp }: ContentCardProps) {
  const { t } = useTranslation()

  // car_06.png 이미지인지 확인
  const isCar06 = data.thumbnailUrl?.includes('car_06.png')

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFavoriteToggle?.(data.id, data.contentType)
  }

  const getContentTypeIcon = (_type: string) => {
    // 컨텐츠 타입별 아이콘 매핑 (필요시 확장 가능)
    return <Ic_picture_filled size="16px" color="currentColor" />
  }

  const getContentTypeBadgeStyle = (type: string) => {
    // 컨텐츠 타입별 배지 스타일 매핑
    const styleMap: Record<string, string> = {
      'Beauty Angle Cut': 'purple',
      '2D 360': 'green',
      'Web GL': 'orange',
      'VCM': 'blue',
      'Web CC': 'cyan',
      'PI': 'pink',
    }
    return styleMap[type] || 'default'
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        width: '220px',
        minWidth: '220px',
        maxWidth: '220px',
        flexShrink: 0,
        background: 'white',
        boxShadow: '0px 4px 12px rgba(34, 34, 34, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(238, 239, 241, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: '0px 6px 16px rgba(34, 34, 34, 0.15)',
        } : {},
      }}
    >
      {/* 이미지 섹션 */}
      <Box
        sx={{
          position: 'relative',
          width: '208px',
          height: '110px',
          margin: '6px',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* 메인 이미지 */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #C4C6C9 0%, #E8E9EB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={data.thumbnailUrl || '/images/car_05.png'}
            alt={`${data.projectCode} ${data.contentType}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* 이미지 테두리 (inside) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid rgba(0, 0, 0, 0.04)',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        />

        {/* 하단 그라디언트 박스 - car_06.png가 아닐 때만 표시 */}
        {!isCar06 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '52px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* 프로젝트 코드 텍스트 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            right: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '20px',
              color: isCar06 ? 'var(--primary)' : 'white',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
            }}
          >
            {data.projectCode}
          </Typography>
        </Box>

        {/* 별 아이콘 (우측 상단) */}
        <Box
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          {data.isFavorite ? (
            <Ic_star_filled size="20px" color="var(--yellow)" />
          ) : (
            <Ic_star_filled size="20px" color="white" />
          )}
        </Box>
      </Box>

      {/* 카드 내용 */}
      <Box
        sx={{
          padding: '8px 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* 컨텐츠 타입 배지 + 타임스탬프 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Badge
            hdsProps={{
              size: 'medium',
              style: getContentTypeBadgeStyle(data.contentType) as any,
              icon: getContentTypeIcon(data.contentType),
              type: 'strong',
            }}
            sx={{
              width: 'fit-content',
              '& .MuiBadge-badge': {
                position: 'static',
                transform: 'none',
              },
            }}
          >
            {data.contentType}
          </Badge>

          {/* 타임스탬프 */}
          {timestamp && (
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                color: 'var(--on_surface_mid)',
              }}
            >
              {timestamp}
            </Typography>
          )}
        </Box>

        {/* 채널 태그들 */}
        {data.channels && data.channels.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {data.channels.map((channel, index) => (
              <Badge
                key={index}
                hdsProps={{
                  size: 'small',
                  style: 'default',
                  icon: false,
                  type: 'strong',
                }}
              >
                {t(`common.channel.${channel}`) || channel}
              </Badge>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ContentCard
