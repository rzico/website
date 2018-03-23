<template>
  <!--文章优惠券列表-->
  <div class="background" v-if="lists.length > 0">
    <div class="top" v-for="num in lists" v-if="num.type != 'exchange' ">
      <div class="flex-r" style="height: 60px;border-width: 0 0 1px 0;border-color: #cccccc;border-style: dashed;padding-right: 10px">
        <span class="f30 color flex2">{{num.amount}}</span>
        <span class="f16 flex3_5">{{num.name}}</span>
        <div class="button flex1_5" @click="jump(num.id)">
          <span class="f14" style="color:#ffffff">去领取</span>
        </div>
      </div>
      <div class="flex-r" style="height: 40px;">
        <span class="f12 color  flex2">优惠券</span>
        <div  class="flex5" style="display: flex;display: -webkit-flex;flex-direction: row;align-items: center;">
          <span class="f12" style="color: #cccccc">{{num.beginDate |timeDatefmt}}</span>
          <span class="f12" style="color: #cccccc">至</span>
          <span class="f12" style="color: #cccccc">{{num.endDate |timeDatefmt}}</span>
        </div>
      </div>
      <!--两个小半圆-->
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<style scoped>
  .background{
    background-color: #29829E;
    padding:10px;
    box-sizing: border-box;
    margin-right: 23px;
    margin-left: 23px;
  }
  .top{
    position: relative;
    background-color: white;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    border-radius: 3px;
  }
  .left{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #29829E;
    position: absolute;
    top: 55px;
    left: -5px;
  }
  .right{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #29829E;
    position: absolute;
    top: 55px;
    right: -5px;
  }
  .f30{
    font-size: 30px;
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
  flex1_5{
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
  .flex-r{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
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
  import { POST, GET, AUTH} from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
  import Toast from '../../../widget/toast.vue';
  export default {
    data () {
      return {
        lists:[],
      }
    },
    components: {
      Toast
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      },
      logoImg:function(value) {
        if (utils.isNull(value)) {
          return "";
        } else {
          return utils.thumbnail(value,utils.screenWidth(),150,150);
        }
      }
    },
    props: {
      article: { default: function () {}}
    },
    mounted () {

    },
    methods:{

      open:function (id) {
        let _this =this;
        GET("website/coupon/list.jhtml?authorId="+id).then(
          function (res) {
            if (res.type=='success') {
              _this.lists = res.data.data;
            }
          },
          function (err) {
          }
        )
      },
      jump:function(numid) {
        this.$router.push({name:"activate",query:{id:numid}});
      }
    }
  }
</script>
