import Vue from 'vue'
import VueRouter from 'vue-router'

import Explore from '../views/Explore.vue'
import BpManagement from '../views/BpManagement.vue'
import Messages from '../views/Messages.vue'
import Profile from '../views/Profile.vue'

import Store from '../store/index.js'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Explore',
        component: Explore
    },
    {
        path: '/bpManagement',
        name: 'BpManagement',
        component: BpManagement,
        meta: {requiresAuth: true}
    },
    {
        path: '/messages',
        name: 'Messages',
        component: Messages,
        meta: {requiresAuth: true}
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {requiresAuth: true}
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !Store.state.token) {
        next({path: '/explore'})
    }else{
     next()
    }
})


export default router
