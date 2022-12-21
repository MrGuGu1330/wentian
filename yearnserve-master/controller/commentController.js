const service = require('../service/commentService')
const controller = {
  // 推送评论
  async addComment (req, res) {
    const { nickName, avatar, content, articleId, articleTitle, articleType } = req.body
    let data = await service.addComment(nickName, avatar, content, articleId, articleTitle, articleType)
    res.send({ ok: 1, data })
  },
  // 添加回复
  async addReply (req, res) {
    const { nickName, avatar, mainIp, content,
      targetId, articleId, articleTitle, articleType, } = req.body
    let data = await service.addReply(nickName, avatar, mainIp, content, targetId, articleId, articleTitle, articleType)
    res.send({ ok: 1, data })
  },
  // 查找评论
  async findComment (req, res) {
    let { articleId } = req.query
    let data = await service.findComment(articleId)
    res.send({ ok: 1, info: data })
  },

  // 查找所有的评论
  async findAllComment (req, res) {
    let { page, limit, articleTitle, nickName, articleType } = req.body
    articleTitle = articleTitle ? new RegExp(articleTitle) : new RegExp('.')
    nickName = nickName ? new RegExp(nickName) : new RegExp('.')
    articleType = articleType ? new RegExp(articleType) : new RegExp('.')
    page = page ? page : '1'
    limit = limit ? limit / 2 : '4'
    let data = await service.findAllComment(page, limit, articleTitle, nickName, articleType)
    res.send({ ok: 1, data })
  },
  // 删除单个评论
  async deleteComment (req, res) {
    const { id } = req.params
    await service.deleteComment(id)
    res.send({ ok: 1 })
  },
  // 删除多个评论
  async delAllComment (req, res) {
    const { ids } = req.body
    await service.delAllComment(ids)
    res.send({ ok: 1 })
  },

  async addTalk (req, res) {
    const { talk, username, email } = req.body
    console.log(req.body);
    const data = await service.addTalk(talk, username, email)
    if (data.createTime) {
      res.send({ ok: 1, info: '添加完成' })
    } else {
      res.send({ ok: 0, info: '添加失败' })
    }
  },
  // 获取留言
  async findTalk (req, res) {
    let { page, limite, message } = req.query
    page = page ? page : '1'
    limite = limite ? limite : '7'
    message = message ? message : '.'
    message = new RegExp(message)
    let data = await service.findTalk(page, limite, message)
    res.send({ ok: 1, info: data })
  },
  // 删除
  async delMessage (req, res) {
    const { id } = req.params
    await service.delMessage(id)
    res.send({ ok: 1 })
  },
  // 删除多个
  async delAll (req, res) {
    const { ids } = req.body
    await service.delAll(ids)
    res.send({ ok: 1 })
  },
}

module.exports = controller