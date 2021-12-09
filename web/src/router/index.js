import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout'),
      children: [
        { path: '/', component: () => import('@/views/Home') },
      ],
    },
    {
      path: '/heroes',
      component: () => import('@/views/Layout'),
      children: [
        { path: '/heroes', name: 'HeroList', component: () => import('@/views/Hero/HeroList') },
        { path: '/heroes/:id', name: 'HeroInfo', component: () => import('@/views/Hero/HeroInfo'), props: true },
      ],
    },
    {
      path: '/news',
      component: () => import('@/views/Layout'),
      children: [
        { path: '/news', name: 'NewsList', component: () => import('@/views/News/NewsList') },
        { path: '/news/:id', name: 'NewsInfo', component: () => import('@/views/News/NewsInfo'), props: true },
      ],
    },
    {
      path: '/stream',
      component: () => import('@/views/Stream/StreamList'),
    },
    {
      path: '/streamer/:streamer_user_name/:id',
      component: () => import('@/views/Stream/Streamer'),
      props: true
    }
  ],
})
