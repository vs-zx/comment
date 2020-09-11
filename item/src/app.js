const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors=require('koa2-cors');
const session=require('koa-generic-session');

// 导入路由
const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')

// error handler
onerror(app)

// 跨域
app.use(cors({
  origin:'http://localhost:8080',   // 支持前端跨域的地址
  credentials:true                  // 允许携带cookie
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.keys=['session-koa2'];   // 密钥
// session 插件，自动配置 session 与 cookie 的一一对应关系
app.use(session({
  // 配置cookie
  cookie:{
    path:"/",       // 有效路径 根目录以下都有些
    httpOnly:true,    // 只允许服务端操作 cookie
    maxAge:24*60*60*1000    // 有效时间 1天
  }
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
