<template>
  <div class="bg"  v-if="hasCoupon()">
    <div class="top marbottom15" v-for="c in coupons">
      <div class="flex-r" style="height: 60px;border-width: 0 0 1px 0;border-color: #cccccc;border-style: dashed;padding-right: 10px">
        <span class="f30 color flex2" style="">{{c.amount}}</span>
        <span class="f16 flex3_5 " >{{c.couponName}}</span>
        <div class="button flex1_5" @click="openCoupon(c.id)">
          <span class="f14" style="color:#ffffff">去使用</span>
        </div>
      </div>
      <div class="flex-r" style="height: 40px;padding-right: 20px">
        <span class="f12 color flex2 ">优惠券</span>
        <span class="f12 flex5 " style="color: #cccccc">{{c.descr}}</span>
      </div>
      <!--两个小半圆-->
      <div class="left"></div>
      <div class="right"></div>
    </div>
    </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
    width: 100%;
    padding-top: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .top{
    position: relative;
    background-color: white;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    border-radius: 3px;
  }
  .left{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    top: 55px;
    left: -5px;
  }
  .right{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    top: 55px;
    right: -5px;
  }
  .f30{
    font-size: 30px;
  }
  .f18{
    font-size: 18px;
  }
  .f16{
    font-size: 16px;
  }
  .f14{
    font-size: 14px;
  }
  .f12{
    font-size: 12px;
  }
  .flex-r{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
  .flex1_5{
    display: flex;
    display: -webkit-flex;
    flex: 1.5;
    justify-content:center;
  }
  .flex2{
    display: flex;
    display: -webkit-flex;
    flex: 2;
    justify-content: center;
  }
  .flex5{
    display: flex;
    display: -webkit-flex;
    flex: 5;
  }
  .flex3_5{
    display: flex;
    display: -webkit-flex;
    flex: 3.5;
  }
  .marbottom15{
    margin-bottom: 15px;
  }
  .button{
    padding-left: 5px;
    padding-right: 5px;
    background-color:#EB4E40;
    border-radius: 3px;
  }
  .color{
    color:#EB4E40
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        coupons:[]
      }
    },
    components: {
      Toast,
    },
    created() {
      this.load();
    },
    methods:{
      hasCoupon:function () {
        return this.coupons.length>0;
      },
      load:function () {
        var _this = this;
        GET("website/member/couponCode/list.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.coupons = res.data;
            }
          },
          function (err) {

          }
        )
      },
      openCoupon:function(cid) {
        this.$router.push({name:"coupon",query:{id:cid}});
      }
    }
  }
</script>
