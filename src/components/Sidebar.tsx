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
  Ic_download_regular,
  Ic_setting_filled,
  Ic_menu_regular,
  Ic_arrow_forward_regular,
  Ic_picture_filled,
} from '@hmg-fe/hmg-design-system/HmgIcon'
import ServiceSettingsDialog from './ServiceSettingsDialog'
import hmgLogo from '/images/Hyundai_Motor_Group_CI_sidebar.svg'

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
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#E9EAEC' : 'transparent',
        transition: 'background-color 0.2s ease',
        overflow: 'hidden',
        justifyContent: 'flex-start',
        height: '42px',
        boxSizing: 'border-box',
        '&:hover': {
          backgroundColor: isActive ? '#E9EAEC' : '#EEEEEE',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, flexShrink: 0 }}>
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
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  selectedProject?: string
  onProjectSelect?: (projectId: string) => void
  favorites?: Set<string>
  projectNames?: Record<string, string>
  contentFavorites?: Array<{
    id: string
    type: string
    projectCode: string
    projectId: string
  }>
  onContentSelect?: (projectId: string, contentId: string) => void
}

function Sidebar({
  activeMenu,
  onMenuChange,
  isCollapsed = false,
  onCollapsedChange,
  selectedProject,
  onProjectSelect,
  favorites = new Set<string>(),
  projectNames = {},
  contentFavorites = [
    {
      id: 'hev-25-fmc-beauty-angle-cut-1',
      type: 'Beauty Angle Cut',
      projectCode: 'CN7I(AL23)_HEV_25FMC',
      projectId: 'hev-25-fmc',
    },
    {
      id: 'hev-26-my-beauty-angle-cut-2',
      type: 'Beauty Angle Cut',
      projectCode: 'CN7I(AL23)_HEV_26MY',
      projectId: 'hev-26-my',
    },
    {
      id: 'gv80-26-my-beauty-angle-cut-3',
      type: 'Beauty Angle Cut',
      projectCode: 'GV80_26MY',
      projectId: 'gv80-26-my',
    },
  ],
  onContentSelect,
}: SidebarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // 사용자가 수동으로 토글했는지 추적 (localStorage에 저장하여 페이지 이동 시에도 유지)
  const [userManuallyToggled, setUserManuallyToggled] = useState(() => {
    const isNarrowScreen = window.innerWidth <= 1280
    if (!isNarrowScreen) return false // 넓은 화면에서는 수동 토글 플래그 불필요

    const saved = localStorage.getItem('sidebar-manual-toggle-narrow')
    return saved === 'true'
  })

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const isNarrowScreen = window.innerWidth <= 1280

    if (isNarrowScreen) {
      // 좁은 화면: localStorage에서 사용자 설정 확인
      const manuallyToggled = localStorage.getItem('sidebar-manual-toggle-narrow') === 'true'
      const savedState = localStorage.getItem('sidebar-collapsed-narrow')

      if (manuallyToggled && savedState !== null) {
        // 사용자가 수동으로 설정한 상태가 있으면 복원
        return savedState === 'true'
      }
      // 기본값: 좁은 화면에서는 접힌 상태
      return true
    }

    // 넓은 화면: 외부 prop 사용
    return isCollapsed
  })

  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)
  const [isServiceSettingsOpen, setIsServiceSettingsOpen] = useState(false)

  // 화면 너비 변경 감지 - 1280px 경계를 넘을 때만 자동 접기
  useEffect(() => {
    let previousWidth = window.innerWidth

    const handleResize = () => {
      const currentWidth = window.innerWidth
      const wasNarrow = previousWidth <= 1280
      const isNarrow = currentWidth <= 1280

      // 1280px 경계를 넘었을 때만 자동으로 상태 변경
      if (!wasNarrow && isNarrow) {
        // 넓은 화면 → 좁은 화면: 자동으로 접기
        setIsSidebarCollapsed(true)
        setUserManuallyToggled(false) // 자동 접기이므로 수동 토글 플래그 리셋
        localStorage.removeItem('sidebar-manual-toggle-narrow')
        localStorage.removeItem('sidebar-collapsed-narrow')
        if (onCollapsedChange) {
          onCollapsedChange(true)
        }
      } else if (wasNarrow && !isNarrow && !userManuallyToggled) {
        // 좁은 화면 → 넓은 화면: 사용자가 수동으로 토글하지 않았다면 자동으로 펼치기
        setIsSidebarCollapsed(false)
        localStorage.removeItem('sidebar-manual-toggle-narrow')
        localStorage.removeItem('sidebar-collapsed-narrow')
        if (onCollapsedChange) {
          onCollapsedChange(false)
        }
      }

      previousWidth = currentWidth
    }

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onCollapsedChange, userManuallyToggled])

  // 외부에서 collapsed 상태가 변경되면 동기화
  useEffect(() => {
    const isNarrowScreen = window.innerWidth <= 1280

    // 좁은 화면에서 사용자가 수동으로 토글했다면 외부 prop 완전히 무시
    if (isNarrowScreen && userManuallyToggled) {
      return
    }

    // 넓은 화면에서는 항상 외부 prop 동기화
    if (!isNarrowScreen) {
      setIsSidebarCollapsed(isCollapsed)
    }
  }, [isCollapsed, userManuallyToggled])

  // 사용자가 수동으로 collapsed 상태를 변경할 때
  const handleCollapsedChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed)

    const isNarrowScreen = window.innerWidth <= 1280

    // 1280px 이하 화면에서 수동 토글한 경우 localStorage에 저장
    if (isNarrowScreen) {
      setUserManuallyToggled(true)
      localStorage.setItem('sidebar-manual-toggle-narrow', 'true')
      localStorage.setItem('sidebar-collapsed-narrow', collapsed.toString())
    } else {
      // 넓은 화면에서는 수동 토글 플래그와 저장 상태 제거
      setUserManuallyToggled(false)
      localStorage.removeItem('sidebar-manual-toggle-narrow')
      localStorage.removeItem('sidebar-collapsed-narrow')
    }

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
    } else if (menu === '다운로드') {
      navigate('/download')
    }
  }

  return (
    <>
      <Box
        sx={{
          width: isSidebarCollapsed ? '78px' : '260px',
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
            width: 16,
            height: 16,
          }}
        >
          <Ic_menu_regular size="16px" color="#1E1E1E" />
        </Box>
        <Box
          component="img"
          src={hmgLogo}
          alt="Hyundai Motor Group"
          loading="eager"
          onClick={() => {
            onMenuChange('프로젝트')
            navigate('/project')
          }}
          sx={{
            width: 90,
            height: 32,
            opacity: isSidebarCollapsed ? 0 : 1,
            transition: 'opacity 0.2s ease',
            pointerEvents: isSidebarCollapsed ? 'none' : 'auto',
            cursor: 'pointer',
            willChange: 'opacity',
          }}
        />
      </Box>

      {/* 메뉴 그룹 */}
      <Box sx={{ padding: '0 16px 8px 16px', transition: 'padding 0.2s ease' }}>
        <Stack spacing={0}>
          {/* 프로젝트 */}
          <SidebarItem
            icon={<Ic_folder_filled size="16px" color={activeMenu === '프로젝트' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.project')}
            isActive={activeMenu === '프로젝트'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('프로젝트')}
          />
          {/* 컨텐츠 요청 */}
          <SidebarItem
            icon={<Ic_writing_filled size="16px" color={activeMenu === '컨텐츠 요청' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.contentRequest')}
            isActive={activeMenu === '컨텐츠 요청'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('컨텐츠 요청')}
          />
          {/* 다운로드 */}
          <SidebarItem
            icon={<Ic_download_regular size="16px" color={activeMenu === '다운로드' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.download')}
            isActive={activeMenu === '다운로드'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('다운로드')}
          />
          {/* 설정 */}
          <SidebarItem
            icon={<Ic_setting_filled size="16px" color="var(--surface_high)" />}
            label={t('common.menu.settings')}
            collapsed={isSidebarCollapsed}
            onClick={() => setIsServiceSettingsOpen(true)}
          />
        </Stack>
      </Box>

      {/* 구분선 */}
      <Box sx={{ padding: '0 16px', transition: 'padding 0.2s ease' }}>
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
              width: 16,
              height: 16,
              transition: 'transform 0.2s ease',
              transform: isFavoritesExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <Ic_arrow_forward_regular size="16px" color="var(--surface_high)" />
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
          <Stack spacing={0}>
            {favorites.size === 0 && contentFavorites.length === 0 ? (
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'var(--on_surface_mid)',
                  padding: '8px 16px',
                }}
              >
                {t('common.menu.noFavorites')}
              </Typography>
            ) : (
              <>
                {/* 프로젝트 즐겨찾기 */}
                {Array.from(favorites).map((id) => (
                  <Box
                    key={id}
                    onClick={() => {
                      // 프로젝트 상세 페이지로 이동
                      navigate(`/project/${id}`)
                      // 콜백이 있으면 함께 호출
                      if (onProjectSelect) {
                        onProjectSelect(id)
                      }
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '& .favorite-label': {
                          color: '#111111',
                          fontWeight: 700,
                        },
                      },
                    }}
                  >
                    {/* 아이콘 컨테이너 */}
                    <Box
                      sx={{
                        width: '18px',
                        height: '18px',
                        backgroundColor: '#111111',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        '& svg': {
                          width: '12px !important',
                          height: '12px !important',
                        },
                      }}
                    >
                      <Ic_folder_filled size="12px" color="#FFFFFF" />
                    </Box>
                    <Typography
                      className="favorite-label"
                      sx={{
                        fontSize: 15,
                        fontWeight: selectedProject === id ? 700 : 500,
                        lineHeight: '22px',
                        color: selectedProject === id ? '#000000' : 'var(--on_surface_highest)',
                        transition: 'color 0.15s ease, font-weight 0.15s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {projectNames[id] || id}
                    </Typography>
                  </Box>
                ))}
                {/* 컨텐츠 즐겨찾기 */}
                {contentFavorites.map((content) => (
                  <Box
                    key={content.id}
                    onClick={() => {
                      // 컨텐츠 상세 페이지로 이동
                      navigate(`/project/${content.projectId}/content/${content.id}`)
                      // 콜백이 있으면 함께 호출
                      if (onContentSelect) {
                        onContentSelect(content.projectId, content.id)
                      }
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        '& .favorite-label': {
                          color: '#111111',
                          fontWeight: 700,
                        },
                      },
                    }}
                  >
                    {/* 아이콘 컨테이너 - 보라색 배경 */}
                    <Box
                      sx={{
                        width: '18px',
                        height: '18px',
                        backgroundColor: 'rgba(233, 221, 248, 1)',
                        borderRadius: '4px',
                        border: '1px solid rgba(0, 0, 0, 0.04)',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        '& svg': {
                          width: '12px !important',
                          height: '12px !important',
                        },
                      }}
                    >
                      <Ic_picture_filled size="12px" color="#8333E6" />
                    </Box>
                    <Typography
                      className="favorite-label"
                      sx={{
                        fontSize: 15,
                        fontWeight: 500,
                        lineHeight: '22px',
                        color: 'var(--on_surface_highest)',
                        transition: 'color 0.15s ease, font-weight 0.15s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      [{content.type}] {content.projectCode}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Stack>
        )}
      </Box>
    </Box>

    {/* 서비스 설정 다이얼로그 */}
    <ServiceSettingsDialog open={isServiceSettingsOpen} onClose={() => setIsServiceSettingsOpen(false)} />
    </>
  )
}

export default Sidebar
