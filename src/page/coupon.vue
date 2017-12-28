<template>
  <div class="container">
    <div class="page slideIn member " :class="coupon.color">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
      <div class="box">
        <div>
          <span class="logo" :style="'background-image: url('+coupon.logo+')'"></span>
          <div class="name">{{coupon.name}}</div>
        </div>
        <div class="couponName">{{coupon.couponName}}</div>
        <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"></div>
        <div class="descr">{{coupon.descr}}</div>
        <div class="intro">{{coupon.introduction}}</div>
      </div>
      </v-loadmore>
      <Toast ref="toast"></Toast>
      <!--<div class="footer" @click="openWeixinCard()">-->
        <!--<span>&#45;&#45;微信卡包&#45;&#45;</span>-->
      <!--</div>-->
    </div>

  </div>
</template>
<style scoped>
  @import '../less/coupon.less';
  .qrcode {
    margin: 10px auto;
    width:200px;
    height:200px;
    background-size: cover;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #eee;
  }

  .footer {
    position: fixed;
    bottom:15px;
    text-align: center;
    width:100%;
  }
  .footer span {
    color:blue;
  }

</style>

<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
         id:"",
         code:"",
         cardId:"",
         cardExt:{},
         mobile:"",
         name:"",
         payCode:"163231 84933",
         coupon:{id:0,name:"(样例)张三的店",couponName:"全场满100减50元",logo:"./static/logo.png",color:"c8",descr:"有效期：2017-10-01至2018-02-19"}
      }
    },
    components: {
      'v-loadmore':Loadmore,
      Toast
    },
    filters:{
        codefmt:function (val) {
            if (utils.isNull(val)) {
                return val;
            } else  {
                return val.substr(0,11)+"  "+val.substr(11);
            }
        }
    } ,
    created() {
      var _this = this;
      AUTH(location.href,function (authed) {
        _this.logined  = authed;
      })
        //会号规则 88100006165001042 实体卡  86100006165 商家码
        this.code = utils.getUrlParameter("code");
        this.id = utils.getUrlParameter("id");
        this.load();
    },
    methods: {
      loadTop: function () { //组件提供的下拉触发方法
        this.load();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom: function () {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      load: function () {
        var _this = this;
        GET("website/member/couponCode/view.jhtml?id=" + _this.id + "&code=" + _this.code).then(
          function (res) {
            if (res.type == 'success') {
              _this.payCode = res.data.payCode;
              _this.coupon = res.data.coupon;
              _this.coupon.logo = utils.thumbnail(res.data.coupon.logo,150,150)
              _this.cardId = res.data.cardId;
              _this.cardExt = res.data.cardExt;
            } else {
              _this.$refs.toast.show(res.content);
            }
          }, function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
      openWeixinCard: function () {
        var _this = this;
        if (utils.isNull(_this.cardId)) {
          _this.$refs.toast.show("商家没开通卡包");
        }
        if (utils.isweixin()) {
          POST("weixin/get_config.jhtml?url=" + encodeURIComponent(location.href.split('#')[0])).then(
            function (data) {
              if (data.type == "success") {
                wx.config({
                  debug: false,
                  appId: data.data.appId, // 和获取Ticket的必须一样------必填，公众号的唯一标识
                  timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                  signature: data.data.signature,// 必填，签名，见附录1
                  //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                  jsApiList: [
                    'addCard',
                    'closeWindow'
                  ]
                });
                //处理验证成功的信息
                wx.ready(function () {
                  wx.addCard({
                    cardList: [{
                      cardId: _this.cardId,
                      cardExt: '{"timestamp":"' + _this.cardExt.timestamp + '","nonce_str":"' + _this.cardExt.nonce_str + '","signature":"' + _this.cardExt.signature + '"}'
                    }], // 需要添加的卡券列表
                    success: function (res) {
                      var cardList = res.cardList; // 添加的卡券列表信息
                      wx.closeWindow();
                    }
                  });
                });
              }
            }
          )
        }
      }
    }
  }
</script>
