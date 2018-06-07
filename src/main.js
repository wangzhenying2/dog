// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import { mapState } from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Global from './assets/js/global'
import App from './App'
import store from './store'
import router from './router.js'
import './assets/css/base.css'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(Global)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    computed: mapState(['isLoading', 'isToasting'])
})
