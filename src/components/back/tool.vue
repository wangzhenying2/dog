<template>
  <div>
    <el-checkbox-group v-model="checkList" @change="checkedChange">
      <el-checkbox v-for="item in types" :label="item.label" :key="item.label">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox :checked="checkAll" @change="checkAllChange">全选</el-checkbox>
    <el-button type="primary" @click="toSubmit">提交</el-button>
  </div>
</template>
<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

const typeJson = [
  {
    label: 'yjzx',
    name: '业界资讯'
  },
  {
    label: 'cpss',
    name: '产品时尚'
  },
  {
    label: 'qjys',
    name: '犬界轶事'
  },
  {
    label: 'cjft',
    name: '超级访谈'
  },
  {
    label: 'yhxl',
    name: '养护训练'
  },
]

export default {
  data () {
    return {
      checkList: [],
      checkAll: false,
      types: typeJson,
      checkedVal: []
    }
  },
  created () {
    let valueArr = typeJson.map((val) => {
      return val.label
    })
    this.checkedVal = valueArr
  },
  methods: {
    checkAllChange () {
      this.checkAll = !this.checkAll
      this.checkList = this.checkAll ? this.checkedVal : []
    },
    checkedChange (value) {
      this.checkList = value
    },
    toSubmit () {
      this.checkList.map((val) => {
        this.crawler({type: val})
      })
    },
    ...mapActions(['crawler'])
  }
}
</script>
