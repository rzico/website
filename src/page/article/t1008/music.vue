<template>
  <!--v-if="hasMusic()"-->
  <div class="music-icon" :class="[isPlay ? 'music-icon-animation' : '']" v-if="hasMusic()">
    <!--<audio id="audio" class="audio" autoplay preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"-->
    <!--style="display: none;"></audio>-->
    <audio id="audio"class="audio"  preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"
           style="display: none;"></audio>
    <i class="iconfont icon-yinlebofang icon-music" @click="openPlayer"></i>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style>
 .t1008 .music-icon {
    width:32px;
    height:32px;
    position: fixed;
    top: 19px;
    z-index: 1;
    right: 19px;
    /*rgba(206, 208, 175, 0.8)*/
    background-color: rgba(206, 208, 175, 0.8);
    border-radius: 50%;
  }
 .t1008 .music-icon-animation{
    -webkit-animation: musicIcon 2s infinite linear;
    animation: musicIcon 2s infinite linear;
  }
 .t1008 .top19 {
    top: 19px !important;
  }
 .t1008 .music-icon .icon-music {
    width:32px ;
    height: 32px ;
    color: #fff;
    font-size: 32px;
    line-height: 100%;
  }
  /*定义动画*/
  @-webkit-keyframes musicIcon { /*兼容性写法。spin是关键帧的动画名称*/
    from { /*动画起始状态*/
      -webkit-transform: rotate(0deg);
    }
    to { /*动画结束状态*/
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes musicIcon {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>
<script>
  import utils from '../../../assets/utils.js';
  import Toast from '../../../widget/toast.vue';
  export default {
    data () {
      return {
        isPlay:false
      }
    },
    components: {
      Toast,
    },
    props: {
      musicData: { default: function () {
        return {id:"-1"}
      }
      },
      templateId:{default:1001},
      downloadShow: {default:true}
    },
    created () {
      console.log(this.musicData);
    },
    methods: {
      hasMusic:function () {
        if (utils.isNull(this.musicData) || ("-1"==this.musicData.id)) {
          return  false;
        } else {
          return true;
        }
      },
      openPlayer: function(){
        let _this = this;
        var audio = this.$el.querySelector('audio');
        if(this.isPlay){
          this.isPlay = false;
          audio.pause();
        }else{
          audio.play();
          if (audio.paused) {
            // 暂停中
            audio.play();
            if (audio.paused) {
              // 暂停中
              audio.play();
            } else {
              // 播放中
              this.$emit("judgeMusic");
              _this.isPlay = true;
            }
          } else {
            // 播放中
            this.$emit("judgeMusic");
            _this.isPlay = true;
          }
        }
      }
    }
  }
</script>

