const frontModel = require("../mongoModel/frontPcModel")
const visitsModel = require("../mongoModel/visitsModel")
var moment = require('moment');

const service = {
  // 添加
  async addfrontInfo (id, where) {
    // 修改前端center
    let data = await frontModel.find({ id })
    if (data.length) {
      return frontModel.updateOne({ id }, {
        ...where,
      })
    } else {
      return frontModel.create({
        id,
        ...where,
      })
    }
  },
  async getfrontInfo () {
    let data = await visitsModel.find({ createTime: new Date().getMonth() + "/" + new Date().getDate() })
    if (data.length) {
      let visits = Number(data[0].visits) + 1
      await visitsModel.updateOne({ createTime: new Date().getMonth() + "/" + new Date().getDate() }, { visits })
    } else {
      let visits = 1
      await visitsModel.create({
        createTime: new Date().getMonth() + "/" + new Date().getDate(), visits,
        createAt: moment().add(7, 'days').toDate(),//120分钟后过期，实际上可能有十几秒的延迟 
      })
    }

    return frontModel.find()
  },
  // 获取用户访问量
  getVists () {
    return visitsModel.find()
  }
}
module.exports = service