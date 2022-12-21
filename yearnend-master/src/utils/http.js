// 兄弟门(·们·赵班错别字-.-)合并的时候导入axios主要以这个为主 不要原来直接导入那种了
import axios from './interceptors.js'
import Vue from 'vue'
axios.defaults.baseURL = Vue.prototype.$urlBase

// 历史页部分
//  历史：上传历史图片
function historyImge (data) {
  return axios.post('history/images', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
//  历史：上传历史内容
function historyContent (info) {
  return axios.post('history', info)
}
//  历史：删除历史图片
function historyDelImage (delImages) {
  return axios.post('history/delImage', { delImages })
}

// 历史：查询列表
function queryAllhistory (page, where = {}) {
  return axios.get(
    `history?page=${page}&limite=4&where=${JSON.stringify(where)}`
  )
}
// 历史：删除列表历史文章
function historyDelList (id, images) {
  return axios.post('history/del', { id, images })
}

//  历史：修改列表内容
function historyCorrect (id, title, info) {
  return axios.put('history', { id, title, info })
}

// 历史:获取
function historyGetSingle (id) {
  return axios.get(`history/single?id=${id}`)
}
// 历史end

/** 基础流程部分 */
// 基础流程：上传流程内容
function baseContent (info) {
  return axios.post('flow', info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 基础流程：查找流程，模糊查询
function baseFind (info) {
  return axios.get(`flow?info=${info}`)
}

// 基础流程：修改流程
function baseChanged (info) {
  return axios.put('flow', info)
}

// 基础流程: 删除
function basedelete (id) {
  return axios.delete(`flow/${id}`)
}

// 基础流程: 获取单个流程内容
function baseOnly (id) {
  return axios.get(`flow/single?id=${id}`)
}
//基础流程：更新基础流程
function updateOnly (fd) {
  return axios.put('flow', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 界面：获取
function frontPage () {
  return axios.get('frontpc')
}
//界面：提交
function frontPageSubmit (title, info, footer) {
  return axios.post('frontpc', {
    title,
    info,
    footer,
  })
}

// login: 登录验证
function loginVerify (info) {
  return axios.post('login', info)
}

// 管理员: 添加管理
function addAdmin (fd) {
  return axios.post('users', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 管理员：管理员列表
function getAdminAll () {
  return axios.get('users/userAll')
}

// 管理员：删除管理员
function delAdmin (id, token, filename) {
  return axios.delete(`users/${id}/${token}/${filename}`)
}
// 管理员：删除多个
function delAdminBatch (delBatchItem, filenames) {
  return axios.post('users/delBatch', {
    delBatchItem,
    token: localStorage.getItem('token'),
    filenames,
  })
}

// 管理员:获取当前管理员
function getCurrentAdmin () {
  return axios.get(`users?token=${localStorage.getItem('token')}`)
}

// 管理员：修改用户名
function setAdminUsername (username) {
  return axios.put('users/username', {
    token: localStorage.getItem('token'),
    username,
  })
}

// 管理员：修改用户头像
function setAdminAvatar (fd) {
  return axios.post('users/avatar', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 管理员：修改用户密码
function setAdminPassword (password) {
  return axios.put('users/password', {
    token: localStorage.getItem('token'),
    password,
  })
}
// 航天新闻
// 新闻：上传新闻图片
function newsImge (data) {
  return axios.post('news/images', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
// 科普：分类科普
function getLabaleScience () {
  return axios.get('science/scienceLable')
}
// 科普：删除标签
function delLabaleScience (id) {
  // ?id=6371e341645fa21993d93d6c
  return axios.delete(`science/scienceLable?id=${id}`)
}
// 科普：添加科普标签
function addLabaleScience (scienceLable) {
  return axios.post('science/scienceLable', { scienceLable })
}
// 科普：删除科普中内容图片
function scienceDelImage (delImages) {
  return axios.post('science/image/del', { delImages })
}

// 科普：上传科普内容中的图片
function scienceContentImage (info) {
  return axios.post('science/image', info)
}
// 上传科普内容
function scienceContent (info) {
  return axios.post('science', info)
}
// 更新科普内容
function scienceUpdateContent (id, title, info, scienceType, reprinted, bg) {
  console.log(11212)
  return axios.put('science', { id, title, info, scienceType, reprinted, bg })
}

// 航天员：发送
function sendConstitute (info) {
  return axios.post('constitute', info, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 航天员：获取
function getAstrinaut (astrinautName = '') {
  return axios.get(`constitute?astrinautName=${astrinautName}`)
}

//航天员：删除
function delAstrinaut (id) {
  return axios.delete(`constitute/${id}`)
}

// 航天员：根据id查找宇航员
function findAstrinaut (id) {
  return axios.get(`constitute/single/${id}`)
}
// 关于end

// 航天员：修改航天员信息
function updateAstrinaut (where) {
  return axios.put('constitute', where, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
//科普：后台获取数据列表
function queryAllscience (page, where = {}) {
  return axios.get(
    `science?page=${page}&limite=5&where=${JSON.stringify(where)}`
  )
}
//科普：前台获取数据内容
function queryFrontAllscience (page, where = {}) {
  return axios.get(`front?page=${page}&limite=7&where=${JSON.stringify(where)}`)
}
//科普：获取个别的科普文章
function scienceGetSingle (id) {
  return axios.get(`science/single?id=${id}`)
}
// 科普：删除科普文章
function delScienceArtical (id, images) {
  // ?id=6371e341645fa21993d93d6c
  return axios.post(`science/del`, { id, images })
}
// 新闻：上传新闻内容
function newsContent (info) {
  return axios.post('news', info)
}
// 新闻：删除新闻图片
function newsDelImage (delImages) {
  return axios.post('news/delImage', { delImages })
}
// 新闻：删除单条新闻
function newsDel (id, images) {
  return axios.post('news/del', { id, images })
}
// 新闻：分页查询
function queryAllnews (page, where = {}) {
  return axios.get(`news?page=${page}&limite=5&where=${JSON.stringify(where)}`)
}
// 新闻：单条新闻查询
function Allnews (id) {
  return axios.get(`news/single?id=${id}`)
}
//  新闻：修改新闻列表内容
function newsCorrect (id, title, source, Publisher, state, cover) {
  return axios.put('news', { id, title, source, Publisher, state, cover })
}
// 新闻：查找前端新闻
function frontNews (page, where = {}) {
  return axios.get(
    `news/front?page=${page}&limite=5&where=${JSON.stringify(where)}`
  )
}

// 关于start
// 关于数据： 获取
function getAbout () {
  return axios.get('center')
}
// 关于：修改
function updateAbout (data) {
  return axios.post('center', data)
}
// 关于end
// 后台首页 :获取首页数据
function getHomePage () {
  return axios.get('frontpc/endMain')
}

// 后台首页 :获取首页科普数据
function getHomePageScience () {
  return axios.get('science/scienceLable')
}

// 用户管理
// 用户管理 :获取列表
function getAllUser (page = 1, username = '', email = '') {
  return axios.get(
    `emailer?username=${username}&email=${email}&page=${page}&limite=5`
  )
}

// 用户管理 :删除单个
function delUser (id, filename) {
  return axios.get(`emailer/single?id=${id}&filename=${filename}`)
}

// 用户管理 :删除多个
function delBatch (delBatchItem, filenames) {
  return axios.post('emailer/delBatch', {
    delBatchItem,
    filenames,
  })
}
// 评论获取 
function getComment (page = 1, articleTitle = '', nickName = '', articleType = '') {
  return axios.post('comment/all', { page, limit: '8', articleTitle, nickName, articleType })
}
// 删除单个评论
function delCommenSingle (id = '1111') {
  return axios.delete(`comment/${id}`)
}
// 删除多个评论
function delCommentAll (ids) {
  return axios.post('comment/delAll', { ids })
}
// 获取留言
function getMessage (page = 1, message) {
  return axios.get(`comment/talk?page=${page}&limite=7&message=${message}`)
}
// 删除单个留言
function delSingleMessage (id) {
  return axios.delete(`comment/talk/${id}`)
}
// 删除多个留言
function delMessageAll (ids) {
  return axios.post(`comment/talk/delAll`, { ids })
}
export {
  historyImge,
  historyContent,
  historyDelImage,
  baseContent,
  baseFind,
  baseChanged,
  getAbout,
  updateAbout,
  sendConstitute,
  getAstrinaut,
  basedelete,
  baseOnly,
  loginVerify,
  addAdmin,
  getAdminAll,
  delAdmin,
  delAdminBatch,
  getCurrentAdmin,
  setAdminUsername,
  setAdminAvatar,
  setAdminPassword,
  frontPageSubmit,
  queryAllhistory,
  historyDelList,
  historyCorrect,
  historyGetSingle,
  frontPage,
  getLabaleScience,
  delLabaleScience,
  addLabaleScience,
  scienceDelImage,
  scienceContentImage,
  scienceUpdateContent,
  scienceGetSingle,
  delScienceArtical,
  queryFrontAllscience,
  queryAllscience,
  scienceContent,
  updateOnly,
  frontNews,
  newsCorrect,
  Allnews,
  queryAllnews,
  newsDel,
  newsDelImage,
  newsContent,
  newsImge,
  delAstrinaut,
  findAstrinaut,
  updateAstrinaut,
  getHomePage,
  getHomePageScience,
  getAllUser,
  delUser,
  delBatch,
  getComment,
  delCommenSingle,
  delCommentAll,
  getMessage,
  delSingleMessage,
  delMessageAll
}
