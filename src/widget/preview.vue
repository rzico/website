<template>
  <div class="pswp zIndex"  tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container" >
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!--暂时先注释。6.30 直到app更新后-->
      <div class="saveImg" v-if="showSave">
        <p  @touchstart="saveImg()">
          保存图片
        </p>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import PhotoSwipe from  "../../node_modules/_vue-preview@1.0.5@vue-preview/node_modules/photoswipe/dist/photoswipe";
  import UI from  "../../node_modules/_vue-preview@1.0.5@vue-preview/node_modules/photoswipe/dist/photoswipe-ui-default";
  import utils from '../assets/utils';
  export default {
    data(){
      return{
        thumbnailSrc:'',
        imgList:[],
        timeOutEvent:0,//定时器
        clicked:false,
        showSave:false,
      }
    },
    methods: {
      open (index, list, params = {
        captionEl: false,
        fullscreenEl: false,
        history: false,
        shareEl: false,
        tapToClose: true,
      }) {
        let options = Object.assign({
          index: index,
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.preview-img')[index];
//            有的图片虽然加在了预览数组里，但是其img dom并没有渲染出来，所以要判空。当没有渲染时将上次的dom赋值进去thumbnail 避免出错。18.02.02 柯
            if(thumbnail == null || thumbnail == undefined || thumbnail == '' || thumbnail == 'null' || thumbnail == '<null>'){
              thumbnail = this.thumbnailSrc;
            }else{
              this.thumbnailSrc = thumbnail;
            }
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }, params)
        this.photoswipe = new PhotoSwipe(this.$el, UI, list, options)
        this.photoswipe.init()
        if(this.imgList == '' || this.imgList == null || this.imgList == 'undefined'){
          this.imgList = list;
        }

//        区分是weex还是web。只提供weex下的保存图片
        if(!this.showSave && utils.isweex()){
          this.showSave = true;
        }
      },
      close () {
        this.photoswipe.close()
      },
//      gtouchstart:function gtouchstart(e){
//        console.log('手机触摸开始');
//        console.log(e);
//        let _this = this;
//        this.timeOutEvent = setTimeout(function(){
//          _this.longPress(e)
//        },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
//        return false;
//      },
//      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
//      gtouchend:function gtouchend(item){
//
//        console.log('手指释放');
//        clearTimeout(this.timeOutEvent);//清除定时器
//        if(this.timeOutEvent!=0){
//          //这里写要执行的内容（尤如onclick事件）
////          vm.goChat(item);
//        }
//        return false;
//      },
//      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
//      gtouchmove:function gtouchmove(){
//        console.log('手指有移动');
//        clearTimeout(this.timeOutEvent);//清除定时器
//        this.timeOutEvent = 0;
//
//      },
//
//      //真正长按后应该执行的内容
//      longPress:function longPress(item){
//        console.log('真正长按后应该执行的内容');
//
//        this.timeOutEvent = 0;
//        //执行长按要执行的内容，如弹出菜单
////        $api.css($api.dom('.Popup'), 'display:block');
//      },

//      保存图片
      saveImg(){
        let _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        setTimeout(function () {
          let chooseIndex = document.querySelector('.pswp__counter').innerHTML.toString().substring(0,1);
          location.href =  'mopian://saveImage?url=' + encodeURIComponent(_this.imgList[chooseIndex - 1].src);
        },500)
      },
    }
  }
</script>

<style>
  @import "../../node_modules/_vue-preview@1.0.5@vue-preview/node_modules/photoswipe/dist/photoswipe.css";
  @import "../../node_modules/_vue-preview@1.0.5@vue-preview/node_modules/photoswipe/dist/default-skin/default-skin.css";
  .zIndex{
    z-index: 99999999999991 !important;
  }
  .saveImg{
    z-index: 99999999999992 !important;
    position: absolute;bottom:20px;width: 100%;height: 56px;font-size: 14px;line-height: 56px;color: #fff;
    font-weight: 100;
  }
  .saveImg p{
    width:100px;
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    text-align: center;
  }
</style>
