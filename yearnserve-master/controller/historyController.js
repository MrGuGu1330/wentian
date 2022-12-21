const deFile = require('../util/delFile.js')
const service = require('../service/historyService.js')

const controller = {


  // 上传图片
  async updatedImage (req, res) {
    if (!req.file) return res.send({ ok: 0, info: '上传失败' })
    const image = `historyUploads/${req.file.filename}`
    res.send({ ok: 1, imageUrl: image })
  },
  // addHistory
  // 上传历史
  async addHistory (req, res) {
    let { title, info } = req.body
    if (!title || !info) return res.send({ ok: 0, info: '上传失败' })
    let data = await service.addHistory(title, info)
    if (data.createTime) {
      res.send({ ok: 1, info: '上传完成' })
    } else {
      res.send({ ok: 0, info: '上传失败' })
    }
  },
  // 查找历史列表
  async findHistory (req, res) {
    let { page, limite, where } = req.query;
    page = page ? page : '1'
    limite = limite ? limite : '7'
    where = where ? JSON.parse(where) : {}
    where?.title && (where = { title: new RegExp(where.title) })
    let data = await service.findHistory(page, limite, where);
    res.send({ ok: 1, info: data });
  },
  // 删除上传来的图片
  async delHistoryImage (req, res) {
    const { delImages } = req.body
    delImages.forEach(item => {
      console.log(item);
      deFile(item, 'historyUploads')
    });
    res.send({ ok: 1 })
  },
  // 查找单个文章
  // 查找单个文章
  async findArticleSingle1 (req, res) {
    let { id } = req.query;
    if (!id) return
    let data = await service.findArticleSingle1(id);
    res.send({ ok: 1, info: data });
  },
  // 删除文章
  async delArticle (req, res) {
    let { id, images } = req.body
    // 删除文件夹中文件
    images?.length && images.forEach(item => {
      deFile(item, 'historyUploads')
    });
    let data = await service.delArticle(id)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })
  },
  // 修改文章
  async updateArticle (req, res) {
    let { id } = req.body
    let data = await service.updateArticle(id, req.body)
    console.log(data);
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
}
// 技术
module.exports = controller