<template>
  <div class="vote__root">
    <div class="vote">
      <div class="well">
        <div class="option-area">
          <h2 class="title">想买车吗<em>(单选)</em></h2>
          <p class="time">截止时间：长期有效</p>
          <ul class="unvote">
            <li class="">
            <i class="radio"></i>
            <p class="title">想</p>
            <!---->
          </li><li class="">
            <i class="radio"></i>
            <p class="title">不想</p>
            <!---->
          </li><li class="">
            <i class="radio"></i>
            <p class="title">没想法</p>
            <!----></li></ul></div>
        <button class="vote-btn">请在美篇或微信中投票</button>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        template:"1002",
      }
    },
//    filters: {
//      datetimefmt(val) {
//        return utils.datetimefmt(val);
//      }
//    },
    created(){
      console.log('1212');
      console.log(this.article);
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"样例",nickName:"author",createDate:null}
      }
      }
    },
    methods:{
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
