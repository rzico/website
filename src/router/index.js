

import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['../page/index'], resolve)


Vue.use(Router);

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {requireAuth:false},
      component: Index
    },
   ]
})


router.beforeEach((to, from, next) => {
  if(from.query != null && from.query.xuid != null){
    to.query.xuid = from.query.xuid;
  }
  next();
})



export default router
