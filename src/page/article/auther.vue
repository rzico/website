<template>
    <div class="auther" @click="jump(article.member.url)">
        <div class="autherwrap" style="height: 100%;">
            <a class="toappuser">
                <div class="autherHead">
                    <img v-bind:src="article.member.logo">
                </div>
                <div class="userMessage">
                    <p class="wusername" style="overflow: hidden">
                        {{article.member.nickName}}                </p>
                    <p class="wsign">
                        {{article.member.autograph==null?"留下签名有助于提升知名度":article.member.autograph}}  </p>
                </div>
                <div class="right iconfont icon-xiangyoujiantou icon-arrow"></div>
            </a>
        </div>
    </div>
</template>

<script>
  import utils from '../../assets/utils.js';
    export default {
      props: {
        article: { default: function () {
          return {member:{logo:"",autograph:"",nickName:""}}
        }
        }
      },
      methods:{
        jump:function (url) {
          this.$router.push(utils.router(url));
        }
      }
    }
</script>
