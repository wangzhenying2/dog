<template>
    <div class="loginOut">
        <div class="loginInfo">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>登录</span>
              </div>
              <div>
                <div class="each">
                    <el-input v-model="name" placeholder="请输入用户名"></el-input>
                </div>
                <div class="each">
                    <el-input v-model="pwd" placeholder="请输入密码"></el-input>
                </div>
                <div class="each">
                    <el-button type="warning" @click="doLogin">登录</el-button>
                </div>
                <div class="each">
                    <router-link :to="{name: 'register'}" ><el-button type="text">去注册</el-button></router-link>
                </div>
              </div>
            </el-card>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            name: '',
            pwd: ''
        }
    },
    methods: {
        doLogin () {
            // 验证
            if (this.name === '') {
                this.$message({
                    type: 'warning',
                    message: '请输入用户名！',
                    showClose: true
                })
                return
            }
            if (this.pwd.length < 6) {
                this.$message({
                    type: 'warning',
                    message: '请输入密码，不低于6位',
                    showClose: true
                })
                return
            }

            // 登录
            this.ajax.post('/api/login', {name: this.name, pwd: this.pwd}, (res) => {
                this.$store.commit('setUserInfo', res.result)
                this.$router.push(this.$route.query.redirect || '/')
            })
        }
    }
}
</script>
<style scoped>
.loginOut {
    padding: 50px 0;
    /* background: url(../../assets/img/login-bg.png); */
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center bottom;
}

.loginInfo {
    height: 300px;
    margin: auto;
    width: 300px;
    background-color: #fff;
    text-align: center;
}

.loginInfo .each {
    margin-bottom: 20px;
}
</style>
