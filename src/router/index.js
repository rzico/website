// import Vue from 'vue'
// import VueResource from 'vue-resource'
// import Router from 'vue-router'
// import Login from '../page/login'
// import Index from '../page/index'
// import Member from '../page/member'
// // import T1001 from '../page/t1001'
// import C1001 from '../page/c1001'
// import Card from '../page/card'
// import Payment from '../page/payment'
// import OrderList from '../page/order/list'
// import OrderDetails from '../page/order/details'
// import OrderLogistics from '../page/order/logistics'
// import activate from '../page/coupon/activate'
// import deposit from '../page/member/deposit'
// import reward from '../page/member/reward'
// import addAddress from '../page/address/addAddress'
// import addressList from '../page/address/addressList'
// import couponList from '../page/coupon/couponList'
// import memberIndex from '../page/member/index'
// import memberCoupon from '../page/member/coupon'
// import T1003 from '../page/t1003'
// import T1004 from '../page/t1004'


import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
const Login = resolve => require(['../page/login'], resolve)
const Index = resolve => require(['../page/index'], resolve)
const Member = resolve => require(['../page/member'], resolve)
const T1001 = resolve => require(['../page/t1001'], resolve)
const C1001 = resolve => require(['../page/c1001'], resolve)
const Card = resolve => require(['../page/card'], resolve)
const Payment = resolve => require(['../page/payment'], resolve)
const OrderList = resolve => require(['../page/order/list'], resolve)
const OrderDetails = resolve => require(['../page/order/details'], resolve)
const OrderLogistics = resolve => require(['../page/order/logistics'], resolve)
const activate = resolve => require(['../page/coupon/activate'], resolve)
const bill = resolve => require(['../page/member/bill'], resolve)
const rebate = resolve => require(['../page/member/rebate'], resolve)
const addAddress = resolve => require(['../page/address/addAddress'], resolve)
const addressList = resolve => require(['../page/address/addressList'], resolve)
const couponList = resolve => require(['../page/coupon/couponList'], resolve)
const memberIndex = resolve => require(['../page/member/index'], resolve)
const memberCoupon = resolve => require(['../page/member/coupon'], resolve)
const cardPackage = resolve => require(['../page/member/cardPackage'], resolve)
const T1003 = resolve => require(['../page/t1003'], resolve)
const goodsList = resolve => require(['../page/goods/list'], resolve)
// import T1003 from '../page/t1003'
// import T1004 from '../page/t1004'
// const Home = resolve => require(['./components/Home.vue'], resolve)

Vue.use(Router);
Vue.use(VueResource);

// router.beforeEach((to, from, next) => {
//     to.query.xuid = from.query.xuid;
//     next();
// })



var router = new Router({
  // mode: 'history',
  // base: "/",
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
      path: '/t1003',
      name: 't1003',
      meta: {requireAuth:true},
      component: T1003
    },
    // {
    //   path: '/t1004',
    //   name: 't1004',
    //   meta: {requireAuth:true},
    //   component: T1004
    // },
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
      path: '/bill',
      name: 'bill',
      meta: {requireAuth:true},
      component: bill
    },
    {
      path: '/rebate',
      name: 'rebate',
      meta: {requireAuth:true},
      component: rebate
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
    {
      path: '/cardPackage',
      name: 'cardPackage',
      meta: {requireAuth:true},
      component: cardPackage
    },
    {
      path: '/goods/list',
      name: 'goodsList',
      meta: {requireAuth:true},
      component: goodsList
    },
   ]
})

export default router
