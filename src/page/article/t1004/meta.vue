<template>
  <div class="ani-header" >
    <div class="header__root">
      <div class="avatar-stand-alone" @click="jump(article.member.url,article.member.id)" :class="[downloadShow ? '' : 'top19']">
        <a class="clearfix">
          <img :src="article.member.logo" alt="" class="avatar">
        </a>
      </div>
      <!--<div  class="music-icon" :class="[isPlay ? 'music-icon-animation' : '' , downloadShow ? '' : 'top19']"  v-if="hasMusic()" >-->
        <!--<audio id="audio" controls="controls" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'" style="display: none;"></audio>-->
        <!--<i class="iconfont icon-music" @click="openPlayer"></i>-->
      <!--</div>-->
      <div class="music-icon " :class="[downloadShow ? '' : 'top19',isPlay ? 'music-icon-animation' : '']" v-if="hasMusic()">
        <!--<audio id="audio" class="audio" autoplay preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"-->
        <!--style="display: none;"></audio>-->
        <audio id="audio"class="audio"  preload="auto" loop="loop" :src="'http://cdn.rzico.com/weex/resources/music/'+musicData.id+'.mp3'"
               style="display: none;"></audio>
        <i class="iconfont icon-yinlebofang icon-music" @click="openPlayer"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
        isPlay:false
      }
    },
    filters: {
      datetimefmt(val) {
        return utils.datetimefmt(val);
      }
    },
    props: {
      article: {
        default: function () {
          return {hits: 0, title: "样例", nickName: "author", createDate: null}
        }
      },
      musicData: { default: function () {
        return {id:""}
        }
      },
      downloadShow: {default:true}
    },
    created(){
      console.log(this.article);
    },
    methods:{
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      },
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
