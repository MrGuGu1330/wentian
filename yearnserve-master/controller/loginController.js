const service = require('../service/loginService')
// 加密解密模块
const crypot = require('../util/crypto')
// 引入jwt模块
const jwt = require('../util/jwt.js')
// 引入删除fs 模块
const delFile = require('../util/delFile.js')
const controller = {
  // 登录页面的查找
  async find (req, res) {
    let { username, password } = req.body
    // 进行加密查找密码
    password = crypot.encrypt(password)
    data = await service.find(username, password)
    if (data.length) {
      let token = jwt.generate({ uname: username }, '10h')
      res.header('Authorization', token) //请求头中带上这个字段
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')
      res.send({ code: 200, ok: 1, username, avatar: data[0].avatar })
    } else {
      res.send({ code: 401, ok: 0 })
    }
  },
  // user表的添加
  async add (req, res) {
    let { username, password, type } = req.body
    usernameData = await service.findUsername(username)
    if (usernameData.length) {
      // 如果找到有这个用户名就提示回去
      req.file && delFile(req.file.filename, 'avatarUploads')
      res.send({ ok: 0, info: '已经有这个用户名了' })
    } else {
      // 进行加密添加密码
      password = crypot.encrypt(password)
      const avatar = req.file
        ? `avatarUploads/${req.file.filename}`
        : 'images/3.jpg'
      data = await service.create(username, password, avatar, type || '2')
      res.send({
        code: data?.username ? 200 : 401,
        ok: data?.username ? 1 : 0,
        info: '添加成功',
      })
    }
  },

  // 查找全部用户信息
  async findAll (req, res) {
    let data = await service.findAll()
    res.send({ ok: 1, stateCode: 200, info: data, count: data.length })
  },


  // 删除对应管理员
  async del (req, res) {
    let { id, token, filename } = req.params
    username = jwt.verify(token)?.uname
    if (username == 'admin') {
      // 删除文件夹中文件
      delFile(filename, 'avatarUploads')
      const data = await service.del(id)
      res.send({
        ok: data.acknowledged ? 1 : 0,
        code: 200,
        info: data.acknowledged ? '删除成功' : '删除失败',
      })
    } else {
      res.send({ ok: 0, code: 401, info: '你不是超级管理员哦！！！' })
    }
  },
  // 删除多个管理员
  async delBatch (req, res) {
    let { delBatchItem, token, filenames } = req.body
    username = jwt.verify(token)?.uname
    if (username == 'admin') {
      // 删除文件
      filenames.forEach(filename => {
        delFile(filename, 'avatarUploads')
      });
      const data = await service.delBatch(delBatchItem)
      res.send({
        ok: data.acknowledged ? 1 : 0,
        code: 200,
        info: data.acknowledged ? '删除成功' : '删除失败',
      })
    } else {
      res.send({ ok: 0, code: 401, info: '你不是超级管理员哦！！！' })
    }
  },
  // 获取单个管理
  async findMessage (req, res) {
    let { token } = req.query
    username = jwt.verify(token)?.uname
    let data = await service.findMessage(username)
    res.send(data[0])
  },

  // 修改用户名
  // 修改管理的用户名
  async updataUsername (req, res) {
    const { token, username } = req.body
    uname = jwt.verify(token)?.uname
    usernameData = await service.findUsername(username)
    if (usernameData.length) {
      // 如果找到有这个用户名就提示回去
      res.send({ ok: 0, info: '已经有这个用户名了' })
    } else {
      let data = await service.updataUser({ username }, uname)
      let tk = jwt.generate({ uname: username }, '10h')
      res.header('Authorization', tk) //请求头中带上这个字段
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')
      res.send({ code: 200, ok: 1, username, info: '修改成功' })
    }
  },
  // 修改头像
  async updataAvatar (req, res) {
    const { oldAvatar, token } = req.body
    username = jwt.verify(token)?.uname
    const avatar = `avatarUploads/${req.file.filename}`
    // 删除文件夹中文件
    delFile(oldAvatar, 'avatarUploads')
    await service.updataUser({ avatar }, username)
    res.send({ code: 200, ok: 1, info: '修改成功', avatar })
  },
  // 更新密码
  async updataPassword (req, res) {
    let { password, token } = req.body
    username = jwt.verify(token)?.uname
    // 进行加密
    password = crypot.encrypt(password)
    const data = await service.updataUser({ password }, username)
    console.log(data);
    res.send({ code: 200, ok: 1, info: '修改成功' })
  },
}

module.exports = controller
