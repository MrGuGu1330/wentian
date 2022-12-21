const mongoose = require("mongoose");

// 连接好了数据库并且 创建了一个叫wangba 的数据库
mongoose.connect("mongodb://127.0.0.1:27017/yearnDB").catch((error) => error);;