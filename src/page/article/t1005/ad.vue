<template>
  <div class="footer">
    <div class="wrap" style="background-color: #fff;">
      <img style="width: 100%;display: block;" :src="src" alt="" @click="jump()"/>
    </div>
  </div>
</template>
<style scoped>
   .footer {
    background-color: #f5f6f9;
    padding-top: 8px;
    margin-left: 23px;
    margin-right: 23px;
    box-sizing: border-box;
  }
   .footer .wrap {
    background-color: #fff;

  }
</style>
<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
        src:"./static/ad.jpg"
      }
    },
    props:{
      article: { default: function () {
        return {member:{id}}
      }},
      templateId:{default:1001}
    },
    methods:{
      jump() {
        var vars  =  utils.router(location.href);
        vars.name ="index";
        if (utils.isNull(vars.query.xuid)) {
          vars.query.xuid = this.article.member.id;
        }
        this.$router.push(vars);
      }
    }
  }
</script>
