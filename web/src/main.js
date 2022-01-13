import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { Search } from 'vant';

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default global options } */)

import Card from './components/Card'
Vue.component('m-card', Card)

import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

Vue.use(Search);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
