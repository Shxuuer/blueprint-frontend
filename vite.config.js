import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/chang-shun/api': {
        // target: 'http://localhost:4523/m1/3486968-0-default',
        target: 'https://1.14.125.238/chang-shun/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/chang-shun\/api/, '')
      }
    }
  }
})
