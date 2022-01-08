import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css

import '@/plugins/element.js'

import router from '@/router'
import App from '@/App.vue'
import store from '@/store'
import EventBus from '@/EventBus'

import '@/icons'

import HintButton from '@/components/HintButton'



Vue.config.productionTip = false

Vue.component('HintButton', HintButton)

Vue.directive('focus', {
  inserted: function (el) {
    el.querySelector('input').focus()
  }
})

Vue.prototype.$EventBus = EventBus

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
