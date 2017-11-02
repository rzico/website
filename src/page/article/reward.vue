<template>
  <div class="reward" style="display: block;">
    <div class="hint">如果喜欢我的作品，请赞赏鼓励！</div>
    <div class="button" @click="showDialog()">赞赏</div>
    <!--<div class="number">1人赞赏</div>-->
    <div class="wrap" style="position: relative;overflow: hidden">
      <ul v-for="(reward,index) in rewards"  :style="styleObject(index)">
      <li class="img" :style="'width:30px;height:30px;background-image:url('+reward.logo+');background-color:red'"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { POST, GET } from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {rewards: []}
    },
    created() {
      var _this = this;
      let id = utils.getUrlParameter("id");
      GET('website/reward/list.jhtml?articleId=' + id + "&pageStart=0&pageSize=10").then(
        function (response) {
          if (response.type == "success") {
              _this.rewards = response.data.data;
          } else {
            _this.showToast("服务器繁忙");
          }
        }, function () {
          _this.showToast("网络不稳定");
        });

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
      }
    }
  }
</script>
