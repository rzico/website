<template>
  <div class="bgc" >
    <div class="insone">
      <div class="bg">
        <div class="headlogo">
          <img class="shopLogo" :src="logo">
        </div>
      </div>
      <span class="f16 martop40">由{{shopName}}提供</span>
      <span class="f30 martop10">{{name}}</span>
      <div class="getClick martop15" @click="pick"  v-if="!contorl">
        <span class="f18" style="color: white">点击领取</span>
      </div>
      <div class="getClickTwo martop15" v-if="contorl">
        <div class="use" @click="use()">使用</div>
        <div class="send" @click="sendMes()">转赠</div>
      </div>
      <span class="martop30 f14" style="color: #888">有效期{{beginDate | timeDatefmt}}至{{endDate | timeDatefmt}}</span>
      <!--二维码-->
      <div class="qrcodeDiv" v-if="ismask">
        <img class="qrcode" resize="cover" :src="qrcode"/>
      </div>
      <!--左右两边的半圆-->
      <div class="rightmindiv"></div>
      <div class="leftmindiv"></div>
    </div>
    <!--&lt;!&ndash;遮罩层&ndash;&gt;-->
    <!--<div class="maskLayer" v-if="ismask">-->
      <!--&lt;!&ndash;关闭按钮&ndash;&gt;-->
      <!--<div class="shutDown" @click="shutDown()"><i class="iconfont icon-arrow-dropright fzc20"></i></div>-->
      <!--&lt;!&ndash;二维码&ndash;&gt;-->
      <!--<div class="qrcodeDiv">-->
        <!--<img class="qrcode" resize="cover" :src="qrcode"/>-->
      <!--</div>-->
    <!--</div>-->
    <div class="instwo">
      <div class="flex-be martop15 marbot15" @click="control">
      <span class="f16">使用说明</span>
      <i class="iconfont icon-xiajiantou fz16"></i>
      </div>
      <div class="marbot15" v-if="isPopup">
        <li class="f14 fontColor888">此优惠券仅限本店使用</li>
        <li class="f14 fontColor888">请在有效期内使用,逾期作废</li>
        <li class="f14 fontColor888">不可售与他人</li>
      </div>
    </div>
    <weui-dialog ref="prompting" type="alert" title=""
                 confirm-button="关闭"
                 @weui-dialog-confirm="closeWindow()">
      {{Mes}}
    </weui-dialog>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  /*二维码*/
  .qrcodeDiv{
    /*position: absolute;*/
    /*height: 250px;*/
    /*width: 250px;*/
    background-color: white;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .shutDown{
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color:rgba(0,0,0,0.7);
    position: absolute;
    top: 60px;
    right: 25px;
  }
  .maskLayer{
    position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
   .bgc{
     background-color:#EB4E40;
     width: 100%;
     position: absolute;
     top:0;
     bottom:0;
  }
   .bg{
     display: flex;
     display: -webkit-flex;
     justify-content: center;
   }
   .headlogo{
    height: 60px;
    width: 60px;
    background-color: #cccccc;
    border-radius: 30px;
    position: absolute;
     top: -30px;
  }
   .shopLogo{
     height: 60px;
     width: 60px;
     border-radius: 30px;
   }
  .insone{
    background-color: white;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 80px;
    padding-bottom: 20px;
    align-items: center;
    border-bottom:1px dashed;
    border-color: #cccccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    position: relative;
  }
  .instwo{
    background-color:white;
    /*height: 160px;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    display: -webkit-flex;
  }
  .rightmindiv{
    background-color:#EB4E40;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    position: absolute;
    bottom: -5px;
    right: -5px;
  }
   .leftmindiv{
     background-color:#EB4E40;
     height: 10px;
     width: 10px;
     border-radius: 5px;
     position: absolute;
     bottom: -5px;
     left: -5px;
   }
   .f14{
    font-size: 14px;
  }
   .f16{
    font-size: 16px;
  }
   .fzc20{
     font-size: 20px;
     color: white;
   }
   .f30{
     font-size: 30px;
   }
   .f18{
     font-size: 18px;
   }
  .martop40{
    margin-top: 40px;
  }
  .martop30{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .martop10{
    margin-top: 10px;
  }
  .martop15{
    margin-top: 15px;
  }
  .marbot15{
    margin-bottom: 15px;
  }
  .fontColor888{
    color: #888;
  }
  .getClick{
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    background-color:#EB4E40;
    border-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }
   .getClickTwo{
     justify-content: space-between;
     align-items: center;
     width: 150px;
     height: 40px;
     border-radius: 5px;
     display: flex;
     display: -webkit-flex;
     flex-direction: row;
   }
   .use{
     height: 40px;
     width:70px;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color:#EB4E40;
     border-radius: 5px;
     font-size: 20px;
     color:white;
   }
   .send{
     height: 40px;
     width:70px;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color:#EB4E40;
     border-radius: 5px;
     font-size: 20px;
     color:white;
   }
  .flex-be{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
<script>
  import { POST, GET, AUTH,SHARE} from '../../assets/fetch.js';
  import Dialog from '../../widget/dialog.vue';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        couponId:'',
        codeId:'',
        logo:'',
        name:'',
        shopName:'',
        beginDate:'',
        endDate:'',
        isPopup:false,
        Mes:'',
        contorl:false,
        ismask:false,
        qrcode:'',
        introduction:'',
        xuid:'',
        couponCodeId:'',
        urlXuid:'',
        logined:false,
//        商家id
        ownerId:''
      }
    },
    components: {
      Toast,
      'weui-dialog':Dialog,
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      }
    },
    created() {
      var _this = this;
      AUTH(location.href,function (logined) {
        _this.logined = logined;
        _this.couponId = utils.getUrlParameter('id');
        _this.codeId = utils.getUrlParameter('codeId');
        _this.type = utils.getUrlParameter('type');
        _this.couponCodeId = utils.getUrlParameter('couponCodeId');
        _this.urlXuid = utils.getUrlParameter('xuid');
        if(utils.isNull(_this.type)){
          _this.contorl = false
        }else {
          _this.contorl = true
        };
        _this.open();
      })
    },
    methods:{
//      点击赠送
      sendMes:function () {
        this.$refs.toast.show('请点击右上角进行分享');

      },
//      点击使用
      use:function () {
        let  _this = this
        GET("website/member/couponCode/view.jhtml?id="+this.couponId).then(
          function (res) {
          if (res.type=='success') {
            _this.qrcode = "http://pan.baidu.com/share/qrcode?w=200&h=200&url="+encodeURI(res.data.payCode);
            if(!utils.isNull(_this.qrcode)){
              _this.ismask = true
            }
          } else {
            _this.$refs.toast.show(res.content);
          }
        },function (err) {
            _this.$refs.toast.show(err.content);
        })
      },
//      关闭二维码
      shutDown:function () {
        this.ismask = false
      },
//      控制使用说明是否渲染
      control:function () {
          this.isPopup = !this.isPopup;
      },
      open:function () {
        let _this =this;
        GET("website/coupon/view.jhtml?id="+_this.couponId).then(
          function (res) {
            if (res.type=='success') {
              _this.logo = res.data.coupon.logo;
              _this.name = res.data.coupon.name;
              _this.beginDate = res.data.coupon.beginDate;
              _this.endDate = res.data.coupon.endDate;
              _this.shopName =res.data.coupon.shopName;
              _this.introduction = res.data.coupon.introduction;
              _this.ownerId = res.data.coupon.ownerId
              GET("website/member/view.jhtml").then(
                function (res) {
                  if (res.type=='success') {
                    _this.xuid = res.data.id
                    //设置分享标题
                    utils.setConfig({
                      title:_this.name,
                      desc:_this.introduction,
                      link:utils.getConfig().baseURL+'#/activate?id='+_this.couponId+'&xuid='+_this.xuid+'&couponCodeId='+_this.codeId,
                      thumbnail:_this.logo,
                    });
                    SHARE(location.href);
                  }
                },
                function (err) {
                  _this.$refs.toast.show(err.content);
                }
              )

            }
          },
          function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
//      打开微信卡包
      openWeixinCard:function(cardId,timestamp,nonce_str,signature) {
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
                      cardId: cardId,
                      cardExt: '{"timestamp":"'+timestamp+'","nonce_str":"'+nonce_str+'","signature":"'+signature+'"}'
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
      pick:function () {
        if(this.logined == false){
          return
        }
        if(!utils.isNull(this.urlXuid) && this.urlXuid != this.xuid){
        let _this =this;
          POST('website/member/coupon/activate.jhtml?couponCodeId='+_this.couponCodeId+'&xuid='+this.urlXuid).then(
            function (data) {
              if (data.type=="success") {
                GET("website/member/card/weixin.jhtml?authorId="+_this.ownerId).then(
                  function (res) {
                    if (res.type=='success') {
                      wx.closeWindow();
//                     if(res.data.status == 'unclaimed'){
////                       _this.openWeixinCard(res.data.cardId,res.data.cardExt.timestamp,res.data.cardExt.nonce_str,res.data.cardExt.signature)
//                     }else{
//                       wx.closeWindow();
//                     }
                    } else {
                      _this.$refs.toast.show(res.content);
                    }
                  },function (err) {
                    _this.$refs.toast.show(err.content);
                  });
              } else {
                _this.Mes = data.content;
                _this.$refs.prompting.show();
              }
            },
            function (err) {
              _this.Mes = err.content;
              _this.$refs.prompting.show();
            }
          )
        }else {
          let _this =this;
          POST('website/member/coupon/activate.jhtml?id='+_this.couponId).then(
            function (data) {
              if (data.type=="success") {
                GET("website/member/card/weixin.jhtml?authorId="+_this.ownerId).then(
                  function (res) {
                    if (res.type=='success') {
                      if(res.data.status == 'unclaimed'){
                        _this.openWeixinCard(res.data.cardId,res.data.cardExt.timestamp,res.data.cardExt.nonce_str,res.data.cardExt.signature)
                      }else{
                        wx.closeWindow();
                      }
                    } else {
                      _this.$refs.toast.show(res.content);
                    }
                  },function (err) {
                    _this.$refs.toast.show(err.content);
                  });
              } else {
                _this.Mes = data.content;
                _this.$refs.prompting.show();
              }
            },
            function (err) {
              _this.Mes = err.content;
              _this.$refs.prompting.show();
            }
          )
        }
      },
      closeWindow:function () {
//        this.$router.go(-1)
        this.$router.push({name:"memberIndex",query:{}});
      },
    }
  }
</script>
