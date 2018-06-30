<template>
    <div>
        <dog-header></dog-header>
        <dog-side></dog-side>
        <div class="main_out">
            <router-view></router-view>
        </div>
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
<style scoped>
.main_out {
    margin: 50px 0 0 200px;
}
</style>
