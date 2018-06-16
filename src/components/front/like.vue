<template>
    <div>
        <div v-for="item in listData">
            
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
        this.type = this.$route.params.type
        this.toPage()
    },
    watch: {
        '$route' (to, from) {
            this.type = this.$route.params.type
            this.toPage()
        }
    },
    methods: {
        handleCurrentChange (val) {
            this.page = val
            this.toPage()
        },
        toPage () {
            this.ajax.post('/api/')
            this.getArts({
                query: {
                    type: this.type
                },
                page: this.page,
                pagesize: this.pagesize
            }).then(res => {
                this.total = res.total
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
