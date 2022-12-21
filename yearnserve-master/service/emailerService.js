var moment = require('moment');

const authCodeModel = require('../mongoModel/authCodeModel')
const pcuserModel = require('../mongoModel/pcUserModel')
const service = {
  addCode (code) {
    return authCodeModel.create({
      createTime: Date.now(),
      createAt: moment().add(5, 'minutes').toDate(),
      code
    })
  },
  findEmailer (email, password) {
    return pcuserModel.find({ email, password })
  },
  Register (code) {
    return authCodeModel.find({ code })
  },
  // 前台注册用户
  addUser (email, username, password, avatar) {
    return pcuserModel.create({
      createTime: Date.now(),
      email,
      username,
      password,
      avatar
    })
  },
  updateUser (email, where) {
    return pcuserModel.updateOne({ email }, where)
  },
  // 查找
  async findUser (page, limite, where) {
    let count = await pcuserModel.find(where).count();
    let data = await pcuserModel.find(where).skip((page - 1) * limite).sort({ createTime: -1 }).limit(limite);
    return { count, data };
  },
  // 删除单个
  delUserSingle (_id) {
    return pcuserModel.deleteOne({ _id })
  },
  // 删除多个用户
  delBatch (delBatchItem) {
    return pcuserModel.deleteMany({
      _id: {
        $in: delBatchItem
      }
    })
  },
}
module.exports = service