import { createStore } from 'vuex'
import axios from '@/axios'

export default createStore({
  state () {
    return {
      isLogin: false,
      userInfo: {
        username: '',
        role: '',
        uid: '',
        token: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, res) {
      state.isLogin = true
      state.userInfo = res
      localStorage.setItem('token', res.token)
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  },
  actions: {
    async login ({ state, commit }, { phone, password }) {
      return axios.post('/user/log-in', {
        phone,
        password
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      })
    },
    async loginByToken ({ state, commit }) {
      return axios.put('/user/log-in', {
        token: localStorage.getItem('token')
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      })
    },
    async logout ({ state, commit }) {
      localStorage.removeItem('token')
      state.isLogin = false
    },
    async register ({ state, commit }, { phone, password, username }) {
      return axios.post('/user/sign-up', {
        phone, password, username
      }).then(res => {
        this.commit('setUserInfo', res.data.data)
      })
    }
  }
})
