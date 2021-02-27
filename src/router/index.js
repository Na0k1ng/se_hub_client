import Vue from 'vue'
import VueRouter from 'vue-router'

import Explore from '../views/Explore.vue'
import Bp from '../views/Bp.vue'
import Messages from '../views/Messages.vue'
import Profile from '../views/Profile.vue'

import Store from '../store/index.js'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Explore',
        component: Explore,
        meta: {title: 'SE-Hub', desc: 'エンジニア・案件が集まる完全無料のプラットフォーム。今よりもっと効率よく「案件を探す」「エンジニアを集める」を実現しませんか？'}
    },
    {
        path: '/bp',
        name: 'Bp',
        component: Bp,
        meta: {title: 'SE-Hub', requiresAuth: true}
    },
    {
        path: '/messages',
        name: 'Messages',
        component: Messages,
        meta: {title: 'SE-Hub', requiresAuth: true}
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {title: 'SE-Hub', desc: 'プロフィールのdescriptionを表示する。'}
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
