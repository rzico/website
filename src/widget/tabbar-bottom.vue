<template>
  <div>
    <!--<div class="weui-tabbar">-->
      <!--<div  class="weui-tabbar__item"  :class="[id == 0 ? 'weui-bar__item_on':'']" @click="goC1001()">-->
        <!--&lt;!&ndash;<a href="javascript:;" class="weui-tabbar__item " :class="[id == 0 ? 'weui-bar__item_on':'']">&ndash;&gt;-->
        <!--<span style="display: inline-block;position: relative;">-->
          <!--&lt;!&ndash;<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515992382238&di=395605bef33b7058b1a22a4c039f93a4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fjob%2Fgroups%2Fb445558d077800000141f02f67a5.jpg" alt="" class="weui-tabbar__icon">&ndash;&gt;-->
          <!--<span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}">&#xe628;</span>-->
          <!--&lt;!&ndash;<span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>&ndash;&gt;-->
          <!--<p class="weui-tabbar__label">专栏</p>-->
        <!--</span>-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--</div>-->
      <!--<div  class="weui-tabbar__item"  :class="[id == 1 ? 'weui-bar__item_on':'']" @click="goorderList()">-->
        <!--<span style="display: inline-block;position: relative;">-->
          <!--<span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}">&#xe600;</span>-->
          <!--<span class="weui-badge" style="position: absolute;top: -2px;right: -10px;" v-if="hasUntreated()">{{untreatedOrder | watchOrderNum}}</span>-->
          <!--<p class="weui-tabbar__label">订单</p>-->
        <!--</span>-->
      <!--</div>-->
      <!--<div class="weui-tabbar__item"  :class="[id == 2 ? 'weui-bar__item_on':'']" @click="gomemberIndex()">-->
        <!--<span style="display: inline-block;position: relative;">-->
          <!--<span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}">&#xe643;</span>-->
          <!--&lt;!&ndash;<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>&ndash;&gt;-->
          <!--<p class="weui-tabbar__label">我的</p>-->
        <!--</span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="content">
      <div class="oneBox" @click="goC1001()">
        <span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}" :class="[id == 0 ? 'fftIconActive':'']">&#xe604;</span>
      </div>
      <div class="twoBox" @click="goorderList()">
        <span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}" :class="[id == 1 ? 'fftIconActive':'']">&#xe603;</span>
        <span class="weui-badge" style="position: absolute;top: -5px;right: 4px;" v-if="hasUntreated()">{{untreatedOrder | watchOrderNum}}</span>
      </div>
      <div class="threeBox" @click="gomemberIndex()">
        <span class="weui-tabbar__icon fftIcon" :style="{fontFamily:'iconfont'}" :class="[id == 2 ? 'fftIconActive':'']">&#xe643;</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .content{
    height: 43px;
    width: 152px;
    border-radius: 5px;
    background-color: rgba(000,000,000,0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom:13px;
    left: 17px;
  }
  .oneBox{
    width: 50px;
    border-right: 1px solid #888;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .twoBox{
    width: 50px;
    border-right: 1px solid #888;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .threeBox{
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fftIcon{
    font-size: 22px;line-height: 22px;
    color: white;
  }
  .fftIconActive{
    font-size: 22px;line-height: 22px;
    color: #888;
  }
  .weui-tabbar__label {
    text-align: center;
    color: #999999;
    font-size: 10px;
    line-height: 1.8;
    /*line-height: 1.5;*/
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #EB4E40;
  }
  .weui-tabbar{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    /*position: absolute;*/
    position: fixed;
    z-index: 1 !important;
    height: 50px;
    bottom: 0;
    width: 100%;
    background-color: #F7F7FA;
  }
  .weui-tabbar:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #C0BFC4;
    color: #C0BFC4;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .weui-tabbar__item{
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 5px 0 0;
    font-size: 0;
    color: #999999;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .weui-tabbar__icon {
    display: inline-block;
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a img {
    border: 0;
  }
  .weui-badge {
    display: inline-block;
    padding: .15em .4em;
    min-width: 8px;
    border-radius: 18px;
    background-color: #F43530;
    color: #FFFFFF;
    /*line-height: 1.2;*/
    line-height: 12px;
    txt-align: center;
    font-size: 12px;
    vertical-align: middle;
  }
  .weui-badge_dot {
    padding: .4em;
    min-width: 0;
  }
  /*p {*/
  /*display: block;*/
  /*-webkit-margin-before: 1em;*/
  /*-webkit-margin-after: 1em;*/
  /*-webkit-margin-start: 0px;*/
  /*-webkit-margin-end: 0px;*/
  /*}*/
</style>
<script>
  import { POST, GET } from '../assets/fetch.js';
  import utils from '../assets/utils';
  export default {
    data:function () {
      return{
        untreatedOrder:0
      }
    },
    props: {
      id :{default:0},
    },
    filters:{
      watchOrderNum:function (value) {
        if(value > 99){
          return '···';
        }else{
          return value;
        }
      }
    },
    created(){
      this.open();
    },
    methods:{
      gomemberIndex:function () {
        if(this.id == 2){
          return
        }
        var vars  =  utils.router(location.href);
        vars.name ="memberIndex";
        this.$router.push(vars);
      },
      goC1001:function () {
        if(this.id == 0){
          return
        }
        var vars  =  utils.router(location.href);
        vars.name ="c1001";
        this.$router.push(vars);
      },
      goorderList:function () {
        if(this.id == 1){
          return
        }
        var vars  =  utils.router(location.href);
        vars.name ="orderList";
        this.$router.push(vars);
      },

      open(){
        let _this = this;
        GET('website/member/view.jhtml').then(
          function (data) {
            if(data.type == 'success'){
              _this.untreatedOrder = data.data.order;
            }
          },function (err) {
          }
        )},
//      判断是否有未处理订单
      hasUntreated(){
        if(this.untreatedOrder == 0 || utils.isNull(this.untreatedOrder)){
          return false;
        }else{
          return true;
        }
      }
    }
  }
</script>
