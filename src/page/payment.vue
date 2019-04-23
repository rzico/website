<template>
  <div class="container">
    <div class="page msg payment" :class="[paymentPage()]">
      <div class="messageBox">
        <Message :icon="pageIcon" :title="title" >
          <div slot="content" class="money">
            <!--<div class="goodsNameBox">-->
            <!--<span>订单付款</span>-->
            <!--</div>-->
            <div v-if="hasAmount()" class="moneyWeight">
              <span class="moneyIcon">¥ </span>
              <span>{{amount | watchAmount}}</span>
            </div>
          </div>
          <!--<button-area slot="operation">-->
          <!--<weui-button type="primary" @onclick="close()">确定</weui-button>-->
          <!--&lt;!&ndash;<weui-button type="default">取消</weui-button>&ndash;&gt;-->
          <!--</button-area>-->
        </Message>
      </div>
      <div class="payment-qrCode-box" v-if="isSuccess && showCode()">
        <img class="payment-qrCode" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1552562162&di=55d23484d535f2bd6d997ab78dda8a9c&src=http://pic.qqtn.com/up/2018-1/2018012710125472621.jpg" alt="">
        <p>长按图片识别二维码</p>
        <p>进入小程序,查看订单详情</p>
      </div>
      <div class="footer">
        <!--<div class="goodsNameBox" v-if="hasPayWay()">-->
        <!--<span class="gray">付款方式: {{this.payWay | watchPayWay}}</span>-->
        <!--</div>-->
        <!--<div class="goodsNameBox" v-if="hasPayMemo()">-->
        <!--<span class="gray">商品说明: {{this.payMemo}}</span>-->
        <!--</div>-->
        <span @click="payAgain()" v-if="isCancel" class="complete redStyle">继续支付</span>
        <span @click="goComplete()" v-if="isSuccess" class="complete">完成</span>
      </div>
    </div>
    <!--免密支付-->
    <weui-dialog ref="dialog" type="confirm" title="免密支付" confirmButton="确认支付" cancelButton="取消"
                 @weui-dialog-confirm="activate()"
                 @weui-dialog-cancel="closeConfirm()" style="z-index: 300000000111">
      <div >
        <p style="text-align: center;width: 100%;font-size: 13px;color: #444">{{payWay}}</p>
      </div>
      <div >
        <p style="text-align: center;width: 100%;font-size: 25px;color: #000">¥{{amount}}</p>
      </div>
    </weui-dialog>
  </div>
</template>
<style scoped>
  .messageBox{
    position: relative;
    display: flex;
    flex-shrink: 0;
    /*background-color: #fff;*/
    z-index: 99;
  }
  .moneyWeight{
    font-weight: 450;
  }
  .payment{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
    /*padding: 30px 0;*/
    /*padding: 50px 0;*/
    align-items: center;
  }
  .payment .payment-qrCode-box{
    margin-top: -35px;
    display: flex;
    flex-shrink: 0;
  }
  .payment .pt70{
    padding-top: 0px !important;
  }
  .payment .weui_msg .weui_text_area .money{
    margin-top: 0px !important;
  }
  .payment-qrCode{
    width:200px;
    height:200px;
  }
  .payment-qrCode-box p{
    font-size: 12px;
    color: gray;
  }
  .payment-qrCode-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  [v-clock]{
    display:none
  }
  .redStyle{
    color: red !important;
    border: 1px solid red !important;

  }
  .gray{
    color: #999;
  }
  .goodsNameBox{
    font-size: 16px;line-height: 20px !important;
    margin-bottom: 15px;
  }
  .complete{
    /*padding: 7px 60px;*/
    padding: 7px 0px;
    border: 1px solid #0bb20c;
    font-size: 13px;
    line-height: 13px;
    color: #0bb20c;
    border-radius: 3px;
    width: 150px;
    text-align: center;
    display: inline-block;
  }
  .moneyIcon{
    font-size: 25px;
  }
  .money {
    /*margin-top: 50px;*/
    /*margin-bottom: 40px;*/
    margin-top: 20px;
    font-size: 43px;
    line-height: 48px;
    color:#000;
  }
  .footer {
    /*position: absolute;*/
    /*bottom:20px;*/
    text-align: center;
    width:100%;
  }
  .paymentSuccess{
    justify-content: space-around;
  }
  .paymentNoSuccess{
    justify-content: space-between;
    padding: 80px 0 40px 0;

  }
</style>

<script>
  import { Indicator } from 'mint-ui';
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import Message from '../widget/message.vue';
  import Button from '../widget/button.vue';
  import utils from '../assets/utils.js';
  import Dialog from '../widget/dialog.vue';
  export default {
    data() {
      return {
//        waiting cancel
        amount:'',
//        amount:'140.00',
        sn:'',
//        goodsName:'',
        title:'支付中',
//        title:'支付成功',
//        articleId:'',
        isCancel:false,
        isSuccess:false,
//        isSuccess:true,
        paymentId:'',
        payType:"",
        payWay:'',
        payMemo:'',
//        payWay:'微信支付',
//        payMemo:'线下支付'
      }
    },
    components: {
      Message,
      'weui-button': Button,
      'weui-dialog':Dialog,
      Indicator
    },
    computed:{
      pageIcon: function () {
        switch (this.title){
          case '支付中':
            return 'waiting';
            break;
          case '支付取消':
            return 'cancel';
            break;
          case '支付失败':
            return 'cancel';
            break;
          case '支付成功':
            return 'success';
            break;
          default:
            return 'waiting';
        }
      },
    },
    filters:{
      watchPayWay:function (value) {
        if(value == 'weixin'){
          return '微信支付';
        }else if(value == 'alipay'){
          return '支付宝付款';
        }else if(value == 'h5pay'){
          return '网页付款';
        }else{
          return value;
        }
      },
      watchAmount:function (value) {
        return utils.currencyfmt(value);
      }
    },
    created() {
      /*****
       *
       //      h5支付取消后返回到本页面，应将location.href打印出来 看看是否有回调。
       *
       *****/
//      console.log('12')s

        this.showLoading();

//      将数据存到 session中，不管前进后退还是刷新，数据依然还在，关闭窗口后再进页面才会清空session数据，可以控制页面只刷新一次
//      if(utils.isIos()){//判断是否是ios
//        if (sessionStorage.getItem('flag')) {
//          sessionStorage.removeItem('flag')
//        } else {
//          sessionStorage.setItem('flag','close');
////        页面刷新
//          location.reload()
//          return;
//        }
//      }

//      重新组建url
      let url = location.href;
      if(url.indexOf('/#/') == -1){
        location.href = url.substring(0,url.indexOf('?')) + url.substring(url.indexOf('#/'));
        return;
      }

//      this.setCurrentPage(location.href)
      var _this = this;
      this.sn = utils.getUrlParameter("psn");
      if(!utils.isNull(utils.getUrlParameter("amount"))){
        this.amount = utils.getUrlParameter("amount");
      }
      if(!utils.isNull(utils.getUrlParameter("title"))){
        this.title = utils.getUrlParameter("title");
        switch (this.title){
          case '支付中':
            break;
          case '支付取消':
            _this.isCancel = true;
            break;
          case '支付失败':
            _this.isCancel = true;
            break;
          case '支付成功':
            _this.isSuccess = true;
            break;
          default:
            return ;
        }
      }
      this.payType = utils.getUrlParameter('type');
      if(!utils.isNull(utils.getUrlParameter("memo"))){
        _this.payMemo = decodeURI(utils.getUrlParameter('memo'));
      }
      if(!utils.isNull(this.payType)){
        _this.payWay = decodeURI(this.payType);
      }
//      alert(location.href)
      console.log('===')
    },
    mounted() {
      var _this = this;
//      此处延迟500毫秒再执行支付函数，是因为location.href重定向页面后需要等待一下，才能正常发起支付。
      setTimeout(function (){
          _this.doPay();
        }
        ,500);
    },
    watch: {
//      控制页面切换动画效果
      $route(to, from) {
        console.log('===')
        console.log(to);
        console.log(from);
      }
    },
    methods:{
      showLoading(){
//      加载框 http://mint-ui.github.io/docs/#/zh-cn2/indicator
        Indicator.open({
          text:'支付中',
          spinnerType: 'triple-bounce'
        });
      },
      hasPayMemo(){
        if(utils.isNull(this.payMemo)){
          return false;
        }else {
          return true;
        }
      },
      hasPayWay(){
        if(utils.isNull(this.payWay)){
          return false;
        }else {
          return true;
        }
      },
      hasAmount(){
        if(utils.isNull(this.amount)){
          return false;
        }else {
          return true;
        }
      },
      doPay:function () {
        var _this = this;
        let payType = this.payType;
        if(payType == 'weixin'){
//          _this.payWay = payType;
          _this.weixin(this.sn);
        }else if(payType == 'alipay'){
//          _this.payWay = payType;
          _this.alipay(this.sn);
        }else if(payType == 'h5pay'){
          _this.h5pay(this.sn)
        }else{
          if(_this.payWay == '余额支付'){
            _this.paymentId = 'balancePayPlugin'
          }else if(_this.payWay == '会员卡支付'){
            _this.paymentId = 'cardPayPlugin'
          }else {
            _this.paymentId = 'cardPayPlugin'
          }
        }
      },
      close:function() {
        if (utils.isweixin()) {
          WeixinJSBridge.call('closeWindow');
        }
        if (utils.isalipay()) {
          AlipayJSBridge.call('closeWebview');
        }
      },
      query:function () {
        if (!utils.isNull(this.sn)) {
          POST("payment/query.jhtml?sn="+this.sn).then(
            function (res) {
//              res = JSON.stringify(res);
//              alert(res);
            },
            function (err) {
//              res = JSON.stringify(res);
//              alert(err);
            }
          )
        }
      },
      h5pay:function(sn) {
        var _this = this;
//        weixinOcPayPlugin    weixinPayPlugin
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=weixinH5Plugin").then(
          function (res) {
            if (res.type=="success") {
//              replace
              location.href = res.data.mweb_url;
//setInterval 每隔1000ms执行一次
              var snQuery = setInterval(function(){
                POST("payment/query.jhtml?sn="+sn).then(
                  function (res) {
                    if(res.type == 'success' && res.data == '0000'){
                      _this.title = '支付成功';
                      _this.isCancel = false;
                      _this.isSuccess = true;
                      Indicator.close();
                      if(!utils.isNull(snQuery)){
                        clearTimeout(snQuery);
                        snQuery = null;
                      }
                    }else{
                      _this.title = '支付失败';
                      _this.isCancel = true;
                      Indicator.close();
                      utils.showToast('支付失败','icon-shibai');
//                    _this.pageIcon = 'cancel';
                      if(!utils.isNull(snQuery)){
                        clearTimeout(snQuery);
                        snQuery = null;
                      }
                    }
                  },
                  function (err) {
                    _this.title = '支付失败';
                    _this.isCancel = true;
                    Indicator.close();
                    utils.showToast('支付失败','icon-shibai');
                    if(!utils.isNull(snQuery)){
                      clearTimeout(snQuery);
                      snQuery = null;
                    }
                  }
                )
              },5000)
            } else {
              _this.title = '支付失败';
              _this.isCancel = true;
//              _this.pageIcon = 'cancel';
              Indicator.close();
              utils.showToast();
            }
          },
          function (err) {
            _this.title = '支付失败';
//            _this.pageIcon = 'cancel';
            _this.isCancel = true;
            Indicator.close();
            utils.showToast();
          }
        )
      },
      alipay:function (sn) {
        var _this = this;
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=aliPayPlugin").then(
          function (res) {
            if (res.type=="success") {
              let jsApiCall = function () {
                AlipayJSBridge.call("tradePay",{
                  "tradeNO": res.data.tradeNO
                }, function(result){
                  if(result.resultCode == '9000'){
                    _this.title = '支付成功';
                    Indicator.close();
//                  _this.pageIcon = 'success';
                    _this.isCancel = false;
                    _this.isSuccess = true;
//                  _this.$router.push({name:"message",query:{psn:sn,amount:_this.finallPrice}})
                    setTimeout(function () {
                      _this.query()
                    },2000)
                  } else {

                    Indicator.close();
                    utils.showToast('支付取消');
                    _this.title = '支付取消';
//                  _this.pageIcon = 'cancel';
                    _this.isCancel = true;
                  }
                });
              }
              if (typeof AlipayJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('AlipayJSBridge', jsApiCall, false);
                } else if (document.attachEvent) {
                  document.attachEvent('AlipayJSBridge', jsApiCall);
                  document.attachEvent('onAlipayJSBridge', jsApiCall);
                }
              } else {
                jsApiCall();
              }
            }
            else {
              _this.title = '支付失败';
              _this.isCancel = true;
//              _this.pageIcon = 'cancel';
              Indicator.close();
              utils.showToast();
            }
          },
          function (err) {
            _this.title = '支付失败';
            _this.isCancel = true;
//            _this.pageIcon = 'cancel';
            Indicator.close();
            utils.showToast();
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
                    _this.title = '支付成功';
                    Indicator.close();
//                  _this.pageIcon = 'success';
                    _this.isSuccess = true;
                    _this.isCancel = false;
                    setTimeout(function () {
                      _this.query()
                    },2000)
                  } else {
                    Indicator.close();
                    utils.showToast('支付取消');
//                  _this.$refs.toast.show(result.memo);
                    _this.title = '支付取消';
//                  _this.pageIcon = 'cancel';
                    _this.isCancel = true;
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
              _this.title = '支付失败';
              _this.isCancel = true;
              Indicator.close();
//              _this.pageIcon = 'cancel';
              utils.showToast();
            }
          },
          function (err) {
            _this.title = '支付失败';
//            _this.pageIcon = 'cancel';
            _this.isCancel = true;
            Indicator.close();
            utils.showToast();
          }
        )
      },
      goComplete(){
        let _this = this;
//    前往下载页
        this.$router.replace({
          name: "index",
        });
        return;
//        if(utils.isNull(this.articleId)){
//        _this.$router.go(-1);
//        }else{
//          _this.$router.push({
//            name: "t1001",
//            query: {id:_this.articleId}
//          });
//        }
      },
//      再次支付
      payAgain(){
        this.title = '支付中';
        this.showLoading();
//        this.pageIcon = 'waiting';
        if(this.payWay == 'weixin'){
          this.weixin(this.sn);
        }else if(this.payWay == 'alipay'){
          this.alipay(this.sn);
        }else if(this.payWay == 'h5pay'){
          this.h5pay(this.sn)
        }else{
          Indicator.close();
          this.$refs.dialog.show();
        }
      },

//       取消免密支付
      closeConfirm:function () {
        this.title = '支付取消';
        utils.showToast('支付取消');
        this.$refs.dialog.close();
      },
//      确定免密支付
      activate:function () {
        let _this = this;
        POST('payment/submit.jhtml?sn='+ this.sn + '&paymentPluginId='+ this.paymentId + '&safeKey=free').then(
          function (data) {
            if (data.type=="success") {
              utils.showToast('支付成功','icon-chenggong');
              _this.title = '支付成功';
              _this.isSuccess = true;
              _this.isCancel = false;
            } else {
              _this.title = '支付失败';
              _this.isCancel = true;
//              _this.pageIcon = 'cancel';
              utils.showToast();
            }
            this.$refs.dialog.close();
//            _this.disabledButton = false;
          },
          function (err) {
            utils.showToast();
            this.$refs.dialog.close();
            _this.title = '支付失败';
            _this.isCancel = true;
          }
        )
      },
      showCode(){
//        return true
        return utils.isweixin();
      },
      paymentPage(){
        if(this.isSuccess && this.showCode()){
          return 'paymentSuccess'
        }else{
          return 'paymentNoSuccess'
        }
      },
    }
  }
</script>
