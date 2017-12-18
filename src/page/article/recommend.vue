<template>
    <div class="recommend">
        <div class="title">
            <i class="fl color-lump"></i>
            <h2 class="fl brilliant">推荐文章</h2>
        </div>
        <div class="list" v-for="rmmd in data">
            <div  class="item clearfix" style="padding: 7.5px 0 7.5px;" @click="articleclick(rmmd.id,rmmd.url)">
                <div class="img fl" :style="'width:115px;height:70px;background-image:url('+ thumbnail(rmmd.thumbnail,115,70)+')'"></div>
                <div class="content">
                    <p style="height:43px;font-size:18px;">{{rmmd.title}}</p>
                    <div class="linkdesc">
                      <i class="iconfont icon-my-yanjing-on"></i>
                      <span style="position: absolute;top: 62px;">&nbsp;{{rmmd.hits}}</span>
                    </div>
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
      mounted() {
        var _this = this;
        let id = utils.getUrlParameter("id");
        setTimeout(function () {
          _this.open(id);
        },4000);
      },
      methods:{
        articleclick:function (id,url) {
          if(utils.isweex()){
             location.href = 'yundian://article?id=' + id;
          }else{
             this.$emit("go",id);
            //this.$router.push(utils.router(url));
          }
        },
        thumbnail:function (url,w,h) {
          return  utils.thumbnail(url,w,h);
        },
        open:function (id) {
          var _this = this;
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
        }
      }

    }
</script>
