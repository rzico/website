<template>
  <div class="page" style="background-color: #f5f5f5">
    <div class="slideIn confirm">
      <!--整个header地址盒子-->
      <div class="confirm-address" style="background-color: #fff">
        <!--地址信息-->
        <div v-if="hasAddress()">
          <div class="confirm-address-top">
            <div style="border-bottom: 1px solid #eee;" class="confirm-address-cell">
              <span class="confirm-address-text" style="width:100px;">用户姓名：</span>
              <el-input size="small"  v-model="ydAddress.consignee"  placeholder="填写收货人"></el-input>
            </div>
            <div class="confirm-address-cell">
              <span class="confirm-address-text" style="width: 100px;">联系电话：</span>
              <el-input size="small" v-model="ydAddress.phone" type="tel" placeholder="填写联系电话"></el-input>
            </div>
          </div>
          <div class="confirm-address-top" style="border-top: 5px solid #f5f5f5">
            <div style="position: relative;border-bottom: 1px solid #eee;" class="confirm-address-cell" @click="goOrderCity()">
              <span class="confirm-address-text" style="width:100px;">所在区域：</span>
              <span class="confirm-address-location">{{ydAddress.areaName}}</span>
              <p class="confirm-rightArrow"></p>
            </div>
            <div class="confirm-address-cell">
              <span class="confirm-address-text" style="width: 100px;">详细地址：</span>
              <el-input size="small" v-model="ydAddress.addressName" type="text" placeholder="请填写详细地址"></el-input>
            </div>
          </div>
        </div>
        <!--没有地址时显示。点击前往地址选择-->
        <div class="confirm-noData" v-else @click="goOrderCity()">
          <i class="iconfont icon-weizhi" style="color: gray"></i>
          <span style="color:gray;">点击选择地址</span>
        </div>
      </div>
      <!--商品信息-->
      <div>
        <div style="padding:20px 0;background-color: #fff" >
          <!--已选商品列表-->
          <div class="confirm-product">
            <img class="confirm-product-img" :src="product.thumbnail" >
            <div class="confirm-product-rightInfo">
              <div >
                <span class="confirm-product-name">{{product.name}}</span>
              </div>
              <div>
                <span style="font-size:12px;color:#BCBBBB;">{{product.spec1Name}} {{product.spec2Name}}</span>
                <div class="confirm-product-infoBottom">
                  <div>
                    <span style="font-size:12px;color:#CE5733;line-height: 13px">￥</span>
                    <span style="font-size:14px;color:#CE5733;line-height: 14px">{{product.price}}</span>
                  </div>
                  <span style="font-size:12px;color:#0C0C0C;line-height: 18px">x{{product.buyNum}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="confirm-coupon">-->
      <!--<span style="color:#333333;font-size:15px;">店铺优惠</span>-->
      <!--<span style="color:#333333;font-size:15px;">-￥5.00</span>-->
      <!--</div>-->
      <div class="confirm-product-footer " style="border-top: 1px solid #eee">
        <span style="color:#333333;font-size:14px;">共{{product.buyNum}}件商品  小计：</span>
        <span style="color:#CD532D;font-size:15px;">￥</span>
        <span style="color:#CD532D;font-size:18px;">{{product.finallPrice}}</span>
        <!--<text style="color:#CD532D;font-size:30px;">.00</text>-->
      </div>

      <div class="confirm-footer">
        <span style="font-size:13px;">合计：</span>
        <span class="confirm-footer-money">¥{{product.finallPrice}}</span>
        <div class="confirm-footer-btn" @click="submitOrder()">
          <span style="font-size:15px;color:#ffffff">提交订单</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .confirm-address-cell{
    display: flex;flex-direction: row;align-items: center;padding-right: 14px;padding-top: 6px;padding-bottom: 6px;
  }
  .confirm input{
    outline:medium;
    border:none;
    padding-left: 0px !important;
    font-size: 14px !important;
  }
  .confirm-coupon{
    width:100%;height:50px;border-top:1px solid #f5f5f5;border-bottom:1px solid #f5f5f5;display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding-left: 14px;padding-right: 14px;box-sizing: border-box;background-color: #fff
  }
  .confirm-product-footer{
    display: flex;flex-direction:row;padding-right:24px;justify-content: flex-end;width:100%;align-items: center;height:57px;border-bottom:1px solid #f5f5f5;background-color: #fff;padding-left: 14px;padding-right: 14px;box-sizing: border-box
  }
  .confirm-footer-money{
    font-size:15px;color:#CD532D;margin-right:9px;
  }
  .confirm-footer-btn{
    display: flex;align-items: center;justify-content: center;height:45px;width:96px;background-color: #FD0202;
  }
  .confirm-footer{
    position:absolute;bottom:0px;left:0px;width:100%;height:45px;display:flex;flex-direction: row;align-items: center;border-top: 1px solid #f5f5f5;justify-content: flex-end;background-color: #fff
  }
  .confirm-product-infoBottom div{
    display: flex;align-items: flex-end
  }
  .confirm-product-infoBottom{
    display: flex;flex-direction: row;align-items: center;justify-content: space-between
  }
  .confirm-product-rightInfo{
    display: flex;flex-direction: column;justify-content: space-between;height: 89px;flex: 1;padding: 5px 0 5px 0
  }
  .confirm-product-img{
    width:76px;height:76px;margin-right: 14px;border-radius: 50%
  }
  .confirm-product{
    display: flex;flex-direction: row;align-items: center;padding-left: 14px;padding-right: 14px;height: 89px;width: 100%;box-sizing: border-box;
  }
  .confirm-product-name{
    font-size:14px;color:#0C0C0C;line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
  .confirm-noData {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 5px;
  }
  .confirm-noData i {
    color:#0C0C0C;
    font-size: 30px;
    display:block;
  }
  .confirm-noData span {
    color:#0C0C0C;
    font-size: 16px;
    display:block;
  }
  .confirm-address-location{
    font-size:14px;width:100%;color:#0C0C0C;
    padding-right: 14px;
    box-sizing: border-box;
  }
  .confirm-address-icon{
    font-size: 18px;line-height: 18px;
    position: absolute;
    top: 2px;
    left: 11px;
  }
  .confirm-address-bottom{
    display: flex;flex-direction: row;margin-top:12px;padding-left:40px;position: relative
  }
  .confirm-address-top{
    display: flex;
    /*justify-content: space-between;*/
    flex-direction: column;
    /*align-items: center;*/
    /*padding-left:10px;padding-right: 10px;*/
    padding-left:14px;
  }
  .confirm-address-text{
    font-size:14px;color:#0C0C0C;
    line-height: 32px;
  }
  .confirm-rightArrow{
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
    top: 19px;
    right: 14px;
  }
  .confirm-address{
    border-top: 5px solid #f5f5f5;
    border-bottom: 5px solid #f5f5f5;
    width:100%;
    /*padding-top: 15px;*/
    /*padding-bottom: 15px;*/
  }
</style>
<script>

  import { Indicator } from 'mint-ui';
  import utils from '../../assets/utils';
  import { POST, GET , AUTH} from '../../assets/fetch';
  export default {
    data(){
      return{
        title:'确认订单',
        ydAddress:{
          consignee:'',
          phone:'',
          address:'',
          name:'',
          areaId:'',
          id:'',
          areaName:'',
          latitude:'',
          longitude:'',
          addressName:'',
        },
        product: {
          spec1Name:'',
          spec2Name:'',
          buyNum:'',
          finallPrice:'',
          thumbnail:'',
          name:''
        },
        clicked:false
      }
    },
    components: {

      Indicator,
    },
    computed:{
    },
    created(){
      AUTH("",function (authed)  {})
      let _this = this;
//      浏览器支持本地缓存
      if(window.localStorage){
//        localStorage.removeItem('ydAddress');
//        return;
//        取值
        let localCity = localStorage.getItem('ydAddress');
        if(!utils.isNull(localCity)){
          let jsonLocalCity = JSON.parse(localCity)
          if(!utils.isNull(jsonLocalCity.id)){
            _this.ydAddress = jsonLocalCity;
          }
        }
      }
//      获取商品数据
      let a = utils.getUrlParameter('product')
      if(!utils.isNull(a)){
        this.product = JSON.parse(a);
      }

    },
    methods:{
      hasAddress(){
        return !utils.isNull(this.ydAddress.id);
      },
      goOrderCity(){
        var _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        this.$router.push({name:"orderCity",query:{}});
      },
      //      提交订单
      submitOrder:function () {
        var _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        if(utils.isNull(this.ydAddress.consignee)){
          utils.showToast('请输入收货人');
          return;
        }
        if(utils.isNull(this.ydAddress.phone)){
          utils.showToast('请输入联系电话');
          return;
        }
        if(utils.isNull(this.ydAddress.id)){
          utils.showToast('请选择地址');
          return;
        }
        Indicator.open({
          text:'加载中',
          spinnerType: 'triple-bounce'
        });
//        '&receiverId=' + this.receiverList[0].id+
        let address = this.ydAddress.areaName + this.ydAddress.addressName ;
//        alert("website/member/order/create.jhtml?id=" + utils.getUrlParameter('productId') + '&quantity=' + utils.getUrlParameter('buyNum') + '&areaId=' + this.ydAddress.areaId+ '&phone=' + this.ydAddress.phone + '&consignee=' + encodeURIComponent(this.ydAddress.consignee) + '&address=' + encodeURIComponent(address) + '&lat=' + this.ydAddress.latitude + '&lng=' + this.ydAddress.longitude +'&xuid=' + utils.getUrlParameter("xuid") + '&dragonId='+ utils.getUrlParameter('dragonId'));
        POST("website/member/order/create.jhtml?id=" + utils.getUrlParameter('productId') + '&quantity=' + utils.getUrlParameter('buyNum') + '&areaId=' + this.ydAddress.areaId+ '&phone=' + this.ydAddress.phone + '&consignee=' + encodeURIComponent(this.ydAddress.consignee) + '&address=' + encodeURIComponent(address) + '&lat=' + this.ydAddress.latitude + '&lng=' + this.ydAddress.longitude +'&xuid=' + utils.getUrlParameter("xuid") + '&dragonId='+ utils.getUrlParameter('dragonId')).then(
          function (data) {
            if (data.type=="success") {
//              订单创建成功后将 收货人 联系电话存入缓存。
              let localCity = localStorage.getItem('ydAddress');
//        判断是否已有本地缓存(可省略)
              if(!utils.isNull(localCity)){
                let jsonLocalCity = JSON.parse(localCity)
                jsonLocalCity.phone = _this.ydAddress.phone,
                  jsonLocalCity.consignee = _this.ydAddress.consignee,
                  jsonLocalCity.addressName = _this.ydAddress.addressName;
                  localStorage.setItem("ydAddress",JSON.stringify(jsonLocalCity))
              }

              _this.goPay(data.data.sn);
            } else {
              Indicator.close();
              utils.showToast();
            }
            _this.disabledButton = false;
          },
          function (err) {
            _this.disabledButton = false;
            Indicator.close();
            utils.showToast();

          }
        )
      },
//      发起支付
      goPay(sn){
        let _this = this;
        Indicator.close();
        if(utils.isweixin()){
          _this.$router.replace({
            name: "payment",
            query: {psn: sn, amount:  _this.product.finallPrice,type:'weixin',memo:encodeURI('购买商品')}
          });
        }else if(utils.isalipay()){
          _this.$router.replace({
            name: "payment",
            query: {psn: sn, amount:  _this.product.finallPrice,type:'alipay',memo:encodeURI('购买商品')}
          });
        }else{

          _this.$router.replace({
            name: "payment",
            query: {psn: sn, amount:  _this.product.finallPrice,type:'h5pay',memo:encodeURI('购买商品')}
          });
        }
      },
    }
  }
</script>
