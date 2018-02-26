<template>
  <div class="header" v-if="templates.mediaType == 'product'" >
    <mt-swipe ref="swipe" class="swipe" :auto="4000"  >
      <mt-swipe-item  >
          <img class="swipeImg" :src="templates.original "/>
      </mt-swipe-item>
    </mt-swipe>
    <div class="buyArea">
      <span class="money">¥{{templates.price | watchPrice}}</span>
      <div class="buy" @click="buyNow(templates.id)">
        <span class="buyText">立即购买</span>
      </div>
    </div>
    <div class="goodsTitle">
      <div class="trademark"><span class="trademarkText">芸店</span></div>
      <span class="titleText">{{templates.name}}</span>
    </div>
    <preview ref="vuePreview"></preview>
  </div>
</template>
<style scoped>
  .swipe{
    height: 375px;
    width: 100%;
  }
  .swipeImg{
    height: 375px;
    width: 100%;
  }
  .header {
    height: 490px;
    width: 100%;
    position: relative;
    overflow: hidden;
    letter-spacing: 0;
    line-height: 1;
    margin-top: 0;
  }
  .buyArea{
    padding-left: 10px;
    height: 50px;
    width: 100%;
    background-color:#ccc;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .money{
    width: 70%;
    font-size: 25px;
    color: #EB4E40;
  }
  .buy{
    width: 30%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#EB4E40;
  }
  .buyText{
    font-size: 20px;
    color: white;
  }
  .trademark{
    height: 16px;
    width: 40px;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background-color: #EB4E40;
    position: absolute;
    top:10px;
    left:10px;
  }
  .trademarkText{
    font-size: 14px;
    color: white;
    font-weight: 500;
  }
  .goodsTitle{
    width: 100%;
    height: 55px;
    background-color: white;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .titleText{
    font-size: 16px;
    text-indent: 3em;
    line-height: 20px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  </style>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import { POST, GET,AUTH} from '../../../assets/fetch.js';
  import preview from '../../../widget/preview.vue';
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {

      }
    },
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem,
      preview
    },
    props: {
      templates: { default: function () {
        return []
      }
      },
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
    },
    created() {

    },
    mounted() {

    },
    methods: {
      buyNow:function (id) {
        this.$emit('buyNow',id);
      }
    }
  }
  </script>
