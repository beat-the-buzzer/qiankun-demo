import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig(({ mode }) => ({
  plugins: [
    qiankun('app-react', {
      useDevMode: mode === 'development'
    })
  ],
  base: mode === 'production' ? '//1.12.229.67:4002/' : '/',
  server: {
    port: 8082,
    cors: true,
    origin: 'http://localhost:8082'
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
}))
