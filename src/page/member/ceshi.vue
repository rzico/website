<template>
  <div class="bgc" >
    <div class="insone" v-for="c in cards">
      <div class="bg">
        <div class="headlogo">
          <img class="shopLogo" :src="c.logo">
        </div>
      </div>
      <span class="f18 martop50">NO.{{c.code | codefmt}}</span>
      <span class="martop40 f30" style="color: #EB4E40">{{c.balance}}</span>
      <span class="martop30 f14" style="color: #888">消费记录 | 我的赏金</span>
    </div>
    <div class="instwo">
      <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"></div>
      <span class="marbot15 f14">使用时，出示此码</span>
    </div>
    <div class="insthree">
      <div class="codeDiv">
        <div class=""></div>
        <i class="iconfont icon-erweima erweima"></i>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style>
  .bgc{
    background-color:#EB4E40;
    width: 100%;
    position: absolute;
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
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 40px;
    height: 250px;
    align-items: center;
    border-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    position: relative;
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
  .instwo{
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }
  .insthree{
    height: 300px;
    background-color: white;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 5px;
    border-width: 1px;
    border-color: #cccccc;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .codeDiv{
    height: 60px;
    width: 60px;
    background-color: white;
    border-radius: 30px;
    border-width: 1px;
    border-color: #cccccc;
    position: absolute;
    top: -10px;
  }
  .f14{
    font-size: 14px;
  }
  .f16{
    font-size: 16px;
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
  .martop50{
    margin-top: 50px;
  }
  .martop30{
    margin-top: 30px;
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
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
        cards:[],
        id:'',
        code:''
      }
    },
    components: {
      Toast
    },
    filters: {
      codefmt:function (val) {
        if (utils.isNull(val)) {
          return val;
        } else  {
          return val.substr(0,11)+"  "+val.substr(11);
        }
      }
    },
    created() {
      this.open();
      this.load()
    },
    methods:{
//      控制使用说明是否渲染
//      control:function () {
//        if (this.isPopup==false) {
//          this.isPopup = true;
//        }
//      },
      open:function () {
        var _this = this;
        GET("website/member/card/list.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.cards = res.data;
              _this.id = res.data.id
            }
          },
          function (err) {
          }
        )
      },
      load:function () {
        var _this = this;
        GET("website/member/card/view.jhtml?id="+_this.id+"&code="+_this.code).then(
          function (res) {
            if (res.type=='success') {
              _this.payCode = res.data.payCode;
            } else {

            }
          },function (err) {

          }
        )
      },
    }
  }
</script>
