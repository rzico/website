<template>
  <div class="reward" style="display: block;">
    <div class="flex-c">
      <div class="hint">报名参与活动，请点赞！</div>
      <div class="rewardButton" @click="golaud()">{{luadName}}</div>
    </div>
    <!--<div class="number">1人赞赏</div>-->
    <div class="wrap" style="position: relative;" v-if="recordsTotal!== 0">
      <div class="title" @click="luadControl()">
        <span class="titleSpan">已有<span style="font-size: 16px;font-weight: bold;color:red">  {{count}}  </span>人参与</span>
        <span class="ico" :style="{fontFamily:'iconfont'}">&#xe601;</span>
      </div>
      <div class="content" v-for="c in laudList" v-if="listControl">
        <div style="display: flex;flex-direction: row;align-items: center">
        <img class="img" :src="c.logo">
        <span class="nickName">{{c.nickName}}</span>
        </div>
        <span class="date">{{c.createDate | datetimefmt}}</span>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .reward {
    display: none;
    padding-top: 10px;
    text-align: center;
    margin-left: 23px;
    margin-right: 23px;
    margin-top: 10px;
    border:1px solid #eeeeee;
    border-radius: 5px;
  }


  .reward .flex-c .hint {
    font-size:12px;
    display: inline-block;
    line-height: 12px;
    color:#999
  }
  .reward .flex-c .rewardButton {
    margin-top: 10px;
    margin-bottom: 10px;
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
    text-align: center;

  }
  .reward .wrap .content{
    height: 40px;
    padding-left: 5px;
    padding-right: 5px;
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: #eeeeee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
   .img{
    height: 20px;
    width: 20px;
    border-radius: 3px;
    background-color: #eeeeee;
  }
   .nickName{
     margin-left: 10px;
     font-size: 14px;
     overflow: hidden;
     -o-text-overflow: ellipsis;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 1;
     -webkit-box-orient: vertical;
     word-break: break-all;
   }
   .date{
     font-size: 14px;
     color: #cccccc;
   }
   .title{
     height: 40px;
     padding-left: 5px;
     padding-right: 5px;
     border-width: 1px 0 0 0;
     border-color: #eeeeee;
     border-style: solid;
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
   }
   .ico{
     font-size: 16px;
     color: #cccccc;
   }
   .titleSpan{
     font-size: 14px;
     color:#999
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
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        rewards: [],
        recordsTotal:0,
        id:'',
        pageStart:0,
        pageSize:10,
        luadName:'点赞',
        listControl:true,
        isLaud:false,
        count:0
      }
    },
    components: {
      Toast
    },
    mounted() {
      var _this = this;
      this.id = utils.getUrlParameter("id");
      this.getLuad();
      setTimeout(function () {
        _this.open();
      },2000);
    },
    filters: {
      datetimefmt(val) {
        return utils.datetimefmt(val);
      },
      logoImg:function(value) {
        if (utils.isNull(value)) {
          return "";
        } else {
          return utils.thumbnail(value,30,30);
        }
      }
    },
    methods: {
//      控制报名列表
      luadControl:function () {
        this.listControl = !this.listControl
      },
//      styleObject: function (index) {
//        if(this.rewards.length <= 5){
//          return;
//        }else{
//          let rewardsLength = this.rewards.length;
//          let leftLength = 10 - rewardsLength/30;
//          return {
//            left: -leftLength * index + ((rewardsLength-1) * leftLength)/2 + 'px',
//            position:'relative'
//          }
//        }
//
//        if (this.rewards.length > 10) {
//          return {
//            left: 15 * index + 'px',
//            position:'relative',
//            top:0 + 'px'
//          }
//        }
//      },
      golaud: function () {
        if(this.isLaud == false) {
          let _this = this;
          POST('website/member/laud/add.jhtml?articleId=' + this.id).then(
            function (data) {
              if (data.type == 'success') {
                _this.open();
                _this.isLaud = true;
                _this.luadName = '已点赞'
              } else {
                _this.$refs.toast.show(data.content);
              }
            }, function (err) {
              _this.$refs.toast.show(err.content);
            }
          )
        }else {
          let _this = this;
          POST('website/member/laud/delete.jhtml?articleId=' + this.id).then(
            function (data) {
              if(data.type == 'success'){
                _this.isLaud = false;
                _this.open();
                _this.luadName = '点赞'
              }else{
                event.toast(data.content);
              }
            },function (err) {
              event.toast(err.content);
            }
          )
        }
      },
      //      获取是否点赞
      getLuad:function () {
        var _this = this;
        GET('website/laud/view.jhtml?articleId=' + this.id ).then(
          function (data) {
            if (data.type == "success") {
              _this.isLaud = data.data.laud;
              _this.count = data.data.count;
              if(_this.isLaud == true) {
                _this.luadName = '已点赞'
              }else{
                _this.luadName = '点赞'
              }
            } else {
              _this.showToast("服务器繁忙");
            }
          }, function () {
            _this.showToast("网络不稳定");
          });

      },
      open:function () {
        var _this = this;
        GET('website/laud/list.jhtml?articleId=' + this.id +'&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize).then(
          function (response) {
            if (response.type == "success") {
              if (_this.pageStart == 0) {
                _this.laudList = response.data.data;
              }else{
                response.data.data.forEach(function (item) {
                  _this.laudList.push(item);
                })
              }
              _this.recordsTotal = response.data.recordsTotal
            } else {
              _this.$refs.toast.show("服务器繁忙");
            }
          }, function () {
            _this.$refs.toast.show("服务器繁忙");
          });

      }
    }
  }
</script>
