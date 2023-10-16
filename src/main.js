import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/axios/index.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/tailwind.css'

const app = createApp(App)
app.use(router).use(Antd).use(store)
app.provide('$axios', axios)

app.mount('#app')
