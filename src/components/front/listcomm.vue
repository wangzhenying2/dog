<template>
  <div class="main">
    <dog-list :data="funArticles"></dog-list>
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
    return {}
  },
  created() {
    this.getArts({ type: 1 })
  },
  computed: mapState(['funArticles']),
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
