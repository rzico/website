<style scoped>
  @import './less/page.less';

</style>

<template>
  <router-view/>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import { POST, GET,SHARE } from './assets/fetch.js';
  import utils from './assets/utils.js';

export default {
  name: 'app',

  data() {
     return {
       url:""
     }
  },
  mounted() {
     SHARE(location.href);
  }
}
</script>
