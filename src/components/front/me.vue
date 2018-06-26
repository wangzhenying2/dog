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
                      :router="true"
                      active-text-color="#ffd04b">
                      <el-menu-item index="comment"><i class="el-icon-document"></i>评论的文章</el-menu-item>
                      <el-menu-item index="like"><i class="el-icon-document"></i>点赞的文章</el-menu-item>
                      <el-menu-item index="changepwd"><i class="el-icon-edit"></i>修改密码</el-menu-item>
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
