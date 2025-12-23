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
      '@hmg-fe/hmg-design-system/Box',
      '@hmg-fe/hmg-design-system/Stack',
      '@hmg-fe/hmg-design-system/Typography',
      '@hmg-fe/hmg-design-system/TextField',
      '@hmg-fe/hmg-design-system/Button',
      '@hmg-fe/hmg-design-system/Divider',
      '@hmg-fe/hmg-design-system/IconButton',
      '@hmg-fe/hmg-design-system/InputAdornment',
      '@hmg-fe/hmg-design-system/Link',
      '@hmg-fe/hmg-design-system/HmgIcon',
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
          'hds-core': [
            '@hmg-fe/hmg-design-system/Box',
            '@hmg-fe/hmg-design-system/Stack',
            '@hmg-fe/hmg-design-system/Typography',
            '@hmg-fe/hmg-design-system/Button',
          ],
          'hds-form': [
            '@hmg-fe/hmg-design-system/TextField',
            '@hmg-fe/hmg-design-system/InputAdornment',
            '@hmg-fe/hmg-design-system/IconButton',
          ],
          'vendor': [
            '@emotion/react',
            '@emotion/styled',
          ],
        },
      },
    },
  },
})
