<template>
    <div class="sidebar">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true">
            <el-menu-item :index="{name:'ads'}">广告位管理</el-menu-item>
            <el-menu-item :index="{name:'art', query: {type: 'yjzx'}}">业界资讯</el-menu-item>
            <el-menu-item :index="{name:'art', query: {type: 'cpss'}}">产品时尚</el-menu-item>
            <el-menu-item :index="{name:'art', query: {type: 'qjys'}}">犬界轶事</el-menu-item>
            <el-menu-item :index="{name:'art', query: {type: 'cjft'}}">超级访谈</el-menu-item>
            <el-menu-item :index="{name:'art', query: {type: 'yhxl'}}">养护训练</el-menu-item>
            <el-menu-item :index="{name:'tool'}">简便工具</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.sidebar {
    position: fixed;
    top: 50px;
    width: 200px;
    z-index: 1000;
}
</style>
