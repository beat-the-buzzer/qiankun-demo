<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo">
        <img src="/vite.svg" alt="logo" />
        <span v-show="!isCollapse">qiankun 通信演示</span>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :router="true"
        background-color="#001529"
        text-color="#ffffffa6"
        active-text-color="#fff"
        class="aside-menu"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu index="sub-apps">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>子应用</span>
          </template>
          <el-menu-item index="/app-vue">
            <template #title>Vue 子应用</template>
          </el-menu-item>
          <el-menu-item index="/app-vue/communication">
            <template #title>Vue 子应用 communication</template>
          </el-menu-item>
          <el-menu-item index="/app-vue/list">
            <template #title>Vue 子应用 list</template>
          </el-menu-item>
          <el-menu-item index="/app-react">
            <template #title>React 子应用</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </div>
        <div class="header-right">
          <!-- 消息提示 -->
          <el-badge :value="messageStore.list.length" :hidden="!messageStore.list.length">
            <el-button :icon="Bell" circle @click="showMessages = true" />
          </el-badge>

          <!-- 用户信息 -->
          <template v-if="userStore.isLogin">
            <el-avatar :size="32" :src="userStore.user.avatar" />
            <span class="username">{{ userStore.user.name }}</span>
            <el-button size="small" @click="handleLogout">退出</el-button>
          </template>
          <el-button v-else type="primary" size="small" @click="showLogin = true">登录</el-button>
        </div>
      </el-header>

      <el-main class="main">
        <router-view />
        <div id="subapp-container"></div>
      </el-main>
    </el-container>

    <!-- 登录弹窗 -->
    <el-dialog v-model="showLogin" title="用户登录" width="350px">
      <el-input v-model="loginForm.username" placeholder="输入用户名" @keyup.enter="handleLogin" />
      <template #footer>
        <el-button @click="showLogin = false">取消</el-button>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </template>
    </el-dialog>

    <!-- 消息抽屉 -->
    <el-drawer v-model="showMessages" title="📬 收到的消息（子→父）" size="350px">
      <div v-if="messageStore.list.length">
        <div v-for="msg in messageStore.list" :key="msg.id" class="msg-item">
          <div class="msg-header">
            <el-tag size="small">{{ msg.from }}</el-tag>
            <span class="msg-time">{{ msg.time }}</span>
          </div>
          <div class="msg-content">{{ msg.content }}</div>
        </div>
        <el-button type="danger" size="small" @click="messageStore.clear()">清空消息</el-button>
      </div>
      <el-empty v-else description="暂无消息" />
    </el-drawer>
  </el-container>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { Bell } from '@element-plus/icons-vue'
import { userStore, messageStore } from './store/user'

const route = useRoute()
const isCollapse = ref(false)
const showLogin = ref(false)
const showMessages = ref(false)
const loginForm = reactive({ username: '' })

const activeMenu = computed(() => route.path)

const handleLogin = () => {
  if (!loginForm.username.trim()) return
  userStore.login({
    id: Date.now(),
    name: loginForm.username,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'admin'
  })
  showLogin.value = false
  loginForm.username = ''
}

const handleLogout = () => {
  userStore.logout()
}
</script>

<style scoped>
.layout-container { height: 100vh; }
.aside { background-color: #001529; transition: width 0.3s; overflow: hidden; }
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-bottom: 1px solid #ffffff1a;
}
.logo img { width: 32px; }
.logo span { color: #fff; font-size: 14px; font-weight: 600; white-space: nowrap; }
.aside-menu { border-right: none; }
.aside-menu:not(.el-menu--collapse) { width: 220px; }
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.header-left { display: flex; align-items: center; }
.collapse-btn { font-size: 20px; cursor: pointer; color: #666; }
.header-right { display: flex; align-items: center; gap: 15px; }
.username { color: #333; }
.main { background: #f0f2f5; padding: 20px; overflow: auto; }
#subapp-container { min-height: calc(100vh - 180px); background: #fff; border-radius: 4px; }
#subapp-container:empty { display: none; }

.msg-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}
.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.msg-time { font-size: 12px; color: #999; }
.msg-content { color: #333; }
</style>
