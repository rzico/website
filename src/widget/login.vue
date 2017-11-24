<template>
  <div class="login">
    <Dialog type="confirm" title="手机验证码登录" confirmButton="登录" cancelButton="取消"
            @weui-dialog-confirm="login()"
            @weui-dialog-cancel="close()">
      <div class="weui_cell">
            <cell-input type="tel" :placeholder="'请输入手机号'" :value.sync="mobile"></cell-input>
      </div>
      <div class="weui_cell">
            <cell-input class="" type="tel" :placeholder="'请输入验证码'" :value.sync="captcha"></cell-input>
            <div class="captcha" @click="send()">{{time==0?'发送验证码':'剩余'+time+'秒'}}</div>
        </div>
    </Dialog>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style>
  .captcha {
    width:300px;
    text-align: right;
  }

  .gray {
    width:300px;
    text-align: right;
  }

</style>
<script>
  import Dialog from './dialog.vue';
  import Cells from './cells.vue';
  import CellInput from './cell-input.vue';
  import Toast from './toast.vue';
  import { POST, GET,AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
export default {
  components: {
    Toast,Dialog,CellInput
  },
  data() {
      return {
        mobile:"",
        captcha:"",
        timer:null,
        time:60
      }
  },
  methods: {
      send:function () {
         var _this = this;
         if (utils.isNull(this.mobile)) {
           _this.$refs.toast.show("请输入手机号");
         }
         if (this.mobile.length!=11) {
           _this.$refs.toast.show("无效手机号");
         }
        GET("weex/common/public_key.jhtml").then(
          function (data) {
             POST("website/login/send_mobile.jhtml?mobile="+utils.encrypt(_this.mobile,data.data)).then(
                 function (res) {
                   _this.beginTimer();
                 },
                 function (err) {
                   _this.$refs.toast.show(res.content);
                 }

             )
          },
          function (err) {
            _this.$refs.toast.show("加密失败");
          }
        )
      },
      beginTimer:function () {
          var _this = this;
         if (this.timer!=null) {
             clearTimeout(this.timer);
             this.timer = null;
         }
         this.time = 60;
         timer = setTimeout(
             function () {
               _this.time=_this.time + 1;
             }
             ,1000
         )

      },
      endTimer:function () {

      },
      close:function () {

      },
      login:function () {

      }
  }
}
</script>
