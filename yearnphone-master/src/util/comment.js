import axios from "./interceptors.js";

// 添加评论
function addCommentHttp (nickName, avatar, content, articleId, articleTitle, articleType) {
  return axios.post('comment/', { nickName, avatar, content, articleId, articleTitle, articleType })
}
// 添加回复
function addReply (nickName, avatar, mainIp, content, targetId, articleId, articleTitle, articleType) {
  return axios.post('comment/reply', { nickName, avatar, mainIp, content, targetId, articleId, articleTitle, articleType })
}
// 查询评论
function findComment (articleId = '') {
  return axios.get(`comment?articleId=${articleId}`)
}

export { addCommentHttp, addReply, findComment };
