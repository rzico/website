<template>
  <div class="header">
    <mt-swipe ref="swipe" class="swipe" :auto="4000" v-if="changeIstop()">
        <mt-swipe-item v-for="c in listImg" :key="c.id">
          <a :href="c.url">
          <img class="swipeImg" :src="c.thumbnail"/>
          </a>
        </mt-swipe-item>
    </mt-swipe>
    <div class="mask bg" :style="'background-image: url('+topic.logo+')'" v-else></div>
    <div class="Content">
      <div class="leftContent">
        <img class="logo" :src="topic.logo">
        <div class="information">
          <span class="name">{{topic.name}}</span>
          <span class="autograph">{{topic.autograph}}</span>
        </div>
      </div>
      <div class="rightContent" @click="focus()">
        <div class="top"><i class="iconfont icon-moban13zhengshu" style="color:white;font-size: 16px"></i>  <span style="color: white;font-size: 14px">{{focusOn}}</span></div>
        <div class="bottom"><span style="color:white;font-size: 12px">{{topic.hits}}人</span></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .swipe{
    height: 194px;
    width: 100%;
  }
  .swipeImg{
    height: 194px;
    width: 100%;
  }
  .header {
    height: 194px;
    width: 100%;
    position: relative;
    overflow: hidden;
    letter-spacing: 0;
    line-height: 1;
    margin-top: 0;
  }
  .Content{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 5px;
    right: 0;
    z-index: 10;
    transform: translate3d(0,0,0);
  }
  .Content .leftContent{
    display: flex;
    flex:4;
    flex-direction: row;
    align-items: center;
  }
  .Content .leftContent .logo{
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background-color: #888888;
  }
  .Content .leftContent .information{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
  .Content .leftContent .information .name{
    color:#ffffff;
    font-size: 16px;
  }
  .Content .leftContent .information .autograph{
    color:#ffffff;
    font-size: 12px;
    width: 200px;
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .rightContent{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
  .rightContent .top{
    border-top-left-radius: 6px;
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 4px;
    padding-right: 4px;
    background-color: rgba(255,0,0,0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .rightContent .bottom{
    border-bottom-left-radius: 6px;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 4px;
    padding-right: 4px;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
  }
  .font-size14{
    font-size: 14px;
  }

</style>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        listImg:[],
        isTop:true,
        focusOn:'',
        followed:false
      }
    },
    components: {
      'mt-swipe':Swipe,
      'mt-swipe-item':SwipeItem
    },
    props:{
      topic: {
        default: function () {
          return {
            id:0,name:'',autograph:'', article:0, product: 0, favorite: 0, follow: 0, fans: 0, logo: "", hits: 0
          }
        }
      },
      id:{default:0}
    },
    created() {
      this.load();
      this.open();
      this.changeIstop();
    },
    mounted(){

    },
    methods:{

      open:function() {
        var _this = this;
        GET('website/topic/view.jhtml?id='+_this.id).then(
          function (response) {
            if (response.type=="success") {
              _this.followed = response.data.followed
              if(_this.followed == false){
                _this.focusOn = '关注'
              }else{
                _this.focusOn = '已关注'
              }
            } else {
              _this.$refs.toast.show("网络不稳定");
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
          });
      },
      focus:function () {
        if(this.followed == false) {
          let _this = this;
          POST('website/member/follow/add.jhtml?authorId=' + _this.id).then(
            function (mes) {
              if (mes.type == 'success') {
                _this.focusOn = '已关注'
                _this.open()
              } else {
              }
            }, function () {

            });
        }else{
          let _this =this
          POST('website/member/follow/delete.jhtml?authorId=' + _this.id).then(
            function (e) {
              if (e.type == 'success') {
                _this.focusOn = '关注'
                _this.open()
              } else {
              }
            }, function () {

            });
        }
      },
      changeIstop:function () {
        let _this = this
        if (!utils.isNull(_this.listImg)) {
          return true
        }else {
          return false
        }
      },
      //      获取置顶文章
      load:function () {
        var _this = this;
        var id = utils.getUrlParameter("id");
        if (utils.isNull(id)) {
            id = this.topic.id;
        }
        GET('website/article/list.jhtml?isTop='+_this.isTop+'&authorId='+_this.id+"&pageStart=0&pageSize=5").then(
          function (mes) {
            if(mes.type == 'success'){
              _this.listImg = [];
              mes.data.data.forEach(function (item,index) {
                if(index <=4) {
                  _this.listImg.push(item)
                }
              })
              //_this.$refs.swiper.Shuffling();
            }else{
            }
          }, function () {

          });
      },

    }
  }

</script>
