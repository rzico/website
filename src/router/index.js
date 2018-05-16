// import Vue from 'vue'
// import VueResource from 'vue-resource'
// import Router from 'vue-router'
// import Login from '../page/login'
// import Index from '../page/index'
// import Member from '../page/member'
// import T1001 from '../page/t1001'
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

//引出 如何跳过基础包 vue优化
import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'

const Login = resolve => require(['../page/login'], resolve)
const Index = resolve => require(['../page/index'], resolve)
const AppletAgree = resolve => require(['../page/applet/agree'], resolve)
const Member = resolve => require(['../page/member'], resolve)
const T1001 = resolve => require(['../page/t1001'], resolve)
const C1001 = resolve => require(['../page/c1001'], resolve)
const C1002 = resolve => require(['../page/c1002'], resolve)
const C1003 = resolve => require(['../page/c1003'], resolve)
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
const T1002 = resolve => require(['../page/t1002'], resolve)
const T1003 = resolve => require(['../page/t1003'], resolve)
const T1004 = resolve => require(['../page/t1004'], resolve)
const T1005 = resolve => require(['../page/t1005'], resolve)
const T1006 = resolve => require(['../page/t1006'], resolve)
const T1007 = resolve => require(['../page/t1007'], resolve)
const T1008 = resolve => require(['../page/t1008'], resolve)
const T1009 = resolve => require(['../page/t1009'], resolve)
const T1010 = resolve => require(['../page/t1010'], resolve)
const T1011 = resolve => require(['../page/t1011'], resolve)
const T1012 = resolve => require(['../page/t1012'], resolve)
const T1013 = resolve => require(['../page/t1013'], resolve)
const T1014 = resolve => require(['../page/t1014'], resolve)
const T1015 = resolve => require(['../page/t1015'], resolve)
const T1016 = resolve => require(['../page/t1016'], resolve)
const T1017 = resolve => require(['../page/t1017'], resolve)
const T1018 = resolve => require(['../page/t1018'], resolve)
const T1019 = resolve => require(['../page/t1019'], resolve)
const T1020 = resolve => require(['../page/t1020'], resolve)
const T1021 = resolve => require(['../page/t1021'], resolve)
const T1022 = resolve => require(['../page/t1022'], resolve)
const T1023 = resolve => require(['../page/t1023'], resolve)
const goodsList = resolve => require(['../page/goods/list'], resolve)
const C1003goodsList = resolve => require(['../page/c1003/goodsList'], resolve)
const C1003orderList = resolve => require(['../page/c1003/orderList'], resolve)
const giveLike = resolve => require(['../page/article/giveLike'], resolve)
const navbarGoods = resolve => require(['../widget/navbarGoods'], resolve)
const messageBar = resolve => require(['../widget/messageBar'], resolve)
const advertising = resolve => require(['../widget/advertising'], resolve)
const coupon = resolve => require(['../widget/coupon'], resolve)
const list = resolve => require(['../page/c1003/list'], resolve)


// import T1003 from '../page/t1003'
// import T1004 from '../page/t1004'
// const Home = resolve => require(['./components/Home.vue'], resolve)

Vue.use(Router);
Vue.use(VueResource);

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {requireAuth:false},
      component: Index
    },
    {
      path: '/appletAgree',
      name: 'appletAgree',
      meta: {requireAuth:false},
      component: AppletAgree
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
      path: '/t1002',
      name: 't1002',
      meta: {requireAuth:true},
      component: T1002
    },
    {
      path: '/t1003',
      name: 't1003',
      meta: {requireAuth:true},
      component: T1003
    },
    {
      path: '/t1004',
      name: 't1004',
      meta: {requireAuth:true},
      component: T1004
    },
    {
      path: '/t1005',
      name: 't1005',
      meta: {requireAuth:true},
      component: T1005
    },
    {
      path: '/t1006',
      name: 't1006',
      meta: {requireAuth:true},
      component: T1006
    },
    {
      path: '/t1007',
      name: 't1007',
      meta: {requireAuth:true},
      component: T1007
    },
    {
      path: '/t1008',
      name: 't1008',
      meta: {requireAuth:true},
      component: T1008
    },
    {
      path: '/t1009',
      name: 't1009',
      meta: {requireAuth:true},
      component: T1009
    },
    {
      path: '/t1010',
      name: 't1010',
      meta: {requireAuth:true},
      component: T1010
    },
    {
      path: '/t1011',
      name: 't1011',
      meta: {requireAuth:true},
      component: T1011
    },
    {
      path: '/t1012',
      name: 't1012',
      meta: {requireAuth:true},
      component: T1012
    },
    {
      path: '/t1013',
      name: 't1013',
      meta: {requireAuth:true},
      component: T1013
    },
    {
      path: '/t1014',
      name: 't1014',
      meta: {requireAuth:true},
      component: T1014
    },
    {
      path: '/t1015',
      name: 't1015',
      meta: {requireAuth:true},
      component: T1015
    },
    {
      path: '/t1016',
      name: 't1016',
      meta: {requireAuth:true},
      component: T1016
    },
    {
      path: '/t1017',
      name: 't1017',
      meta: {requireAuth:true},
      component: T1017
    },
    {
      path: '/t1018',
      name: 't1018',
      meta: {requireAuth:true},
      component: T1018
    },
    {
      path: '/t1019',
      name: 't1019',
      meta: {requireAuth:true},
      component: T1019
    },
    {
      path: '/t1020',
      name: 't1020',
      meta: {requireAuth:true},
      component: T1020
    },
    {
      path: '/t1021',
      name: 't1021',
      meta: {requireAuth:true},
      component: T1021
    },
    {
      path: '/t1022',
      name: 't1022',
      meta: {requireAuth:true},
      component: T1022
    },
    {
      path: '/t1023',
      name: 't1023',
      meta: {requireAuth:true},
      component: T1023
    },
    {
      path: '/c1001',
      name: 'c1001',
      meta: {requireAuth:true},
      component: C1001
    },
    {
      path: '/c1002',
      name: 'c1002',
      meta: {requireAuth:true},
      component: C1002
    },
    {
      path: '/c1003',
      name: 'c1003',
      meta: {requireAuth:true},
      component: C1003
    },
    {
      path: '/payment',
      name: 'payment',
      meta: {requireAuth:true},
      component: Payment
    },
    {
      path: '/orderList',
      name: 'orderList',
      meta: {requireAuth:true},
      component: OrderList
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      meta: {requireAuth:true},
      component: OrderDetails
    },
    {
      path: '/orderLogistics',
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
      path: '/addressAdd',
      name: 'addressAdd',
      meta: {requireAuth:true},
      component: addAddress
    },
    {
      path: '/addressList',
      name: 'addressList',
      meta: {requireAuth:true},
      component: addressList
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
    {
      path: '/memberCoupon',
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
      path: '/goodsList',
      name: 'goodsList',
      meta: {requireAuth:true},
      component: goodsList
    },
    {
      path: '/C1003goodsList',
      name: 'C1003goodsList',
      meta: {requireAuth:true},
      component: C1003goodsList
    },
    {
      path: '/C1003orderList',
      name: 'C1003orderList',
      meta: {requireAuth:true},
      component: C1003orderList
    },
    {
      path: '/giveLike',
      name: 'giveLike',
      meta: {requireAuth:true},
      component: giveLike
    },
    {
      path: '/navbarGoods',
      name: 'navbarGoods',
      meta: {requireAuth:true},
      component: navbarGoods
    },
    {
      path: '/messageBar',
      name: 'messageBar',
      meta: {requireAuth:true},
      component: messageBar
    },
    {
      path: '/advertising',
      name: 'advertising',
      meta: {requireAuth:true},
      component: advertising
    },
    {
      path: '/coupon',
      name: 'coupon',
      meta: {requireAuth:true},
      component: coupon
    },
    {
      path: '/list',
      name: 'list',
      meta: {requireAuth:true},
      component: list
    },
   ]
})


router.beforeEach((to, from, next) => {
  if(from.query != null && from.query.xuid != null){
    to.query.xuid = from.query.xuid;
  }
  next();


  // if(to.name == 'payment' ){
  //   alert('进来了 to。name');
  //
  //   if (sessionStorage.getItem('once')) {
  //     sessionStorage.removeItem('once')
  //     next();
  //   } else {
  //     sessionStorage.setItem('once','close');
  //     next({
  //       name: "payment",
  //       query: to.psn
  //     })
  //   }
  //
  //   return;
  // }
})



export default router
