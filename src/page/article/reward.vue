<template>
  <div class="reward" style="display: block;" v-if="isReward">
    <div class="flex-c">
    <div class="hint">如果喜欢我的作品，请赞赏鼓励！</div>
    <div class="rewardButton" @click="showDialog()">赞赏</div>
    </div>
    <!--<div class="number">1人赞赏</div>-->
    <div class="wrap" style="position: relative;overflow: hidden" v-if="recordsTotal!== 0">
      <ul v-for="(reward,index) in rewards"  :style="styleObject(index)" style="list-style:none">
      <li class="img" :style="'width:30px;height:30px; border-radius: 100%;background-image:url('+reward.logo+');background-size:100% 100%;background-color:red'"></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
   .reward {
    display: none;
    padding-top: 10px;
    text-align: center;
     margin-left: 23px;
     margin-right: 23px;
  }


   .reward .flex-c .hint {
    font-size:12px;
    display: inline-block;
    line-height: 12px;
    color:#999
  }

   .reward .number {
    font-size:10px;
    display: inline-block;
    line-height: 10px;
    color:#ccc

  }

   .reward .flex-c .rewardButton {
     margin-top: 10px;
    font-size:16px;
    width:60px;
    height: 30px;
    text-align: center;
    line-height:30px;
    background-color:indianred;
    border: 1px solid #ccc;
    color: white;
    border-radius: 3px;
  }

   .reward .wrap {
    margin-top: 10px;
    text-align: center;
    height: 30px;
  }
  .flex-c{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
<script>
  import { POST, GET } from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        rewards: [],
        recordsTotal:0
      }
    },
    props: {
      article: {
        default: function () {
          return {isReward: false}
        }
      },
    },
    mounted() {
      var _this = this;
      let id = utils.getUrlParameter("id");
      setTimeout(function () {
        _this.open(id);
      },2000);
    },
    methods: {
      styleObject: function (index) {
        if(this.rewards.length <= 5){
          return;
        }else{
          let rewardsLength = this.rewards.length;
          let leftLength = 10 - rewardsLength/30;
          return {
            left: -leftLength * index + ((rewardsLength-1) * leftLength)/2 + 'px',
            position:'relative'
          }
        }

        if (this.rewards.length > 10) {
          return {
            left: 15 * index + 'px',
            position:'relative',
            top:0 + 'px'
          }
        }
      },
      showDialog: function () {
        this.$emit("showDialog");
      },
      open:function (id) {
        var _this = this;
        GET('website/reward/list.jhtml?articleId=' + id + "&pageStart=0&pageSize=10").then(
          function (response) {
            if (response.type == "success") {
              _this.rewards = response.data.data;
              _this.recordsTotal = response.data.recordsTotal
            } else {
              _this.showToast("服务器繁忙");
            }
          }, function () {
            _this.showToast("网络不稳定");
          });

      }
    }
  }
</script>
