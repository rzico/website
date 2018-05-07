<style scoped>
  @import './less/page.less';

</style>

<template>
  <router-view :key="key"/>
</template>

<script>
  import { POST, GET,SHARE } from './assets/fetch.js';
  import utils from './assets/utils.js';

export default {
  name: 'app',

  data() {
     return {
       url:""
     }
  },
  created () {
    //      重新组建url
    let url = location.href;
    if(url.indexOf('/#/') == -1){
      location.href = url.substring(0,url.indexOf('?')) + url.substring(url.indexOf('#/'));
      return;
    }
    utils.setConfig({
      title:utils.getConfig().siteName,
      desc:"超强图文小视频分享社区,中国版Facebook.",
      link:utils.getConfig().baseURL,
      thumbnail:utils.getConfig().logo
    });
    SHARE(location.href);
  },
  mounted() {
  },
  computed: {
//    https://www.cnblogs.com/first-time/p/7067674.html Vue-- 监听路由变化，数据无法更新？  同个模版t1001时 切换文章id无法刷新页面。
    key() {
    return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
  }
}
}
</script>
