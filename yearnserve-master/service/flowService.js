const flowModel = require("../mongoModel/flowModel")

const service = {
  // 添加
  addFlow (info, file) {
    return flowModel.create({ info, file, createTime: Date.now() })
  },
  // 查找
  async findFlow (info) {
    let count = await flowModel.find().count();
    let data = await flowModel.find({ info })
    return { ok: 1, count, data }
  },
  // 查找id对应的名字
  findFlowFile (id) {
    return flowModel.find({ _id: id })
  },
  // 修改
  updateFlow (id, where) {
    return flowModel.updateOne({ _id: id }, where)
  },
  // 删除
  delFlow (_id) {
    return flowModel.deleteOne({ _id })
  },
  // 查取单个
  findFlowSingle (_id) {
    return flowModel.find({ _id })
  },
  // 给首页查取数据
  async getAllLenght () {
    let flow = (await flowModel.find()).length
    return { flow }
  }
}

module.exports = service