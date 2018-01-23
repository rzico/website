<template>
  <div class="page mask"  style="position: fixed;bottom: 0;z-index: 3000000001" v-if="isShow" >
    <div class="maskHide" @click="maskHide()"></div>
    <div class="box" v-for="item in goodsData">
      <div class="headerBox">
        <img class="goodsImg | watchGoodsImg" :src="item.thumbnail" alt="">
        <div class="goodsInfo">
          <span class="priceNow">¥ {{item.price | watchPrice}}</span>
          <!--<span class="priceBefore sub_title" style="font-size: 14px">原价160.00</span>-->
          <span class="sub_title goodsName" >{{item.name}}</span>
        </div>
      </div>
      <div class="specScrollBox">
        <div class="flexRow buyNumberBox" >
          <div>
            <span class="fontSize16">购买数量</span>
          </div>
          <div class="flexRow" style="align-items: center">
            <span class="iconfont icon-jian iconAddSub"   @click="numSub()"></span>
            <input type="number" class="buyNumber" v-model="buyNum" @input="numInput()">
            <!--<span >{{buyNum}}</span>-->
            <span class="iconfont icon-jia1 iconAddSub"   @click="numAdd()"></span>
          </div>
        </div>
        <div class="specBox" v-if="hasSpecOne">
          <div class="flexRow"  style="margin-top: 10px;align-items: flex-start" >
            <div class="specName" >
              <span class="fontSize16">规格1</span>
            </div>
            <div >
              <span v-for="(spec1,index) in item.products"  v-if="isSpec1Rrepeat(index,item.products)" :class="[spec1Name == spec1.spec1 ? 'specChoose' : '',spec1.isSpec1 != '1' ? '' : 'grayColor']" class="specStyle" @click="spec1Choose(spec1,item.products)">{{spec1.spec1}}</span>
            </div>
          </div>
          <div class="flexRow"  v-if="hasSpecTwo" style="align-items: flex-start">
            <div class="specName">
              <span class="fontSize16">规格2</span>
            </div>
            <div >
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
          <div class="address"  v-for="(item,index) in receiverList" v-if="hasReceiver()" @click="goAddress()">
              <p class="fontSize18">{{item.consignee}} {{item.phone}}</p>
              <p class="fontSize18" style="font-size: 14px">{{item.areaName}}{{item.address}}</p>
            <p class="rightArrow"></p>
          </div>
        <div class="address noAddress" v-else @click="goAddress()">
          <p class="fontSize18 fontSize14" >点击选择收货地址</p>
          <p class="rightArrow top18" ></p>
        </div>

        <div class="flexRow preferentialBox" v-if="couponName != ''">
          <span class="preferential">{{couponName}}</span>
        </div>
      </div>
      <div class="footer" v-bind:disabled="disabledButton" style="z-index: 1">
        <div class="footerLeft">
          <span>实付金额 ¥ {{finallPrice}}</span>
          <span class="promtText">(含运费)</span>
        </div>
        <div class="footerRight" @click="completeBuy()">
          <span>确认购买</span>
        </div>
      </div>
    </div>
    <AddressList ref="address" @selectAddress="selectAddress" @addressAdd="addressAdd" @toastShow="toastShow"></AddressList>
    <AddressAdd ref="addressAdd" @selectAddress="selectAddress" @toastShow="toastShow"></AddressAdd>
    <!--免密支付-->
    <weui-dialog ref="dialog" type="confirm" title="免密支付" confirmButton="确认支付" cancelButton="取消"
                 @weui-dialog-confirm="activate()"
                 @weui-dialog-cancel="closeConfirm()" >
      <div >
        <p style="text-align: center;width: 100%;font-size: 13px;color: #444">{{payWay}}</p>
      </div>
      <div >
        <p style="text-align: center;width: 100%;font-size: 25px;color: #000">¥{{finallPrice}}</p>
      </div>
    </weui-dialog>

    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .noAddress{
    text-align: center;
  }
  .top18{
    top: 18.5px !important;
  }
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
    /*padding: 0 10px;*/
    height:24px;
    width: 30px;
    font-size: 16px;line-height: 16px;display: inline-block;
    text-align: center;
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
    width: 100%;
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
  .fontSize14{
    font-size: 14px;
  }
  .fontSize18{
    font-size: 15px;
    line-height: 25px;
    color: #999;
  }
  .address{
    margin:0;
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
    position: absolute;
    left: 120px;
  }
  .headerBox{
    position: relative;
    display: flex;
    flex-direction: row;
    /*background-color: red;*/
  }
  .goodsInfo{
    margin: 10px 0 0 30px;
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
  import AddressList from './addressList.vue';
  import AddressAdd from './addressAdd.vue';
  import Button from './button.vue';
  import Cells from './cells.vue';
  import Cell from './cell.vue';
  import LinkCell from './link-cell.vue';
  import dropdown from './dropdown.vue';
  import { POST, GET } from '../assets/fetch.js';
  import wx from 'weixin-js-sdk'
  import utils from '../assets/utils';
  import Dialog from './dialog.vue';
  export default {
    components: {
      Toast,
      'weui-button': Button,
      Cells,
      Cell,
      LinkCell,
      dropdown,
      AddressList,
      AddressAdd,
      'weui-dialog':Dialog,
    },
    data: function () {
      return {
        spec2Num:0,//判断是否有规格2
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
        couponName:'',
        articleId:'',
        receiverList:[],
        onecReceiver:false,
        payWay:'账户余额',
        paymentId:'',
        hasSpecTwo:false,
        hasSpecOne:true,
//        payPrice:'299',
      }
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
      watchGoodsImg:function (value) {
        return utils.thumbnail(90,90);
      },
    },
    methods: {
      hasReceiver:function () {
        if(utils.isNull(this.receiverList)  || utils.isNull(this.receiverList[0].id)){
          return false;
        }else{
          return true;
        }
      },
//      确认购买
      completeBuy:function () {
        if(utils.isNull(this.buyNum) || this.buyNum <= 0){
          this.$refs.toast.show('请添加数量');
          return;
        }
        if(utils.isNull(this.receiverList[0].id) || utils.isNull(this.receiverList[0].id)){
          this.$refs.toast.show('请选择地址');
          return ;
        }
        var _this = this;
        POST("website/member/order/create.jhtml?id=" + this.productId + '&quantity=' + this.buyNum + '&receiverId=' + this.receiverList[0].id+'&xuid='+utils.getUrlParameter("xuid")).then(
          function (data) {
            if (data.type=="success") {
              _this.goPay(data.data.sn);
            } else {
              alert('我弹的窗');
              _this.close(data);
            }
            _this.disabledButton = false;
          },
          function (err) {
//            err = JSON.stringify(err);
//            alert(err);
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
//              判断支付方式,为null值时就是微信支付或者支付宝支付
              if(utils.isNull(data.data.paymentPluginId)){
                if(utils.isweixin()){
//                  + '&name=' + encodeURI(_this.goodsData[0].name) + '&articleId=' + _this.articleId;
//                  alert(utils.isIos());

//                  alert(utils.isIos());
//                 判断是否是ios系统，ios系统下 router过去的url路径不会改变，无法正常调起支付
//                  if(utils.isIos()){
                  let config = utils.getConfig();
                  if(config){
                    window.location.href = config.baseURL + 'weixin/payment/view.html?psn=' + data.data.sn + '&amount=' + _this.finallPrice  + '&type=weixin';
                  }

//                  }else{
//                    _this.$router.push({
//                      name: "payment",
//                      query: {psn: data.data.sn, amount: _this.finallPrice,type:'weixin'}
//                    });
//                  }
                }else if(utils.isalipay()){
                  if(utils.isIos()){
                    let config = utils.getConfig();
                    if(config){
                      window.location.href = config.baseURL +'weixin/payment/view.html?psn=' + data.data.sn + '&amount=' + _this.finallPrice   + '&type=alipay';
                    }
                  }else {
                    _this.$router.push({
                      name: "payment",
                      query: {psn: data.data.sn, amount: _this.finallPrice, type: 'alipay'}
                    });
                  }
                }
              }else if(data.data.paymentPluginId == 'cardPayPlugin'){//会员卡支付
//                var payInfo = {
//                  way:'会员卡支付',
//                  price:_this.finallPrice,
//                  sn:data.data.sn
//                };
//                payInfo = JSON.stringify(payInfo);
//                _this.$emit('payConfirm',payInfo);
                _this.sn = data.data.sn;
                _this.payWay = '会员卡支付';
                _this.paymentId = 'cardPayPlugin';
                _this.$refs.dialog.show();
              }else if(data.data.paymentPluginId == 'balancePayPlugin'){//余额支付
//                var payInfo2 = {
//                  way:'余额支付',
//                  price:_this.finallPrice,
//                  sn:data.data.sn
//                };
//                payInfo2 = JSON.stringify(payInfo2);
//                _this.$emit('payConfirm',payInfo2);
//                _this.payPrice = _this.finallPrice;
                _this.paymentId = 'balancePayPlugin';
                _this.sn = data.data.sn;
                _this.payWay = '余额支付';
                _this.$refs.dialog.show();
              }else{
                _this.close(utils.message("error","网络不稳定"));
              }
            } else {
              _this.close(data);
            }
            _this.disabledButton = false;
          },
          function (err) {
//            err = JSON.stringify(err);
//            alert(err);
            _this.disabledButton = false;
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },

//       取消免密支付
      closeConfirm:function () {
        let _this = this;
        this.$refs.dialog.close();
        this.$router.push({
          name: "payment",
          query: {psn: _this.sn, amount: _this.finallPrice ,title:'支付取消',type:encodeURI(_this.payWay)}
        });
      },
//      确定免密支付
      activate:function () {
        let _this = this;
        POST('payment/submit.jhtml?sn='+ this.sn + '&paymentPluginId='+ this.paymentId + '&safeKey=free').then(
          function (data) {
            if (data.type=="success") {
              _this.$refs.toast.show('支付成功');
              _this.$router.push({
                name: "payment",
                query: {psn: _this.sn, amount: _this.finallPrice , title:'支付成功',type:encodeURI(_this.payWay)}
              });
              _this.hide();
            } else {
              _this.$refs.toast.show(data.content);
            }
//            _this.disabledButton = false;
            this.$refs.dialog.close();
          },
          function (err) {
            _this.$refs.toast.show("网络不稳定");
            this.$refs.dialog.close();
          }
        )
      },
//      购买数量+1
      numAdd:function () {
        this.buyNum ++ ;
        if(!this.hasSpecOne){
          this.calcPrice();
        }else if(!this.hasSpecTwo){
          this.calcPrice();
        }else if(this.spec1Name != '' && this.spec2Name != ''){
          this.calcPrice();
        }

      },
//      购买数量-1
      numSub:function () {
        if(this.buyNum == 1){
          return;
        }
        this.buyNum -- ;
        if(!this.hasSpecOne){
          this.calcPrice();
        }else if(!this.hasSpecTwo){
          this.calcPrice();
        }else if(this.spec1Name != '' && this.spec2Name != ''){
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
//        调用赋值方法
        this.spec2Change(spec2.spec2);
        if(utils.isNull(this.spec1Name)){
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
      spec2Change(spec2){
        let _this = this;
        this.goodsData[0].products.forEach(function (item) {
          if(item.spec2 == spec2){
            _this.goodsData[0].products.forEach(function (data) {
              if(!utils.isNull(item.spec1) && !utils.isNull(data.spec1) && item.spec1 == data.spec1){
                _this.$set(data,'isSpec1','2');
              }
            })
          }else{
            _this.$set(item,'isSpec1','1');
          }
        })
      },
//      选择规格1时触发
      spec1Choose:function (spec1,products) {
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
//        调用赋值方法
        this.spec1Change(spec1.spec1);
        if(this.hasSpecTwo && utils.isNull(this.spec2Name)){//判断有没有规格2并且有没有选择规格2
          return;
        }else{
          let _this = this;
          //          更改图片和价格
          this.goodsData[0].products.forEach(function (item) {
            if(item.spec1 == _this.spec1Name && item.spec2 == _this.spec2Name){
//          更改商品规格
              _this.productId = item.productId;
              _this.goodsData[0].price = item.price;
              _this.goodsData[0].thumbnail = item.thumbnail;
            }
          })
          this.calcPrice();
        }
      },
      spec1Change(spec1){
        let _this = this;
        this.goodsData[0].products.forEach(function (item) {
          if(item.spec1 == spec1){
            _this.goodsData[0].products.forEach(function (data) {
              if(!utils.isNull(item.spec2) && !utils.isNull(data.spec2) && item.spec2 == data.spec2){
                _this.$set(data,'isSpec2','2');
              }
            })
          }else{
            _this.$set(item,'isSpec2','1');
          }
        })
      },
//      计算最终价格
      calcPrice(){
        let _this = this;
//          计算价格信息
        POST('website/member/order/calculate.jhtml?id=' + this.productId + '&quantity=' + this.buyNum).then(
          function (data) {
            console.log('32');
            console.log(data);
            if(data.type == 'success'){
              if(data.type == 'success'){
                _this.finallPrice = data.data.amount;
                _this.couponName = data.data.couponName;
                if(!_this.onecReceiver){
                  _this.receiverList = [];
                  _this.receiverList.push(data.data.receiver);
                  _this.onecReceiver = true;
                }
              }
            }else{
              _this.close(data);
            }
          },function (err) {
            console.log(err);
            _this.close(utils.message("error","网络不稳定"));
          }
        )
      },
//      判断是否有规格2
      hasSpec2(products){
        let spec2Num = 0;
        products.forEach(function (item,index) {
          if(!utils.isNull(item.spec2)){
            spec2Num ++ ;
          }
        })
        if(spec2Num > 0){
//          return true;
          this.hasSpecTwo = true;
        }else{
//          return false;
          this.hasSpecTwo = false;
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
      show:function (id,articleId) {
        this.articleId = articleId;
        this.isShow = true;
        let _this = this;
        GET('website/product/view.jhtml?id='+id).then(
          function (data) {
            if(data.type == 'success'){
              console.log(data);
              _this.goodsData = [];
//              _this.finallPrice = data.data.products[0].price;
              _this.productId = data.data.products[0].productId;
              data.data.price = data.data.products[0].price;
              data.data.thumbnail = data.data.products[0].thumbnail;
              _this.buyNum = 1;
//              将页面list数据push进变量
              _this.goodsData.push(data.data);

//              默认选中规格并调用方法判断规格2是否可选
              let sp1 = data.data.products[0].spec1;
              if(!utils.isNull(sp1)){
                _this.spec1Name = sp1;
                _this.spec1Change(sp1);
              }
              let sp2 = data.data.products[0].spec2;
              if(!utils.isNull(sp2)){
                _this.spec2Name = sp2;
                _this.spec2Change(sp2);
              }

//              调用计算接口
              _this.calcPrice();

//              判断该商品是否有规格2
              _this.hasSpec2(data.data.products);
//              判断该商品是否有规格1
              if(utils.isNull(data.data.products[0].spec1)){
                _this.hasSpecOne = false;
              }else{
                _this.hasSpecOne = true;
              }

            }else{
              _this.isShow = false;
              _this.close(data);
            }
          },function (err) {
            _this.isShow = false;
            _this.close(err);
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
      numInput:function () {
        if(!utils.isNull(this.buyNum) && this.buyNum != 0){
          this.calcPrice();
        }
      },
      goAddress:function () {
        this.$refs.address.show();
//        this.$router.push({
//          name: "receiverList",
//          query: {type:'buyGoods'}
//        });
      },
      addressAdd:function () {
        this.$refs.addressAdd.showAddressAdd();
      },
      selectAddress:function (address) {
        address = JSON.parse(address);
        this.receiverList = [];
        this.receiverList.push(address);
      },
      toastShow:function (msg) {
        this.$refs.toast.show(msg);
      },
//methods 方法到此为止
    },
  }
</script>

