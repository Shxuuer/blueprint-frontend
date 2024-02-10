import { createRouter, createWebHashHistory } from 'vue-router'
import message from 'ant-design-vue/es/message'
import store from '@/store'

// 用户角色定义为未登录、游客、管理员、超级管理员
// 权限管理方式为白名单，在路由中pass字段定义通行角色，未定义则默认全部通行
const userRole = {
  UNREGISTERED: 'unregistered',
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin'
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/LoginPage.vue'),
    meta: {
      pass: [userRole.UNREGISTERED]
    }
  },
  // 用户信息
  {
    path: '/user',
    name: 'UserInfo',
    component: () => import('@/views/user/UserInfo.vue'),
    meta: {
      pass: [userRole.CUSTOMER, userRole.ADMIN, userRole.SUPER_ADMIN]
    }
  },
  // 工具
  {
    path: '/soil-monitoring',
    name: 'SoilMonitoring',
    component: () => import('@/views/tools/SoilMonitoring.vue'),
    meta: {
      pass: [userRole.ADMIN, userRole.SUPER_ADMIN]
    }
  },
  {
    path: '/air-monitoring',
    name: 'AirMonitoring',
    component: () => import('@/views/tools/AirMonitoring.vue'),
    meta: {
      pass: [userRole.ADMIN, userRole.SUPER_ADMIN]
    }
  },
  {
    path: '/alert',
    name: 'Alert',
    component: () => import('@/views/tools/AlertInfo.vue'),
    meta: {
      pass: [userRole.ADMIN, userRole.SUPER_ADMIN]
    }
  },
  {
    path: '/UAVControl',
    name: 'UAVControl',
    component: () => import('@/views/tools/UAVControl.vue'),
    meta: {
      pass: [userRole.ADMIN, userRole.SUPER_ADMIN]
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  base: '/',
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  // 默认放行
  if (!to.meta.pass) return true
  // 白名单放行
  if (to.meta.pass.includes(store.getters.userInfo.role)) return true
  else if (store.getters.userInfo.role === userRole.UNREGISTERED) {
    // 未登录跳转登录
    message.warn('请先登录！')
    return '/login'
  } else {
    // 权限不足跳转主页
    message.warn('权限不足！')
    return '/home'
  }
})

export default router
