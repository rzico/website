<template>
  <div class="header">
    <div class="mask bg" :style="'background-image: url('+member.logo+')'"></div>
    <div class="field">
      <div class="avatar bg" :style="'background-image: url('+member.logo+')'">
      </div>
      <span class="profile">
        <div class="nickname oneline">{{member.nickName}}</div>
        <div class="signature oneline">{{member.autograph}}</div>
        <!--<div class="num oneline">文章 {{member.article}}&nbsp;&nbsp;宝贝 {{member.product}}&nbsp;&nbsp;{{member.hits==0?'':'被访问'+member.hits}}</div>-->
        <!--需要显示文章、宝贝等 把下行代码删除,恢复上行代码-->
        <div class="num oneline"> </div>
      </span>
      <div class="about">
        <span class="mark">
          <em class="oneline">{{member.favorite}}</em>
          <span>收藏</span>
        </span>
        <span class="pink">
          <em class="oneline">{{member.follow}}</em>
          <span>关注</span>
        </span>
        <span class="fans">
          <em class="oneline">{{member.fans}}</em>
          <span>粉丝</span>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped="">
</style>
<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      member: {
        default: function () {
          return {
            id:0,nickName:'',autograph:'', article:0, product: 0, favorite: 0, follow: 0, fans: 0, logo: "", hits: 0
          }
        }
      },
    }
  }
</script>
