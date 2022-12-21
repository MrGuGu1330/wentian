// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;

// 定义我们的是数据类型
const HistoryType = {
  title: String,
  info: String,
  createTime: String,
};
// 创建表并导出
const HistoryModel = mongoose.model("history", new Schema(HistoryType));

module.exports = HistoryModel;