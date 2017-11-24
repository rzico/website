<template>
  <div>
    <div class="weui_cell" v-if="hasCard()">
      <div v-for="c in cards" class="card" :class="c.color" @click="openCard(c.id)">
        <img :src="card">
        <span class="name">{{c.name}}</span>
        <span class="code">{{c.code | codefmt}}</span>
        <span class="descr">余额</span>
        <span class="balance">￥{{c.balance}}</span>
        <span class="logo" :style="'background-image: url('+c.logo+')'"></span>
      </div>
    </div>
    <div class="noData" v-else>
        <i class="iconfont icon-tishi"></i>
        <span>没有领取会员卡</span>
    </div>
  </div>
</template>
<style scoped>
  .weui_cell {
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
        cards:[]
      }
    },
    components: {
      Toast,
    },
    created() {
      this.load();
    },
    filters:{
      codefmt:function (val) {
        if (utils.isNull(val)) {
          return val;
        } else  {
          return val.substr(0,11)+"  "+val.substr(11);
        }
      }
    } ,
    methods:{
      hasCard:function () {
         return this.cards.length>0;
      },
      load:function () {
          var _this = this;
          GET("website/member/card/list.jhtml").then(
              function (res) {
                 if (res.type=='success') {
                    _this.cards = res.data;
                 }
              },
              function (err) {

              }
          )
      },
      openCard:function(cid) {
          this.$router.push({name:"card",query:{id:cid}});
      }
    }
  }
</script>
