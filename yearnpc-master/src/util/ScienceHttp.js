import axios from "./interceptors";
// 获取首屏科普显示
function getHomeScience(page = 1) {
  return axios.get(`science/front?page=${page}&limite=10`);
}
// 获取所有科普单条内容

function scienceGetSingle(id) {
  return axios.get(`science/single?id=${id}`);
}
// ${id}
export { getHomeScience, scienceGetSingle };
