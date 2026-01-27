import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from '@/components/Sidebar'
import { PROJECT_NAMES as projectNames } from '@/mocks/projects.mock'
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/contexts/AuthContext'
import { PermissionLevel } from '@/types/auth.types'
import Box from '@hmg-fe/hmg-design-system/Box'
import Typography from '@hmg-fe/hmg-design-system/Typography'
import Button from '@hmg-fe/hmg-design-system/Button'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TablePagination, TableSortLabel, SimpleTreeView, TreeItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@hmg-fe/hmg-design-system'
import { Ic_file_regular, Ic_check_regular, Ic_pencil_regular } from '@hmg-fe/hmg-design-system/HmgIcon'

// 버전 변경 이력 더미 데이터
const versionHistory = [
  { version: '1.1.3', date: '2024-12-15 14:23:45 (UTC+9)' },
  { version: '1.1.2', date: '2024-11-28 09:15:20 (UTC+9)' },
  { version: '1.1.1', date: '2024-11-10 16:42:33 (UTC+9)' },
  { version: '1.1.0', date: '2024-10-25 11:30:18 (UTC+9)' },
  { version: '1.0.2', date: '2024-09-18 13:55:09 (UTC+9)' },
  { version: '1.0.1', date: '2024-09-05 10:20:41 (UTC+9)' },
  { version: '1.0.0', date: '2024-08-20 15:00:00 (UTC+9)' },
]

function Download() {
  const { t, i18n } = useTranslation()
  const [activeMenu, setActiveMenu] = useState(t('common.menu.download'))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)
  const [versionSortOrder, setVersionSortOrder] = useState<'asc' | 'desc' | null>(null)

  // 어플리케이션 관리 다이얼로그 초기값
  const initialAppName = t('download.manageDialog.placeholders.appName')
  const initialVersionMajor = '1'
  const initialVersionMinor = '1'
  const initialVersionPatch = '3'
  const initialKeyFeatures = t('download.manageDialog.placeholders.keyFeatures')
  const initialSystemRequirements = t('download.manageDialog.placeholders.systemRequirements')
  const initialVersionChanges = t('download.manageDialog.placeholders.versionChanges')

  // 어플리케이션 관리 다이얼로그 상태
  const [appName, setAppName] = useState(initialAppName)
  const [versionMajor, setVersionMajor] = useState(initialVersionMajor)
  const [versionMinor, setVersionMinor] = useState(initialVersionMinor)
  const [versionPatch, setVersionPatch] = useState(initialVersionPatch)
  const [keyFeatures, setKeyFeatures] = useState(initialKeyFeatures)
  const [systemRequirements, setSystemRequirements] = useState(initialSystemRequirements)
  const [versionChanges, setVersionChanges] = useState(initialVersionChanges)

  // 즐겨찾기 데이터 (중앙 집중식 관리)
  const { favorites, contentFavorites } = useFavorites()

  // 권한 체크 - L1, L2만 어플리케이션 관리 버튼 표시
  const { user } = useAuth()
  const canManageApplication = user?.permissionLevel === PermissionLevel.L1_ADMIN ||
                                user?.permissionLevel === PermissionLevel.L2_SERVICE_MANAGER

  // 모든 필수 필드가 입력되었는지 확인
  const isFormValid = appName.trim() !== '' &&
                      versionMajor.trim() !== '' &&
                      versionMinor.trim() !== '' &&
                      versionPatch.trim() !== '' &&
                      keyFeatures.trim() !== '' &&
                      systemRequirements.trim() !== '' &&
                      versionChanges.trim() !== ''

  // 언어별 썸네일 이미지
  const thumbnailImage = i18n.language === 'ko'
    ? '/images/app_thumbnail_kr.png'
    : '/images/app_thumbnail_en.png'

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleVersionSort = () => {
    setVersionSortOrder(prev => {
      if (prev === null) return 'asc'
      if (prev === 'asc') return 'desc'
      return null
    })
  }

  // 다이얼로그 닫기 시 초기값으로 복원
  const handleCloseDialog = () => {
    setIsManageDialogOpen(false)
    setAppName(initialAppName)
    setVersionMajor(initialVersionMajor)
    setVersionMinor(initialVersionMinor)
    setVersionPatch(initialVersionPatch)
    setKeyFeatures(initialKeyFeatures)
    setSystemRequirements(initialSystemRequirements)
    setVersionChanges(initialVersionChanges)
  }

  return (
    <>
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
          <Box sx={{ padding: '20px 20px 16px 24px', borderBottom: '1px solid var(--outline)' }}>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: '36px',
                color: 'var(--on_surface)',
              }}
            >
              {t('download.title')}
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
              width: '240px',
              borderRight: '1px solid var(--outline)',
              backgroundColor: 'var(--surface_container)',
              padding: '16px 24px',
              flexShrink: 0,
            }}
          >
            <SimpleTreeView
              hdsProps={{ size: 'medium', type: 'line' }}
              selectedItems="unreal-plugin"
              sx={{
                '& .MuiTreeItem-content': {
                  height: '38px',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '4px',
                  padding: '0 10px',
                },
                '& .MuiTreeItem-content.Mui-selected': {
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                },
                '& .MuiTreeItem-iconContainer': {
                  display: 'none',
                },
                '& .MuiTreeItem-label': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 0,
                  marginLeft: '10px',
                },
              }}
            >
              <TreeItem
                itemId="unreal-plugin"
                label={
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      lineHeight: '22px',
                      color: '#111111',
                    }}
                  >
                    {t('download.plugin.title')}
                  </Typography>
                }
                hdsProps={{ type: 'default' }}
              />
            </SimpleTreeView>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 헤더 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: '26px',
                    color: '#111',
                  }}
                >
                  {t('download.plugin.title')}
                </Typography>

                {/* 어플리케이션 관리 버튼 - L1, L2 권한만 표시 */}
                {canManageApplication && (
                  <Button
                    hdsProps={{
                      size: 'medium',
                      type: 'outline',
                      icon: <Ic_pencil_regular size="16px" />,
                    }}
                    onClick={() => setIsManageDialogOpen(true)}
                  >
                    {t('download.plugin.manage')}
                  </Button>
                )}
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
                    gap: '12px',
                  }}
                >
                  {/* 카드 헤더 */}
                  <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: '24px',
                        color: '#949494',
                      }}
                    >
                      1.1.3
                    </Typography>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: '24px',
                        color: '#333',
                      }}
                    >
                      {t('download.plugin.description')}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <Button hdsProps={{ size: 'medium' }}>
                        {t('download.plugin.downloadManual')}
                      </Button>
                      <Button
                        hdsProps={{
                          size: 'medium',
                          style: 'primary',
                          type: 'fill',
                        }}
                      >
                        {t('download.plugin.downloadInstaller')}
                      </Button>
                    </Box>
                  </Box>

                  {/* 카드 컨텐츠 */}
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    {/* 썸네일 */}
                    <Box
                      sx={{
                        width: '364px',
                        height: '226px',
                        borderRadius: '8px',
                        border: '1px solid var(--outline)',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={thumbnailImage}
                        alt="언리얼 플러그인 썸네일"
                        sx={{
                          width: '364px',
                          height: '226px',
                          display: 'block',
                        }}
                      />
                    </Box>

                    {/* 정보 카드들 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '226px' }}>
                      {/* 주요 기능 */}
                      <Box
                        sx={{
                          backgroundColor: 'var(--surface_container)',
                          border: '1px solid var(--outline)',
                          borderRadius: '8px',
                          padding: '12px 16px 12px 16px',
                          boxShadow: '0px 4px 12px 0px rgba(34,34,34,0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Ic_file_regular size="16px" color="#121416" />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              lineHeight: '22px',
                              color: '#121416',
                            }}
                          >
                            {t('download.plugin.keyFeatures')}
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
                          {t('download.plugin.keyFeaturesDesc')}
                        </Typography>
                      </Box>

                      {/* 시스템 요구 사항 */}
                      <Box
                        sx={{
                          flex: 1,
                          backgroundColor: 'var(--surface_container)',
                          border: '1px solid var(--outline)',
                          borderRadius: '8px',
                          padding: '12px 16px 12px 16px',
                          boxShadow: '0px 4px 12px 0px rgba(34,34,34,0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Ic_check_regular size="16px" color="#121416" />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              lineHeight: '22px',
                              color: '#121416',
                            }}
                          >
                            {t('download.plugin.systemRequirements')}
                          </Typography>
                        </Box>
                        <Typography
                          component="div"
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '22px',
                            color: '#676d79',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {t('download.plugin.systemRequirementsDesc')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* 버전 변경 이력 */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      lineHeight: '22px',
                      color: '#3b3b3b',
                      marginBottom: '12px',
                    }}
                  >
                    {t('download.versionHistory.title')}
                  </Typography>

                  {/* 테이블 */}
                  <TableContainer sx={{ width: '100%' }}>
                    <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
                      <TableHead sx={{
                        height: '40px !important',
                        minHeight: '40px !important',
                        maxHeight: '40px !important',
                      }}>
                        <TableRow sx={{
                          height: '40px !important',
                          minHeight: '40px !important',
                          maxHeight: '40px !important',
                          '& .MuiTableCell-root': {
                            height: '40px !important',
                            minHeight: '40px !important',
                            maxHeight: '40px !important',
                            padding: '0 12px !important',
                          }
                        }}>
                          <TableCell sx={{ width: '120px', fontWeight: 700 }}>
                            <TableSortLabel
                              active={versionSortOrder !== null}
                              direction={versionSortOrder === 'asc' ? 'asc' : 'desc'}
                              onClick={handleVersionSort}
                            >
                              {t('download.versionHistory.version')}
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ width: '45%', fontWeight: 700 }}>{t('download.versionHistory.changes')}</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>{t('download.versionHistory.updateDate')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...versionHistory]
                          .sort((a, b) => {
                            if (!versionSortOrder) return 0
                            const compareResult = a.version.localeCompare(b.version, undefined, { numeric: true })
                            return versionSortOrder === 'asc' ? compareResult : -compareResult
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow key={row.version}>
                              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.version}</TableCell>
                              <TableCell sx={{
                                color: '#6b6b6b',
                                whiteSpace: 'normal !important',
                                wordBreak: 'break-word',
                                padding: '12px !important',
                              }}>
                                <Typography sx={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  lineHeight: '1.5',
                                  whiteSpace: 'normal',
                                  wordBreak: 'break-word',
                                }}>
                                  {t(`download.versionHistory.versions.${row.version}`)}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ color: '#6b6b6b', whiteSpace: 'nowrap' }}>{row.date}</TableCell>
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

    {/* 어플리케이션 관리 다이얼로그 */}
    <Dialog
      open={isManageDialogOpen}
      onClose={(event, reason) => {
        // 배경 클릭 시에는 닫히지 않음
        if (reason === 'backdropClick') {
          return
        }
        handleCloseDialog()
      }}
      PaperProps={{
        sx: {
          maxWidth: '400px',
          width: '400px',
        }
      }}
    >
      <DialogTitle hdsProps={{ closeIcon: true, onClose: handleCloseDialog }}>
        {t('download.manageDialog.title')}
      </DialogTitle>
      <DialogContent
        hdsProps
        sx={{
          paddingTop: '18px',
          paddingBottom: '0px',
          overflow: 'hidden',
          '&:hover': {
            overflow: 'auto',
          },
          // 스크롤바 스타일링 - 호버 시에만 표시
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0, 0, 0, 0.3)',
          },
          // Firefox 지원
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* 어플리케이션 이름 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.appName')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <TextField
              fullWidth
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              hdsProps={{ size: 'medium' }}
            />
          </Box>

          {/* 버전 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.version')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <TextField
                sx={{ width: '62px' }}
                value={versionMajor}
                onChange={(e) => setVersionMajor(e.target.value)}
                hdsProps={{ size: 'medium' }}
              />
              <Typography sx={{ fontSize: 15, lineHeight: '22px', color: '#3b3b3b', width: '5px' }}>
                .
              </Typography>
              <TextField
                sx={{ width: '62px' }}
                value={versionMinor}
                onChange={(e) => setVersionMinor(e.target.value)}
                hdsProps={{ size: 'medium' }}
              />
              <Typography sx={{ fontSize: 15, lineHeight: '22px', color: '#3b3b3b', width: '5px' }}>
                .
              </Typography>
              <TextField
                sx={{ width: '62px' }}
                value={versionPatch}
                onChange={(e) => setVersionPatch(e.target.value)}
                hdsProps={{ size: 'medium' }}
              />
            </Box>
          </Box>

          {/* 어플리케이션 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.application')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              padding: '4px 4px 4px 8px',
              backgroundColor: 'var(--surface_container)',
            }}>
              <Typography sx={{ flex: 1, fontSize: 14, lineHeight: '22px', color: '#3b3b3b' }}>
                unrealeditor.pak
              </Typography>
              <input
                type="file"
                id="application-file-input"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    console.log('Application file selected:', file.name)
                  }
                }}
              />
              <Button
                hdsProps={{ size: 'xsmall', type: 'outline', icon: false, style: 'primary' }}
                onClick={() => document.getElementById('application-file-input')?.click()}
                sx={{
                  minWidth: '0 !important',
                  '& .MuiButton-root': {
                    minWidth: '0 !important',
                  },
                }}
              >
                {t('download.manageDialog.buttons.change')}
              </Button>
            </Box>
          </Box>

          {/* 사용자 매뉴얼 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.manual')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              padding: '4px 4px 4px 8px',
              backgroundColor: 'var(--surface_container)',
            }}>
              <Typography sx={{ flex: 1, fontSize: 14, lineHeight: '22px', color: '#3b3b3b' }}>
                manual.pdf
              </Typography>
              <input
                type="file"
                id="manual-file-input"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    console.log('Manual file selected:', file.name)
                  }
                }}
              />
              <Button
                hdsProps={{ size: 'xsmall', type: 'outline', icon: false, style: 'primary' }}
                onClick={() => document.getElementById('manual-file-input')?.click()}
                sx={{
                  minWidth: '0 !important',
                  '& .MuiButton-root': {
                    minWidth: '0 !important',
                  },
                }}
              >
                {t('download.manageDialog.buttons.change')}
              </Button>
            </Box>
          </Box>

          {/* 이미지 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.image')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d1d1d1',
              borderRadius: '4px',
              padding: '4px 4px 4px 8px',
              backgroundColor: 'var(--surface_container)',
            }}>
              <Typography sx={{ flex: 1, fontSize: 14, lineHeight: '22px', color: '#3b3b3b' }}>
                unrealeditor.jpg
              </Typography>
              <input
                type="file"
                id="image-file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    console.log('Image file selected:', file.name)
                  }
                }}
              />
              <Button
                hdsProps={{ size: 'xsmall', type: 'outline', icon: false, style: 'primary' }}
                onClick={() => document.getElementById('image-file-input')?.click()}
                sx={{
                  minWidth: '0 !important',
                  '& .MuiButton-root': {
                    minWidth: '0 !important',
                  },
                }}
              >
                {t('download.manageDialog.buttons.change')}
              </Button>
            </Box>
          </Box>

          {/* 주요 기능 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.keyFeatures')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              hdsProps={{ size: 'medium' }}
              sx={{
                '& .MuiInputBase-root': {
                  paddingRight: '0 !important',
                },
                '& textarea': {
                  resize: 'none',
                  paddingRight: '20px',
                  boxSizing: 'border-box',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
                },
              }}
            />
          </Box>

          {/* 시스템 요구 사항 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.systemRequirements')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={systemRequirements}
              onChange={(e) => setSystemRequirements(e.target.value)}
              hdsProps={{ size: 'medium' }}
              sx={{
                '& .MuiInputBase-root': {
                  paddingRight: '0 !important',
                },
                '& textarea': {
                  resize: 'none',
                  paddingRight: '20px',
                  boxSizing: 'border-box',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
                },
              }}
            />
          </Box>

          {/* 버전 변경 내용 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#0e0f11' }}>
                {t('download.manageDialog.fields.versionChanges')}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '22px', color: '#ce302c' }}>
                *
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={versionChanges}
              onChange={(e) => setVersionChanges(e.target.value)}
              hdsProps={{ size: 'medium' }}
              sx={{
                '& .MuiInputBase-root': {
                  paddingRight: '0 !important',
                },
                '& textarea': {
                  resize: 'none',
                  paddingRight: '20px',
                  boxSizing: 'border-box',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  },
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions hdsProps sx={{ paddingTop: '16px' }}>
        <Button
          hdsProps
          onClick={handleCloseDialog}
          sx={{
            width: 'fit-content',
            minWidth: 'unset !important'
          }}
        >
          {t('common.button.cancel')}
        </Button>
        <Button
          hdsProps={{ type: 'fill', style: 'primary' }}
          onClick={() => {
            // TODO: 어플리케이션 관리 로직
            setIsManageDialogOpen(false)
          }}
          disabled={!isFormValid}
          sx={{
            width: 'fit-content',
            minWidth: 'unset !important'
          }}
        >
          {t('common.button.save')}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default Download
