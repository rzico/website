<template>
  <div class="bgc" >
    <div class="insone">
      <div class="bg">
        <div class="headlogo">
          <img class="shopLogo" :src="logo">
        </div>
      </div>
      <span class="f16 martop40">由{{shopName}}提供</span>
      <span class="f30 martop10">{{name}}</span>
      <div class="getClick martop15" @click="pick" >
        <span class="f18" style="color: white">点击领取</span>
      </div>
      <span class="martop30 f14" style="color: #888">有效期{{beginDate | timeDatefmt}}至{{endDate | timeDatefmt}}</span>
      <!--左右两边的半圆-->
      <div class="rightmindiv"></div>
      <div class="leftmindiv"></div>
    </div>
    <div class="instwo">
      <div class="flex-be martop15 marbot15" @click="control">
      <span class="f16">使用说明</span>
      <i class="iconfont icon-xiajiantou f16"></i>
      </div>
      <div class="marbot15" v-if="isPopup">
        <li class="f14 fontColor888">此优惠券仅限本店使用</li>
        <li class="f14 fontColor888">请在有效期内使用,逾期作废</li>
        <li class="f14 fontColor888">不可售与他人</li>
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
     top:0;
     bottom:0;
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
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 80px;
    height: 250px;
    align-items: center;
    border-bottom:1px dashed;
    border-color: #cccccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    position: relative;
  }
  .instwo{
    background-color:white;
    /*height: 160px;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    display: -webkit-flex;
  }
  .rightmindiv{
    background-color:#EB4E40;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    position: absolute;
    bottom: -5px;
    right: -5px;
  }
   .leftmindiv{
     background-color:#EB4E40;
     height: 10px;
     width: 10px;
     border-radius: 5px;
     position: absolute;
     bottom: -5px;
     left: -5px;
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
  .getClick{
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    background-color:#EB4E40;
    border-radius: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }
  .flex-be{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
        couponId:'',
        logo:'',
        name:'',
        shopName:'',
        beginDate:'',
        endDate:'',
        isPopup:false
      }
    },
    components: {
      Toast
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      }
    },
    created() {
      this.couponId = utils.getUrlParameter('id');
      this.open();

    },
    methods:{
//      控制使用说明是否渲染
      control:function () {
        if (this.isPopup==false) {
          this.isPopup = true;
        }
      },
      open:function () {
        let _this =this;
        GET("website/coupon/view.jhtml?id="+_this.couponId).then(
          function (res) {
            if (res.type=='success') {
              _this.logo = res.data.logo;
              _this.name = res.data.name;
              _this.beginDate = res.data.beginDate;
              _this.endDate = res.data.endDate;
              _this.shopName =res.data.shopName;
            }
          },
          function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
      pick:function () {
        let _this =this;
        POST('website/member/coupon/activate.jhtml?id='+_this.couponId).then(
          function (data) {
            if (data.type=="success") {
              _this.$refs.toast.show(data.content);
              _this.$router.go(-1)
            } else {
              _this.$refs.toast.show(data.content);
              _this.$router.go(-1)
            }
          },
          function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
    }
  }
</script>
