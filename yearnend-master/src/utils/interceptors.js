import axios from 'axios'
// 定义初始化值
// 每次请求都会携带token
axios.interceptors.request.use(
  function (config) {
    config.headers.token = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 每次响应来设置token

axios.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    localStorage.removeItem('token')
    // 重新 加载触发全局守卫
    location.replace('#/login')
    return Promise.reject(error)
  }
)
export default axios