<template>
  <div class="container">
    <div class="page slideIn member" @scroll="onscroll" offset-accuracy="0">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" :auto-fill="false" ref="loadmore">
        <metaInfo :member="member" :isFixed = "isfixed"></metaInfo>
        <navbar :isFixed = "isfixed" @onchange="navchange"></navbar>
        <div class="list">
          <card ref="card" v-if="activeIndex(0)"></card>
          <coupon ref="coupon" v-if="activeIndex(1)"></coupon>
          <reward ref="reward" v-if="activeIndex(2)" @notify="notity"></reward>
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
  .list {
    flex-direction: row;
  }
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
        idx:0,
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
      _this.idx = utils.getUrlParameter("idx");
      if (utils.isNull(_this.idx)) {
          _this.idx = 0;
      }
      _this.load();
    },
    methods:{
      loadTop:function() { //组件提供的下拉触发方法
        if (this.idx==2) {
          this.$refs.reward.refresh()
        } else {
          this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }
      },
      loadBottom:function() {
        if (this.idx==2) {
          this.$refs.reward.loading()
        } else {
          this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }
      },
      onscroll(e){
        if(e.target.scrollTop >= 180){
          this.isfixed = true;
        }else{
          this.isfixed = false;
        }
      },
      notity:function (type) {
        if (type=="loading") {
          this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        } else {
          this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
        }
      },
      activeIndex:function (id) {
        return this.idx==id;
      },
      navchange:function (id) {
        this.idx=id;
        this.$refs.loadmore.onBottomLoaded();
      },
      load:function () {
        var _this = this;
        GET("website/member/view.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.member = res.data;
            }
          },
          function (err) {

          }
        )
      }
    }
  }

</script>
