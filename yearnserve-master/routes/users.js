var express = require('express');
var router = express.Router();
const loginController = require('../controller/loginController')
// 添加管理员
router.post("/", loginController.add)


/* 获取管理员所有信息 */
router.get('/userAll', loginController.findAll);

// 删除管理员
router.delete('/:id/:token/:filename', loginController.del);

// 删除多个管理员
router.post("/delBatch", loginController.delBatch)

// 查询单个管理员信息
router.get('/', loginController.findMessage)

// 修改管理员名字
router.put("/username", loginController.updataUsername)
// 修改管理员头像
router.post("/avatar", loginController.updataAvatar)
// 修改管理员密码
router.put("/password", loginController.updataPassword)

// 每回跳转页面都会请求这个方便token 拦截
router.get('/redirect', (req, res) => {
  res.send()
})
module.exports = router;
