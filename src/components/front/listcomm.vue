<template>
  <div class="main">
    <dog-list :data="{type: type, articles: articles}"></dog-list>
  </div>
</template>
<script>
import dogList from './listModel.vue'
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
export default {
  components: {
    'dog-list': dogList
  },
  data() {
    return {
      type: ''
    }
  },
  created() {
    this.type = this.$route.params.type
    this.getArts({ type: this.type })
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.params.type
      this.getArts({ type: this.type })
    }
  },
  computed: mapState(['articles']),
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

</style>
