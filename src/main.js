import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import './global-components'
import VueFetch from './plugins/fetch'

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000/',
})
Vue.config.productionTip = false

new Vue({
    ...AppLayout,
    router
}).$mount('#app')