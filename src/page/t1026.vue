<template>
  <div @touchmove="onscroll" offset-accuracy="0">
    <div class="slideIn">
      <div class="root seasons t1026">
        <article_cover :article="watchArticle"></article_cover>
        <download_bar :isShow="downloadShow" templateId=1002 :authorId="watchArticle.member.id" @closeDownload="closeDownload"></download_bar>
        <music :musicData="watchMusicData" @judgeMusic="judgeMusic" ref="musicTemplete" templateId=1002 :downloadShow="false"></music>
        <article_content @buyNow="buyNow" @controlMusic="controlMusic" :article="watchArticle" :hasTable="hasTable" :templates="watchTemplates" :htmlStr="htmlStr"   ></article_content>
        <report  :article="watchArticle.hits"></report>
        <auther ref="auther" :article="watchArticle"></auther>
        <review ref="review" :article="watchArticle"></review>
        <recommend ref="recommend" v-if="isPublish" :article="watchArticle" @go="fetchData"></recommend>
        <redBag @notify="onPayNotify" :article="watchArticle"></redBag>
        <ad v-if="noWeex" :article="watchArticle"></ad>
        <rewardDialog  ref="rwd"  @rewardNumber="rewardNumber"></rewardDialog>
        <payment  ref="pay" @notify="onPayNotify"></payment>
        <buyGoods  ref="buy" @notify="onPayNotify"></buyGoods>
      </div>
    </div>
  </div>
</template>
<style>
  @import "../less/t1026.less";
</style>

<script>
  import {Loadmore} from 'mint-ui';
  import { POST,GET,AUTH,SHARE} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import download_bar from './article/download_bar.vue';
  import article_cover from './article/t1026/cover.vue';
  import music from './article/music.vue';
  import article_content from './article/t1016/content.vue';
  import vote from './article/vote.vue';
  import reward from './article/reward.vue';
  import report from './article/seasonsPublic/report.vue';
  import coupon from './article/coupon.vue';
  import auther from './article/seasonsPublic/auther.vue';
  import recommend from './article/seasonsPublic/recommend.vue';
  import review from './article/seasonsPublic/review.vue';
  import redBag from './article/redBag.vue';
  import ad from './article/ad.vue';
  import rewardDialog from './article/rewardDialog.vue';
  import Toast from '../widget/toast.vue';
  import payment from '../widget/payment.vue';
  import buyGoods from '../widget/buyGoods.vue';
  import card from './member/card.vue';
  import getCoupon from './coupon/activate.vue';
  import Dialog from '../widget/dialog.vue';
  //  import Dialog from '../widget/dialog.vue';
  export default {
    data () { return {
      logined:false,
      msg:"",
      watchTemplates: this.templates,
      watchMusicData: this.musicData,
      watchArticle: this.article,
      downloadShow:true,
      musicPlay:0,
      noWeex:true,
      isPublish:true,
//      payWay:'账户余额',
//      payPrice:'299',
      sn:'',
      hasTable:false,
    }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Toast,
      download_bar,
      music,
      article_content,
      reward,
      report,
      coupon,
      auther,
      recommend,
      review,
      redBag,
      ad,
      rewardDialog,
      payment,
      vote,
      card,
      buyGoods,
      article_cover,
//      'weui-dialog':Dialog,
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"",nickName:"author",createDate:null,member:{autograph:""}}
      }
      },
      musicData: { default: function () {
        return {id: "-1"}
      }
      },
      templates: { default: function () {
        return []
      }
      },
      htmlStr :{default:""},
    },
    created() {
      var _this = this;
      AUTH("",function (authed) {
        _this.logined  = authed;
      })
      if(utils.isweex()==true){
        this.downloadShow = false;
        this.noWeex = false;
      }
      let id = utils.getUrlParameter("id");
      this.go(id);
    },
    methods: {
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      onPayNotify:function (data) {
        if ("success"==data.type) {
        } else {
          this.$refs.toast.show(data.content);
        }
      },
      fetchData:function (id) {
        this.go(id);
        this.$refs.review.open(id);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },
      go:function (id) {
        var _this = this;
        GET('website/article/view.jhtml?id='+id).then(
          function (response) {
            if (response.type=="success") {
              _this.watchArticle = response.data;
              _this.isPublish = response.data.isPublish;
//              _this.$refs.coupon.open(response.data.member.id);
              //设置分享标题
              utils.setConfig({
                title:_this.watchArticle.title,
                desc:_this.watchArticle.htmlTag,
                link:_this.watchArticle.url,
                thumbnail:_this.watchArticle.thumbnail
              });
              SHARE(location.href);
              if (!utils.isNull(response.data.music)) {
                _this.watchMusicData = JSON.parse(response.data.music);
              }
              if (!utils.isNull(response.data.templates)) {
                if (response.data.mediaType==0) {
                  _this.htmlStr = response.data.templates;
                } else {
//                  图片预览
                  var previewList = [];
                  response.data.templates.forEach(function (item) {
                    if(item.mediaType == 'product'){
                      GET('website/article/goods.jhtml?id=' + item.id).then(
                        function (data) {
                          if(data.type == 'success'){
//                           对数组对象进行操作需要 这样子才能重新渲染界面
                            _this.$set(item, 'name', data.data.name);
                            _this.$set(item, 'price', data.data.price);
                          }else{
                            _this.$refs.toast.show("服务器繁忙");
                          }
                        },function (err) {
                          _this.$refs.toast.show("网络不稳定");
                        }
                      )
                    }
//                    图片预览
                    if(item.mediaType == 'product' || item.mediaType == 'image' && !utils.isNull(item.original)){
                      previewList.push({
                        src: utils.filterThumbnail(item.original),
                        w: 900,
                        h: 1000
                      })
                    }
                  })
                  if(!utils.isNull(response.data.forms)){
                    _this.hasTable = true;
                  }
                  _this.$set(response.data.templates, 'previewList', previewList);
                  _this.watchTemplates = response.data.templates;
                }
              }

            } else {
              _this.$refs.toast.show("网络不稳定");
//                 _this.$refs.toast.show('website/article/view.jhtml?id='+id);
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
//                _this.$refs.toast.show('ssssswebsite/article/view.jhtml?id='+id);

          });
      },
      showRewardDialog:function () {
        this.$refs.rwd.show();
      },
      rewardNumber:function (m) {
        var _this = this;
        _this.$refs.toast.loading();
        if(utils.isweex()==true){
          _this.$refs.toast.show('请分享到微信进行赞赏');
          return;
        }
        POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+_this.watchArticle.id).then(
          function (data) {
            if (data.type=="success") {
              _this.$router.push({
                name: "payment",
                query: {psn: data.data, amount:m,type:'weixin'}
              });
            } else {

            }
          },
          function (err) {
            _this.$refs.toast.hide();
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      weixin:function(sn) {
        var _this = this;
//        weixinOcPayPlugin    weixinPayPlugin
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=weixinOcPayPlugin").then(
          function (res) {
            if (res.type=="success") {
              let jsApiCall = function () {
                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                  "appId" : res.data.appId,
                  "timeStamp":res.data.timeStamp,
                  "nonceStr" :res.data.nonceStr,
                  "package" :res.data.package,
                  "signType" :res.data.signType,
                  "paySign" : res.data.paySign,
                },function(result){
                  if(result.err_msg == "get_brand_wcpay_request:ok" ) {

                    setTimeout(function () {
                      _this.$refs.reward.open()
                    },2000)
                  } else {
                    _this.$refs.toast.show("支付取消");
//                  _this.$refs.toast.show(result.memo);
                  }
                });
              }
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                  document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
              } else {
                jsApiCall();
              }
            }
            else {

//              _this.pageIcon = 'cancel';
              _this.$refs.toast.show("网络不稳定");
            }
          },
          function (err) {

            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      closeDownload:function () {//关闭顶部下载组件。并控制页面上移
        this.downloadShow = false;
      },
      onscroll(e){
        if(this.musicPlay == 0){//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
          this.musicPlay = 1;
          this.$refs.musicTemplete.openPlayer();
        }
      },
      //      content组件控制音乐组件播放或者暂停
      controlMusic:function(status){
        if(this.musicPlay == 0){
          return;
        }
        this.$refs.musicTemplete.openPlayer(status);
      },
      judgeMusic:function () {//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
        this.musicPlay = 1;
      },
      buyNow:function (id) {
        if(utils.isweex()==true){

          location.href =  'mopian://buyGood?id=' + id;
//          this.$refs.toast.show('请分享到微信进行购买!');
          return;
        }

        let _this = this;
        AUTH(location.href,function (authed) {
          if (authed) {
            _this.$refs.buy.show(id,_this.watchArticle.id);
          }
        })

      },
//      payConfirm:function (payInfo) {
//        alert(payInfo);
//        payInfo = JSON.parse(payInfo);
//        this.payWay = payInfo.way;
//        this.payPrice = payInfo.price;
//        this.sn = payInfo.sn;
//        this.$refs.dialog.show();
//      },
    }
  }

</script>
