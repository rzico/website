<template>
  <div class="article-meta" style="position: relative;">
    <div class="well">
      <h1 class="title">{{article.title}}</h1>
      <p class="time-read">
        <span>{{article.createDate | datetimefmt}}</span>
        <span>阅读 <span class="read-count">({{article.hits}})</span></span>
      </p>
      <p class="nickname" >
                <span>
                    <span class="nigname" @click="jump(article.member.url,article.member.id)">{{article.shareNickName}}给您拜年了!</span>
                  <!--<span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>-->
                </span>
      </p>
      <div class="sign__root"><div class="sign"></div></div>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
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
    },
    created(){
      console.log(this.template);
    },
    methods:{
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      }
    }
  }
</script>
