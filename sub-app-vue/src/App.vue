<template>
  <div class="vue-sub-app">
    <div class="header">
      <h2>🟢 Vue 子应用</h2>
      <!-- 子应用内部导航 -->
      <nav class="sub-nav">
        <router-link to="/app-vue/communication">通信演示</router-link>
        <router-link to="/app-vue/list">列表页</router-link>
      </nav>
    </div>

    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<style>
.vue-sub-app { padding: 20px; }
.header {
  text-align: center;
  padding: 15px;
  background: linear-gradient(135deg, #42b883, #35495e);
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
}
.header h2 { margin: 0 0 10px; }
.sub-nav { display: flex; justify-content: center; gap: 20px; }
.sub-nav a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  padding: 5px 15px;
  border-radius: 4px;
  transition: all 0.2s;
}
.sub-nav a:hover,
.sub-nav a.router-link-active {
  background: rgba(255,255,255,0.2);
  color: white;
}
.page-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
}
</style>
