<template>
    <div class="recommend">
        <div class="title">
            <i class="fl color-lump"></i>
            <h2 class="fl brilliant">推荐文章</h2>
        </div>
        <div class="list" v-for="rmmd in data">
            <div  class="item clearfix" style="padding: 7.5px 0 7.5px;" @click="articleclick(rmmd.id)">
                <div class="img fl" :style="'width:115px;height:70px;background-image:url('+rmmd.thumbnail+')'"></div>
                <div class="content">
                    <p style="height:43px;font-size:18px;">{{rmmd.title}}</p>
                    <div class="linkdesc"><i class="iconfont icon-yuedu"></i>{{rmmd.hits}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { POST, GET } from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
      data() {
        return {
          data:[]
        }
      },
      created() {
        var _this = this;
        let id = utils.getUrlParameter("id");
        GET('website/recommend/list.jhtml?articleId='+id+"&pageStart=0&pageSize=10").then(
          function (response) {
            if (response.type=="success") {
              _this.data = response.data.data;
            } else {
              _this.showToast("服务器繁忙");
            }
          }, function () {
            _this.showToast("网络不稳定");
          });

      },
      methods:{
        articleclick:function (id) {
          this.$router.push("");
        }
      }

    }
</script>
