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
} from '@hmg-fe/hmg-design-system/HmgIcon'
import { useAuth } from '@/contexts/AuthContext'
import { PermissionLevel } from '@/types/auth.types'
import ServiceSettingsDialog from './ServiceSettingsDialog'

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
}: SidebarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isCollapsed)
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)
  const [isServiceSettingsOpen, setIsServiceSettingsOpen] = useState(false)

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

  // 권한 레벨 체크 함수
  const isL1 = user?.permissionLevel === PermissionLevel.L1_ADMIN
  const isL2L3 =
    user?.permissionLevel === PermissionLevel.L2_SERVICE_MANAGER ||
    user?.permissionLevel === PermissionLevel.L3_BUSINESS_USER
  const isL4L5 =
    user?.permissionLevel === PermissionLevel.L4_3D_MODELER ||
    user?.permissionLevel === PermissionLevel.L5_CONTENT_CREATOR

  const handleMenuClick = (menu: string) => {
    onMenuChange(menu)
    if (menu === '프로젝트') {
      navigate('/project')
    } else if (menu === '컨텐츠 요청') {
      navigate('/content-request')
    }
  }

  return (
    <>
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
            width: 16,
            height: 16,
          }}
        >
          <Ic_menu_regular size="16px" color="#1E1E1E" />
        </Box>
        <Box
          component="img"
          src="/images/Hyundai_Motor_Group_CI_sidebar.svg"
          alt="Hyundai Motor Group"
          sx={{
            width: 90,
            height: 32,
            opacity: isSidebarCollapsed ? 0 : 1,
            transition: 'opacity 0.2s ease',
            pointerEvents: isSidebarCollapsed ? 'none' : 'auto',
          }}
        />
      </Box>

      {/* 메뉴 그룹 */}
      <Box sx={{ padding: isSidebarCollapsed ? '0 10px 8px 16px' : '0 16px 8px 16px', transition: 'padding 0.2s ease' }}>
        <Stack spacing={0}>
          {/* 프로젝트 - 모든 권한 */}
          <SidebarItem
            icon={<Ic_folder_filled size="16px" color={activeMenu === '프로젝트' ? '#111111' : 'var(--surface_high)'} />}
            label={t('common.menu.project')}
            isActive={activeMenu === '프로젝트'}
            collapsed={isSidebarCollapsed}
            onClick={() => handleMenuClick('프로젝트')}
          />
          {/* 컨텐츠 요청 - L1, L2, L3만 */}
          {(isL1 || isL2L3) && (
            <SidebarItem
              icon={<Ic_writing_filled size="16px" color={activeMenu === '컨텐츠 요청' ? '#111111' : 'var(--surface_high)'} />}
              label={t('common.menu.contentRequest')}
              isActive={activeMenu === '컨텐츠 요청'}
              collapsed={isSidebarCollapsed}
              onClick={() => handleMenuClick('컨텐츠 요청')}
            />
          )}
          {/* 다운로드 - L1, L4, L5만 */}
          {(isL1 || isL4L5) && (
            <SidebarItem
              icon={<Ic_download_regular size="16px" color={activeMenu === '다운로드' ? '#111111' : 'var(--surface_high)'} />}
              label="다운로드"
              isActive={activeMenu === '다운로드'}
              collapsed={isSidebarCollapsed}
              onClick={() => onMenuChange('다운로드')}
            />
          )}
          {/* 설정 - 모든 권한 */}
          <SidebarItem
            icon={<Ic_setting_filled size="16px" color="var(--surface_high)" />}
            label={t('common.menu.settings')}
            collapsed={isSidebarCollapsed}
            onClick={() => setIsServiceSettingsOpen(true)}
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
            {favorites.size === 0 ? (
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
              Array.from(favorites).map((id) => (
                <Box
                  key={id}
                  onClick={() => onProjectSelect && onProjectSelect(id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 16px',
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

    {/* 서비스 설정 다이얼로그 */}
    <ServiceSettingsDialog open={isServiceSettingsOpen} onClose={() => setIsServiceSettingsOpen(false)} />
    </>
  )
}

export default Sidebar
