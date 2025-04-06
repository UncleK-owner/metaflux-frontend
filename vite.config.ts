import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@components': '/src/components',
      '@theme': '/src/theme',
    },
  },
  base: '/app/',
  server: {
    allowedHosts: true,
    host: true,
  },
}); 
