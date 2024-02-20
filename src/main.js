import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/axios/index.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/tailwind.css'

const app = createApp(App)

if (window.localStorage.getItem('token')) {
  // 刷新token/尝试使用token登录
  await store.dispatch('loginByToken')
}

app.provide('$axios', axios)
app.use(Antd).use(store).use(router)

app.mount('#app')
