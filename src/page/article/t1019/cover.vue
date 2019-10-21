<template>
  <div class="cover">
    <div class="cover-zs">
      <div class="zs-left">
        <div class="leaf2">
        </div>
        <div class="leaf1">
        </div>
        <div class="leaf3">
        </div>
        <div class="leaf4">
        </div>
        <div class="wave1">
        </div>
        <div class="wave2">
        </div>
      </div>
      <div class="zs-center">
        <div class="leaf1">
        </div>
        <div class="leaf2">
        </div>
      </div>
      <div class="zs-right">
        <div class="leaf1">
        </div>
        <div class="leaf2">
        </div>
      </div>
      <div class="fish fish1">
      </div>
      <div class="fish fish2">
      </div>
    </div>
    <div class="well">

      <div class="article-meta">
        <div class="auther-header-box">
          <div class="auther-header">
            <img class="user-image" :src="article.member.logo" >                         </div>
          <div class="nickname" data-author-id="12119279" data-author-url="https://www.meipian.cn/c/12119279">
                            <span >
                                <span class="nigname">{{article.author}}</span>
                                <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                            </span>
          </div>
        </div>
        <span class="read-info">
                <span>{{article.createDate | datetimefmt}}</span>
                <div class="xs"></div>
                阅读数<span class="read-count">{{article.hits}}</span>
            </span>
        <h1 class="title line-clamp-3">{{article.title}}</h1>
        <div class="sign__root"><div class="sign"></div></div>
      </div>
      <hr>
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
