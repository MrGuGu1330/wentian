var express = require('express');
var router = express.Router();
const controller = require('../controller/constituteController')
// 添加航天员
router.post('/', controller.addConstitute)
// 获取 管理员
router.get('/', controller.findConstitute)
// 获取单个
router.get('/single/:id',controller.getSingLe)
// 更新
router.put('/', controller.updateConstitute)
// 删除
router.delete('/:id', controller.delConstitute)
module.exports = router;