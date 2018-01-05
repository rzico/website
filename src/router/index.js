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
import Reward from '../page/member/reward'
import Deposit from '../page/member/deposit'
import activate from '../page/member/activate'
import Message from '../page/message'
import OrderList from '../page/order/list'
import OrderDetails from '../page/order/details'
import OrderLogistics from '../page/order/logistics'

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
      path: '/reward',
      name: 'reward',
      meta: {requireAuth:false},
      component: Reward
    },
    {
      path: '/deposit',
      name: 'deposit',
      meta: {requireAuth:false},
      component: Deposit
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
      path: '/message',
      name: 'message',
      meta: {requireAuth:true},
      component: Message
    },
    {
      path: '/orderList',
      name: 'orderList',
      meta: {requireAuth:true},
      component: OrderList
    },
    {
      path: '/OrderDetails',
      name: 'OrderDetails',
      meta: {requireAuth:true},
      component: OrderDetails
    },
    {
      path: '/OrderLogistics',
      name: 'OrderLogistics',
      meta: {requireAuth:true},
      component: OrderLogistics
    }
  ]
})

export default router
