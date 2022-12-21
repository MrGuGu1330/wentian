import axios from "./interceptors";
import Vue from 'vue'
axios.defaults.baseURL = Vue.prototype.$urlBase

// 新闻：查找前端新闻
function frontNews (page, where = {}) {
    return axios.get(
      `news/front?page=${page}&limite=5&where=${JSON.stringify(where)}`
    );
  }
// 新闻：单条新闻查询
function Allnews(id) {
  return axios.get(`news/single?id=${id}`);
}
  
export {
    frontNews,Allnews
}