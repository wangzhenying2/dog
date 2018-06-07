// 引入编写好的api
const api = require('./api')
// 引入文件模块
const fs = require('fs')
// 引入处理路径的模块
const path = require('path')
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express')
const app = express()

const session = require('express-session')
// session本地文件存储
const FileStore = require('session-file-store')(session)

// session初始化
app.use(session({
    name: 'dog',
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 10 * 60 // 有效期，单位是毫秒
    }
}))

app.set('port', (process.env.port || 3001))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(api)

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.join(__dirname, '../dist')))

// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
app.listen(app.get('port'), function() {
  console.log('Visit http://localhost:' + app.get('port'))
})
