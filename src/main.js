import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick';
import '../static/weui.css';
import '../static/iconfont.css';
import 'mint-ui/lib/style.css';
import utils from './assets/utils.js';

import { Option,Input, Select,Button } from 'element-ui';
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Button)


import { Toast } from 'mint-ui';
Vue.component(Toast.name,Toast);
  // //预览插件
  // import VuePreview from 'vue-preview'
  // Vue.use(VuePreview)

Vue.config.productionTip = false
/* eslint-disable no-new */

//文档地址 https://www.cnblogs.com/xyyt/p/7650539.html
//懒加载 安装命令 cnpm install vue-lazyload -D
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: '../static/loaderror.png',
  loading: '../static/loading1.gif',
  attempt: 4,
  preLoad: 1.3,
  //图片过滤器
  filter: {
    progressive(listener, options) {
      if (!utils.isNull(listener.src)) {
        listener.el.setAttribute('lazy-progressive', 'true')
        listener.src = utils.thumbnail_cover(listener.src, utils.screenWidth());
      }
    }
  },
})


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
//
// fastclick.attach(document.body);
