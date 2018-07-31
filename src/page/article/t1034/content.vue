<template>
  <div class="mp-content">
    <div class="bg-img">
      <div class="bg-logo1"></div>
      <div class="bg-logo2"></div>
      <div class="bg-logo3"></div>
      <div class="bg-logo4"></div>
    </div>
    <div  v-for="(template,index) in templatesList"  v-if="isShow(index)">
      <div class="margin-section section section-on section-border text-up fill">
        <!--判断是否是商品-->
        <div class="text-box" v-html="template.content" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']" v-if="template.content !== ''  && template.content != 'null' && template.content != null && template.content != undefined && template.content != 'undefined'"></div>
        <!--判断类型是图文还是小视频-->
        <div class="img-box  offline-preview " v-if="hasImage(template,index) "  :class="[index % 2 != 0 ? 'img-padding-l' : 'img-padding-r']">
          <div class="eq1 " :class="[index%2 == 0 ? 'l-left' : 'l-right']" ></div>
          <div class="logo1 " :class="[index%2 == 0 ? 'car-r' : 'car-l']"></div>
          <img
            v-lazy="template.original "
            class="images  preview-img"@click="imgPreview(template.original,templatesList.previewList)" ref="imgRef"/>
        </div>
        <!--判断类型是否小视频-->
        <div class="img-box positionRelative" v-if="template.mediaType == 'video'">
          <video :src="template.original"  controls="controls" style="background-color: black"  playsinline webkit-playsinline="true" :poster="template.thumbnail"  width="100%" height="250"></video>
          <!--视频背景颜色。-->
          <!--<div class="positionAbsolute videoBg"></div>-->
        </div>
        <div v-if="template.mediaType == 'audio'">
          <audio :src="template.url" controls="controls" class="audioClass"  style="width: 100%;"></audio>
        </div>
      </div>
      <div v-if="template.mediaType == 'product'" class="goodsLineBox" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']">
        <div class="goodsLineInside boderStyle" @click="buyNow(template.id)">
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
    <!--展开阅读全文.-->
    <div class="readmore" style="display: block;" @click="readMore()" v-if="hasMore()">
      <div>展开阅读全文</div>
      <i class="iconfont icon-xiajiantou icon-arrow"></i>
    </div>
    <div v-else>
      <tableList :article="article"  v-if="hasTable "></tableList>
    </div>
    <preview ref="vuePreview"></preview>
  </div>
</template>
<script>
  import { POST, GET } from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
  import preview from '../../../widget/preview.vue';
  import tableList from '../table.vue';
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
      hasTable:{default:false,
      },
      article: { default: function () {
        return {hits:0,title:"样例",nickName:"author",createDate:null}
      }},
      templateId:{default:1016}
    },
    computed:{
      templatesList: function () {
        return this.templates;
      }
    },
    components: {
      preview,tableList
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
    mounted(){
//      监听是否播放语音
      let _this = this;
//      要加延迟，
      setTimeout(function () {
        var audio = document.querySelectorAll('.audioClass');
        for(var i = 0; i < audio.length ; i++){
          audio[i].addEventListener("playing", function(){
            _this.$emit('controlMusic','open');
          });
          audio[i].addEventListener("pause", function(){
            _this.$emit('controlMusic','close');
          });
        }
      },300)
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
