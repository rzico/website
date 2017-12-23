<template>
  <div class="backgroundcolor">
    <div v-for="num in lists">
    <div class="topPortion">
      <div class="logo">
        <img class="logoimg" :src="num.logo">
      </div>
      <div class="moneyShopname">
        <div class="money">
          <span class="moneyFont">${{num.amount}}</span>
        </div>
        <div class="shopname">
          <span class="shopFont">{{num.name}}</span>
        </div>
      </div>
      <!--小半圆-->
      <div class="mindot1"></div>
      <div class="mindot2"></div>
    </div>
    <div class="bottomPortion">
      <div>
      <div class="time">
      <i class="iconfont icon-tishi tishitubiao"></i>
      <span class="timefont">{{num.endDate | timeDatefmt}}</span>
      </div>
      <div class="type">
        <i class="iconfont icon-tishi tishitubiao"></i>
        <span class="typefont">全场使用</span>
      </div>
      </div>
      <div class="jumpButton" @click="jump(num.id)">
        <span class="buttonFont">立即领取</span>
      </div>
    </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .backgroundcolor{
    background-color:#eeeeee;
    width: 100%;
    position: absolute;
  }
  .logo{
    width: 60px;
    height: 60px;
    background: #eeeeee;
    border-radius: 30px;
  }
  .logoimg{
    width: 60px;height: 60px;border-radius: 30px;
  }
  .moneyShopname{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 200px;
  }
  .topPortion {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin-left: 20px;
    padding-left: 20px;
    margin-right: 20px;
    padding-right: 20px;
    margin-top: 10px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    background: #EB4E40;
    position: relative;
  }
  .bottomPortion {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin-left: 20px;
    padding-left: 20px;
    margin-right: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    background: #ffffff;
  }
  .mindot1{
    height: 8px;
    width: 8px;
    border-radius:4px;
    background: #eeeeee;
    position: absolute;
    bottom: -4px;
    left: -4px;
  }
  .mindot2 {
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background: #eeeeee;
    position: absolute;
    bottom: -4px;
    right: -4px;
  }
  .moneyFont{
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
  }
  .shopFont{
    font-size: 16px;
  }
  .tishitubiao{
    font-size: 20px;
    color: #cccccc;
  }
  .time{
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  .timefont{
    margin-left: 10px;
    font-size: 16px;
    color: #cccccc;
  }
  .type{
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  .typefont{
    margin-left: 10px;
    font-size: 16px;
    color: #cccccc;
  }
  .jumpButton{
    background:#EB4E40 ;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
  }
  .buttonFont{
    color:#ffffff;
    font-size: 16px;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
        lists:[],
      }
    },
    components: {
      Toast
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      }
    },
    props: {
      article: { default: function () {}}
    },
    mounted () {
      var _this = this;
      setTimeout(function () {
        _this.open();
      },500);
    },
    methods:{
      open:function () {
        let _this =this;
        GET("website/coupon/list.jhtml?authorId="+_this.article.member.id).then(
          function (res) {
            if (res.type=='success') {
                _this.lists = res.data.data;
            } else {
              _this.$refs.toast.show(res.content);
            }
          },
          function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
      jump:function(id) {
        this.$router.push({name:"activate",query:{id:id}});
      }
    }
  }
</script>
