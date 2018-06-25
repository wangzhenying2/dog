<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>》我的点赞</span>
            </div>
            <div v-for="item in listData" :key="item._id" >
                <router-link :to="{path:`/detail/${item.artid._id}`}" style="text-align:right">{{item.artid.title}}</router-link>
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
            listData: [],
            page: 1,
            total: 0,
            pagesize: 20
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
            let param = {
                query: {
                    userid: this.$store.state.userInfo.userid
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
</style>
