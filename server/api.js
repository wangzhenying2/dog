'use strict'
const db = require('./db')
const express = require('express')
const path = require('path')
const router = express.Router()
const multiparty = require('multiparty')
const Crawler = require('crawler')
const fs = require('fs')
const fn = () => {}
const async = require('async')
const crypto = require('crypto')

// 错误处理函数
function errorEvent (res, err) {
    if (err) {
        res.send({ success: false, msg: err })
        return
    }
}

// 判断用户是否登录
function checkAuth (req, res, next) {
    if (req.session.userid) {
        next()
    } else {
        req.session.error = '验证失败！'
        res.send({ success: true, islogin: false, msg: '用户未登录！' })
    }
}

// 获取用户登录信息
router.post('/api/getUserinfo', (req, res) => {
    if (req.session.userid) {
        res.send({ success: true, msg: '用户已登录！' })
    } else {
        res.send({ success: false, msg: '用户未登录！' })
    }
})

// 上传
router.post('/api/uploadimg', function (req, res, next) {
    // 生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './static/uploads/' })

    // 上传完成后处理
    form.parse(req, function (err, fields, files) {
        errorEvent(res, err)

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
    })
})

// 前台页面-注册
router.post('/api/register', (req, res) => {
    let name = req.body.name

    // 判断用户名是否存在
    db.User.count({
        name: name
    }, (err, count) => {
        errorEvent(res, err)

        if (count > 0) {
            res.send({ success: false, msg: '用户名已存在，请重新输入' })
        } else {
            let md5 = crypto.createHash('md5')
            let newPas = md5.update(req.body.pwd).digest('hex')

            new db.User({
                name: name,
                pwd: newPas
            }).save((err, newUser) => {
                errorEvent(res, err)

                req.session.regenerate(function () {
                    req.session.username = newUser.name
                    req.session.userid = newUser._id
                    res.send({ success: true, msg: '注册成功' })
                })
            })
        }
    })
})

// 前台页面-登录
router.post('/api/login', (req, res) => {
    let { name, pwd } = req.body
    let md5 = crypto.createHash('md5')
    let newPwd = md5.update(pwd).digest('hex')
    db.User.findOne({ name }, ['pwd', 'name'], (err, data) => {
        errorEvent(res, err)

        if (!data) {
            res.send({ success: false, msg: '账号不存在' })
        } else if (data.pwd !== newPwd) {
            res.send({ success: false, msg: '密码错误' })
        } else {
            req.session.regenerate(function () {
                req.session.username = data.name
                req.session.userid = data._id
                res.send({
                    success: true,
                    msg: '登陆成功',
                    result: {username: data.name, userid: data._id}
                })
            })
        }
    })
})

// 前台页面-登录退出
router.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        errorEvent(res, err)

        res.clearCookie('dog')
        res.send({
            success: true,
            msg: '退出登陆成功'
        })
    })
})

// 获取评论列表
router.post('/api/getComment', (req, res) => {
    let param = req.body
    let sort = param.sort || ''
    console.log(sort)
    let start = (param.page - 1) * param.pagesize
    async.parallel({
        count: function (done) { // 查询数量
            db.Comment.count(param.query).exec(function (err, count) {
                done(err, count)
            })
        },
        records: function (done) { // 查询一页的记录
            db.Comment.find(param.query).skip(start).limit(param.pagesize).sort(sort).exec(function (err, doc) {
                done(err, doc)
            })
        }
    }, function (err, results) {
        errorEvent(res, err)

        let $page = {
            success: true,
            page: param.page,
            pagesize: param.pagesize,
            total: results.count,
            result: results.records
        }
        res.send($page)
    })
})

// 写评论
router.post('/api/addComment', checkAuth, (req, res) => {
    let param = {
        cont: req.body.cont,
        artid: req.body.artid,
        userid: req.session.userid,
        username: req.session.username
    }
    new db.Comment(param).save((err, newcord) => {
        errorEvent(res, err)

        db.Art.findByIdAndUpdate({_id: newcord.artid}, { $inc: {commentsum: 1} }, (err, counter) => {
            errorEvent(res, err)
            res.send({ success: true, islogin: true })
        })
    })
})

// 获取点赞数
router.post('/api/getlikes', (req, res) => {
    let { artid } = req.body
    db.Like.count({artid: artid}, (err, count) => {
        errorEvent(res, err)

        res.send({ success: true, result: {count: count} })
    })
})

// 点赞
router.post('/api/like', checkAuth, (req, res) => {
    let param = {
        userid: req.session.userid,
        artid: req.body.artid
    }
    db.Like.count(param, (err, count) => {
        errorEvent(res, err)

        if (count > 0) {
            res.send({ success: false, msg: '已点赞！' })
        } else {
            new db.Like(param).save((err, newcord) => {
                errorEvent(res, err)
                db.Art.findByIdAndUpdate({_id: newcord.artid}, { $inc: {likesum: 1} }, (err, counter) => {
                    errorEvent(res, err)
                    res.send({ success: true, islogin: true })
                })
            })
        }
    })
})

// 文章-get
router.post('/api/getArts', (req, res) => {
    let param = req.body
    let sort = param.sort || ''
    let start = (param.page - 1) * param.pagesize
    async.parallel({
        count: function (done) { // 查询数量
            db.Art.count(param.query).exec(function (err, count) {
                done(err, count)
            })
        },
        records: function (done) { // 查询一页的记录
            db.Art.find(param.query).skip(start).limit(param.pagesize).sort(sort).exec(function (err, doc) {
                done(err, doc)
            })
        }
    }, function (err, results) {
        errorEvent(res, err)

        let $page = {
            page: param.page,
            pagesize: param.pagesize,
            total: results.count,
            result: results.records
        }
        res.send($page)
    })
})

// 文章-add & edit
router.post('/api/addArts', (req, res) => {
    let id = req.body._id
    if (id) {
        db.Art.findByIdAndUpdate(id, req.body, function (err, data) {
            errorEvent(res, err)

            res.send({ success: true, msg: '修改成功' })
        })
    } else {
        new db.Art(req.body).save((err, data) => {
            errorEvent(res, err)

            res.send({ success: true, msg: '新增成功' })
        })
    }
})
// 文章-del
router.post('/api/delArts', (req, res) => {
    db.Art.findByIdAndRemove(req.body.id, function (err, data) {
        errorEvent(res, err)

        res.send({ success: true })
    })
})
// 修改密码
router.post('/api/savePwd', (req, res) => {
    let { name, pwd } = req.body
    db.User.findOneAndUpdate({ name }, { pwd }, function (err, data) {
        errorEvent(res, err)

        res.send({ success: true })
    })
})
// 爬虫抓取工具
router.post('/api/crawler', (req, res) => {
    let { type } = req.body

    let page = 1
    // 抓取图片-公用
    let cImg = new Crawler({
        maxConnections: 100,
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

    // 抓取详情页-公用
    let cDetail = new Crawler({
        maxConnections: 100
    })

    // 抓取基本数据（标题，描述，图片）
    let c = new Crawler({
        maxConnections: 10,
        callback: function (err, result, done) {
            if (err) {
                console.log(err)
            } else {
                let param = []
                let $ = result.$
                // 判断是否有数据
                if ($('.content .con-l li').length === 0) { return }
                $('.content .con-l li').each((i, elem) => {
                    let _this = $(elem)
                    let _img = _this.find('.list-m img')
                    param.push({
                        linkto: _this.find('.title a').attr('href'),
                        title: _this.find('.title a').text(),
                        desc: _this.find('.desc').text() + '...',
                        type: result.options.type,
                        imgOrigin: (_img.length > 0 ? _img.attr('src') : '')
                    })
                })

                // 数据库插入基本数据（标题，描述，图片原始src）
                db.Art.insertMany(param, (err, data) => {
                    if (err) {
                        console.log('插入一组数据')
                        console.log(err)
                    } else {
                        let imgArr = []

                        // 判断static/art文件夹是否存在，不存在就创建
                        let artPath = path.resolve(__dirname, '../static/art')
                        if (!fs.existsSync(artPath)) {
                            fs.mkdirSync(artPath)
                        }

                        data.map((value, index) => {
                            // 抓取title图片
                            let imgOrigin = value.imgOrigin
                            let imgOriginName = imgOrigin.substring(imgOrigin.lastIndexOf('/') + 1)
                            if (imgOrigin !== '') {
                                imgArr.push({
                                    uri: imgOrigin,
                                    filepath: artPath + '/' + value._id,
                                    filename: imgOriginName
                                })
                            }

                            // 抓取详情
                            if (value.linkto) {
                                cDetail.queue({
                                    uri: 'http://news.goumin.com/' + value.linkto,
                                    callback: function (err2, res2, done) {
                                        if (err2) {
                                            console.log(index)
                                            console.error(err2.stack)
                                        } else {
                                            let $ = res2.$
                                            let cont = ''
                                            $('.ask-detail').find('p').each(function (i, elem) {
                                                let imgsrc = $(this).find('img').attr('src')
                                                if (imgsrc) {
                                                    let filename = imgsrc.substring(imgsrc.lastIndexOf('/') + 1)
                                                    cont += '<p class="imgOut"><img src="./static/art/' + value._id + '/' + filename + '" style="width:500px"/></p>'
                                                    imgArr.push({
                                                        uri: imgsrc,
                                                        filepath: artPath + '/' + value._id,
                                                        filename: filename
                                                    })
                                                } else {
                                                    cont += '<p>' + $(this).text() + '</p>'
                                                }
                                            })
                                            // 根据_id更新cont详情字段
                                            db.Art.findByIdAndUpdate(value._id, { cont: cont, imgOrigin: '/' + value._id + '/' + imgOriginName }, function (err3, data3) {
                                                if (err3) {
                                                    console.log('根据_id更新cont')
                                                    console.log(err3)
                                                }
                                            })

                                            // 抓取所有图片
                                            imgArr.map((val, index) => {
                                                cImg.queue(val)
                                            })
                                        }
                                        done()
                                    }
                                })
                            }
                            return value
                        })
                    }
                })
            }
            done()
        }
    })

    function start () {
        c.queue({
            uri: 'http://news.goumin.com/' + type + '/' + (page > 1 ? page + '.html' : ''),
            type: type
        })
        if (page < 2) {
            page++
            start()
        }
    }
    // 开始抓取
    start()
})
module.exports = router
