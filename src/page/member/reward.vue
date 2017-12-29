<template>
  <div class="container">
    <div class="page slideIn bg">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
        <div style="min-height: 600px" v-if="hasReward()">
        <div v-for="(c,index) in rewards">
          <!--如果月份重复就不渲染该区域-->
          <div class="monthDiv" v-if="isRepeat(index)">
            <span class="f16">{{c.createDate | dayfmt}}</span>
          </div>
          <div class="detailsDiv">
            <img class="logo" :src="c.logo | logoImg">
            <div class="flex-c" style="width: 88%;padding-left: 30px;  box-sizing: border-box;">
              <div class="flex-r flex-ju">
                <span class="f16">{{c.memo}}</span>
                <span class="f12" style="font-weight: bold">{{c.amount | currencyfmt}}</span>
              </div>
              <div class="flex-r flex-ju">
                <span class="f12 colorccc">{{c.createDate | hitimefmt}}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </v-loadmore>
      <div class="noData" v-else>
        <i class="iconfont icon-shangjin"></i>
        <span>参与商家活动，分享领红包</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
  }
  .monthDiv{
    height: 30px;
    background-color: #cccccc;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    padding-left: 10px;
  }
  .detailsDiv{
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    background-color: white;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
  .logo{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #cccccc;
  }
  .flex-c{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .flex-r{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
  .flex-ju{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .f16{
    font-size: 16px;
  }
  .f12{
    font-size: 12px;
  }
  .colorRed{
    color:red;
  }
  .color888{
    color:#888888
  }
  .colorccc{
    color:#cccccc
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
        pageStart:0,
        pageSize:20,
        rewards:[],
        allLoaded:false,

      }
    },
    filters:{
      dayfmt(val) {
        return utils.dayfmt(val);
      },
      hitimefmt(val) {
        return utils.hitimefmt(val);
      },
      fmtDate:function(val) {
          return utils.timefmt(val);
      },
      currencyfmt:function(val) {
        return utils.currencyfmt(val);
      }

    },
    components: {
      Toast,
      'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    },
    created() {
      this.load()
    },
    methods:{
      hasReward:function () {
          return this.rewards.length>0;
        },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.load('loadTop');
      },
      loadBottom:function() {
        this.load('loadBottom');
      },
      //判断月份是否重复
      isRepeat(index){
        if(index != 0){
          if(utils.dayfmt(this.rewards[index].createDate) == utils.dayfmt(this.rewards[index - 1].createDate)){
            return false;
          }
        }
        return true;
      },
      load:function (type) {
        var _this = this;
        GET("website/member/rebate/list.jhtml?pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (res) {
            if (res.type=='success') {
                if (res.data.start==0) {
                    _this.rewards = res.data.data;
                } else {
                  res.data.data.forEach(function (item) {
                    _this.rewards.push(item);
                  });
                }
              _this.allLoaded = res.data.data.length<_this.pageSize;
              _this.pageStart = res.data.start+res.data.data.length;
            }
            if (type=='loadBottom')
            {
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          },
          function (err) {
            if (type=='loadBottom')
            {
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          }
        )
      },
    }
  }
</script>

