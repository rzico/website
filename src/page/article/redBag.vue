<template>
  <div class="redBag">
    <transition name="fade">
      <div class="moneyBox" @click="closeRedBag()" v-if="showMoneyBox">
        <div class="moneyInfoBox" >
          <div class="redBagHead"></div>
          <img :src="article.member.logo" alt="" />
          <p>{{article.author}}的红包
            <span class="pinIcon" v-if="article.articleRedPackage.redPackageType == 'RAN'" :style="{fontFamily:'iconfont'}">&#xe769;</span>
          </p>
          <p>恭喜发财,大吉大利</p>
          <p>
            <span class="moneyNum">{{priceNum}}</span>元
          </p>
          <p @click="download()">
            已存入魔篇钱包,可前往魔篇提现</p>
        </div>
      </div>
    </transition>
    <div class="redBagImg" @click="takeRedBag" :class="isShareTime ? 'hasShareImg' : ''"  v-if="showRedBag">
      <!--<span>转发该文章到微信朋友圈后可抢红包</span>-->
    </div>
  </div>
</template>
<style>
  .bouncein {
    animation: bouncein 1.8s both;
  }
  .rollout {
    animation: rollout 1.8s  both;
  }
  /*@keyframes bouncein{*/
  /*form{*/
  /*transform:scale(1.5);*/
  /*}*/
  /*to{*/
  /*transform:scale(1);*/
  /*}*/
  /*}*/

  /*@keyframes rollout{*/
  /*form{*/
  /*transform:scale(1);*/
  /*}*/
  /*to{*/
  /*transform:scale(0.1);*/
  /*}*/
  /*}*/

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .t1005 .redBagImg{
    height: 135px !important;
    margin: 0 23px !important;
  }


  .pinIcon{
    color: coral;
    font-size: 16px;
  }

  .redBagHead{
    width:100%;
    height:100px;
    position: absolute;
    /*border-bottom-left-radius: 150px;*/
    /*border-bottom-right-radius: 150px;*/
    border-radius: 40% /  0 0 100% 100%;
    top: 0;
    background-color: #D34E38;
    z-index: -1;
  }

  .moneyBox .moneyInfoBox img{
    z-index: 2;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid coral;
  }

  .moneyBox{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
    color: #000;
  }

  .moneyInfoBox :nth-child(3){
    font-weight: 800;
    font-size: 16px;
    margin: 20px 0;
  }

  .moneyInfoBox :nth-child(4){
    font-size: 14px;
  }

  .moneyInfoBox :nth-child(5){
    margin: 20px 0;
  }

  .moneyInfoBox .moneyNum{
    font-size: 33px;
    font-weight: 600;
  }

  .moneyInfoBox :nth-child(6){
    font-size: 14px;
    color: #6F87B8;
  }

  .moneyInfoBox {
    position: fixed;
    z-index: 2000000000;
    width: 250px;
    min-height: 350px;
    top: 180px;
    left: 50%;
    background-color: #EFEFEF;
    margin-left: -125px;
    text-align: center;
    border-radius: 5px;
    padding:70px 0 25px  0;
  }

  .redBagImg{
    background-image: url("../../../static/closeRedBag.png");
    background-size: 100% 100%;
    height: 160px;
    padding:0 15px;
    border-bottom: 8px solid #f5f6f9;
  }

  .hasShareImg{
    background-image: url("../../../static/openRedBag.png");
  }
</style>
<script>
  import utils from '../../assets/utils.js';
  import { POST,GET,AUTH,SHARE ,getShowTimeLine,setShowTimeLine,setShowTimeLineTrue} from '../../assets/fetch.js';
  export default {
    data(){
      return{
        isShareTime:false,
        showRedBag:false,
        showMoneyBox:false,
        priceNum:0
      }
    },
    props: {
      article: {
        default:function () {
          return 0;
        }
      }
    },
    created(){
      let _this = this;
      setShowTimeLine();
      setTimeout(function () {
        if(!utils.isNull(_this.article.articleRedPackage.pay) && _this.article.articleRedPackage.pay){
          _this.showRedBag = true;
        }else {
          _this.showRedBag = false;
        }
      },4500)
    },
    methods:{
      takeRedBag:function () {
        let _this = this;
        if(utils.isweex()){
          if(utils.isIos()){
            _this.$emit("notify",utils.message("error","ios系统请分享到微信进行领取",''));
            return;
          }
          location.href =  'mopian://redBag?type=' + _this.article.articleRedPackage.redPackageType;
//          this.$refs.toast.show('请分享到微信进行购买');
          return;
        }else if(getShowTimeLine()){
          POST("weex/member/article/getRedPackage.jhtml?articleId=" + this.article.id).then(
            function (res) {
              if (res.type=='success') {
                _this.priceNum = res.data;
                _this.isShareTime = true;
                _this.showMoneyBox = true;
              }else{
                _this.$emit("notify",res);
              }
            },
            function (err) {
              _this.$emit("notify",err);
            }
          )
        }else{
          alert('通过右上角转发该文章到朋友圈后即可抢红包');
        }
      },
      download:function () {
//        AUTH(utils.getConfig().appUrl,function (authed) {
//            if (authed) {
                location.href = utils.getConfig().appUrl;
//            }
//          }
//        )
      },
      closeRedBag:function () {
        this.showMoneyBox =  false;
      },
    }
  }
</script>

