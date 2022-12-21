import axios from 'axios'
import Vue from "vue";

// 拦截请求
axios.interceptors.request.use(
  function (config) {
    
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 拦截响应
axios.interceptors.response.use(
  function (response) {

    return response
  },
  function (error) {

    return Promise.reject(error)
  }
)


axios.defaults.baseURL = Vue.prototype.$urlBase;

export default axios