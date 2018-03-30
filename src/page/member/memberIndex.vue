<template>
  <div class="container">
    <div class="page slideIn topic" style="background-color: #eeeeee;padding-bottom: 50px">
      <metaInfo :member="member" :isFixed = "isfixed" v-if="status != 'activate'"></metaInfo>
      <div class="redBG" v-if="status == 'activate'">
        <div class="baozhu">
        <div class="vipDiv">
        </div>
          <!--<div class="setting">-->
            <!--<i class="iconfont icon-shezhi bigIcon"></i>-->
          <!--</div>-->
          <div class="code">
            <div class="iconfontDiv" @click="isqrcode()"><i class="iconfont icon-erweima " style="font-size: 35px"></i></div>
          </div>
          <div class="floating">
          <div class="bodyInfo">
            <img class="logo" :src="cardInfo.logo"/>
            <span class="name">{{cardInfo.name}}</span>
            <div class="typeDiv">{{cardInfo.type | watchType}}</div>
            <div :class="[vipClass(cardInfo.vip)]" >{{cardInfo.vip | watchVip}}</div>
          </div>
            <span class="money">{{cardInfo.balance}} ¥</span>
            <span style="font-size: 14px;color: white">积分</span>
            <div class="cardNo">
              <span class="" style="font-size: 16px;color: white">{{cardInfo.point}}</span>
              <span class="" style="font-size: 16px;color: white">NO.{{cardInfo.code | watchCode}}</span>
            </div>
            <span class="" style="font-size: 12px;color: #888;margin-top:10px">支付-营销-场景化</span>
          </div>
        </div>
      </div>
      <div class="whiteBG" v-if="status == 'activate'">
        <span class="qrcodeMes"  v-if="qrcodeImg">使用或付款时出示此码</span>
        <img class="qrcodeImg" :src="qrcode" v-if="qrcodeImg"/>
        <div class="qrcodeButtonDiv" v-if="qrcodeImg">
        <div class="qrcodeButton" @click="goBill()">消费账单</div>
        <div class="qrcodeButton" @click="gopointBill()">积分账单</div>
        </div>
      </div>
      <div class="navbar">
        <div class="table1" @click="hasCoupon()" :class="[isbg1 == 1 ? 'bacgeee' : '']">卡包</div>
        <div class="table2" @click="haspromote()" :class="[isbg2 == 1 ? 'bacgeee' : '']">推广</div>
      </div>
      <coupon v-if="isCoupon"></coupon>
      <promote v-if="isPromote" :id="id"></promote>
    </div>
    <Tabbar id=2></Tabbar>
  </div>
</template>
<style scoped>
  .iconfontDiv{
    height: 30px;
    width: 30px;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .floating{
    height:187.5px;width: 100%;position: absolute;padding-left: 10px;box-sizing: border-box;
    display: flex;
    flex-direction: column;

  }
  .redBG{
    background-color: #EB4E40;
    width: 100%;
    height:187.5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .whiteBG{
    background-color: white;
    min-height:50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .baozhu{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top:30px;
  }
  .vipDiv{
    height:187.5px;
    width: 100%;
    /*margin-right: 20px;*/
    /*margin-left:20px;*/
    /*box-sizing: border-box;*/
    background-image: url("http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/background.png");
    background-size: 100% 100%;
    /*background-color: black;*/
    opacity: 0.4;
    box-shadow:0 0  2px 2px #fff;
    border-radius: 10px;
    position: absolute;
  }
  .setting{
    height: 25px;
    width: 25px;
    border-radius: 100%;
    background-color: #EB4E40;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
  }
  .bigIcon{
    font-size: 20px;
    color: white;
  }
  .code{
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 100%;
    position: fixed;
    top:198px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .codeTwo{
    height: 40px;
    width: 40px;
    border-radius: 100%;
    position: fixed;
    top:198px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }
  .bodyInfo{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }
  .logo{
    width:30px;
    height: 30px;
    border-radius: 100%;
    background-color: #cccccc;
    margin-right: 10px;
  }
  .name{
    font-size: 16px;
    color: white;
    margin-right: 10px;
  }
  .money{
    height: 70px;
    width: 100%;
    font-size: 30px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .cardNo{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .typeDiv{
    height: 20px;
    padding: 0 5px;
    background-color: #EB4E40;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .vip1 {
    height: 20px;
    padding: 0 5px;
    background-color: silver;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 3px;
  }
  .vip2 {
    height: 20px;
    padding: 0 5px;
    background-color: gold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 3px;
  }
  .vip3 {
    height: 20px;
    padding: 0 5px;
    background-color: #6EBCE9;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 14px;
    border-radius: 3px;
  }
  .qrcodeImg{
    height: 200px;
    width: 200px;
    margin-top: 10px;
  }
  .qrcodeMes{
    font-size: 16px;
    margin-top: 70px;
    color: #888;
  }
  .qrcodeButtonDiv{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .qrcodeButton{
    font-size: 14px;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EB4E40;
    border-radius: 10px;
    padding: 0 5px;
  }
  .navbar{
    height: 40px;
    width: 100%;
    background-color: white;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .table1{
    height: 40px;
    width: 50%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .bacgeee{
    background-color: #eeeeee !important;
  }
  .table2{
    height: 40px;
    width: 50%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import metaInfo from './meta.vue';
  import coupon from './coupon.vue';
  import promote from './promote.vue';
  import Tabbar from '../../widget/tabbar-whole.vue';
  export default {
    data() {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        member:{},
        isfixed:false,
        id:'',
        cardInfo:[],
        qrcode:'',
        qrcodeImg:false,
        isCoupon:true,
        isPromote:false,
//        优惠券数量
        coupon:'',
//        奖励金额度
        rebate:'',
//        控制优惠卷数量是否渲染
        couponControl:false,
//        控制奖励金额度是否渲染
        rebateControl:false,
        isbg1:1,
        isbg2:0,
        status:''

      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      metaInfo,
      Tabbar,
      coupon,
      promote
    },
    filters: {
      watchCode: function (value) {
        return value.substr(-6)
      },
      watchType:function (data) {
        if(data == 'partner'){
          return '股东'
        }else if(data == 'team'){
          return '团队'
        }else{
          return '会员'
        }
      },
      watchVip:function (data) {
        if(data == 'vip3'){
          return '钻石'
        }else if(data == 'vip2'){
          return '金卡'
        }else{
          return '银卡'
        }
      },
    },
    created() {
      var _this = this;
      _this.id = utils.getUrlParameter("id");
      AUTH(location.href,function (authed) {
        _this.load();
        _this.open();
        _this.getCard()
      })
    },
    methods:{
//      消费账单
      goBill:function() {
        this.$router.push({name:"bill",query:{id:this.cardInfo.id}});
      },
//      积分账单
      gopointBill:function() {
        this.$router.push({name:"pointBill",query:{id:this.cardInfo.id}});
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.open('loadTop');
      },
      vipClass:function (v) {
        if (v == 'vip3') {
          return "vip3";
        } else if (v == 'vip2') {
          return "vip2";
        } else {
          return "vip1";
        }
      },
//      控制二维码
      isqrcode:function () {
        this.qrcodeImg = !this.qrcodeImg
      },
//      控制卡包推广切换
      hasCoupon:function () {
        this.isbg1 = 1;
        this.isbg2 = 0;
        this.isPromote = false;
        this.isCoupon = true;
      },
      haspromote:function () {
        this.isbg1 = 0;
        this.isbg2 = 1;
        this.isCoupon = false;
        this.isPromote = true;
      },
      load:function() {
        var _this = this;
        GET('website/member/view.jhtml').then(
          function (response) {
            if (response.type=="success") {
              _this.member = response.data;
              _this.member.logo = utils.thumbnail(_this.member.logo,150,150)
              //设置分享标题
              utils.setConfig({
                title:_this.member.name+"的"+utils.getConfig().siteName+"专栏",
                desc:"超强图文小视频分享社区，中国版Facebook",
                link:location.href,
                thumbnail:_this.member.logo
              });
            } else {
              _this.$refs.toast.show("网络不稳定");

            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
          });
      },
//      获取优惠券赏金总额
      open:function() {
        var _this = this;
        GET('website/member/view.jhtml').then(
          function (mes) {
            if(mes.type == 'success'){
              _this.coupon = mes.data.coupon;
              _this.rebate = mes.data.rebate;
              if(!utils.isNull(mes.data.rebate)){
                _this.rebateControl = true
              }
              if(!utils.isNull(mes.data.coupon)){
                _this.couponControl = true
              }
            }else {

            }
          }, function () {

          });
      },
//      获取会员卡信息
      getCard:function() {
        var _this = this;
        GET('website/member/card/check.jhtml?authorId='+this.id).then(
          function (mes) {
            if(mes.type == 'success'){
              _this.status = mes.data.status;
              _this.cardInfo = mes.data.card;
              _this.qrcode = "http://pan.baidu.com/share/qrcode?w=400&h=400&url="+encodeURI(mes.data.payCode);
            }else {

            }
          }, function () {

          });
      },
    }
  }

</script>
