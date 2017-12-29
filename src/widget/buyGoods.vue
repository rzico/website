<template>
  <div class="page mask"  style="position: fixed;bottom: 0;z-index: 1" v-if="isShow" >
    <div class="maskHide" @click="maskHide()"></div>
    <div class="box" v-for="item in goodsData">
      <div class="headerBox">
        <img class="goodsImg" :src="item.thumbnail" alt="">
        <div class="goodsInfo">
          <div>
            <span class="priceNow">¥ {{item.price | watchPrice}}</span>
            <span class="priceBefore sub_title" style="font-size: 14px">原价160.00</span>
          </div>
          <div>
            <span class="sub_title goodsName" >{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="specScrollBox">
        <div class="flexRow buyNumberBox" >
          <div>
            <span class="fontSize16">购买数量</span>
          </div>
          <div class="flexRow" style="align-items: center">
            <span class="iconfont icon-jian iconAddSub"   @click="numSub()"></span>
            <span class="buyNumber">{{buyNum}}</span>
            <span class="iconfont icon-jia1 iconAddSub"   @click="numAdd()"></span>
          </div>
        </div>
        <div class="specBox" v-if="item.products[0].spec1 != ''">
          <div class="flexRow"  style="margin-top: 10px">
            <div class="specName" >
              <span class="fontSize16">规格1</span>
            </div>
            <div>
              <span v-for="(spec1,index) in item.products"  v-if="isSpec1Rrepeat(index,item.products)" :class="[spec1Name == spec1.spec1 ? 'specChoose' : '',spec1.isSpec1 != '1' ? '' : 'grayColor']" class="specStyle" @click="spec1Choose(spec1)">{{spec1.spec1}}</span>
            </div>
          </div>
          <div class="flexRow"  v-if="hasSpec2(item.products)">
            <div class="specName">
              <span class="fontSize16">规格2</span>
            </div>
            <div>
              <span v-for="(spec2,index) in item.products" v-if="isSpec2Rrepeat(index,item.products)" class="specStyle" :class="[spec2Name == spec2.spec2 ? 'specChoose' : '',spec2.isSpec2 != '1' ? '' : 'grayColor']"  @click="spec2Choose(spec2)">{{spec2.spec2}}</span>
            </div>
          </div>
        </div>
        <!--<cells type="access" style="margin: 0px;border-top:1px solid #eee;border-bottom: 1px solid #eee">-->
          <!--<div class="weui_cell" style="padding: 10px;" @click="drop()">-->
            <!--<cell-header><div style="line-height: 20px"><span class="iconfont icon-dingdanxiangqing icon48" style="font-size: 20px;line-height: 20px;color: #444;" ></span></div></cell-header>-->
            <!--<cell-body><span style="font-size: 14px">优惠券</span></cell-body>-->
            <!--<cell-footer ><span class="arrow" style="color:red;font-size: 14px;padding-right: 10px">-¥ 3.00</span></cell-footer>-->
          <!--</div>-->
        <!--</cells>-->
        <div class="address ">
          <p class="fontSize18">某某某 15860***375</p>
          <p class="fontSize18" style="font-size: 14px">福建省厦门市湖里区兴隆路福建省厦门市湖里区兴隆路福建省厦门市福建省厦门市</p>
          <p class="rightArrow"></p>
        </div>

        <div class="flexRow preferentialBox" v-if="couponName != ''">
          <span class="preferential">{{couponName}}</span>
        </div>
      </div>
      <div class="footer" v-bind:disabled="disabledButton">
        <div class="footerLeft">
          <span>实付金额 ¥ {{finallPrice}}</span>
          <span class="promtText">(含运费)</span>
        </div>
        <div class="footerRight" @click="completeBuy()">
          <span>确认购买</span>
        </div>
      </div>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .promtText{
    font-size: 12px;color: #999;
  }
  .fontSize16{
    font-size: 14px;
    line-height: 16px;
  }
  .buyNumberBox{
    justify-content: space-between;padding-left:10px;align-items: center;border-bottom: 1px solid #eee;
  }
  .buyNumber{
    padding: 0 10px;font-size: 16px;line-height: 16px;display: inline-block;
  }
  .iconAddSub{
    font-size: 20px;padding: 10px 10px;
  }
  .preferentialBox{
    position: relative;padding: 10px;border-top: 1px solid #eee;
  }
  .preferential{
    text-align: right;display: inline-block;width: 100%;color:red;font-size: 15px;line-height: 15px;
  }
  .specScrollBox{
    position: absolute;top: 80px;bottom: 50px;overflow: scroll;
  }
  .grayColor{
    color: #999;
  }
  .specChoose{
    background-color: red;
    color: #fff;
  }
  .maskHide{
    height:30%;
  }
  .footerLeft{
    width: 60%;
    color: red;
    font-size: 16px;
    line-height: 50px;
    font-weight: 600;
  }
  .footerRight{
    width: 40%;
    background-color: red;
    color: #fff;
    font-size: 17px;
    line-height: 17px;
    line-height: 50px;
  }
  .specName{
    padding-top: 4px;
    width: 42px;
    min-width: 42px;
    font-size: 16px;
  }
  .flexRow{
    flex-direction: row;
    display: flex;
  }
  .specStyle{
    font-size: 14px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: inline-block;
    padding:4px 8px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .specBox{
    padding:0 10px;
  }
  .rightArrow{
    content: " ";
    display: inline-block;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 8px;
    width: 8px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    position: absolute;
    top: 49% ;
    right: 10px;
  }
  .fontSize18{
    font-size: 15px;
    line-height: 25px;
    color: #999;
  }
  .address{
    margin:0 0 0px 0;
    position: relative;
    border-top: 1px solid #eee;
    /*border-bottom: 1px solid #eee;*/
    padding: 10px;
    padding-right:25px;
  }
  .goodsName{
    display:block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    position: absolute;
    left: 120px;
    right: 10px;
    bottom: 30px;
  }
  .priceBefore{
    text-decoration:line-through;
  }
  .sub_title{
    font-size: 15px;
    line-height: 16px;
    color: #999;
  }
  .priceNow{
    font-size: 20px;
    line-height: 20px;
    color: red;
  }
  .headerBox{
    position: relative;
    display: flex;
    flex-direction: row;
    /*background-color: red;*/
  }
  .goodsInfo{
    margin: 10px 0 0 35px;
  }
  .goodsImg{
    position: relative;
    top: -15px;
    left: 15px;
    width: 90px;
    height: 90px;
    border: 1px solid #d9d9d9;
    padding: 5px;
    background-color: #fff;

  }
  .footer {
    padding-top: 0px;
    display: flex;
    flex-direction: row;
    background-color: #eee;
    box-sizing: border-box;
    width:100%;
    height: 50px;
    justify-content: space-between;
    position: absolute;
    bottom: 0px;
    text-align: center;
    z-index: 99;
  }
  .box {
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 0px;
    background-color: #fff;
  }

</style>
<script>

  import Toast from './toast.vue';
  import Button from './button.vue';
  import Cells from './cells.vue';
  import Cell from './cell.vue';
  import LinkCell from './link-cell.vue';
  import dropdown from './dropdown.vue';
  import { POST, GET } from '../assets/fetch.js';
  import wx from 'weixin-js-sdk'
  import utils from '../assets/utils';
  export default {
    components: {
      Toast,
      'weui-button': Button,
      Cells,
      Cell,
      LinkCell,
      dropdown,
    },
    data: function () {
      return {
        finallPrice:999,
        productId:'',
        buyNum:1,
        hideData:"2",
        spec1Name:'',
        spec2Name:'',
        goodsData:[],
        sn: "",
        disabledButton:false,
        isShow: false,
        isPwd: false,
        couponName:''
      }
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      }
    },
    methods: {
//      确认购买
      completeBuy:function () {
        var _this = this;
        console.log("website/member/order/create.jhtml?id=" + this.productId + '&quantity=' + this.buyNum + '&receiverId=1');
        POST("website/member/order/create.jhtml?id=" + this.productId + '&quantity=' + this.buyNum + '&receiverId=1').then(
          function (data) {
//            alert(data);
            if (data.type=="success") {
//              let s = JSON.stringify(data);
//              alert(s);
              _this.goPay(data.data.sn);
            } else {
              _this.close(data);
            }
            _this.disabledButton = false;
          },
          function (err) {
            err = JSON.stringify(err);
            alert(err);
//            console.log('1');
            _this.disabledButton = false;
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },
//      发起支付
      goPay(sn){
        let _this = this;
        POST('website/member/order/payment.jhtml?sn=' + sn).then(
          function (data) {
            if (data.type=="success") {
              if(utils.isNull(data.data.paymentPluginId)){
                  if(utils.isalipay()){
                    _this.alipay(data.data.sn);
                  }else if(utils.isweixin()){
                    _this.weixin(data.data.sn);
                  }
              }else if(data.data.paymentPluginId == 'cardPayPlugin'){//会员卡支付
                    let payInfo = {
                      way:'会员卡支付',
                      price:_this.finallPrice,
                      sn:data.data.sn
                    };
                    _this.$emit('payConfirm',payInfo);
              }else if(data.data.paymentPluginId == '"balancePayPlugin'){//余额支付
                let payInfo = {
                    way:'余额支付',
                    price:_this.finallPrice,
                    sn:data.data.sn
                };
                _this.$emit('payConfirm',payInfo);
              }
            } else {
              _this.close(data);
            }
            _this.disabledButton = false;
          },
          function (err) {
            err = JSON.stringify(err);
            alert(err);
            _this.disabledButton = false;
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },

      alipay:function (sn) {
        var _this = this;
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=aliPayPlugin").then(
          function (res) {
            if (res.type=="success") {
              AlipayJSBridge.call("tradePay",{
                "tradeNO": res.data.tradeNO
              }, function(result){
                if(result.resultCode == '9000'){
                  _this.$router.push({name:"message",query:{psn:sn,amount:_this.bill.amount-_this.bill.couponDiscount}})
                } else {
                  _this.$refs.toast.show(result.memo);
                }
              });
            }
            else {
              _this.$refs.toast.show("网络不稳定");
            }

          },
          function (err) {
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
      weixin:function(sn) {
        var _this = this;
        POST("payment/submit.jhtml?sn="+sn+"&paymentPluginId=weixinPayPlugin").then(
          function (res) {
            if (res.type=="success") {
              WeixinJSBridge.invoke('getBrandWCPayRequest',{
                "appId" : res.data.appId,
                "timeStamp":res.data.timeStamp,
                "nonceStr" :res.data.nonceStr,
                "package" :res.data.package,
                "signType" :res.data.signType,
                "paySign" : res.data.paySign,
              },function(res){

                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  _this.$router.push({name:"message",query:{psn:sn,amount:_this.bill.amount-_this.bill.couponDiscount}})
                } else {
                  _this.$refs.toast.show("支付失败");
                }

              });
            }
            else {
              _this.$refs.toast.show("网络不稳定");
            }

          },
          function (err) {
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },

//      购买数量+1
      numAdd:function () {
        this.buyNum ++ ;
        if(this.spec1Name != '' && this.spec2Name != ''){
          this.calcPrice();
        }
      },
//      购买数量-1
      numSub:function () {
        if(this.buyNum == 1){
          return;
        }
        this.buyNum -- ;
        if(this.spec1Name != '' && this.spec2Name != ''){
          this.calcPrice();
        }
      },
//      选择规格2时触发
      spec2Choose:function (spec2) {
        let _this = this;
        if(spec2.spec2 == this.spec2Name){
          this.spec2Name = '';
          this.goodsData[0].products.forEach(function (data) {
              _this.$set(data,'isSpec1','2');
          })
          return;
        }
        //        判断规格1所属的规格2是否有该项
        if(spec2.isSpec2 == '1'){
          return;
        }
        this.spec2Name = spec2.spec2;

        this.goodsData[0].products.forEach(function (item) {
          if(item.spec2 == spec2.spec2){
            _this.goodsData[0].products.forEach(function (data) {
                if(item.spec1 == data.spec1){
                  _this.$set(data,'isSpec1','2');
                }

            })
          }else{
            _this.$set(item,'isSpec1','1');
          }
        })

        if(this.spec1Name == ''){
          return;
        }else {
          let _this = this;
//          更改图片和价格
          this.goodsData[0].products.forEach(function (item) {
            if (item.spec1 == _this.spec1Name && item.spec2 == _this.spec2Name) {

//          更改商品规格
              _this.productId = item.productId;

              _this.goodsData[0].price = item.price;
              _this.goodsData[0].thumbnail = item.thumbnail;
              console.log(_this.goodsData);
            }
          })
          this.calcPrice();
        }
      },
//      计算最终价格
      calcPrice(){
        let _this = this;
//          计算价格信息
        POST('website/member/order/calculate.jhtml?id=' + this.productId + '&quantity=' + this.buyNum).then(
          function (data) {
            if(data.type == 'success'){
              if(data.type == 'success'){
                _this.finallPrice = data.data.amount;
                _this.couponName = data.data.couponName;
              }
            }else{
              _this.close(data);
            }
          },function (err) {
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },
//      选择规格1时触发
      spec1Choose:function (spec1) {
        let _this = this;
        if(spec1.spec1 == this.spec1Name){
          this.spec1Name = '';
          this.goodsData[0].products.forEach(function (data) {
            _this.$set(data,'isSpec2','2');
          })
          return;
        }
//        判断规格2所属的规格1是否有该项
        if(spec1.isSpec1 == '1'){
          return;
        }
        this.spec1Name = spec1.spec1;
        this.goodsData[0].products.forEach(function (item) {
          if(item.spec1 == spec1.spec1){
              _this.goodsData[0].products.forEach(function (data) {
                if(item.spec2 == data.spec2){
                  _this.$set(data,'isSpec2','2');
                }
              })
          }else{
            _this.$set(item,'isSpec2','1');
          }
        })
        if(this.spec2Name == ''){
          return;
        }else{
          let _this = this;
          //          更改图片和价格
          this.goodsData[0].products.forEach(function (item) {
            if(item.spec1 == _this.spec1Name && item.spec2 == _this.spec2Name){
//          更改商品规格
              _this.productId = item.productId;
              console.log(item)
              _this.goodsData[0].price = item.price;
              _this.goodsData[0].thumbnail = item.thumbnail;
            }
          })
          this.calcPrice();
        }
      },
//      判断是否有规格2
      hasSpec2(products){
        var a = 0;
        products.forEach(function (item) {
          if(!utils.isNull(item.spec2)){
            a ++ ;
          }
        })
        if(a > 0){
          return true;
        }else{
          return false;
        }
      },
    //判断规格1重复
      isSpec1Rrepeat(index,item){
//        return true;
        var _this = this;
        if(index != 0){
          for(var i = index;i > 0;i--){
            if (item[index].spec1 == item[i - 1].spec1) {
              return false
            }
          }
          return true;
        } else {
          return true;
        }
      },
      //判断规格2重复
      isSpec2Rrepeat(index,item){
//        return true;
        var _this = this;
        if(index != 0){
          for(var i = index;i > 0;i--){
            if (item[index].spec2 == item[i - 1].spec2) {
              return false
            }
          }
            return true;
        } else {
          return true;
        }
      },
//       开始时触发
      show:function (sn) {
        this.isShow = true;
        let _this = this;
        GET('website/product/view.jhtml?id='+sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.goodsData = [];
              _this.finallPrice = data.data.products[0].price;
              data.data.price = data.data.products[0].price;
              data.data.thumbnail = data.data.products[0].thumbnail;
              _this.spec1Name = '';
              _this.spec2Name = '';
              _this.buyNum = 1;
              _this.goodsData.push(data.data);
            }else{
              alert(data.content);
            }
            console.log(_this.goodsData);
          },function (err) {
            alert(err.content);
          })
      },
      goback:function () {
        this.close(utils.message("error","取消支付"));
      },
      close (e) {
        this.isShow = false;
        this.$emit("notify", e);
      },
      hide(){
        this.isShow = false;
      },
      maskHide:function () {
        this.isShow = false;
      },

//methods 方法到此为止
    },
  }
</script>
