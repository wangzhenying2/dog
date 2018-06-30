<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="me_title">我的点赞</span>
            </div>
            <div class="me_list">
                <div v-for="item in listData" :key="item._id" >
                    > <router-link :to="{path:`/detail/${item.artid._id}`}">{{item.artid.title}}</router-link>
                </div>
            </div>
            <div class="pageOut">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>

export default {
    data () {
        return {
            userid: this.$store.state.userInfo.userid,
            listData: [],
            page: 1,
            total: 0,
            pagesize: 10
        }
    },
    created () {
        this.toPage()
    },
    methods: {
        handleCurrentChange (val) {
            this.page = val
            this.toPage()
        },
        toPage () {
            // 判断登录，未登录跳转到登录页面
            if (!this.userid) {
                this.$router.push({name: 'login'})
            }
            let param = {
                query: {
                    userid: this.userid
                },
                page: this.page,
                pagesize: this.pagesize
            }
            this.ajax.post('/api/getlikes', param, (res) => {
                this.total = res.total
                this.listData = res.result
            })
        }
    }
}
</script>
<style scoped>
.main {
    width: 800px;
    margin: 0 auto;
}
.pageOut {
    text-align: center;
    padding: 20px 0 50px;
}
.me_title {
    font-size: 16px;
}
.me_list {
    font-size: 13px;
    line-height: 2em;
}
.me_list a{
    color: #666;
}
.me_list a:hover{
    color: #ff7546;
}
</style>
