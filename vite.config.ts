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
      '@hmg-fe/hmg-design-system/Box',
      '@hmg-fe/hmg-design-system/Stack',
      '@hmg-fe/hmg-design-system/Typography',
      '@hmg-fe/hmg-design-system/TextField',
      '@hmg-fe/hmg-design-system/Button',
      '@hmg-fe/hmg-design-system/Divider',
      '@hmg-fe/hmg-design-system/IconButton',
      '@hmg-fe/hmg-design-system/InputAdornment',
      '@hmg-fe/hmg-design-system/Link',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
    ],
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
