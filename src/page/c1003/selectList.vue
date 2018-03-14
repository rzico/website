<template>
  <div class="bgc" v-if="selectList.length != ''">
    <div v-for="item in selectList" @click="jump(item.url)">
      <!--    精选排版  文章信息全在封面上-->
      <div class="bt5 ">
        <!--文章封面-->
        <div class="positionRelative">
          <img  :src="item.thumbnail | selectImage"  resize="cover" class="tempEightCover" />
          <div class="tempTwoMask"></div>
          <!--<div class="tempTwoAuthor" @click="goAuthor(item.authorId)">-->
          <!--<img :src="item.logo " resize="cover" class="authorImg"/>-->
          <!--<span class="authorName white">{{item.author}}</span>-->
          <!--</div>-->
          <div class="tempTwoContent">
            <!--只会显示出一个div,所以需要用个大div包住,-->
            <div style="width: 100%">
              <div class="flex-row bt10">
                <!--<text class="articleTitle">{{item.title}}</text>-->
                <span class="articleTitle" style="color: #fff">{{item.title}}</span>
              </div>
              <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
              <!--<text class="articleContent">{{item.htmlTag}}</text>-->
              <!--</div>-->
              <div class="space-between">
                <div class="relevantInfo" v-if="item.articleSign != '样例'">
                  <span class="relevantImage white" :style="{fontFamily:'iconfont'}">&#xe6df;</span>
                  <span class="relevantText white">{{item.hits}}</span>
                  <span class="relevantImage  white" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
                  <span class="relevantText white">{{item.laud}}</span>
                  <span class="relevantImage  white" :style="{fontFamily:'iconfont'}">&#xe65c;</span>
                  <span class="relevantText white">{{item.review}}</span>
                </div>
                <div>
                  <span class="relevantText white">{{item.createDate | dateweektimefmt}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: #eee;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-bottom: 5px;
  }
  /*公用样式*/
  /**横向部局居中对齐**/
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .bt10 {
    margin-bottom: 10px;
  }
  .bt5 {
    margin-bottom: 5px;
  }
  .white {
    color: white;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .positionRelative{
    position:relative;
    height: 187.5px;
  }
  .tempEightCover{
    height: 187.5px;
    width: 100%;
  }

  .tempTwoContent{
    display:flex;
    justify-content: space-between;position:absolute;bottom: 10px;left: 0px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .tempTwoMask{
    position: absolute;top: 0;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.3;
  }

  .articleContent{
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    width: 355px;
    font-size: 16px;
    color: #888;
  }
  .activeClass{
    visibility: visible;
  }
  .noactive{
    visibility: hidden;
  }
  .relevantImage {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    margin-right: 2.5px;
    margin-left: 2.5px;
    align-items: center;
  }
  .relevantText {
    font-size: 13px;
  }
  .relevantInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .articleTitle {
    font-size: 19px;
    width: 355px;
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
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data () {
      return {
//        精选文章id
        selectId:5,
        selectList:[],
      }
    },
    components: {
      Toast
    },
    filters: {
      dateweektimefmt(value) {
        return utils.dateweektimefmt(value);
      },
      selectImage(val){
        return utils.thumbnail(val, 750, 375);
      },
    },
    props: {
      id: { default: 0}
    },
    created() {
      this.load();
    },
    mounted () {

    },
    methods:{
      //      获取精选文章
      load:function () {
        var _this = this;
        GET('website/article/list.jhtml?tagId='+_this.selectId+'&authorId='+_this.id+"&pageStart=2&pageSize=3").then(
          function (mes) {
            if(mes.type == 'success'){
              _this.selectList = mes.data.data
            }else{
            }
          }, function () {

          });
      },
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
