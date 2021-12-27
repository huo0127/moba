import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import getPageTitle from '@/utils/get-page-title'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [


  // 登入
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { isPublic: true }
  },


  // 註冊
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
    meta: { isPublic: true }
  },

  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首頁', icon: 'dashboard' }
    }]
  },


  {
    path: '/heroes',
    component: Layout,
    redirect: '/heroes/list',
    name: 'Hero',
    meta: { title: '英雄管理', icon: 'card-hero' },
    children: [
      {
        path: 'create',
        name: 'HeroCreate',
        component: () => import('@/views/hero/heroEdit/index.vue'),
        meta: { title: '創建英雄' }
      },
      {
        path: 'list',
        name: 'HeroList',
        component: () => import('@/views/hero/heroList/index.vue'),
        meta: { title: '英雄列表' },
      },
      {
        path: 'edit/:id',
        name: 'HeroEdit',
        component: () => import('@/views/hero/heroEdit/index.vue'),
        props: true,
        meta: { title: '編輯英雄' },
        hidden: true
      },

    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/item/list',
    name: 'Item',
    meta: { title: '天賦符文裝備管理', icon: 'goods' },
    children: [
      {
        path: 'item/create',
        name: 'ItemCreate',
        component: () => import('@/views/goods/item/itemEdit/index.vue'),
        meta: { title: '創建裝備' }
      },
      {
        path: 'item/edit/:id',
        name: 'ItemEdit',
        component: () => import('@/views/goods/item/itemEdit/index.vue'),
        meta: { title: '編輯裝備' },
        props: true,
        hidden: true

      },
      {
        path: 'item/list',
        name: 'ItemList',
        component: () => import('@/views/goods/item/itemList/index.vue'),
        meta: { title: '裝備列表' },
      },

      {
        path: 'rune/list',
        name: 'runeList',
        component: () => import('@/views/goods/rune/runeList/index.vue'),
        meta: { title: '天賦符文列表', }
      },

      {
        path: 'spell/list',
        name: 'AdList',
        component: () => import('@/views/goods/spell/index.vue'),
        meta: { title: '召喚師技能列表', }
      },
    ]
  },

  {
    path: '/operate',
    component: Layout,
    redirect: '/operate/article/list',
    name: 'Operate',
    meta: { title: '營運管理', icon: 'operate' },
    children: [
      {
        path: 'article/create',
        name: 'ArticleCreate',
        component: () => import('@/views/operate/article/articleEdit/index.vue'),
        meta: { title: '創建文章', icon: 'edit' }
      },
      {
        path: 'article/list',
        name: 'ArticleList',
        component: () => import('@/views/operate/article/articleList/index.vue'),
        meta: { title: '文章列表', icon: 'list' },
      },
      {
        path: 'article/edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/operate/article/articleEdit/index.vue'),
        props: true,
        meta: { title: '編輯文章' },
        hidden: true
      },
      {
        path: 'adlist',
        name: 'AdList',
        component: () => import('@/views/operate/adList/index.vue'),
        meta: { title: '廣告列表', icon: 'ad' }
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/categorylist',
    name: 'System',
    meta: { title: '系統管理', icon: 'system' },
    children: [
      {
        path: 'categorylist',
        name: 'CategoryList',
        component: () => import('@/views/system/categoryList/index.vue'),
        meta: { title: '分類列表', icon: 'list' }
      },
      {
        path: 'aminuserlist',
        name: 'AminUserList',
        component: () => import('@/views/system/adminUserList/index.vue'),
        meta: { title: '用戶列表', icon: 'user' },
      },

    ]
  },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/huo0127/moba',
        meta: { title: 'Github', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
