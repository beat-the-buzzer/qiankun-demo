import { initGlobalState } from 'qiankun'

/**
 * qiankun 官方全局状态
 * 用于子应用之间通信
 */
const state = {
  // 子应用间的消息
  vueToReact: '',
  reactToVue: ''
}

const actions = initGlobalState(state)

// 主应用监听变化（可选）
actions.onGlobalStateChange((state, prev) => {
  console.log('🌍 [主应用] 全局状态变化:', state)
})

export default actions
