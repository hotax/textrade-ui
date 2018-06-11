import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
    $fetch
} from '../plugins/fetch'
import router from '../router'


const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state() {
        return {
            user: null,
        }
    },

    getters: {
        user: state => state.user,
        userPicture: () => null,
    },

    mutations: {
        user: (state, user) => {
            state.user = user
        },
    },

    actions: {
        async login({
            commit
        }) {
            try {
                const user = await $fetch('user')
                commit('user', user)
                if (user) {
                    // Redirect to the wanted route if any or else to home
                    router.replace(router.currentRoute.params.wantedRoute || {
                        name: 'home'
                    })
                }
            } catch (e) {
                // do nothing
            }
        },
        logout({
            commit
        }) {
            commit('user', null)
            $fetch('logout')
            // If the route is private
            // We go to the login screen
            if (router.currentRoute.matched.some(r => r.meta.private)) {
                router.replace({
                    name: 'login',
                    params: {
                        wantedRoute: router.currentRoute.fullPath,
                    }
                })
            }
        },
    }
})

export default store