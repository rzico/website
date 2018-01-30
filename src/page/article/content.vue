<template>
  <div  :class="[templateId == 1003 ? 't1003_content_margin_LR_15' : '',templateId == 1002 ? 't1002_content_padding_10' : '']" >
    <div class="content"  :class="[templateId == 1003 ? 't1003_content_padding_LR_16' : '']">
      <div  v-for="(template,index) in templatesList">
        <div class="margin-section section section-on section-border text-up fill" v-if="isShow(index)">
          <!--template里没有title的字段-->
          <div class="text"><h3>{{template.title}}</h3></div>
          <!--判断是否是商品-->
          <div class="text-box" v-html="template.content" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']"></div>
          <!--判断类型是图文还是小视频-->
          <div class="img-box" v-if="hasImage(template)">
            <img
              v-bind:src="template.original | watchImg"
              class="images shadow img-border" @click="preview(0)"/>
          </div>
          <!--判断类型是否小视频-->
          <div class="img-box" v-if="template.mediaType == 'video'">
            <video :src="template.original" controls="controls" :poster="template.thumbnail"  width="100%" height="300"></video>
          </div>
        </div>
        <div v-if="template.mediaType == 'product'" class="goodsLineBox" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']">
          <div class="goodsLineInside boderStyle" :class="[templateId == 1003 ? 't1003_goods_borderColor' : '',templateId == 1002 ? 't1002_goods_borderColor' : '']"  @click="buyNow(template.id)">
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
                <span class="doBuy" >立即购买</span>
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
  </div>
</template>
<script>
  import { POST, GET } from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
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
      }
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
      preview:function (data) {
      }
      ,
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
