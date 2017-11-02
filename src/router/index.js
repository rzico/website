import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Login from '../page/login'
import Index from '../page/index'
import T1001 from '../page/t1001'
import T1002 from '../page/t1002'
import C1001 from '../page/c1001'

Vue.use(Router);
Vue.use(VueResource);

var router = new Router({
  mode: 'history',
  base: "/website/",
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
      path: '/c1001',
      name: 'c1001',
      meta: {requireAuth:true},
      component: C1001
    }
  ]
})

export default router
