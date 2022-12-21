var express = require('express');
var router = express.Router();
const controller = require('../controller/historyController')
// 上传图片
router.post('/images', controller.updatedImage)
// 上传历史
router.post('/', controller.addHistory)
// 删除文章图片
router.post('/delImage', controller.delHistoryImage)
// 获取文章列表
router.get('/', controller.findHistory)
// 查取个别
router.get('/single', controller.findArticleSingle1)
// 删除文章
router.post('/del', controller.delArticle)
// 修改历史文章
router.put('/', controller.updateArticle)
module.exports = router;
