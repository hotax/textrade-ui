import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import state from './state'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Login from './components/Login.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/faq',
        name: 'faq',
        component: FAQ
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/tickets',
        name: 'tickets',
        meta: {
            private: true
        },
        component: TicketsLayout
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.meta.private && !state.user) {
        next({
            name: 'login',
            params: {
                wantedRoute: to.fullPath

            }
        })
        return
    }
    next()
})

export default router
