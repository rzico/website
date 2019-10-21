
//引出 如何跳过基础包 vue优化
import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'

const Login = resolve => require(['../page/login'], resolve)
const Index = resolve => require(['../page/index'], resolve)
const T1001 = resolve => require(['../page/t1001'], resolve)
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
