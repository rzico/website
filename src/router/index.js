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
import deposit from '../page/member/deposit'
import reward from '../page/member/reward'
import city from '../widget/city'
import newReceiver from '../page/member/newReceiver'
import receiverList from '../page/member/receiverList'
import couponList from '../page/member/couponList'
import memberIndex from '../page/member/memberIndex'
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
      path: '/deposit',
      name: 'deposit',
      meta: {requireAuth:true},
      component: deposit
    },
    {
      path: '/reward',
      name: 'reward',
      meta: {requireAuth:true},
      component: reward
    },
    {
      path: '/city',
      name: 'city',
      meta: {requireAuth:true},
      component: city
    },
    {
      path: '/newReceiver',
      name: 'newReceiver',
      meta: {requireAuth:true},
      component: newReceiver
    },
    {
      path: '/receiverList',
      name: 'receiverList',
      meta: {requireAuth:true},
      component: receiverList
    },
    {
      path: '/couponList',
      name: 'couponList',
      meta: {requireAuth:true},
      component: couponList
    },
    {
      path: '/memberIndex',
      name: 'memberIndex',
      meta: {requireAuth:true},
      component: memberIndex
    },
   ]
})

export default router
