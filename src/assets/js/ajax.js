/*
 * 用例： ajax.post(url, params, callback, { dataType: 'form' })
 * dataType: json: 默认，不用传，form: 普通form类型，multi: 二进制文件form类型
 */

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

// 跨域允许传cookie
axios.defaults.credentials = true

// 全局挂载ajax
Vue.prototype.ajax = axios

const doAction = (type, url, params, callback, responseAll) => {
    // 请求主体
    return axios[type](url, params).then((response) => {
        let res = response.data
        // 拦截未登录状态
        /* if (res.code && res.code === '-1999') {
            Message({
                type: 'warning',
                message: res.resultDes || '请先登录！',
                showClose: true
            })
            window.location.href = window.location.origin + '/login'
            return
        } */

        // 回调函数里报错会上升到Promise，触发错误catch，所以用try处理
        try {
            if (responseAll) {
                callback(res)
            } else {
                // 自定义处理结果
                if (res.success) {
                    callback(res)
                } else {
                    Message({
                        type: 'warning',
                        message: res.msg,
                        showClose: true
                    })
                }
            }
        } catch (e) {
            Message({
                type: 'error',
                message: String(e),
                showClose: true
            })
        }
        return Promise.resolve(response)
    }).catch((error) => {
        Message({
            type: 'error',
            message: `Code：[${error.response.status}]，接口错误，请检查！`,
            showClose: true
        })
        return Promise.reject(error)
    })
}

export default {
    get (...args) {
        return doAction('get', ...args)
    },
    post (...args) {
        return doAction('post', ...args)
    },
    all (...args) {
        return axios.all([...args]).then(axios.spread(function (...res) {
            return Promise.resolve(res)
        })).catch((error) => {
            return Promise.reject(error)
        })
    }
}
