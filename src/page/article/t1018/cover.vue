<template>
  <div class="cover" v-if="article.title != ''">
    <div class="leaf-l-1"></div>
    <div class="leaf-l-2"></div>
    <div class="leaf-l-3"></div>
    <div class="leaf-r-1"></div>
    <div class="leaf-r-2"></div>
    <div class="leaf-r-3"></div>
    <div class="header">
      <div class="img-container">
        <div class="avatar">
          <img :src="article.member.logo" alt="">
        </div>
      </div>
    </div>
    <div class="article-meta">
      <div class="well">
        <p class="nickname">
                    <span @click="jump(article.member.url,article.member.id)">
                        <span class="nigname">{{article.author}}</span>
                        <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                    </span>
        </p>
        <p class="time-read">
          <span>{{article.createDate | datetimefmt}}</span>
          <span>阅读 <span class="read-count">{{article.hits}}</span></span>
        </p>
        <h1 class="title">{{article.title}}</h1>
      </div>
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
        return utils.datetimeslash(val,1);
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
