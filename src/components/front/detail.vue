<template>
<div>
  <!--面包屑导航-->
  <dog-breadcrumb :title="crumbtitle"></dog-breadcrumb>
  <!--正文内容-->
  <div class="p10">
    <div class="title" data-value="object_name">母狗产后怎么补钙？幼犬需要补钙吗？</div>
    <div class="source-info">
      <span class="date" data-value="object_date" data-filter="date">2018-01-19</span>
      <span class="ask-count"><i data-value="reply_num">0</i>个评论</span>
      <span class="support" data-id="33837" data-islike="0">
        <img src="http://img1.goumin.com/cms/aichong/day_180123/20180123_3b8e2aa.png" class="likeimg33837"><i class="support33837">0</i>
      </span>
    </div>
    <div class="ask-detail" data-value="object_content"></div>
  </div>
</div>
</template>
<script>
import breadcrumb from './breadcrumb.vue'
import {
    mapState,
    mapActions,
    mapMutations
} from 'vuex'
export default {
  components: {
    'dog-breadcrumb': breadcrumb
  },
  data() {
    return {
      crumbtitle: '',
      isThumbon: false,
      group: {
        _id: '',
        title: '',
        cont: '',
        date: '',
        thumb: ''
      }
    }
  },
  computed: mapState(['funArticles']),
  mounted() {
    if (this.$route.query.type == 0) {
      this.crumbtitle = '日志'
    } else if (this.$route.query.type == 1) {
      this.crumbtitle = '知宠'
    }
    this.init()
  },
  methods:{
    init() {
      this.getArts({'_id': this.$route.query.id}).then(() => {
        this.group = this.funArticles[0]
      })
    },
    toThumb() {
      this.isThumbon = !this.isThumbon
      let param = {
        _id: this.group._id,
        thumb: this.isThumbon ? this.group.thumb + 1 : this.group.thumb - 1
      }
      this.setThumb(param).then((data) => {
        if (data.body.success) {
          this.init()
        }
      })
    },
    ...mapActions(['getFun', 'getArts', 'setThumb'])
  }
}
</script>
<style scoped>
h1 {
  font-size: 16px;
  padding: 10px 0;
  text-align: center;
  color: #f98217;
  font-weight: normal;
}
h2 {
  font-size: 14px;
  padding: 5px 0;
  text-align: center;
  border-bottom: 2px dotted #333;
  font-weight: normal;
  margin-bottom: 10px;
}
.thumb {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../../assets/img/good.png) no-repeat left top;
  background-size: 100%;
  margin-left: 10px;
}
.thumbon {
  background-position: 0 -20px;
}
h2 span {
  vertical-align: bottom;
}
</style>