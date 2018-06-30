import Vue from 'vue'
import moment from 'moment'

export default {

    // 文章-获取列表
    getArts ({ commit }, param) {
        return Vue.http.post('/api/getArts', param)
            .then(res => {
                let result = res.data.result
                result.forEach((item) => {
                    item.createtime = moment(item.createtime).format('YYYY-MM-DD HH:mm:ss')
                })
                commit('SET_ARTS', res.data)
                return res.data
            })
    },

    // 文章-新增
    addArtsComm ({ commit }, param) {
        return Vue.http.post('/api/addArts', param)
            .then(res => {
                if (res.data.success) {
                    return res.data
                }
            })
    },

    // 文章-删除
    delArtsComm ({ state, commit, dispatch }, id) {
        return Vue.http.post('/api/delArts', { id })
            .then(res => {
                if (res.data.success) {
                    commit('SHOW_DIALOG', false)
                }
            })
    },

    // 登录-提交
    login ({ commit }, payload) {
        return Vue.http.post('/api/login', payload)
            .then(response => {
                if (response.data.state === 1) {
                    commit('SET_USER', payload)
                } else {
                    return Promise.reject(response.data.msg)
                }
            })
    },
    // 爬虫工具-抓取数据
    crawler ({ state, commit }, param) {
        return Vue.http.post('/api/crawler', param)
    }
}
