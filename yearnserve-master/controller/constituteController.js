const service = require('../service/constituteService')
// 引入删除fs 模块
const delFile = require('../util/delFile.js')
const controller = {
  // 添加航天员
  async addConstitute (req, res) {
    let { introduce, astrinautName, source } = req.body
    source = source ? source : '自创'
    astrinautName = astrinautName ? astrinautName : '没有内容'
    introduce = introduce ? introduce : '没有内容'
    const file = req.file
      ? `uploadConstitute/${req.file.filename}`
      : 'images/3.jpg'
    data = await service.addConstitute(introduce, file, source, astrinautName)
    res.send({ ok: 1, info: '添加成功' })
  },
  // 获取航天员
  async findConstitute (req, res) {
    let { astrinautName } = req.query
    astrinautName = astrinautName ? new RegExp(astrinautName) : new RegExp('.')
    let data = await service.findConstitute(astrinautName)

    res.send({ ok: 1, inof: data })
  },
  // 更新宇航员内容 
  async updateConstitute (req, res) {
    let { id, oldFile } = req.body
    let file = req.file
    let where = req.body
    delete where.file

    if (file) {
      file = req.file
        ? `uploadConstitute/${req.file.filename}`
        : 'images/3.jpg'
      console.log(oldFile);
      oldFile && delFile(oldFile.split('/')[1], 'uploadConstitute')
      delete where.oldFile
      where = { ...where, file }
    }
    let data = await service.updateConstitute(id, where)
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
  // 删除
  async delConstitute (req, res) {
    const { id } = req.params
    let [file] = await service.findFConstituteFile(id)
    console.log(file?.file?.split('/')[1]);
    file && delFile(file?.file?.split('/')[1], 'uploadConstitute')
    await service.delConstitute(id)
    res.send({ ok: 1 })
  },
  async getSingLe (req, res) {
    const { id } = req.params
    let data = await service.getSingLe(id)
    res.send({ ok: 1, data })
  }
}
module.exports = controller