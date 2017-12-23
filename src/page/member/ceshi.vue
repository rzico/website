<template>
  <div class="backgc">
    <div class="insOne" v-for="c in cards">
      <div class="bgflex">
        <div class="logo">
          <img class="stroeLogo" :src="c.logo">
        </div>
      </div>
      <span class="f18 martop50">NO.{{c.code | codefmt}}</span>
      <span class="martop40 f30" style="color: #EB4E40">{{c.balance}}</span>
      <span class="martop30 f14 fontColor888">消费记录 | 我的赏金</span>
    </div>
    <div class="instwo" v-if="isPopup">
      <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"></div>
      <span class="marbot15 f14">使用时，出示此码</span>
    </div>
    <div class="insthree">
      <div class="codeDiv" ></div>
      <div class="zezhu">
        <i class="iconfont icon-erweima" style="font-size: 30px;position: absolute;top: -10px;" @click="iscontrol()"></i>
      </div>
      <div class="couponDiv"><couponList></couponList></div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .backgc{
    background-color:#EB4E40;
    width: 100%;
    height: 290px;
    position: absolute;
  }
  .bgflex{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .logo{
    height: 60px;
    width: 60px;
    background-color: #cccccc;
    border-radius: 30px;
    position: absolute;
    top: -30px;
  }
  .stroeLogo{
    height: 60px;
    width: 60px;
    border-radius: 30px;
  }
  .insOne{
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
    border-top: 1px;
    border-left: 1px;
    border-right: 1px;
    border-bottom: 0;
    border-color: #cccccc;
    border-style: solid;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }
  .insthree{
    /*height: 300px;*/
    background-color: white;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 5px;
    border-width: 1px;
    border-color: #cccccc;
    border-style: solid;
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
    border-style: solid;
    position: absolute;
    top: -15px;
  }
  .zezhu{
    width: 200px;
    height: 45px;
    margin-bottom: 55px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background-color: #ffffff;
    position: absolute;
    top:0
  }
  .couponDiv{
    margin-top: 45px;
    margin-right: 30px;
    margin-left: 30px;
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
  import couponList from './couponList.vue';
  export default {
    data () {
      return {
        cards:[],
        id:'',
        code:'',
        isPopup:false
      }
    },
    components: {
      Toast,couponList
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
//      控制二维码是否渲染
      iscontrol:function () {
          this.isPopup = !this.isPopup;
      },
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
