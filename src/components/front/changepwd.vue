<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>》修改密码</span>
            </div>
            <el-form label-width="100px">
                <el-form-item label="新密码">
                    <el-input type="password" v-model="pwd" auto-complete="off" placeholder="输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="repwd" auto-complete="off" placeholder="再输入一次"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>

export default {
    data () {
        return {
            userid: this.$store.state.userInfo.userid,
            pwd: '',
            repwd: ''
        }
    },
    created () {
        if (!this.userid) {
            this.$router.push({name: 'login'})
        }
    },
    methods: {
        saveSubmit () {
            if (this.pwd.length < 6) {
                this.$message.error('请输入不低于6位的新密码！')
                return
            }
            if (this.repwd === '') {
                this.$message.error('请再次输入新密码！')
                return
            }
            if (this.pwd !== this.repwd) {
                this.$message.error('两次输入新密码不一致！')
                return
            }
            let param = {
                userid: this.userid,
                pwd: this.pwd
            }
            this.post('/api/savePwd', param, (res) => {
                this.$message.success('密码修改成功！')
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
