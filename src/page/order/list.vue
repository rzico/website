<template>
  <div class="page" style="background-color: #eee;" >
    <div class="categoryBox" style="position: fixed;z-index: 2">
      <span class="cataText" v-for="(item,index) in catagoryList" @click="catagoryChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</span>
    </div>
    <div style="height: 40px"></div>
    <v-loadmore :top-method="loadTop" :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <div class="goodsLine"  v-for="(item,index) in ordersList"  v-if="hasOrder()">
        <div class=" goodsHead">
          <div class="flexRow">
            <img :src="refreshImg" class="shopImg"></img>
            <span class="shopName">adima旗舰店</span>
            <span class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</span>
          </div>
          <div>
            <span class="textTitle red">{{item.statusDescr}}</span>
            <!--<span class="textTitle coral" style="font-size: 14px">{{item.statusDescr}}</span>-->
          </div>
        </div>
        <div class="flexRow goodsBody" style="justify-content: space-between" v-for="(goods,index) in item.orderItems" @click="goDetails(item.sn)">
          <img :src="refreshImg" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goodsHeight )+ 'px'"></img>
          <div class="goodsInfo" :style="'height:' + goodsHeight + 'px;'">
            <p class="goodsName">{{goods.name}}</p>
            <p class="subTitle marginTop5">规格:{{goods.spec}}</p>
          </div>
          <div class="goodsPriceNum" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goods20Width)+ 'px'">
            <p class="goodsPrice ">¥ {{goods.price | watchPrice}}</p>
            <p class="subTitle">x{{goods.quantity}}</p>
          </div>
        </div>
        <div class="flexRow goodsTotalPrice ">
          <span class="textTitle marginRight10">共1件商品</span>
          <span class="textTitle">合计:¥ 148.00</span>
        </div>
        <div class="goodsFoot" v-if="item.status != 'unpaid'" >
          <div class="footLeft">
            <span class=" subTitle">删除</span>
          </div>
          <div class="footRight">
            <span class="textTitle footText">查看物流</span>
            <!--<span class="textTitle footText">评价晒单</span>-->
            <span class="textTitle footText red redBorder">再次购买</span>
          </div>
        </div>
        <div class="goodsFoot" v-if="item.status == 'unpaid'">
          <div class="footLeft">
            <span class="subTitle"></span>
          </div>
          <div class="footRight" >
            <!--<span class="textTitle footText">查看物流</span>-->
            <span class="textTitle footText">取消订单</span>
            <span class="textTitle footText red redBorder" style="padding: 2.5px 10px">付款</span>
          </div>
        </div>
      </div>
      <div class="noData" v-if="!hasOrder()" >
        <i class="iconfont icon-wodedingdan"></i>
        <span>暂无订单</span>
      </div>
    </v-loadmore>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  @import '../../less/order/list.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import utils from '../../assets/utils';
  import { POST,GET} from '../../assets/fetch.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data:function(){
      return{
        ordersList:[],
        refreshImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515550007&di=e7530b5267c25b0bb5113c048dc948db&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
        refreshing:false,
        pageStart:0,
        pageSize:15,
        whichCorpus:0,
        productCategoryId:0,
        catagoryList:[{
          name:'全部',
          id:0
        },{
          name:'待付款',
          id:1
        },{
          name:'待发货',
          id:2
        },{
          name:'待收货',
          id:3
        },{
          name:'售后',
          id:4
        }],
        allLoaded:false
      }
    },
    props:{
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      }
    },
    components: {
      Toast,
      'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    },
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.25;
      this.goods20Width = document.documentElement.clientWidth * 0.20;
      this.open()
    },
    methods:{
      goback:function () {
        event.closeURL();
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.open('loadTop');
      },
      loadBottom:function() {
        this.open('loadBottom');
      },
      hasOrder:function () {
        return this.ordersList.length>0;
      },
      open:function (type) {
        var _this = this;
        var status = '';
        switch(this.productCategoryId){
          case 0:
            status = '';
            break;
          case 1:
            status = 'unpaid';
            break;
          case 2:
            status = 'unshipped';
            break;
          case 3:
            status = 'shipped';
            break;
          case 4:
            status = 'refunding';
            break;
          default:
            status = '';
            break;
        }
        GET('website/member/order/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize).then(
          function (res) {
            console.log(res);
            if (res.type=="success") {
              if (res.data.start==0) {
                _this.ordersList = res.data.data;
              } else {
                res.data.data.forEach(function (item) {
                  _this.ordersList.push(item);
                })
              }
              _this.allLoaded = res.data.data.length<_this.pageSize;
              _this.pageStart = res.data.start+res.data.data.length;
            } else {
            }
            if (type=='loadBottom'){
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          }, function (err) {
            if (type=='loadBottom'){
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          })
      },
      //分类切换
      catagoryChange:function(index,id){
//                event.toast(id);
        var _this = this;
        if(_this.whichCorpus == index){
          return;
        }
        _this.whichCorpus = index;
        _this.productCategoryId = id;
        this.pageStart = 0;
        _this.open();
      },
//      前往订单详情
      goDetails:function (sn) {
        this.$router.push({name:"orderDetails",query:{sn:sn}});
      }
    }
  }
</script>
