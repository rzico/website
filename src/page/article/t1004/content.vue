<template>
  <div class="ani-container">
    <!--第一张幻灯片-->
    <div class="flex-outer ">
      <div class="img-outer t1004_bg1 " :class="[animationIndex == 0 ? 'scaleAnimation' : '',animationIndex == 0 ? 'setOpacity' : '']" >
      </div>
      <!--文章标题跟作者昵称-->
      <div class="ani-box title" :class="[animationIndex == 0 ? 'setOpac-Zindex' : '']" >{{articleData.title}}</div>
      <p class="ani-caption author setOpacity" :class="[animationIndex == 0 ? 'setOpac-Zindex' : '']">{{articleData.author}}</p>
    </div>
    <!--内容幻灯片-->
    <div class="flex-outer"  v-for="(template,index) in articleData.templates" >
      <div class="img-outer rect " :class="[animationIndex == (index + 1) ? 'scaleAnimation' : '',animationIndex == (index + 1) ? 'setOpacity' : '',index % 2 == 0 ? 't1004_bg2' : 't1004_bg4']" >
        <div class="ani-box img-box " :class="[animationIndex == (index + 1) ? 'setOpac-Zindex' : '']"  :style="'backgroundImage: url(' + template.original + ');'" ></div>
      </div>
      <p class="ani-caption img-caption line-clamp-2" :class="[animationIndex == (index + 1) ? 'setOpac-Zindex' : '']" v-html="template.content"></p>
    </div>
    <!--倒数第二张幻灯片 作者头像跟作者-->
    <div class="flex-outer">
      <div class="img-outer t1004_bg1"  :class="[animationIndex == templatesLength + 1 ? 'scaleAnimation' : '',animationIndex == templatesLength + 1 ? 'setOpacity' : '']">
        <div class="ani-box tail-avatar" :style="'backgroundImage: url(' + article.member.logo + ');'" :class="[animationIndex == templatesLength + 1 ? 'setOpac-Zindex' : '']"></div>
        <p class="ani-caption tail-author" :class="[animationIndex == templatesLength + 1 ? 'setOpac-Zindex' : '']">{{articleData.author}}</p>
      </div>
    </div>
    <div class="flex-outer" :class="[animationIndex == templatesLength + 2 ? 'blackBg' : '']">
      <div class="replay-btn" :class="[animationIndex == templatesLength + 2 ? 'setOpacity' : '']" @click="doAnimation">
        <i class="iconfont icon-zhongbo icon-ani-replay" :class="[animationIndex == templatesLength + 2 ? 'setOpac-Zindex' : '']"></i>
        <span class="replay-text" :class="[animationIndex == templatesLength + 2 ? 'setOpac-Zindex' : '']">重新播放</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { POST, GET } from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
        more:false,
        goodsHeight:'',
        testData:'',
        animationIndex:-1,
//        authorNameShow:false,
      }
    },
    props: {
      article: {
        default: function () {
          return {hits: 0, title: "样例", nickName: "author", createDate: null }
        }
      },
      htmlStr: {
        default:""
      },
    },
    computed:{
      articleData: function () {
        return this.article;
      },
      templatesLength :function () {
        if(!utils.isNull(this.article.templates)){
          return this.article.templates.length
        }else{
          return 0;
        }
      },
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
      console.log('=');
      console.log(this.templates);
      this.goodsHeight = document.documentElement.clientWidth * 0.2;

    },
    mounted(){
//      执行动画
      this.doAnimation();
    },
    methods:{
//      内容动画
      pageAnimation(){
        let _this = this;
//        每过3.9秒渲染下一个content  绑定的动画持续时间为4s
        if (this.animationIndex < this.templatesLength + 2) {
          setTimeout(function () {
//            用animationIndex控制渲染哪一个content
            _this.animationIndex++;
            _this.$emit('sendAnimationIndex',_this.animationIndex);
            _this.pageAnimation();
          }, 3900)
        }

//        if(!_this.authorNameShow){
//          setTimeout(function () {
//            _this.authorNameShow = true;
//          },1000)
//        }

      },
      doAnimation(){
        this.animationIndex = 0 ;
        this.authorNameShow = false;
//      执行动画
        this.pageAnimation();
      }
    }
  }
</script>
