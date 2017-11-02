<template>
  <div class="page login"  style="background-image: url('./static/flash.jpg');" @click="login()">
    <Toast ref="toast"></Toast>
  </div>
</template>
<style>
  .login {
    background-size: cover;
  }
</style>
<script>
  import { POST, GET } from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
export default {
  data() {
    return {
      redirectURL:""
    }
  },
  components: {
    Toast
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
