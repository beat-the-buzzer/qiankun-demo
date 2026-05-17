import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/app-vue',
    redirect: '/app-vue/communication'
  },
  {
    path: '/app-vue/communication',
    name: 'Communication',
    component: () => import('../views/Communication.vue')
  },
  {
    path: '/app-vue/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/app-vue/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  }
]

const router = createRouter({
  // ⭐ 子应用必须使用主应用的 history 基础路径
  history: createWebHistory(),
  routes
})

export default router
