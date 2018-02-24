<template>
  <div class="review" v-if="reviews.length > 0">
    <div class="list" style="background-color: #fff;" >
      <div class="item"  v-for="review in reviews" >
        <div class="logo"
             :style="'width:30px;height:30px;background-image:url('+thumbnail(review.logo,30,30)+')'"></div>
        <div class="content">
          <span class="name" >{{review.nickName}}</span>
          <p class="text">{{review.content}}</p>
          <span class="time">{{review.createDate | timefmt}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
   .review {
     margin-right: 23px;
     margin-left: 23px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f5f6f9;
    padding-top: 8px;
  }

   .review .list {
    background-color: #fff;
    padding:0px 10px;
  }

   .review .list .item {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0 15px;
    position: relative;
    border-bottom: 1px;
    border-bottom-color: #eee;
    border-bottom-style: solid;
  }
   .review .list .item:last-child {
    border-bottom: 0px;
  }

   .review .list .item .logo {
    float: left;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 50%;
  }

   .review .list .item .content {
    overflow: hidden;
  }

   .review .list .item .content .name {
    margin-top: 11px;
    font-size: 16px;
    line-height: 16px;
    color:darkblue;
  }

   .review .list .item .content p {
    margin-top: 0;
    font-size: 16px;
    color: #4F4F4F;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    word-wrap: break-word;
  }

   .review .list .item .content .time {
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
        reviews:[]
      }
    },
    filters: {
      timefmt(val) {
        return utils.datetimefmt(val);
      }
    },
    props: {
      templateId:{default:1001}
    },
    mounted () {
      var _this = this;
      let id = utils.getUrlParameter("id");
      setTimeout(function () {
        _this.open(id);
      },2000);
    },
    methods:{
      thumbnail:function (url,w,h) {
        return utils.thumbnail(url,w,h);
      },
      open:function (id) {
        var _this = this;
        GET('website/review/list.jhtml?articleId='+id+"&pageStart=0&pageSize=10").then(
          function (response) {
            if (response.type=="success") {
              _this.reviews = response.data.data;
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
