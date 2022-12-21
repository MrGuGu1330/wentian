var express = require('express');
var router = express.Router();
const frontController = require('../controller/frontPcController')
// 上传底部栏Img
router.post('/frontpcImg', (req, res) => {
  res.send()
})
// 上传内容
router.post('/', frontController.addfrontInfo)
// 获取的信息
router.get('/', frontController.getfrontInfo)
// 获取后台信息

router.get('/endMain', frontController.getEndData)
module.exports = router;