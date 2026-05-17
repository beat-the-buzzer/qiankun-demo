import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    qiankun('app-grandchild', {
      useDevMode: mode === 'development'
    })
  ],
  base: mode === 'production' ? '//1.12.229.67:4003/' : '/',
  server: {
    port: 8083,
    cors: true,
    origin: 'http://localhost:8083'
  }
}))
