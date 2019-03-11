<template>
  <div class="registered-page">
    <div class="registered-header">
      <span>注册</span>
    </div>
    <div class="registered-phone">
      <span>+86</span>
      <input type="tel" placeholder="手机号">
    </div>
    <div class="registered-code registered-cell">
      <input type="tel" placeholder="短信验证码">
      <div>
        <span @click="send()">{{time==0?'获取验证码':'剩余'+time+'秒'}}</span>
      </div>
    </div>
    <input type="text" placeholder="密码(长度6～16位，数字、字母)" class="registered-keyword">

    <input type="text" placeholder="重复密码(长度6～16位，数字、字母)" class="registered-keyword">
    <div class="registered-rule">
      <span class="demo2 " @click="doAgree()" :class="[isAgree ? 'demo3' : '']"></span>
      <div style="flex-direction: row">
        <span style="color: #444;font-size: 15px;margin-left: 5px" @click="doAgree()">我已阅读并同意遵守 </span>
        <span style="color: #000;font-size: 15px;" @click="goRule">服务条款</span>
      </div>
    </div>
    <div class="registered-button">
      <span>注册</span>
    </div>
    <div class="registered-footer">
      <span>点击下方链接下载APP</span>
    </div>
    <div >
      <div class="ios" style="margin-top: 15px;text-align: left"><a @click="downApp" href="#"><i class="iconfont">&#xe632;</i> ios下载</a></div>
      <div class="android" style="margin-top: 15px"><a @click="downApp" href="#"><i class="iconfont">&#xe633;</i> 安卓下载</a></div>
    </div>
  </div>


</template>

<style>

  @font-face {
    font-family: 'iconfont';  /* project id 983937 */
    src: url('//at.alicdn.com/t/font_983937_xqmg0us3baq.eot');
    src: url('//at.alicdn.com/t/font_983937_xqmg0us3baq.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_983937_xqmg0us3baq.woff') format('woff'),
    url('//at.alicdn.com/t/font_983937_xqmg0us3baq.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_983937_xqmg0us3baq.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  /*.ss{*/
  /*color: #717a8e;*/
  /*}*/
  .demo2 {
    width:20px;
    height:20px;
    border-radius:10px ;
    background:gray;
    display:block;
    position: relative;
  }

  .demo3:before, .demo3::after {
    content:"";
    height:14px;
    width:3px;
    border-radius: 10px;
    display:block;
    background:white;
    position: absolute;
    top:3px;/*40-6=34*/
    left:10px;/*make the two rects in the middle of the cycle */
    transform:rotate(45deg);
    -ms-transform:rotate(45deg);
  }
  .demo3::before {
    height:7px;
    transform: rotate(-45deg);
    -ms-transform:rotate(-45deg);
    position: absolute;
    top:8px;/*40-18=12  */
    left:4px;
  }

  .registered-footer span{
    font-size: 16px;
  }
  .registered-footer{
    margin-top: 30px;
  }

  .registered-button span{
    font-size: 24px;
    color: #fff;
  }
  .registered-button{
    margin-top: 15px;
    width: 90%;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #5379de;
    line-height: 60px;
    height: 60px;
    text-align: center;
  }
  .registered-rule{
    margin-top: 15px;
    display: flex;
    flex-direction: row;
  }
  .registered-keyword{
    width:90%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin-top: 15px;
    padding-left: 10px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .registered-code div{
    width: 35%;
    border: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
  }
  .registered-code span{
    font-size: 16px;
  }
  .registered-code{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
  }
  .registered-code input{
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid #eee;
    width:55%;
    height: 50px;
    font-size: 18px;
    background-color: #fff;
    line-height: 50px;
  }
  .registered-phone span{
    width:15%;
    color: #444;
    font-size: 20px;
    text-align: left;
    padding-left: 10px;
  }
  .registered-phone input{
    width:85%;
    height: 40px;
    font-size: 18px;
  }
  .registered-page input{
    border: none;
    outline:medium;
  }
  .registered-cell{
    width:90%;
    /*margin-left: 5%;*/
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
  }
  .registered-phone{

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    box-sizing: border-box;
    width:90%;
    /*margin-left: 5%;*/
    border: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
  }
  .registered-header{
    font-size: 20px;
  }
  .registered-header{
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    background-color: #f9f9f9;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .registered-page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eaeaea;
  }
</style>

<script>
  export default {
    data() {
      return {
        title: '注册',
        timer:null,
        time:0,
        isAgree:false,
        mode:50
      }
    },
    methods: {
      jump() {
      },
      beginTimer:function () {
        var _this = this;
        if (this.timer!=null) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.time = 60;
        setTimeout(function () {
          _this.mode = 58
        },100)
        this.timer = setInterval(
          function () {
            _this.time=_this.time - 1;
            if(_this.time == 0){
              clearInterval(_this.timer);
              _this.timer = null;
            }
          },1000)

      },
      send(){
        if(this.timer!=null){
          return;
        }
        this.beginTimer()
      },
      doAgree(){
        this.isAgree = !this.isAgree
      },
      downApp(){

      },
      goRule(){
      }
    }
  }
</script>
