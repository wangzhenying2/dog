<template>
    <div>
        <div class="p10">
            <el-table :data="ads" border :fit="true" style="width:100%">
                <el-table-column prop="_id" label="id" header-align="center"></el-table-column>
                <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
                <el-table-column prop="src" label="图片" header-align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.src" width="150px">
                    </template>
                </el-table-column>
                <el-table-column prop="url" label="外链地址" width="180px"></el-table-column>
                <el-table-column prop="remark" label="备注" width="180px"></el-table-column>
                <el-table-column label="操作" align="center" width="150px">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="info" size="small" @click="del(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="编辑" :visible="visibleDialog" :show-close="false">
            <el-form :model="form" label-width="150px">
                <el-form-item label="名称">
                    {{form.name}}
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        name="imageFile"
                        class="avatar-uploader"
                        action="/api/uploadimg"
                        :data="form.uploadData"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.src" :src="form.src" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="外链地址">
                    <el-input v-model="form.url" :autosize="true" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" :autosize="true" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="() => {this.visibleDialog = false}" >取消</el-button>
                <el-button type="primary" @click="toSubmit" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            ads: [],
            form: {
                id: '',
                name: '',
                src: '',
                url: '',
                remark: '',
                uploadData: {
                    dir: 'ad/',
                    filename: ''
                }
            },
            visibleDialog: false
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.ajax.post('/api/ads', {}, (res) => {
                this.ads = res.result
            })
        },
        // 编辑
        edit (row) {
            this.form.id = row._id
            this.form.name = row.name
            this.form.src = row.src
            this.form.url = row.url
            this.form.remark = row.remark
            this.form.uploadData.filename = row.name
            this.visibleDialog = true
        },
        // 编辑-提交
        toSubmit () {
            if (this.form.src === '') {
                this.$message.error('请上传图片!')
                return
            }
            let param = {
                _id: this.form.id,
                name: this.form.name,
                src: this.form.src,
                url: this.form.url,
                remark: this.form.remark
            }
            this.ajax.post('/api/ads/modify', param, (res) => {
                this.visibleDialog = false
                this.init()
            })
        },
        // 删除
        del (id) {
            if (confirm('确认删除吗?')) {
                this.ajax.post('/api/ads/del', {id: id}, (res) => {
                    this.init()
                })
            }
        },
        handleAvatarSuccess (res, file) {
            if (res.success) {
                this.form.src = res.path
            } else {
                this.$message.error('上传失败!')
            }
        },
        beforeAvatarUpload (file) {
            const isFormat = (file.type === 'image/jpeg' || file.type === 'image/png')
            const isSize = file.size / 1024 / 1024 < 2

            if (!isFormat) {
                this.$message.error('请上传JPG/PNG格式的图片!')
            }
            if (!isSize) {
                this.$message.error('上传图片大小不能超过2MB!')
            }
            return isFormat && isSize
        }
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    min-height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    min-height: 100px;
    display: block;
  }
</style>
