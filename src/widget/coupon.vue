<template>
  <!--c1003优惠券模版-->
  <div class="bgc" v-if="lists.length != ''">
    <div class="title">
      <img class="titleImg" style="margin-top: 5px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/coupontitle1.jpg"/>
      <span class="titlespan">优<span style="color: #999;font-size: 18px">·</span>惠<span style="color: #999;font-size: 18px">·</span>券</span>
      <img class="titleImg" style="margin-bottom: 2px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/coupontitle2.jpg"/>
    </div>
    <div class="content" :style="addBorder(index)" v-for="(num,index) in lists">
      <div style="display: flex;flex-direction: row;align-items: center;">
      <div class="couponImage" style="background:url('http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/coupon1.png') no-repeat;background-size:100% 100%;">{{num.type |strainer}}</div>
      <div class="couponinfo">
        <span class="name">{{num.shopName}}</span>
        <span class="money">{{num.name}}</span>
      </div>
      </div>
      <div class="button" @click="jump(num.id)">领取</div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:0 15px ;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .title{
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #eee;
  }
  .titleImg{
    height: 30px;
    width: 30px;
  }
  .titlespan{
    font-size: 16px;
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
    font-size: 14px;
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
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  export default {
    data () {
      return {
        lists:[],
        id:'741'
      }
    },
    components: {
      Toast
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
    props: {
      article: { default: function () {}}
    },
    created() {
      this.open()
    },
    mounted () {

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
        GET("website/coupon/list.jhtml?authorId="+this.id).then(
          function (res) {
            if (res.type=='success') {
              _this.lists = res.data.data;
            }
          },
          function (err) {
          }
        )
      },
      jump:function(numid) {
        this.$router.push({name:"activate",query:{id:numid}});
      }
    }
  }
</script>
