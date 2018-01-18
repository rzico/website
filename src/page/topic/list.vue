<template>
  <div class="list">
    <div class="item" v-for="article in pageList">
        <a class="article-a" data-id="w1ie0av" target="_blank" href="javascript:;" style="cursor:pointer;" @click="jump(article.url)">

          <div :style="'background-image:url('+thumbnail(article.thumbnail,114,80)+');'" class="img bg"></div>
        </a>
        <div class="info" @click="jump(article.url)">
          <a class="article-a" data-id="w1ie0av" target="_blank" href="javascript:;" style="cursor:pointer;">
            <div class="title oneline">{{article.title}}</div>
          </a>
          <a class="article-a" data-id="w1ie0av" href="javascript:;" target="_blank">
            <div class="summary twoline">{{article.htmlTag}}</div>
          </a>
          <div class="about">
            <div><i class="iconfont icon-liulanom ab"></i><span class="ab">{{article.hits}}</span></div>
            <div><i class="iconfont icon-dianzan ab"></i><span class="ab">{{article.laud}}</span></div>
            <div><i class="iconfont icon-pinglun ab"></i><span class="ab">{{article.review}}</span></div>
          </div>
        </div>
      </div>
  </div>
</template>
<style scoped>
  .ab{
    line-height: 15px;
    font-size: 15px;
  }
</style>
<script>
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        pageStart:0,
        pageSize:10,
        pageList:[],
        allLoaded:false
      }
    },
    props:{
      idx:{default:0},
      id:{default:0}
    },
    mounted() {

    },
    methods:{
      loadTop:function(idx) { //组件提供的下拉触发方法
        this.pageStart =0;
        console.log("loadtop");
        //下拉加载
        this.load(idx);
      },
      thumbnail:function (url,w,h) {
        return  utils.thumbnail(url,w,h);
      },
      loadBottom:function() {
        console.log("loadBottom");
        // 上拉加载
        this.load(this.idx);// 上拉触发的分页查询
      },
      load:function (idx) {
        var _this = this;
        var id = utils.getUrlParameter("id");
        if (utils.isNull(id)) {
            id = this.id;
        }
        _this.idx = idx;
        GET('website/article/list.jhtml?authorId='+id+"&isTop=false&articleCatalogId="+idx+"&pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (response) {
            if (response.type=="success") {
              if (_this.pageStart==0) {
                _this.pageList = response.data.data;
              } else {
                for (var i = 0;i < response.data.data.length; i++) {
                  _this.pageList.push(response.data.data[i]);
                }
              }
              _this.pageStart = _this.pageList.length;
              _this.allLoaded = (response.data.recordsTotal>_this.pageStart);
            } else {
              _this.$refs.toast.show("网络不稳定");
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
          });
      },
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
