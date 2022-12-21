const historyModel = require("../mongoModel/historyModel")

const service = {
  // 添加历史
  addHistory (title, info) {
    return historyModel.create({
      createTime: Date.now(),
      title,
      info
    })
  },
  // 查找列表
  async findHistory (page, limite, where) {
    let count = await historyModel.find(where).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await historyModel
      .find(where)
      .skip((page - 1) * limite)
      .sort({ createTime: -1 })
      .limit(limite);
    return { count, data };
  },
  // 查找对应的文章
  async findArticleSingle1 (id) {
    return historyModel.find({ _id: id })
  },
  // 删除对应的文章
  async delArticle (id) {
    return historyModel.deleteOne({ _id: id })
  },
  // 修改对应文章
  updateArticle (_id, where) {
    return historyModel.updateOne({ _id }, where)
  },
  // 
  // 给首页查取数据
  async getAllLenght () {
    let history = (await historyModel.find()).length
    return { history }
  }
}

module.exports = service