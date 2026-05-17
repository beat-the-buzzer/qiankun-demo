import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style.css'

import { registerMicroApps, start } from 'qiankun'
import microApps from './micro-apps'
import './global-state' // 初始化全局状态

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.mount('#app')

registerMicroApps(microApps)
start({ prefetch: true }) // 子应用的预加载

console.log('🎉 [主应用] qiankun 已启动！')
