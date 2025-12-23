import { useState } from 'react'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import {
  Ic_home_filled,
  Ic_file_regular,
  Ic_setting_regular,
  Ic_person_regular,
  Ic_alarm_regular,
  Ic_search_regular,
  Ic_plus_regular,
  Ic_arrow_right_regular,
  Ic_arrow_down_regular,
  Ic_star_filled,
  Ic_folder_regular,
  Ic_menu_regular,
} from '@hmg-fe/hmg-design-system/HmgIcon'

// 사이드바 메뉴 아이템 컴포넌트
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  badge?: number
  onClick?: () => void
}

function SidebarItem({ icon, label, isActive, badge, onClick }: SidebarItemProps) {
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
        '&:hover': {
          backgroundColor: isActive ? '#E9EAEC' : '#F5F5F5',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 24 }}>
        {icon}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: 14,
          fontWeight: 700,
          lineHeight: '22px',
          color: '#111111',
        }}
      >
        {label}
      </Typography>
      {badge !== undefined && badge > 0 && (
        <Box
          sx={{
            minWidth: 20,
            height: 20,
            padding: '0 6px',
            borderRadius: '10px',
            backgroundColor: '#CE302C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {badge}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

// 즐겨찾기 트리 아이템 컴포넌트
interface TreeItemProps {
  label: string
  isExpanded?: boolean
  hasChildren?: boolean
  level?: number
  onClick?: () => void
}

function TreeItem({ label, isExpanded, hasChildren, level = 0, onClick }: TreeItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        paddingLeft: `${12 + level * 16}px`,
        borderRadius: '6px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#F5F5F5',
        },
      }}
    >
      {hasChildren && (
        <Box sx={{ display: 'flex', alignItems: 'center', width: 16, height: 16 }}>
          {isExpanded ? (
            <Ic_arrow_down_regular size="14px" color="#6B6B6B" />
          ) : (
            <Ic_arrow_right_regular size="14px" color="#6B6B6B" />
          )}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 400,
          lineHeight: '22px',
          color: '#3B3B3B',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

// 사이드바 그룹 라벨 컴포넌트
interface SidebarGroupLabelProps {
  label: string
  count?: number
}

function SidebarGroupLabel({ label, count }: SidebarGroupLabelProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        marginBottom: '4px',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '18px',
          color: '#0A0A0A',
        }}
      >
        {label}
      </Typography>
      {count !== undefined && (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22px',
            color: '#111111',
          }}
        >
          {count}
        </Typography>
      )}
    </Box>
  )
}

// 테이블 데이터 타입
interface ProjectData {
  id: number
  thumbnail?: string
  brand: string
  projectCode: string
  projectType: string
  contentType: string
  contentTypeColor: string
  derivative: string
  modifiedDate: string
  sop: string
  targetChannel: string
  activeChannels: string[]
  manager: string
  comments: number
}

// 샘플 데이터
const sampleProjects: ProjectData[] = [
  {
    id: 1,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 2,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 3,
    brand: '현대자동차',
    projectCode: 'CN7_HEV_25',
    projectType: 'FMC',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 4,
    brand: '현대자동차',
    projectCode: 'DO 23_25',
    projectType: 'FMC',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: 'N Line',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '기존 홈페이지'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 5,
    brand: '현대자동차',
    projectCode: 'DO 23_25',
    projectType: 'MY',
    contentType: 'VCM',
    contentTypeColor: '#1967FF',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['IVI', '원웹'],
    manager: '박미현, 여하은',
    comments: 8,
  },
  {
    id: 6,
    brand: '현대자동차',
    projectCode: 'NE 25MY FMC',
    projectType: 'MY',
    contentType: 'Web CC',
    contentTypeColor: '#8333E6',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원웹'],
    manager: '박미현',
    comments: 8,
  },
  {
    id: 7,
    brand: '기아',
    projectCode: 'CN7_HEV_25',
    projectType: 'MY',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', 'IVI', '원웹'],
    manager: '박미현',
    comments: 0,
  },
  {
    id: 8,
    brand: '제네시스',
    projectCode: 'CN7_HEV_25_27',
    projectType: 'FMC',
    contentType: '2D 360',
    contentTypeColor: '#2C5A0C',
    derivative: '--',
    modifiedDate: 'YYYY-MM-DD',
    sop: '2025-12-16',
    targetChannel: 'WebCC',
    activeChannels: ['원앱', '원웹', 'In-Store'],
    manager: '박미현',
    comments: 0,
  },
]

function Project() {
  const [activeMenu, setActiveMenu] = useState('프로젝트')
  const [expandedFavorites, setExpandedFavorites] = useState(true)
  const [selectedTab, setSelectedTab] = useState('컨텐츠')
  const [selectedFilter, setSelectedFilter] = useState('전체 프로젝트')

  const tabs = ['컨텐츠', '데이터 프랩', 'Web CC', '2D 360', 'PI', '설정']

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#F5F5F5',
      }}
    >
      {/* 사이드바 */}
      <Box
        sx={{
          width: '280px',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #E9EAEC',
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid #E9EAEC',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              lineHeight: '26px',
              color: '#0A0A0A',
            }}
          >
            HMG System
          </Typography>
          <Box sx={{ cursor: 'pointer' }}>
            <Ic_menu_regular size="20px" color="#1E1E1E" />
          </Box>
        </Box>

        {/* 메뉴 그룹 1 - 프로젝트 및 컨텐츠 */}
        <Box sx={{ padding: '0 16px', paddingTop: '0', paddingBottom: '8px' }}>
          <SidebarGroupLabel label="프로젝트 및 컨텐츠" count={720} />
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_home_filled size="16px" color="#111111" />}
              label="프로젝트"
              isActive={activeMenu === '프로젝트'}
              onClick={() => setActiveMenu('프로젝트')}
            />
            <SidebarItem
              icon={<Ic_file_regular size="16px" color="#6B6B6B" />}
              label="컨텐츠 요청"
              onClick={() => setActiveMenu('컨텐츠 요청')}
            />
            <SidebarItem
              icon={<Ic_folder_regular size="16px" color="#6B6B6B" />}
              label="프로젝트 관리"
              onClick={() => setActiveMenu('프로젝트 관리')}
            />
            <SidebarItem
              icon={<Ic_setting_regular size="16px" color="#6B6B6B" />}
              label="어드민"
              onClick={() => setActiveMenu('어드민')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: '0 16px' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 메뉴 그룹 2 */}
        <Box sx={{ padding: '8px 16px' }}>
          <SidebarGroupLabel label="프로젝트 및 컨텐츠" />
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_person_regular size="16px" color="#6B6B6B" />}
              label="내 프로필"
              onClick={() => setActiveMenu('내 프로필')}
            />
            <SidebarItem
              icon={<Ic_alarm_regular size="16px" color="#6B6B6B" />}
              label="알림"
              badge={14}
              onClick={() => setActiveMenu('알림')}
            />
            <SidebarItem
              icon={<Ic_search_regular size="16px" color="#6B6B6B" />}
              label="검색"
              onClick={() => setActiveMenu('검색')}
            />
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: '0 16px' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 즐겨찾기 섹션 */}
        <Box sx={{ flex: 1, padding: '8px 16px', overflowY: 'auto' }}>
          <SidebarGroupLabel label="프로젝트 및 컨텐츠" />
          <Stack spacing={0}>
            <Box
              onClick={() => setExpandedFavorites(!expandedFavorites)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#F5F5F5' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: 16, height: 16 }}>
                {expandedFavorites ? (
                  <Ic_arrow_down_regular size="14px" color="#6B6B6B" />
                ) : (
                  <Ic_arrow_right_regular size="14px" color="#6B6B6B" />
                )}
              </Box>
              <Ic_star_filled size="16px" color="#6B6B6B" />
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>
                즐겨찾기
              </Typography>
            </Box>
            {expandedFavorites && (
              <Stack spacing={0} sx={{ marginLeft: '8px' }}>
                <TreeItem label="26MY FMC" level={1} />
                <TreeItem label="27MY FMC" level={1} />
                <TreeItem label="28MY FMC" level={1} />
                <TreeItem label="29MY FMC" level={1} />
                <TreeItem label="29MY FMC Web CC" level={1} />
                <TreeItem label="29MY FMC VCM" level={1} />
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          paddingRight: '20px',
          gap: '10px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* 헤더 영역 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px',
              borderBottom: '1px solid #E9EAEC',
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 700,
                lineHeight: '32px',
                color: '#0A0A0A',
              }}
            >
              프로젝트
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                hdsProps={{ size: 'medium', type: 'outline' }}
                startIcon={<Ic_plus_regular size="16px" />}
              >
                컨텐츠 추가하기
              </Button>
              <Button
                hdsProps={{ size: 'medium', style: 'primary', type: 'fill' }}
                startIcon={<Ic_plus_regular size="16px" />}
              >
                프로젝트 추가하기
              </Button>
            </Stack>
          </Box>

          {/* 메인 영역 */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* 좌측 패널 - 프로젝트 상세 */}
            <Box
              sx={{
                width: '320px',
                borderRight: '1px solid #E9EAEC',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
              }}
            >
              {/* 프로젝트 정보 */}
              <Box sx={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                {/* 브레드크럼 */}
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', marginBottom: '16px' }}>
                  <Typography sx={{ fontSize: 14, color: '#949494' }}>전체</Typography>
                  <Ic_arrow_right_regular size="14px" color="#949494" />
                  <Typography sx={{ fontSize: 14, color: '#949494' }}>현대자동차</Typography>
                </Stack>

                {/* 프로젝트 제목 */}
                <Stack spacing={0.5} sx={{ marginBottom: '24px' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>
                    CN7(0A 25)
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>
                    HEV_25_FMC
                  </Typography>
                </Stack>

                {/* 탭 */}
                <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {tabs.map((tab) => (
                    <Box
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      sx={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: selectedTab === tab ? '#F5F5F5' : 'transparent',
                        '&:hover': {
                          backgroundColor: '#F5F5F5',
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: selectedTab === tab ? '#111111' : '#6B6B6B',
                        }}
                      >
                        {tab}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* 하단 필터 */}
              <Box sx={{ padding: '20px 24px', borderTop: '1px solid #E9EAEC' }}>
                <Stack spacing={1}>
                  <Box
                    onClick={() => setSelectedFilter('전체 프로젝트')}
                    sx={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: selectedFilter === '전체 프로젝트' ? '#F5F5F5' : 'transparent',
                    }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#111111' }}>
                      전체 프로젝트 (20)
                    </Typography>
                  </Box>
                  <Box
                    onClick={() => setSelectedFilter('프로젝트')}
                    sx={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: selectedFilter === '프로젝트' ? '#F5F5F5' : 'transparent',
                    }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#3B3B3B' }}>
                      프로젝트 (14)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* 우측 패널 - 테이블 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* 테이블 헤더 영역 */}
              <Box sx={{ padding: '20px 24px' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Button hdsProps={{ size: 'small', type: 'outline' }}>필터</Button>
                  <TextField
                    hdsProps={{ size: 'small' }}
                    placeholder="검색"
                    sx={{ width: '200px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Ic_search_regular size="16px" color="#949494" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>

              {/* 테이블 */}
              <Box sx={{ flex: 1, overflow: 'auto', padding: '0 24px' }}>
                <Box
                  component="table"
                  sx={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    '& th, & td': {
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: '1px solid #E9EAEC',
                      fontSize: 14,
                    },
                    '& th': {
                      fontWeight: 700,
                      color: '#111111',
                      backgroundColor: '#F9FAFB',
                      position: 'sticky',
                      top: 0,
                    },
                    '& td': {
                      fontWeight: 400,
                      color: '#111111',
                    },
                  }}
                >
                  <thead>
                    <tr>
                      <th>썸네일</th>
                      <th>브랜드</th>
                      <th>프로젝트 코드</th>
                      <th>프로젝트 유형</th>
                      <th>컨텐츠 유형</th>
                      <th>파생 상품</th>
                      <th>최근 수정일시</th>
                      <th>SOP</th>
                      <th>대상 채널</th>
                      <th>활성 채널</th>
                      <th>담당자</th>
                      <th>코멘트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleProjects.map((project) => (
                      <tr key={project.id}>
                        <td>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              backgroundColor: '#F5F5F5',
                              borderRadius: '4px',
                            }}
                          />
                        </td>
                        <td>{project.brand}</td>
                        <td>{project.projectCode}</td>
                        <td>
                          <Box
                            sx={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#F5F5F5',
                              fontSize: 12,
                            }}
                          >
                            {project.projectType}
                          </Box>
                        </td>
                        <td>
                          <Box
                            sx={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: `${project.contentTypeColor}15`,
                              color: project.contentTypeColor,
                              fontSize: 12,
                            }}
                          >
                            {project.contentType}
                          </Box>
                        </td>
                        <td>{project.derivative}</td>
                        <td>{project.modifiedDate}</td>
                        <td>{project.sop}</td>
                        <td>{project.targetChannel}</td>
                        <td>
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                            {project.activeChannels.map((channel, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: '#F5F5F5',
                                  fontSize: 12,
                                }}
                              >
                                {channel}
                              </Box>
                            ))}
                          </Stack>
                        </td>
                        <td>{project.manager}</td>
                        <td>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: 24,
                              height: 20,
                              padding: '0 6px',
                              borderRadius: '10px',
                              backgroundColor: project.comments > 0 ? '#111111' : '#E9EAEC',
                              color: project.comments > 0 ? '#fff' : '#69696E',
                              fontSize: 12,
                            }}
                          >
                            {project.comments}
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>

              {/* 페이지네이션 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '16px 24px',
                  borderTop: '1px solid #E9EAEC',
                  gap: '16px',
                }}
              >
                <Typography sx={{ fontSize: 14, color: '#111111' }}>Rows per page</Typography>
                <Typography sx={{ fontSize: 14, color: '#111111' }}>1-10/100</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Project
