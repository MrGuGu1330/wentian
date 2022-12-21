const LabelModel = require('../mongoModel/scienceLableModel')
const scienceArticle = require('../mongoModel/scienceArticle')
const service = {
  // 创建对应标签
  addLabel (scienceLable) {
    return LabelModel.create({
      scienceLable,
      createTime: Date.now(),
    })
  },
  // 查找对应标签
  findLabel () {
    return LabelModel.find()
  },
  // 查找对应的文章片数
  findArticleSingle (where) {
    return scienceArticle.find({ scienceType: where })
  },
  // 删除对应标签
  delLabel (id) {
    return LabelModel.deleteOne({ _id: id })
  },

  // 添加对应文章
  addArticle (title, info, scienceType, bg, reprinted) {
    return scienceArticle.create({
      title,
      info,
      scienceType,
      bg,
      reprinted,
      createTime: Date.now()
    })
  },
  // 修改科普文章
  updateScienceArticle (_id, where, bg) {
    return scienceArticle.updateOne({ _id }, {
      ...where,
      bg
    })
  },
  // 查找后台对应文章分页
  async getAllList (page, limite, where = {}) {
    // 获取到表总数
    let count = await scienceArticle.find(where).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await scienceArticle
      .find(where)
      .skip((page - 1) * limite)
      .sort({ createTime: -1 })
      .limit(limite);
    return { count, data };
  },
  // getScienceArticleFront
  // 查找前台对应科普分页
  async getScienceArticleFront (page, limite, where = {}) {
    // 获取到表总数
    let count = await scienceArticle.find({ ...{ 'scienceType': { $ne: "草稿" }, ...where } }).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await scienceArticle
      .find({ ...{ 'scienceType': { $ne: "草稿" }, ...where } })
      .skip((page - 1) * limite)
      .sort({ createTime: -1 })
      .limit(limite);
    return { count, data };
  },
  // 查找对应的文章
  async findSingle (_id) {
    return scienceArticle.find({ _id })
  },
  // 删除对应的文章
  async delArticle (_id) {
    return scienceArticle.deleteOne({ _id })
  },
  // 给首页查取数据
  async getAllLenght () {
    let science = (await scienceArticle.find()).length
    return { science }
  }
}

module.exports = service