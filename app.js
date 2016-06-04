'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./router')
const config = require('./config')

const app = express()

// 配置静态资源目录
app.use(express.static('public'))
app.use('/node_modules', express.static('node_modules'))

// 配置解析post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置解析 cookie 的中间件
app.use(cookieParser())

// 配置 session（保存状态）
app.use(session({
  secret: 'mall',
  resave: false,
  saveUninitialized: true
}))

// 配置模板引擎
app.set('views', config.viewPath)
app.set('view engine', 'xtpl')

// 配置路由
app.use(router)

// 处理 404
app.use((req, res) => {
  res.send('404 Not Found')
})

// 处理 500
app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.message,
    stack: err.stack
  })
})

app.listen(config.port, config.host, () => {
  console.log(`app is listening at http://${config.host}:${config.port}`)
})
