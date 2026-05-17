import { reactive } from 'vue'

/**
 * 用户状态管理
 */
export const userStore = reactive({
  isLogin: false,
  user: null,

  login(userInfo) {
    this.isLogin = true
    this.user = userInfo
    console.log('✅ [主应用] 用户登录:', userInfo)
  },

  logout() {
    this.isLogin = false
    this.user = null
    console.log('👋 [主应用] 用户退出')
  }
})

/**
 * 消息中心 - 用于演示子应用向主应用通信
 */
export const messageStore = reactive({
  list: [],

  add(msg) {
    this.list.unshift({
      id: Date.now(),
      content: msg.content,
      from: msg.from,
      time: new Date().toLocaleTimeString()
    })
    // 只保留最近10条
    if (this.list.length > 10) {
      this.list.pop()
    }
  },

  clear() {
    this.list = []
  }
})
