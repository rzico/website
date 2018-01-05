<template>
  <div class="page" style="background-color: #eee"  >
      <!--导航栏-->
      <div  v-for="(item,index) in ordersList" class="pagePd">
        <div class="flexRow infoLines marginTop10" style="background-color: #fff">
          <span class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe604;</span>
          <span class="textTitle">感谢您在xxx购物,欢迎您再次光临!</span>
        </div>
        <div class="addressBox flexRow marginTop10">
          <div style="width: 70px;">
            <span class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</span>
          </div>
          <div style="width: 630px">
            <div class="flexRow">
              <span class="textTitle">柯志杰</span>
              <span class="textTitle ml20">158****1039</span>
            </div>
            <div class="mt10">
              <span class="subTitle" style="line-height: 21px">地址: 福建厦门市思明区城区谊爱路16号海西文创大厦228</span>
            </div>
          </div>
        </div>
        <div class="goodsLine marginTop10">
          <div class="space-between goodsHead boder-bottom">
            <div class="flexRow">
              <img :src="refreshImg" class="shopImg"></img>
              <span class="textTitle ml10 mr10">adima旗舰店</span>
              <span class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</span>
            </div>
            <div class="flexRow">
              <span class="subTitle" style="color: #666" :style="{fontFamily:'iconfont'}">联系卖家</span>
              <span class="subTitle baseColor" style="padding-bottom: 2px"  :style="{fontFamily:'iconfont'}">&#xe628;</span>
            </div>
          </div>
          <div class="flexRow goodsBody  goodsBodyOther" >
            <img :src="refreshImg" class="goodsImg" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goodsHeight - 15)+ 'px'"></img>
            <div class="goodsInfo" :style="'height:' + (goodsHeight - 15) + 'px;'">
              <span class="textTitle goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</span>
              <span class="subTitle mt10">颜色分类:深蓝直伞</span>
            </div>
            <div class="goodsPriceNum" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goods20Width)+ 'px'">
              <span class="textTitle ">¥ 148.00</span>
              <span class="subTitle">x1</span>
              <!--<span class="subTitle border shopCar" >加购物车</span>-->
            </div>
          </div>
          <!--<div class="flexRow goodsBody goodsBodyOther" >-->
            <!--<img :src="refreshImg" class="goodsImg" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goodsHeight - 15)+ 'px'"></img>-->
            <!--<div class="goodsInfo" :style="'height:' + (goodsHeight - 15) + 'px;'">-->
              <!--<span class="textTitle goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</span>-->
              <!--<span class="subTitle marginTop5">颜色分类:深蓝直伞</span>-->
            <!--</div>-->
            <!--<div class="goodsPriceNum" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goods20Width)+ 'px'">-->
              <!--<span class="textTitle ">¥ 148.00</span>-->
              <!--<span class="subTitle">x1</span>-->
              <!--<span class="subTitle border shopCar" >加购物车</span>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <div class="marginTop10 detalisinfoBox">
          <div class="infoLines boderBottom">
            <div class="flexRow">
              <span class="subTitle">订单编号: 64805405523</span>
              <span class="subTitle copyBtn border ml10">复制</span>
            </div>
            <div class="mt10 ">
              <span class="subTitle">下单时间: 2017-12-05 10:43:46</span>
            </div>
          </div>
          <div class="infoLines boderBottom">
            <span class="subTitle fz18">支付方式: 快捷支付</span>
          </div>
          <div class="infoLines">
            <span class="subTitle fz18">配送方式: 普通快递</span>
          </div>
        </div>
        <div class="marginTop10  boderBottom" style="background-color: #fff">
          <div class="priceLine boderBottom">
            <div class="spaceBetween">
              <span class="subTitle">商品总额</span>
              <span class="subTitle">¥39.00</span>
            </div>
            <div class="marginTop5 spaceBetween">
              <span class="subTitle">+运费</span>
              <span class="subTitle">¥0.00</span>
            </div>
          </div>
          <div class="priceLine flexEnd">
            <div class="flexRow">
              <span class="textTitle mr10">实付款:</span>
              <span class="textTitle" style="color: red">¥39.00</span>
            </div>
          </div>
        </div>
      </div>
    <div class="flexRow spaceBetween goodsFoot footBottom" >
      <div class="footLeft" >
        <span class="textTitle delOrder" >删除订单</span>
      </div>
      <div class="footRight">
        <span class="textTitle footspan" @click="goLogistics()">查看物流</span>
        <span class="textTitle footspan">评价晒单</span>
        <span class="textTitle footspan ">再次购买</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../../less/order/list.less';
</style>
<style scoped>
  .delOrder{
    color: #999;
    font-size: 14px;
  }
  .footMore{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .goodsImg{
    border-radius: 5px;
  }
  .spaceBetween{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .flexEnd{

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .fz18{
    font-size: 15px;
  }
  .ml10{
    margin-left: 10px;
  }
  .mr10{
    margin-right: 10px;
  }
  .goodsBodyOther{
    background-color: #fff;

  }

  .carIcon{
    width: 30px;color: #444;font-size: 17.5px;
  }
  /*<!--底部金额-->*/
  .priceLine{
    background-color: #fff;
    padding: 10px 10px 10px 0;
    margin-left: 10px;
  }
  /**/
  /*<!--订单 支付方式 信息行-->*/
  .detalisinfoBox{
    background-color: #fff;
    width: 100%;
  }
  .copyBtn{
    padding: 3px 10px;
    border-radius: 5px;
    line-height: 15px;
    font-size: 13px;
  }
  .infoLines{
    padding: 10px;

  }
  /**/

  /*<!--收货地址-->*/
  .addressIcon{
    width: 70px;
    font-size: 25px;
    color: #666;
  }
  .addressBox{
    padding: 7.5px;
    background-color: #fff;
  }

  /**/
  .footspan{
    padding:5px 9px;
    border-radius: 5px;
    color: #444;
    border-color: #ccc;
    border-width: 1px;
    border-style: solid;
    font-size: 14px;
    margin-right: 10px;
  }
  .shopCar{
    font-size: 10px;
    color: #444;
    padding: 3px 8px;
    border-radius: 5px;
  }

</style>
<script>
  import utils from '../../assets/utils';
  import { POST, GET } from '../../assets/fetch';
  export default {
    data:function () {
      return{
        ordersList: ['1'],
        pageStart: 0,
        pageSize: 15,
//            refreshImg:utils.locate('resources/images/loading.png'),
        refreshImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514462683&di=8f6e78d98e3cc8a0480c93058e674b14&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
      }
    } ,
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.25;
      this.goods20Width = document.documentElement.clientWidth * 0.20;
      let sn = utils.getUrlParameter('sn')
    },
    methods: {
//            点击复制
      copyCode(){
        event.toast('复制成功');
      },
      goLogistics:function () {
        this.$router.push({name:"OrderLogistics",query:{sn:1}});
      },
    }
  }
</script>
