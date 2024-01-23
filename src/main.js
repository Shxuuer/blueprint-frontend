import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/axios/index.js'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/tailwind.css'

const app = createApp(App)

if (window.localStorage.getItem('token')) {
  // 刷新token
  await store.dispatch('loginByToken').catch(() => {
    message.error('登录过期，请重新登录！')
  })
}

app.provide('$axios', axios)
app.use(Antd).use(store).use(router)

app.mount('#app')
