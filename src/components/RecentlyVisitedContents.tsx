import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import { Ic_arrow_forward_regular, Ic_time_bold } from '@hmg-fe/hmg-design-system/HmgIcon'
import ContentCard from './ContentCard'
import { RecentlyVisitedContent } from '@/types/content.types'

function RecentlyVisitedContents() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [recentContents, setRecentContents] = useState<RecentlyVisitedContent[]>([])
  const [contentFavorites, setContentFavorites] = useState<Set<string>>(new Set())

  // localStorage에서 최근 방문 데이터 로드
  useEffect(() => {
    // 이전 버전 localStorage 키 정리
    localStorage.removeItem('recently-visited-contents')
    localStorage.removeItem('recently-visited-contents-v2')

    const loadRecentContents = () => {
      const saved = localStorage.getItem('recently-visited-contents-v3')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          // 최근 방문 순으로 정렬 (최신 8개만)
          const sorted = parsed
            .map((item: any) => ({
              ...item,
              visitedAt: new Date(item.visitedAt),
            }))
            .sort((a: RecentlyVisitedContent, b: RecentlyVisitedContent) =>
              b.visitedAt.getTime() - a.visitedAt.getTime()
            )
            .slice(0, 8)
          setRecentContents(sorted)
        } catch (error) {
          console.error('Failed to parse recently visited contents:', error)
        }
      } else {
        // localStorage에 데이터가 없으면 샘플 데이터 생성 (테스트용)
        const sampleData: RecentlyVisitedContent[] = [
          {
            id: '1',
            projectId: 'hev-25-fmc',
            projectCode: 'CN7I(AL23)_HEV_25FMC',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_01.png',
            channels: ['oneApp', 'oneWeb', 'inStore'],
            visitedAt: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
          },
          {
            id: '2',
            projectId: 'hev-25-fmc',
            projectCode: 'CN7I(AL23)_HEV_25FMC',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_02.png',
            channels: ['oneApp', 'ivi', 'legacyWeb'],
            visitedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1시간 전
          },
          {
            id: '3',
            projectId: 'hev-25-fmc',
            projectCode: 'CN7I(AL23)_HEV_25FMC',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_03.png',
            channels: ['oneApp', 'ivi'],
            visitedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
          },
          {
            id: '4',
            projectId: 'hev-26-my',
            projectCode: 'CN7I(AL23)_HEV_26MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_04.png',
            channels: ['oneWeb', 'ivi'],
            visitedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3시간 전
          },
          {
            id: '5',
            projectId: 'hev-26-my',
            projectCode: 'CN7I(AL23)_HEV_26MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_05.png',
            channels: ['oneApp', 'oneWeb'],
            visitedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5시간 전
          },
          {
            id: '6',
            projectId: 'ev6-26-my',
            projectCode: 'EV6_26MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_06.png',
            channels: ['oneWeb', 'ivi', 'inStore'],
            visitedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8시간 전
          },
          {
            id: '7',
            projectId: 'k8-25-my',
            projectCode: 'K8_25MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_07.jpg',
            channels: ['oneApp', 'legacyWeb'],
            visitedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12시간 전
          },
          {
            id: '8',
            projectId: 'gv80-26-my',
            projectCode: 'GV80_26MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_01.png',
            channels: ['oneApp', 'oneWeb', 'ivi'],
            visitedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
          },
          {
            id: '9',
            projectId: 'g90-25-my',
            projectCode: 'G90_25MY',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_02.png',
            channels: ['oneWeb', 'inStore'],
            visitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2일 전
          },
          {
            id: '10',
            projectId: 'ev6-25-fmc',
            projectCode: 'EV6_25FMC',
            contentType: 'Beauty Angle Cut',
            thumbnailUrl: '/images/car_03.png',
            channels: ['oneApp', 'ivi', 'oneWeb'],
            visitedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3일 전
          },
        ]
        setRecentContents(sampleData)
        localStorage.setItem('recently-visited-contents-v3', JSON.stringify(sampleData))
      }
    }

    const loadFavorites = () => {
      const saved = localStorage.getItem('content-favorites')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          const favoriteIds = new Set<string>(parsed.map((f: any) => f.id as string))
          setContentFavorites(favoriteIds)
        } catch (error) {
          console.error('Failed to parse content favorites:', error)
        }
      }
    }

    loadRecentContents()
    loadFavorites()
  }, [])

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) {
      return t('projectDetail.recentlyVisited.timeAgo.justNow')
    } else if (diffMins < 60) {
      return t('projectDetail.recentlyVisited.timeAgo.minutesAgo', { minutes: diffMins })
    } else if (diffHours < 24) {
      return t('projectDetail.recentlyVisited.timeAgo.hoursAgo', { hours: diffHours })
    } else {
      return t('projectDetail.recentlyVisited.timeAgo.daysAgo', { days: diffDays })
    }
  }

  const handleContentClick = (content: RecentlyVisitedContent) => {
    // 컨텐츠 상세 페이지로 이동
    navigate(`/project/${content.projectId}?contentId=${content.id}`)
  }

  const handleFavoriteToggle = (contentId: string, contentType: string) => {
    const content = recentContents.find(c => c.id === contentId)
    if (!content) return

    const saved = localStorage.getItem('content-favorites')
    let favorites = []
    if (saved) {
      try {
        favorites = JSON.parse(saved)
      } catch (error) {
        favorites = []
      }
    }

    const existingIndex = favorites.findIndex((f: any) => f.id === contentId)
    if (existingIndex >= 0) {
      // 제거
      favorites.splice(existingIndex, 1)
      setContentFavorites(prev => {
        const next = new Set(prev)
        next.delete(contentId)
        return next
      })
    } else {
      // 추가
      favorites.push({
        id: contentId,
        type: contentType,
        projectCode: content.projectCode,
        projectId: content.projectId,
      })
      setContentFavorites(prev => new Set([...prev, contentId]))
    }

    localStorage.setItem('content-favorites', JSON.stringify(favorites))
  }

  // 최근 방문한 컨텐츠가 없으면 렌더링하지 않음
  if (recentContents.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '12px',
        background: 'var(--surface_container_lowest)',
        border: '1px solid var(--outline)',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    >
      {/* 섹션 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Ic_time_bold size="16px" color="var(--primary)" />
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 700,
              lineHeight: '22px',
              color: 'var(--primary)',
            }}
          >
            {t('projectDetail.recentlyVisited.title')}
          </Typography>
        </Box>

        {/* 전체 보기 링크 */}
        <Box
          onClick={() => {
            // TODO: 전체 최근 방문 페이지로 이동 (구현 필요시)
            console.log('View all recently visited contents')
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: 'var(--on_surface_mid)',
            }}
          >
            {t('projectDetail.recentlyVisited.viewAll')}
          </Typography>
          <Ic_arrow_forward_regular size="16px" color="var(--on_surface_mid)" />
        </Box>
      </Box>

      {/* 컨텐츠 카드 리스트 */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          overflowY: 'visible',
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '12px',
          paddingRight: '12px',
          marginTop: '-12px',
          marginBottom: '-12px',
          marginLeft: '-12px',
          marginRight: '-12px',
          width: '100%',
          minWidth: 0,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {recentContents.map((content) => (
          <ContentCard
            key={content.id}
            data={{
              ...content,
              isFavorite: contentFavorites.has(content.id),
            }}
            timestamp={formatTimeAgo(content.visitedAt)}
            onFavoriteToggle={handleFavoriteToggle}
            onClick={() => handleContentClick(content)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default RecentlyVisitedContents
