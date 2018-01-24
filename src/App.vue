<style scoped>
  @import './less/page.less';

</style>

<template>
  <router-view/>
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
    utils.setConfig({
      title:utils.getConfig().siteName,
      desc:"超强图文小视频分享社区,中国版Facebook.",
      link:utils.getConfig().baseURL,
      thumbnail:utils.getConfig().logo
    });
    SHARE(location.href);
  },
  mounted() {
  }
}
</script>
