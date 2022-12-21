// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;
// 设置过期时间的
var moment = require('moment');

// 定义我们的是数据类型
const codeType = new Schema({
  code: String,
  createTime: String,
  createAt: {
    type: Date,
  }
});

// 创建表并导出
const authCodeModel = mongoose.model("authcode", codeType);
// 设置主键
authCodeModel.createIndexes(codeType.index({ createAt: new moment().valueOf() }, { expireAfterSeconds: 0 }), function (err, info) { })

module.exports = authCodeModel;