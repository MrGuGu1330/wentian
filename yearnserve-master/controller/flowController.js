const service = require('../service/flowService')
// 引入删除fs 模块
const delFile = require('../util/delFile.js')

const controller = {
  // 添加
  async addFlow (req, res) {
    let { info } = req.body
    info = info ? info : '没有内容'
    const file = req.file
      ? `flowUploads/${req.file.filename}`
      : 'images/3.jpg'
    data = await service.addFlow(info, file)
    res.send({ ok: 1, info: '添加成功' })
  },
  // 查找
  async findFlow (req, res) {
    let { info } = req.query
    info = info ? info : ''
    info = new RegExp(info)
    let data = await service.findFlow(info);
    res.send(data);
  },
  // 更新
  async updateFlow (req, res) {
    let { id, info, oldFile } = req.body
    let where = {}
    if (req.file && info) {
      oldFile && delFile(oldFile, 'flowUploads')
      const file = `flowUploads/${req.file.filename}`
      where = { file, info }
    } else if (req.file) {
      oldFile && delFile(oldFile, 'flowUploads')
      where = { file }
    } else if (info) {
      where = { info }
    }
    const data = await service.updateFlow(id, where)
    res.send({ code: 200, ok: 1, info: '修改成功' })
  },
  // 删除
  async delFlow (req, res) {
    const { id } = req.params
    let [file] = await service.findFlowFile(id)
    console.log(file?.file?.split('/')[1]);
    file && delFile(file?.file?.split('/')[1], 'flowUploads')
    await service.delFlow(id)
    res.send({ ok: 1 })
  },
  // 查取单个
  async findFlowSingle (req, res) {
    const { id } = req.query
    let data = await service.findFlowSingle(id)
    res.send({ ok: 1, data })
  }
}

module.exports = controller