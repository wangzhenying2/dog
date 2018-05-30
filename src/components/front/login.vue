<template>
    <div>
        <div class="logo">
            
        </div>
        <div class="loginOut">
            <table>
                <tr>
                    <td>
                        <div class="loginLeft"></div>
                    </td>
                    <td>
                        <div class="loginInfo">
                            <div>用户名：<input type="text" v-model.trim="name">
                            </div>
                            <div>密　码：<input type="password" v-model.trim="pwd">
                            </div>
                            <div class="tip">{{tip}}</div>
                            <a href="javascript:;" class="link1" @click="doLogin">登录</a>
                            <router-link :to="{name: 'register'}" >去注册</router-link> 
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    
</template>
<script>
import {mapActions} from 'vuex'
import {set} from '../../assets/js/cookieUtil'
export default {
    data () {
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
.logo {
    height: 150px;
}
.loginOut {
    background-color: #707928;
}
.loginOut table {
    width: 700px;
    margin: 0 auto;
}
.loginLeft {
    width: 400px;
    height: 320px;
    background:url(../../assets/img/dog2.jpg) no-repeat left bottom;
    background-size: 100%;
}

.loginInfo input {
    width: 130px;
    height: 25px;
    line-height: 25px;
    margin-top: 10px;
    border:1px solid #000;
    padding: 0 10px;
}

.loginInfo {
    width: 300px;
    height: 320px;
    background-color: #E7D1BC;
    text-align: center;
}
.loginInfo a.link1 {
    display: block;
    background-color: #707928;
    color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
}
.loginInfo a.link2 {
    display: block;
    line-height: 20px;
    text-decoration: underline;
}
.tip {
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: red;
}
</style>
