<template>
  <div class="article-meta" v-if="article.title != ''">
    <div class="well">
      <h1 class="title">{{article.title}}</h1>
        <span>阅读 <span class="read-count">{{article.hits}}</span></span>
      <p class="nickname">
                <span>
                    <span class="nigname" @click="jump(article.member.url,article.member.id)">{{article.author}}</span>
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
          return {hits: 0, title: "", nickName: "author", createDate: null}
        }
      },
    },
    created(){
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
