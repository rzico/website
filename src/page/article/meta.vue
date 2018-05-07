<template>
  <div class="article_meta" >
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
