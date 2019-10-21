<template>
  <div class="mp-content">
    <div  v-for="(template,index) in templatesList" >
      <div class="margin-section section section-on section-border text-up fill" >
        <!--template里没有title的字段-->
        <div class="text"><h3>{{template.title}}</h3></div>
        <!--判断是否是商品-->
        <div class="text-box" v-html="template.content" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']" v-if="template.content !== '' "></div>
        <!--判断类型是图文还是小视频-->
        <div class="img-box offline-preview left" v-if="hasImage(template,index) && index%2 == 0"   >
          <div class="xiushi1"></div>
          <img
            v-lazy="template.original "
            class="images shadow img-border preview-img"@click="imgPreview(template.original,templatesList.previewList)" ref="imgRef"/>
          <div class="xiushi2"></div>
        </div>
        <div class="img-box offline-preview right" v-if="hasImage(template,index) && index%2 != 0"   >
          <div class="xiushi1"></div>
          <img
            v-lazy="template.original "
            class="images shadow img-border preview-img"@click="imgPreview(template.original,templatesList.previewList)" ref="imgRef"/>
          <div class="xiushi2"></div>
        </div>

        <!--判断类型是否小视频-->
        <div class="img-box positionRelative" v-if="template.mediaType == 'video'">
          <video :src="template.original"  controls="controls" style="background-color: black"  playsinline webkit-playsinline="true" :poster="template.thumbnail"  width="100%" height="250"></video>
          <!--视频背景颜色。-->
          <!--<div class="positionAbsolute videoBg"></div>-->
        </div>
      </div>
    </div>
    <preview ref="vuePreview"></preview>
  </div>
</template>
<script>
  import { POST, GET } from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
  import preview from '../../../widget/preview.vue';
  export default {
    data() {
      return {
        more:true,
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
      templateId:{default:1016}
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
//      watchImg:function(value) {
//        if (utils.isNull(value)) {
//          return "";
//        }
//        return utils.thumbnail_cover(value,utils.screenWidth());
//      },
      watchGoodsImg:function (value) {
        return utils.thumbnail(value,utils.screenWidth() * 0.2 - 10,utils.screenWidth() * 0.2);
      },
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
    },
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.2;
      let _this = this;
//      alert(JSON.stringify(this.templates));
    },
    methods: {
//      判断是否有图片
      hasImage(template,index){
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
