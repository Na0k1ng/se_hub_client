import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginState: false,
        userName: "",
        userId: "",
        token: "",
        profileUserId: "",
        profileBp: "",
    },
    mutations: {
        setLoginState: function (state, val) {
            state.loginState = val
        },
        setUserName: function (state, val) {
            state.userName = val
        },
        setUserId: function (state, val) {
            state.userId = val
        },
        setToken: function (state, val) {
            state.token = val
        },
        setProfileUserId: function (state, val) {
            state.profileUserId = val
        },
        setProfileBp: function (state, val) {
            state.profileBp = val
        },
    },
    actions: {},
    modules: {}
})
