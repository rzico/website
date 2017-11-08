<template>
  <div>
    <div class="weui-cell">
      <div v-for="c in coupons" class="coupon" :class="c.color">
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
        <span class="nickName">{{c.nickName}}</span>
        <span class="name">{{c.name}}</span>
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
        coupons:[
          {nickName:"张三的店",logo:"./static/logo.png",name:"全场满100减50元",color:"c1",memo:"有效期:2017-09-91至2019-29-83"},
          {nickName:"张三的店",logo:"./static/logo.png",name:"全场满100减50元",color:"c2",memo:"有效期:2017-09-91至2019-29-83"},
          {nickName:"张三的店",logo:"./static/logo.png",name:"全场满100减50元",color:"c3",memo:"有效期:2017-09-91至2019-29-83"},
          {nickName:"张三的店",logo:"./static/logo.png",name:"全场满100减50元",color:"c4",memo:"有效期:2017-09-91至2019-29-83"}
            ]
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

