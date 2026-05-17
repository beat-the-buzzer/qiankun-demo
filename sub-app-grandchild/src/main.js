import { createApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app = null

function render(props = {}) {
  const { container } = props
  
  app = createApp(App)
  app.provide('qiankunProps', props)
  
  const mountEl = container 
    ? container.querySelector('#app') 
    : document.getElementById('app')
  app.mount(mountEl)
}

renderWithQiankun({
  bootstrap() {
    console.log('🚀 [孙子应用] bootstrap')
  },
  mount(props) {
    console.log('📦 [孙子应用] mount', props)
    render(props)
  },
  unmount() {
    console.log('👋 [孙子应用] unmount')
    app?.unmount()
    app = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
