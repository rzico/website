import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Login from '../page/login'
import Index from '../page/index'
import Member from '../page/member'
import T1001 from '../page/t1001'
import C1001 from '../page/c1001'
import Card from '../page/card'
import Payment from '../page/payment'
import OrderList from '../page/order/list'
import OrderDetails from '../page/order/details'
import OrderLogistics from '../page/order/logistics'
import activate from '../page/coupon/activate'
import deposit from '../page/member/deposit'
import reward from '../page/member/reward'
import addAddress from '../page/address/addAddress'
import addressList from '../page/address/addressList'
import couponList from '../page/coupon/couponList'
import memberIndex from '../page/member/index'
import memberCoupon from '../page/member/coupon'
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
      path: '/c1001',
      name: 'c1001',
      meta: {requireAuth:true},
      component: C1001
    },
    {
      path: '/weixin/payment/view.html',
      name: 'payment',
      meta: {requireAuth:true},
      component: Payment
    },
    {
      path: '/order/list',
      name: 'orderList',
      meta: {requireAuth:true},
      component: OrderList
    },
    {
      path: '/order/details',
      name: 'orderDetails',
      meta: {requireAuth:true},
      component: OrderDetails
    },
    {
      path: '/order/logistics',
      name: 'orderLogistics',
      meta: {requireAuth:true},
      component: OrderLogistics
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
      path: '/address/add',
      name: 'addressAdd',
      meta: {requireAuth:true},
      component: addAddress
    },
    {
      path: '/address/list',
      name: 'addressList',
      meta: {requireAuth:true},
      component: addressList
    },
    {
      path: '/coupon/list',
      name: 'couponList',
      meta: {requireAuth:true},
      component: couponList
    },
    {
      path: '/member/index',
      name: 'memberIndex',
      meta: {requireAuth:true},
      component: memberIndex
    },
    {
      path: '/member/coupon',
      name: 'memberCoupon',
      meta: {requireAuth:true},
      component: memberCoupon
    },
   ]
})

export default router
