import React, { useState, useEffect } from 'react'
import './App.css'

function App({ qiankunProps = {} }) {
  const [user, setUser] = useState(null)
  const [msgToMain, setMsgToMain] = useState('')
  const [msgToVue, setMsgToVue] = useState('')
  const [receivedMsg, setReceivedMsg] = useState('')
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    // 父 -> 子：获取用户信息
    if (qiankunProps.getUser) {
      setUser(qiankunProps.getUser())
    }

    // 子 -> 子：监听全局状态
    if (qiankunProps.onGlobalStateChange) {
      qiankunProps.onGlobalStateChange((state) => {
        console.log('🔵 [React子应用] 收到全局状态:', state)
        if (state.vueToReact) {
          setReceivedMsg(state.vueToReact)
        }
      }, true)
    }

    // 检查当前路由是否需要显示孙子应用
    const checkRoute = () => {
      setShowChild(window.location.pathname.startsWith('/app-react/child'))
    }
    checkRoute()
    window.addEventListener('popstate', checkRoute)
    return () => window.removeEventListener('popstate', checkRoute)
  }, [qiankunProps])

  // 子 -> 父
  const sendToMain = () => {
    if (!msgToMain.trim()) return
    qiankunProps.sendToMain?.(msgToMain)
    setMsgToMain('')
  }

  // 子 -> 子
  const sendToVue = () => {
    if (!msgToVue.trim()) return
    qiankunProps.setGlobalState?.({ reactToVue: msgToVue })
    setMsgToVue('')
  }

  // 导航到孙子应用
  const goToChild = () => {
    window.history.pushState(null, '', '/app-react/child')
    setShowChild(true)
  }

  // 返回 React 主页
  const goBack = () => {
    window.history.pushState(null, '', '/app-react')
    setShowChild(false)
  }

  return React.createElement('div', { className: 'react-sub-app' },
    React.createElement('div', { className: 'header' },
      React.createElement('h2', null, '🔵 React 子应用'),
      React.createElement('div', { className: 'nav-buttons' },
        React.createElement('button', { 
          onClick: goBack, 
          className: !showChild ? 'active' : '' 
        }, '通信演示'),
        React.createElement('button', { 
          onClick: goToChild,
          className: showChild ? 'active' : ''
        }, '🎯 加载孙子应用')
      )
    ),
    
    // 孙子应用容器
    showChild 
      ? React.createElement('div', { className: 'child-section' },
          React.createElement('p', { className: 'child-tip' }, 
            '⬇️ 下方是被 React 子应用加载的孙子应用（嵌套微前端）'
          ),
          React.createElement('div', { id: 'grandchild-container' })
        )
      : React.createElement('div', { className: 'cards' },
          // 父 -> 子
          React.createElement('div', { className: 'card' },
            React.createElement('h3', null, '📥 父 → 子（接收用户信息）'),
            user
              ? React.createElement('div', { className: 'user-info' },
                  React.createElement('img', { src: user.avatar, className: 'avatar' }),
                  React.createElement('div', null,
                    React.createElement('p', null, React.createElement('strong', null, user.name)),
                    React.createElement('p', null, `ID: ${user.id} | 角色: ${user.role}`)
                  )
                )
              : React.createElement('p', { className: 'tip' }, '请先在主应用登录')
          ),
          // 子 -> 父
          React.createElement('div', { className: 'card' },
            React.createElement('h3', null, '📤 子 → 父（发送消息给主应用）'),
            React.createElement('input', {
              value: msgToMain,
              onChange: (e) => setMsgToMain(e.target.value),
              placeholder: '输入消息内容'
            }),
            React.createElement('button', { onClick: sendToMain }, '发送给主应用'),
            React.createElement('p', { className: 'tip' }, '发送后点击主应用右上角🔔查看')
          ),
          // 子 -> 子
          React.createElement('div', { className: 'card' },
            React.createElement('h3', null, '🔄 子 → 子（发送给 Vue）'),
            React.createElement('input', {
              value: msgToVue,
              onChange: (e) => setMsgToVue(e.target.value),
              placeholder: '输入消息内容'
            }),
            React.createElement('button', { onClick: sendToVue }, '发送给 Vue 子应用'),
            React.createElement('p', { className: 'tip' }, '通过 qiankun 全局状态传递')
          ),
          // 接收消息
          React.createElement('div', { className: 'card' },
            React.createElement('h3', null, '📨 来自 Vue 的消息'),
            receivedMsg
              ? React.createElement('div', { className: 'received' }, receivedMsg)
              : React.createElement('p', { className: 'tip' }, '等待 Vue 子应用发送消息...')
          )
        )
  )
}

export default App
