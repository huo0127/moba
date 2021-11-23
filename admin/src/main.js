import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.scss' // global css

import '@/plugins/element.js'

import router from '@/router'
import App from '@/App.vue'
import store from '@/store'

import '@/icons'

import HintButton from '@/components/HintButton'

Vue.config.productionTip = false

Vue.component('HintButton', HintButton)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
