import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      '/categories': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path,
        headers: [],
      },
    },
  },
});
