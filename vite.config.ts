import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          emotion: ['@emotion/react', '@emotion/styled'],
          mui: [
            '@mui/icons-material',
            '@mui/material',
            '@mui/system',
            '@mui/utils',
            '@mui/x-charts',
            '@mui/x-data-grid',
            '@mui/x-data-grid-pro',
            '@mui/x-date-pickers',
            '@mui/x-date-pickers-pro',
            '@mui/x-tree-view',
          ],
          vendor: [
            '@react-spring/web',
            'clsx',
            'dayjs',
            'global',
            'react',
            'react-dom',
            'react-router-dom',
          ],
        },
      },
    },
  },
  base: '/app/',
});
