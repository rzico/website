<template>
  <div class="page" style="background-color: #eee">
        <div class="header ">
          <p class=" titleColor">订单编号: 64805405523</p>
          <p class=" mt5 titleColor">国内承运人: 京东快递</p>
          <p class=" mt5 titleColor">预计送达: 11月13日</p>
        </div>
      <div class="logisticsBox" v-for="(item,index) in logisticsList">
        <div>
          <div class="outsideBox boderLeft">
            <div class="infoLine " :class="[index != logisticsList.length - 1 ? 'boderBottom' : '']">
              <p :class="[item.isDone ? 'subColor' : 'subTitle']">{{item.content}}</p>
              <p class="subTitle mt5">{{item.createDate}}</p>
            </div>
          </div>
          <!--遮住第一个项的上方-->
          <span class="topMask" v-if="index == 0 && index != logisticsList.length - 1"></span>
          <!--遮住最后项的下方-->
          <span class="bottomMask" v-if="index == logisticsList.length - 1"></span>
          <!--完成后显示的红色样式-->
          <div v-if="item.isDone" class="doneIconBox">
            <span class="DoneBigIcon"></span>
            <span class="DoneSmallIcon"></span>
          </div>
          <!--未完成的灰色样式-->
          <span v-else class="dotIcon"></span>
        </div>
      </div>
  </div>
</template>
<style scoped>
  .boderBottom{
    border-bottom: 1px solid #eee;
  }
  .boderLeft{
    border-left: 1px solid #eee;
  }
  .subTitle{
    color: #999;
    font-size: 14px;
  }
  .mt5{
    margin-top: 5px;
  }
  .titleColor{
    color: #444;
    font-size: 16px;
  }
  .subColor{
    color: #444;
    font-size: 15px;
  }
  .doneIconBox{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height:20px;
  }
  .DoneBigIcon{
    width: 20px;
    height:20px;
    background-color: red;
    border-radius: 20px;
    position: absolute;
    opacity: 0.5;
    top: 0px;
    left: 0px;
  }
  .DoneSmallIcon{
    width: 12px;
    height: 12px;
    background-color:red;
    border-radius: 6px;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  .bottomMask{
    position: absolute;
    background-color: #fff;
    top: 23px;
    left: 19px;
    width: 2px;
    bottom:0px;
  }
  .topMask{
    position: absolute;
    background-color: #fff;
    top: 0px;
    left: 19px;
    width: 2px;
    height: 15px;
  }
  .dotIcon{
    width: 8px;
    height:8px;
    background-color:#ccc;
    border-radius: 5px;
    position: absolute;
    top: 15px;
    left: 16px;
  }
  .logisticsBox{
    background-color: #fff;
    position: relative;
  }
  .outsideBox{
    margin-left: 20px;
    padding-top: 10px;
  }
  .infoLine{
    margin-left: 20px;
    padding-bottom: 10px;
    padding-right: 15px;
  }
  .header{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
<script>
  import utils from '../../assets/utils.js';
  import { POST, GET } from '../../assets/fetch';
  export default {
    data:function () {
      return{
        logisticsList:[{
          content:'【厦门市】您的订单已电子签收。感谢您在xx购物，欢迎再次光临。评价后还能赢取奖品呦',
          createDate:'2017-11-13 19:09:00',
          isDone:true
        },{
          content:'【厦门市】您的订单已达到【厦门湖里站】',
          createDate:'2017-11-13 19:09:00',
          isDone:false
        },{
          content:'【厦门市】您的订单已电子签收。感谢您在xxx购物，欢迎再次光临。参加评价还能赢取奖品呦。',
          createDate:'2017-11-13 19:09:00',
          isDone:false
        },{
          content:'【厦门市】您的订单已电子签收。感谢您在xxx购物，欢迎再次光临。参加评价还能赢取奖品呦。',
          createDate:'2017-11-13 19:09:00',
          isDone:false
        }]
      }
    },
    created(){
      var _this = this;
    },
    methods:{
      goback(){
      },
    }
  }
</script>
