import axios from "./interceptors";

// 获取历史首屏 显示
function getHistortyData (limite = 16) {
  return axios.get(`history?page=1&limite=${limite}`);
}

export { getHistortyData };
