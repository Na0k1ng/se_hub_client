import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginState: false,
        userName: "",
        testToken: "",
    },
    mutations: {
        setLoginState: function (state, val) {
            state.loginState = val
        },
        setUserName: function (state, val) {
            state.userName = val
        },
    },
    actions: {},
    modules: {}
})
