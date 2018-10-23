<template>
  <div class="container">
  <div class="page">
    <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="true" :auto-fill="false" ref="loadmore">
    <div class="div-image" >
      <img :src="welcome" width="100%">
    </div>
    <div style="width:100%;position: absolute">
    <div class="header">
      <img class="logo" :src="conf.logo" :alt="conf.siteName"/>
      <div class="logo-text">{{conf.siteName}}</div>
    </div>
    <div class="banner">
      <div class="warp">
        <div class="title"><span class="only-pc">同城生活服务配送平台</span></div>
        <div class="video-warp">
          <div id="articleNum">{{count}}</div>
          <p>人下载{{conf.siteName}}使用</p>
          <button class="only-mobile baseBgColor" @click="download()">注册下载</button>
        </div>
      </div>
    </div>
    </div>
    </v-loadmore>
  </div>
  </div>
</template>
<style scoped>
  @import '../less/index.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        conf:{},
        count:128304,
        welcome:"./static/welcome.jpg"
      }
    },
    created () {
      this.conf = utils.getConfig();
      //设置分享标题
      utils.setConfig({
        title:"【"+utils.getConfig().siteName+"】追求极致创新。",
        desc:"同城生活服务配送平台",
        link:location.href,
        logo:".static/logo.png"
      });
    },
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      download:function () {
        AUTH(utils.getConfig().appUrl,function (authed) {
            if (authed) {
               location.href = utils.getConfig().appUrl;
            }
          }
        )
      }
    }
  }
</script>
