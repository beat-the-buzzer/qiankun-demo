import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  // 子应用路由占位
  {
    path: '/app-vue/:pathMatch(.*)*',
    name: 'AppVue',
    component: { render: () => null }
  },
  {
    path: '/app-react/:pathMatch(.*)*',
    name: 'AppReact',
    component: { render: () => null }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
