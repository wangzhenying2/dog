import Vue from 'vue'
import Router from 'vue-router'
/* 后台 */
import viewport from './components/back/viewport.vue'
import article from './components/back/article.vue'
import tool from './components/back/tool.vue'
/* 前端 */
import frontviewport from './components/front/viewport.vue'
import index from './components/front/index.vue'
import listcomm from './components/front/listcomm.vue'
import detail from './components/front/detail.vue'
import login from './components/front/login.vue'
import register from './components/front/register.vue'
import me from './components/front/me.vue'
import like from './components/front/like.vue'
/*import changepwd from './components/front/changepwd.vue'
import comment from './components/front/comment.vue'*/

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/register',
        name: 'register',
        component: register
    }, {
        path: '/back',
        redirect: '/back/art',
        component: viewport,
        children: [
            { path: 'art', name: 'art', component: article },
            { path: 'tool', name: 'tool', component: tool }
        ]
    }, {
        path: '/',
        redirect: '/index',
        component: frontviewport,
        children: [
            { path: 'index', name: 'index', component: index },
            { path: 'list/:type', name: 'list', component: listcomm },
            { path: 'detail/:id', name: 'detail', component: detail }
        ]
    }, {
        path: '/me',
        redirect: '/me/like',
        component: me,
        children: [
            { path: 'like', name: 'like', component: like }
            /*{ path: 'comment', name: 'comment', component: comment },
            { path: 'changepwd', name: 'changepwd', component: changepwd }*/
        ]
    }]
})
