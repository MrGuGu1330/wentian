import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.2.141:9999/'
axios.defaults.baseURL = 'http://47.122.16.71:9999/'
// 定义初始化值
axios.interceptors.request.use(
  function (config) {

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 每次响应来设置token

axios.interceptors.response.use(
  function (response) {

    return response
  },
  function (error) {

    return Promise.reject(error)
  }
)

export default axios