<template>
  <div class="auther"  @click="jump(article.member.url,article.member.id)">
    <div class="autherwrap" style="min-height: 96px;">
      <a class="toappuser">
        <div class="autherHead">
          <img v-bind:src="article.member.logo | watchImg"/>
        </div>
        <div class="userMessage">
          <p class="wusername" style="overflow: hidden" >
            {{article.member.nickName}}</p>
          <p class="wsign">
            {{article.member.autograph==null?"留下签名有助于提升知名度":article.member.autograph}}  </p>
        </div>
        <img v-if="article.member.qrcode != null" :src='article.member.qrcode'  alt="" class="qrcode">
        <div class="right iconfont icon-xiangyoujiantou icon-arrow"></div>
      </a>
    </div>
  </div>
</template>
<style scoped>
  .article .auther {
    min-height: 96px;
    margin-left: 23px;
    margin-right: 23px;
    padding-top: 8px;
  }

  .article .card {
    width: 100%;
    height:auto;
  }

  .article .auther .autherwrap {
    width: 100%;
  }

  .article .auther .autherwrap a {
    display: block;
    padding-left: 86px;
    padding-right: 28px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    box-shadow: none;
    border: none;
  //background-color: #fff;
    border-radius: 0;
    overflow: hidden;
    text-shadow: none;
  }

  .article .auther .autherwrap a .autherHead {
    height: 86px;
    width: 86px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .article .auther .autherwrap a .userMessage {
    padding-top: 19px;
    float: left;
    width: 100%;
    line-height: 1.6;
  }
  .article .auther .autherwrap a .qrcode {
    width: 200px;height: 200px;margin-top: 19px;margin-bottom: 19px;
  }

  .article .auther .autherwrap a .right {
    height: 100%;
    width: 42px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 86px;
    font-size: 12px;
    color: #D5D5D5;
    font-weight: bold;
  }

  .article .auther .autherwrap a .autherHead img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 54px;
    width: 54px;
    border-radius: 50%;
  }

  .article .auther .autherwrap a .userMessage .wusername {
    font-size: 16px;
    color: #4F4F4F;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .article .auther .autherwrap a .userMessage .wsign {
    font-size: 14px;
    color: #B0B0B0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>
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
