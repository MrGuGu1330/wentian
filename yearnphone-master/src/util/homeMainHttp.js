import axios from "./interceptors.js";
// 获取基础流程
function getBannerData () {
  return axios.get('flow')
}
// 获取页面管理
function getFront () {
  return axios.get('frontpc')
}

// 获取航天英雄
function getHomeHero () {
  return axios.get('constitute')
}
// 获取新闻数据
function getHomeNews (page = 1, limite = 4, where = {}) {
  return axios.get(`news/front?page=${page}&limite=${limite}&where=${JSON.stringify(where)}`)
}
// 获取科普数据
function getHomeScience (page = 1, limite = 2, where = {}) {
  return axios.get(`science/front?page=${page}&limite=${limite}&where=${JSON.stringify(where)}`)
}

// 获取新闻详情
function getNewsDeatils (id) {
  return axios.get(`news/single?id=${id}`)
}
// 获取科普详情
function getScienceDeatils (id) {
  return axios.get(`science/single?id=${id}`)
}
export {
  getBannerData,
  getHomeHero,
  getHomeNews,
  getHomeScience,
  getNewsDeatils,
  getScienceDeatils,
  getFront
}