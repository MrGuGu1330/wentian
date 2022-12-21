const commentModel = require('../mongoModel/commentModel')
const commentReplyModel = require('../mongoModel/commentReply')
const talkModel = require('../mongoModel/talkModel')
const service = {
  // 添加评论
  addComment (nickName, avatar, content, articleId, articleTitle, articleType) {
    return commentModel.create({
      nickName,
      avatar,
      content,
      createDate: Date.now(),
      articleId,
      articleTitle,
      articleType
    })
  },
  // 添加回复
  addReply (nickName, avatar, mainIp, content, targetId, articleId, articleTitle, articleType) {
    return commentReplyModel.create({
      nickName, avatar, mainIp, content, targetId, articleId, articleTitle, articleType,
      createDate: Date.now(),
    })
  },
  // 查找对应的评论
  async findComment (articleId) {
    let res = await commentModel
      .find({ articleId })
    let data = await Promise.all(
      res.map(async (item) => {
        let itemArr = await commentReplyModel
          .find({ mainIp: item._id })
        return { item, childrenList: itemArr }
      }))

    return { data: data }
  },
  // 
  // 后端查找全部
  async findAllComment (page, limit, articleTitle, nickName, articleType) {
    let count1 = await commentModel.find({ page, limit, articleTitle, nickName, articleType }).count()
    let count2 = await commentReplyModel.find({ page, limit, articleTitle, nickName, articleType }).count()
    let res = await commentModel
      .find({ articleTitle, nickName, articleType })
      .sort({ createDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    let res1 = await commentReplyModel
      .find({ articleTitle, nickName, articleType })
      .sort({ createDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    return { count: Number(count1) + Number(count2), data: [...res, ...res1] }
  },
  // 删除单个评论
  async deleteComment (id) {
    await commentReplyModel.deleteOne({ _id: id }).catch((err) => err)
    await commentModel.deleteOne({ _id: id }).catch((err) => err)
  },
  // 删除多个
  async delAllComment (ids) {
    await commentReplyModel.deleteMany({ _id: ids }).catch((err) => err)
    await commentModel.deleteMany({ _id: ids }).catch((err) => err)
  },
  // 添加说说
  async addTalk (talk, username, email) {
    return talkModel.create({
      talk, username, createTime: Date.now(), email
    })
  },
  // 查询说说
  async findTalk (page, limite, talk) {
    let num = await talkModel.find({ talk }).count();
    // 获取到数据根据goodsPrice的顺序正序排序跳过(page - 1) * limite 条 要limit 条数据
    let data = await talkModel
      .find({ talk })
      .skip((page - 1) * limite)
      .sort({ createTime: -1 })
      .limit(limite);
    return { num, data };
  },
  delMessage (id) {
    return talkModel.deleteOne({ _id: id })
  },
  delAll (ids) {
    return talkModel.deleteMany({ _id: ids })
  },
}
module.exports = service