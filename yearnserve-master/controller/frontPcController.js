const service = require('../service/frontPcService')
const scienceService = require('../service/scienceService')
const flowService = require('../service/flowService')
const newService = require('../service/newService')
const constituteService = require('../service/constituteService')
const historyService = require('../service/historyService')
const loginService = require('../service/loginService')

const controller = {
  async addfrontInfo (req, res) {
    let id = '1'
    let { footer, info, title } = req.body
    let data = await service.addfrontInfo(id, { title, footer, info })
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
  async getfrontInfo (req, res) {
    let data = await service.getfrontInfo()
    res.send({ ok: 0, info: { data: data, file: '/singleUploads/frontpcImg.jpg' } })
  },
  // 获取后台首页
  async getEndData (req, res) {

    let data = await Promise.all([
      scienceService.getAllLenght(),
      flowService.getAllLenght(),
      newService.getAllLenght(),
      loginService.getAllLenght(),
      historyService.getAllLenght(),
      constituteService.getAllLenght(),
      service.getVists()
    ])
    res.send(data)
  }
}

module.exports = controller