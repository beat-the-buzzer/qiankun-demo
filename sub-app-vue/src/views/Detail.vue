<template>
  <div class="detail-page">
    <h3>📄 详情页面</h3>
    
    <div class="content">
      <p><strong>文章 ID：</strong>{{ route.params.id }}</p>
      <p><strong>标题：</strong>{{ articleTitle }}</p>
      <p>这是文章的详细内容...</p>
    </div>
    
    <button @click="goBack">← 返回列表</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const titles = {
  1: 'qiankun 入门指南',
  2: '微前端通信方案',
  3: '子应用路由配置'
}

const articleTitle = computed(() => titles[route.params.id] || '未知文章')

const goBack = () => {
  router.push('/app-vue/list')
}
</script>

<style scoped>
.detail-page h3 { margin: 0 0 20px; color: #42b883; }
.content {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.content p { margin: 10px 0; }
button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover { background: #35495e; }
</style>
