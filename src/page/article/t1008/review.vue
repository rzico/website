<template>
  <div class="review"   v-if="reviews.length > 0">
    <div class="list" >
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
<style>
  .t1008 .review {
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 8px solid rgba(218, 219, 184, 0.5);
    background-color: transparent;
    /*padding-top: 8px;*/
  }

  .t1008 .review .list {
    background-color: transparent;
    padding:0px 10px;
  }

  .t1008 .review .list .item {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0 15px;
    position: relative;
    border-bottom: 1px;
    border-bottom-color: #eee;
    border-bottom-style: solid;
  }
  .t1008 .review .list .item:last-child {
    border-bottom: 0px;
  }

  .t1008 .review .list .item .logo {
    float: left;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 50%;
  }

  .t1008 .review .list .item .content {
    overflow: hidden;
  }

  .t1008 .review .list .item .content .name {
    margin-top: 11px;
    font-size: 16px;
    line-height: 16px;
    color:#57bdec;
  }

  .t1008 .review .list .item .content p {
    margin-top: 0;
    font-size: 16px;
    color: #DADBB8;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    word-wrap: break-word;
  }

  .t1008 .review .list .item .content .time {
    margin-top: 11px;
    font-size: 12px;
    line-height: 16px;
    color: #A2A580;

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
