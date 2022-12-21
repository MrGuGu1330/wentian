// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;

// 定义我们的是数据类型
const frontPcType = {
  id: String,
  footer: String,
  info: String,
  title: String,
};
// 创建表并导出
const frontPcModel = mongoose.model("frontpc", new Schema(frontPcType));

module.exports = frontPcModel;
