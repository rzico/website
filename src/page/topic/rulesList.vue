<template>
  <!--c1003文章模版-->
  <div class="bgc">
    <!--<div class="title" v-if="selectList.length != ''">-->
      <!--<img class="titleImg" style="margin-right: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>-->
      <!--<span class="titlespan">精<span style="color: #999;font-size: 18px">·</span>选</span>-->
      <!--<img class="titleImg" style="margin-left: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>-->
    <!--</div>-->
    <!--<div v-for="item in selectList" @click="jump(item.url)">-->
      <!--&lt;!&ndash;    精选排版  文章信息全在封面上&ndash;&gt;-->
      <!--<div class="bt5 ">-->
        <!--&lt;!&ndash;文章封面&ndash;&gt;-->
        <!--<div class="positionRelative">-->
          <!--<img  :src="item.thumbnail | selectImage"  resize="cover" class="tempEightCover" />-->
          <!--<div class="tempTwoMask"></div>-->
          <!--<div class="tempTwoContent">-->
            <!--&lt;!&ndash;只会显示出一个div,所以需要用个大div包住,&ndash;&gt;-->
            <!--<div style="width: 100%">-->
              <!--<div class="flex-row bt10">-->
                <!--<span class="articleTitle" style="color: #fff">{{item.title}}</span>-->
              <!--</div>-->
              <!--<div class="space-between">-->
                <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
                  <!--<span class="relevantImageTwo white" :style="{fontFamily:'iconfont'}">&#xe6df;</span>-->
                  <!--<span class="relevantTextTwo white">{{item.hits}}</span>-->
                  <!--<span class="relevantImageTwo  white" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>-->
                  <!--<span class="relevantTextTwo white">{{item.laud}}</span>-->
                  <!--<span class="relevantImageTwo  white" :style="{fontFamily:'iconfont'}">&#xe65c;</span>-->
                  <!--<span class="relevantTextTwo white">{{item.review}}</span>-->
                <!--</div>-->
                <!--<div v-if="isNull(item.price)">-->
                  <!--<span class="relevantTextTwo white">{{item.createDate | dateweektimefmt}}</span>-->
                <!--</div>-->
                <!--<div v-if="!isNull(item.price)" style="display: flex; flex-direction: row;align-items: center">-->
                  <!--<span class="" style="color: red;font-size: 16px">¥{{item.price}}</span>-->
                  <!--<span class="relevantText" style="color: white;font-size: 12px;text-decoration:line-through;margin-left: 10px" v-if="item.price !=item.marketPrice">原价:{{item.marketPrice}}</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="title" v-if="tagList.length != ''">-->
      <!--<img class="titleImg" style="margin-right: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>-->
      <!--<span class="titlespan">推<span style="color: #999;font-size: 18px">·</span>荐</span>-->
      <!--<img class="titleImg" style="margin-left: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/shu.png"/>-->
    <!--</div>-->
    <!--<div v-for="item in tagList" @click="jump(item.url)">-->
      <!--&lt;!&ndash;    推荐排版  采取新版 标题置顶化&ndash;&gt;-->
      <!--<div  class="articleBox">-->
        <!--<div class="flex-row  ml10" style="padding-top: 10px">-->
          <!--<span class="articleTitle" >{{item.title}}</span>-->
        <!--</div>-->
        <!--<div class="flex-row ml10 " v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
          <!--<span class="articleContent ">{{item.htmlTag}}</span>-->
        <!--</div>-->
        <!--&lt;!&ndash;文章封面&ndash;&gt;-->
        <!--<div style="position: relative">-->
          <!--<img  :src="item.thumbnail | topImage "  resize="cover" class="articleCover"/>-->
        <!--</div>-->
        <!--<div  class="tempThreeContent ml10" >-->
          <!--<div class="space-between">-->
            <!--<div v-if="isNullTwo(item.price)">-->
              <!--<span class="relevantText">{{item.createDate | dateweektimefmt}}</span>-->
            <!--</div>-->
            <!--<div v-if="!isNullTwo(item.price)" style="display: flex; flex-direction: row;align-items: center">-->
              <!--<span class="" style="color: red;font-size: 16px">¥{{item.price}}</span>-->
              <!--<span class="relevantText" style="color: #888;font-size: 12px;text-decoration:line-through;margin-left: 10px" v-if="item.price !=item.marketPrice">原价:{{item.marketPrice}}</span>-->
            <!--</div>-->
            <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
              <!--<span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>-->
              <!--<span class="relevantText ">{{item.hits}}</span>-->
              <!--<span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>-->
              <!--<span class="relevantText ">{{item.laud}}</span>-->
              <!--<span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>-->
              <!--<span class="relevantText ">{{item.review}}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="title" v-if="toptList.length != ''">-->
      <!--<img class="titleImg" style="margin-right: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/hua.png"/>-->
      <!--<span class="titlespan">猜<span style="color: #999;font-size: 18px">·</span>你<span style="color: #999;font-size: 18px">·</span>喜<span style="color: #999;font-size: 18px">·</span>欢</span>-->
      <!--<img class="titleImg" style="margin-left: 10px" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/hua.png"/>-->
    <!--</div>-->
    <div v-for="item in toptList" @click="jump(item.url)">
      <!--    置顶排版 采取左右布局。封面较小-->
      <div  class="tempPdBox" v-if="item.tags.length == 0">

          <div class="tempOneContent" >
            <div style="display: flex;flex-direction: column">
              <span class="articleTitle tempOneWidth">{{item.title}}</span>
              <span class="articleContent tempOneWidth" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">{{item.htmlTag}}</span>
            </div>
            <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
              <div class="relevantInfo" v-if="item.articleSign != '样例'">
                <span class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</span>
                <span class="relevantText">{{item.hits}}</span>
                <span class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
                <span class="relevantText">{{item.laud}}</span>
                <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
                <span class="relevantText">{{item.review}}</span>
              </div>
              <div v-if="!isNullThree(item.price)" style="display: flex; flex-direction: row;align-items: center">
                <span class="" style="color: red;font-size: 12px">¥{{item.price}}</span>
                <span class="relevantText" style="color: #919191;font-size: 9px;text-decoration:line-through;margin-left: 10px" >原价:{{item.marketPrice}}</span>
                <!--v-if="item.price !=item.marketPrice"-->
              </div>
            </div>
          </div>
        <!--文章封面-->
        <div style="width: 29%;height: 87.5px;">
          <img  :src="item.thumbnail | tagImage "  resize="cover" class="tempOneImg"/>
        </div>
      </div>
      <!--    如果无描述  采取封面新版化-->
      <div  class="articleBoxTwo" v-if="item.tags.length != 0">
        <div class="flex-row" style="margin-bottom: 8px;margin-top:10px;">
          <span class="articleTitle" >{{item.title}}</span>
        </div>
        <!--文章封面-->
        <div style="position: relative;height: 187.5px;">
          <img  :src="item.thumbnail | topImage"  resize="cover" class="articleCoverTwo" />
        </div>
        <div  class="tempThreeContent" >

          <div class="space-between">
            <div class="relevantInfo" v-if="item.articleSign != '样例'">
              <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>
              <span class="relevantText ">{{item.hits}}</span>
              <span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
              <span class="relevantText ">{{item.laud}}</span>
              <span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
              <span class="relevantText ">{{item.review}}</span>
            </div>
            <div v-if="isNullFour(item.price)">
              <span class="relevantText">{{item.createDate | dateweektimefmt}}</span>
            </div>
            <div v-if="!isNullFour(item.price)" style="display: flex; flex-direction: row;align-items: center">
              <span class="" style="color: red;font-size: 16px">¥{{item.price}}</span>
              <span class="relevantText" style="color: #919191;font-size: 9px;text-decoration:line-through;margin-left: 10px" >原价:{{item.marketPrice}}</span>
              <!--v-if="item.price !=item.marketPrice"？-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color:white;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-bottom: 50px;
    padding: 0 13px;
    box-sizing: border-box;
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
    margin-top:5px;
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
    /*margin-bottom: 10px;*/
  }
  .tempThreeContent{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*box-sizing: border-box;*/
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
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
    width: 100%;height: 87.5px;
  }
  .tempOneWidth{
    width: 245px;
  }
  .tempOneContent{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 71%;
    height: 87.5px;
    padding-right: 13px;
    box-sizing: border-box;
  }

  .tempPdBox{
    width: 100%;
    padding:13px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    background-color:#fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .articleContent{
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: 100%;
    font-size: 12px;
    color: #919191;
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
    font-size: 9px;
    color: #919191;
    margin-right: 2.5px;
    margin-left: 2.5px;
    align-items: center;
  }
  .relevantImageTwo{
    display: flex;
    flex-direction: row;
    font-size: 16px;
    margin-right: 2.5px;
    margin-left: 2.5px;
    align-items: center;
  }
  .relevantText {
    color: #919191;
    font-size: 9px;
  }
  .relevantTextTwo {
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
    border-bottom: 1px solid #eee;
  }
  .articleTitle {
    font-size: 15px;
    width: 100%;
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
////        推荐文章id
//        tagId:4,
////        精选文章id
//        selectId:5,
////        置顶文章id
//        topId:6,
//        selectList:[],
//        tagList:[],
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
        return utils.thumbnail(val, 253, 190);
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
//      this.load()
//      this.open();
      this.get()
    },
    mounted () {

    },
    methods:{
      loadTop:function(id) { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.selectList=[],
          this.tagList=[],
          this.toptList=[],
        //下拉加载
//        this.load(id)
//        this.open(id);
        this.get(id)
      },
      loadBottom:function() {
        // 上拉加载
        this.get(this.idx);// 上拉触发的分页查询
      },
      //      判断是否有价格
      isNull:function (p) {
        if(utils.isNull(p)){
          return true
        }
      },
      //      判断是否有价格
      isNullTwo:function (p) {
        if(utils.isNull(p)){
          return true
        }
      },
      //      判断是否有价格
      isNullThree:function (p) {
        if(utils.isNull(p)){
          return true
        }
      },
      //      判断是否有价格
      isNullFour:function (p) {
        if(utils.isNull(p)){
          return true
        }
      },
//      //      获取精选文章
//      load:function (id) {
//        if(utils.isNull(id)){
//          id=0
//        }
//        var _this = this;
//        GET('website/article/list.jhtml?tagId='+_this.selectId+'&authorId='+_this.id+'&articleCatalogId='+id+"&pageStart=0&pageSize=3").then(
//          function (mes) {
//            if(mes.type == 'success'){
//              _this.selectList = mes.data.data
//            }else{
//            }
//          }, function () {
//
//          });
//      },
//      //      获取推荐文章
//      open:function (id) {
//        if(utils.isNull(id)){
//          id=0
//        }
//        var _this = this;
//        GET('website/article/list.jhtml?tagId='+_this.tagId+'&authorId='+_this.id+'&articleCatalogId='+id+"&pageStart=0&pageSize=5").then(
//          function (mes) {
//            if(mes.type == 'success'){
//              _this.tagList = mes.data.data
//            }else{
//            }
//          }, function () {
//
//          });
//      },
      //      获取全部文章
      get:function (id) {
        var _this = this;
        GET('website/article/list.jhtml?authorId='+_this.id+"&pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
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
