<template>
  <div class="bgc" v-if="hasReward()">
    <div class="content" v-for="item in catagoryList" @click="jumpList(item.id,item.name)">
      <div style="display: flex;flex-direction: column;align-items: center;padding-top: 5px">
      <img class="image"  :src="item.thumbnail | wacthImage"/>
      <span class="name">{{item.name}}</span>
      </div>
    </div>
    <div class="content" @click="jump()">
      <div style="display: flex;flex-direction: column;align-items: center;">
      <img class="imageTwo" :src="img | wacthImage"/>
      <span class="name">全部</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding:10px 0px;
  }
  .content{
    border: none;
    width: 20%;
    /*padding-top:10px;*/
    /*padding-left:15px;*/
    /*padding-right:15px;*/
    box-sizing: border-box;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .image{
    width: 48px;
    height: 48px;
    margin-bottom: 7px;
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
  }
  .imageTwo{
    width: 48px;
    height: 48px;
    margin-bottom: 7px;
    border-top-left-radius: 40%;
    border-top-right-radius: 40%;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
  }
  .name{
    margin-top: -5px;
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
        img:'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/allBg.jpeg',
        screenheight:0,
        name:'全部'
      }
    },
    components: {

    },
    filters:{
      wacthImage(val){
        return utils.thumbnail(val, 48, 48);
      },
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
              if(data.data.length <4 || data.data.length == 4) {
                data.data.forEach(function (item) {
                  if(utils.isNull( item.thumbnail)){
                    item.thumbnail = 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/allBg.jpeg';
                  }
                    _this.catagoryList.push(item)
                })
              }if(data.data.length >4 && data.data.length <9) {
                data.data.forEach(function (item, index) {
                  if (index < 4) {
                    if(utils.isNull( item.thumbnail)){
                      item.thumbnail = 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/allBg.jpeg';
                    }
                    _this.catagoryList.push(item)
                  }
                })
              } if(data.data.length >8) {
                data.data.forEach(function (item, index) {
                  if (index < 8) {
                    if(utils.isNull( item.thumbnail)){
                      item.thumbnail = 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/allBg.jpeg';
                    }
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
        this.$router.push({name:"C1003goodsList",query:{id:this.id,name:this.name}});
      },
      jumpList:function(id,name) {
        this.$router.push({name:"C1003goodsList",query:{productCategoryId:id,id:this.id,name:name}});
      },
      hasReward:function () {
        return this.catagoryList.length>0;
      },
    }
  }
</script>
