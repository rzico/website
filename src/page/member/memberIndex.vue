<template>
  <div class="container">
    <div class="page slideIn topic" style="background-color: #eeeeee" @scroll="onscroll" offset-accuracy="0">
        <metaInfo :topic="topic" :isFixed = "isfixed"></metaInfo>
        <div class="advertising"></div>
        <div class="containsOne">
        <div class="address" @click="jumpAddress">
          <div>
          <i class="iconfont icon-shanchu" style="color:#888888;font-size: 18px"></i>
            <span class="font-size16">地址管理</span>
          </div>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
        </div>
        <div class="reward" @click="jumpReward">
          <div>
          <i class="iconfont icon-shangjin1" style="color:#888888;font-size: 18px"></i>
          <span class="font-size16">我的奖励金</span>
          </div>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
        </div>
        <div class="coupon" @click="jumpCoupon">
          <div>
          <i class="iconfont icon-youhuiquan" style="color:#888888;font-size: 18px"></i>
          <span class="font-size16">我的优惠券</span>
          </div>
          <i class="iconfont icon-xiangyoujiantou" style="color:#888888"></i>
        </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
  .advertising{
    background-color: white;
    margin-top: 20px;
    height: 100px;
  }
  .containsOne{
    margin-top:20px;
    padding-left: 10px;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
  }
  .font-size16{
    padding-left: 10px;
    font-size: 16px;
  }
  .containsOne .address{
    height: 40px;
    background-color: white;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .containsOne .reward{
    height: 40px;
    background-color: white;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .containsOne .coupon{
    height: 40px;
    background-color: white;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import metaInfo from '../topic/meta.vue';
  export default {
    data() {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        topic:{},
        catalogs:[],
        isfixed:false,
        id:''
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      metaInfo,
    },
    created() {
      var _this = this;
      _this.id = utils.getUrlParameter("id");
      if (utils.isNull(_this.id)) {
        _this.id = "";
      }
      if (utils.isNull(_this.id)) {
        AUTH("",function (authed) {
          _this.load();
        })
      } else {
        _this.load();
      }

    },
    methods:{
      jumpAddress:function() {
        this.$router.push({name:"receiverList",query:{}});
      },
      jumpReward:function() {
        this.$router.push({name:"reward",query:{}});
      },
      jumpCoupon:function() {
        this.$router.push({name:"couponList",query:{}});
      },
      load:function() {
        var _this = this;
        GET('website/topic/view.jhtml?id='+_this.id).then(
          function (response) {
            if (response.type=="success") {
              _this.topic = response.data;
              _this.topic.logo = utils.thumbnail(_this.topic.logo,150,150)
              _this.id = _this.topic.id;
              _this.catalogs = response.data.catalogs;
              //设置分享标题
              utils.setConfig({
                title:_this.topic.name+"的"+utils.getConfig().siteName+"专栏",
                desc:"超强图文小视频分享社区，中国版Facebook",
                link:location.href,
                thumbnail:_this.topic.logo
              });
            } else {
              _this.$refs.toast.show("网络不稳定");
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
          });
      },
      onscroll(e){
        console.log(e.target.scrollTop);
        if(e.target.scrollTop >= 194){
          this.isfixed = true;
        }else{
          this.isfixed = false;
        }
      },
    }
  }

</script>
