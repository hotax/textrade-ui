import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import './global-components'
import VueFetch from './plugins/fetch'


import state from './state'
import VueState from './plugins/state'

import * as filters from './filters'
for (const key in filters) {
    Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
    baseUrl: 'http://localhost/',
})
Vue.use(VueState, state)
Vue.config.productionTip = false

new Vue({
    data: state,
    ...AppLayout,
    router
}).$mount('#app')
