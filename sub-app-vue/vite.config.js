import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    qiankun('app-vue', {
      useDevMode: mode === 'development'
    })
  ],
  base: mode === 'production' ? '//1.12.229.67:4001/' : '/',
  server: {
    port: 8081,
    cors: true,
    origin: 'http://localhost:8081'
  }
}))
