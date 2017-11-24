<template>
  <div class="page login" @click="login()">
    <login></login>
    <toast ref="toast"></toast>
  </div>
</template>
<style>
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET } from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  import Login from '../widget/login.vue';
  export default {
  data() {
    return {
      redirectURL:""
    }
  },
  components: {
    'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    Toast,Login
  },
  created () {
  },
  methods: {
    login() {
      this.$router.push(utils.router(this.$router.query.redirectURL));
    },
  }
}
</script>
