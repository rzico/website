<template>
  <div class="container">
    <div class="page slideIn topic" style="background-color: #eeeeee">
      <metaInfo :member="member" :isFixed = "isfixed"></metaInfo>
      <div class="imgDiv">
          <img class="img" :src="'../../../static/download.jpg'" @click="godownload()">
      </div>
        <div class="containsOne">
        <div class="address" @click="jumpAddress">
          <div>
          <i class="iconfont icon-shouhuodizhi" style="color:#888888;font-size: 18px"></i>
            <span class="font-size16">收货地址</span>
          </div>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
        </div>
        </div>
      <div class="containsTwo">
        <div class="reward" @click="jumpReward">
          <div>
          <i class="iconfont icon-shangjin" style="color:#888888;font-size: 18px"></i>
          <span class="font-size16">我的奖励金</span>
          </div>
          <div>
            <span class="font-size16" v-if="rebateControl">{{rebate}}元</span>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
          </div>
        </div>
        <div class="coupon" @click="jumpCoupon">
          <div>
          <i class="iconfont icon-youhuiquan" style="color:#888888;font-size: 18px"></i>
          <span class="font-size16">我的优惠券</span>
          </div>
          <div>
            <span class="font-size16" v-if="couponControl">{{coupon}}张</span>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
          </div>
        </div>
        </div>
      <div style="min-height: 200px"></div>
    </div>
    <Tabbar id=2></Tabbar>
  </div>
</template>
<style scoped>
  .imgDiv{
    height:122.59px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .img{
    width: 100%;
    height: 100%;
  }
  .containsOne{
    padding-left: 10px;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .containsTwo{
    margin-top:20px;
    padding-left: 10px;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .font-size16{
    padding-left: 2px;
    font-size: 16px;
  }
  .containsOne .address{
    height: 45px;
    background-color: white;
    padding-right: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .containsTwo .reward{
    height: 45px;
    background-color: white;
    border-width: 0 0 1px 0;
    border-color: #eee;
    border-style: solid;
    padding-right: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .containsTwo .coupon{
    height: 45px;
    background-color: white;
    padding-right: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import metaInfo from './meta.vue';
  import Tabbar from '../../widget/tabbar-whole.vue';
  export default {
    data() {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        member:{},
        isfixed:false,
        id:'',
//        优惠券数量
        coupon:'',
//        奖励金额度
        rebate:'',
//        控制优惠卷数量是否渲染
        couponControl:false,
//        控制奖励金额度是否渲染
        rebateControl:false,

      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      metaInfo,
      Tabbar
    },

    created() {
      var _this = this;
      AUTH(location.href,function (authed) {
         _this.load();
         _this.open();
      })
    },
    methods:{
      godownload:function () {
        this.$router.push({name:"index",query:{}});
      },
      jumpAddress:function() {
        this.$router.push({name:"addressList",query:{}});
      },
      jumpReward:function() {
        this.$router.push({name:"rebate",query:{}});
      },
      jumpCoupon:function() {
        this.$router.push({name:"memberCoupon",query:{}});
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
    }
  }

</script>
