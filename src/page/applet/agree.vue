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
              <div class="title"><span class="only-pc">超强图文小视频分享社区</span></div>
              <div class="video-warp">
                <div id="articleNum">{{count}}</div>
                <p>篇文章使用{{conf.siteName}}创作</p>
                <button class="only-mobile baseBgColor" @click="download()">一键授权</button>
              </div>
            </div>
          </div>
        </div>
      </v-loadmore>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  @import '../../less/index.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        conf:{},
        count:128304,
        welcome:"../static/welcome.jpg"
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
    components: {
      Toast,
    },
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      download:function () {
        var _this = this;
        AUTH(location.href,function (authed) {
          if(authed){
            GET('weex/member/option.jhtml').then(function (data) {
              if(data.type == 'success'){
                if(data.data.hasTopic){
                  location.href =  'component/common/getAuthUrl.jhtml';
                }else{
                  _this.$refs.toast.show("请先前往魔篇app开通专栏");
                }
              }else{
                _this.$refs.toast.show("系统繁忙");
              }
            },function (err) {
              _this.$refs.toast.show("网络不稳定");
            })
          }else{
            _this.$refs.toast.show("服务器繁忙");
          }
        })



//        AUTH(utils.getConfig().appUrl,function (authed) {
//            if (authed) {
//              location.href = utils.getConfig().appUrl;
//            }
//          }
//        )
      }
    }
  }
</script>
