<template>
  <div class="bg">
    <div class="top marbottom15" v-for="num in lists">
      <div class="flex-r" style="height: 60px;border-width: 0 0 1px 0;border-color: #cccccc;border-style: dashed">
        <span class="f30 color">{{num.amount}}</span>
        <span class="f16">{{num.name}}</span>
        <div class="button" @click="jump(num.id)">
          <span class="f14" style="color:#ffffff">去领取</span>
        </div>
      </div>
      <div class="flex-r" style="height: 40px">
        <span class="f12 color ">优惠券</span>
        <div style="display: flex;display: -webkit-flex;flex-direction: row;align-items: center;">
        <span class="f12" style="color: #cccccc">{{num.beginDate |timeDatefmt}}</span>
          <span class="f12" style="color: #cccccc">至</span>
        <span class="f12" style="color: #cccccc">{{num.endDate |timeDatefmt}}</span>
        </div>
      </div>
      <!--两个小半圆-->
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
    width: 100%;
    padding-top: 10px;

  }
  .top{
    position: relative;
    background-color: white;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    border-radius: 3px;
  }
  .left{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    top: 55px;
    left: -5px;
  }
  .right{
    height: 10px;
    width: 10px;
    border-radius:5px;
    background-color: #eeeeee;
    position: absolute;
    top: 55px;
    right: -5px;
  }
  .f30{
    font-size: 30px;
  }
  .f16{
    font-size: 16px;
  }
  .f14{
    font-size: 14px;
  }
  .f12{
    font-size: 12px;
  }
  .flex-r{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .marbottom15{
    margin-bottom: 15px;
  }
  .button{
    padding-left: 5px;
    padding-right: 5px;
    background-color:#EB4E40;
    border-radius: 3px;
  }
  .color{
    color:#EB4E40
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
        lists:[{}],
      }
    },
    components: {
      Toast
    },
    filters: {
      timeDatefmt(val) {
        return utils.timeDatefmt(val);
      },
      logoImg:function(value) {
        if (utils.isNull(value)) {
          return "";
        } else {
          return utils.thumbnail(value,utils.screenWidth(),150,150);
        }
      }
    },
    props: {
      article: { default: function () {}}
    },
    mounted () {
    },
    methods:{

      open:function (id) {
        let _this =this;
        GET("website/coupon/list.jhtml?authorId="+id).then(
          function (res) {
            if (res.type=='success') {
                _this.lists = res.data.data;
            }
          },
          function (err) {
          }
        )
      },
      jump:function(id) {
        this.$router.push({name:"activate",query:{id:id}});
      }
    }
  }
</script>
