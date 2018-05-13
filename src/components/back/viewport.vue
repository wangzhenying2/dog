<template>
    <div>
        <dog-header></dog-header>
        <el-row>
            <el-col :span="4">
                <dog-side></dog-side>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import header from './header.vue'
import sidebar from './sidebar.vue'
export default {
    components: {
        'DogHeader': header,
        'DogSide': sidebar
    }
}
</script>
<style>
</style>
