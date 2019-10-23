<template>
  <div class="container">
    <div class="page">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="true" :auto-fill="false"
                  ref="loadmore">
        <div class="buttonBox" @click="download()">
          <img class="img" src="../img/index/1.png"/>
          <div id="btn" class="downButton" >
            <span class="downButtonText">立即下载</span>
          </div>
        </div>
        <img class="img" src="../img/index/3.png"/>
        <img class="img" src="../img/index/4.png"/>
        <img class="img" src="../img/index/5.png"/>
        <img class="img" src="../img/index/6.png"/>
        <img class="img" src="../img/index/2.png"/>
        <div class="maskBox" id="mask"  @click="downMask()">
          <div class="mask">
            <div class="mask-sign">
              <span id="span"></span>
              <img class="mask-sign-imgBox" src="../img/index/toast.png"/>
            </div>
          </div>
        </div>
      </v-loadmore>
    </div>
  </div>
</template>
<style scoped>
  .img{
    width: 100%;
  }
  .imgTwo{
    width: 100%;
    position: relative;
  }
  .buttonBox{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .downButton {
    width: 120px;
    height: 35px;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #89BE1F,#F6E900);
    top: 33%;
    left: 12%;
    position: absolute;
  }
  .downButtonText{
    font-size: 16px;
    color: #ffffff;
  }
  .mask{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.7);
    /*z-index: 99999;*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .mask-sign-imgBox{
    width:70px;
    height:70px;
  }
  .mask-sign span{
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    margin-top: 20px;
    display: inline-block;
    letter-spacing: 1.25px;
    text-align: right;
    color: #ffffff;
  }
  .mask-sign{
    position: absolute;
    right: 0;
    top:0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .maskBox{
    display: none;
  }
  .displayBlock{
    display: block;
  }
  .displayNone{
    display: none;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import {POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';

  export default {
    data() {
      return {
        conf: {},
        count: 128304,
        welcome: "./static/welcome.jpg"
      }
    },
    created() {
      this.conf = utils.getConfig();
      //设置分享标题
      utils.setConfig({
        title: "【" + utils.getConfig().siteName + "】追求极致创新。",
        desc: "超强图文小视频营销工具.",
        link: location.href,
        logo: ".static/logo.png"
      });
    },
    methods: {
      loadTop: function () { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom: function () {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      //判断是否是微信浏览器的函数
      isWeiXin() {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },


      download() {
        if (this.isWeiXin()) {
          //userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值
          var u = window.navigator.userAgent;
          //Android终端
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
          //iOS终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (isAndroid) {
            var ele = window.document.getElementById("span");
            ele.innerHTML = "点击“…”在浏览器打开";
          }
          if (isiOS) {
            var ele = window.document.getElementById("span");
            ele.innerHTML = "点击“…”在Safari浏览器打开";
          }
          this.disBlock()
        } else {
          window.location.href = utils.getConfig().appUrl
        }
      },

      disBlock() {
        document.getElementById("mask").className = "displayBlock";
      },

      downMask() {
        document.getElementById("mask").className = "displayNone";
      }
    }
  }
</script>
