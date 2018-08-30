<template>
  <div class="main-box t1004">
    <div class="main-box">
      <div class="root mopian">
        <!--顶部下载栏-->
        <download_bar :isShow="downloadShow" :authorId="watchArticle.member.id" @closeDownload="closeDownload"></download_bar>
        <article_meta :article="watchArticle" :musicData="watchMusicData" @judgeMusic="judgeMusic" ref="musicTemplete" :downloadShow="downloadShow"></article_meta>
        <report  :article="watchArticle"  @buyNow="buyNow" :animationIndex="animationIndex"></report>
        <article_content  :article="watchArticle" @sendAnimationIndex="sendAnimationIndex"  :htmlStr="htmlStr"></article_content>
        <buyGoods  ref="buy" @notify="onPayNotify"></buyGoods>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  @import '../less/t1004.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST,GET,AUTH,SHARE} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import download_bar from './article/download_bar.vue';
  import article_meta from './article/t1004/meta.vue';
  import music from './article/music.vue';
  import article_content from './article/t1004/content.vue';
  import report from './article/t1004/report.vue';
  import auther from './article/auther.vue';
  import Toast from '../widget/toast.vue';
  import payment from '../widget/payment.vue';
  import buyGoods from '../widget/buyGoods.vue';
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
      animationIndex:0
     }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Toast,
      download_bar,
      article_meta,
      music,
      article_content,
      report,
      auther,
      payment,
      buyGoods,
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"样例",nickName:"author",createDate:null,member:{autograph:""}}
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
//      fetchData:function (id) {
//        this.go(id);
//        this.$refs.review.open(id);
//        this.$refs.cardImg.open(id);
//        document.documentElement.scrollTop = 0;
//        document.body.scrollTop = 0;
//      },
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
                console.log(_this.watchMusicData);
              }
              if (!utils.isNull(response.data.templates)) {
                if (response.data.mediaType==0) {
                  _this.htmlStr = response.data.templates;
                } else {
                  var productNum = 0;
                  response.data.templates.forEach(function (item) {
                    if(item.mediaType == 'product'){
                      productNum ++;
                      _this.$set(response.data, 'hasProduct', true);
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
                    if(productNum = 1){
                      _this.$set(response.data, 'oneProduct', true);
                    }else{

                    }
                  })
                  _this.watchTemplates = response.data.templates;
                  console.log(_this.watchTemplates);
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
//      showRewardDialog:function () {
//        this.$refs.rwd.show();
//      },
//      rewardNumber:function (m) {
//        var _this = this;
//        _this.$refs.toast.loading();
//        POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+this.watchArticle.id).then(
//          function (data) {
//            if (data.type=="success") {
//              _this.$refs.toast.hide();
//              _this.$refs.toast.show(data);
//              _this.$refs.pay.show(data.data);
//            } else {
//              alert(data.content);
//              _this.$refs.toast.hide();
//              _this.$refs.toast.show(data.content);
//            }
//          },
//          function (err) {
//            _this.$refs.toast.hide();
//            _this.$refs.toast.show("网络不稳定");
//          }
//        )
//      },
      closeDownload:function () {//关闭顶部下载组件。并控制页面上移
        this.downloadShow = false;
      },
      onscroll(e){
        if(this.musicPlay == 0){//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
          this.musicPlay = 1;
          this.$refs.musicTemplete.openPlayer();
        }
      },

      judgeMusic:function () {//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
        this.musicPlay = 1;
      },
      buyNow:function (id) {
        if(utils.isweex()==true){
//          this.$refs.toast.show('请分享到微信进行购买');

          location.href =  'mopian://buyGood?id=' + id;
          return;
        }

        let _this = this;
        AUTH(location.href,function (authed) {
          if (authed) {
            _this.$refs.buy.show(id,_this.watchArticle.id);
          }
        })
      },
      sendAnimationIndex:function (animationIndex) {
        this.animationIndex = animationIndex;
      }
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


