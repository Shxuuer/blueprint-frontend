import { createRouter, createWebHashHistory } from 'vue-router'
import message from 'ant-design-vue/es/message'
import store from '@/store'

// 未注册、游客、管理员、超级管理员分别定义为0、1、2、3
const userRole = {
  UNREGISTERED: 0,
  CUSTOMER: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3
}

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
    path: '/user',
    name: 'Login',
    component: () => import('@/views/user/LoginPage.vue')
  },
  // 用户信息
  {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('@/views/user/UserInfo.vue')
  },
  // 工具
  {
    path: '/soil-monitoring',
    name: 'SoilMonitoring',
    component: () => import('@/views/tools/SoilMonitoring.vue'),
    meta: {
      requireAuth: userRole.ADMIN
    }
  },
  {
    path: '/air-monitoring',
    name: 'AirMonitoring',
    component: () => import('@/views/tools/AirMonitoring.vue'),
    meta: {
      requireAuth: userRole.ADMIN
    }
  },
  {
    path: '/alert',
    name: 'Alert',
    component: () => import('@/views/tools/AlertInfo.vue'),
    meta: {
      requireAuth: userRole.ADMIN
    }
  }
]

const router = createRouter({
  base: '/',
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  // 正常放行
  if (!to.meta.requireAuth) return true
  // 未登录
  if (to.meta.requireAuth > userRole.UNREGISTERED && !store.getters.isLogin) {
    message.warn('请先登录！')
    return '/user'
  }
  // 权限不足
  const auth = { customer: userRole.CUSTOMER, admin: userRole.ADMIN, super_admin: userRole.SUPER_ADMIN }
  if (auth[store.getters.userInfo.role] < to.meta.requireAuth) {
    message.warn('权限不足！')
    return '/home'
  }
  return true
})

export default router
