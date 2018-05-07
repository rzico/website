<template>
  <div>
    <div class="weui_cell" v-if="hasCoupon()">
      <div v-for="c in coupons" class="coupon" :class="c.color"  @click="openCoupon(c.id)">
        <div class="listbox">
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
        <span class="nickName">{{c.name}}</span>
        <span class="name">{{c.couponName}}</span>
        <span class="memo">{{c.descr}}</span>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <i class="iconfont icon-shangjin"></i>
      <span>您没领取优惠券</span>
    </div>
  </div>
</template>
<style scoped>
  @import '../../less/coupon.less';
  .weui_cell {
    flex-direction: column;
  }
</style>

<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        coupons:[]
      }
    },
    components: {
      Toast,
    },
    created() {
      this.load();
    },
    methods:{
      hasCoupon:function () {
        return this.coupons.length>0;
      },
      load:function () {
        var _this = this;
        GET("website/member/couponCode/list.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.coupons = res.data;
            }
          },
          function (err) {

          }
        )
      },
      openCoupon:function(cid) {
        this.$router.push({name:"coupon",query:{id:cid}});
      }
    }
  }
</script>

