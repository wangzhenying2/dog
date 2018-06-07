/**
 * global plugin js
 * @use in main.js
 */

import ajax from './ajax'

export default function (Vue, opts) {
    // 全局ajax
    Vue.prototype.ajax = ajax
}
