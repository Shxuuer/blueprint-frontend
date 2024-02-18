import axios from 'axios'

const instance = axios.create({
  baseURL: '/chang-shun/api',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 所有请求加上token头
  config.headers.token = localStorage.getItem('token') || undefined
  // 请求本地资源时，加上@前缀
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
