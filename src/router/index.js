import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 主功能区
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue')
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  // 工具
  {
    path: '/soil-monitoring',
    name: 'SoilMonitoring',
    component: () => import('@/views/tools/SoilMonitoring.vue')
  },
  {
    path: '/air-monitoring',
    name: 'AirMonitoring',
    component: () => import('@/views/tools/AirMonitoring.vue')
  }
]

export default createRouter({
  base: '/',
  history: createWebHashHistory(),
  routes
})
