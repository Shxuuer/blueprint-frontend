import { createStore } from 'vuex'
import axios from '@/axios'

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
      }).catch(() => {
        localStorage.removeItem('token')
      })
    },
    async logout ({ state, commit }) {
      localStorage.removeItem('token')
      state.userInfo = {
        username: '',
        role: 'unregistered',
        uid: '',
        token: ''
      }
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
