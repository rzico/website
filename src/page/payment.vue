<template>
  <div class="container">
    <div class="page msg">
      <Message :icon="pageIcon" :title="title">
        <div slot="content" class="money">
          <div class="goodsNameBox">
            <span>订单付款</span>
          </div>
          <div>
          <span class="moneyIcon">¥ </span>
          <span>
          {{amount}}</span>
          </div>
        </div>
        <!--<button-area slot="operation">-->
          <!--<weui-button type="primary" @onclick="close()">确定</weui-button>-->
          <!--&lt;!&ndash;<weui-button type="default">取消</weui-button>&ndash;&gt;-->
        <!--</button-area>-->
      </Message>
      <div class="footer">
        <div class="goodsNameBox">
          <span class="gray">付款方式: 微信支付</span>
        </div>
        <div class="goodsNameBox">
          <span class="gray">商品说明: 线下收款</span>
        </div>
        <span @click="payAgain()" v-if="isCancel" class="complete redStyle">继续支付</span>
        <span @click="goComplete()" v-if="isSuccess" class="complete">完成</span>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>

<style scoped>
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
    border: 1px solid #09BB07;
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
    margin-top: 50px;
    margin-bottom: 40px;
    font-size: 43px;
    line-height: 48px;
    color:#000;
  }
  .footer {
    position: absolute;
    bottom:60px;
    text-align: center;
    width:100%;
  }
</style>

<script>
  import Toast from '../widget/toast.vue';
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import Message from '../widget/message.vue';
  import Button from '../widget/button.vue';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
//        waiting cancel
        pageIcon:'waiting',
        amount:236,
        sn:'',
//        goodsName:'',
        title:'支付中',
//        articleId:'',
        isCancel:false,
        isSuccess:false,
      }
    },
    components: {
      Message,
      Toast,
      'weui-button': Button
    },
    created() {
      var _this = this;
      this.sn = utils.getUrlParameter("psn");
      if(!utils.isNull(utils.getUrlParameter("amount"))){
        this.amount = utils.getUrlParameter("amount");
      }
//      if(!utils.isNull(utils.getUrlParameter("name"))){
//        this.goodsName = decodeURI(utils.getUrlParameter("name"));
//      }
//      this.articleId = utils.getUrlParameter('articleId');
      if(!utils.isNull(utils.getUrlParameter("title"))){
        this.title = utils.getUrlParameter("title");
      }
      if(utils.getUrlParameter('type') == 'weixin'){
            _this.weixin(this.sn);
       }else if(utils.getUrlParameter('type') == 'alipay'){
            _this.alipay(this.sn);
       }
    },
    methods:{
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
      alipay:function (sn) {
        var _this = this;
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=aliPayPlugin").then(
          function (res) {
            if (res.type=="success") {
              AlipayJSBridge.call("tradePay",{
                "tradeNO": res.data.tradeNO
              }, function(result){
                if(result.resultCode == '9000'){
                  _this.title = '支付成功';
                  _this.pageIcon = 'success';
                  _this.isCancel = false;
                  _this.isSuccess = true;
//                  _this.$router.push({name:"message",query:{psn:sn,amount:_this.finallPrice}})
                  setTimeout(function () {
                   _this.query()
                  },2000)
                } else {
                  _this.$refs.toast.show('支付取消');
                  _this.title = '支付取消';
                  _this.pageIcon = 'cancel';
                  _this.isCancel = true;
                }
              });
            }
            else {
              _this.title = '支付失败';
              _this.isCancel = true;
              _this.pageIcon = 'cancel';
              _this.$refs.toast.show("网络不稳定");
            }
          },
          function (err) {
            _this.title = '支付失败';
            _this.isCancel = true;
            _this.pageIcon = 'cancel';
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      weixin:function(sn) {
        var _this = this;
        alert('1');
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=weixinPayPlugin").then(
          function (res) {

            let ss = JSON.stringify(res);
            alert(ss);
            if (res.type=="success") {
              WeixinJSBridge.invoke('getBrandWCPayRequest',{
                "appId" : res.data.appId,
                "timeStamp":res.data.timeStamp,
                "nonceStr" :res.data.nonceStr,
                "package" :res.data.package,
                "signType" :res.data.signType,
                "paySign" : res.data.paySign,
              },function(result){
                let ac = JSON.stringify(result);
                alert(ac);
                if(result.err_msg == "get_brand_wcpay_request:ok" ) {
                  _this.title = '支付成功';
                  _this.pageIcon = 'success';
                  _this.isSuccess = true;
                  _this.isCancel = false;
                  setTimeout(function () {
                  _this.query()
                },2000)
                } else {

                  _this.$refs.toast.show("支付取消");
//                  _this.$refs.toast.show(result.memo);
                  _this.title = '支付取消';
                  _this.pageIcon = 'cancel';
                  _this.isCancel = true;
                }

              });
            }
            else {
              _this.title = '支付失败';
              _this.isCancel = true;
              _this.pageIcon = 'cancel';
              _this.$refs.toast.show("网络不稳定");
            }

          },
          function (err) {
            _this.title = '支付失败';
            _this.pageIcon = 'cancel';
            _this.isCancel = true;
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      goComplete(){
        let _this = this;
//        if(utils.isNull(this.articleId)){
          _this.$router.go(-1);
//        }else{
//          _this.$router.push({
//            name: "t1001",
//            query: {id:_this.articleId}
//          });
//        }
      },
      payAgain(){
        this.title = '支付中';
        this.pageIcon = 'waiting';
        if(utils.getUrlParameter('type') == 'weixin'){
          this.weixin(this.sn);
        }else if(utils.getUrlParameter('type') == 'alipay'){
          this.alipay(this.sn);
        }
      }
    }
  }
</script>
