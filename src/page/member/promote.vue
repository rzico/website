<!--我的页内推广列表-->
<template>
  <div class="bgc">
    <div class="promoteTitle">
      <div class="titleOne">
        <span class="titleSpan">我的人脉</span>
        <span class="titleNumber">{{contacts}}</span>
      </div>
      <div class="titleOne">
        <span class="titleSpan">待维护人脉</span>
        <span class="titleNumber">{{invalid}}</span>
      </div>
      <div class="titleTwo">
        <span class="titleSpan">累计收益</span>
        <span class="titleNumber" style="color: red">¥{{rebate}}</span>
      </div>
    </div>
    <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <div class="content" v-for="c in lists" v-if="isPormote">
        <div class="title">
          <span class="shopName"><img class="logo" :src="c.logo"/>{{c.name}}</span>
          <span class="type">{{c.statusDescr}}</span>
        </div>
        <div class="shopContent">
          <div class="logoDiv">
          <img class="shopLogo" :src="c.orderItems[0].thumbnail"/>
          </div>
          <div class="shopInfo">
            <div class="goods">
              <span class="goodsName">{{c.orderItems[0].name}}</span>
              <span class="goodsType">规格:{{c.orderItems.spec}}</span>
            </div>
            <div class="goodsMoney">
            <span class="Money">¥ {{c.orderItems[0].price}}</span>
              <span class="Number">x{{c.orderItems[0].quantity}}</span>
            </div>
          </div>
        </div>
        <div class="total">
          <span class="totalSpan">共计{{c.orderItems[0].quantity}}件商品 合计:<span class="totalMoney">¥ {{c.orderItems[0].price}}</span></span>
          <span class="earnings">收益:<span style="font-size: 14px;color: red"> {{c.rebate}}元</span></span>
        </div>
      </div>
      <div class="noData" v-if="!isPormote">
        <img class="noDataImg" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/noData.png"/>
        <span style="font-size: 16px;color: #EB4E40">很抱歉，您暂无推广</span>
        <div class="noDataButton" @click="go()">查看更多精彩</div>
      </div>
    </v-loadmore>
  </div>
</template>
<style scoped>
  .noData{
    height: 100%;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    min-height: 300px;
    padding-top: 80px;
    position: relative;
  }
  .noDataImg{
    height: 80px;
    width: 80px;
  }
  .noDataButton{
    margin:60px 50px;
    box-sizing: border-box;
    height: 40px;
    background-color: #EB4E40;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 16px;
  }
  .titleSpan{
    font-size: 14px;
    text-align: center;
    color: #888888;
  }
  .titleNumber{
    font-size: 16px;
    text-align: center;
    width: 90%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .promoteTitle{
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-width: 0 0 1px 0;
    border-color: #eeeeee;
    border-style: solid;
    margin-bottom: 5px;
  }
  .titleOne{
    height: 40px;
    display: flex;
    flex: 1;
    border-width: 0 1px 0 0;
    border-color: #eeeeee;
    border-style: solid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .titleTwo{
    height: 40px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .bgc{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    width: 100%;
    padding:0 15px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
  }
  .title{
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .shopName{
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .type{
    font-size: 16px;
    color: red;
  }
  .shopContent{
    width: 100%;
    margin: 0 15px;
    box-sizing: border-box;
    background-color: #eeeeee;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .logoDiv{
    display: flex;
    flex: 1;
  }
  .shopLogo{
    width: 75px;
    height: 75px;
    margin: 5px;
  }
  .logo{
    height: 20px;
    width: 20px;
    border-radius: 100%;
    margin-right:5px;
  }
  .shopInfo{
    display: flex;
    flex: 3;
    flex-direction: column;
    justify-content: space-between;
    height: 75px;
  }
  .goods{
    display: flex;
    flex-direction: column;
  }
  .goodsName{
    font-size: 16px;
    width: 90%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .goodsType{
    font-size: 14px;
  }
  .goodsMoney{
    width: 100%;
    padding-right: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .Money{
    font-size: 14px;
    color: red;
  }
  .Number{
    font-size: 14px;
    color: #888;
  }
  .total{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .totalMoney{
    font-size: 14px;
    margin-left: 10px;
  }
  .totalSpan{
    font-size: 14px;
  }
  .earnings{
    font-size: 14px;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        lists:[],
        pageStart:0,
        pageSize:10,
        isPormote:false,
        rebate:0,
        contacts:0,
        invalid:0,
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Toast,
    },
    filters: {

    },
    props:{
      id:{default:0},
      type:{default:''}
    },
    created() {
      this.open();
      this.load()
    },
    methods:{
      go:function () {
        if(this.type == 'c1003') {
          var vars = utils.router(location.href);
          vars.name = "c1003";
          this.$router.push(vars);
        }else {
          var c = utils.router(location.href);
          c.name = "c1001";
          this.$router.push(c);
        }
      },
      load:function() {
        var _this = this;
        GET('website/member/rebate/view.jhtml?authorId='+this.id).then(
          function (mes) {
            if(mes.type == 'success'){
              if(utils.isNull(_this.rebate)){
                _this.rebate = 0;
              }else {
                _this.rebate = mes.data.rebate;
              }
              _this.contacts = mes.data.contacts;
              _this.invalid = mes.data.invalid;
            }else {

            }
          }, function () {

          });
      },
      open:function (id) {
        let _this =this;
        GET("website/member/order/promoter.jhtml?pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (res) {
            if (res.data.start==0) {
              _this.lists = res.data.data;
              if(res.data.data.length > 0){
                _this.isPormote = true
              }else {
                _this.isPormote =false
              }
            } else {
              res.data.data.forEach(function (item) {
                _this.lists.push(item);
              });
            }
            _this.pageStart = res.data.start+res.data.data.length;
          },
          function (err) {

          }
        )
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        this.pageStart = 0;
        this.open()
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        this.open();
      },
    }
  }
</script>
