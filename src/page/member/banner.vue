<template>
  <div class="header">
    <swiper ref="swiper" :listImg="listImg"></swiper>
    <div class="Content">
      <div class="leftContent">
        <img class="logo" :src="topic.logo">
        <div class="information">
          <span class="font-size14">{{topic.name}}</span>
          <span class="autograph">{{topic.autograph}}</span>
        </div>
      </div>
      <div class="rightContent">
        <div class="top"><i class="iconfont icon-moban13zhengshu" style="color:white;font-size: 14px"></i><span style="color: white;font-size: 12px">点击量</span></div>
        <div class="bottom"><span style="color:#cccccc;font-size: 12px">{{topic.hits}}人</span></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
    right: 5px;
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
    height: 50px;
    width: 80px;
    border-radius: 5px;
    background-color: #888888;
  }
  .Content .leftContent .information{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
  .Content .leftContent .information .autograph{
    font-size: 14px;
    margin-top: 10px;
    lines:1;
    text-overflow: ellipsis;
  }
  .rightContent{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
  .rightContent .top{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(255,0,0,0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .rightContent .bottom{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
  }
  .font-size14{
    font-size: 14px;
  }

</style>
<script>
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import swiper from './swiper.vue';
  export default {
    data() {
      return {
        listImg: [
          {url:''},
          {url:''},
          {url:''},
          {url:''},
          {url:''}
        ],
        //        置顶文章
        isTop:true,
      }
    },
    components: {
      swiper,
    },
    props:{
      topic: {
        default: function () {
          return {
            name:'',autograph:'', article:0, product: 0, favorite: 0, follow: 0, fans: 0, logo: "", hits: 0
          }
        }
      },
      id:{default:0}
    },
    mounted() {
     this.onArticle()
    },
    methods:{
      //      获取置顶文章
      onArticle:function () {
        var _this = this;
        GET('website/article/list.jhtml?isTop='+_this.isTop+'&authorId='+_this.id).then(
          function (mes) {
//            mes=JSON.stringify(mes)
//            alert(mes)
            if(mes.type == 'success'){
//              mes.data.data.forEach(function (item,index) {
//                if(index <=4) {
//                  _this.listImg.push({url: item.thumbnail})
//                }
//              })
//              _this.listImg=JSON.stringify(_this.listImg)
//              alert(_this.listImg)
              _this.$set(_this.listImg[0],'url',mes.data.data[0].thumbnail);
              _this.$set(_this.listImg[1],'url',mes.data.data[1].thumbnail);
              _this.$set(_this.listImg[2],'url',mes.data.data[2].thumbnail);
              _this.$set(_this.listImg[3],'url',mes.data.data[3].thumbnail);
              _this.$set(_this.listImg[4],'url',mes.data.data[4].thumbnail);
              _this.$refs.swiper.Shuffling();
            }else{
            }
          }, function () {

          });
      },

    }
  }

</script>
