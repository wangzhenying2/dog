<template>
<div>
  <!--面包屑导航-->
  <dog-breadcrumb :title="crumbtitle"></dog-breadcrumb>
  <!--正文内容-->
  <div class="p10">
    <h1>{{group.title}}</h1>
    <h2>
      发布时间：{{group.date}}
      <span :class="{'thumb': true, 'thumbon': isThumbon}" @click="toThumb"></span>
      <span>{{group.thumb}}</span>
    </h2>
    <div v-html="group.cont"></div>
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