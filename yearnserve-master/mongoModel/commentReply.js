// 要创建的一个 模板并且创建一个表
// 先导入mongoose
const mongoose = require("mongoose");
//定义我们的Schema 这个方法来个限定
const Schema = mongoose.Schema;

// 定义我们的是数据类型
const commentReolyType = {
  nickName: String,
  avatar: String,
  createDate: String,
  mainIp: String,
  content: String,
  targetId: String,
  articleId: String,
  articleTitle: String,
  articleType: String,
};
// 创建表并导出
const commentReply = mongoose.model("commentReply", new Schema(commentReolyType));

module.exports = commentReply;