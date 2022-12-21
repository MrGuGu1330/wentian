var express = require('express');
const controller = require('../controller/commentController.js')

var router = express.Router();
// 向上推的评论
router.post('/', controller.addComment)

// 推回复的评论
router.post('/reply', controller.addReply)

// 查找评论
router.get('/', controller.findComment)
// 查找所有评论
router.post('/all', controller.findAllComment)
// 删除单个评论
router.delete('/:id', controller.deleteComment)
// 删除多个评论
router.post('/delAll', controller.delAllComment)
// 添加留言
router.post('/talk', controller.addTalk);
// 获取留言
router.get('/talk', controller.findTalk);
// 删除留言
router.delete('/talk/:id', controller.delMessage)
// 删除多个留言
router.post('/talk/delAll', controller.delAll)
module.exports = router