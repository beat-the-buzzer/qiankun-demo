import { userStore, messageStore } from './store/user'

const microApps = [
  {
    name: 'app-vue',
    entry: import.meta.env.VITE_SUB_VUE_ENTRY,  // ⭐ 使用环境变量
    container: '#subapp-container',
    activeRule: '/app-vue',
    props: {
      // 父 -> 子
      getUser: () => userStore.user,
      // 子 -> 父
      sendToMain: (content) => {
        messageStore.add({ content, from: 'Vue子应用' })
      }
      // 子 -> 子：通过 qiankun 的 onGlobalStateChange 和 setGlobalState
      // 这两个方法会自动注入到 props 中
    }
  },
  {
    name: 'app-react',
    entry: import.meta.env.VITE_SUB_REACT_ENTRY,  // ⭐ 使用环境变量
    container: '#subapp-container',
    activeRule: '/app-react',
    props: {
      getUser: () => userStore.user,
      sendToMain: (content) => {
        messageStore.add({ content, from: 'React子应用' })
      }
    }
  }
]

export default microApps
