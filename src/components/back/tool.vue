<template>
  <div>
    <el-form label-width="100px">
      <el-form-item>
        <el-button type="primary" @click="crawler">提交</el-button>
      </el-form-item>
    </el-form>
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
      pwd: '',
      repwd: ''
    }
  },
  methods: {
    ...mapActions(['crawler'])
  }
}
</script>
