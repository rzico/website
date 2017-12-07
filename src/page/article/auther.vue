<template>
    <div class="auther" @click="jump(article.member.url,article.member.id)">
        <div class="autherwrap" style="min-height: 96px;">
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
              <img v-if="article.member.qrcode != null" :src='article.member.qrcode'  alt="" class="qrcode">
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
          var _this = this;
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var loadDateTime = new Date();
            window.setTimeout(function() {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                  _this.$router.push(utils.router(url));
                } else {
                  window.close();
                }
              },
              25);
            window.location = 'yundian://topic?id=' + id;
          } else if (navigator.userAgent.match(/android/i)) {
            var state = null;
            try {
              state = window.open('yundian://topic?id=' + id, '_blank');
            } catch(e) {}
            if (state) {
              window.close();
            } else {
              this.$router.push(utils.router(url));
            }
          }
        }
      }
    }
</script>
