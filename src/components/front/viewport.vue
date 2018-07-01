<template>
    <div class="outer">
        <dog-header></dog-header>
        <router-view></router-view>
    </div>
</template>
<script>
import dogheader from './header.vue'
export default {
    components: {
        'DogHeader': dogheader
    }
}
</script>
<style>
.outer {
    width: 100%
}
</style>
