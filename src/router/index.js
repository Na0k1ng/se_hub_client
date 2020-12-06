import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Messages from '../views/Messages.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  //{
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  routes
})

export default router
