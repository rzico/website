<template>
  <div class=" auther " v-if="article.member.autograph !=''"  @click="jump(article.member.url,article.member.id)">
    <div class="autherwrap" style="min-height: 96px;" >
      <a class="toappuser">
        <div class="autherHead">
          <img v-bind:src="article.member.logo | watchImg"/>
        </div>
        <div class="userMessage">
          <p class="wusername" style="overflow: hidden">
            {{article.member.nickName}}</p>
          <p class="wsign"  v-if="article.member.autograph != ''" >
            {{article.member.autograph==null?"留下签名有助于提升知名度":article.member.autograph}}  </p>
        </div>
        <img v-if="article.member.qrcode != null" :src='article.member.qrcode'  alt="" class="qrcode">
        <div class="right iconfont icon-xiangyoujiantou icon-arrow"></div>
      </a>
    </div>
  </div>
</template>
<style>
  .seasons .auther {
    min-height: 96px;
    margin: 0;
    /*padding-top: 8px;*/
    background-color: transparent;
    border-top: 8px solid rgba(218, 219, 184, 0.5);
  }

  .seasons .card {
    width: 100%;
    height:auto;
  }

  .seasons .auther .autherwrap {
    width: 100%;
    background-color: transparent;
    /*border-top: 1px solid rgba(218, 219, 184, 0.5);*/

  }

  .seasons .auther .autherwrap a {
    display: block;
    padding-left: 86px;
    padding-right: 28px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    box-shadow: none;
    border: none;
  //background-color: #fff;
    border-radius: 0;
    overflow: hidden;
    text-shadow: none;
  }

  .seasons .auther .autherwrap a .autherHead {
    height: 86px;
    width: 86px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .seasons .auther .autherwrap a .userMessage {
    padding-top: 19px;
    float: left;
    width: 100%;
    line-height: 1.6;
  }
  .seasons .auther .autherwrap a .qrcode {
    width: 200px;height: 200px;margin-top: 19px;margin-bottom: 19px;
  }

  .seasons .auther .autherwrap a .right {
    height: 100%;
    width: 42px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 86px;
    font-size: 12px;
    color: #D5D5D5;
    font-weight: bold;
  }

  .seasons .auther .autherwrap a .autherHead img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 54px;
    width: 54px;
    border-radius: 50%;
  }

  .seasons .auther .autherwrap a .userMessage .wusername {
    font-size: 16px;
    color: #DADBB8;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .seasons .auther .autherwrap a .userMessage .wsign {
    font-size: 14px;
    color: #A2A580;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>
<script>
  import utils from '../../../assets/utils.js';
  import {POST, GET} from '../../../assets/fetch.js';
  export default {
    data:function () {
      return{
        twoSecond:1,
        hadLoad:0,
        articleTempId:this.templateId,
      }
    },
    props: {
      article: { default: function () {
        return {member:{logo:"",autograph:"",nickName:""}}
      }
      },
      templateId:{default:1001}
    },
    filters:{
//        用原图去阿里云获取缩略图
      watchImg:function(value) {
        return utils.thumbnail(value,54,54);
      }
    },
    methods:{
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      },

    }
  }
</script>
