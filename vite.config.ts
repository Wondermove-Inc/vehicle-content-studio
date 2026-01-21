import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: [
      '@hmg-fe/hmg-design-system',
      // Core components (개별 모듈)
      '@hmg-fe/hmg-design-system/Box',
      '@hmg-fe/hmg-design-system/Stack',
      '@hmg-fe/hmg-design-system/Typography',
      '@hmg-fe/hmg-design-system/Button',
      '@hmg-fe/hmg-design-system/Divider',
      // Form components (개별 모듈)
      '@hmg-fe/hmg-design-system/TextField',
      '@hmg-fe/hmg-design-system/IconButton',
      '@hmg-fe/hmg-design-system/InputAdornment',
      '@hmg-fe/hmg-design-system/Select',
      '@hmg-fe/hmg-design-system/MenuItem',
      '@hmg-fe/hmg-design-system/RadioGroup',
      '@hmg-fe/hmg-design-system/Radio',
      // Tab components (개별 모듈)
      '@hmg-fe/hmg-design-system/Tabs',
      '@hmg-fe/hmg-design-system/Tab',
      // Card components (개별 모듈)
      '@hmg-fe/hmg-design-system/Card',
      '@hmg-fe/hmg-design-system/CardActionArea',
      '@hmg-fe/hmg-design-system/CardContent',
      // Other components (개별 모듈)
      '@hmg-fe/hmg-design-system/Badge',
      '@hmg-fe/hmg-design-system/CircularProgress',
      '@hmg-fe/hmg-design-system/ButtonGroup',
      '@hmg-fe/hmg-design-system/Popover',
      '@hmg-fe/hmg-design-system/Paper',
      '@hmg-fe/hmg-design-system/MenuList',
      // Icons
      '@hmg-fe/hmg-design-system/HmgIcon',
      // Dependencies
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  server: {
    warmup: {
      clientFiles: ['./src/main.tsx', './src/pages/Login.tsx'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core UI components
          'hds-core': [
            '@hmg-fe/hmg-design-system/Box',
            '@hmg-fe/hmg-design-system/Stack',
            '@hmg-fe/hmg-design-system/Typography',
            '@hmg-fe/hmg-design-system/Button',
            '@hmg-fe/hmg-design-system/Divider',
          ],
          // Form components
          'hds-form': [
            '@hmg-fe/hmg-design-system/TextField',
            '@hmg-fe/hmg-design-system/InputAdornment',
            '@hmg-fe/hmg-design-system/IconButton',
            '@hmg-fe/hmg-design-system/Select',
            '@hmg-fe/hmg-design-system/MenuItem',
            '@hmg-fe/hmg-design-system/RadioGroup',
            '@hmg-fe/hmg-design-system/Radio',
          ],
          // Navigation components
          'hds-navigation': [
            '@hmg-fe/hmg-design-system/Tabs',
            '@hmg-fe/hmg-design-system/Tab',
            '@hmg-fe/hmg-design-system/ButtonGroup',
            '@hmg-fe/hmg-design-system/Popover',
            '@hmg-fe/hmg-design-system/MenuList',
          ],
          // Surface components
          'hds-surface': [
            '@hmg-fe/hmg-design-system/Card',
            '@hmg-fe/hmg-design-system/CardActionArea',
            '@hmg-fe/hmg-design-system/CardContent',
            '@hmg-fe/hmg-design-system/Paper',
          ],
          // Feedback components
          'hds-feedback': [
            '@hmg-fe/hmg-design-system/Badge',
            '@hmg-fe/hmg-design-system/CircularProgress',
          ],
          // Emotion vendor
          'vendor': [
            '@emotion/react',
            '@emotion/styled',
          ],
        },
      },
    },
  },
})
