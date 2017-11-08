<template>
  <div class="container">
    <div class="page slideIn member" @scroll="onscroll" offset-accuracy="0">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <metaInfo :member="member" :isFixed = "isfixed"></metaInfo>
        <navbar :isFixed = "isfixed"></navbar>
        <div class="list">
          <card></card>
          <coupon></coupon>
          <reward></reward>
        </div>
      </v-loadmore>
    </div>
    <div class="member">
      <navbar v-if="isfixed" :isFixed = "isfixed"></navbar>
    </div>
  </div>
</template>
<style scoped>
  @import '../less/member.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import {POST,GET,AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import metaInfo from './member/meta.vue';
  import navbar from './member/nav.vue';
  import card from './member/card.vue';
  import coupon from './member/coupon.vue';
  import reward from './member/reward.vue';
  export default {
    data() {
      return {
        member:{nickName:"张三",logo:"./static/logo.png",autograph:"请留下签名"},
        isfixed:false
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      metaInfo,
      navbar,
      card,
      coupon,
      reward
    },
    created() {
      var _this = this;
    },
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      onscroll(e){
        if(e.target.scrollTop >= 120){
          this.isfixed = true;
        }else{
          this.isfixed = false;
        }
      }
    }
  }

</script>
