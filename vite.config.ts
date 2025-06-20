import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@data': '/src/data',
      '@domain': '/src/domain',
      '@infrastructure': '/src/infrastructure',
      '@application': '/src/application',
      '@presentation': '/src/presentation',
      '@layouts': '/src/presentation/layouts',
      '@pages': '/src/presentation/pages',
      '@components': '/src/presentation/components',
      '@theme': '/src/presentation/theme',
    },
  },
  optimizeDeps: {
    exclude: ['xlsx'],
  },
  build: {
    commonjsOptions: { include: [/xlsx/, /node_modules/] },
  },
  base: '/app/',
  server: {
    allowedHosts: true,
    host: true,
    proxy: {
      '/api': {
        target: 'https://starkapin.duckdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
