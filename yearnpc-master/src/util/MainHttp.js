import axios from "./interceptors";

// 这里写自己的逻辑  一人一个文件
// 获取首屏显示
function getHomeData() {
  return axios.get("frontpc");
}

// 获取首屏新闻显示
function getHomeNews() {
  return axios.get("news/front?page=1&limite=5");
}

// 获取首屏科普显示
function getHomeScience() {
  return axios.get("science/front?page=1&limite=8");
}
// 获取历史首屏 显示
function getHistorty(page = 1) {
  return axios.get(`history?page=${page}&limite=8`);
}
// 获取基础流程
function getBaseHome() {
  return axios.get("flow");
}
// 获取英雄
function getHeroHome() {
  return axios.get("constitute");
}
// 获取关于我们
function getRegardingOur() {
  return axios.get('center')
}
export {
  getHomeData,
  getHomeNews,
  getHomeScience,
  getHistorty,
  getBaseHome,
  getHeroHome,
  getRegardingOur
}