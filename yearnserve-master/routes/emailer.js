var express = require('express');
const controller = require('../controller/emailerController')
var router = express.Router();
// // 发送邮件
router.post('/sendemail', controller.sendEmailer)
// 注册
router.post('/register', controller.Register)
// 登录
router.post('/login', controller.Login)
// 更新内容
router.put('/user', controller.updateUser)
//  获取前台用户
router.get('/', controller.findUser)
// 删除前台用户单个
router.get('/single', controller.delUserSingle)
// 删除多个用户
router.post('/delBatch', controller.delBatch)
// 修改密码
router.post('/changePassword', controller.changePassword)

module.exports = router