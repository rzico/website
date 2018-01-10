<template>
  <div class="music-icon " :class="[downloadShow ? '' : 'top19',isPlay ? 'music-icon-animation' : '']" v-if="hasMusic()">
    <!--<audio id="audio" class="audio" autoplay preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"-->
    <!--style="display: none;"></audio>-->
    <audio id="audio"class="audio"  preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"
           style="display: none;"></audio>
    <i class="iconfont icon-yinlebofang icon-music" @click="openPlayer"></i>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
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
        return {id:""}
      }
      },
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

