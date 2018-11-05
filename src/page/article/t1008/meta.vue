<template>
  <div class="cover" v-if="article.title != ''">
    <div class="article-meta">
      <div class="well">
        <h1 class="title">{{article.title}}</h1>
        <p class="time-read">
          <span>{{article.createDate | datetimefmt}}</span>
          <span class="nickname"   @click="jump(article.member.url,article.member.id)">{{article.author}}</span>
          <span class="read">阅读&nbsp;<span class="read-count">{{article.hits}}</span></span>
          <span class="sign__root"><div class="sign"></div></span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .t1008 .title{
    color: #fff;
  }
  .t1008 .time-read{
    margin-top: 12px;
    color:#ced0ab;
  }
  .t1008 .cover{
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
      }
    },
    filters: {
      datetimefmt(val) {
        return utils.datetimeslash(val,true);
      }
    },
    props: {
//        article: { default: function () {
//          return ''
//        }
//        },
      article: {
        default: function () {
//           配合v-if控制渲染 title应该全设置为   点击设置标题  ，但是涉及太多模版，暂使用样例
          return {hits: 0, title: "", nickName: "author", createDate: null}
        }
      },
    },
    created(){
//        console.log(this.template);
    },
    methods:{
      hasArticle:function () {
//           alert(JSON.stringify(this.article));
        return true;
      },
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
