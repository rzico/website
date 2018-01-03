<template>
  <div class="page" style="background-color: #eee" >
    <div class="categoryBox">
      <span class="cataText" v-for="(item,index) in catagoryList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</span>
    </div>
    <div class="goodsLine ">
      <div class=" goodsHead" >
        <div class="flexRow">
          <img :src="refreshImg" class="shopImg"></img>
          <span class="shopName">adima旗舰店</span>
          <span class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</span>
        </div>
        <div>
          <span class="title red">交易成功</span>
        </div>
      </div>
      <div class="flexRow goodsBody" style="justify-content: space-between">
        <img :src="refreshImg" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goodsHeight )+ 'px'"></img>
        <div class="goodsInfo" :style="'height:' + goodsHeight + 'px;'">
          <p class="goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</p>
          <p class="subTitle marginTop5">颜色分类:深蓝直伞</p>
        </div>
        <div class="goodsPriceNum" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goods20Width)+ 'px'">
          <p class="goodsPrice ">¥ 148.00</p>
          <p class="subTitle">x1</p>
        </div>
      </div>
      <div class="flexRow goodsTotalPrice ">
        <span class="textTitle marginRight10">共1件商品</span>
        <span class="textTitle">合计:¥ 148.00</span>
      </div>
      <div class="goodsFoot">
        <div class="footLeft">
          <span class=" subTitle">删除</span>
        </div>
        <div class="footRight">
          <span class="textTitle footText">查看物流</span>
          <span class="textTitle footText">评价晒单</span>
          <span class="textTitle footText red">再次购买</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../../less/order/list.less';
</style>
<script>
  import utils from '../../assets/utils';
  import { POST,GET} from '../../assets/fetch.js';
  export default {
    data:function(){
      return{
        ordersList:['1','2'],
        refreshImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515550007&di=e7530b5267c25b0bb5113c048dc948db&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
        refreshing:false,
        pageStart:0,
        pageSize:15,
        whichCorpus:0,
        catagoryList:[{
          name:'全部',
          id:'0'
        },{
          name:'待付款',
          id:'1'
        },{
          name:'待发货',
          id:'2'
        },{
          name:'待收货',
          id:'3'
        },{
          name:'售后',
          id:'4'
        }],
      }
    },
    props:{
    },
    components: {
    },
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.25;
      this.goods20Width = document.documentElement.clientWidth * 0.20;
      POST('website/member/order/list.jhtml').then(
        function (data) {
          console.log(data);
        },function (err) {
          console.log(err);
        }
      )
    },
    methods:{
      goback:function () {
        event.closeURL();
      }

    }
  }
</script>
