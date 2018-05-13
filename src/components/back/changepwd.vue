<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="新密码">
                <el-input type="password" v-model="pwd" auto-complete="off" placeholder="输入新密码" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="repwd" auto-complete="off" style="width:300px" placeholder="再输入一次"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveSubmit">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pwd: '',
            repwd: ''
        }
    },
    methods: {
        saveSubmit() {
            if (this.pwd.length < 6) {
                this.$message.error('请输入不低于6位的新密码！');
                return;
            }
            if (this.repwd == '') {
                this.$message.error('请再次输入新密码！');
                return;
            }
            if (this.pwd != this.repwd) {
                this.$message.error('两次输入新密码不一致！');
                return;
            }
            this.$store.dispatch('savePwd', this.pwd).then((data) => {
                if (data.data.success) {
                    this.$message.success('密码修改成功！');
                } else {
                    this.$message.error(data.data.msg);
                }
            }).catch(() => {})
        },
        resetForm() {
            this.pwd = this.repwd = ''
        }
    }
}
</script>
