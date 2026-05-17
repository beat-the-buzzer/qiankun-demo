import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app = null

function render(props = {}) {
  const { container } = props

  app = createApp(App)
  
  // 注入 qiankun props
  app.provide('qiankunProps', props)
  
  // ⭐ 使用路由
  app.use(router)

  const mountEl = container ? container.querySelector('#app') : document.getElementById('app')
  app.mount(mountEl)
}

renderWithQiankun({
  bootstrap() {
    console.log('🚀 [Vue子应用] bootstrap')
  },
  mount(props) {
    console.log('📦 [Vue子应用] mount')
    render(props)
  },
  unmount() {
    console.log('👋 [Vue子应用] unmount')
    app?.unmount()
    app = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
