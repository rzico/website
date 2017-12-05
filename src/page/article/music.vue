<template>
    <div class="music-icon" :class="[downloadShow ? '' : 'top19']" v-if="hasMusic">
        <audio id="audio" class="audio" autoplay preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"
               style="display: none;"></audio>
        <i class="iconfont icon-yinlebofang icon-music" @click="openPlayer"></i>
    </div>
</template>

<script>
  import utils from '../../assets/utils.js';
  export default {
    props: {
      musicData: { default: function () {
        return {id:""}
      }
      },
      downloadShow: {default:true}
    },
    methods: {
      hasMusic:function () {
        if (utils.isNull(this.musicData) || ("-1"==this.musicData.id)) {
           return false;
        } else {
           return true;
        }
      },
      created () {
      },
      openPlayer: function(){
        var audio = this.$el.querySelector('audio');
        audio.play();
      }
    }
  }
</script>
