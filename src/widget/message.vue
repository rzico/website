<template>
  <div class="container">
    <div class="page msg">
      <message icon="success" title="付款成功">
        <div slot="content" class="money">
          {{amount}}
        </div>
        <button-area slot="operation">
          <weui-button type="primary" @onclick="close()">确定</weui-button>
          <!--<weui-button type="default">取消</weui-button>-->
        </button-area>
      </message>
      <div class="footer">
        <a href="/website">进入芸店</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .money {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 48px;
    line-height: 48px;
    color:red;
  }
  .footer {
    position: absolute;
    bottom:40px;
    text-align: center;
    width:100%;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import Message from './messageChild.vue';
  import ButtonArea from './button-area.vue';
  import Button from './button.vue';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        amount:0,
        sn:''
      }
    },
    components: {
      Message,
      ButtonArea,
      'weui-button': Button
    },
    created() {
      var _this = this;
      this.amount = utils.getUrlParameter("amount");
      this.sn = utils.getUrlParameter("psn");
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
