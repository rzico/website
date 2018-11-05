<template>
  <div class="cover" v-if="article.title != ''">
    <div class="header">
      <div class="bubble" style=" width: 18.5949px; height: 18.5949px; background-size: 100%; position: absolute; left: 57.0306px; animation-name: move; animation-duration: 3.35844s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 19.9047px; height: 19.9047px; background-size: 100%; position: absolute; left: 267.54px; animation-name: move; animation-duration: 5.02037s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 21.4583px; height: 21.4583px; background-size: 100%; position: absolute; left: 270.388px; animation-name: move; animation-duration: 6.73604s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 21.3912px; height: 21.3912px; background-size: 100%; position: absolute; left: 131.446px; animation-name: move; animation-duration: 5.0939s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 24.4875px; height: 24.4875px; background-size: 100%; position: absolute; left: 338.566px; animation-name: move; animation-duration: 5.46829s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 17.6791px; height: 17.6791px; background-size: 100%; position: absolute; left: 237.841px; animation-name: move; animation-duration: 3.33545s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 18.9424px; height: 18.9424px; background-size: 100%; position: absolute; left: 203.518px; animation-name: move; animation-duration: 6.73478s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 16.3397px; height: 16.3397px; background-size: 100%; position: absolute; left: 14.3177px; animation-name: move; animation-duration: 4.44137s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 24.5756px; height: 24.5756px; background-size: 100%; position: absolute; left: 362.857px; animation-name: move; animation-duration: 6.45974s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 19.5467px; height: 19.5467px; background-size: 100%; position: absolute; left: 208.049px; animation-name: move; animation-duration: 5.7876s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 18.4946px; height: 18.4946px; background-size: 100%; position: absolute; left: 368.405px; animation-name: move; animation-duration: 4.71518s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 21.1654px; height: 21.1654px; background-size: 100%; position: absolute; left: 30.3606px; animation-name: move; animation-duration: 6.99258s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 20.0037px; height: 20.0037px; background-size: 100%; position: absolute; left: 187.519px; animation-name: move; animation-duration: 4.17719s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 18.4549px; height: 18.4549px; background-size: 100%; position: absolute; left: 91.9239px; animation-name: move; animation-duration: 3.56031s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 24.0106px; height: 24.0106px; background-size: 100%; position: absolute; left: 139.896px; animation-name: move; animation-duration: 3.74877s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div><div class="bubble" style=" width: 21.7938px; height: 21.7938px; background-size: 100%; position: absolute; left: 321.644px; animation-name: move; animation-duration: 4.69139s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; animation-direction: normal;"></div></div>
    <div class="article-meta">
      <div class="well">
        <h1 class="title">{{article.title}}</h1>
        <p class="nickname" >
                    <span @click="jump(article.member.url,article.member.id)">
                        <span class="nigname">{{article.author}}</span>
                        <span class="focus__root"><div class="focus"><a class="clearfix">关注</a></div></span>
                    </span>
        </p>
        <p class="time-read">
          <span>{{article.createDate | datetimefmt}}</span>
          <span class="read">阅读 <span class="read-count">{{article.hits}}</span></span>
        </p>
      </div>
    </div>
  </div>
</template>
<style>
  .t1027 .bubble{
    background-image: url(../../../img/t1027/1027_bubble.png);
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
