import { createRouter, createWebHashHistory } from 'vue-router'

import store from '../store/index';
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'@/views/YearnHome.vue'),
    children: [
      {
        path: 'main',
        name: 'main',
        meta: { title: '问天首页' },
        component: () => import(/* webpackChunkName: "main" */'@/views/home/HomeMain.vue'),
      },
      {
        path: 'news',
        name: 'news',
        meta: { title: '新闻' },
        component: () => import(/* webpackChunkName: "news" */'@/views/home/HomeNews.vue'),
      },
      {
        path: 'science',
        name: 'science',
        meta: { title: '科普' },
        component: () => import(/* webpackChunkName: "science" */'@/views/home/HomeScience.vue'),
      },
      {
        path: 'center',
        name: 'center',
        meta: { title: '个人中心' },
        component: () => import(/* webpackChunkName: "center" */'@/views/home/HomeCenter.vue'),

      },
      {
        path: '/home',
        redirect: '/home/main'
      }
    ]
  },
  {
    path: '/news-details',
    name: '/news-details',
    meta: { title: '新闻详情' },
    component: () => import(/* webpackChunkName: "newsdetails" */'@/views/NewsDetails.vue')
  },
  {
    path: '/science-details',
    name: '/science-details',
    meta: { title: '科普详情' },
    component: () => import(/* webpackChunkName: "sciencedetails" */'@/views/ScienceDetails.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { title: '搜索文章' },
    component: () => import(/* webpackChunkName: "search" */'@/views/SearchArticle.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录页' },
    component: () => import(/* webpackChunkName: "login" */'@/views/CenterLogin.vue')
  },
  {
    path: '/registered',
    name: 'registered',
    meta: { title: '注册页' },
    component: () => import(/* webpackChunkName: "registered" */'@/views/RegisteredLogin.vue')
  },
  {
    path: '/validation',
    name: 'validation',
    meta: { title: '验证码' },
    component: () => import(/* webpackChunkName: "validation" */'@/views/ValidationCode.vue')
  },
  {
    path: '/chenage-message',
    name: 'chenage-message',
    meta: { title: '账号管理' },
    component: () => import(/* webpackChunkName: "message" */'@/views/ChangeMessage.vue')
  },
  {
    path: '/center-about',
    name: 'center-about',
    meta: { title: '关于我们' },
    component: () => import(/* webpackChunkName: "about" */'@/views/CenterAbout.vue')
  },
  {
    path: '/center-feedback',
    name: 'center-feedback',
    meta: { title: '提出建议' },
    component: () => import(/* webpackChunkName: "about" */'@/views/center/FeedBack.vue')
  },
  {
    path: '/',
    redirect: '/home'
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'center') {
    if (store.state.userBase.email) {
      next()
    }
    else {
      router.push('/login')
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  document.title = to.meta.title || '问天'
  store.commit('SetRouterName', to.name)

})
export default router
