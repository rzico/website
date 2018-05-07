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
  </div>
</template>
<style scoped>
  .swipe{
    height: 160px;
    width: 100%;
  }
  .swipeImg{
    height: 160px;
    width: 100%;
  }
  .header {
    height: 160px;
    width: 100%;
    position: relative;
    overflow: hidden;
    letter-spacing: 0;
    line-height: 1;
    margin-top: 0;
  }

</style>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import { POST, GET,AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        listImg:[],
        tagId:6,
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
      this.changeIstop();
    },
    mounted(){

    },
    methods:{
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
        GET('website/article/list.jhtml?tagId='+_this.tagId+'&authorId='+_this.id+"&pageStart=0&pageSize=5").then(
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
