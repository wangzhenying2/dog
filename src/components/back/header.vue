<template>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col :span="12">
            <h1 class="logo"></h1>
        </el-col>
        <el-col :span="12">
            <div class="header_btn">
                欢迎您<strong>{{ name }}</strong>
                <el-button type="text" @click="onLogout()">退出</el-button>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import {unset, get} from '../../assets/js/cookieUtil'
import {mapMutations} from 'vuex'
export default {
    name: 'header',

    methods: {
        onLogout() {
            unset('user', '/', window.location.hostname)
            this.SET_USER({name: '', pwd: ''})
            this.$router.push({name: 'login'})
        },
        ...mapMutations(['SET_USER'])
    },
    computed: {
        name() {
            return get('user')
        }
    }
}
</script>
<style>
.logo {}

.header_btn {
    text-align: right;
    font-size: 16px;
    padding-right: 20px;
}
</style>
