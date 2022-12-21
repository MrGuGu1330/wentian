const centerModel = require('../mongoModel/centerModel')

const service = {
  // 修改前端center
  async addCenter (id, where) {
    let data = await centerModel.find({ id })
    if (data.length) {
      return centerModel.updateOne({ id }, {
        ...where,
      })
    } else {
      return centerModel.create({
        id,
        ...where,
      })
    }
  },
  // 获取center
  getCenter () {
    return centerModel.find()
  }
}

module.exports = service