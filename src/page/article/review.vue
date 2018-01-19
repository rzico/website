<template>
  <div class="review"  :class="[templateId == 1003] ? 't1003_Bg_bottom' : ''">
    <div class="list" style="background-color: #fff;"  :class="[templateId == 1003] ? 't1003_Bg_up' : ''">
      <div class="item"  v-for="review in reviews" >
        <div class="logo"
             :style="'width:30px;height:30px;background-image:url('+thumbnail(review.logo,30,30)+')'"></div>
        <div class="content">
          <span class="name">{{review.nickName}}</span>
          <p class="text">{{review.content}}</p>
          <span class="time">{{review.createDate | timefmt}}</span>
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
