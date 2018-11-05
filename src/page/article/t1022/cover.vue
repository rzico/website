<template>
  <div class="cover" v-if="article.title != ''">
    <div class="article-meta">
      <div class="auther-header-box">
        <div class="auther-header">
          <img class="user-image" :src="article.member.logo">             </div>
        <div class="nickname">
                <span @click="jump(article.member.url,article.member.id)">
                    <span class="nigname">{{article.author}}</span>
                    <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                </span>
        </div>
      </div>
      <div class="well">
        <h1 class="title line-clamp-4">{{article.title}}</h1>
        <span class="read-info">
                <span>{{article.createDate | datetimefmt}}</span>
                阅读数
                <span class="read-count">{{article.hits}}</span>
            </span>
        <div class="sign__root"><div class="sign"></div></div>
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
