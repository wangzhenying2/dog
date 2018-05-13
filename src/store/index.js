import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navs: [{
      text: '业界资讯',
      name: 'yjzx'
    }, {
      text: '产品时尚',
      name: 'cpss'
    }, {
      text: '犬界轶事',
      name: 'qjys'
    }, {
      text: '超级访谈',
      name: 'cjft'
    }, {
      text: '养护训练',
      name: 'yhxl'
    }],
    showdialog: false,
    listdata: [],
    user: { name: '', pwd: '' },
    articles: []
  },
  getters,
  mutations,
  actions
})
export default store
