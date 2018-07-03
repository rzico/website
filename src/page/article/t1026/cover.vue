<template>
  <div class="cover">
    <div class="header">
    </div>
    <div class="auther-header-box">
      <div class="auther-header">
        <img class="user-image" :src="article.member.logo">
      </div>
    </div>
    <div class="article-meta">
      <div class="well">
        <h1 class="title">{{article.title}}</h1>
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
        return utils.timeDatefmt(val);
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
          return {hits: 0, title: "样例", nickName: "author", createDate: null}
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
