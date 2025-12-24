import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './i18n'
import '@hmg-fe/hmg-design-system/css'
import { setConfig, HdsThemeProvider } from '@hmg-fe/hmg-design-system'
setConfig({ useDefaultHdsProps: true })

import Login from './pages/Login'
import Project from './pages/Project'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/project',
    element: <Project />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HdsThemeProvider theme="hmg">
      <RouterProvider router={router} />
    </HdsThemeProvider>
  </StrictMode>,
)
