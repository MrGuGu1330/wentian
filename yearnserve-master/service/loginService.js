const userModel = require("../mongoModel/userModel")

const service = {
  // login 登录页面
  find (username, password) {
    return userModel.find({ username, password })
  },
  // 查找重复文件名
  findUsername (username) {
    return userModel.find({ username })
  },
  // 创建一个管理员用户
  create (username, password, avatar, type) {
    const createTime = Date.now()
    return userModel.create({
      username,
      password,
      avatar,
      type,
      createTime
    })
  },
  // 查找全部用户
  findAll () {
    return userModel.find({}, ['username', 'avatar', 'createTime'])
  },
  // 删除用户
  del (id) {
    return userModel.deleteOne({ _id: id })
  },
  // 删除多个用户
  delBatch (delBatchItem) {
    return userModel.deleteMany({
      _id: {
        $in: delBatchItem
      }
    })
  },
  // 查找单个管理全部信息
  findMessage (username) {
    return userModel.find({ username })
  },
  // 修改管理员信息
  updataUser (message, username) {
    return userModel.updateOne({ username }, message)
  },
  // 给首页查取数据
  async getAllLenght () {
    let admin = (await userModel.find()).length
    return { admin }
  }
}

module.exports = service