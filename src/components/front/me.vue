<template>
    <div class="outer">
        <dog-header></dog-header>
        <div class="main">
            <div>
                <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">评论的文章</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">点赞的文章</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">修改密码</span>
                  </el-menu-item>
                </el-menu>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import header from './header.vue'
export default {
    components: {
        'DogHeader': header
    }
}
</script>
<style>
.outer {
	width: 100%
}
</style>
