<template>
  <div class="recommend"  v-if="hasData()">
    <div class="title">
      <i class="fl color-lump" ></i>
      <h2 class="fl brilliant"  >推荐文章</h2>
    </div>
    <div class="list" v-for="rmmd in data">
      <div  class="item clearfix" style="padding: 7.5px 0 7.5px;" @click="articleclick(rmmd.id,rmmd.url)">
        <div class="img fl" :style="'width:115px;height:70px;background-image:url('+ thumbnail(rmmd.thumbnail,115,70)+')'"></div>
        <div class="content">
          <p style="height:43px;font-size:18px;" >{{rmmd.title}}</p>
          <div class="linkdesc" >
            <i class="iconfont icon-my-yanjing-on"></i>
            <span style="position: absolute;top: 62px;">&nbsp;{{rmmd.hits}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
   .recommend {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
     margin-right: 23px;
     margin-left: 23px;
    padding: 8px 15px;
    border-top: 8px;
    border-top-color: #f5f6f9;
    border-top-style: solid;
  }
   .recommend .title {
    margin-bottom: 5px;
    height: 16px;
  }
   .recommend .title i {
    background-color: #2887F0;
    width: 3px;
    height: 100%;
  }

   .recommend .title h2 {
    line-height: 16px;
    font-size: 16px;
    text-indent: 12px;
    font-weight: 400;
    color: #4F4F4F;
  }

   .recommend .list {
    padding: 5px 0 0;
  }

   .recommend .list .item {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0 15px;
    position: relative;
  }

   .recommend .list .item .img {
    width: 75px;
    height: 50px;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    margin-right: 10px;
  }

   .recommend .list .item .content {
    width: 100%;
    overflow: inherit;
  }

   .recommend .list .item .content p {
    margin-top: 0;
    -webkit-line-clamp: 2;
    font-size: 16px;
    color: #4F4F4F;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    word-wrap: break-word;
  }

   .recommend .list .item .content .linkdesc {
    margin-top: 11px;
    font-size: 12px;
    line-height: 16px;
    color: #D5D5D5;
  }

</style>
<script>
  import { POST, GET } from '../../../assets/fetch.js';
  import utils from '../../../assets/utils.js';
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
    props: {
      templateId:{default:1001}
    },
    methods:{
      hasData(){
        if(utils.isNull(this.data)){
          return false;
        }else{
          return true;
        }
      },
      articleclick:function (id,url) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('article',id);
        }else{
          location.href = url;
          // this.$emit("go",id);
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
