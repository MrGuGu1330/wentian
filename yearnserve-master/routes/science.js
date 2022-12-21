var express = require('express');
var router = express.Router();
const controller = require('../controller/scienceController')

// 添加标签
router.post("/scienceLable", controller.addLabel);
// 查找标签
router.get('/scienceLable', controller.findLabel)
// 删除标签
router.delete('/scienceLable', controller.delLabel)
// 上传图片
router.post('/image', controller.updatedImage)
// 删除上传来的文章图片
router.post('/image/del', controller.delScienceImage)
// 上传科普内容
router.post('/', controller.addScienceArticle)
// 更新科普内容
router.put('/', controller.updateScienceArticle)
// 获取科普列表后端
router.get('/', controller.getScienceArticle)
// 获取前台列表
router.get('/front', controller.getScienceArticleFront)
// 查取个别的
router.get('/single', controller.findSingle)
// 删除科普文章
router.post("/del", controller.delArticle)
module.exports = router;