import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5573,
    proxy: {
      '/api': {
        target: 'http://localhost:3303', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
