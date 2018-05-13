<template>
    <div class="loginOut">
        <div class="login">
            <div class="loginInfo">
                <div>
                    <input type="text" placeholder="请输入账号" v-model.trim="name">
                </div>
                <div>
                    <input type="password" placeholder="请输入密码" v-model.trim="pwd">
                </div>
                <div class="tip">{{tip}}</div>
                <a href="javascript:;" @click="doLogin">登录</a>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import {set} from '../../assets/js/cookieUtil'
export default {
    data() {
            return {
                name: '',
                pwd: '',
                tip: ''
            }
        },
        methods: {
            doLogin() {
                // 验证
                if (this.name == '') {
                    return this.tip = '请输入账号！'
                }
                if (this.pwd.length < 6) {
                    return this.tip = '请输入密码，不低于6位'
                }
                // 登录
                this.login({name: this.name, pwd: this.pwd})
                  .then(() => {
                    const date = new Date(Date.now() + 60000 * 30)
                    set('user', this.name, date, '/', window.location.hostname)
                    this.$router.push({name: 'fun'})
                }).catch(msg => {this.tip = msg})
            },
            cleartip() {
                this.tip = ''
            },
            ...mapActions(['login'])
        },
        watch: {
            name: 'cleartip',
            pwd: 'cleartip'
        }
}
</script>
<style scoped>
.loginOut {
    border-bottom: 5px solid #88AADA;
}
.login {
    width: 400px;
    height: 200px;
    background:url(../../assets/img/dog1.png) no-repeat left bottom;
    background-size: 100%;
    margin: 10% auto 0;
}

.login input {
    width: 130px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    border:1px solid #88AADA;
    padding: 0 10px;
}
.loginInfo {
    padding: 50px 0 0 180px;
    text-align: center;
}
.tip {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: red;
}
</style>
