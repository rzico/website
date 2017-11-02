<template>
  <div class="page mask" @click="goback()" v-if="isShow">
    <div class="box">
      <div class="nav">
        <div class="nav_left" @click="goback()">
          <span class="close iconfont icon-arrow-dropright"></span>
        </div>
        <div class="nav_title">
          <span class="caption">谢谢老板赞赏</span>
        </div>
        <div class="nav_right">
          <span class="help iconfont icon-help"></span>
        </div>
      </div>
      <div class="fg">
        <div class="hint sub_title">请选择打赏金额</div>
      </div>
      <div class="moneyBox">
        <div class="money" @click="comfirm(1)">1元</div>
        <div class="money" @click="comfirm(3)">3元</div>
        <div class="money" @click="comfirm(8)">8元</div>
        <div class="money" @click="comfirm(18)">18元</div>
        <div class="money" @click="comfirm(28)">28元</div>
        <div class="money" @click="comfirm(58)">58元</div>
        <div class="money" @click="comfirm(88)">88元</div>
        <div class="money" @click="comfirm(188)">188元</div>
      </div>
      <div class="imgbox">
        <img style="" :src="src" alt="em"></img>
      </div>
     </div>
  </div>
</template>
<style scoped>

  .footer {
    box-sizing: border-box;
    width:100%;
    padding: 0 40px;
    position: absolute;
    bottom: 20px;
    text-align: center;
  }

  .box {
    position: fixed;
    width: 100%;
    height: 70%;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
  }

  .nav {
    display: inline-block;
    text-align: justify;
    position: relative;
    float: left;
    width: 100%;
    height: 40px;
    background-color: #eee;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    border-bottom-style: solid;
  }

  .nav_left {
    position: absolute;
    left: 0px;
    padding-left: 5px;
    width: 10%;
    height: 40px;
    text-align: center;
  }

  .nav_right {
    position: absolute;
    right: 0px;
    padding-right: 5px;
    width: 10%;
    height: 40px;
    text-align: center;
  }

  .nav_title {
    float: left;
    width: 100%;
    height: 40px;
    text-align: center;
  }

  .caption {
    margin: auto;
    font-size:18px;
    line-height: 40px;
    color: #999;
  }

  .close {
    font-size: 24px;
    line-height: 40px;
    color: #999;
  }

  .help {
    font-size: 24px;
    line-height: 40px;
    color: #999;
  }

  .hint {
    margin-top: 60px;
  }
  .moneyBox {
    box-sizing: border-box;
    width:264px;
    margin: 20px auto 20px auto;
    position: relative;
    text-align: center;
  }
  .money {
    box-sizing: border-box;
    margin: 10px 3px 10px 3px;
    float:left;
    width:60px;
    height: 50px;
    line-height: 60px;
    border-width: 1px;
    border-color: red;
    border-style: solid;
    border-radius: 5px;
  }

  .imgbox {
    z-index: -1;
    margin:auto;
    width:50%;
    bottom:0px;
    position: absolute;
  }

  .imgbox img {
    width: 100%;
  }

</style>
<script>
  export default {
    data() {
      return {
        src:"./static/em1.gif",
        isShow:false
      }
    },
    methods:{
      show:function () {
        this.isShow = true;
      },
      goback:function () {
        this.isShow = false;
      }
      ,
      comfirm:function (m) {
        this.isShow = false;
        this.$emit("rewardNumber",m)
      }
    }

  }
</script>
