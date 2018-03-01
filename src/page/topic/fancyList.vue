<template>
  <div class="backg">
    <div v-for="(item,index) in articleList" :key="index" @click="jump(item.url)"   >
      <!--    排版一 采取左右布局。封面较小-->
      <div v-if="item.templateIndex == 0" class="tempPdBox">
        <div class="flex-row">
          <!--<div class="bt10 flex-row" @click="goAuthor(item.authorId)">-->
            <!--<img :src="item.logo " resize="cover" class="authorImg"/>-->
            <!--<span class="authorName">{{item.author}}</span>-->
          <!--</div>-->
        </div>
        <div class="space-between" >
          <div class="tempOneContent" >
            <div class="flex-row">
              <span class="articleTitle tempOneWidth">{{item.title}}</span>
              <!--<text class="articleTitle tempOneWidth" >用折纸做出的北欧范花瓶-1</text>-->
            </div>
            <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
            <!--<text class="articleContent">{{item.htmlTag}}</text>-->
            <!--</div>-->
            <div class="flex-row" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
              <span class="articleContent tempOneWidth" >{{item.htmlTag}}</span>
            </div>
            <div class="relevantInfo" v-if="item.articleSign != '样例'">
              <span class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</span>
              <span class="relevantText">{{item.hits}}</span>
              <span class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
              <span class="relevantText">{{item.laud}}</span>
              <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
              <span class="relevantText">{{item.review}}</span>
            </div>
          </div>
          <!--文章封面-->
          <div style="position: relative">
            <img  :src="item.thumbnail "  resize="cover" class="tempOneImg"/>
          </div>
        </div>
      </div>
      <!--    排版二  文章信息全在封面上-->
      <div v-else-if="item.templateIndex == 1" class="bt5 positionRelativeTwo">
        <!--文章封面-->
        <div class="positionRelativeTwo">
          <img  :src="item.thumbnail "  resize="cover" class="tempTwoCover" />
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
              <!--<div class="flex-row bt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
              <!--<text class="articleContent">{{item.htmlTag}}</text>-->
              <!--</div>-->
              <div class="flex-row bt10 "  v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                <span class="articleContent white" >{{item.htmlTag}}</span>
              </div>
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

      <!--    排版三  采取封面三分化-->
      <!--<div v-else-if="item.templateIndex == 2" class="tempPdBox">-->
      <!--<div class="flex-row">-->
      <!--<div class="flex-row" @click="goAuthor(item.authorId)">-->
      <!--<image :src="item.logo " resize="cover" class="authorImg"></image>-->
      <!--<text class="authorName">{{item.author}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;文章封面&ndash;&gt;-->
      <!--<div  class="tempThreeCover space-between ">-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
      <!--</div>-->
      <!--<div class="tempThreeContent" >-->
      <!--<div class="flex-row bt20">-->
      <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
      <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-3</text>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
      <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div class="flex-row  bt20" >-->
      <!--<text class="articleContent " >家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
      <!--</div>-->
      <!--<div class="space-between">-->
      <!--<div>-->
      <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
      <!--</div>-->
      <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
      <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
      <!--<text class="relevantText ">{{item.hits}}</text>-->
      <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
      <!--<text class="relevantText ">{{item.laud}}</text>-->
      <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
      <!--<text class="relevantText ">{{item.review}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;    排版四  采取封面四分化&ndash;&gt;-->
      <!--<div v-else-if="item.templateIndex == 3" class="articleBox">-->
      <!--<div class="flex-row">-->
      <!--<div  class="flex-row ml20" @click="goAuthor(item.authorId)">-->
      <!--<image :src="item.logo " resize="cover" class="authorImg"></image>-->
      <!--<text class="authorName">{{item.author}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;文章封面&ndash;&gt;-->
      <!--<div  class="tempFourCover space-between mt20 bt20">-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH" ></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH"></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH mt6"></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH mt6"></image>-->
      <!--</div>-->
      <!--<div  class="tempThreeContent ml20" >-->
      <!--<div class="flex-row bt20">-->
      <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
      <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-4</text>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
      <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div class="flex-row  bt20" >-->
      <!--<text class="articleContent ">家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
      <!--</div>-->
      <!--<div class="space-between">-->
      <!--<div>-->
      <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
      <!--</div>-->
      <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
      <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
      <!--<text class="relevantText ">{{item.hits}}</text>-->
      <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
      <!--<text class="relevantText ">{{item.laud}}</text>-->
      <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
      <!--<text class="relevantText ">{{item.review}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;    排版五  采取封面两分化&ndash;&gt;-->
      <!--<div v-else-if="item.templateIndex == 4" class="articleBox">-->
      <!--<div class="flex-row">-->
      <!--<div  class="flex-row ml20" @click="goAuthor(item.authorId)">-->
      <!--<image :src="item.logo | watchlogo" resize="cover" class="authorImg"></image>-->
      <!--<text class="authorName">{{item.author}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;文章封面&ndash;&gt;-->
      <!--<div  class="tempFourCover space-between mt20 bt20">-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH" ></image>-->
      <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH"></image>-->
      <!--</div>-->
      <!--<div  class="tempThreeContent ml20" >-->
      <!--<div class="flex-row bt20">-->
      <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
      <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-5</text>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
      <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div class="flex-row  bt20" >-->
      <!--<text class="articleContent ">家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
      <!--</div>-->
      <!--<div class="space-between">-->
      <!--<div>-->
      <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
      <!--</div>-->
      <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
      <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
      <!--<text class="relevantText ">{{item.hits}}</text>-->
      <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
      <!--<text class="relevantText ">{{item.laud}}</text>-->
      <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
      <!--<text class="relevantText ">{{item.review}}</text>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--    排版六  采取封面新版化-->
      <div v-else-if="item.templateIndex == 5" class="articleBox">
        <div class="flex-row">
          <!--<div  class="flex-row ml10" @click="goAuthor(item.authorId)">-->
            <!--<img :src="item.logo " resize="cover" class="authorImg"/>-->
            <!--<span class="authorName">{{item.author}}</span>-->
          <!--</div>-->
        </div>
        <!--文章封面-->
        <div style="position: relative">
          <img  :src="item.thumbnail "  resize="cover" class="articleCoverTwo" />
        </div>
        <div  class="tempThreeContent" >
          <div class="flex-row bt10">
            <!--<text class="articleTitle">{{item.title}}</text>-->
            <span class="articleTitle" >{{item.title}}</span>
          </div>
          <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
          <!--<text class="articleContent">{{item.htmlTag}}</text>-->
          <!--</div>-->
          <div class="flex-row  bt10" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined" >
            <span class="articleContent ">{{item.htmlTag}}</span>
          </div>
          <div class="space-between">
            <div>
              <span class="relevantText" >{{item.createDate | dateweektimefmt}}</span>
            </div>
            <div class="relevantInfo" v-if="item.articleSign != '样例'">
              <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>
              <span class="relevantText ">{{item.hits}}</span>
              <span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
              <span class="relevantText ">{{item.laud}}</span>
              <span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
              <span class="relevantText ">{{item.review}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--    排版七  采取新版 标题置顶化-->
      <div v-else-if="item.templateIndex == 6" class="articleBox">
        <div class="flex-row bt10">
          <!--<div  class="flex-row ml10" @click="goAuthor(item.authorId)">-->
            <!--<img :src="item.logo " resize="cover" class="authorImg" />-->
            <!--<span class="authorName">{{item.author}}</span>-->
          <!--</div>-->
        </div>
        <div class="flex-row  ml10">
          <!--<text class="articleTitle">{{item.title}}</text>-->
          <span class="articleTitle" >{{item.title}}</span>
        </div>
        <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
        <!--<text class="articleContent">{{item.htmlTag}}</text>-->
        <!--</div>-->
        <div class="flex-row ml10 " v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
          <span class="articleContent ">{{item.htmlTag}}</span>
        </div>
        <!--文章封面-->
        <div style="position: relative">
          <img  :src="item.thumbnail "  resize="cover" class="articleCover"/>
        </div>
        <div  class="tempThreeContent ml10" >
          <div class="space-between">
            <div>
              <span class="relevantText" >{{item.createDate | dateweektimefmt}}</span>
            </div>
            <div class="relevantInfo" v-if="item.articleSign != '样例'">
              <span class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</span>
              <span class="relevantText ">{{item.hits}}</span>
              <span class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
              <span class="relevantText ">{{item.laud}}</span>
              <span class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</span>
              <span class="relevantText ">{{item.review}}</span>
            </div>
          </div>
        </div>
      </div>

      <!--    排版八  文章信息全在封面上-->
      <div v-else-if="item.templateIndex == 7" class="bt5">
        <!--文章封面-->
        <div class="positionRelative">
          <img  :src="item.thumbnail"  resize="cover" class="tempEightCover" />
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
              <div class="flex-row bt10 "  v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                <span class="articleContent white" >{{item.htmlTag}}</span>
              </div>

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

      <!--    排版九  传统模样的模版-->
      <div v-else class="articleBox">
        <div class="atricleHead">
          <span class="articleTitle">{{item.title}}</span>
        </div>
        <div class="atricleHead mt10" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
          <span class="articleContent">{{item.htmlTag}}</span>
        </div>
        <!--文章封面-->
        <div style="position: relative">
          <img  :src="item.thumbnail"  resize="cover" class="articleCover"/>
        </div>
        <!--文章底部-->
        <div class="articleFoot">
          <!--<div class="flex-row" @click="goAuthor(item.authorId)">-->
            <!--<img :src="item.logo" resize="cover" class="authorImg"/>-->
            <!--<span class="authorName">{{item.author}}</span>-->
          <!--</div>-->
          <div class="relevantInfo" v-if="item.articleSign != '样例'">
            <span class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</span>
            <span class="relevantText">{{item.hits}}</span>
            <span class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</span>
            <span class="relevantText">{{item.laud}}</span>
            <span class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</span>
            <span class="relevantText">{{item.review}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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
  .ml10 {
    margin-left: 10px;
  }
  .mt10 {
    margin-top: 10px;
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

  /*================================*/
  .backg{
    width: 100%;
    background-color: #eeeeee;
    padding-bottom: 50px;
  }
  .positionRelative{
    position:relative;
    height: 187.5px;
  }
  .positionRelativeTwo{
    position:relative;
    height: 250px;
  }
  .tempEightCover{

    width: 100%;
  }

  .tempFourCover{
    position: relative;width: 750px;flex-wrap: wrap;
  }
  .mt6{
    margin-top: 6px;
  }
  .tempFourCoverWH{
    height: 372px;width: 372px;
  }

  .tempThreeSign{
    font-size:28px;line-height: 40px;
  }
  .tempThreeContent{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 10px;
    margin-right: 10px;
  }
  .tempThreeCoverWH{
    width: 230px;
    height: 230px;
  }
  .tempThreeCover{
    position: relative;width: 710px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .tempTwoSign{
    color: #fff;font-size:28px;line-height: 40px;
  }
  .tempTwoContent{
    display:flex;
    justify-content: space-between;position:absolute;bottom: 10px;left: 0px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .tempTwoAuthor{
    position: absolute;top: 10px;left: 10px;
    display: flex;
    flex-direction: row;align-items: center;
  }
  .tempTwoMask{
    position: absolute;top: 0;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.3;
  }
  .tempTwoCover{
    width:100%;
  }

  .tempOneImg{
    width: 100px;height: 100px;
  }
  .tempOneWidth{
    width: 245px;
  }
  .tempOneContent{
    width: 255px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
  }

  .tempPdBox{
    width: 100%;
    padding:10px;
    box-sizing: border-box;
    margin-bottom:5px;
    background-color:#fff;
  }


  /*<!--轮播图-->*/
  .indicatorSlider{
    position: absolute;
    bottom: 10px;
    width:750px;
    /*height为10时 底下的点会变成椭圆，20会变成圆 */
    height: 10px;
    align-items: center;
    item-selected-color:#fff;
    item-size:15px;
  }
  .slideImage {
    width: 750px;
    /*height: 280px;*/
    height: 375px;
  }
  .slider {
    width: 750px;
    height: 375px;
    /*height: 280px;*/
  }
  .frame {
    width: 750px;
    /*height: 280px;*/
    height: 375px;
    position: relative;
  }
  /*轮播图*/

  .mt20{
    margin-top: 20px;
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
    color: #888;
    margin-right: 2.5px;
    margin-left: 2.5px;
    align-items: center;
  }
  .relevantText {
    color: #888;
    font-size: 13px;
  }
  .relevantInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .articleFoot {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 355px;
    margin-left: 10px;
    align-items: center;
  }
  .authorName {
    font-size: 16px;
    margin-left: 5px;
    color: #888;
  }
  .authorImg{
    width: 30px;height: 30px;border-radius: 100%;
  }
  .articleCover {
    height: 187.5px;
    /*width:690px;*/
    width:100%;
    /*border-radius: 5px;*/
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .articleCoverTwo {
    height: 187.5px;
    /*width:690px;*/
    width:100%;
    /*border-radius: 5px;*/
    /*margin-top: 10px;*/
    margin-bottom: 10px;
  }
  .articleBox {
    background-color: #ffffff;
    /*padding-left: 30px;*/
    /*padding-top: 10px;*/
    /*padding-right: 30px;*/
    padding-bottom: 10px;
    margin-bottom: 5px;
  }
  .atricleHead {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
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
  .articleSign {
    border-radius: 10px;
    padding: 5px;
    color: #888;
    font-size: 26px;
    border-width: 1px;
    border-style: solid;
    border-color: gainsboro;
  }
</style>
<script>
  import { POST, GET,AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  export default {
    data(){
      return{
        pageStart:0,
        pageSize:10,
        articleList:[],
        imageList: [],
        templateIndexList:[0,1,5,6,7],
        isInit:true,
        allLoaded:false
      }
    },
    components: {

    },
    props:{
      idx:{default:0},
      id:{default:0}
    },
    created(){
      var _this = this;
      this.templateIndexList = this.shuffle(this.templateIndexList);
    },
    filters: {
      dateweektimefmt(value) {
        return utils.dateweektimefmt(value);
      }
    },
    methods:{
      loadTop:function(idx) { //组件提供的下拉触发方法
        this.pageStart =0;
        console.log("loadtop");
        //下拉加载
        this.getAllArticle(this.idx);
      },
      loadBottom:function() {
        console.log("loadBottom");
        // 上拉加载
        this.getAllArticle(this.idx);// 上拉触发的分页查询
      },
//            打乱数组
      shuffle(array) {
        var tmp, current, top =array.length;
        if(top) while(--top){
          current =Math.floor(Math.random() * (top + 1));
          tmp =array[current];
          array[current] =array[top];
          array[top] = tmp;
        }
        return array;
      },
//            获取文章列表
      getAllArticle(){
        let _this = this;
        GET('website/article/list.jhtml?authorId='+_this.id+"&isTop=false&articleCatalogId="+_this.idx+"&pageStart="+_this.pageStart+"&pageSize="+_this.pageSize).then(
          function (data) {
          if(data.type == 'success' && data.data.data != '' ){
            let dataLength = data.data.data.length;
            data.data.data.forEach(function (item,index) {
              if(!utils.isNull(item.logo)){
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
                item.logo = utils.thumbnail(item.logo,60,60);
//                                transitArr[index].logo = utils.thumbnail(item.logo,60,60);
              }else{
//                item.logo = utils.locate('resources/images/background.png');
//                                transitArr[index].logo = utils.locate('resources/images/background.png');
              }
              if(utils.isNull(item.author)){
                item.author = 'author';
//                                transitArr[index].nickName = 'author';
              }
//                            模版id重新填充打乱
              if(_this.templateIndexList.length == 0){
                _this.templateIndexList = _this.shuffle([0,1,5,6,7]);
              }
//                          填充轮播图
//                            if(_this.pageStart == 0 && !utils.isNull(item.tags) && _this.imageList.length < 5){
//                                for(var i = 0;i < item.tags.length; i ++){
//                                    if(item.tags[i].id == 5){
//                                        _this.imageList.push(item);
//                                        data.data.data.splice(index,1);
//                                        break;
//                                    }
//                                }
//                            }
//                            获取当前元素的模版id
              item.templateIndex = _this.templateIndexList[0];
              _this.templateIndexList.splice(0,1);
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
              if(!utils.isNull(item.thumbnail)) {
                switch (item.templateIndex) {
                  case 0:
                    item.thumbnail = utils.thumbnail(item.thumbnail, 200, 200);
                    break;
                  case 1:
                    item.thumbnail = utils.thumbnail(item.thumbnail, 750, 500);
                    break;
                  case 2:
                    item.thumbnail = utils.thumbnail(item.thumbnail, 230, 230);
                    break;
                  case 3:case 4:
                  item.thumbnail = utils.thumbnail(item.thumbnail, 372, 372);
                  break;
                  default:
                    item.thumbnail = utils.thumbnail(item.thumbnail,750, 375);
                    break;
                }
              }
              if(_this.pageStart != 0){
                _this.articleList.push(item);
              }
            })
//                        假如没有精选文章，就从获取到的所有文章里取出
//                        if (_this.pageStart == 0) {
//                            while(_this.imageList.length < 5){
//                                if(data.data.data.length == 0){
//                                    break;
//                                }
////                                获取原图
//                                data.data.data[0].thumbnail = utils.filterThumbnail(data.data.data[0].thumbnail);
////                                获取需要的比例缩略图
//                                data.data.data[0].thumbnail = utils.thumbnail(data.data.data[0].thumbnail,750, 375);
//                                _this.imageList.push(data.data.data[0]);
//                                data.data.data.splice(0,1);
//                            }
            _this.articleList = data.data.data;
//                        }
            _this.pageStart = data.data.start + dataLength;
            _this.allLoaded = (response.data.recordsTotal>_this.pageStart);
          }else  if(data.type == 'success' && data.data.data == '' ){
          }else{
            _this.$refs.toast.show("网络不稳定");
          }
        },function (err) {
            _this.$refs.toast.show("网络不稳定");
        })
      },
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
