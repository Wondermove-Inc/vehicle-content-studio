import { useState } from 'react'
import Box from '@hmg-fe/hmg-design-system/Box'
import Stack from '@hmg-fe/hmg-design-system/Stack'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import TextField from '@hmg-fe/hmg-design-system/TextField'
import InputAdornment from '@hmg-fe/hmg-design-system/InputAdornment'
import Divider from '@hmg-fe/hmg-design-system/Divider'
import Tabs from '@hmg-fe/hmg-design-system/Tabs'
import Tab from '@hmg-fe/hmg-design-system/Tab'
import Select from '@hmg-fe/hmg-design-system/Select'
import MenuItem from '@hmg-fe/hmg-design-system/MenuItem'
import { SimpleTreeView, TreeItem } from '@hmg-fe/hmg-design-system'
import {
  Ic_home_filled,
  Ic_file_regular,
  Ic_setting_regular,
  Ic_person_regular,
  Ic_alarm_regular,
  Ic_search_regular,
  Ic_plus_regular,
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
  const [activeTab, setActiveTab] = useState('컨텐츠')
  const [contentType, setContentType] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>('all')

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
          width: '260px',
          height: '100%',
          backgroundColor: 'var(--surface_container_lowest)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
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
          <Stack spacing={0}>
            <SidebarItem
              icon={<Ic_home_filled size="16px" color="#111111" />}
              label="프로젝트"
              isActive={true}
              onClick={() => setActiveMenu('프로젝트')}
            />
            <SidebarItem
              icon={<Ic_file_regular size="16px" color="#6B6B6B" />}
              label="컨텐츠 요청"
              onClick={() => setActiveMenu('컨텐츠 요청')}
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
          </Stack>
        </Box>

        {/* 구분선 */}
        <Box sx={{ padding: '0 16px' }}>
          <Divider hdsProps={{ style: 'lowest' }} />
        </Box>

        {/* 즐겨찾기 섹션 */}
        <Box sx={{ flex: 1, padding: '8px 16px', overflowY: 'auto' }}>
          <SimpleTreeView
            hdsProps={{ size: 'medium', type: 'line' }}
            defaultExpandedItems={['favorites']}
          >
            <TreeItem itemId="favorites" label="즐겨찾기" hdsProps={{ type: 'default' }}>
              <TreeItem itemId="fav-1" label="26MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-2" label="27MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-3" label="28MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-4" label="29MY FMC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-5" label="29MY FMC Web CC" hdsProps={{ type: 'default' }} />
              <TreeItem itemId="fav-6" label="29MY FMC VCM" hdsProps={{ type: 'default' }} />
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: 'calc(100% - 260px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 16px 16px 0',
          gap: '10px',
          overflow: 'visible',
          backgroundColor: 'var(--surface_container_lowest)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            minWidth: 0,
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.02)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 헤더 영역 */}
          <Box
            sx={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
              padding: '24px 24px 16px',
              borderBottom: '1px solid var(--outline)',
              flexShrink: 0,
            }}
          >
            {/* 첫 번째 행: 제목 + 버튼 */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: '36px',
                  color: '#0A0A0A',
                }}
              >
                프로젝트
              </Typography>
              <Button
                hdsProps={{ size: 'medium', style: 'strong', type: 'fill', icon: <Ic_plus_regular size="16px" color="#fff" /> }}
                sx={{
                  flexShrink: 0,
                }}
              >
                프로젝트 추가하기
              </Button>
            </Box>
          </Box>

          {/* 메인 영역 */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* 좌측 패널 - 프로젝트 트리 */}
            <Box
              sx={{
                width: '260px',
                borderRight: '1px solid var(--outline)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                backgroundColor: '#fff',
              }}
            >
              {/* 검색 필드 + 트리 영역 */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  padding: '16px 24px',
                  overflowY: 'auto',
                }}
              >
                {/* 검색 필드 */}
                <TextField
                  hdsProps={{ size: 'medium' }}
                  placeholder="프로젝트 검색"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Ic_search_regular size="16px" color="#949494" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* 프로젝트 트리 */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* 전체 프로젝트 */}
                  <Box
                    onClick={() => setSelectedProject('all')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '38px',
                      padding: '0 10px',
                      backgroundColor: selectedProject === 'all' ? '#F5F5F5' : 'transparent',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: selectedProject === 'all' ? '#F5F5F5' : '#FAFAFA',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: '22px',
                        color: '#111111',
                      }}
                    >
                      전체 프로젝트 (20)
                    </Typography>
                  </Box>

                  {/* 트리 뷰 */}
                  <SimpleTreeView
                    hdsProps={{ size: 'medium', type: 'line' }}
                    defaultExpandedItems={['hyundai', 'cn7-0a25', 'cn7-oa22', 'kia', 'ev6-25', 'k8-24', 'genesis', 'gv80-25', 'g90-24']}
                    selectedItems={selectedProject === 'all' ? '' : (selectedProject || '')}
                    onSelectedItemsChange={(_, itemId) => {
                      if (itemId) {
                        const id = itemId as string
                        // 2뎁스 아이템은 선택하지 않고 부모(1뎁스)를 선택
                        const depth2Items = ['cn7-0a25', 'cn7-oa22', 'ev6-25', 'k8-24', 'gv80-25', 'g90-24']
                        if (depth2Items.includes(id)) {
                          // 부모 찾기
                          if (id.startsWith('cn7')) setSelectedProject('hyundai')
                          else if (id.startsWith('ev6') || id.startsWith('k8')) setSelectedProject('kia')
                          else if (id.startsWith('gv80') || id.startsWith('g90')) setSelectedProject('genesis')
                        } else {
                          setSelectedProject(id)
                        }
                      }
                    }}
                    sx={{
                      '& .MuiTreeItem-content': {
                        height: '34px',
                        minHeight: '34px',
                        alignItems: 'center',
                      },
                      '& .MuiTreeItem-group': {
                        marginLeft: '12px',
                      },
                      '& .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-root .MuiTreeItem-label': {
                        marginLeft: '12px',
                      },
                    }}
                  >
                    <TreeItem itemId="hyundai" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>현대자동차 (2)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="cn7-0a25" label="CN7 (6)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="hev-27-my" label="HEV_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="hev-26-my" label="HEV_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="hev-25-fmc" label="HEV_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="cn7-oa22" label="CN7 (3)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="ice-24-my" label="ICE_24_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ice-23-my" label="ICE_23_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ice-22-fl" label="ICE_22_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="kia" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>기아 (8)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="ev6-25" label="EV6 (4)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="ev6-27-my" label="EV6_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ev6-26-my" label="EV6_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="ev6-25-fmc" label="EV6_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="k8-24" label="K8 (4)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="k8-26-my" label="K8_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="k8-25-my" label="K8_25_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="k8-24-fl" label="K8_24_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem itemId="genesis" label={<Typography sx={{ fontSize: 15, fontWeight: 700, lineHeight: '22px', color: '#111111' }}>제네시스 (10)</Typography>} hdsProps={{ type: 'default' }}>
                      <TreeItem itemId="gv80-25" label="GV80 (5)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="gv80-27-my" label="GV80_27_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="gv80-26-my" label="GV80_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="gv80-25-fmc" label="GV80_25_FMC" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                      <TreeItem itemId="g90-24" label="G90 (5)" hdsProps={{ type: 'default' }}>
                        <TreeItem itemId="g90-26-my" label="G90_26_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="g90-25-my" label="G90_25_MY" hdsProps={{ type: 'default' }} />
                        <TreeItem itemId="g90-24-fl" label="G90_24_FL" hdsProps={{ type: 'default' }} />
                      </TreeItem>
                    </TreeItem>
                  </SimpleTreeView>
                </Box>
              </Box>
            </Box>

            {/* 우측 패널 - 테이블 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* 테이블 헤더 영역 - 탭 구조 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 24px 0',
                  gap: '8px',
                }}
              >
                {/* 좌측: 탭 */}
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  hdsProps={{ size: 'medium', type: 'line' }}
                  sx={{
                    borderBottom: 'none',
                    '&::before, &::after': {
                      display: 'none',
                    },
                    '& .MuiTabs-scroller': {
                      borderBottom: 'none',
                      '&::before, &::after': {
                        display: 'none',
                      },
                    },
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none',
                      gap: '16px !important',
                    },
                    '& .MuiTab-root:not(.Mui-selected)': {
                      borderBottom: 'none',
                      boxShadow: 'none',
                      '&::before, &::after': {
                        display: 'none',
                      },
                    },
                  }}
                >
                  <Tab hdsProps={{ size: 'medium' }} label="컨텐츠" value="컨텐츠" sx={{ px: '0 !important', pt: '6px !important', pb: '8px !important', mr: '16px !important' }} />
                  <Tab hdsProps={{ size: 'medium' }} label="데이터 프랩" value="데이터 프랩" sx={{ px: '0 !important', pt: '6px !important', pb: '8px !important' }} />
                </Tabs>

                {/* 우측: Select + 버튼 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Select 드롭다운 */}
                  <Select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as string)}
                    hdsProps={{ size: 'medium', type: 'outline' }}
                    sx={{ width: '180px' }}
                  >
                    <MenuItem value="all">전체 컨텐츠 유형</MenuItem>
                    <MenuItem value="vcm">VCM</MenuItem>
                    <MenuItem value="webcc">Web CC</MenuItem>
                    <MenuItem value="360">2D 360</MenuItem>
                  </Select>

                  {/* 컨텐츠 추가하기 버튼 */}
                  <Button
                    hdsProps={{
                      size: 'medium',
                      type: 'outline',
                      style: 'primary',
                      icon: <Ic_plus_regular size="16px" color="#002C5F" />,
                    }}
                  >
                    컨텐츠 추가하기
                  </Button>
                </Box>
              </Box>

              {/* 테이블 */}
              <Box sx={{ flex: 1, overflow: 'auto', padding: '16px 24px 0' }}>
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
