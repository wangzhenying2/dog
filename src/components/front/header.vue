<template>
    <div>
        <div class="header">
            <img src="" alt="好狗狗">
            <div>
                <span v-if="this.$store.state.userInfo !== ''">
                    <router-link :to="{ name: 'like' }" >{{this.$store.state.userInfo.username}}</router-link>
                    <a href="javascript:;" @click="toLogout">退出</a>
                </span>
                <span v-if="this.$store.state.userInfo === ''">
                    <router-link :to="{ name: 'login' }" >登录</router-link>
                    <router-link :to="{ name: 'register' }" >注册</router-link>
                </span>
            </div>
        </div>
        <div class="nav">
            <div class="navcont">
                <router-link :to="{ name: 'index' }" >首页</router-link>
                <router-link v-for="nav in navs" :to="{ path: `/list/${nav.type}/1` }" :key="nav.type">
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
    name: 'dogheader',
    data () {
        return {
        }
    },
    computed: mapState(['navs']),
    created () {
        this.getUserinfo()
    },
    methods: {
        getUserinfo () {
            this.ajax.post('/api/getUserinfo', {userid: this.$store.state.userInfo.userid}, (res) => {
                if (res.success) {
                    this.$store.commit('setUserInfo', res.msg)
                } else {
                    this.$store.commit('setUserInfo', '')
                }
            }, true)
        },
        toLogout () {
            this.ajax.post('/api/logout', {}, (res) => {
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
.navcont {
    display: flex;
    justify-content: space-around;
}
.navcont a {
    display: block;
    padding: 10px 20px;
    line-height: 2em;
    font-size: 16px;
    text-align: center;
    color: #fff;
}

.navcont a:hover {
    background-color: #0B436A;
}

</style>
