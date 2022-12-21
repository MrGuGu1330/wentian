const nodemailer = require('nodemailer');
const service = require('../service/emailerService')
// 加密解密模块
const crypot = require('../util/crypto.js')
// 引入删除fs 模块
const delFile = require('../util/delFile.js')

const controller = {
  async sendEmailer (req, res) {
    let code = Math.ceil(Math.random() * 1000000)

    while (code.length < 6) {
      code += '0'
    }
    const { email } = req.body

    await service.addCode(code)
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', //QQ邮箱的服务器
      port: 465, //SMTP地址，从邮件服务提供商获取
      secure: true, //465端口为true，其他接口为false
      auth: {
        user: '1298603451@qq.com', // 自己的邮箱
        pass: 'seoujvqgkblwghce', // 邮箱授权码，从邮件服务提供商获取
      },
    });
    let mailOptions = {
      // from: '"李疆" <2906718132@qq.com>', // 这里写上你自己的邮箱
      from: {
        name: "问天客服",
        address: "1298603451@qq.com"
      }, // 这里写上你自己的邮箱
      // to: '2906718132@qq.com,18681693083@163.com', // 这里写上要发送到的邮箱，支持qq邮箱和163邮箱。支持自己给自己发邮件
      to: email, // 这里写上要发送到的邮箱，支持qq邮箱和163邮箱。支持自己给自己发邮件
      subject: '问天验证邮箱', //邮件的标题
      text: '这是一封来自问天验证邮件',//发送的文本
      html: `<b>验证码为：${code} 5分钟内有效</b>  
        <br/>
        有问题欢迎来我博客留言<a href="http://www.zyqcreate.top:4001/#/home/main">我的博客</a>`,

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    res.send({
      ok: 1,
      message: '发送成功！'
    })
  },
  async Register (req, res) {
    let { code, email, username, password } = req.body
    password = password ? crypot.encrypt(password) : ''
    code = code ? code : '1122'
    email = email ? email : '2222'
    username = username ? username : email
    let r = await service.findEmailer(email, new RegExp('.'))
    console.log(123, r);
    if (r.length) {
      res.send({ ok: 0, info: '您已经注册过了' })
      return
    }
    let data = await service.Register(code)
    if (data.length) {
      const avatar = req.file
        ? `pcAvatar/${req.file.filename}`
        : 'images/3.jpg'
      let data = await service.addUser(email, username, password, avatar)
      res.send({ ok: 1, info: '注册成功,去登录吧', userBase: { email, username, avatar } })
    } else {
      res.send({ ok: 0, info: '不是有效验证码' })
    }
  },
  // 登录逻辑
  async Login (req, res) {
    let { password, email, code } = req.body
    email = email ? email : '2222'
    if (code) {
      let data = await service.Register(code)
      if (data.length) {
        password = new RegExp('.*')
        let r = await service.findEmailer(email, password)
        if (r.length) {
          res.send({ ok: 1, info: r[0] })

        } else {
          res.send({ ok: 0, info: '您还没注册吧' })
        }
      } else {
        res.send({ ok: 0, info: '不是有效验证码' })
      }
    } else {
      password = crypot.encrypt(password)
      let r = await service.findEmailer(email, password)
      if (!r.length) {
        res.send({ ok: 0, info: '用户名密码有误' })
        return
      } else {
        res.send({ ok: 1, info: r[0] })
      }

    }
  },
  // 更新前台用户数据
  async updateUser (req, res) {
    // const= { }
    let { email, username, oldEmail, oldFile, code } = req.body
    const avatar = req.file
      ? `pcAvatar/${req.file.filename}`
      : null
    console.log(avatar);
    req.file && delFile(oldFile.split('/')[1], 'pcAvatar')
    if (avatar) {
      if (email) {
        let data = await service.Register(code)
        if (data.length) {
          let userData = await service.updateUser(oldEmail, { email, username, avatar })
          res.send({ ok: 1, info: '修改成功', BaseUser: { email, username, avatar }, userData })
        } else {
          res.send({ ok: 0, info: '不是有效验证码' })
        }
      } else {
        let userData = await service.updateUser(oldEmail, { username, avatar })
        res.send({ ok: 1, info: '修改成功', BaseUser: { username, avatar }, userData })
      }
    } else {
      if (email) {
        let data = await service.Register(code)
        if (data.length) {
          let userData = await service.updateUser(oldEmail, { email, username })
          res.send({ ok: 1, info: '修改成功', BaseUser: { email, username }, userData })
        } else {
          res.send({ ok: 0, info: '不是有效验证码' })
        }
      } else {
        let userData = await service.updateUser(oldEmail, { username })
        res.send({ ok: 1, info: '修改成功', BaseUser: { username }, userData })
      }
    }
  },
  async findUser (req, res) {
    let { username, email, page, limite, } = req.query
    username ? username = RegExp(username) : username = RegExp('.')
    email ? email = RegExp(email) : email = RegExp('.')
    page ? page : page = '1'
    limite ? limite : limite = '5'
    let data = await service.findUser(page, limite, { username, email })
    res.send({ ok: 1, data })
  },
  // 删除
  async delUserSingle (req, res) {
    let { id, filename } = req.query
    id || res.send('必须传id')
    // 删除文件夹中文件
    delFile(filename, 'pcAvatar')
    const data = await service.delUserSingle(id)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })
  },
  // 删除多个
  async delBatch (req, res) {
    let { delBatchItem, filenames } = req.body
    // 删除文件
    filenames.forEach(filename => {
      delFile(filename, 'pcAvatar')
    });
    const data = await service.delBatch(delBatchItem)
    res.send({
      ok: data.acknowledged ? 1 : 0,
      code: 200,
      info: data.acknowledged ? '删除成功' : '删除失败',
    })

  },
  // 修改密码
  async changePassword (req, res) {
    let { password, email } = req.body
    console.log(password, email);
    password = crypot.encrypt(password)
    await service.updateUser(email, { password })
    res.send({ ok: 1, info: '修改成功' })
  }
}

module.exports = controller