<template>
<div class="main">
    <div class="index_ads" v-if="ads[0].url"><a :href="ads[0].url" target="_blank"><img :src="ads[0].src" width="100%"></a></div>
    <el-card class="box-card">
        <div slot="header" class="card_title">
            <span>热点时尚</span>
            <router-link :to="{path:'/list/cpss'}" style="text-align:right">更多</router-link>
        </div>
        <div class="card_cont">
            <div v-for="item in hotData" :key="item._id" class="each">
                <router-link :to="{path: `/detail/${item._id}`}" >
                    <img :src="`static/art${item.imgOrigin}`">
                    {{ item.title }}
                </router-link>
            </div>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="card_title">
            <span>最新资讯</span>
            <router-link :to="{path:'/list/yjzx'}" style="text-align:right">更多</router-link>
        </div>
        <div class="card_cont1">
            <div v-for="item in newsData" :key="item._id" class="each">
                <router-link :to="{path: `/detail/${item._id}`}" >{{ item.title }}</router-link>
                <div class="time">{{ item.createtime.split(' ')[0] }}</div>
            </div>
        </div>
    </el-card>
    <div class="index_ads" v-if="ads[1].url"><a :href="ads[1].url" target="_blank"><img :src="ads[1].src" width="100%"></a></div>
    <el-card class="box-card">
        <div slot="header" class="card_title">
            <span>犬界轶事</span>
            <router-link :to="{path:'/list/qjys'}" style="text-align:right">更多</router-link>
        </div>
        <div class="card_cont">
            <div v-for="item in storyData" :key="item._id" class="each">
                <router-link :to="{path: `/detail/${item._id}`}" >
                    <img :src="`static/art${item.imgOrigin}`">
                    {{ item.title }}
                </router-link>
            </div>
        </div>
    </el-card>
</div>
</template>
<script>
import moment from 'moment'
import {
    mapActions
} from 'vuex'

export default {
    data () {
        return {
            hotData: [],
            newsData: [],
            storyData: [],
            today: '',
            ads: []
        }
    },
    created () {
        // 获取当前日期
        this.ajax.post('/api/getdate', {}, (res) => {
            this.today = moment(res.today).format('YYYY-MM-DD')
        })
        // 产品时尚-评论数倒叙获取前10条
        this.getArts({
            query: {
                type: 'cpss'
            },
            sort: {'commentsum': -1},
            page: this.page,
            pagesize: 8
        }).then(res => {
            this.hotData = res.result
        })

        // 业界资讯-时间倒叙获取前10条
        this.getArts({
            query: {
                type: 'yjzx'
            },
            sort: {'_id': -1},
            page: this.page,
            pagesize: 10
        }).then(res => {
            this.newsData = res.result
        })

        // 犬界轶事-时间倒叙获取前10条
        this.getArts({
            query: {
                type: 'qjys'
            },
            sort: {'_id': -1},
            page: this.page,
            pagesize: 10
        }).then(res => {
            this.storyData = res.result
        })

        // 获取广告位
        this.ajax.post('/api/ads', {}, (res) => {
            this.ads = res.result
        })
    },
    methods: {

        ...mapActions(['getArts'])
    }
}
</script>
<style scoped>
.main {
    width: 800px;
    margin: 0 auto;
}
.index_ads {
}
.box-card {
    margin-top: 20px;
}
.card_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card_title span{
    color: #ff7546;
    font-size: 24px;
}
.card_title a{
    font-size: 14px;
    color: #999;
}
.card_cont {
    display: flex;
    flex-flow: row wrap;
}
.card_cont .each{
    width: 23%;
    padding: 1%;

}
.card_cont .each a{
    display: block;
    line-height: 2em;
    color: #666;
    height: 190px;
    overflow: hidden;
}
.card_cont .each img{
    width: 100%;
    height: 130px;
}
.card_cont1 {
    display: flex;
    flex-flow: column;
}
.card_cont1 .each{
    display: flex;
    justify-content: space-between;
    line-height: 2em;
    font-size: 14px;
}
.card_cont1 .each a{
    width: 600px;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #666;
}
.card_cont1 .each a:hover, .card_title a:hover{
    color: #ff7546;
}
.card_cont1 .time{
}
</style>
