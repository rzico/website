<template>
  <!--c1003文章模版-->
  <div class="bgc">
    <div class="title" v-if="tagList.length != ''">
      <img class="titleImg" style="margin-right: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>
      <span class="titlespan">商<span style="color: #999;font-size: 18px">·</span>家<span style="color: #999;font-size: 18px">·</span>推<span style="color: #999;font-size: 18px">·</span>荐</span>
      <img class="titleImg" style="margin-left: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>
    </div>
    <div v-for="item in tagList" @click="jump(item.url)">
    <!--    推荐排版  采取新版 标题置顶化-->
    <div  class="articleBox">
      <div class="flex-row  ml10" style="padding-top: 10px">
        <!--<text class="articleTitle">{{item.title}}</text>-->
        <span class="articleTitle" >{{item.title}}</span>
      </div>
      <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
      <!--<text class="articleContent">{{item.htmlTag}}</text>-->
      <!--</div>-->
      <div class="flex-row ml10 " v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
        <span class="articleContent ">{{item.htmlTag}}</span>
      </div>
      <!--文章封面-->
      <div style="position: relative">
        <img  :src="item.thumbnail | topImage "  resize="cover" class="articleCover"/>
      </div>
      <div  class="tempThreeContent ml10" >
        <div class="space-between">
          <div>
            <span class="relevantText" >{{item.createDate | dateweektimefmt}}</span>
          </div>
          <div class="relevantInfo" v-if="item.articleSign != '样例'">
            <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>
            <span class="relevantText ">{{item.hits}}</span>
            <span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
            <span class="relevantText ">{{item.laud}}</span>
            <span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
            <span class="relevantText ">{{item.review}}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="titleTwo" v-if="toptList.length != ''">
      <img class="titleImg" style="margin-right: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/hua.png"/>
      <span class="titlespan">猜<span style="color: #999;font-size: 18px">·</span>你<span style="color: #999;font-size: 18px">·</span>喜<span style="color: #999;font-size: 18px">·</span>欢</span>
      <img class="titleImg" style="margin-left: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/hua.png"/>
    </div>
    <div v-for="item in toptList" @click="jump(item.url)">
    <!--    置顶排版 采取左右布局。封面较小-->
    <div  class="tempPdBox" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
      <div class="flex-row">
        <!--<div class="bt10 flex-row" @click="goAuthor(item.authorId)">-->
        <!--<img :src="item.logo " resize="cover" class="authorImg"/>-->
        <!--<span class="authorName">{{item.author}}</span>-->
        <!--</div>-->
      </div>
      <div class="space-between" >
        <div class="tempOneContent" >
          <div class="flex-row">
            <span class="articleTitle tempOneWidth">{{item.title}}</span>
            <!--<text class="articleTitle tempOneWidth" >用折纸做出的北欧范花瓶-1</text>-->
          </div>
          <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
          <!--<text class="articleContent">{{item.htmlTag}}</text>-->
          <!--</div>-->
          <div class="flex-row" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
            <span class="articleContent tempOneWidth" >{{item.htmlTag}}</span>
          </div>
          <div class="relevantInfo" v-if="item.articleSign != '样例'">
            <span class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</span>
            <span class="relevantText">{{item.hits}}</span>
            <span class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
            <span class="relevantText">{{item.laud}}</span>
            <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
            <span class="relevantText">{{item.review}}</span>
          </div>
        </div>
        <!--文章封面-->
        <div style="position: relative">
          <img  :src="item.thumbnail | tagImage "  resize="cover" class="tempOneImg"/>
        </div>
      </div>
    </div>
      <!--    如果无描述  采取封面新版化-->
      <div  class="articleBoxTwo" v-if="item.htmlTag == '' || item.htmlTag == null || item.htmlTag == undefined">
        <div class="flex-row">
          <!--<div  class="flex-row ml10" @click="goAuthor(item.authorId)">-->
          <!--<img :src="item.logo " resize="cover" class="authorImg"/>-->
          <!--<span class="authorName">{{item.author}}</span>-->
          <!--</div>-->
        </div>
        <!--文章封面-->
        <div style="position: relative">
          <img  :src="item.thumbnail | topImage"  resize="cover" class="articleCoverTwo" />
        </div>
        <div  class="tempThreeContent" >
          <div class="flex-row bt10">
            <!--<text class="articleTitle">{{item.title}}</text>-->
            <span class="articleTitle" >{{item.title}}</span>
          </div>
          <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
          <!--<text class="articleContent">{{item.htmlTag}}</text>-->
          <!--</div>-->
          <div class="space-between">
            <div>
              <span class="relevantText" >{{item.createDate | dateweektimefmt}}</span>
            </div>
            <div class="relevantInfo" v-if="item.articleSign != '样例'">
              <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>
              <span class="relevantText ">{{item.hits}}</span>
              <span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
              <span class="relevantText ">{{item.laud}}</span>
              <span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
              <span class="relevantText ">{{item.review}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: #eee;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .title{
    background-color: white;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #eee;
  }
  .titleTwo{
    margin-top: 5px;
    background-color: white;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #eee;
  }
  .titleImg{
    height: 20px;
    width: 20px;
  }
  .titlespan{
    font-size: 16px;
  }
  /*公用样式*/
  /**横向部局居中对齐**/
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bt10 {
    margin-bottom: 10px;
  }
  .bt5 {
    margin-bottom: 5px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .white {
    color: white;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .positionRelative{
    position:relative;
    height: 187.5px;
  }
  .tempEightCover{
    height: 187.5px;
    width: 100%;
  }
  .articleCoverTwo {
    height: 187.5px;
    /*width:690px;*/
    width:100%;
    /*border-radius: 5px;*/
    /*margin-top: 10px;*/
    margin-bottom: 10px;
  }
  .tempThreeContent{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 10px;
    margin-right: 10px;
  }
  .tempTwoContent{
    display:flex;
    justify-content: space-between;position:absolute;bottom: 10px;left: 0px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .tempTwoMask{
    position: absolute;top: 0;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.3;
  }

  .tempOneImg{
    width: 100px;height: 100px;
  }
  .tempOneWidth{
    width: 245px;
  }
  .tempOneContent{
    width: 255px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
  }

  .tempPdBox{
    width: 100%;
    padding:10px;
    box-sizing: border-box;
    margin-bottom:1px;
    background-color:#fff;
  }

  .articleContent{
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: 355px;
    font-size: 16px;
    color: #888;
  }
  .activeClass{
    visibility: visible;
  }
  .noactive{
    visibility: hidden;
  }
  .relevantImage {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    color: #888;
    margin-right: 2.5px;
    margin-left: 2.5px;
    align-items: center;
  }
  .relevantText {
    color: #888;
    font-size: 13px;
  }
  .relevantInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .articleCover {
    height: 187.5px;
    /*width:690px;*/
    width:100%;
    /*border-radius: 5px;*/
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .articleBox {
    background-color: #ffffff;
    /*padding-left: 30px;*/
    /*padding-top: 10px;*/
    /*padding-right: 30px;*/
    padding-bottom: 10px;
    margin-bottom: 5px;
  }
  .articleBoxTwo{
    background-color: #ffffff;
    /*padding-left: 30px;*/
    /*padding-top: 10px;*/
    /*padding-right: 30px;*/
    padding-bottom: 10px;
    margin-bottom: 2px;
  }
  .articleTitle {
    font-size: 19px;
    width: 355px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
//        推荐文章id
        tagId:4,
//        精选文章id
        selectId:5,
//        置顶文章id
        topId:6,
        selectList:[],
        tagList:[],
        toptList:[],
        pageStart:0,
        pageSize:10
      }
    },
    components: {
      Toast
    },
    filters: {
      dateweektimefmt(value) {
        return utils.dateweektimefmt(value);
      },
      selectImage(val){
        return utils.thumbnail(val, 750, 375);
      },
      tagImage(val){
        return utils.thumbnail(val, 200, 200);
      },
      topImage(val){
        return utils.thumbnail(val, 750, 375);
      }
    },
    props: {
      idx:{default:0},
      id: { default: 0}
    },
    created() {
      this.open();
      this.get()
    },
    mounted () {

    },
    methods:{
      loadTop:function(idx) { //组件提供的下拉触发方法
        this.pageStart = 0;
        //下拉加载
        this.get(this.idx);
      },
      loadBottom:function() {
        // 上拉加载
        this.get(this.idx);// 上拉触发的分页查询
      },
      //      获取推荐文章
      open:function () {
        var _this = this;
        GET('website/article/list.jhtml?tagId='+_this.tagId+'&authorId='+_this.id+"&pageStart=0&pageSize=5").then(
          function (mes) {
            if(mes.type == 'success'){
              _this.tagList = mes.data.data
            }else{
            }
          }, function () {

          });
      },
      //      获取置顶文章
      get:function () {
        var _this = this;
        GET('website/article/list.jhtml?tagId='+_this.topId+'&authorId='+_this.id+"&articleCatalogId="+_this.idx+"&pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (mes) {
            if(mes.type == 'success'){
              mes.data.data.forEach(function (item) {
                _this.toptList.push(item);
              });
              _this.pageStart = mes.data.start + mes.data.data.length
            }else{
            }
          }, function () {

          });
      },
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
