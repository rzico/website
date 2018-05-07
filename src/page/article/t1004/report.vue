<template>
  <div class="footer__root">
    <div class="footer-bg">
      <footer class="footer-container" v-if="article.hasProduct" :class="[article.hasProduct ? 'goodsNewHeight':'']"><!---->
        <!--<a href="javascript:;" class="btn-comment">-->
        <!--<i class="iconfont icon-pinglun1"></i>-->
        <!--<span class="comment-number">1</span></a>-->
        <!--<a href="#" class="btn btn-download">一键购物</a>-->
        <!--<div v-if="template.mediaType == 'product'" class="goodsLineBox" :class="[templateId == 1003 ? 't1003_content_padding_0' : '']">-->
        <div class="goodsLineInside boderStyle"  @click="buyNow(template.id)" v-for="(template,index) in productTemplates" v-if="showProduct(template,index)">
          <!--商品图片-->
          <img class="goodsImg" :src="template.original | watchGoodsImg" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goodsHeight -10)+ 'px'"/>
          <!--商品描述内容-->
          <div class="infoBox"  :style="'height:' + goodsHeight + 'px'">
            <p class="linesCtrl"  style="-webkit-box-orient: vertical;overflow: hidden;-webkit-line-clamp: 2;line-height: 23px;display: -webkit-box;text-overflow: ellipsis;height: 66%;font-size: 16px;color: #fff">{{template.name}}</p>
            <div class="goodsPrice"  style="height: 34%">
              <div>
                <!--商品价格-->
                <span >
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
        <!--</div>-->
      </footer>
      <!--阅读数与时间-->
      <div class="time-read" :class="[timeReadHeight() ? 'bottomDistance' : '']">
        <span class="time">{{article.createDate | datetimefmt}}</span>阅读
        <span class="read">{{article.hits}}</span>
        <!--<a href="https://www.meipian.cn/resources/components/report.php?id=11vczzir" class="btn btn-report">举报</a>-->
      </div>
    </div>

    <!--评论弹起页面-->
    <!--<div class="popup">-->
    <!--<div class="close">-->
    <!--<i class="iconfont icon-close"></i>-->
    <!--</div>-->
    <!--<div class="comment" red-packet-type="">-->
    <!--<div class="footer-section">-->
    <!--<div class="well">-->
    <!--<h3 class="title">热门评论<span>(1)</span></h3>-->
    <!--<div><div><div class="comment-item" indec="0">&lt;!&ndash;&ndash;&gt;-->
    <!--<div class="comment-box"><div class="avatar-box">-->
    <!--<img src="" alt="" class="avatar"> &lt;!&ndash;&ndash;&gt;-->
    <!--</div> <a class="btn-admire"><i class="iconfont icon-zan"></i> <span class="admire-count">0</span></a>-->
    <!--<h4 class="nickname line-clamp-1"><span>柯志杰了他他</span></h4> <p class="comment-detail line-clamp-3">好的</p>-->
    <!--&lt;!&ndash;&ndash;&gt; <span class="comment-time">18分钟前</span></div> <div class="more"><div>&lt;!&ndash;&ndash;&gt; <a class="btn btn-block btn-comment">打开app查看全部评论</a>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
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
