<template>
  <div>
    <div class="content">
      <div  v-for="(template,index) in templates">
        <div class="section section-on section-border text-up fill" v-if="isShow(index)">
            <div class="text"><h3>{{template.title}}</h3></div>
            <div class="img-box">
                <img
                    :src="template.original | watchImg"
                    class="images shadow img-border" @click="preview(0)">
            </div>
        </div>
      </div>
      <div v-if="isHtml()">{{htmlStr}}</div>
    </div>
    <div class="readmore" style="display: block;" @click="readMore()" v-if="hasMore()">
         <div>展开阅读全文</div>
         <i class="iconfont icon-xiajiantou icon-arrow"></i>
    </div>
  </div>
</template>

<script>
  import utils from '../../assets/utils.js';
    export default {
      data() {
         return {
           more:false
         }

      },
      props: {
        templates: { default: function () {
          return []
          }
        },
        htmlStr: {
          default:""
        }
      },
      filters:{
//        用原图去阿里云获取缩略图
        watchImg:function(value) {
          return utils.thumbnail_cover(value,utils.screenWidth() - 30);
        }
    },
      methods: {
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
          if (this.more || this.isHtml() || this.templates.length<4) {
            return false
          } else {
            return true;
          }
        }

      }

    }
</script>
