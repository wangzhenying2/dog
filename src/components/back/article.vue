<template>
    <div class="fun">
        <div class="pb10">
            <el-button type="info" @click="addFun()">新增</el-button>
        </div>
        <el-table :data="articles" border :fit="true" style="width:100%">
            <el-table-column prop="_id" label="ID" width="230px" header-align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="200px" header-align="center"></el-table-column>
            <el-table-column prop="createtime" label="创建日期" width="180px" align="center"></el-table-column>
            <el-table-column prop="desc" label="描述" header-align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="150px">
                <template scope="scope">
                    <el-button type="success" size="small" @click="addFun(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delFun(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageOut">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <el-dialog title="新增" :visible="visibleDialog" :before-close="closeDialog" size="large">
            <el-form :model="form" label-width="150px">
                <el-form-item label="标题">
                    <el-input type="textarea" v-model="form.title" :autosize="true" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.desc" :autosize="true" style="width:50%"></el-input>
                </el-form-item>
                <div v-show="ueditorShow">
                    <aym-ueditor :config="config" :value="form.cont" v-on:change="getContent"></aym-ueditor>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="toNext()" v-show="!ueditorShow">下一步</el-button>
                <el-button type="primary" @click="addFunCommit()" v-show="ueditorShow">确 定</el-button>
            </div>
        </el-dialog>
        <div v-html="tempContent"></div>
    </div>
</template>
<script>
import {
    mapState,
    mapActions,
    mapMutations
} from 'vuex'
import ueditor from '../editor/ueditor.vue'
export default {
    components: {
        'aym-ueditor': ueditor
    },
    data () {
        return {
            type: '',
            page: 1,
            total: 0,
            pagesize: 20,
            visibleDialog: true,
            ueditorShow: true,
            config: {
                frameWidth: '100%',
                frameHeight: '550',
                id: ''
            },
            form: {
                title: '',
                imgOrigin: '',
                desc: '',
                cont: '',
                id: ''
            },
            tempContent: '' // 实时内容
        }
    },
    created () {
        this.type = this.$route.query.type
        this.getArts({
            query: {
                type: this.type
            },
            page: this.page,
            pagesize: this.pagesize
        }).then(res => {
            this.total = res.total
        })
    },
    watch: {
        '$route' (to, from) {
            this.type = this.$route.query.type
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
    },
    mounted () {
        this.visibleDialog = false
    },
    computed: mapState(['articles', 'showdialog']),
    methods: {
        // 下一步
        toNext () {
            if (this.form.title === '') {
                return this.$message.error('请输入标题！')
            }
            const param = {
                title: this.form.title,
                imgOrigin: this.form.imgOrigin,
                desc: this.form.desc,
                type: this.type
            }
            this.addArtsComm(param)
            .then((res) => {
                this.form.id = res.result.id
                this.config.id = this.form.id
                this.ueditorShow = true
            })

        },
        // 分页
        handleCurrentChange (val) {
            this.page = val
            this.getArts({
                query: {
                    type: this.type
                },
                page: this.page,
                pagesize: this.pagesize
            }).then(res => {
                this.total = res.total
            })
        },
        getContent (data) {
            this.tempContent = data
        },
        // 关闭弹窗
        closeDialog () {
            this.form.cont = this.tempContent
            this.visibleDialog = false
        },
        // 新增，编辑-打开弹窗
        addFun (row) {
            this.visibleDialog = true
            if (row) {
                this.ueditorShow = true
                this.form.title = row.title || ''
                this.form.cont = row.cont || ''
                this.form.id = row._id || ''
                this.form.imgOrigin = row.imgOrigin || ''
                this.form.desc = row.desc || ''
            } else {
                this.ueditorShow = false
                this.form.title = ''
                this.form.cont = ''
                this.form.id = ''
                this.form.imgOrigin = ''
                this.form.desc = ''
            }
            this.config.id = this.form.id
        },
        // 新增，编辑-提交
        addFunCommit () {
            this.form.cont = this.tempContent
            if (this.form.title === '') {
                return this.$message.error('请输入标题！')
            }
            if (this.form.cont === '') {
                return this.$message.error('请输入内容！')
            }
            const param = {
                title: this.form.title,
                imgOrigin: this.form.imgOrigin,
                desc: this.form.desc,
                cont: this.form.cont,
                type: this.type
            }
            if (this.form.id) {
                param._id = this.form.id
            }
            this.addArtsComm(param)
            .then((res) => {
                this.$message({
                    type: 'success',
                    message: res.msg
                })
                this.visibleDialog = false
                this.getArts({ type: this.type })
            })
        },
        // 删除
        delFun (id) {
            this.$confirm('确认删除该文件?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delArtsComm(id)
            }).then(() => {
                this.getArts({ type: this.type })
            }).catch(() => {})
        },
        ...mapActions(['getArts', 'addArtsComm', 'delArtsComm'])
    }
}
</script>
<style scoped>
.pageOut {
    text-align: center;
    padding: 20px 0 50px;
}
</style>
