<template>
  <div class="grandchild-app">
    <div class="header">
      <h3>🎯 孙子应用 (Grandchild)</h3>
      <span class="badge">嵌套层级: 主应用 → React子应用 → 我</span>
    </div>
    <div class="content">
      <p>✅ 我是被 React 子应用加载的孙子应用</p>
      <p>📍 当前路径: {{ currentPath }}</p>
      <p v-if="parentInfo">📨 来自父应用的数据: {{ parentInfo }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'

const qiankunProps = inject('qiankunProps', {})
const currentPath = ref(window.location.pathname)
const parentInfo = ref('')

onMounted(() => {
  if (qiankunProps.message) {
    parentInfo.value = qiankunProps.message
  }
})
</script>

<style>
.grandchild-app {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin: 10px 0;
}

.grandchild-app .header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.grandchild-app h3 {
  margin: 0;
  font-size: 18px;
}

.grandchild-app .badge {
  background: rgba(255,255,255,0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.grandchild-app .content {
  background: rgba(255,255,255,0.1);
  padding: 16px;
  border-radius: 8px;
}

.grandchild-app .content p {
  margin: 8px 0;
}
</style>
