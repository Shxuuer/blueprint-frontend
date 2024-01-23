import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 2500
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  config.headers.token = localStorage.getItem('token') || ''
  if (config.url.substring(0, 1) === '@') {
    config.baseURL = '/'
    config.url = config.url.substring(1)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
