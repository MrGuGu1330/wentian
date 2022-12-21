const newModel = require("../mongoModel/newModel")

const service = {
  // 添加新闻
  addNews (source, cover, Publisher, title, state) {
    return newModel.create({
      releaseTime: Date.now(),
      source,
      cover,
      Publisher,
      title,
      state
    })
  },
  // 查找列表
  async findNews (page, limite, where) {
    let count = await newModel.find(where).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await newModel
      .find(where)
      .skip((page - 1) * limite)
      .sort({ releaseTime: -1 })
      .limit(limite);
    return { count, data };
  },
  // 查找对应的
  async findNewsSingle (_id) {
    return newModel.find({ _id })
  },
  // 删除对应的新闻
  async delNews (id) {
    return newModel.deleteOne({ _id: id })
  },
  // 修改对应新闻
  updateNews (_id, where) {
    return newModel.updateOne({ _id }, where)
  },
  // 查找前端的新闻
  async findNewsFront (page, limite, where = {}) {
    // 获取到表总数
    let count = await newModel.find({ ...{ 'state': { $ne: "0" }, ...where } }).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await newModel
      .find({ ...{ 'state': { $ne: "0" }, ...where } })
      .skip((page - 1) * limite)
      .sort({ releaseTime: -1 })
      .limit(limite);
    return { count, data };
  },
  // 给首页查取数据
  async getAllLenght () {
    let news = (await newModel.find()).length
    return { news }
  }
}

module.exports = service