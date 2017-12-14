<template>
    <div class="footer">
        <div class="wrap" style="background-color: #fff;">
          <img style="width: 100%;display: block;" :src="src" alt="" @click="jump()"/>
        </div>
    </div>
</template>
<script>
  import utils from '../../assets/utils.js';
    export default {
      data() {
        return {
          src:"./static/ad.jpg"
        }
      },
      props:{
        ad:{}
      },
      methods:{
        jump() {
          var vars  =  utils.router(location.href);
          vars.name ="index";
          this.$router.push(vars);
        }
      }
    }
</script>
