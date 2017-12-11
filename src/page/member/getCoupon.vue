<template>
  <div class="bg" >
    <div class="insone">
      <div class="headlogo">
        <image/>
      </div>
      <text class="f32 martop80">由支付宝提供</text>
      <text class="f60 martop20">满100减5元</text>
      <div class="getClick martop30" @click="" >
        <text class="f40" style="color: white">点击领取</text>
      </div>
      <text class="martop80 f28" style="color: #888">有效期2017-02-07至2017-03-03</text>
      <!--左右两边的半圆-->
      <div class="mindiv"></div>
      <div class="mindivtwo"></div>
    </div>
    <div class="instwo">
      <!--左右两边的半圆-->
      <div class="bottommindiv"></div>
      <div class="bottommindivtwo"></div>
      <text class="f32">使用说明</text>
      <i class="iconfont icon-xiajiantou"></i>
    </div>
    <div>{{test}}</div>
  </div>
</template>
<style>
   .bg{
    background-color:#E64340;
  }
   .headlogo{
    height: 120px;
    width: 120px;
    background-color: #cccccc;
    border-radius: 60px;
    position: absolute;
     top: -60px;
     left: 295px;
  }
  .insone{
    background-color: white;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 120px;
    height: 500px;
    align-items: center;
    border-style:dashed;
    border-bottom-width: 2px;
    border-color: #cccccc;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .instwo{
    background-color:white;
    height: 120px;
    justify-content: center;
    padding-left: 30px;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .mindiv{
    background-color:#E64340;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    position: absolute;
    left: -10px;
    bottom: -10px;
  }
   .mindivtwo{
     background-color:#E64340;
     height: 20px;
     width: 20px;
     border-radius: 10px;
     position: absolute;
     right: -10px;
     bottom: -10px;
   }
   .bottommindiv{
     background-color:#E64340;
     height: 20px;
     width: 20px;
     border-radius: 10px;
     position: absolute;
     left: -10px;
     top: -10px;
   }
   .bottommindivtwo{
     background-color:#E64340;
     height: 20px;
     width: 20px;
     border-radius: 10px;
     position: absolute;
     right: -10px;
     top: -10px;
   }
   .f28{
    font-size: 28px;
  }
   .f32{
    font-size: 32px;
  }
   .f60{
     font-size: 60px;
   }
   .f40{
     font-size: 40px;
   }
  .martop80{
    margin-top: 80px;
  }
  .martop20{
    margin-top: 20px;
  }
  .martop30{
    margin-top: 30px;
  }
  .getClick{
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 80px;
    background-color:#E64340;
    border-radius: 10px;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
        couponId:'28',
        test:'111'
      }
    },
    components: {
      Toast
    },
    created() {
      this.open();
    },
    methods:{
      open:function () {
        let _this =this;
        this.test = _this.couponId;
        alert('111')
        GET("website/member/coupon/view.jhtml?id="+_this.couponId).then(
          function (res) {
            this.test =res;
            if (res.type=='success') {
            }
          },
          function (err) {

          }
        )
      },
      pick:function () {
        let _this =this;
        POST('website/member/coupon/activate.jhtml?id='+_this.couponId).then(
          function (data) {
            this.test = 222;
            if (data.type=="success") {

            } else {
            }
          },
          function (err) {

          }
        )
      }
    }
  }
</script>
