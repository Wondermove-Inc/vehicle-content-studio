import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './i18n'
import '@hmg-fe/hmg-design-system/css'
import { setConfig, HdsThemeProvider } from '@hmg-fe/hmg-design-system'
setConfig({ useDefaultHdsProps: true })

import Login from './pages/Login'
import Project from './pages/Project'
import ContentRequest from './pages/ContentRequest'
import ContentDetail from './pages/ContentDetail'
import Preview from './pages/Preview'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { Permission } from './types/auth.types'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/project',
    element: (
      <ProtectedRoute
        requiredAnyPermission={[Permission.PROJECT_VIEW_ALL, Permission.PROJECT_VIEW_ASSIGNED]}
      >
        <Project />
      </ProtectedRoute>
    ),
  },
  {
    path: '/project/content/:contentId',
    element: (
      <ProtectedRoute requiredPermissions={[Permission.CONTENT_VIEW]}>
        <ContentDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/preview/:imageIndex',
    element: (
      <ProtectedRoute requiredPermissions={[Permission.CONTENT_VIEW]}>
        <Preview />
      </ProtectedRoute>
    ),
  },
  {
    path: '/content-request',
    element: (
      <ProtectedRoute
        requiredAnyPermission={[Permission.PROJECT_CREATE, Permission.CONTENT_CREATE]}
      >
        <ContentRequest />
      </ProtectedRoute>
    ),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HdsThemeProvider theme="hmg">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HdsThemeProvider>
  </StrictMode>,
)
