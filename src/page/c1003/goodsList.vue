<template>
  <div class="container">
    <div  style="position: fixed;z-index: 1;width: 100%">
      <!--搜索栏-->
      <div class="search">
        <div class="searchbox">
          <i class="iconfont icon-sousuo-copy" style="font-size: 16px;color:#ccc;margin-left: 10px "></i>
          <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput"   ref="searchBar" placeholder="输入商品名"/>
          <i class="iconfont icon-arrow-dropright" style="font-size: 16px;color:#ccc " @click="clearBuf()"></i>
        </div>
        <div class="searchCancel" @click="noSearch()">
          <span class="searchCancelText" >{{searchOrCancel}}</span>
        </div>
      </div>
      <!--商品分类-->
      <div class="categoryDiv">
    <div class="categoryBox">
      <div v-for="(item,index) in catagoryList">
        <span class="cataText"  @click="catagoryChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</span>
      </div>
    </div>
        <!--样式切换按钮-->
        <div class="iconDiv">
        <i class="iconfont icon-mulu" style="font-size: 18px; " @click="isContorl()" v-if="isStyle"></i>
          <i class="iconfont icon-202" style="font-size: 18px; " @click="isContorl()" v-if="!isStyle"></i>
        </div>
      </div>
    </div>
    <div class="page slideIn" style="background-color: #eeeeee">
      <div style="height: 80px"></div>
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!--左右布局-->
        <div class="twoContent" v-if="hasReward() && isStyle">
          <div class="content" v-for="c in lists" >
            <div class="logo">
              <img class="img" :src="c.thumbnail"/>
            </div>
            <div class="information" @click="buyNow(c.id)">
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
        <!--纵向布局-->
        <div class="vertical" v-for="c in lists" v-if="hasReward() && !isStyle">
          <div class="verticallogoDiv">
            <img class="verticallogo" :src="c.thumbnail"/>
          </div>
          <div class="verticalContent" @click="buyNow(c.id)" >
            <div style="height: 80px;display: flex;flex-direction: column;justify-content: space-between">
            <span  class="verticaGoodsName" style="font-size: 16px">{{c.name}}</span>
            <div class="verticalMoneyNumber">
              <span class="verticalMoney">¥{{c.price}}</span>
              <div class="verticalBottom">
              <span class="verticalNumber">{{c.availableStock | watchType}}</span>
                <i class="iconfont icon-konggouwuche" style="font-size: 20px;color:#EB4E40;position: absolute;right: 10px"></i>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="noData" v-if="!hasReward()">
          <i class="iconfont icon-zanwushuju"></i>
          <span>{{noDataHint}}</span>
        </div>
      </v-loadmore>

    </div>
    <Toast ref="toast"></Toast>
    <buyGoods  ref="buy"></buyGoods>
  </div>
</template>
<style scoped>
  /*<!--搜索栏-->*/
  .search {
    background-color: white;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .searchbox{
    width: 80%;
    height: 30px;
    background-color: #eeeeee;
    margin-left: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    border-bottom-left-radius: 22px;
  }
  .search_input{
    font-size: 14px;
    padding-left: 5px;
    height: 20px;
    width: 80%;
    background-color: #eeeeee;
    border-width: 0;
  }
  .searchCancel{
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .searchCancelText{
    font-size: 16px;
  }
  .categoryDiv{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .categoryBox{
    width:87%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    overflow-x: scroll;
  }
  .iconDiv{
    width: 13%;
    margin-bottom: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  .cataText{
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    margin: 0 10px;
    color: #333;
    font-size: 15px;
    line-height: 30px;
    height: 30px;
    width: 60px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .noActive{
    border-bottom: 0px;
  }
  .corpusActive{
    color: #EB4E40;
    border-width:0 0 1px 0;
    border-bottom-style: solid;
    border-bottom-color:#EB4E40 ;
  }
  /*纵向布局*/
  .vertical{
    height: 100px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .verticallogoDiv{
    height: 80px;
    width: 27%;
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
  }
  .verticallogo{
    background-color: #eeeeee;
    height: 80px;
    width: 80px;
  }
  .verticalContent{
    height: 100px;
    width: 73%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-width: 0 0 0.5px 0;
    border-color: #cccccc;
    border-style: solid;
  }
  .verticalBottom{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 16px;
  }
  .verticaGoodsName{
    font-size: 16px;
    width: 200px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .verticalMoneyNumber{
    display: flex;
    flex-direction: column;
  }
  .verticalMoney{
    font-size: 18px;
    color:#EB4E40;
    height: 25px;
  }
  .verticalNumber{
    font-size: 14px;
    color: #cccccc;
    height: 18px;
  }
  /*横线布局*/
  .twoContent{
    width: 100%;
    padding-left:2%;
    padding-right: 2%;
    box-sizing: border-box;
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
//        分类id
        productCategoryId:'',
        catagoryList:[{
          name:'全部',
          id:0
        },],
        keyword:'',
        searchOrCancel:'搜索',
        noDataHint:'暂无商品',
        isStyle:true

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
      this.productCategoryId = utils.getUrlParameter("productCategoryId");
      //            获取分类列表
      this.getCatagory();
      this.load()
    },
    methods:{
//      控制样式按钮
      isContorl:function () {
        this.isStyle = !this.isStyle
      },
      oninput:function (e) {
        this.searchOrCancel = '搜索';
        this.lists = [];
        this.noDataHint = "输入查找商品";
        this.pageStart = 0;
        this.productCategoryId = '';
        this.whichCorpus = 0;
        this.searchGoods();
      },
      search: function (e) {
        var _this = this;
        this.pageStart = 0;
        this.productCategoryId = '';
        this.whichCorpus = 0;
        this.searchGoods();
      },
//            点击右上角搜索按钮
      noSearch:function () {
        this.inputBlur();
          this.search();
      },
      //          查找商品
      searchGoods:function () {
        let _this = this;
        GET('weex/member/product/list.jhtml?keyword='+ encodeURI(_this.keyword)  + '&productCategoryId=' + this.productCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize).then(function (data) {
          if(data.type == 'success'){
            if (_this.pageStart == 0) {
              _this.lists = data.data.data;
            }else{
              data.data.data.forEach(function (item) {
                _this.lists.push(item);
              })
            }
            _this.noDataHint = '商品不存在';
            _this.pageStart = data.data.start + data.data.data.length;
          }else{
             _this.$refs.toast.show(data.content);
          }
        },function (err) {
          _this.$refs.toast.show(err.content);
        })
      },
//          清空关键字
      clearBuf:function () {
        this.keyword = '';
      },
      inputBlur(){
        this.$refs['searchBar'].blur();
      },
      //分类切换
      catagoryChange:function(index,id){
        var _this = this;
        if(_this.whichCorpus == index){
          return;
        }
        _this.whichCorpus = index;
        _this.productCategoryId = id;
        _this.pageStart = 0;
        _this.load();
      },
      //            获取分类
      getCatagory:function () {
        var _this = this;
        GET('website/shop/product_category/list.jhtml?authorId='+_this.id).then(
          function (data) {
            if (data.type == "success") {
              if(data.data == ''){
              }else{
                _this.catagoryList = '';
                _this.catagoryList =[{
                  name:'全部',
                  id:''
                }];
//                                将文集名循环插入数组中
                for(let i = 0; i<data.data.length;i++){
                  _this.catagoryList.splice(1 + i,0,data.data[i]);
                }
              }
            }else {
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(err.content);
          })
      },
      hasReward:function () {
        return this.lists.length>0;
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.allLoaded = false;
        this.load('loadTop');
      },
      loadBottom:function() {
        this.load('loadBottom');
      },
      load:function (type) {
        var _this = this;
        GET("website/shop/product/list.jhtml?pageStart="+_this.pageStart+"&pageSize="+_this.pageSize+"&authorId="+_this.id+'&productCategoryId=' + _this.productCategoryId).then(
          function (res) {
            if (res.type=='success') {
              if (res.data.start==0) {
                _this.lists = res.data.data;
              } else {
                res.data.data.forEach(function (item) {
                  item.thumbnail = utils.thumbnail(item.thumbnail, 183.75, 183.75);
                  _this.lists.push(item);
                });
              }
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
