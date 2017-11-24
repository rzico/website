<template>
  <div>
    <div v-if="hasReward()">
    <div class="weui_cell" v-for="c in rewards">
      <!--<div class="weui_cells_title"><span>{{c.createDate | fmtDate}}</span></div>-->
      <div class="reward">
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
        <span class="createDate">{{c.createDate | fmtDate}}</span>
        <span class="amount">{{c.amount | currencyfmt}}</span>
        <span class="memo">{{c.memo}}</span>
      </div>
    </div>
    </div>
    <div class="noData" v-else>
      <i class="iconfont icon-shangjin"></i>
      <span>参与商家活动，分享领红包</span>
    </div>
  </div>
</template>

<style scoped>
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
        pageStart:0,
        pageSize:20,
        rewards:[]
      }
    },
    filters:{
      fmtDate:function(val) {
          return utils.timefmt(val);
      },
      currencyfmt:function(val) {
        return utils.currencyfmt(val);
      }

    },
    components: {
      Toast,
    },
    created() {
      this.load(function () {

      });
    },
    methods:{
      hasReward:function () {
          return this.rewards.length>0;
        },
      load:function (fn) {
        var _this = this;
        GET("website/member/rebate/list.jhtml?pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (res) {
            if (res.type=='success') {
                if (_this.pageStart==0) {
                    _this.rewards = res.data.data;
                } else {
                  res.data.data.forEach(function (item) {
                    _this.rewards.push(item);
                  });
                }
              _this.pageStart = _this.rewards.length;
            }
            fn();
          },
          function (err) {
            fn();
          }
        )
      },
      loading:function () {
        var _this = this;
        setTimeout(
          _this.load(function () {
            _this.$emit("notify","loading")
          })
          ,1500)
      },
      //            下拉刷新
      refresh:function() {
        var _this = this;
        _this.pageStart = 0;
        setTimeout(
          _this.load(function () {
            _this.$emit("notify","refresh")
          })
          ,1500)
      },

    }
  }
</script>

