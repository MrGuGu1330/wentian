const deFile = require('../util/delFile.js')
const service = require('../service/newService.js')

const controller = {

  // 上传新闻
  async addNews (req, res) {
    let { source, cover, Publisher, title, state } = req.body
    console.log(req.body);
    cover = cover ? cover : '4.jpg'
    if (!title || !Publisher) return res.send({ ok: 0, info: '上传失败' })
    let data = await service.addNews(source, cover, Publisher, title, state)
    if (data.releaseTime) {
      res.send({ ok: 1, info: '上传完成' })
    } else {
      res.send({ ok: 0, info: '上传失败' })
    }
  },

  // 上传图片
  async updatedImage (req, res) {
    if (!req.file) return res.send({ ok: 0, info: '上传失败' })
    const image = `uploadNew/${req.file.filename}`
    res.send({ ok: 1, imageUrl: image })
  },

  // 删除上传来的图片
  async delImage (req, res) {
    const { delImages } = req.body
    delImages?.forEach(item => {
      deFile(item, 'uploadNew')
    });
    res.send({ ok: 1 })
  },
  // 查找新闻列表
  async findNews (req, res) {
    let { page, limite, where } = req.query;
    page = page ? page : '1'
    limite = limite ? limite : '7'
    where = where ? JSON.parse(where) : {}
    where?.title && (where = { ...where, title: new RegExp(where.title) })
    where?.Publisher && (where = { ...where, Publisher: new RegExp(where.Publisher) })

    let data = await service.findNews(page, limite, where);
    res.send({ ok: 1, info: data });
  },
  // 查找单个的列表
  async findNewsSingle (req, res) {
    let { id } = req.query;
    if (!id) return res.send({ ok: 1 })
    let data = await service.findNewsSingle(id);
    res.send({ ok: 1, info: data });
  },
  async delNews (req, res) {
    let { id, images } = req.body
    // 删除文件夹中文件
    images?.length && images.forEach(item => {
      deFile(item, 'uploadNew')
    });
    let data = await service.delNews(id)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })
  },
  // updateNews
  async updateNews (req, res) {
    let { id, cover } = req.body
    cover = cover ? cover : '4.jpg'
    console.log(cover);
    const where = req.body
    let data = await service.updateNews(id, { ...where, cover })
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
  // findNewsFront
  // 查找新闻列表
  async findNewsFront (req, res) {
    let { page, limite, where } = req.query;
    page = page ? page : '1'
    limite = limite ? limite : '7'
    where = where ? JSON.parse(where) : {}
    where?.title && (where = { ...where, title: new RegExp(where.title) })
    where?.Publisher && (where = { ...where, Publisher: new RegExp(where.Publisher) })

    let data = await service.findNewsFront(page, limite, where);
    res.send({ ok: 1, info: data });
  },
}
module.exports = controller