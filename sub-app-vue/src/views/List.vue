<template>
  <div class="list-page">
    <h3>📋 列表页面</h3>
    <p class="tip">演示子应用内部路由跳转</p>
    
    <ul class="list">
      <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <span>{{ item.title }}</span>
        <span class="arrow">→</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const list = [
  { id: 1, title: '文章一：qiankun 入门指南' },
  { id: 2, title: '文章二：微前端通信方案' },
  { id: 3, title: '文章三：子应用路由配置' }
]

const goDetail = (id) => {
  router.push(`/app-vue/detail/${id}`)
}
</script>

<style scoped>
.list-page h3 { margin: 0 0 10px; color: #42b883; }
.tip { color: #999; font-size: 14px; margin-bottom: 20px; }
.list { list-style: none; padding: 0; }
.list li {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #f5f5f5;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.list li:hover { background: #e8f5e9; transform: translateX(5px); }
.arrow { color: #42b883; }
</style>
