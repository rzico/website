<template>
  <div class="bg"  v-if="hasCoupon()">
    <div  v-for="c in coupons" >
    <div class="top">
      <div class="flex-c marleft20 ">
        <span class="f30 color">10</span>
        <span class="f12 color marbottom15">优惠券</span>
      </div>
      <div class="flex-c marleft30">
        <span class="f16">{{c.couponName}}</span>
        <span class="f12" style="color: #cccccc">{{c.descr}}</span>
      </div>
      <div class="button marleft20" @click="openCoupon(c.id)">
        <span class="f14" style="color:#ffffff">去使用</span>
      </div>
      <!--两个小半圆-->
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <div class="bottom marbottom15">
      <span class=""></span>
    </div>
    </div>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
    width: 100%;
    padding-top: 10px;

  }
  .top{
    position: relative;
    background-color: white;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .bottom{
    background-color: #dddddd;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .left{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    bottom: -5px;
    left: -5px;
  }
  .right{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    bottom: -5px;
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
  .flex-c{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .marleft30{
    margin-left: 30px;
  }
  .marleft20{
    margin-left: 20px;
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
