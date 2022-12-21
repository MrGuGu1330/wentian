import axios from "./interceptors.js";

function getCenterData () {
  return axios.get('center')
}

// 发送留言

function sendTalk ( talk, username, email) {
  return axios.post ('comment/talk',{
    talk, username, email
  })
}

export {
  getCenterData,
  sendTalk
}