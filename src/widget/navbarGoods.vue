<template>
  <div class="bgc" v-if="hasReward()">
    <div class="content" v-for="item in catagoryList" @click="jumpList(item.id)">
      <img class="image"  :src="item.thumbnail"/>
      <span class="name">{{item.name}}</span>
    </div>
    <div class="content" @click="jump()">
      <img class="image" :src="img"/>
      <span class="name">全部</span>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 15px;
    margin-bottom: 10px;
  }
  .content{
    width: 25%;
    padding-top:15px;
    padding-left:15px;
    padding-right:15px;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
  }
  .image{
    width: 100%;
    height: 63.75px;
  }
  .name{
    margin-top: 5px;
    text-align: center;
    width: 100%;
    color: #888888;
    font-size: 10px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  export default {
    data() {
      return {
        catagoryList:[],
        img:'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/all.png',
        screenheight:0
      }
    },
    components: {

    },
    filters:{

    } ,
    props:{
      id:{default:0}
    },
    created() {
      this.getCatagory();
    },
    methods:{
      //            获取分类
      getCatagory:function () {
        var _this = this;
        GET('website/shop/product_category/list.jhtml?authorId='+_this.id).then(
          function (data) {
            if (data.type == "success") {
              if(data.data.length <3 ) {
                data.data.forEach(function (item) {
                  item.thumbnail = utils.thumbnail(item.thumbnail, 100, 100);
                    _this.catagoryList.push(item)
                })
              }if(data.data.length >3 && data.data.length <7) {
                data.data.forEach(function (item, index) {
                  if (index < 3) {
                    item.thumbnail = utils.thumbnail(item.thumbnail, 100, 100);
                    _this.catagoryList.push(item)
                  }
                })
              } if(data.data.length >6) {
                data.data.forEach(function (item, index) {
                  if (index < 7) {
                    item.thumbnail = utils.thumbnail(item.thumbnail, 100, 100);
                    _this.catagoryList.push(item)
                  }
                })
              }
            }else {
              event.toast(data.content);
            }
          },function (err) {
            event.toast(err.content);
          })
      },
      jump:function() {
        this.$router.push({name:"C1003goodsList",query:{id:this.id}});
      },
      jumpList:function(id) {
        this.$router.push({name:"C1003goodsList",query:{productCategoryId:id,id:this.id}});
      },
      hasReward:function () {
        return this.catagoryList.length>0;
      },
    }
  }
</script>
