<template>
  <div class="container">
  <div class="page">
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
        <div class="title"><span class="only-pc">超强图文小视频分享社区</span></div>
        <div class="video-warp">
          <div id="articleNum">{{count}}</div>
          <p>篇文章使用{{conf.siteName}}创作</p>
          <button class="only-mobile baseBgColor" @click="download()">立即制作</button>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>
<style scoped>
  @import '../less/index.less';
</style>
<script>
  import { POST, GET,AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        conf:{},
        count:18304,
        welcome:"./static/welcome.jpg"
      }
    },
    created () {
      this.conf = utils.getConfig();
      //设置分享标题
      utils.setConfig({
        title:"【"+utils.getConfig().siteName+"】追求极致创新。",
        desc:"超强图文小视频分享社区，中国版Facebook",
        link:location.href,
        logo:".static/logo.png"
      });
    },
    methods:{
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
