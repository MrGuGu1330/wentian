var express = require('express');
var router = express.Router();
const controller = require('../controller/centerController')

// 上传center 图片
router.post('/centerImg', function (req, res) {
  res.send({ ok: 1 })
})
// 上传基本信息
router.post('/', controller.addCenter)
// 获取到个人页面的信息
router.get('/', controller.getCenter)

module.exports = router;
