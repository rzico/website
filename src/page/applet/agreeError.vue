<template>
  <div class="container">
    <div class="page msg">
      <Message :icon="pageIcon" :title="title">
        <div slot="content" class="money">
        </div>
      </Message>
      <!--<div class="footer">-->
      <!--<span @click="goComplete()"  class="complete">完成</span>-->
      <!--</div>-->
    </div>

    <Toast ref="toast"></Toast>
  </div>
</template>

<style scoped>
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
  import Toast from '../../widget/toast.vue';
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import Message from '../../widget/message.vue';
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
//        waiting cancel
        amount:'',
        sn:'',
//        goodsName:'',
        title:'授权失败',
//        articleId:'',
        isCancel:false,
        isSuccess:false,
        paymentId:'',
        payType:"",
        payWay:''
      }
    },
    components: {
      Message,
      Toast,
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
          case '支付失败':case '授权失败':
            return 'cancel';
            break;
          case '支付成功':case '授权成功':
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
        }else{
          return value;
        }
      },
      watchAmount:function (value) {
        return utils.currencyfmt(value);
      }
    },
    created() {
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

    },
    methods:{
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
    }
  }
</script>
