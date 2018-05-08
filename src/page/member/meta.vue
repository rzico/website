<template>
  <div class="head">
    <div class="backg"></div>
    <div class="logo">
      <div class="logoimg bg" :style="'background-image: url('+member.logo+')'">
      </div>
      <span class="profile">
        <div class="nickname">{{member.nickName}}</div>
        <div class="signature">{{member.autograph}}</div>
        <!--<div class="num oneline">文章 {{member.article}}&nbsp;&nbsp;宝贝 {{member.product}}&nbsp;&nbsp;{{member.hits==0?'':'被访问'+member.hits}}</div>-->
        <!--需要显示文章、宝贝等 把下行代码删除,恢复上行代码-->
        <div class="num"> </div>
      </span>
      <!--<div class="about">-->
        <!--<span class="mark">-->
          <!--<em class="">{{member.favorite}}</em>-->
          <!--<span>收藏</span>-->
        <!--</span>-->
        <!--<span class="pink">-->
          <!--<em class="">{{member.follow}}</em>-->
          <!--<span>关注</span>-->
        <!--</span>-->
        <!--<span class="fans">-->
          <!--<em class="">{{member.fans}}</em>-->
          <!--<span>粉丝</span>-->
        <!--</span>-->
      <!--</div>-->
    </div>
  </div>
</template>
<style scoped>
   .head {
    height: 187.5px;
    width: 100%;
    position: relative;
    overflow: hidden;
    letter-spacing: 0;
    line-height: 1;
    margin-top: 0;
     /*background-color: #EB4E40;*/
  }
   .head .logo {
    /*background-color: rgba(0,0,0,.2);*/
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #ccc;
  }

   .head .logo .logoimg {
    margin-top: 35px;
    margin-bottom: 15px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #bad0e8;
    position: relative;
    background-size: cover;
  }
   .head .backg {
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 187.5px;
     background-image: url('../../../static/member_Bg.png');
    background-size: 100% 100%;
  }

   .head .logo .profile {
    display: block;
    color: #fff;
  }

   .head .logo .profile .nickname {
    width: 210px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin: 0 auto 15px;
  }


   .head .logo .profile .signature {
    margin: 0 auto 20px;
    width: 270px;
    font-size: 12px;
    text-align: center;
     white-space:nowrap;          /* 不换行 */
     overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
     text-overflow:ellipsis;
  }

   .head .logo .profile .num {
    margin: 0 auto 15px;
    width: 270px;
    font-size: 12px;
    text-align: center;
  }


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
