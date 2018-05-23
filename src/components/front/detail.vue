<template>
<div class="main">
  <!--正文内容-->
  <div class="detail">
    <div class="title" data-value="object_name">{{group.title}}</div>
    <div class="source-info">
      <span class="date" data-value="object_date" data-filter="date">{{group.createtime}}</span>
      <span class="ask-count"><i data-value="reply_num">0</i>个评论</span>
      <span class="support" >
        <img src="http://img1.goumin.com/cms/aichong/day_180123/20180123_3b8e2aa.png" class="likeimg33837"><i class="support33837">0</i>
      </span>
    </div>
    <div class="ask-detail" data-value="object_content" v-html="group.cont"></div>
  </div>
</div>
</template>
<script>
import {
    mapState,
    mapActions,
    mapMutations
} from 'vuex'
export default {
  data () {
    return {
      crumbtitle: '',
      isThumbon: false,
      group: {}
    }
  },
  computed: mapState(['articles', 'navs']),
  created () {
    this.getArts({
      query: {
        '_id': this.$route.params.id
      }
    }).then(() => {
      // 赋值
      this.group = this.articles[0]
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
.detail {
  padding: 50px 0;
}
.detail .ask-detail {
  color: #555;
  font-size: 16px;
  line-height: 1.8em;
}
.detail .imgOut {
  text-align: center;
  padding: 10px 0;
}
.detail .title{
  color: #444;
  font-size: 20px;
  line-height: 2em;
  overflow:hidden;
  margin: 10px 0;
  font-weight: bold;
  text-align: center;
}
.detail .source-info{
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
 }
</style>