<template>
  <div class="bottomBox" v-if="article.dragonId > 0">
    <div class="smallBox">
      <span class="iconfont" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
      <span class="smallBoxText">点赞 {{article.laud}}</span>
    </div>
    <div class="smallBox">
      <span class="iconfont" :style="{fontFamily:'iconfont'}">&#xe67d;</span>
      <span class="smallBoxText">分享 {{article.share}}</span>
    </div>
    <div class="smallBox">
      <span class="iconfont" :style="{fontFamily:'iconfont'}">&#xe65c;</span>
      <span class="smallBoxText">评论 {{article.review}}</span>
    </div>
    <div class="buttonBox" v-if="productNumber==1"><div class="button" @click="buyNow()">参与接龙</div></div>
  </div>
</template>
<style scoped>
  .bottomBox{
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 30000000;
    border-top: 1px solid #eee;
  }
  .smallBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
  }
  .iconfont{
    font-size: 25px;
    color: #888888;
    line-height: 30px;
  }
  .smallBoxText{
    font-size: 12px;
    color: #888888;
  }
  .buttonBox{
    display: flex;
    flex:2;
    align-items: center;
    justify-content: center;
  }
  .button{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    border-radius: 60px;
    background-color: #EB4E40;
    width: 150px;
    height: 40px;
  }
</style>
<script>
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        productNumber:0,
        productId:0
      }
    },
    props: {
      article: { default: function () {
        return {laud:0,review:0,share:0}
      }
      },
      templates: { default: function () {
        return []
      }
      },
    },
    computed:{
      templatesList: function () {
        return this.templates;
      }
    },
    created() {

    },
    mounted() {
      var _this = this
//      因为props不在dom结构里 ，mounted会先加载，所以延迟1秒
      setTimeout(() => {
        _this.getProductNumber()
      }, 1000)

    },
    methods: {
      getProductNumber:function () {
        var _this = this
        this.productNumber = 0
        this.templatesList.forEach(function (item) {
          if(item.mediaType=='product'){
            _this.productNumber = _this.productNumber+1
            _this.productId = item.id
          }
        })
      },
      buyNow:function (id) {
        this.$emit('buyNow',this.productId);
      }
    }
  }
</script>
