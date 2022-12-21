var express = require('express');
const loginController = require('../controller/loginController')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('1223');
});
// 登录
router.post("/", loginController.find)

module.exports = router;