import axios from "./interceptors.js";
// 发送验证码
function sendCode (email) {
  return axios.post('emailer/sendemail', { email })
}

// 注册
function registered (code, email, username, password) {
  return axios.post('emailer/register', { code, email, username, password })
}

// 登录用户
function login (email, password, code) {
  return axios.post('emailer/login', { email, password, code })
}
// 更新用户
function updateUser (where) {
  return axios.put('emailer/user', where, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
// 修改密码
function setPassword (email, password) {
  return axios.post('emailer/changePassword', { email, password })
}

export {
  sendCode,
  login,
  updateUser,
  setPassword,
  registered
}