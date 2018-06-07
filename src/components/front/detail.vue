<template>
    <div class="main">
        <!--正文内容-->
        <div class="detail">
            <div class="title" data-value="object_name">{{group.title}}</div>
            <div class="source_info">
                <span class="date" data-value="object_date" data-filter="date">{{group.createtime}}</span>
            </div>
            <div class="ask_detail" data-value="object_content" v-html="group.cont"></div>
            <div class="detail_btm">
                <div class="ask_count"><strong>{{comment.total}}</strong>个评论</div>
                <a href="javascript:;" class="support" title="点赞" @click="toLike">
                    <img src="http://img1.goumin.com/cms/aichong/day_180123/20180123_3b8e2aa.png"><strong>{{likeTotal}}</strong>
                </a>
            </div>
            <div class="comment_auther">
                <h3>添加你的评论</h3>
                <el-input type="textarea" v-model="commentCont"></el-input>
                <div class="comment_btn">
                    <el-button type="danger" @click="toComment">发表评论</el-button>
                </div>
            </div>
            <div class="comment_out">
                <h3 class="comment_title">评论</h3>
                <div class="comment_list">
                    <div class="each" v-for="item in comment.comments" :key="item._id">
                        <h4><span>{{item.username}}</span><span class="time">{{item.createtime}}</span></h4>
                        <p>{{item.cont}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data () {
        return {
            artid: this.$route.params.id, // 文章id
            likeTotal: 0, // 点赞数
            commentCont: '', // 写评论内容
            comment: {
                comments: [], // 评论记录
                total: 0,
                page: 1,
                pagesize: 10
            },
            group: {}
        }
    },
    computed: mapState(['articles']),
    created () {
        // 详情
        this.init()
        // 点赞数
        this.getLikes()
        // 评论
        this.getComments()
    },
    methods: {
        // 初始化
        init () {
            this.getArts({
                query: { '_id': this.artid }
            }).then(() => {
                // 赋值
                this.group = this.articles[0]
            })
        },
        // 获取点赞数
        getLikes () {
            this.ajax.post('/api/getlikes', {artid: this.artid}, (res) => {
                this.likeTotal = res.result.count
            })
        },
        // 获取评论
        getComments () {
            let param = {
                page: this.comment.page,
                pagesize: this.comment.pagesize,
                query: {
                    artid: this.artid
                }
            }
            this.ajax.post('/api/getComment', param, (res) => {
                this.comment.comments = res.result.map((item) => {
                    item.createtime = moment(item.createtime).format('YYYY-MM-DD HH:mm:ss')
                    return item
                })
                console.log(this.comment.comments)
                this.comment.total = res.total
            })
        },
        // 写评论
        toComment () {
            if (this.commentCont === '') {
                this.$message({
                    type: 'warning',
                    message: '请输入评论内容！',
                    showClose: true
                })
                return
            }
            let param = {
                cont: this.commentCont,
                artid: this.artid
            }
            this.ajax.post('/api/addComment', param, (res) => {
                if (!res.islogin) {
                    this.$router.push({
                        name: 'login',
                        query: {redirect: this.$router.currentRoute.fullPath}
                    })
                    return
                }
                this.commentCont = ''
                this.getComments()
            })
        },
        // 点赞
        toLike () {
            this.ajax.post('/api/like', {artid: this.artid}, (res) => {
                if (!res.islogin) {
                    this.$router.push({
                        name: 'login',
                        query: {redirect: this.$router.currentRoute.fullPath}
                    })
                    return
                }
                this.init()
            })
        },
        ...mapActions(['getArts'])
    }
}

</script>
<style scoped>
.main {
    width: 800px;
    margin: 0 auto;
}
.detail {
    padding: 50px 0;
}
.detail .ask_detail {
    color: #555;
    font-size: 16px;
    line-height: 1.8em;
}
.detail .imgOut {
    text-align: center;
    padding: 10px 0;
}
.detail .title{
    color: #444;
    font-size: 20px;
    line-height: 2em;
    overflow:hidden;
    margin: 10px 0;
    font-weight: bold;
    text-align: center;
}
.detail .source_info{
    color: #999;
    font-size: 14px;
    text-align: center;
    margin-bottom: 30px;
}
.detail_btm {
    padding: 1em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
}
.detail_btm .ask_count strong{
    color: #ff7802;
    margin: 0 0.2em;
}
.detail_btm a {
    border-radius: 0.5em;
    border: 1px solid #ddd;
    padding: 0.5em 1em;
    display: block;
    cursor: pointer;
}
.detail_btm a:hover {
    border-color: #ff7802;
}
.detail_btm strong, .detail_btm img{
    vertical-align: middle;
}
.detail_btm strong {
    color: #999;
    margin: 0 0.2em;
}
.comment_auther h3 {
    color: #ff4949;
    font-size: 16px;
    padding: 1em 0;
}
.comment_auther textarea {
    width: 100%;
    height: 7.5em;
    line-height: 1.5em;
}
.comment_auther .comment_btn {
    text-align: right;
    padding: 1em 0; 
}
.comment_title {
    color: #555;
    font-size: 2em;
    margin: 20px 0;
    font-weight: normal;
}
.comment_list .each {
    font-size: 14px;
    color: #999;
    padding: 1em 0;
    border-bottom: 1px solid #eee;
}
.comment_list h4 {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    margin-bottom: 1em;
}
.comment_list h4 .time {
    font-weight: normal;
    color: #ccc;
}
.comment_list p {
    line-height: 1.5em;
    text-indent: 2em;
}
</style>