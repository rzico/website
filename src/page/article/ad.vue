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
        article: { default: function () {
          return {member:{id}}
        }
        }
      },
      methods:{
        jump() {
          var vars  =  utils.router(location.href);
          vars.name ="index";
          alert(vars.query.xuid);
          if (utils.isNull(vars.query.xuid)) {
            vars.query.xuid = this.article.member.id;
            alert(vars.query.xuid);
          }
          this.$router.push(vars);
        }
      }
    }
</script>
