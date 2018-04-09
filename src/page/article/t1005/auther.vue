<template>
  <div class="auther"  v-if="article.member.autograph !=''" @click="jump(article.member.url,article.member.id)">
    <div class="autherwrap" style="min-height: 96px;">
      <a class="toappuser">
        <div class="autherHead">
          <img v-bind:src="article.member.logo | watchImg"/>
        </div>
        <div class="userMessage" >
          <p class="wusername" style="overflow: hidden" >
            {{article.member.nickName}}</p>
          <p class="wsign"  v-if="article.member.autograph != '' " >
            {{article.member.autograph==null?"留下签名有助于提升知名度":article.member.autograph}}  </p>
        </div>
        <img v-if="article.member.qrcode != null" :src='article.member.qrcode'  alt="" class="qrcode">
        <div class="right iconfont icon-xiangyoujiantou icon-arrow"></div>
      </a>
    </div>
  </div>
</template>
<style src="../../../less/article/t1005/auther.less" scoped></style>
<script>
  import utils from '../../../assets/utils.js';
  import {POST, GET} from '../../../assets/fetch.js';
  export default {
    data:function () {
      return{
        twoSecond:1,
        hadLoad:0,
        articleTempId:this.templateId,
      }
    },
    props: {
      article: { default: function () {
        return {member:{logo:"",autograph:"",nickName:""}}
      }
      },
      templateId:{default:1001}
    },
    filters:{
//        用原图去阿里云获取缩略图
      watchImg:function(value) {
        return utils.thumbnail(value,54,54);
      }
    },
    methods:{
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      },
//      jump:function (url,id) {
//        var _this = this;
//        if(this.twoSecond == 0){
//          return;
//        }
//        this.twoSecond = 0;
//        var timeout, t = 1000, hasApp = true;
//        setTimeout(function () {
//          _this.twoSecond  =  1;
//          if (_this.hadLoad == 1) {
//            location.href = 'yundian://topic?id=' + id;
//          } else {
//            _this.$router.push(utils.router(url));
//          }
//          document.body.removeChild(ifr);
//        }, 2000)
//
//
//        var t1 = Date.now();
//        var ifr = document.createElement("iframe");
//        ifr.setAttribute('src','yundian://topic?id=' + id);
//        ifr.setAttribute('style', 'display:none');
//        document.body.appendChild(ifr);
//        if (ifr.attachEvent){
//          ifr.attachEvent("onload", function(){ // IE
//            _this.hadLoad = 1;
//          });
//        } else {
//          ifr.onload = function(){ // 非IE
//            _this.hadLoad = 1;
//          };
//        }
//      },

    }
  }
</script>
