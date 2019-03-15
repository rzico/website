<template>
  <div class="registered-page">
    <!--<div class="registered-header">-->
      <!--<span>注册</span>-->
    <!--</div>-->
    <div class="registered-phone">
      <span>+86</span>
      <input type="tel" placeholder="手机号"  v-model="telPhone">
    </div>
    <div class="registered-code registered-cell">
      <input type="tel" placeholder="短信验证码" v-model="registered">
      <div>
        <span @click="send()">{{time==0?'获取验证码':'剩余'+time+'秒'}}</span>
      </div>
    </div>
    <input type="password" placeholder="密码(长度6～16位，数字、字母)" class="registered-keyword" v-model="password">
    <input type="password" placeholder="重复密码(长度6～16位，数字、字母)" class="registered-keyword" v-model="passwordTwo">
    <div class="registered-rule">
      <span class="demo2 " @click="doAgree()" :class="[isAgree ? 'demo3' : '']"></span>
      <div style="flex-direction: row">
        <span style="color: #444;font-size: 15px;margin-left: 5px" @click="doAgree()">我已阅读并同意遵守 </span>
        <span style="color: #000;font-size: 15px;">服务条款</span>
      </div>
    </div>
    <div class="registered-button" @click="submit()">
      <span>注册</span>
    </div>
    <div class="registered-footer">
      <span>点击下方链接下载APP</span>
    </div>
    <div class="downBox" style="margin-top: 10%;">
      <div class="ios" style="margin-right: 15%;" @click="downApp"><i class="iconfont" style="margin-right: 10px">&#xe632;</i> ios下载</div>
      <div class="ios"  @click="downApp"><i class="iconfont" style="margin-right: 10px">&#xe633;</i> 安卓下载</div>
    </div>
    <img class="guideImg" :src="guide" v-if="isGuide" @click="downImg"/>
  </div>


</template>

<style>
  .guideImg{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .downBox{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .ios{
    background-color: #5379de;
    border-radius: 5px;
    width: 30%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #ffffff;
  }
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
  import {POST, GET} from '../assets/fetch';
  import utils from '../assets/utils'
  export default {
    data() {
      return {
        checked:false,
        title: '注册',
        timer:null,
        time:0,
        isAgree:true,
        mode:50,
        telPhone:'',
        registered:'',
        password:'',
        passwordTwo:'',
        xuid:'',
        guide:'./static/guide.png',
        isGuide:false
      }
    },
    created() {
      this.xuid = utils.getUrlParameter("xuid");
    },
    methods: {
      downImg() {
        this.isGuide =false
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
        if(this.checked){
          return
        }
        this.checked = true
        if(utils.isNull(this.telPhone)){
          alert('请填写手机号码')
          return
        }
        let _this = this;
        GET("common/public_key.jhtml").then(
          function (data) {
            POST("weex/register/send_mobile.jhtml?mobile="+encodeURIComponent(utils.encrypt(_this.telPhone,data.data))).then(
              function (res) {
                _this.checked = false
                if (res.type == "success") {
                  _this.beginTimer();
                } else {
                  alert(res.content)
                }

              },
              function (err) {
                _this.checked = false
                alert(err.content)
              }

            )
          },
          function (err) {
            _this.checked = false
            alert("加密失败")
          }
        )
      },
      submit(){
        let _this = this;
        if(utils.isNull(this.registered)){
          alert('请填写手机获取验证码')
          return
        }else  if(utils.isNull(this.password)){
          alert('请输入密码')
          return
        }else  if(utils.isNull(this.passwordTwo)){
          alert('请输入密码')
          return
        }else if(/^[\u3220-\uFA29]+$/.test(this.password)){
          alert('请输入数字或字母')
          return true;
        }else if(/^[\u3220-\uFA29]+$/.test(this.passwordTwo)){
          alert('请输入数字或字母')
          return true;
        }else  if(this.password != this.passwordTwo){
          alert('请输入相同的密码')
          return
        }else  if(!this.isAgree){
          alert('请同意服务条款')
          return
        }
        GET("weex/common/public_key.jhtml").then(
          function (data) {
            POST('weex/register/submit.jhtml?captcha=' + _this.registered  +'&enPassword='+utils.encrypt(_this.passwordTwo,data.data) +'&xuid='+ _this.xuid).then(
              function (res) {
                if (res.type == "success") {
                  alert('注册成功,请下载APP')
                } else {
                  alert(res.content)
                }
              },function (err) {
                alert("网络不稳定请重试")
              }
            )
          },
          function (err) {
            alert("加密失败")
          }
        )

      },
      doAgree(){
        this.isAgree = !this.isAgree
      },
      downApp(){
//        if(utils.isweixin()){
//          this.isGuide = true
//        }else {
          window.open('http://qmsl.wapxk.com')
//        }
      },
    }
  }
</script>
