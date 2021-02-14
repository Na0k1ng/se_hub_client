import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const initialState = {
        loginState: false,
        userName: "",
        userId: "",
        token: "",
        profileUserId: "",
        profileBp: "",
        contentsList:""
};

export default new Vuex.Store({
    state: initialState,
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
        setContentsList: function (state, val) {
            state.contentsList = val
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({storage: window.sessionStorage})]
})
