<template>
<div class="main-box">
  <div class="main-box">
    <div class=" article root mopian">
      <download_bar :isShow="downloadShow" :authorId="watchArticle.member.id" @closeDownload="closeDownload" templateId=1002 ></download_bar>
      <div id="basePicture" class="basePicture" style="opacity: 1;"></div>
      <div id="baseSlurPicture" class="baseSlurPicture" style="opacity: 0;"></div>
      <div class="cover">
        <div class="header">
          <div class="img-container">
            <div class="avatar">
              <img :src="watchArticle.member.logo | watchImg">
            </div>
          </div>
        </div>
        <div class="article-meta">
          <div class="well">
            <h1 class="title">{{watchArticle.title}}</h1>
            <p class="time-read">
              <span>{{watchArticle.createDate | timeDatefmt}}</span>
              <span>阅读 <span class="read-count">{{watchArticle.hits}}</span></span>
            </p>
            <p class="nickname" data-author-id="34351379" data-author-url="https://www.meipian.cn/c/34351379">
                    <span>
                        <span class="nigname">{{watchArticle.author}}</span>
                        <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                    </span>
            </p>
          </div>
        </div>
      </div>
      <div class="">
        <music :musicData="watchMusicData" @judgeMusic="judgeMusic" ref="musicTemplete" :downloadShow="downloadShow"></music>
        <article_content   :templates="watchTemplates" :htmlStr="htmlStr" templateId=1006></article_content>
        <report  :article="watchArticle.hits"></report>
        <auther ref="auther" :article="watchArticle"></auther>
        <review ref="review" :article="watchArticle"></review>
        <recommend ref="recommend" v-if="isPublish" :article="watchArticle" @go="fetchData"></recommend>
        <ad v-if="noWeex" :article="watchArticle"></ad>
      </div>
    </div>
    </div>
  <Toast ref="toast"></Toast>
</div>
</template>
<style scoped>
  @import '../less/t1007.less';
  .article{
    margin-top: 0 !important;
  }
  .mp-dialog .inner.comment > textarea {
    width: 100%;
    height: 90px;
    resize: none;
    border-radius: 7px;
    background: #fff;
    padding: 7px;
    border: 1px solid #ccc;
    outline: 0;
    font-size: 15px; }
  .mp-dialog .inner.comment > button {
    float: right;
    height: 100%;
    width: 56px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 7px;
    background: #2887f0;
    border: none;
    color: #fff;
    margin-top: 5px;
    text-align: center;
    outline: 0; }
  .mp-dialog .inner.comment > button[disabled] {
    background: #999; }
  .mp-dialog .inner.download .main .title {
    height: 78px;
    line-height: 78px;
    font-size: 20px;
    color: #000000;
    text-align: center; }
  * {
    margin: 0;
    padding: 0;
    font-style: normal;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; }

  html,
  body {
    color: #333333;
    font-family: PingFangSC-Regular;
    font-size: 16px; }

  a {
    text-decoration: none;
    color: #7BBBFF; }
  a:hover, a:active, a:visited, a:focus {
    text-decoration: none; }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    font-size: 16px; }

  h1 {
    font-size: 24px;
    font-weight: normal;
    color: #333333;
    letter-spacing: 0;
    line-height: 36px;
    margin: 0; }

  ul,
  ol {
    list-style: none; }

  img {
    vertical-align: middle; }
  img[lazy] {
    background-color: rgba(223, 226, 231, 0.7); }

  i,
  i * {
    font-style: italic; }

  .clearfix {
    zoom: 1; }

  .clearfix:before {
    display: table;
    content: ""; }

  .clearfix:after {
    display: table;
    content: "";
    clear: both; }

  .well {
    padding: 0 0px; }

  .root {
    height: 100%; }
  @keyframes rotate {
    from {
      transform: rotate(0);
      -webkit-transform: rotate(0); }
    to {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg); } }

  @-webkit-keyframes rotate {
    from {
      transform: rotate(0);
      -webkit-transform: rotate(0); }
    to {
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg); } }
  .top-fixed-download .title {
    float: left;
    white-space: nowrap;
    height: 39px; }
  .top-fixed-download .title img {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -13px; }
  .top-fixed-download .title > p {
    text-align: left;
    word-break: break-word;
    color: #333;
    padding-left: 42px;
    height: 39px;
    margin: 0; }
  .root.mopian {
    height: 100%;
    position: relative;
    z-index: 0;
    overflow: hidden; }
  .root.mopian .basePicture {
    position: absolute;
    z-index: -2;
    opacity: 1; }
  .root.mopian .basePicture:before {
    content: '';
    position: fixed;
    background: url(../img/t1007/71bg_750_1.jpg) center 0 no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%; }
  .root.mopian .baseSlurPicture {
    position: absolute;
    z-index: -1;
    opacity: 0; }
  .root.mopian .baseSlurPicture:before {
    content: '';
    position: fixed;
    background: url(../img/t1007/71bg_750_2.jpg) center 0 no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%; }

  .cover {
    position: relative; }
  .cover .header .img-container {
    padding-top: 10%; }
  .cover .header .img-container .avatar {
    width: 75px;
    height: 75px;
    margin: 0 auto;
    background-size: 100% 100%;
    overflow: hidden;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 2px solid #fff; }
  .cover .header .img-container .avatar img {
    width: 100%; }
  .cover .article-meta {
    overflow: hidden;
    text-align: center;
    margin-top: 32px;
    word-wrap: break-word; }
  .cover .article-meta .title {
    padding: 0 16px; }
  .cover .article-meta p.time-read {
    font-family: PingFangSC-Regular;
    margin-top: 10px;
    font-size: 14px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 20px; }
  .cover .article-meta p.time-read > span {
    margin-left: 10px; }
  .cover .article-meta p.nickname {
    font-family: PingFangSC-Medium;
    font-size: 15px;
    letter-spacing: 0;
    margin: 10px 0 20px 0;
    line-height: 20px; }
  .cover .article-meta p.nickname .nigname {
    display: inline-block;
    color: #7BBBFF;
    max-width: 220px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom; }
  .cover .article-meta p.nickname .focus__root {
    display: inline-block; }
  .cover .article-meta p.nickname .focus__root .focus {
    background-color: #7BBBFF;
    width: 44px;
    text-align: center;
    border-radius: 4px;
    margin-left: 10px; }
  .cover .article-meta p.nickname .focus__root .focus a {
    color: #FFFFFF;
    font-size: 12px;
    line-height: 20px;
    font-family: PingFangSC-Regular; }

  .mp-content .section h1 {
    font-size: 20px; }
  .mp-content .section h3 {
    font-size: 17px; }
  .mp-content .section h5 {
    font-size: 15px; }
  .mp-content .section img {
    width: 100%;
    vertical-align: bottom; }
  .mp-content .section a {
    color: #7BBBFF;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 17px;
    line-height: 1.8em;
    font-family: PingFangSC-Regular;
    display: inline-block;
    padding: 0 20px;
    width: 100%; }
  .mp-content .section video {
    width: 100%;
    background: #000; }
  .mp-content .section iframe {
    width: 100%; }
  .mp-content .section .img-box img {
    width: 100%;
    vertical-align: bottom; }
  .mp-content .section .img-box span.gif-img-tips i {
    display: inline-block;
    width: 0;
    height: 0;
    border: 8px dashed transparent;
    border-right-width: 0;
    border-left-color: #fff;
    border-left-style: solid;
    border-width: 5px 0 5px 8px;
    vertical-align: middle;
    margin: -.2em .73em 0 -2px; }
  .vote .well {
    background-color: transparent;
    border: 1px solid #D6D8E3;
    border-radius: 7px;
    padding: 0;
    margin: 0 20px 32px; }
  .vote .well .option-area h2.title {
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    line-height: 30px;
    margin-bottom: 9px;
    word-wrap: break-word;
    white-space: pre-wrap; }
  .vote .well .option-area h2.title em {
    font-size: 12px;
    margin-left: 10px; }
  .vote .well .option-area ul.unvote li {
    list-style: none;
    padding: 15px 25px;
    position: relative;
    border-top: 1px solid #D6D8E3;
    overflow: hidden; }
  .vote .well .option-area ul.unvote li:first-child {
    border-top: none; }
  .vote .well .option-area ul.unvote li > p.title {
    font-size: 16px;
    line-height: 24px;
    color: #333333;
    margin: 0;
    overflow: hidden;
    word-wrap: break-word; }
  .vote .well .option-area ul.option-list li {
    margin-top: 29px;
    font-size: 12px;
    color: #333333; }
  .vote .well .option-area ul.option-list li:first-child {
    margin-top: 0; }
  .loading-icon .loadEffect > span {
    display: inline-block;
    width: 6px;
    height: 2px;
    border-top-left-radius: 1px;
    border-bottom-left-radius: 1px;
    background: #ccc;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
    animation: load 1.04s ease infinite; }
  .loading-icon .loadEffect > span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -1px;
    -webkit-animation-delay: 0.13s;
    animation-delay: 0.13s; }
  .loading-icon .loadEffect > span:nth-child(2) {
    left: 2px;
    top: 4px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation-delay: 0.26s;
    animation-delay: 0.26s; }
  .loading-icon .loadEffect > span:nth-child(3) {
    left: 50%;
    top: 2px;
    margin-left: -3px;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: 0.39s;
    animation-delay: 0.39s; }
  .loading-icon .loadEffect > span:nth-child(4) {
    top: 4px;
    right: 2px;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-animation-delay: 0.52s;
    animation-delay: 0.52s; }
  .loading-icon .loadEffect > span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -1px;
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: 0.65s;
    animation-delay: 0.65s; }
  .loading-icon .loadEffect > span:nth-child(6) {
    right: 2px;
    bottom: 4px;
    -webkit-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    transform: rotate(225deg);
    -webkit-animation-delay: 0.78s;
    animation-delay: 0.78s; }
  .loading-icon .loadEffect > span:nth-child(7) {
    bottom: 2px;
    left: 50%;
    margin-left: -3px;
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: 0.91s;
    animation-delay: 0.91s; }
  .loading-icon .loadEffect > span:nth-child(8) {
    bottom: 4px;
    left: 2px;
    -webkit-transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    transform: rotate(315deg);
    -webkit-animation-delay: 1.04s;
    animation-delay: 1.04s; }

  @-webkit-keyframes load {
    0% {
      opacity: 1; }
    100% {
      opacity: 0.2; } }

  @keyframes load {
    0% {
      opacity: 1; }
    100% {
      opacity: 0.2; } }

  .comment .well {
    padding: 20px 0px 0px 0px; }
  .comment .well h3.title {
    color: #333333;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 20px;
    padding-left: 16px; }
  .comment .well h3.title:before {
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background-color: #7BBBFF;
    content: "";
    display: inline-block;
    margin-right: 6px;
    vertical-align: bottom; }
  .comment .well h3.title > span {
    margin-left: 10px; }
  .comment .well a.add-comment i {
    margin-right: 6px; }
  .comment-item .comment-box .avatar-box .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%; }
  .comment-item .comment-box .nickname {
    font-size: 14px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 18px;
    height: 18px;
    margin-bottom: 4px;
    width: 100%;
    padding-right: 52px; }
  .comment-item .comment-box .btn-admire i {
    margin-right: 5px; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item p {
    font-size: 14px;
    line-height: 18px;
    padding: 10px 0px 0px; }
  .comment-item .comment-box .level-two-comment .level-two-comment-item p .nickname {
    color: #7BBBFF;
    margin-right: 3px;
    padding-right: 0; }

  html[data-pc] .comment .well h3.title {
    padding-left: 50px; }

  .recommend .well {
    padding: 25px 16px; }
  .recommend .well h3.title {
    color: #333333;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 24px; }
  .recommend .well h3.title:before {
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background-color: #7BBBFF;
    content: "";
    display: inline-block;
    margin-right: 6px;
    vertical-align: bottom; }
  .recommend-item .img-container {
    float: left;
    width: 115px;
    height: 70px;
    margin-right: 10px;
    overflow: hidden; }
  .recommend-item .img-container img {
    width: 100%;
    height: 100%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    margin-top: 35px;
    -o-object-fit: cover;
    object-fit: cover; }
  .recommend-item .view-count i {
    vertical-align: -2px; }

  .introduce-meipian img {
    width: 100%; }
  .circle-link .well {
    padding: 15px 16px; }
  .circle-link .well img.avatar {
    width: 54px;
    height: 54px;
    border-radius: 8px;
    float: left;
    margin-right: 10px; }
  .circle-link .well i {
    float: right;
    line-height: 12px;
    color: #7BBBFF;
    margin-top: 14px;
    display: inline-block;
    border: 1px solid #7BBBFF;
    padding: 6px 14px;
    font-size: 12px;
    border-radius: 4px; }

  @media screen and (min-width: 600px) {
    .circle-link .well {
      padding: 15px 50px; } }
  .sign__root .sign span {
    display: inline-block;
    border: 1px solid #9B9B9B;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 20px;
    padding: 0px 8px;
    margin-bottom: 10px; }
  .sign__root .sign span:nth-child(1) {
    margin-right: 5px; }
  .sign__root .sign span:nth-child(2) {
    margin-left: 5px; }

  .qrcode-banner img {
    border: 1px solid #eeeeee; }

  @media screen and (min-width: 600px) {
    .root.mopian {
      height: 100%;
      position: relative;
      z-index: 0;
      background-color: #FFF; }
    .root.mopian .basePicture {
      position: absolute;
      z-index: -2;
      opacity: 1; }
    .article-meta .well {
      padding: 0 50px; }
    .mp-content .well {
      padding: 0 50px; }
    .vote .well {
      margin: 0 50px 32px;
      padding: 0px 0px; }
    .report .well {
      padding: 0 50px; }
    .author-link .well {
      padding: 15px 50px; }
    .recommend .well {
      padding: 24px 50px; } }

</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST,GET,AUTH,SHARE} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import download_bar from './article/download_bar.vue';
  import article_meta from './article/meta.vue';
  import music from './article/music.vue';
  import article_content from './article/content.vue';
  import report from './article/report.vue';
  import auther from './article/auther.vue';
  import banner from './article/t1006/banner.vue';
  import recommend from './article/recommend.vue';
  import review from './article/review.vue';
  import ad from './article/ad.vue';
  import Toast from '../widget/toast.vue';
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
      bannerId:''
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
      recommend,
      review,
      ad,
      banner,
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"样例",nickName:"author",createDate:null,member:{autograph:""}}
      }
      },
      musicData: { default: function () {
        return {id: ""}
      }
      },
      templates: { default: function () {
        return []
      }
      },
      htmlStr :{default:""},
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      },
      watchImg:function (value) {
        return utils.thumbnail(value,75,75);
      },
    },
    created() {
      var _this = this;
//      AUTH("",function (authed) {
//        _this.logined  = authed;
//      })
      if(utils.isweex()==true){
        this.downloadShow = false;
        this.noWeex = false;
      }
      let id = utils.getUrlParameter("id");
      this.go(id);
      this.bannerId = id
    },
    methods: {
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      },
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
//        this.$refs.cardImg.open(id);
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
//                  图片预览
                    if(item.mediaType == 'product' || item.mediaType == 'image' && !utils.isNull(item.original)){
                      previewList.push({
                        src: utils.filterThumbnail(item.original),
                        w: 900,
                        h: 1000
                      })
                    }
                  })
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
        POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+this.watchArticle.id).then(
          function (data) {
            if (data.type=="success") {
              _this.weixin(data.data)
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
            console.log(res)
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
      judgeMusic:function () {//控制判断音乐。来判断从未触发音乐时滚动触发音乐，而在触发过音乐后滚动时不触发音乐事件。
        this.musicPlay = 1;
      },
      buyNow:function (id) {
//        if(utils.isweex()==true){
//          this.$refs.toast.show('请分享到微信进行购买');
//          return;
//        }

        let _this = this;
//        AUTH(location.href,function (authed) {
//          if (authed) {
            _this.$refs.buy.show(id,_this.watchArticle.id);
//          }
//        })
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
