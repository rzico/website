<!--我的页内列表-->
<template>
  <div class="bgc">
    <div style="width: 100%;padding: 0 15px;box-sizing: border-box;background-color: white">
    <div class="couponTitle"  v-if="isCoupon && lists.type != 'exchange'">
      <i class="iconfont icon-quan"></i>
      <span class="couponTitleSpan">优惠券</span>
    </div>
    </div>
    <v-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <div style="width: 100%;padding: 0 15px;box-sizing: border-box;background-color: white" v-if="isCoupon && lists.type != 'exchange'">
    <div class="content" :style="addBorder(index)" v-for="(num,index) in lists"  >
      <div style="display: flex;flex-direction: row;align-items: center;">
        <div class="couponImage" style="background:url('http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/coupon1.png') no-repeat;background-size:100% 100%;">{{num.type |strainer}}</div>
        <div class="couponinfo">
          <span class="name">{{num.couponName}}</span>
          <span class="money">{{num.descr}}</span>
        </div>
      </div>
      <div class="button" @click="jump(num.couponId,num.id)">使用</div>
    </div>
      </div>
    </v-loadmore>
    <div class="noData" v-if="!isCoupon">
      <img class="noDataImg" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/noData.png"/>
      <span style="font-size: 16px;color: #EB4E40">很抱歉，您暂无卡券</span>
      <!--<div class="noDataButton" @click="go()">查看更多精彩</div>-->
    </div>
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
    height: 50px;
    width: 50px;
    margin-bottom:10px;
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
  .couponTitle{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #eeeeee;
  }
  .couponTitleSpan{
    font-size: 16px;
    margin-left: 10px;
  }
  .bgc{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .content{
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .couponImage{
    height: 40px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
    font-weight: 500;
    font-size: 25px;
  }
  .couponinfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px
  }
  .name{
    font-size: 18px;
    width: 150px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .money{
    font-size: 12px;
    font-weight: 300;
  }
  .button{
    height: 25px;
    width: 75px;
    background-color:#F46A01;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
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
        type:'member',
        isCoupon:false
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      Toast,
    },
    filters: {
      strainer:function (data) {
        if(data == 'fullcut'){
          return '减'
        }if(data == 'discount'){
          return '折'
        } else {
          return '减'
        }
      },
    },
    props:{
      type:{default:''}
    },
    created() {
      this.open();
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
      //            是否添加底部边框
      addBorder: function (index) {
        let listLength = this.lists.length;
//                判断是否最后一个元素并且是否每月的结尾
        if(index != listLength - 1 ){
          return {
            borderWidth: '0 0 0.5px 0',
            borderStyle: 'dashed',
            borderColor: '#ccc'
          }
        }else{
          return {
            borderWidth: '0px',
          }
        }
      },
      open:function (id) {
        let _this =this;
        GET("website/member/couponCode/list.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.lists = res.data
            if(res.data.length > 0){
                _this.isCoupon = true
            }else{
              _this.isCoupon = false
            }
            }
          },
          function (err) {
          }
        )
      },
      jump:function (couponId,id) {
        this.$router.push({name:"couponView",query:{id:couponId,codeId:id}});
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.open();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
    }
  }
</script>
