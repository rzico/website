<template>
  <div class="header">
    <div v-for="(template,index) in watchTemplates" v-if="template.mediaType == 'product'">
    <mt-swipe ref="swipe" class="swipe" :auto="4000"  >
      <mt-swipe-item  >
          <img class="swipeImg" :src="template.original "/>
      </mt-swipe-item>
    </mt-swipe>
    <div class="buyArea">
      <span class="money">¥{{template.price | watchPrice}}</span>
      <div class="buy" @click="buyNow(template.id)">
        <span class="buyText">立即购买</span>
      </div>
    </div>
    <div class="goodsTitle">
      <div class="trademark"><span class="trademarkText">芸店</span></div>
      <span class="titleText">{{template.name}}</span>
    </div>
    </div>
    <div class="sales">
      <span class="salesText">{{article.hits}}人访问    {{availableStock | warehouse}}</span>
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
    width: 100%;
    position: relative;
    top:0
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
    top:9px;
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
    position: relative;
  }
  .titleText{
    font-size: 16px;
    margin-top: 8px;
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
  .sales{
    height: 30px;
    width: 100%;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .salesText{
    font-size: 14px;
    color: #888;
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
        htmlStr:'',
        watchTemplates:[],
        availableStock:0
      }
    },
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem,
      preview
    },
    props: {
      id:{default:0},
      article: {
        default: function () {
          return {hits: 0, title: "样例", nickName: "author", createDate: null}
        }
      },
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
      warehouse:function (value) {
        if(value == 0){
         return '无货'
        }if(value < 10){
         return '货源紧缺'
        }if(value > 10){
          return '货源充足'
        }
      },
    },
    computed:{
      templatesList: function () {
        return this.templates;
      }
    },
    created() {
      this.go()
    },
    mounted() {

    },
    methods: {
      go:function () {
        var _this = this;
        GET('website/article/view.jhtml?id='+this.id).then(
          function (response) {
            if (response.type=="success") {
              if (!utils.isNull(response.data.templates)) {
                if (response.data.mediaType==0) {
                  _this.htmlStr = response.data.templates;
                } else {
//                  图片预览
                  var previewList = [];
                  response.data.templates.forEach(function (item) {
                      if (item.mediaType == 'product') {
                        GET('website/article/goods.jhtml?id=' + item.id).then(
                          function (data) {
                            if (data.type == 'success') {
//                           对数组对象进行操作需要 这样子才能重新渲染界面
                                _this.$set(item, 'name', data.data.name);
                                _this.$set(item, 'price', data.data.price);
                              _this.availableStock = data.data.availableStock
                            } else {
                              _this.$refs.toast.show("服务器繁忙");
                            }
                          }, function (err) {
                            _this.$refs.toast.show("网络不稳定");
                          }
                        )
                      }
//                  图片预览
                      if (item.mediaType == 'product' || item.mediaType == 'image' && !utils.isNull(item.original)) {
                        previewList.push({
                          src: utils.filterThumbnail(item.original),
                          w: 900,
                          h: 1000
                        })
                      }
                  })
                  _this.$set(response.data.templates, 'previewList', previewList);
                  _this.watchTemplates = response.data.templates;
                }
              }

            } else {
              _this.$refs.toast.show("网络不稳定");
//                 _this.$refs.toast.show('website/article/view.jhtml?id='+id);
            }
          }, function () {
            _this.$refs.toast.show("网络不稳定");
//                _this.$refs.toast.show('ssssswebsite/article/view.jhtml?id='+id);

          });
      },
      buyNow:function (id) {
        this.$emit('buyNow',id);
      },
    }
  }
  </script>
