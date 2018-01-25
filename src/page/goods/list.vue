<template>
  <div class="container">
    <div class="categoryBox" style="position: fixed;z-index: 1">
      <span class="cataText" v-for="(item,index) in catagoryList" @click="catagoryChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</span>
    </div>
    <div class="page slideIn" style="background-color: #eeeeee">
      <div style="height: 40px"></div>
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="twoContent" v-if="hasReward()">
        <div class="content" v-for="c in lists" @click="buyNow(c.id)">
          <div class="logo">
          <img class="img" :src="c.thumbnail"/>
          </div>
          <div class="information">
            <div style="height: 40px">
            <span class="goodsName">{{c.name}}</span>
            </div>
            <div class="moneyStoreName">
              <div class="money_Name">
              <span class="money">¥{{c.price}}</span>
              <span class="name">{{c.availableStock | watchType}}</span>
              </div>
              <i class="iconfont icon-konggouwuche" style="font-size: 20px;color:#EB4E40 "></i>
            </div>
          </div>
        </div>
        </div>
        <div class="noData" v-if="!hasReward()">
          <i class="iconfont icon-zanwushuju"></i>
          <span>暂无商品</span>
        </div>
      </v-loadmore>
      <div style="height: 50px"></div>
    </div>
    <buyGoods  ref="buy"></buyGoods>
    <Tabbar id=3></Tabbar>
  </div>
</template>
<style scoped>
  .categoryBox{
    width:100%;
    display: flex;
    flex-direction: row;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
  }
  .cataText{
    /*display: flex;*/
    /*flex: 1;*/
    font-size: 15px;
    display: inline-block;
    width:19%;
    /*justify-content: center;*/
    text-align: center;
  }
  .noActive{
    border-bottom: 0px;
  }
  .corpusActive{
    color: #ff5545;
    border: 0;
    border-bottom: 2px solid #ff5545;
  }
  .twoContent{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .content{
    width: 49%;
    margin-bottom: 2%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .content .logo .img{
    display: flex;
  }
  .content .img{
    width: 100%;
    background-color: #cccccc;
  }
  .content .information{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .content .information .goodsName{
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .content .information .moneyStoreName{
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .content .information .moneyStoreName .money_Name{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content .information .moneyStoreName .money_Name .money{
    font-size: 18px;
    color:#EB4E40;
  }
  .content .information .moneyStoreName .money_Name .name{
    margin-left: 10px;
    font-size: 14px;
    color: #cccccc;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import navbar from '../topic/nav.vue';
  import Toast from '../../widget/toast.vue';
  import buyGoods from '../../widget/buyGoods.vue';
  import Tabbar from '../../widget/tabbar-whole.vue';
  export default {
    data() {
      return {
        lists:[],
        pageStart:0,
        pageSize:10,
        id:'',
        allLoaded:false,
//        库存变量
        inventoryType:'',
        availableStock:'',
        whichCorpus:0,
        catagoryList:[{
          name:'全部',
          id:0
        },],
      }
    },
    components: {
      'v-loadmore':Loadmore,
      Toast,
      buyGoods,
      Tabbar,
    },
    filters:{
      watchType:function (value) {
        if(value == 0){
          return '缺货'
        }else if(value <=5){
          return '紧缺'
        }else if(value >5){
          return '有货'
        }
      }
    } ,
    created() {
      this.id = utils.getUrlParameter("id");
      this.load()
    },
    methods:{
      //分类切换
      catagoryChange:function(index,id){
        var _this = this;
        if(_this.whichCorpus == index){
          return;
        }
        _this.whichCorpus = index;
        _this.pageStart = 0;
        _this.load();
      },
      hasReward:function () {
        return this.lists.length>0;
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.load('loadTop');
      },
      loadBottom:function() {
        this.load('loadBottom');
      },
      load:function (type) {
        var _this = this;
        GET("website/shop/product/list.jhtml?pageStart="+_this.pageStart+"&pageSize="+_this.pageSize+"&authorId="+_this.id).then(
          function (res) {
            if (res.type=='success') {
              if (res.data.start==0) {
                _this.lists = res.data.data;
              } else {
                res.data.data.forEach(function (item) {
                  _this.lists.push(item);
                });
              }
//              if(res.data.data.availableStock ==0){
//                _this.inventoryType = '缺货'
//              }else if(res.data.data.availableStock <=5){
//                _this.inventoryType = '紧缺'
//              }else if(res.data.data.availableStock >= 5){
//                _this.inventoryType = '有货'
//              }
             if(res.data.data.length<_this.pageSize){
                _this.allLoaded = true
             }
              _this.pageStart = res.data.start+res.data.data.length;
            }
            if (type=='loadBottom')
            {
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          },
          function (err) {
            if (type=='loadBottom')
            {
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          }
        )
      },
      buyNow:function (id) {
        let _this = this;
        _this.$refs.buy.show(id);
      },
    }
  }
</script>
