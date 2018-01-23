<template>
  <div class="container">
    <div class="page slideIn backg">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
        <div class="twoContent" v-if="hasReward()">
        <div class="content" v-for="c in lists" @click="buyNow(c.id)">
          <div class="logo">
          <img class="img" :src="c.thumbnail"/>
          </div>
          <div class="information">
            <div style="height: 60px">
            <span class="shopName">{{c.name}}</span>
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
      <buyGoods  ref="buy"></buyGoods>
    </div>
  </div>
</template>
<style scoped>
  .backg{
    background-color: #eeeeee;
  }
  .twoContent{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .content{
    width: 49%;
    height: 300px;
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
    padding: 10px;
  }
  .content .information .shopName{
    font-size: 16px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .content .information .moneyStoreName{
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
  import Toast from '../../widget/toast.vue';
  import buyGoods from '../../widget/buyGoods.vue';
  export default {
    data() {
      return {
        lists:[],
        pageStart:0,
        pageSize:10,
        id:57,
//        库存变量
        inventoryType:'',
        availableStock:''
      }
    },
    components: {
      'v-loadmore':Loadmore,
      Toast,
      buyGoods,
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
      this.load()
    },
    methods:{
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
              _this.allLoaded = res.data.data.length<_this.pageSize;
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
