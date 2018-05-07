<template>
  <div class="container">
    <div class="page slideIn bg" >
      <div class="content" v-for="c in lists" @click="jump(c.id)">
        <div class="logo">
          <img class="img" :src="c.logo"/>
        </div>
        <div class="information">
          <div class="top">
            <span class="cardNumber">{{c.code | watchCode}}</span>
            <span class="cardMoney">余额:{{c.balance}}元</span>
          </div>
          <span class="cardName">{{c.name}}会员卡</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
  }
  .content{
    height: 100px;
    background-color:#EB4E40;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    box-sizing: border-box;
  }
  .content .logo{
    display: flex;
    flex:1;
    align-items: center;
    justify-content: center;
  }
  .content .logo .img{
    height: 40px;
    width: 40px;
    background-color: #eeeeee;
    border-radius: 20px;
  }
  .content .information{
    display: flex;
    flex:5;
    flex-direction: column;
    padding-right: 20px;
  }
  .content .information .top{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content .information .top .cardNumber{
    font-size: 16px;
    color: white;
  }
  .content .information .top .cardMoney{
    font-size: 14px;
    color: white;
  }
  .content .information .cardName{
    font-size: 20px;
    color: white;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data () {
      return {
        lists:[],
      }
    },
    components: {

    },
    filters: {
      watchCode:function (value) {
        return value.substr(-6)
      }
    },
    created() {
      this.open()
    },
    methods:{
      open:function () {
        let _this =this;
        GET("website/member/card/list.jhtml").then(
          function (res) {
            if (res.type=='success') {
              _this.lists = res.data;
            }
          },
          function (err) {
          }
        )
      },
      jump:function(cid) {
        this.$router.push({name:"member",query:{card_id:cid}});
      }
    }
  }
</script>
