import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Home from '@/views/Home/'
import Article from '@/views/Article'
import Hero from '@/views/Hero'
import Stream from '@/views/Stream'
import Streamer from '@/views/Streamer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/articles/:id', name: 'article', component: Article, props: true },
        { path: '/heroes/:id', name: 'hero', component: Hero, props: true },
      ],
    },
    {
      path: '/stream',
      component: Stream,
    },
    {
      path: '/streamer/:streamer_user_name/:id',
      component: Streamer,
      props: true
    }
  ],
})
