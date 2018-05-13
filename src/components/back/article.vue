<template>
  <div class="fun">
    <div class="pb10">
      <el-button type="info" @click="addFun()">新增</el-button>
    </div>
    <el-table :data="articles" border :fit="true" style="width:100%">
      <el-table-column prop="_id" label="ID" width="230px" header-align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="200px" header-align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建日期" width="180px" align="center"></el-table-column>
      <el-table-column prop="imgsrc" label="标题图片地址" width="150px" align="center"></el-table-column>
      <el-table-column prop="desc" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template scope="scope">
          <el-button type="success" size="small" @click="addFun(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="delFun(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible="visibleDialog" :before-close="closeDialog" size="large">
      <el-form :model="form" label-width="150px">
        <el-form-item label="标题">
          <el-input type="textarea" v-model="form.title" :autosize="true" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="标题图片地址">
          <el-input type="textarea" v-model="form.imgsrc" :autosize="true" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc" :autosize="true" style="width:50%"></el-input>
        </el-form-item>
        <aym-ueditor :config="config" :value="form.cont" v-on:change="getContent"></aym-ueditor>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取 消</el-button>
        <el-button type="primary" @click="addFunCommit()">确 定</el-button>
      </div>
    </el-dialog>
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
      visibleDialog: true,
      config: {
        frameWidth: '100%',
        frameHeight: '550'
      },
      form: {
        title: '',
        imgsrc: '',
        desc: '',
        cont: '',
        id: ''
      },
      tempContent: '' // 实时内容
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getArts({ type: this.type })
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.query.type
      this.getArts({ type: this.type })
    }
  },
  mounted () {
    this.visibleDialog = false
  },
  computed: mapState(['articles', 'showdialog']),
  methods: {
    getContent (data) {
      this.tempContent = data
    },
    closeDialog () {
      this.form.cont = this.tempContent
      this.visibleDialog = false
    },
    addFun (row) {
      this.visibleDialog = true
      if (row) {
        this.form.title = row.title || ''
        this.form.cont = row.cont || ''
        this.form._id = row._id || ''
        this.form.imgsrc = row.imgsrc || ''
        this.form.desc = row.desc || ''
      } else {
        this.form.title = ''
        this.form.cont = ''
        this.form._id = ''
        this.form.imgsrc = ''
        this.form.desc = ''
      }
    },
    addFunCommit () {
      this.form.cont = this.tempContent
      if (this.form.title === '') {
        return this.$message.error('请输入标题！')
      }
      if (this.form.desc === '') {
        return this.$message.error('请输入描述！')
      }
      if (this.form.cont === '') {
        return this.$message.error('请输入内容！')
      }
      const param = {
        title: this.form.title,
        imgsrc: this.form.imgsrc,
        desc: this.form.desc,
        cont: this.form.cont,
        type: this.type
      }
      if (this.form._id) {
        param._id = this.form._id
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
<style>


</style>
