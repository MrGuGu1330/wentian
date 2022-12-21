var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 解决跨域
var cors = require('cors')
// 引入multer 模块解决文件上传问题
const multer = require("multer");
//配置一个文件夹放传来的图片资源 
const uploadHistory = multer({ dest: "public/historyUploads/" });
const uploadNew = multer({ dest: "public/uploadNew/" });
// 上传头像
const userUpload = multer({ dest: "public/avatarUploads/" });
// 上传科普
const scienceUpload = multer({ dest: "public/scienceUpload/" })
const uploadFlow = multer({ dest: "public/flowUploads" });
const uploadPcAvatar = multer({ dest: "public/pcAvatar" })
const uploadConstitute = multer({ dest: "public/uploadConstitute" });

// 单页面
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, 'public/singleUploads/')
  },
  filename: function (req, file, cd) {
    console.log(323, req.originalUrl);
    // center
    if (req.originalUrl == '/center/centerImg') {
      cd(null, 'centerImage.jpg')
    } else if (req.originalUrl == '/frontpc/frontpcImg') {
      cd(null, 'frontpcImg.jpg')
    }
  }
})
const centerUploads = multer({ storage })
// 安全验证
const JWT = require('./util/jwt.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/loginUser');
var historyRouter = require('./routes/history');
var newRouter = require('./routes/news');
var flowRouter = require('./routes/flow');
var centerRouter = require('./routes/center');
const constituteRouter = require('./routes/constitute')
const frontRouter = require('./routes/frontpc')
const scienceRouter = require('./routes/science.js')
const emailerRouter = require('./routes/emailer.js')
// 上传评论
const commentRouter = require('./routes/comment.js')
var app = express();
// 解决跨域
app.use(cors())
// 定义拦截验证token
app.use((req, res, next) => {
  if (req.url.includes("login")) {
    next();
    return;
  }
  let token = req.headers.token?.split(" ")[1];
  if (token) {
    let payload = JWT.verify(token);
    if (payload) {
      let token = JWT.generate(
        {
          uname: payload.uname,
        },
        "10h"
      );
      res.setHeader("Access-Control-Expose-Headers", "Authorization")
      res.header("Authorization", token);
      next();
    } else {
      res.status(401).send({ errInof: "token过期", ok: 0 });
    }
  } else {
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 用户
app.use("/users", userUpload.single("avatar"), usersRouter);
// 历史
app.use('/history', uploadHistory.single('file'), historyRouter);
// 科普
app.use('/science', scienceUpload.single('file'), scienceRouter);
// 新闻
app.use('/news', uploadNew.single('file'), newRouter);
// 中心页
app.use('/center', centerUploads.single('file'), centerRouter);
// 宇航员
app.use('/constitute', uploadConstitute.single('file'), constituteRouter);
// 流程
app.use('/flow', uploadFlow.single('file'), flowRouter);
// 登录页
app.use('/login', loginRouter);
// 验证邮箱
app.use('/emailer', uploadPcAvatar.single('avatar'), emailerRouter);
// pc 前端界面
app.use('/frontpc', centerUploads.single("file"), frontRouter);
// 评论的接口
app.use('/comment', commentRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
