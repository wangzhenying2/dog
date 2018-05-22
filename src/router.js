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
import detail from './components/front/detail.vue'

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
      { path: 'list/:type', name: 'list', component: listcomm },
      { path: 'detail/:id', name: 'detail', component: detail }
    ]
  }]
})
