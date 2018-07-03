<template>
  <div class="article_meta" v-if="article.title != '点击设置标题'">
    <h1 class="meta_title">{{article.title}}</h1>
    <div class="meta clearfix">
      <span>{{article.createDate | datetimefmt}}</span>
      <span class="nickname"><a class="toappuser" @click="jump(article.member.url,article.member.id)">{{article.author}}</a></span>
      <span>阅读({{article.hits}})</span>
    </div>
  </div>
</template>
<script>
  import utils from '../../assets/utils.js';
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
//        article: { default: function () {
//          return ''
//        }
//        },
        article: {
          default: function () {
//           配合v-if控制渲染 title应该全设置为   点击设置标题  ，但是涉及太多模版，暂使用样例  6.19更改为点击设置标题
            return {hits: 0, title: "点击设置标题", nickName: "author", createDate: null}
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
