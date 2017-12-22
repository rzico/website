import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Login from '../page/login'
import Index from '../page/index'
import Member from '../page/member'
import T1001 from '../page/t1001'
import T1002 from '../page/t1002'
import C1001 from '../page/c1001'
import Card from '../page/card'
import Coupon from '../page/Coupon'
import activate from '../page/member/activate'
import couponList from '../page/member/couponList'
import ceshi from '../page/member/ceshi'

Vue.use(Router);
Vue.use(VueResource);

var router = new Router({
  mode: 'history',
  base: "/",
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {requireAuth:false},
      component: Index
    },
    {
      path: '/member',
      name: 'member',
      meta: {requireAuth:false},
      component: Member
    },
    {
      path: '/card',
      name: 'card',
      meta: {requireAuth:false},
      component: Card
    },
    {
      path: '/coupon',
      name: 'coupon',
      meta: {requireAuth:false},
      component: Coupon
    },
    {
      path: '/login',
      name: 'login',
      meta: {requireAuth:false},
      component: Login
    },
    {
      path: '/t1001',
      name: 't1001',
      meta: {requireAuth:true},
      component: T1001
    },
    {
      path: '/t1002',
      name: 't1002',
      meta: {requireAuth:true},
      component: T1002
    },
    {
      path: '/c1001',
      name: 'c1001',
      meta: {requireAuth:true},
      component: C1001
    },
    {
      path: '/activate',
      name: 'activate',
      meta: {requireAuth:true},
      component: activate
    },
    {
      path: '/couponList',
      name: 'couponList',
      meta: {requireAuth:true},
      component: couponList
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      meta: {requireAuth:true},
      component: ceshi
    }
  ]
})

export default router
