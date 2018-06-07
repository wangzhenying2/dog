export default {
    // 设置用户信息
    setUserInfo: (state, data) => {
        state.userInfo = data
        sessionStorage.setItem('userInfo', JSON.stringify(data))
    },

    // 文章公用
    SET_ARTS: (state, articles) => {
        state.articles = articles.result
    },

    // 登录信息
    SET_USER: (state, userinfo) => {
        state.user = {
            name: userinfo.name,
            pwd: userinfo.pwd
        }
    },

    // dialog显示隐藏
    SHOW_DIALOG: (state, isDialog) => {
        state.showdialog = isDialog
    },

    // 问答公用
    SET_AARTICLES: (state, articles) => {
        state.aArticles = articles
    }
}
