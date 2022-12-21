const service = require('../service/scienceService')
const deFile = require('../util/delFile.js')
const controller = {

  // 添加标签
  async addLabel (req, res) {
    const { scienceLable } = req.body
    const data = await service.addLabel(scienceLable)
    if (data.createTime) {
      res.send({ ok: 1, info: '添加完成' })
    } else {
      res.send({ ok: 0, info: '添加失败' })
    }
  },

  // 查找标签
  async findLabel (req, res) {
    let resPromise
    let data = await service.findLabel()
    if (data.length) {
      data = data.map(async item => {
        // 去查找标签对应的片数
        let r = await service.findArticleSingle(item.scienceLable)
        return { articleCount: r.length, createTime: item.createTime, scienceLable: item.scienceLable, id: item._id }
      });
      resPromise = await Promise.all(data)
      console.log(resPromise);
    }
    res.send({ ok: 1, stateCode: 200, info: resPromise || [], count: data.length })
  },

  // 删除标签
  async delLabel (req, res) {
    let { id } = req.query
    // 删除文件夹中文件
    let data = await service.delLabel(id)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })
  },

  // 上传图片
  async updatedImage (req, res) {
    if (!req.file) return res.send({ ok: 0, info: '上传失败' })
    const image = `scienceUpload/${req.file.filename}`
    res.send({ ok: 1, imageUrl: image })
  },

  // 删除上传来的图片
  async delScienceImage (req, res) {
    const { delImages } = req.body
    delImages.forEach(item => {
      deFile(item, 'scienceUpload')
    });
    res.send({ ok: 1 })
  },
  // 上传文章 
  async addScienceArticle (req, res) {

    let { title, info, scienceType, bg, reprinted } = req.body
    bg = bg ? bg : 'images/4.jpg'
    let data = await service.addArticle(title, info, scienceType, bg, reprinted)
    if (data.createTime) {
      res.send({ ok: 1, info: '上传完成' })
    } else {
      res.send({ ok: 0, info: '上传失败' })
    }
  },
  // 更新科普文章
  async updateScienceArticle (req, res) {
    let { id, bg } = req.body
    bg = bg ? bg : 'images/4.jpg'
    let data = await service.updateScienceArticle(id, req.body, bg)
    if (data.acknowledged) {
      res.send({ ok: 1, info: '修改成功' })
    } else {
      res.send({ ok: 0, info: '修改失败' })
    }
  },
  // 查找后台全部文章
  async getScienceArticle (req, res) {
    let { page, limite, where } = req.query;
    page = page ? page : '1'
    limite = limite ? limite : '7'
    where = where ? JSON.parse(where) : {}
    where?.title && (where = { ...where, title: new RegExp(where.title) })
    where?.info && (where = { ...where, info: new RegExp(where.info) })
    let data = await service.getAllList(page, limite, where);
    res.send({ ok: 1, info: data });
  },
  // 获取前台全部文章
  async getScienceArticleFront (req, res) {
    let { page, limite, where } = req.query;
    page = page ? page : '1'
    limite = limite ? limite : '7'
    where = where ? JSON.parse(where) : {}
    where?.title && (where = { ...where, title: new RegExp(where.title) })
    where?.info && (where = { ...where, info: new RegExp(where.info) })
    let data = await service.getScienceArticleFront(page, limite, where);
    res.send({ ok: 1, info: data });
  },
  // 查找单个文章
  async findSingle (req, res) {
    let { id } = req.query;
    if (!id) return res.send({ ok: 0, info: 'id 不能为空' });
    let data = await service.findSingle(id);
    res.send({ ok: 1, info: data });
  },
  // 删除科普文章
  async delArticle (req, res) {
    let { id, images } = req.body
    // 删除文件夹中文件
    images?.length && images.forEach(item => {
      deFile(item, 'scienceUpload')
    });
    let data = await service.delArticle(id)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })
  },
}
module.exports = controller