import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import { Badge } from '@hmg-fe/hmg-design-system'
import {
  Ic_folder_filled,
  Ic_writing_filled,
  Ic_person_filled,
  Ic_alarm_filled,
  Ic_setting_filled,
  Ic_menu_regular,
  Ic_arrow_forward_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

// 사이드바 메뉴 아이템 컴포넌트
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  badge?: number
  collapsed?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, isActive, badge, collapsed, onClick }: SidebarItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: collapsed ? '10px 10px 10px 16px' : '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#E9EAEC' : 'transparent',
        transition: 'padding 0.2s ease',
        overflow: 'hidden',
        width: collapsed ? '46px' : 'auto',
        '&:hover': {
          backgroundColor: isActive ? '#E9EAEC' : '#EEEEEE',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 24, flexShrink: 0 }}>
        {icon}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: 15,
          fontWeight: 700,
          lineHeight: '22px',
          color: isActive ? '#111111' : 'var(--on_surface_high)',
          whiteSpace: 'nowrap',
          opacity: collapsed ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {label}
      </Typography>
      {badge !== undefined && badge > 0 && (
        <Box
          sx={{
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          <Badge hdsProps={{ size: 'small', style: 'error', isDigit: true }}>{badge}</Badge>
        </Box>
      )}
    </Box>
  )
}

interface SidebarProps {
  activeMenu: string
  onMenuChange: (menu: string) => void
  onSettingsOpen: () => void
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

function Sidebar({ activeMenu, onMenuChange, onSettingsOpen, isCollapsed = false, onCollapsedChange }: SidebarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isCollapsed)
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)

  // localStorage에서 즐겨찾기 읽기
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('project-favorites')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return ['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my']
      }
    }
    return ['hev-26-my', 'hev-27-my', 'ev6-26-my', 'ev6-27-my', 'gv80-26-my', 'g90-25-my']
  })

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('project-favorites')
      if (saved) {
        try {
          setFavorites(JSON.parse(saved))
        } catch {
          // 파싱 오류 시 무시
        }
      }
    }

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange)

    // 같은 페이지 내에서의 변경도 감지하기 위한 interval
    const interval = setInterval(() => {
      handleStorageChange()
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // 외부에서 collapsed 상태가 변경되면 동기화
  useEffect(() => {
    setIsSidebarCollapsed(isCollapsed)
  }, [isCollapsed])

  // collapsed 상태가 변경되면 부모에게 알림
  const handleCollapsedChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed)
    if (onCollapsedChange) {
      onCollapsedChange(collapsed)
    }
  }

  // 사이드바 접힐 때 즐겨찾기도 접기
  useEffect(() => {
    if (isSidebarCollapsed) {
      setIsFavoritesExpanded(false)
    }
  }, [isSidebarCollapsed])

  const handleMenuClick = (menu: string) => {
    onMenuChange(menu)
    if (menu === '프로젝트') {
      navigate('/project')
    } else if (menu === '컨텐츠 요청') {
      navigate('/content-request')
    }
  }

  // 프로젝트 이름 매핑 (임시 데이터)
  const projectNames: Record<string, string> = {
    'hev-26-my': 'HEV_26_MY',
    'hev-27-my': 'HEV_27_MY',
    'ev6-26-my': 'EV6_26_MY',
    'ev6-27-my': 'EV6_27_MY',
    'gv80-26-my': 'GV80_26_MY',
    'g90-25-my': 'G90_25_MY',
  }

  return (
    <Box
      sx={{
        width: isSidebarCollapsed ? '72px' : '260px',
        height: '100%',
        backgroundColor: 'var(--surface_container_lowest)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: isSidebarCollapsed ? '24px 16px 24px 32px' : '24px 24px 24px 32px',
          transition: 'padding 0.2s ease',
        }}
      >
        <Box
          onClick={() => handleCollapsedChange(!isSidebarCollapsed)}
          sx={{
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 24,
          }}
        >
          <Ic_menu_regular size="20px" color="#1E1E1E" />
        </Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            lineHeight: '26px',
            color: '#0A0A0A',
            opacity: isSidebarCollapsed ? 0 : 1,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            pointerEvents: isSidebarCollapsed ? 'none' : 'auto',
          }}
        >
          {t('project.sidebar.hmgSystem')}
        </Typography>
      </Box>

      {/* 메뉴 그룹 1 - 프로젝트 및 컨텐츠 */}
      <Box sx={{ padding: isSidebarCollapsed ? '0 10px 8px 16px' : '0 16px 8px 16px', transition: 'padding 0.2s ease' }}>
        <Stack spacing={0}>
          <SidebarItem
            icon={<Ic_folder_filled size="20px" color={activeMenu === '프로젝트' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.project')}
            isActive={activeMenu === '프로젝트'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('프로젝트')}
          />
          <SidebarItem
            icon={<Ic_writing_filled size="20px" color={activeMenu === '컨텐츠 요청' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.contentRequest')}
            isActive={activeMenu === '컨텐츠 요청'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('컨텐츠 요청')}
          />
          <SidebarItem
            icon={<Ic_person_filled size="20px" color={activeMenu === '어드민' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.admin')}
            isActive={activeMenu === '어드민'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('어드민')}
          />
        </Stack>
      </Box>

      {/* 구분선 */}
      <Box sx={{ padding: isSidebarCollapsed ? '0 10px 0 16px' : '0 16px', transition: 'padding 0.2s ease' }}>
        <Divider hdsProps={{ style: 'lowest' }} />
      </Box>

      {/* 메뉴 그룹 2 */}
      <Box sx={{ padding: isSidebarCollapsed ? '8px 10px 8px 16px' : '8px 16px', transition: 'padding 0.2s ease' }}>
        <Stack spacing={0}>
          <SidebarItem
            icon={<Ic_setting_filled size="20px" color="var(--surface_high)" />}
            label={t('common.menu.settings')}
            collapsed={isSidebarCollapsed}
            onClick={onSettingsOpen}
          />
          <SidebarItem
            icon={<Ic_alarm_filled size="20px" color="var(--surface_high)" />}
            label={t('common.menu.notification')}
            badge={14}
            collapsed={isSidebarCollapsed}
            onClick={() => onMenuChange('알림')}
          />
        </Stack>
      </Box>

      {/* 구분선 */}
      <Box sx={{ padding: isSidebarCollapsed ? '0 10px 0 16px' : '0 16px', transition: 'padding 0.2s ease' }}>
        <Divider hdsProps={{ style: 'lowest' }} />
      </Box>

      {/* 즐겨찾기 섹션 */}
      <Box
        sx={{
          flex: 1,
          padding: '8px 16px',
          overflowY: 'auto',
          opacity: isSidebarCollapsed ? 0 : 1,
          visibility: isSidebarCollapsed ? 'hidden' : 'visible',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      >
        <Box
          onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 24,
              transition: 'transform 0.2s ease',
              transform: isFavoritesExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <Ic_arrow_forward_regular size="20px" color="var(--surface_high)" />
          </Box>
          <Typography
            sx={{
              flex: 1,
              fontSize: 15,
              fontWeight: 700,
              lineHeight: '22px',
              color: 'var(--on_surface_high)',
              whiteSpace: 'nowrap',
            }}
          >
            {t('common.menu.favorites')}
          </Typography>
        </Box>
        {isFavoritesExpanded && (
          <Stack spacing={0} sx={{ paddingLeft: '18px', position: 'relative' }}>
            {favorites.length === 0 ? (
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'var(--on_surface_mid)',
                  padding: '8px 16px',
                }}
              >
                즐겨찾기가 없습니다
              </Typography>
            ) : (
              favorites.map((id) => (
                <Box
                  key={id}
                  onClick={() => {
                    onMenuChange('프로젝트')
                    navigate(`/project?selected=${id}`)
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    paddingLeft: '24px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '8px',
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      backgroundColor: 'var(--outline_lowest)',
                    },
                    '&:hover': {
                      '& .favorite-label': {
                        color: '#111111',
                        fontWeight: 700,
                      },
                    },
                  }}
                >
                  <Typography
                    className="favorite-label"
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: '22px',
                      color: 'var(--on_surface_highest)',
                      transition: 'color 0.15s ease, font-weight 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {projectNames[id] || id}
                  </Typography>
                </Box>
              ))
            )}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
