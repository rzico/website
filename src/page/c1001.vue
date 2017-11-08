<template>
  <div class="container">
    <div class="page slideIn topic" @scroll="onscroll" offset-accuracy="0">
    <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <metaInfo :topic="topic" :isFixed = "isfixed"></metaInfo>
      <navbar :isFixed = "isfixed" :navs="catalogs" :idx="idx" @navChange="navChange"></navbar>
      <list ref="list" :idx="idx"></list>
    </v-loadmore>
    </div>
    <div class="topic">
      <navbar  v-if="isfixed" :navs="catalogs" :isFixed = "isfixed" :idx="idx" @navChange="navChange"></navbar>
    </div>
  </div>
</template>
<style scoped>
  @import '../less/c1001.less';
</style>
<script>
    import {Loadmore} from 'mint-ui';
    import { POST, GET,AUTH} from '../assets/fetch.js';
    import utils from '../assets/utils.js';
    import metaInfo from './topic/meta.vue';
    import navbar from './topic/nav.vue';
    import list from './topic/list.vue';
    export default {
        data() {
          return {
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            topic:{},
            idx:0,
            catalogs:[{id:0,name:"全部"}],
            isfixed:false
          }
        },
        components: {
          'v-loadmore':Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
          metaInfo,
          navbar,
          list
        },
      created() {
          var _this = this;
          let id = utils.getUrlParameter("id");
          GET('website/topic/view.jhtml?id='+id).then(
            function (response) {
              if (response.type=="success") {
                _this.topic = response.data;
                _this.catalogs = response.data.catalogs;
                //设置分享标题
                utils.setConfig({
                  title:_this.topic.name+"的"+utils.getConfig().siteName+"专栏",
                  desc:"超强图文小视频分享社区，中国版Facebook",
                  link:location.href,
                  logo:_this.topic.logo
                });
              } else {
                _this.$refs.toast.show("网络不稳定");
              }
            }, function () {
              _this.$refs.toast.show("网络不稳定");
            });
        },
       methods:{
         loadTop:function() { //组件提供的下拉触发方法
           this.$refs.list.loadTop(this.idx);
           this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
         },
         loadBottom:function() {
           this.$refs.list.loadBottom();
           this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
         },
         onscroll(e){
           console.log(e.target.scrollTop);
           if(e.target.scrollTop >= 194){
             this.isfixed = true;
           }else{
             this.isfixed = false;
           }
         },
         navChange:function (id) {
             this.idx = id;
           this.loadTop(id);
         }
       }
    }

</script>
