<template>
  <div class="page mask" style="position: fixed;bottom: 0;" v-if="isShow" >
    <div class="box">
      <div class="nav">
        <div class="nav_left" @click="goback()">
          <span class="close iconfont icon-arrow-dropright"></span>
        </div>
        <div class="nav_title">
          <span class="caption">确认付款</span>
        </div>
        <div class="nav_right">
          <span class="help iconfont icon-help"></span>
        </div>
      </div>
      <div class="fg">
        <span class="currency">¥0.02</span>
      </div>
      <cells>
        <cell>
          <span slot="header" class=" iconfont icon-dingdanxiangqing icon48"></span>
          <span slot="body">标题文字</span>
          <span slot="footer">说明文字</span>
        </cell>
      </cells>
      <div class="footer" v-bind:disabled="disabledButton" @click="comfrm()">
        <weui-button type="default" class="button">确定付款</weui-button>
      </div>
      <cells type="access">
        <dropdown ref="plugin" defId="0" :options="options"  @onchange="onchange">
        </dropdown>
      </cells>
    </div>
    <div class="box" v-if="isPwd">
      <div class="nav">
        <div class="nav_left" @click="goback()">
          <span class="close iconfont icon-arrow-dropright"></span>
        </div>
        <div class="nav_title">
          <div class="caption">支付密码</div>
        </div>
        <div class="nav_right">
          <span class="help iconfont icon-help"></span>
        </div>
      </div>
      <div class="fg">
        <div class="hint sub_title">请输入支付密码</div>
      </div>
      <!--6个验证码框-->
      <div class="inputTextBox" @click="getFocus()">
        <!--隐藏的输入框-->
        <input type="tel" ref="captchRef" v-model="captchaValue" maxlength="6" v-on:input="captchaInput" autofocus="true"
               class="input"/>
        <div class="inputDiv">
          <div v-for="item in textList" class="inputText">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>

  .footer {
    background-color: #fff;
    box-sizing: border-box;
    width:100%;
    padding: 0 40px;
    position: absolute;
    bottom: 20px;
    text-align: center;
  }

  .weui_cells {
    margin-top: 0px;
    border-top: 0px;
  }

  .box {
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 0px;
    background-color: #fff;
  }

  .nav {
    display: inline-block;
    text-align: justify;
    position: relative;
    float: left;
    width: 100%;
    height: 40px;
    background-color: #eee;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    border-bottom-style: solid;
  }

  .nav_left {
    position: absolute;
    left: 0px;
    padding-left: 5px;
    width: 10%;
    height: 40px;
    text-align: center;
  }

  .nav_right {
    position: absolute;
    right: 0px;
    padding-right: 5px;
    width: 10%;
    height: 40px;
    text-align: center;
  }

  .nav_title {
    float: left;
    width: 100%;
    height: 40px;
    text-align: center;
  }

  .caption {
    margin: auto;
    font-size:18px;
    line-height: 40px;
    color: #999;
  }

  .close {
    font-size: 24px;
    line-height: 40px;
    color: #999;
  }

  .help {
    font-size: 24px;
    line-height: 40px;
    color: #999;
  }

  .currency {
    font-size: 32px;
    line-height: 60px;
    color: red;
    height: 80px;
  }

  .hint {
    margin-top: 60px;
  }

  .inputTextBox {
    margin-top: 20px;
    width:100%;
    position: relative;
  }

  .inputText {
    box-sizing: border-box;
    margin:3px;
    position: relative;
    float:left;
    border-width: 1px;
    border-style: solid;
    border-color: #999;
    width: 40px;
    height: 40px;
    font-size: 40px;
    text-align: center;
    line-height: 40px;
  }

  .inputDiv {
    margin: 0 auto;
    width:276px;
  }

  .input {
    position: absolute;
    margin: 0 auto;
    opacity: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 40px;
    color:red;
  }

</style>
<script>
  import Toast from './toast.vue';
  import Button from './button.vue';
  import Cells from './cells.vue';
  import Cell from './cell.vue';
  import LinkCell from './link-cell.vue';
  import dropdown from './dropdown.vue';
  import { POST, GET } from '../assets/fetch.js';
  import wx from 'weixin-js-sdk'
  import utils from '../assets/utils';
  export default {
    components: {
      Toast,
      'weui-button': Button,
      Cells,
      Cell,
      LinkCell,
      dropdown
    },
    data: function () {
      return {
        options:[{id: "0", icon: "icon-icon-", color: "green", name: "微信支付"}, {
          id: "2",
          icon: "icon-shangjin",
          color: "red",
          name: "钱包余额"
        }],
        sn: "",
        pluginId:"",
        disabledButton:false,
        isShow: false,
        isPwd: false,
        captchaValue: '',
        textList: [" "," "," "," "," ", " "],
        optionIndex:0,
        lastCaptchaLength:0
      }
    },
    methods: {
      show:function (sn) {
//        this.$refs['plugin'].updateStatus();
        this.isShow = true;
        this.sn = sn;
      },
      onchange: function (id) {
        this.pluginId = id;
      },
//            当用户输入数字时触发
      captchaInput: function (event) {
        var _this = this;
//                判断删除还是输入  '大于' --> 删除
        if (_this.lastCaptchaLength > _this.captchaValue.length) {
          if (_this.optionIndex>0) {
            _this.optionIndex = _this.optionIndex-1;
            _this.textList[_this.optionIndex] = '';
          }
        } else {
          if (_this.optionIndex<6) {
            let a = _this.captchaValue;
            let b = a.substr(a.length - 1, 1)
            _this.textList[_this.optionIndex] = b;
            _this.optionIndex = _this.optionIndex + 1;
            _this.lastCaptchaLength = _this.captchaValue.length;
//                当用户输完验证码后进行系统验证
            if (_this.lastCaptchaLength == 6) {
              _this.captcha = _this.captchaValue;
              _this.balance(_this.captcha);
            }
          }
        }
      },
//            点击验证框时使隐藏的input获取焦点；
      getFocus: function () {
        this.$refs['captchRef'].focus();
      },
      goback:function () {
        this.close(utils.message("error","取消支付"));
      },
      close (e) {

        this.isShow = false;
        this.$emit("notify", e);

      },
      comfrm () {
        if (this.pluginId == 2) {
          this.isPwd = true;
          return;
        }
        if (this.pluginId == 1) {
          this.payment("alipayPayPlugin");
        }
        if (this.pluginId == 0) {
          this.payment("weixinPayPlugin");
        }
      },
      clear() {
        this.captchaValue = "";
        this.lastCaptchaLength = 0;
        this.optionIndex = 0;
        this.textList = [" "," "," "," "," ", " "];
      },
      balance(pwd) {
        var _this = this;
        GET("weex/common/public_key.jhtml").then(
          function (data) {
            if (data.type=="success") {
              let submit = POST("payment/submit.jhtml?sn="+_this.sn+"&paymentPluginId=balancePayPlugin&enPassword="+utils.encrypt(pwd,data.data));
              submit.then(
                function (data) {
                  if (data.type=="succcess") {
                    _this.close(data);
                  } else {
                    _this.clear();
                    _this.$refs.toast.show(data.content);
                  }
                },
                function (err) {
                  _this.clear();
                  _this.$refs.toast.show(data.content);
                }
              )
            } else {
              _this.clear();
              _this.$refs.toast.show(data.content);
            }
            _this.disabledButton = false;
          },
          function (err) {
            _this.clear();
            _this.disabledButton = false;
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      payment(plugid) {
        if (this.disabledButton) {
          return;
        }
        this.disabledButton = true;
        var _this = this;
        POST("payment/submit.jhtml?sn="+this.sn+"&paymentPluginId="+plugid).then(
          function (data) {
            if (data.type=="success") {
              alert(data);
              if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
                if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(data.data), false);
                }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(data.data));
                  document.attachEvent('onWeixinJSBridgeReady',_this.onBridgeReady(data.data));
                }
              }else{
                _this.onBridgeReady(data);
              }
            } else {
              _this.close(data);
            }
            _this.disabledButton = false;
          },
          function (err) {
            _this.disabledButton = false;
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },
      onBridgeReady:function(data){
        var  vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.package,
            "signType":data.signType, //微信签名方式：
            "paySign":data.paySign //微信签名
          },
          function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request：ok" ){
              _this.close(utils.message("success","支付成功"));
            }else{
              _this.close(utils.message("error","支付失败"));
            }
          }
        );
      }
    },
  }
</script>
