import Vue from 'vue'
import Router from 'vue-router'
/* 后台 */
import viewport from './components/back/viewport.vue'
import login from './components/back/login.vue'
import article from './components/back/article.vue'
import changepwd from './components/back/changepwd.vue'
import tool from './components/back/tool.vue'
/* 前端 */
import frontviewport from './components/front/viewport.vue'
import listcomm from './components/front/listcomm.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/back',
    redirect: '/back/art',
    component: viewport,
    children: [
      { path: 'art', name: 'art', component: article },
      { path: 'changepwd', name: 'changepwd', component: changepwd },
      { path: 'tool', name: 'tool', component: tool }
    ]
  }, {
    path: '/',
    component: frontviewport,
    children: [
      { path: 'yjzx', name: 'yjzx', component: listcomm },
      { path: 'cpss', name: 'cpss', component: listcomm },
      { path: 'qjys', name: 'qjys', component: listcomm },
      { path: 'cjft', name: 'cjft', component: listcomm },
      { path: 'yhxl', name: 'yhxl', component: listcomm }
    ]
  }]
})
