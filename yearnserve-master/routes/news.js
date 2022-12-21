var express = require('express');
var router = express.Router();
const controller = require('../controller/newsController')
// 上传图片
router.post('/images', controller.updatedImage)
// 上传历史内容
router.post('/', controller.addNews)
// 删除上传来的新闻图片
router.post('/delImage', controller.delImage)
// 获取文章列表后台
router.get('/', controller.findNews)
// 获取文章列表前台
router.get('/front', controller.findNewsFront)
//  查取个别
router.get('/single', controller.findNewsSingle)
// 删除单个新闻
router.post('/del', controller.delNews)
// 修改历史文章
router.put('/', controller.updateNews)
module.exports = router;
