<template>
  <div class="container">
    <div class="page slideIn backgc" @scroll="onscroll" offset-accuracy="0">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
        <div class="insOne">
            <div class="logo">
              <img class="stroeLogo" :src="card.logo | logoImg">
            </div>
          <span class="f14">{{card.name}}</span>
          <span class="f18 martop15">NO.{{card.code | codefmt}}</span>
          <span class="martop10 f30" style="color: #EB4E40">{{card.balance}}</span>
        </div>
        <div class="insthree">
          <div class="codeDiv" ></div>
          <div class="zezhu" @click="goC1001()">
            <i class="iconfont icon-dianpu" style="font-size: 30px;color: white;line-height: 30px"></i>
            <span class=" f14" style="color: white;line-height: 16px">进入芸店</span>
          </div>
          <div class="couponDiv">
            <div class="instwo">
              <div class="qrcode" :style="'background-image: url(http://pan.baidu.com/share/qrcode?w=200&h=200&url='+payCode+')'"></div>
              <span class="marbot15 f14">使用时，出示此码</span>
            </div>
          </div>
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
    position: relative;
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
    height: 180px;
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
  .codeDiv{
    height: 60px;
    width: 60px;
    background-color: #EB4E40;
    border-radius: 30px;
    position: relative;
    top: -15px;
  }
  .zezhu{
    width: 200px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EB4E40;
    position: relative;
    top:-60px
  }
  .couponDiv{
    position: relative;
    top:-30px;
  }
  .f14{
    font-size: 14px;
  }
  .f30{
    font-size: 30px;
  }
  .f18{
    font-size: 18px;
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
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  export default {
    data () {
      return {
        card:{id:0,status:'none',name:"样例",logo:"./static/logo.png",background:"./static/card.png",color:"c8",balance:0,code:"8800000000000000"},
        cardId:'',
        payCode:'',
        topicId:''
      }
    },
    components: {
      Toast,
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

      goC1001:function () {
        this.$router.push({name:"c1001",query:{id:this.topicId}});
      },
      load:function () {
        var _this = this;
        GET("website/member/card/bkg.jhtml?cardId="+_this.cardId).then(
          function (res) {
            if (res.type=='success') {
              _this.card = res.data.card;
              _this.payCode = res.data.payCode;
              _this.topicId = res.data.topicId
            }
          },function (err) {

          }
        )
      },
    }
  }
</script>
