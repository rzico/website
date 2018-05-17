<template>
  <div class="" v-if="article.dragonId > 0">
  <div class="solitaireBox">
    <div class='chooseBox'>
      <span class='chooseBoxTitle'>{{article.dragonName}}发起的接龙名单</span>
    </div>
    <div class='numberBox'  @click="hasList()">
      <div class='numberBoxTitle'>已有
        <span>{{recordsTotal}}</span>人参与接龙</div>
      <span class='iconfont icon-xiajiantou'></span>
    </div>
    <div class='shopBox' v-if="hasSolitaireList" v-for="item in dragonList">
      <div class='memberInfo'>
        <img class='memberLogo' :src="item.logo"/>
        <span class='memberName'>{{item.name}}</span>
      </div>
      <div class='shopBigBox'>
        <div class='shopClass' v-for="c in item.orderItems" >
          <div class='flex-row'>
            <img class='shopLogo' :src="c.thumbnail"/>
            <div class='flex-column'>
              <span class='shopName'>{{c.name}}</span>
              <div class='shopClassInfo'><span>{{c.spec}}</span> X {{c.quantity}}</div>
            </div>
          </div>
          <span class='shopMoney'>¥ {{item.amount}}</span>
        </div>
      </div>
    </div>
    <div class='clickBox' @click='OFFMask()'>我也要接龙</div>
  </div>
    <!--确认接龙弹窗-->
    <div class='mask' v-if="hasToastMask">
      <div class='shareToast'>
        <span class='shareToastText'>确认发起接龙吗？</span>
        <span class='shareToastContent'></span>
        <div class='shareToastBottom'>
          <div class='leftButton' @click='downToastMask'>取消</div>
          <div class='rightButton' @click="MyDragon">确认</div>
        </div>
      </div>
    </div>
  <!-- 分享弹窗 -->
  <div class='mask' v-if="hasDragonMask">
    <div class='shareToast'>
      <span class='shareToastText'>发起接龙成功</span>
      <span class='shareToastContent'>请分享给群友，收集更多订单。</span>
      <div class='shareToastBottom'>
        <div class='leftButton' @click='downMask'>取消</div>
        <div class='rightButton' @click='toastMessage()'>确认</div>
      </div>
    </div>
  </div>
  <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .solitaireBox{
    /*width: 100%;*/
    border-radius: 5px;
    border:1px #ccc solid;
    display: flex;
    flex-direction: column;
    margin: 30px 15px;
    box-sizing: border-box;
    background-color: white;

  }
  .chooseBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-bottom: 1px #ccc solid;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .chooseBoxTitle{
    max-width:70%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    font-size: 16px;
    color: #999;
  }
  .clickBox{
    margin: 10px 25px;
    height: 30px;
    border-radius: 7px;
    background-color: #EB4E40;
    font-size: 14px;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .numberBox{
    height: 35px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px #ccc solid;
  }
  .numberBoxTitle{
    font-size: 13px;
    color: #999;
  }
  .numberBoxTitle>span{
    font-size: 14px;
    color: red;
    margin: 0 5px;
  }
  .shopBox{
    display: flex;
    flex-direction: column;
    border-bottom:5px solid #eee;
    width: 100%;
    padding:5px 0;
    box-sizing: border-box;
  }
  .memberInfo{
    padding-bottom: 5px;
    margin: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* border-bottom: 1rpx solid #ccc; */
  }
  .memberLogo{
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border:1px solid #ccc;
    background-color:#ccc;
  }
  .memberName{
    font-size: 14px;
    margin-left: 10px;
    color: red;
  }
  .shopClass{
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
  }
  .flex-column{
    display: flex;
    flex-direction: column;

  }
  .flex-row{
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .shopLogo{
    background-color:#fff;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border:1px solid #ccc;
  }
  .shopName{
    font-size: 14px;
    margin-left: 10px;
    max-width: 200px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .shopMoney{
    font-size: 14px;
    color: #888;
  }
  .shopBigBox{
    background-color: #eee;
    margin: 0 5px;
    box-sizing: border-box;
    padding-bottom: 5px;
  }
  .shopClassInfo{
    font-size: 14px;
    margin-left: 10px;
    width:60%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .shopClassInfo>span{
    font-size: 14px;
    color:#888;
  }

  /* 分享弹窗 */
  .mask{
    position:fixed;
    height: 100%;
    width: 100%;
    top: 0;
    background-color: rgba(000, 000, 000, 0.7);
    z-index: 999999999999999999999999;
    display: flex;
    align-items: center;
    justify-content: center
  }
  .shareToast{
    width: 100%;
    margin: 0 25px;
    box-sizing: border-box;
    background-color:white;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .shareToastText{
    font-size: 18px;
    margin: 15px 0;
  }
  .shareToastContent{
    font-size: 14px;
    color: #777;
    margin-top: 10px;
  }
  .shareToastBottom{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #eee;
    width: 100%;
    margin-top: 25px;
    height: 50px;
  }
  .leftButton{
    display: flex;
    flex: 1;
    border-right: 1px solid #eee;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 18px;
  }
  .leftButton:active{
    background-color: #eee;
    border-bottom-left-radius: 8px;
  }
  .rightButton{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 18px;
  }
  .rightButton:active{
    background-color: #eee;
    border-bottom-right-radius: 8px;
  }
</style>

<script>
  import { POST, GET } from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        rewards: [],
        recordsTotal:0,
        dragonList:[],
        orderItems:[],
        hasToastMask:false,
        hasDragonMask:false,
        hasSolitaireList:true
      }
    },
    props: {
      article: { default: function () {
        return {dragonId:0}
      }
      },
    },
    components: {
      Toast
    },
    mounted() {
      var _this = this;
//      因为props不在dom结构里 ，mounted会先加载，所以延迟1秒
      setTimeout(() => {
        console.log(this.article);
        _this.open_dragon()
      }, 1000)
    },
    methods: {
      // 接龙数据
      open_dragon: function () {
        var _this = this;
        GET("applet/article/dragon.jhtml?dragonId=" + _this.article.dragonId).then( function (res) {
          if (res.type == 'success') {
            _this.recordsTotal = res.data.recordsTotal
            _this.dragonList = res.data.data;
          } else {
            _this.$refs.toast.show(res.content);
          }
        }, function (err) {
          _this.$refs.toast.show(err.content);
        })
      },

      // 我也要接龙
      MyDragon:function(){
        var _this = this
//              用户点击确定
              POST("applet/member/dragon/create.jhtml?articleId="+_this.article.id).then(function (res) {
                  if (res.type == 'success') {
                    _this.hasToastMask = false;
                    _this.hasDragonMask = true;
                    _this.article.dragonId = res.data.id;
                    _this.dragonList = [];
                    _this.open_dragon()
                  } else {
                    _this.$refs.toast.show('');
                  }
                }, function (res) {
                _this.$refs.toast.show('');
                }
              )
      },
//      点击分享时提示
      toastMessage:function () {
        this.$refs.toast.show('请点击右上角分享');
        this.hasDragonMask = false
      },
//      开启是否接龙弹窗
      OFFMask:function () {
        var _this = this
        _this.hasToastMask = true
      },
      // 关闭接龙弹窗
      downMask:function(){
        var _this = this
        _this.hasDragonMask = false
      },
      // 关闭是否接龙弹窗
      downToastMask:function(){
        var _this = this
        _this.hasToastMask = false
      },
      // 控制接龙列表显示隐藏
      hasList:function(){
        var _this = this
        this.hasSolitaireList = !this.hasSolitaireList

      }
    }
  }
</script>
