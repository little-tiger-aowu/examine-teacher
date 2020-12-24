import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/top.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'top',
    component: Home,
    redirect: 'Home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '首页', icon: 'icon-shouyetianchong' }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/detail.vue'),
        meta: { title: '评分页面', icon: 'icon-shouyetianchong' }
      },
      {
        path: 'allList',
        name: 'allList',
        component: () => import(/* webpackChunkName: "about" */ '../views/allList.vue'),
        meta: { title: '全部案例', icon: 'icon-shouyetianchong' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
