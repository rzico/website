<template>
  <div class="cover" style="position: relative;">
    <div class="caishen">
      <!--烟花动画-->
      <img class="caishenye" src="../../../img/t1003/caishenye.png">
      <img class="fudai" src="../../../img/t1003/fudai.png">
      <div class="yanhua" style="top: 20.6343%; left: 15.1292%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: 8;animation-delay:2.5s;">
        <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div></div>
      <div class="yanhua" style="top: 25.4659%; left: 16.3997%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: 3;animation-delay:3.5s;">
        <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div></div>
      <div class="yanhua" style="top: 11.9702%; left: 30.6743%; animation-name: yanhua; animation-duration:2s; animation-fill-mode: none; animation-iteration-count: infinite;animation-delay:1s;">
        <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div>
      </div><div class="yanhua" style="top: 16.884%; left: 19.6037%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: infinite;animation-delay:14.5s;">
      <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div></div>
      <div class="yanhua" style="top: 3.0586%; left: 18.2023%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: 10;animation-delay:20s;">
        <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div>
      </div><div class="yanhua" style="top: 21.5422%; left: 10.2074%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: infinite;animation-delay:8.5s;">
      <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div>
    </div><div class="yanhua" style="top: 1.39916%; left: 35.5175%; animation-name: yanhua; animation-duration: 2s; animation-fill-mode: none; animation-iteration-count: infinite;animation-delay:30s;">
      <div class="hua1"><img src="../../../img/t1003/yanhua.png"></div></div></div>
    <!--红包动画-->
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;animation-delay:1s;">
      <div class="money" :style="bgHongBao4" style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to10; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;">
      <div class="money" :style="bgYuanBao1" style="height: 50px; width: 30px;  background-size: 100%; background-repeat: no-repeat; animation-name: to70; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;animation-delay:0.5s;"><div class="money":style="bgYuanBao3"  style="height: 50px; width: 30px;  background-size: 100%; background-repeat: no-repeat; animation-name: to20; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div
    ><div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" :style="bgHongBao2"  style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to70; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" :style="bgHongBao4" style="height: 50px; width: 30px;  background-size: 100%; background-repeat: no-repeat; animation-name: to10; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;animation-delay:1.5s;"><div :style="bgHongBao2"  class="money" style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to60; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;animation-delay:3s;"><div class="money"  :style="bgHongBao2" style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to20; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" style="height: 50px; width: 30px; background-image: url(&quot;../../../img/t1003/yuanbao2.png&quot;); background-size: 100%; background-repeat: no-repeat; animation-name: to40; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;animation-delay:4s;"><div class="money":style="bgYuanBao3"  style="height: 50px; width: 30px;  background-size: 100%; background-repeat: no-repeat; animation-name: to30; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" :style="bgHongBao2" style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to100; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" :style="bgHongBao3" style="height: 50px; width: 30px;  background-size: 100%; background-repeat: no-repeat; animation-name: to70; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
    <div class="daizi" style="animation-name: Y; animation-duration: 2s; animation-timing-function: linear; animation-iteration-count: infinite;"><div class="money" :style="bgHongBao2" style="height: 50px; width: 30px; background-size: 100%; background-repeat: no-repeat; animation-name: to40; animation-duration: 2s; animation-iteration-count: infinite; transform: scale(0.3);"></div></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        bgHongBao4: {
          backgroundImage: 'url(' + require('../../../img/t1003/hongbao4.png') + ')',
        },
        bgHongBao3: {
          backgroundImage: 'url(' + require('../../../img/t1003/hongbao3.png') + ')',
        },
        bgHongBao2: {
          backgroundImage: 'url(' + require('../../../img/t1003/hongbao2.png') + ')',
        },
        bgYuanBao3: {
          backgroundImage: 'url(' + require('../../../img/t1003/yuanbao3.png') + ')',
        },
        bgYuanBao1: {
          backgroundImage: 'url(' + require('../../../img/t1003/yuanbao1.png') + ')',
        },
      }
    }
  }
</script>
