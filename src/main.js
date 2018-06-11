import Vue from 'vue'
import VueFetch from './plugins/fetch'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import * as filters from './filters'
import store from './store'

for (const key in filters) {
    Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:8089/api/',
})

new Vue({
    ...AppLayout,
    router,
    store
}).$mount('#app')