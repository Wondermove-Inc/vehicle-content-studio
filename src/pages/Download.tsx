import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'
import { useFavorites } from '@/hooks/useFavorites'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TablePagination } from '@hmg-fe/hmg-design-system'
import { Ic_check_regular } from '@hmg-fe/hmg-design-system/HmgIcon'

// 썸네일 이미지 URL (실제 이미지로 교체 필요)
const thumbnailImage = 'https://www.figma.com/api/mcp/asset/614e727a-4f5d-4e01-a7f7-c34c5aa69649'

// 버전 변경 이력 더미 데이터
const versionHistory = [
  { version: '1.1.3', changes: '000 기능이 개선되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.1.2', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.1.1', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.1.0', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.0.2', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.0.1', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
  { version: '1.0.0', changes: '000 버그가 픽스되었습니다.', date: 'YYYY-MM-DD HH:MM:SS (UTC+9)' },
]

function Download() {
  const [activeMenu, setActiveMenu] = useState('다운로드')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // 즐겨찾기 데이터 (중앙 집중식 관리)
  const { favorites, contentFavorites } = useFavorites()

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* 사이드바 */}
      <Sidebar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        favorites={favorites}
        projectNames={projectNames}
        contentFavorites={contentFavorites}
      />

      {/* 메인 컨텐츠 영역 */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--surface_container_lowest)',
          padding: '16px 16px 16px 0',
        }}
      >
        {/* 컨텐츠 카드 */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--surface_container)',
            borderRadius: '10px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden',
          }}
        >
          {/* 페이지 헤더 */}
          <Box
            sx={{
              padding: '24px 24px 16px 24px',
              borderBottom: '1px solid var(--outline)',
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 700,
                lineHeight: '36px',
                color: 'var(--on_surface_high)',
              }}
            >
              다운로드
            </Typography>
          </Box>

          {/* 스크롤 가능한 컨텐츠 영역 */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
          {/* 좌측 패널 - 플러그인 트리 */}
          <Box
            sx={{
              width: '280px',
              borderRight: '1px solid var(--outline)',
              backgroundColor: 'var(--surface_container)',
              padding: '16px 24px',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'var(--surface_container_lowest)',
                borderRadius: '4px',
                padding: '10px 16px',
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: '22px',
                  color: '#111',
                }}
              >
                언리얼 플러그인
              </Typography>
            </Box>
          </Box>

          {/* 메인 컨텐츠 */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 24px 0 24px',
              // 스크롤바 스타일링 - 스크롤 시에만 표시
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'transparent',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
              },
              '&:hover::-webkit-scrollbar-thumb': {
                background: 'rgba(0, 0, 0, 0.2)',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(0, 0, 0, 0.3)',
              },
              // Firefox 지원
              scrollbarWidth: 'thin',
              scrollbarColor: 'transparent transparent',
              '&:hover': {
                scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
              },
            }}
          >
            {/* 플러그인 정보 섹션 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 헤더 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: '26px',
                    color: '#111',
                  }}
                >
                  언리얼 플러그인
                </Typography>
              </Box>

              {/* 플러그인 카드 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 메인 카드 */}
                <Box
                  sx={{
                    backgroundColor: 'var(--surface_container_lowest)',
                    border: '1px solid var(--outline)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {/* 카드 헤더 */}
                  <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: '26px',
                        color: '#949494',
                      }}
                    >
                      1.1.3
                    </Typography>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: '26px',
                        color: '#333',
                      }}
                    >
                      HMG 차량 컨텐츠 제작을 위한 언리얼 플러그인
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <Button hdsProps={{ size: 'medium' }}>
                        사용자 매뉴얼 다운로드
                      </Button>
                      <Button
                        hdsProps={{
                          size: 'medium',
                          style: 'primary',
                          type: 'fill',
                        }}
                      >
                        설치 파일 다운로드
                      </Button>
                    </Box>
                  </Box>

                  {/* 카드 컨텐츠 */}
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    {/* 썸네일 */}
                    <Box
                      sx={{
                        width: '364px',
                        height: '318px',
                        backgroundColor: '#333',
                        borderRadius: '8px',
                        border: '1px solid var(--outline)',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={thumbnailImage}
                        alt="언리얼 플러그인 썸네일"
                        sx={{
                          position: 'absolute',
                          top: '19px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '223px',
                          height: '299px',
                          borderRadius: '8px',
                          boxShadow: '0px 0px 2px 0px rgba(34,34,34,0.1), 0px 24px 22px 0px rgba(34,34,34,0.05)',
                        }}
                      />
                    </Box>

                    {/* 정보 카드들 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {/* 주요 기능 */}
                      <Box
                        sx={{
                          backgroundColor: 'var(--surface_container)',
                          border: '1px solid var(--outline)',
                          borderRadius: '8px',
                          padding: '12px 16px 16px 16px',
                          boxShadow: '0px 4px 12px 0px rgba(34,34,34,0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
                          <Box
                            sx={{
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Ic_check_regular size="20px" color="#121416" />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              lineHeight: '22px',
                              color: '#121416',
                            }}
                          >
                            주요 기능
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '22px',
                            color: '#676d79',
                          }}
                        >
                          DAMS 연계를 통한 에셋 관리와 렌더팜 대량 렌더링 요청
                        </Typography>
                      </Box>

                      {/* 시스템 요구 사항 */}
                      <Box
                        sx={{
                          backgroundColor: 'var(--surface_container)',
                          border: '1px solid var(--outline)',
                          borderRadius: '8px',
                          padding: '12px 16px 16px 16px',
                          boxShadow: '0px 4px 12px 0px rgba(34,34,34,0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
                          <Box
                            sx={{
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Ic_check_regular size="20px" color="#121416" />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              lineHeight: '22px',
                              color: '#121416',
                            }}
                          >
                            시스템 요구 사항
                          </Typography>
                        </Box>
                        <Typography
                          component="div"
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '22px',
                            color: '#676d79',
                          }}
                        >
                          Unreal Engine 5.x 이상
                          <br />
                          OS 0000, 00000
                          <br />
                          HMG SSO 계정 로그인
                          <br />
                          언리얼 플러그인 비즈니스 유저 혹은 3D 모델러 권한 필요
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* 버전 변경 이력 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      lineHeight: '22px',
                      color: '#3b3b3b',
                    }}
                  >
                    버전 변경 이력
                  </Typography>

                  {/* 테이블 */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '200px', fontWeight: 700 }}>버전</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>버전 변경 내용</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>업데이트 일시</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {versionHistory
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow key={row.version}>
                              <TableCell>{row.version}</TableCell>
                              <TableCell sx={{ color: '#6b6b6b' }}>{row.changes}</TableCell>
                              <TableCell sx={{ color: '#6b6b6b' }}>{row.date}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* 페이지네이션 */}
                  <TablePagination
                    component="div"
                    count={versionHistory.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 20, 50]}
                    hdsProps={{ size: 'xsmall', isRowsPerPage: true }}
                    sx={{ flexShrink: 0, height: '60px', minHeight: '60px' }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Download
