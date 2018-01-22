<template>
  <div class="container">
    <div class="page slideIn backgc" @scroll="onscroll" offset-accuracy="0">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
        <div class="insOne">
          <div class="bgflex">
            <div class="logo">
              <img class="stroeLogo" :src="card.logo | logoImg">
            </div>
          </div>
          <span class="f14 martop30">{{card.name}}</span>
          <span class="f18 martop15">NO.{{card.code | codefmt}}</span>
          <span class="martop10 f30" style="color: #EB4E40">{{card.balance}}</span>
          <div class="martop10">
            <span class=" f14 fontColor888" @click="jumpdeposit(card.id)">我的账单 | </span><span class=" f14 fontColor888" @click="jumpreward()">我的奖金</span>
          </div>
        </div>
        <div class="insthree">
          <div class="codeDiv" ></div>
          <div class="zezhu">
            <i class="iconfont icon-erweima" style="font-size: 30px;position: absolute;top: -10px;" @click="iscontrol()" v-show="!isPopup"></i>
            <i class="iconfont icon-youhuiquan-copy" style="font-size: 30px;position: absolute;top: -10px;" @click="iscontrol()" v-show="isPopup"></i>
          </div>
          <div class="couponDiv">
            <div class="instwo" v-if="isPopup">
              <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"></div>
              <span class="marbot15 f14">使用时，出示此码</span>
            </div>
          </div>
        </div>
        <div class="insfour" v-show="!isPopup">
          <couponList></couponList>
        </div>
      </v-loadmore>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .backgc{
    background-color:#EB4E40;
    width: 100%;
    position: absolute;
    top:0;
    bottom: 0;
  }
  .bgflex{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .logo{
    height: 40px;
    width: 40px;
    background-color: #cccccc;
    border-radius: 20px;
    position: absolute;
    top: -20px;
  }
  .stroeLogo{
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }
  .insOne{
    background-color: white;
    margin-right: 30px;
    margin-left: 30px;
    margin-top: 40px;
    height: 210px;
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
    background-color: #EB4E40;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }
  .insthree{
    /*height: 300px;*/
    background-color: #EB4E40;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .insfour{
    margin-left: 30px;
    margin-right: 30px;
    min-height:400px;
    background-color:#eeeeee;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

  }
  .codeDiv{
    height: 60px;
    width: 60px;
    background-color: #EB4E40;
    border-radius: 30px;
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
    background-color: #EB4E40;
    position: absolute;
    top:0
  }
  .couponDiv{
    margin-top: 45px;
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
  .martop25{
    margin-top: 25px;
  }
  .martop20{
    margin-top: 20px;
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
  import {Loadmore} from 'mint-ui';
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  import couponList from './coupon/couponList.vue';
  export default {
    data () {
      return {
        card:{id:0,status:'none',name:"样例",logo:"./static/logo.png",background:"./static/card.png",color:"c8",balance:0,code:"8800000000000000"},
        cardId:'',
        isPopup:true,
        payCode:''
      }
    },
    components: {
      Toast,
      couponList,
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    },
    filters: {
      codefmt:function (val) {
        if (utils.isNull(val)) {
          return val;
        } else  {
          return val.substr(0,11)+"  "+val.substr(11);
        }
      },
      logoImg:function(value) {
        if (utils.isNull(value)) {
          return "";
        } else {
          return utils.thumbnail(value,utils.screenWidth(),40,40);
        }
      }
    },
    created() {
      var _this = this;
      AUTH(location.href,function (authed) {
        _this.logined  = authed;
      })
      _this.cardId = utils.getUrlParameter("card_id");
      this.load()
    },
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
          this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重n新定位
      },
      loadBottom:function() {
          this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      onscroll(e){
        if(e.target.scrollTop >= 180){
          this.isfixed = true;
        }else{
          this.isfixed = false;
        }
      },

//      控制二维码是否渲染

      iscontrol:function () {
        this.isPopup = !this.isPopup;
      },

      load:function () {
        var _this = this;
        GET("website/member/card/bkg.jhtml?cardId="+_this.cardId).then(
          function (res) {
            if (res.type=='success') {
              _this.card = res.data.card;
              _this.payCode = res.data.payCode;
              _this.isPopup = true;
            }
          },function (err) {

          }
        )
      },

      jumpreward:function() {
      this.$router.push({name:"rebate",query:{}});
      },

      jumpdeposit:function(id) {
      this.$router.push({name:"bill",query:{"id":id}});
      },
    }
  }
</script>
