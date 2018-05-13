'use strict'
const db = require('./db')
const express = require('express')
const path = require('path')
const router = express.Router()
const multiparty = require('multiparty')
var Crawler = require('crawler')
const fs = require('fs')
const fn = () => {}

/* 上传 */
router.post('/api/uploadimg', function (req, res, next) {
  // 生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({ uploadDir: './static/uploads/' })
  // 上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2)
    if (err) {
      res.send({ success: false, msg: err })
    } else {
      var inputFile = files.imageFile[0]
      var filename = inputFile.originalFilename
      // 重命名为真实文件名
      fs.rename(inputFile.path, './static/uploads/' + filename, function (err) {
        if (err) {
          console.log('rename error: ' + err)
        } else {
          console.log('rename ok')
        }
      })
      res.send({ success: true, path: '/static/uploads/' + filename, size: inputFile.size, filename: filename })
    }
  })
})
// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})
// 登录
router.post('/api/login', (req, res) => {
  let { name, pwd } = req.body
  db.Login.findOne({ name }, 'pwd', (err, data) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !data: // 账号不存在
        res.send({ state: 0, msg: '账号不存在' })
        break
      case data.pwd === pwd: // 登陆成功
        res.send({ state: 1, msg: '登陆成功' })
        break
      case data.pwd !== pwd: // 密码错误
        res.send({ state: 2, msg: '密码错误' })
        break
      default: // 未知错误
        res.send({ state: 3, msg: '未知错误' })
    }
  })
})
// 文章-get
router.post('/api/getArts', (req, res) => {
  db.art.find(req.body, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})
// 文章-add & edit
router.post('/api/addArts', (req, res) => {
  let id = req.body._id
  if (id) {
    db.art.findByIdAndUpdate(id, req.body, function (err, data) {
      if (err) {
        res.send({ success: false, msg: err })
      } else {
        res.send({ success: true, msg: '修改成功' })
      }
    })
  } else {
    new db.art(req.body).save((err, data) => {
      if (err) {
        res.send({ success: false, msg: err })
      } else {
        res.send({ success: true, msg: '新增成功' })
      }
    })
  }
})
// 文章-del
router.post('/api/delArts', (req, res) => {
  db.art.findByIdAndRemove(req.body.id, function (err, data) {
    if (err) {
      res.send({ success: false, msg: err })
    } else {
      res.send({ success: true })
    }
  })
})
// 修改密码
router.post('/api/savePwd', (req, res) => {
  let { name, pwd } = req.body
  db.Login.findOneAndUpdate({ name }, { pwd }, function (err, data) {
    if (err) {
      res.send({ success: false, msg: err })
    } else {
      res.send({ success: true })
    }
  })
})
// 爬虫抓取工具
router.post('/api/crawler', (req, res) => {

  // 抓取图片
  let cImg = new Crawler({
    encoding: null,
    jQuery: false,
    callback: function (err1, res1, done) {
      if (err1) {
        console.error(err1.stack)
      } else {
        if (!fs.existsSync(res1.options.filepath)) {
          fs.mkdirSync(res1.options.filepath)
        }
        fs.createWriteStream(res1.options.filepath + '/' + res1.options.filename).write(res1.body)
      }
      done()
    }
  })
  // 抓取基本数据（标题，描述，图片原始src）
  let c = new Crawler({
    maxConnections: 10,
    callback: function (err, result, done) {
      if (err) {
        console.log(err)
      } else {
        let data = []
        let $ = result.$
        $('.content .con-l li').each((i, elem) => {
          let _this = $(elem)
          let _img = _this.find('.list-m img')
          data.push({
            linkto: _this.find('.title a').attr('href'),
            title: _this.find('.title a').text(),
            desc: _this.find('.desc').text(),
            type: result.options.type,
            imgOrigin: (_img.length > 0 ? _img.attr('src') : '')
          })
        })
        // 数据库插入数据
        db.art.insertMany(data, (err, data) => {
          if (err) {
            console.log(err)
          } else {

            // 判断static/art文件夹是否存在，不存在就创建
            let artPath = path.resolve(__dirname, '../static/art')
            if (!fs.existsSync(artPath)) {
              fs.mkdirSync(artPath)
            }
            data.map((value, index, arr) => {

              // 判断抓取title图片
              let imgOrigin = value.imgOrigin
              if (imgOrigin !== '') {
                let filepath = artPath + '/' + value._id
                let filename = '0' + imgOrigin.substring(imgOrigin.lastIndexOf('.'), imgOrigin.length)
                cImg.queue({
                  uri: imgOrigin,
                  filepath: filepath,
                  filename: filename
                })
              }
              
              // 抓取详情
              if (value.linkto) {
                
                c.queue({
                  uri: 'http://news.goumin.com/' + value.linkto,
                  callback: function (err, result, done) {
                    if (err) {
                      console.log(err)
                    } else {
                      let $ = result.$
                      let cont = $('.ask-detail').html()
                      console.log(cont)
                    }
                  }
                })

              }

              return value
            })
          }
        })
        res.send({ data: data })
      }
      done()
    }
  })
  c.queue({
    uri: 'http://news.goumin.com/yhxl/',
    type: 'yhxl'
  })
})
module.exports = router
