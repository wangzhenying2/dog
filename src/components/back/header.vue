<template>
    <div class="header_out">
        <h1 class="logo"></h1>
        <div class="header_btn">
            欢迎您<strong>{{ name }}</strong> <el-button type="info" @click="onLogout()">退出</el-button>
        </div>
    </div>
</template>
<script>
import {unset, get} from '../../assets/js/cookieUtil'
import {mapMutations} from 'vuex'
export default {
    name: 'header',

    methods: {
        onLogout () {
            unset('user', '/', window.location.hostname)
            this.SET_USER({name: '', pwd: ''})
            this.$router.push({name: 'login'})
        },
        ...mapMutations(['SET_USER'])
    },
    computed: {
        name () {
            return get('user')
        }
    }
}
</script>
<style>
.logo {}
.header_out {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 1000;
    background-color: #434A50;
}
.header_btn {
    text-align: right;
    font-size: 14px;
    padding-right: 20px;
    color: #fff;
}
</style>
