import axios from "./interceptors";
// 发送验证码注册

function sendEmailCode (email) {
  return axios.post('emailer/sendemail', { email })
}
// 注册用户
function register (email, code, username, password) {
  return axios.post('emailer/register', { email, code, username, password })
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
function changePassword (email, password) {
  return axios.post('emailer/changePassword', { email, password })
}
export {
  sendEmailCode,
  register,
  login,
  updateUser,
  changePassword
}