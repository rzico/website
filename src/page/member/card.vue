<template>
  <div>
    <div class="weui-cell">
      <div v-for="c in cards" class="card" :class="c.color">
        <img :src="card">
        <span class="name">{{c.name}}</span>
        <span class="code">{{c.code}}</span>
        <span class="descr">余额</span>
        <span class="balance">￥{{c.balance}}</span>
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
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
        card:"./static/card.png",
        cards:[{name:"张三的店",logo:"./static/logo.png",color:"c1",balance:2847,code:"163231 84933"},{name:"张三的店",logo:"./static/logo.png",color:"c2",balance:2847,code:"163231 84933"},{name:"张三的店",logo:"./static/logo.png",color:"c3",balance:2847,code:"163231 84933"}]
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
