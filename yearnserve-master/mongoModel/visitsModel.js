// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;
// 设置过期时间的
var moment = require('moment');

// 定义我们的是数据类型
const visitsType = new Schema({
  id: String,
  visits: String,
  createTime: String,
  createAt: {
    type: Date,
  }
});

// 创建表并导出
const VisitsModel = mongoose.model("visits", visitsType);
// 设置主键
VisitsModel.createIndexes(visitsType.index({ createAt: new moment().valueOf() }, { expireAfterSeconds: 0 }), function (err, info) { })

module.exports = VisitsModel;