import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { registerMicroApps, start } from 'qiankun'

let root = null
let qiankunStarted = false

function render(props = {}) {
  const { container } = props
  const mountEl = container
    ? container.querySelector('#root')
    : document.getElementById('root')

  root = ReactDOM.createRoot(mountEl)
  root.render(React.createElement(App, { qiankunProps: props }))

  // ⭐ React 子应用作为"中间层主应用"，注册孙子应用
  if (!qiankunStarted) {
    registerMicroApps([
      {
        name: 'app-grandchild',
        entry: import.meta.env.VITE_GRANDCHILD_ENTRY,  // ⭐ 使用环境变量
        container: '#grandchild-container',  // React 组件中的容器
        activeRule: '/app-react/child',      // 嵌套路由
        props: {
          message: '来自 React 父应用的问候！'
        }
      }
    ])
    start({
      sandbox: {
        experimentalStyleIsolation: true
      }
    })
    qiankunStarted = true
    console.log('🔵 [React子应用] 已注册孙子应用')
  }
}

renderWithQiankun({
  bootstrap() {
    console.log('🚀 [React子应用] bootstrap')
  },
  mount(props) {
    console.log('📦 [React子应用] mount')
    render(props)
  },
  unmount() {
    console.log('👋 [React子应用] unmount')
    root?.unmount()
    root = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
