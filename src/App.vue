<style scoped>

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
