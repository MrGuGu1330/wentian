const service = require('../service/centerService')
const controller = {
  // 添加center
  async addCenter (req, res) {
    let id = '1'
    let { title, contact, location, info } = req.body
    let data = await service.addCenter(id, { title, contact, location, info })
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
  //  获取到首页center的信息
  async getCenter (req, res) {
    let data = await service.getCenter()
    res.send({ ok: 0, info: { data: data, file: '/singleUploads/centerImage.jpg' } })
  },
}
module.exports = controller