<style scoped>
  @import './less/page.less';

</style>

<template>
  <router-view/>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import { POST, GET } from './assets/fetch.js';
  import utils from './assets/utils.js';

export default {
  name: 'app',

  data() {
     return {
       url:""
     }
  },
  mounted() {
     var _this = this;
     if (utils.isweixin()) {
       POST("weixin/get_config.jhtml?url="+encodeURIComponent(location.href.split('#')[0])).then(
         function (data) {
           if (data.type=="success") {
             wx.config({
               debug: false,
               appId: data.data.appId, // 和获取Ticket的必须一样------必填，公众号的唯一标识
               timestamp:data.data.timestamp, // 必填，生成签名的时间戳
               nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
               signature: data.data.signature,// 必填，签名，见附录1
               //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
               jsApiList: [
                 'onMenuShareAppMessage','onMenuShareTimeline',
                 'onMenuShareQQ','onMenuShareQZone','scanQRCode',
                 'chooseWXPay'
               ]
             });

             wx.error(function (res) {
             });

             //处理验证成功的信息
             wx.ready(function () {
               //分享到朋友圈
               wx.onMenuShareTimeline({
                 title: utils.getConfig().title, // 分享标题
                 link:  utils.getConfig().link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: utils.getConfig().logo, // 分享图标
                 success: function (res) {
                 },
                 cancel: function (res) {
                 }
               });
               //分享给朋友
               wx.onMenuShareAppMessage({
                 title: utils.getConfig().title, // 分享标题
                 desc: utils.getConfig().desc, // 分享描述
                 link: utils.getConfig().link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: utils.getConfig().logo, // 分享图标
                 type: 'link', // 分享类型,music、video或link，不填默认为link
                 dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                 success: function (res) {
                 },
                 cancel: function (res) {
                 }
               });
               //分享到QQ
               wx.onMenuShareQQ({
                 title: utils.getConfig().title, // 分享标题
                 desc: utils.getConfig().desc, // 分享描述
                 link: utils.getConfig().link, // 分享链接
                 imgUrl: utils.getConfig().logo, // 分享图标
                 success: function (res) {
                 },
                 cancel: function (res) {
                 }
               });

               //分享到QQ空间
               wx.onMenuShareQZone({
                 title: utils.getConfig().title, // 分享标题
                 desc: utils.getConfig().desc, // 分享描述
                 link: utils.getConfig().link, // 分享链接
                 imgUrl: utils.getConfig().logo, // 分享图标
                 success: function (res) {
                 },
                 cancel: function (res) {
                 }
               });
             });
           }
         }
       )
     }
  }
}
</script>
