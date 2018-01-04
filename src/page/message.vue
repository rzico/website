<template>
  <div class="container">
    <div class="page msg">
      <message icon="success" :title="title">
        <div slot="content" class="money">
          <div>
            <span style="font-size: 16px">{{goodsName}}</span>
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
      </message>
      <div class="footer">
        <a href="/t1001?id=283" class="complete">完成</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .complete{
    padding: 7px 60px;
    border: 1px solid #09BB07;
    font-size: 13px;
    color: #0bb20c;
    border-radius: 3px;
  }
  .moneyIcon{
    font-size: 25px;
  }
  .money {
    margin-top: 60px;
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
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import Message from '../widget/message.vue';
  import Button from '../widget/button.vue';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        amount:0,
        sn:'',
        goodsName:'',
        title:'支付成功'
      }
    },
    components: {
      Message,
      'weui-button': Button
    },
    created() {
      var _this = this;
      this.amount = utils.getUrlParameter("amount");
      this.sn = utils.getUrlParameter("psn");
      this.goodsName = utils.getUrlParameter("name");
      if(!utils.isNull(utils.getUrlParameter("title"))){
        this.title = utils.getUrlParameter("title");
      }
      setTimeout(
        function () {
          _this.query();
        },
        2000
      )
    },
    methods:{
      query:function () {
        if (!utils.isNull(this.sn)) {
          POST("payment/query.jhtml?sn="+this.sn).then(
            function (res) {

            },
            function (err) {

            }
          )
        }
      },
      close:function() {
        if (utils.isweixin()) {
          WeixinJSBridge.call('closeWindow');
        }
        if (utils.isalipay()) {
          AlipayJSBridge.call('closeWebview');
        }
      }
    }
  }
</script>
