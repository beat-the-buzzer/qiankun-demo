<template>
  <div class="vue-sub-app">
    <div class="header">
      <h2>🟢 Vue 子应用</h2>
    </div>

    <div class="cards">
      <!-- 父 -> 子 -->
      <div class="card">
        <h3>📥 父 → 子（接收用户信息）</h3>
        <div v-if="user" class="user-info">
          <img :src="user.avatar" class="avatar" />
          <div>
            <p><strong>{{ user.name }}</strong></p>
            <p>ID: {{ user.id }} | 角色: {{ user.role }}</p>
          </div>
        </div>
        <p v-else class="tip">请先在主应用登录</p>
      </div>

      <!-- 子 -> 父 -->
      <div class="card">
        <h3>📤 子 → 父（发送消息给主应用）</h3>
        <input v-model="msgToMain" placeholder="输入消息内容" />
        <button @click="sendToMain">发送给主应用</button>
        <p class="tip">发送后点击主应用右上角🔔查看</p>
      </div>

      <!-- 子 -> 子 -->
      <div class="card">
        <h3>🔄 子 → 子（发送给 React）</h3>
        <input v-model="msgToReact" placeholder="输入消息内容" />
        <button @click="sendToReact">发送给 React 子应用</button>
        <p class="tip">通过 qiankun 全局状态传递</p>
      </div>

      <!-- 接收来自 React 的消息 -->
      <div class="card">
        <h3>📨 来自 React 的消息</h3>
        <div v-if="receivedMsg" class="received">
          {{ receivedMsg }}
        </div>
        <p v-else class="tip">等待 React 子应用发送消息...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const props = inject('qiankunProps', {})
const user = ref(null)
const msgToMain = ref('')
const msgToReact = ref('')
const receivedMsg = ref('')

onMounted(() => {
  // 父 -> 子：获取用户信息
  if (props.getUser) {
    user.value = props.getUser()
  }

  // 子 -> 子：监听全局状态变化
  // qiankun 会自动注入 onGlobalStateChange
  if (props.onGlobalStateChange) {
    props.onGlobalStateChange((state) => {
      console.log('🟢 [Vue子应用] 收到全局状态:', state)
      if (state.reactToVue) {
        receivedMsg.value = state.reactToVue
      }
    }, true) // true 表示立即执行一次
  }
})

// 子 -> 父
const sendToMain = () => {
  if (!msgToMain.value.trim()) return
  props.sendToMain?.(msgToMain.value)
  msgToMain.value = ''
}

// 子 -> 子：通过全局状态
const sendToReact = () => {
  if (!msgToReact.value.trim()) return
  // qiankun 会自动注入 setGlobalState
  props.setGlobalState?.({ vueToReact: msgToReact.value })
  msgToReact.value = ''
}
</script>

<style scoped>
.vue-sub-app { padding: 20px; }
.header {
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #42b883, #35495e);
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
}
.header h2 { margin: 0; }
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #eee;
}
.card h3 {
  margin: 0 0 15px;
  font-size: 14px;
  color: #42b883;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.avatar { width: 50px; height: 50px; border-radius: 50%; }
.user-info p { margin: 3px 0; color: #333; }
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover { background: #35495e; }
.tip { font-size: 12px; color: #999; margin-top: 10px; }
.received {
  padding: 15px;
  background: #e8f5e9;
  border-radius: 4px;
  color: #2e7d32;
}
</style>
