import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', 
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "account" */ '@/views/account/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import( /* webpackChunkName: "account" */ '@/views/account/register')
    },
 
 
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [{
          path: '/home',
          meta:{
            footShow:true
          },
          component: () => import( /* webpackChunkName: "home" */ '@/views/homePage/homePage')
        },
        {
          path: '/:type/all',
          component: () => import( /* webpackChunkName: "original" */ '@/views/original/blogTag')
        },
        {
          path: '/expert',
          component: () => import( /* webpackChunkName: "follow" */ '@/views/follow/expert')
        },
        {
          path: '/personal',
          name: 'personal',
          component: () => import( /* webpackChunkName: "account" */ '@/views/account/personal')
        },
        {
          path: '/:classfiy/answer',
          name: 'answerList',
          component: () => import( /* webpackChunkName: "answer" */ '@/views/answer/answerList')
        },
        {
          path: '/answerDetail',
          name: 'answerDetail',
          component: () => import( /* webpackChunkName: "answer" */ '@/views/answer/answerDetail')
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          component: () => import( /* webpackChunkName: "articleDetail" */ '@/views/original/articleDetail')
        },

      ]
    },
    {
      path:'/write/:flag',
      name:'write',
      component: () => import( /* webpackChunkName: "write" */ '@/views/write/write')
    }
  ]

},
)
