import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import './global-components'

Vue.config.productionTip = false

new Vue({
    ...AppLayout,
    router
}).$mount('#app')