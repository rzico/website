<template>
  <div class="container" style="padding-bottom: 50px">
    <div class="page slideIn topic" @scroll="onscroll" offset-accuracy="0">
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <banner :topic="topic" ref="banner" :id ="id" :isFixed = "isfixed"></banner>
        <navbar ref="nav" :isFixed = "isfixed" :navs="catalogs" :idx="idx" @navChange="navChange"></navbar>
        <rulesList ref="fancyList" :id="id" :idx="idx"></rulesList>
      </v-loadmore>
    </div>
    <div class="topic">
      <navbar v-if="isfixed" :navs="catalogs" :isFixed = "isfixed" :idx="idx" @navChange="navChange"></navbar>
    </div>
    <Tabbar id=0 ></Tabbar>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  @import '../less/c1001.less';
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import { POST, GET,AUTH,SHARE} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import banner from './topic/banner.vue';
  import navbar from './topic/nav.vue';
  import rulesList from './topic/rulesList.vue';
  import Tabbar from '../widget/tabbar-whole.vue';
  import Toast from '../widget/toast.vue';
  export default {
    data() {
      return {
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        topic:{},
        idx:0,
        id:"",
        catalogs:[],
        isfixed:false
      }
    },
    components: {
      'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      banner,
      navbar,
      rulesList,
      Tabbar,
      Toast
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
      load:function() {
        var _this = this;
        GET('website/topic/view.jhtml?id='+_this.id).then(
          function (response) {
            if (response.type=="success") {
              _this.topic = response.data;
              _this.topic.logo = utils.thumbnail(_this.topic.logo,150,150)
              _this.id = _this.topic.id;
              _this.catalogs = response.data.catalogs;
              _this.$refs.banner.load();
//              _this.$refs.fancyList.getAllArticle();
              //设置分享标题
              utils.setConfig({
                title:_this.topic.name+"的"+utils.getConfig().siteName+"专栏",
                desc:"超强图文小视频分享社区，中国版Facebook",
                link:_this.topic.url,
                thumbnail:_this.topic.logo
              });
              SHARE(location.href);
            } else {
              _this.$refs.toast.show("网络不稳定");
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
          });
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.$refs.fancyList.loadTop(this.idx);
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom:function() {
        this.$refs.fancyList.loadBottom();
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      onscroll(e){
        if(e.target.scrollTop >= 194){
          this.isfixed = true;
        }else{
          this.isfixed = false;
        }
      },
      navChange:function (id) {
        this.idx = id;
        this.$refs.fancyList.loadTop(id);
      }
    }
  }

</script>
