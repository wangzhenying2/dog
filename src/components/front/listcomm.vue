<template>
  <div class="main">
    <dog-list :data="{type: type, articles: articles}"></dog-list>
    <div class="pageOut">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="sizeArr"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import dogList from './listModel.vue'
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
let sizeData = [20, 40, 60, 80, 100]

export default {
  components: {
    'dog-list': dogList
  },
  data () {
    return {
      sizeArr: sizeData,
      type: '',
      page: 1,
      total: 0,
      pagesize: sizeData[0]
    }
  },
  created () {
    this.type = this.$route.params.type
    this.toPage()
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.params.type
      this.toPage()
    }
  },
  computed: mapState(['articles']),
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.toPage()
    },
    handleCurrentChange (val) {
      this.page = val
      this.toPage()
    },
    toPage () {
      this.getArts({
        query: {
          type: this.type
        },
        page: this.page,
        pagesize: this.pagesize
      }).then(res => {
        this.total = res.total
      })
    },
    ...mapActions(['getArts'])
  }
}
</script>
<style scoped>
.main {
  width: 800px;
  margin: 0 auto;
}
.pageOut {
  text-align: center;
  padding: 20px 0 50px;
}
</style>
