var express = require('express');
var router = express.Router();
const controller = require('../controller/flowController')
// 添加
router.post('/', controller.addFlow)
// 获取
router.get('/', controller.findFlow)
// 获取单个
router.get('/single', controller.findFlowSingle)
// 更新
router.put('/', controller.updateFlow)
// 删除
router.delete('/:id', controller.delFlow)
module.exports = router;