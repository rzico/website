<template>
  <div >
    <div class="content">
      <div  v-for="(template,index) in templatesList">
        <div class="margin-section section section-on section-border text-up fill" v-if="isShow(index)">
          <!--template里没有title的字段-->
          <div class="text"><h3>{{template.title}}</h3></div>
          <!--判断是否是商品-->
          <div class="text-box" v-html="template.content"></div>
          <!--判断类型是图文还是小视频-->
          <div class="img-outbox">
          <div class="img-box rotate-0" v-if="hasImage(template)">
            <img
              v-bind:src="template.original | watchImg"
              class="  images " style="-webkit-transform: rotate(-3deg);-ms-transform: rotate(-3deg); transform: rotate(-3deg);" @click="imgPreview(template.original,templatesList.previewList)" ref="imgRef"/>
          </div>
          </div>
          <!--判断类型是否小视频-->
          <div class=" positionRelative" v-if="template.mediaType == 'video'" >
            <video :src="template.original" controls="controls" :poster="template.thumbnail"  width="100%" height="250"></video>
            <!--视频背景颜色。-->
            <div class="positionAbsolute videoBg"></div>
          </div>
        </div>
        <div v-if="template.mediaType == 'product'" class="goodsLineBox" >
          <div class="goodsLineInside boderStyle"   @click="buyNow(template.id)">
            <!--商品图片-->
            <img class="goodsImg" :src="template.original | watchGoodsImg" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goodsHeight -10)+ 'px'"/>
            <!--商品描述内容-->
            <div class="infoBox"  :style="'height:' + goodsHeight + 'px'">
              <p class="linesCtrl"  style="-webkit-box-orient: vertical;overflow: hidden;-webkit-line-clamp: 2;line-height: 23px;display: -webkit-box;text-overflow: ellipsis;height: 66%;font-size: 16px">{{template.name}}</p>
              <div class="goodsPrice"  style="height: 34%">
                <div>
                <span>
                ¥ {{template.price | watchPrice}}
                </span>
                  <!--<span class=" sub_title" style="font-size: 14px;text-decoration:line-through;">-->
                  <!--¥ 160.00-->
                  <!--</span>-->
                </div>
                <span class="doBuy">立即购买</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isHtml()">{{htmlStr}}</div>
    </div>
    <!--展开阅读全文.-->
    <div class="readmore" style="display: block;" @click="readMore()" v-if="hasMore()">
      <div>展开阅读全文</div>
      <i class="iconfont icon-xiajiantou icon-arrow"></i>
    </div>
    <preview ref="vuePreview"></preview>
  </div>
</template>
<style scoped>
  .img-outbox {
    padding: 15px 15px;
    position: relative; }
  .img-box {
    padding: 16px 16px 46px;
    background: #fff;
  }
  .rotate-0{
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-box-shadow: 0px 0px 8px #E2E3E0;
    box-shadow: 0px 0px 8px #E2E3E0; }
  .content .section .img-outbox .rotate-0::after {
    width: 60px;
    height: 48px;
    position: absolute;
    bottom: -5px;
    left: -5px;
    background-image: url("../../../img/t1005/95_d2.png");
    background-size: 100%;
    background-repeat: no-repeat; }
  .content .section .img-outbox .rotate-0::after {
    content: "";
    display: block; }
   .content {
    overflow: hidden;
     margin-left: 23px;
     margin-right: 23px;
  }
   .content .section {
    width: auto;
  }
  .margin-section{
    margin: 24px 0;
  }
   .content .nosection{
    width: auto;
  }
   .content .section .text-box{
    width: 100%;
    padding: 0 15px;
  }
   .content .section:first-child {
    margin-top: 0 !important;
  }
   .content .section .text {
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    font-weight: normal;
    white-space: pre-wrap;
  }
   .content .section h3 {
    font-size: 16px;
  }
   .img-box {
  }

   .content .section .images {
    display: block;
    width: 100%;
  }
   .content .section img {

  }

  /*商品*/

    .sub_title{
      font-size: 15px;
      line-height: 16px;
      color: #999;
    }
  .linesCtrl{
    overflow : hidden;
  }
  .bottomInfo{
    padding-right: 40px;
  }
  .infoBox{
    padding-left: 10px;
    width:80%;
  }
  .goodsPrice{
    color: coral;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .doBuy{
    font-size: 12px;
    line-height: 19px;
    border: 1px solid red;
    color: red;
    padding:1px 2px;
    border-radius: 5px;
  }
  .goodsLineBox{
    width:100%;
    padding: 0 15px;
  }
  .goodsLineInside{
    display: flex;
    padding: 10px;
    flex-direction: row;
    width: 100%;
    margin-bottom: 24px;
  }

  .boderStyle{
    border:1px solid #eee;
  }
  .goodsImg{
    width:20%;
  }
  .flex1{
    display: flex;
    flex:1;
  }
  .flex2{
    display: flex;
    flex:2;
  }
  .title {
    font-size: 17px;
    color: #000;
    line-height: 24px;
  }

  .sub_title {
    font-size: 15px;
    color: #999;
  }
  .fz28{
    font-size: 13px;
  }
  .flex-end{
    display: flex;
    align-items: flex-end;
  }
  .positionAbsolute{
    position: absolute;
  }
  .positionRelative{
    position: relative;
  }
  .videoPlayIcon{
    font-size: 60px;
    color: white;
    line-height: 60px;
    position: absolute;left: 50%;top: 50%;margin-top: -30px;margin-left: -30px;
  }
   .videoBg{
    top: 0;left: 0;right: 0;background-color: black;height: 250px;z-index: -1;
  }

</style>
<script>
  import { POST, GET } from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
  import preview from '../../../widget/preview.vue';
  export default {
    data() {
      return {
        more:false,
        goodsHeight:'',
        testData:'',
      }
    },
    props: {
      templates: { default: function () {
        return []
      }
      },
      htmlStr: {
        default:""
      },
      templateId:{default:1001}
    },
    computed:{
      templatesList: function () {
        return this.templates;
      }
    },
    components: {
      preview
    },
    filters:{
//        用原图去阿里云获取缩略图
      watchImg:function(value) {
        if (utils.isNull(value)) {
          return "";
        }
        return utils.thumbnail_cover(value,utils.screenWidth());
      },
      watchGoodsImg:function (value) {
        return utils.thumbnail(value,utils.screenWidth() * 0.2 - 10,utils.screenWidth() * 0.2);
      },
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
    },
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.2;
    },
    methods: {
//      判断是否有图片
      hasImage(template){
        if(!utils.isNull(template.original) && (template.mediaType == 'image' || template.mediaType == 'product')){
          return true;
        }else{
          return false;
        }
      },
//      图片预览
      imgPreview(original,previewList){
//        预览图片时全文的图片就加载进去了。但是此时在加载更多里面有几张图没有渲染，那么如果在预览后面的图时就会找不到实例以至于出错
        if(!this.more){
          this.more = !this.more;
        }
        var equalIndex = 0;
        for(var i = 0;i < previewList.length;i ++){
//          判断是否取得该dom元素 避免出错
          if(this.$refs.imgRef[i]){
//          获取dom元素的宽高
            previewList[i].w = this.$refs.imgRef[i].offsetWidth;
            previewList[i].h = this.$refs.imgRef[i].offsetHeight;
          }
//          在循环过程中 将匹配到的下标存储起来.
          if(original == previewList[i].src){
            equalIndex = i;
          }
//          当循环执行到最后一个时，调用预览方法
          if(i == previewList.length - 1){
//            this.$preview.open(equalIndex,previewList);
            this.$refs.vuePreview.open(equalIndex,previewList);
            return;
          }
        }
      },
      isHtml:function () {
        if (this.htmlStr=="") {
          return false;
        } else {
          return true;
        }
      },
      isShow:function(idx) {
        if (this.more || idx < 4) {
          return true;
        } else {
          return false;
        }
      },
      readMore:function () {
        this.more = true;
      },
      hasMore:function () {
        if (this.more || this.isHtml() || this.templates.length<=4) {//<=4
          return false;
        } else {
          return true;
        }
      },
      popup:function () {
        return;
      },
      buyNow:function (id) {
        this.$emit('buyNow',id);
      }
    }
  }
</script>
