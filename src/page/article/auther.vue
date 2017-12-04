<template>
    <div class="auther" @click="jump(article.member.url,article.member.id)">
        <div class="autherwrap" style="height: 100%;">
            <a class="toappuser">
                <div class="autherHead">
                    <img v-bind:src="article.member.logo | watchImg">
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
  import {POST, GET} from '../../assets/fetch.js';
    export default {
      props: {
        article: { default: function () {
          return {member:{logo:"",autograph:"",nickName:""}}
        }
        }
      },
      filters:{
//        用原图去阿里云获取缩略图
        watchImg:function(value) {
          return utils.thumbnail(value,54,54);
        }
      },
      methods:{
        jump:function (url,id) {
          location.href = 'yundian://topic?id=' + id;
//          this.$router.push(utils.router(url));
        }
      }
    }
</script>
