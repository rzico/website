<!--我的页内列表-->
<template>
  <div class="bgc">
    <div class="couponTitle">
      <i class="iconfont icon-quan"></i>
      <span class="couponTitleSpan">优惠券</span>
    </div>
    <v-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
    <div class="content" :style="addBorder(index)" v-for="(num,index) in lists"  v-if="isCoupon && num.type != 'exchange'">
      <div style="display: flex;flex-direction: row;align-items: center;">
        <div class="couponImage" style="background:url('http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/coupon1.png') no-repeat;background-size:100% 100%;">{{num.type |strainer}}</div>
        <div class="couponinfo">
          <span class="name">{{num.couponName}}</span>
          <span class="money">{{num.descr}}</span>
        </div>
      </div>
      <div class="button" @click="jump(num.couponId,num.id)">使用</div>
    </div>
      <div class="noData" v-if="!isCoupon">
        <i class="iconfont icon-zanwushuju"></i>
        <span>很抱歉，您暂无卡券</span>
      </div>
    </v-loadmore>
  </div>
</template>
<style scoped>
  .couponTitle{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
  }
  .couponTitleSpan{
    font-size: 16px;
    margin-left: 10px;
  }
  .bgc{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:0 15px;
    box-sizing: border-box;
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
    created() {
      this.open();
    },
    methods:{
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
        this.$router.push({name:"activate",query:{id:couponId,type:this.type,codeId:id}});
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.open();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
    }
  }
</script>
