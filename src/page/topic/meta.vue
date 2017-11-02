<template>
  <div class="header">
    <div class="mask bg" :style="'background-image: url('+topic.logo+')'"></div>
    <div class="field">
      <div class="avatar bg" :style="'background-image: url('+topic.logo+')'">
        <div class="badge enterprise"></div>
        <div class="author" style="display:none"></div>
      </div>
      <span class="profile">
        <div class="nickname oneline">{{topic.name}}</div>
        <div class="signature oneline">{{topic.autograph}}</div>
        <div class="num oneline">文章 {{topic.article}}&nbsp;&nbsp;宝贝 {{topic.product}}&nbsp;&nbsp;{{topic.hits==0?'':'被访问'+topic.hits}}</div>
      </span>
      <div class="about">
        <span class="mark">
          <em class="oneline">{{topic.favorite}}</em>
          <span>收藏</span>
        </span>
        <span class="pink">
          <em class="oneline">{{topic.follow}}</em>
          <span>关注</span>
        </span>
        <span class="fans">
          <em class="oneline">{{topic.fans}}</em>
          <span>粉丝</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      topic:{name:"",autograph:"",article:0,product:0,favorite:0,follow:0,fans:0,logo:"",hits:0}
    }
  }
</script>
