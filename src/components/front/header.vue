<template>
    <div>
        <div class="header">
            <img src="" alt="好狗狗">
            <div>
                <span v-if="isLogin">
                    {{userInfo.username}}
                    <a href="javascript:;" @click="toLogout">退出</a>
                </span>
                <span v-if="!isLogin">
                    <router-link :to="{ name: 'login' }" >登录</router-link>
                    <router-link :to="{ name: 'register' }" >注册</router-link>
                </span>
            </div>
            
        </div>
        <div class="nav">
            <div class="navcont">
                <router-link v-for="nav in navs" :to="{ path: `/list/${nav.type}` }" :key="nav.type">
                    {{nav.text}}
                </router-link> 
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    name: 'header',
    data () {
        return {
            userInfo: this.$store.state.userInfo,
            isLogin: false
        }
    },
    computed: mapState(['navs']),
    created () {
        this.getUserinfo()
    },
    methods: {
        getUserinfo () {
            this.ajax.post('/api/getUserinfo', {userid: this.userInfo.userid}, (res) => {
                this.isLogin = res.success
            }, true)
        },
        toLogout () {
            this.ajax.post('/api/logout', {}, (res) => {
                this.isLogin = false
                this.$store.commit('setUserInfo', '')
            })
        },
        navEvent (name) {
            this.$router.push({ name: name })
        },
        ...mapMutations(['SET_CURNAV'])
    }
}
</script>
<style>
.nav{
    background-color: #1D62B2;
    color: #fff;
}

.navcont, .header  {
    width: 800px;
    margin: 0 auto;
}

.navcont a {
    display: inline-block;
    width: 20%;
    padding: 10px 0;
    line-height: 2em;
    font-size: 16px;
    text-align: center;
    color: #fff;
}

.navcont a:hover {
    background-color: #0B436A;
}

</style>
