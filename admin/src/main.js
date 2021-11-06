import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import echarts from 'echarts'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`,
      }
    },
  },
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
