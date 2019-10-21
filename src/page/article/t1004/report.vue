<template>
  <div class="footer__root">
    <div class="footer-bg">
      <!--阅读数与时间-->
      <div class="time-read" :class="[timeReadHeight() ? 'bottomDistance' : '']">
        <span class="time">{{article.createDate | datetimefmt}}</span>阅读
        <span class="read">{{article.hits}}</span>
      </div>
    </div>

  </div>
</template>
<style scoped>
  .t1004 .bottomDistance{
    bottom: 105px;
  }
  .t1004 .goodsNewHeight{
    height: 97px;
    position: absolute !important;
    left: 0;
    right: 0;
    z-index:1;
  }
</style>
<script>
  import utils from '../../../assets/utils.js';
  export default {
    data(){
      return{
        goodsHeight:'',
        productTemplates:[],
        hasShowProduct:[],
        hasProduct:false,
      }
    },
    props: {
      article: { default:function () {
        return '';
      }
      },
      animationIndex:{default: 0 }
    },
    filters: {
      datetimefmt(val) {
        return utils.datetimeslash(val);
      },
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
    mounted(){
      console.log(this.article);
      console.log('1');
      let _this = this;
      setTimeout(function () {
        console.log(_this.article);
        _this.article.templates.forEach(function (item,index) {
          if(item.mediaType == 'product'){
            item.index = index;
            _this.productTemplates.push(item);
          }
        })

      },100)

    },
    computed:{
      nowIndex(){
        return this.animationIndex
      },
    },
    methods:{
//      控制时间 阅读的高度
      timeReadHeight:function () {
        if(this.article.hasProduct && this.nowIndex != 0 && (this.nowIndex <= this.productTemplates[this.productTemplates.length - 1].index + 1 ||  this.productTemplates.length == 1 &&  this.nowIndex <= this.article.templates.length)){
          return true;
        }else{
          return false;
        }
      },
      buyNow:function (id) {
        this.$emit('buyNow',id);
      },
//      判断商品链接的显示
      showProduct(template,index){
        if(this.productTemplates.length == 1 && this.nowIndex != 0 &&  this.nowIndex <= this.article.templates.length){
          return true;
        }else{
          if(this.nowIndex != 0 && template.index >= this.nowIndex - 1){
            return true;
          }else{
            return false;
          }
        }
      }
    }
  }
</script>
