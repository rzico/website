<template>
  <div class="container">
    <div class="page slideIn member">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
      <div class="weui_cell">
        <div class="card" :class="card.color">
          <img :src="card.background">
          <span class="name">{{card.name}}</span>
          <span class="code">{{card.code | codefmt}}</span>
          <span class="descr">余额</span>
          <span class="balance">￥{{card.balance}}</span>
          <span class="logo" :style="'background-image: url('+card.logo+')'"></span>
        </div>
        <div class="button baseBgColor" @click="btn()">{{card.status=='none'?'激活会员卡':'消费账单'}}</div>

        <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"  v-if="showQrcode()" ></div>
        <div class="sub_title">{{card.status=='none'?'激活会员卡才能使用':'扫描二维码付款'}}</div>

      </div>
      </v-loadmore>
      <weui-dialog ref="dialog" type="confirm" title="请输入会员资料" confirmButton="激活" cancelButton="取消"
              @weui-dialog-confirm="activate()"
              @weui-dialog-cancel="close()">
        <div class="weui_cell">
          <input class="weui_input" type="tel" :placeholder="'请输入手机号'" v-model="mob">
        </div>
        <div class="weui_cell">
          <input class="weui_input" type="text" :placeholder="'请输入会员姓名'" v-model="name">
        </div>
      </weui-dialog>
      <Toast ref="toast"></Toast>
      <!--<div class="footer" @click="openWeixinCard()" v-if="isCardExt">-->
        <!--<span>&#45;&#45;微信卡包&#45;&#45;</span>-->
      <!--</div>-->
      <weui-dialog ref="error" type="alert" title="出错了"
                   confirm-button="关闭"
                   @weui-dialog-confirm="closeWindow()">
        {{errMsg}}
      </weui-dialog>
    </div>

  </div>
</template>
<style scoped>
  @import '../less/card.less';
  .weui_cell {
    flex-direction: column;
  }
  .card {
    margin-top: 10px;
  }
  .button {
    width:150px;
    height:35px;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #eee;
    font-size: 18px;
    color:#fff;
    margin: 10px auto;
    text-align: center;
    line-height: 35px;
  }
  .sub_title {
    margin-top: 10px;
    font-size: 14px;
    color:#ccc;
  }
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
  import Dialog from '../widget/dialog.vue';
  import CellInput from '../widget/cell-input.vue';
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
         mob:"",
         name:"",
         errMsg:"",
         payCode:"163231 84933",
         card:{id:0,status:'none',name:"样例",logo:"./static/logo.png",background:"./static/card.png",color:"c8",balance:0,code:"8800000000000000"}
      }
    },
    components: {
      'v-loadmore':Loadmore,
      Toast,
      'weui-dialog':Dialog,
      "cellInput":CellInput
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
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
        this.load();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      load:function (flag) {
          var _this = this;
          GET("website/member/card/view.jhtml?id="+_this.id+"&code="+_this.code).then(
              function (res) {
                if (res.type=='success') {
                  _this.mob = res.data.mobile;
                  _this.name = res.data.name;
                  _this.payCode = res.data.payCode;
                  _this.card = res.data.card;
                  _this.cardId = res.data.cardId;
                  _this.cardExt = res.data.cardExt;
                  if (utils.isNull(_this.card.background)) {
                    _this.card.background = "./static/card.png"
                  }
                  if (_this.card.status!='none') {
                      if (utils.isNull(flag)) {
                        _this.openWeixinCard();
                      }
                  }
                } else {
                  _this.errMsg = res.content;
                  _this.$refs.error.show();
                }
              },function (err) {
                _this.errMsg = err.content;
                _this.$refs.error.show();
            }
          )
      },
//      isCardExt:function () {
//         return !utils.isNull(_this.cardExt);
//      },
      showQrcode:function () {
         return this.card.status!='none';
      },
      show:function () {
         this.$refs.dialog.show();
      },
      close:function () {
        this.$refs.dialog.close();
      },
      closeWindow:function () {
         wx.closeWindow();
      },
      btn:function () {
         if (this.card.status=='none') {
             this.show();
         }
      },
      openWeixinCard:function() {
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
                    'addCard',
                    'closeWindow'
                  ]
                });
                //处理验证成功的信息
                wx.ready(function () {
                  wx.addCard({
                    cardList: [{
                      cardId: _this.cardId,
                      cardExt: '{"timestamp":"'+_this.cardExt.timestamp+'","nonce_str":"'+_this.cardExt.nonce_str+'","signature":"'+_this.cardExt.signature+'"}'
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
      },
      activate:function () {
        var _this = this;
        if (utils.isNull(_this.mob)) {
          _this.$refs.toast.show("会员手机号不能为空");
          return;
        }
        if (utils.isNull(_this.name)) {
          _this.$refs.toast.show("会员姓名不能为空");
          return;
        }
        POST("website/member/card/activate.jhtml?cardId="+_this.card.id+"&mobile="+_this.mob+"&name="+encodeURIComponent(_this.name)).then(
          function (res) {
            if (res.type=='success') {
              _this.close();
              _this.load("refresh");
              _this.openWeixinCard();
            } else {
              _this.close();
              _this.$refs.toast.show(res.content);
            }
          },function (err) {
            _this.close();
            _this.$refs.toast.show(err.content);
          }
        )
      }
    }
  }
</script>
