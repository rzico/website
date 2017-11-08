<template>
  <div>
    <div class="weui-cell" v-for="c in rewards">
      <div class="weui-cells-title"><span>本月</span></div>
      <div class="reward">
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
        <span class="createDate">{{c.createDate | fmtDate}}</span>
        <span class="amount">{{c.amount}}</span>
        <span class="memo">{{c.memo}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .weui-cell {
    flex-direction: column;
  }
</style>

<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        rewards:[
          {nickName:"张三的店",logo:"./static/logo.png",amount:489.45,memo:"推广好友佣金",createDate:33844559},
          {nickName:"张三的店",logo:"./static/logo.png",amount:489.45,memo:"推广好友佣金",createDate:33844559},
          {nickName:"张三的店",logo:"./static/logo.png",amount:489.45,memo:"推广好友佣金",createDate:33844559},
          {nickName:"张三的店",logo:"./static/logo.png",amount:489.45,memo:"推广好友佣金",createDate:33844559},
          {nickName:"张三的店",logo:"./static/logo.png",amount:489.45,memo:"推广好友佣金",createDate:33844559}
        ]
      }
    },
    filters:{
      fmtDate:function(val) {
          return utils.timefmt(val);
      }
    },
    components: {
      Toast,
    },
    created() {

    },
    methods:{
    }
  }
</script>

