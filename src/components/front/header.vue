<template>
    <div>
        <div class="header">
            <img src="" alt="好狗狗">
        </div>
        <div class="nav">
            <div class="navcont">
                <router-link v-for="nav in navs" :to="{path:`/list/${nav.type}`}"  :key="nav.type">
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
    name: 'header',
    data () {
        return {}
    },
    computed: mapState(['navs']),
    methods: {
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

.navcont a {
    display: inline-block;
    width: 20%;
    padding: 10px 0;
    line-height: 2em;
    font-size: 16px;
    text-align: center;
    color: #fff;
}

.navcont a:hover {
    background-color: #0B436A;
}

</style>
