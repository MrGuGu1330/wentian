const constituteModel = require('../mongoModel/constituteModel')

const service = {
  // 添加文件
  addConstitute (introduce, file, source, astrinautName) {
    return constituteModel.create({
      createTime: Date.now(),
      introduce,
      file,
      source,
      astrinautName
    })
  },
  // 查找宇航员
  async findConstitute (astrinautName) {
    let count = await constituteModel.find().count();
    let data = await constituteModel
      .find({ astrinautName })
      .sort({ createTime: -1 })
    return { count, data }
  },
  // 更新宇航员
  updateConstitute (_id, where) {
    return constituteModel.updateOne({ _id }, where)
  },
  // 查找id对应的名字
  findFConstituteFile (id) {
    return constituteModel.find({ _id: id })
  },
  // 删除宇航员delConstitute
  delConstitute (_id) {
    return constituteModel.deleteOne({ _id })
  },
  // 给首页查取数据
  async getAllLenght () {
    let astrinaut = (await constituteModel.find()).length
    return { astrinaut }
  },
  // 获取单个
  getSingLe (_id) {
    return constituteModel.find({ _id })
  }
}

module.exports = service