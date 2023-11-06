import { createStore } from 'vuex'
import axios from '@/axios'

export default createStore({
  state () {
    return {
      isLogin: false,
      userInfo: {
        username: '',
        role: ''
      }
    }
  },
  mutations: {

  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  },
  actions: {
    async login ({ state, commit }, { username, password }) {
      if (state.isLogin) return
      return axios.post('/user/log-in', {
        username,
        password
      }).then(res => {
        state.isLogin = true
        state.userInfo.username = res.data.data.username
        state.userInfo.role = res.data.data.role
        localStorage.setItem('token', res.data.data.token)
      })
    }
  }
})
