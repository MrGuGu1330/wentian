// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;

// 定义我们的是数据类型
const commentType = {
  nickName: String,
  avatar: String,
  content: String,
  createDate: String,
  articleId: String,
  articleTitle: String,
  articleType: String,
};
// 创建表并导出
const commentModel = mongoose.model("comment", new Schema(commentType));

module.exports = commentModel;