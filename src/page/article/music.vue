<template>
  <!--v-if="hasMusic()"-->
  <div class="music-icon " :class="[downloadShow ? '' : 'top19',isPlay ? 'music-icon-animation' : '',templateId == 1002 ? 't1002_musicIcon_bg':'']" v-if="hasMusic()" >
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
        isPlay:false,
        hasPlay:false,
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
    },
    methods: {
      hasMusic:function () {
        if (utils.isNull(this.musicData) || ("-1"==this.musicData.id)) {
          return  false;
        } else {
          return true;
        }
      },
      openPlayer: function(status){
        let _this = this;
        var audio = this.$el.querySelector('audio');
        if(this.isPlay){
          //close就是暂停播放录音。
          if(status == 'close'){
            return;
          }
          if(status == 'open'){
//            hasPlay 来记录播放录音前是否正在播放音乐
            _this.hasPlay = true;
          }else{
            this.hasPlay = false;
          }
          this.isPlay = false;
          audio.pause();
        }else{
          //open就是开始播放录音。
          if(status == 'open'){
            return;
          }
          if((status == 'open' || status == 'close') && !this.hasPlay ){
            console.log('===' + status);
            return;
          }
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
//              播放音乐时会走到该处
            }
          } else {
            // 播放中
            this.$emit("judgeMusic");
            _this.isPlay = true;
            _this.hasPlay = true;
          }
        }
      },
//      stopMuisc:function () {
//        let _this = this;
//        var audio = this.$el.querySelector('audio');
//        audio.pause();
//      }
    }
  }
</script>

