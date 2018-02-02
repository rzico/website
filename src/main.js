import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick';
import '../static/weui.css';
import '../static/iconfont.css';
import 'mint-ui/lib/style.css';

//预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
//
// fastclick.attach(document.body);
