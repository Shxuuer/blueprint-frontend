import { createStore } from 'vuex'
import axios from '@/axios'
import { message } from 'ant-design-vue'

export default createStore({
  state () {
    return {
      userInfo: {
        username: '',
        role: 'unregistered',
        uid: '',
        token: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, res) {
      state.userInfo = res
      localStorage.setItem('token', res.token)
    }
  },
  getters: {
    userInfo: state => state.userInfo
  },
  actions: {
    // 登录事件
    async login ({ state, commit }, { phone, password }) {
      return axios.post('/user/log-in', {
        phone,
        password
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      })
    },
    // token尝试登录
    async loginByToken ({ state, commit }) {
      return axios({
        method: 'put',
        url: '/user/log-in',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      }).catch(() => {
        message.error('登录过期，请重新登录')
        localStorage.removeItem('token')
      })
    },
    // 登出
    async logout ({ state, commit }) {
      localStorage.removeItem('token')
      state.userInfo = {
        username: '',
        role: 'unregistered',
        uid: '',
        token: ''
      }
    },
    // 注册
    async register ({ state, commit }, { phone, password, username }) {
      return axios.post('/user/sign-up', {
        phone, password, username
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      })
    }
  }
})
