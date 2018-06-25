<template>
    <div class="outer">
        <dog-header></dog-header>
        <div class="main">
            <div class="main_out">
                <div class="me_l">
                    <el-menu
                      default-active="1"
                      class="el-menu-vertical-demo"
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
                        <i class="el-icon-menu"></i>
                        <span slot="title">修改密码</span>
                      </el-menu-item>
                    </el-menu>
                </div>
                <div class="me_r">
                    <router-view></router-view>
                </div>
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
<style scoped>
.outer {
	width: 100%
}
.main {
  width: 800px;
  margin: 0 auto;
}
.main_out {
  display: flex;
  flex-flow: row;
}
.me_l {
  width: 200px;
}
.me_r {
  width: 600px;
}
</style>
