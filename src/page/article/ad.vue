<template>
    <div class="footer"  :class="[templateId == 1003 ? 't1003_Bg_bottom' : '',templateId == 1002 ? 't1002_Bg_bottom' : '']" v-if="showAd">
        <div class="wrap" style="background-color: #fff;" >
          <img style="width: 100%;display: block;" :src="src" alt="" @click="jump()"/>
        </div>
    </div>
</template>
<script>
  import utils from '../../assets/utils.js';
    export default {
      data() {
        return {
          src:"./static/mp_ad.jpg",
          showAd:false,
        }
      },
      props:{
        article: { default: function () {
          return {member:{id}}
        }},
        templateId:{default:1001}
      },
      created(){
        let _this = this;
        setTimeout(function () {
            _this.showAd = true;
        },2000)
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
