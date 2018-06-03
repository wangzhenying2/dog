// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test')

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
/* ************* 定义模式loginSchema ************* */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    pwd: {
        type: String,
        default: ''
    },
    createtime: {
        type: Date,
        default: Date.now
    }
})
const artSchema = mongoose.Schema({
    type: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    createtime: {
        type: Date,
        default: Date.now
    },
    linkto: {
        type: String,
        default: ''
    },
    imgOrigin: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    cont: {
        type: String,
        default: ''
    }
})
const commentSchema = mongoose.Schema({
    userid: {
        type: String,
        default: ''
    },
    cont: {
        type: String,
        default: ''
    },
    createtime: {
        type: Date,
        default: Date.now
    }
})
const likeSchema = mongoose.Schema({
    userid: {
        type: String,
        default: ''
    },
    artid: {
        type: String,
        default: ''
    },
    createtime: {
        type: Date,
        default: Date.now
    }
})
/* ************* 定义模型Model ************* */
const Models = {
    User: mongoose.model('user', userSchema),
    Art: mongoose.model('art', artSchema),
    Comment: mongoose.model('comment', commentSchema),
    Like: mongoose.model('like', likeSchema)
}

module.exports = Models
