<template>
    <aside class="sidebar">
        <menu class="nav">
            <ul>
                <router-link :to="{name:'art', query: {type: 'yjzx'}}" tag="li">
                    <i class="fa fa-list-ul fa-fw"></i>
                    <span>业界资讯</span>
                </router-link>
                <router-link :to="{name:'art', query: {type: 'cpss'}}" tag="li">
                    <i class="fa fa-list-ul fa-fw"></i>
                    <span>产品时尚</span>
                </router-link>
                <router-link :to="{name:'art', query: {type: 'qjys'}}" tag="li">
                    <i class="fa fa-list-ul fa-fw"></i>
                    <span>犬界轶事</span>
                </router-link>
                <router-link :to="{name:'art', query: {type: 'cjft'}}" tag="li">
                    <i class="fa fa-list-ul fa-fw"></i>
                    <span>超级访谈</span>
                </router-link>
                <router-link :to="{name:'art', query: {type: 'yhxl'}}" tag="li">
                    <i class="fa fa-list-ul fa-fw"></i>
                    <span>养护训练</span>
                </router-link>
                <router-link :to="{name:'changepwd'}" tag="li">
                    <i class="fa fa-user fa-fw"></i>
                    <span>修改密码</span>
                </router-link>
                <router-link :to="{name:'tool'}" tag="li">
                    <i class="fa fa-user fa-fw"></i>
                    <span>简便工具</span>
                </router-link>
            </ul>
        </menu>
    </aside>
</template>
<script>
export default {

}
</script>
<style>
.sidebar li{
    cursor: pointer;
}
</style>
