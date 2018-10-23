<template>
  <div class="page" style="background-color: #eee"  >
    <!--导航栏-->
    <div  v-for="(item,index) in ordersList" class="pagePd">
      <div class="flexRow infoLines marginTop10" style="background-color: #fff">
        <span class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe604;</span>
        <span class="textTitle">感谢您的本次购物,欢迎您再次光临!</span>
      </div>
      <div class="header marginTop10 flexRow">
        <div style="width: 30px;">
          <span class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe62e;</span>
        </div>
        <div>
          <p class=" titleColor logBox" v-for="(orderLog,index) in item.orderLogs" :class="[index != 0 ? 'marginTop5' : '']">
            <span class="logTitle">{{orderLog.content}} </span>
            <span class="logSub"> {{orderLog.createDate | watchLogDate}}</span>
          </p>
        </div>
        <!--<p class=" marginTop5 titleColor">国内承运人: 京东快递</p>-->
        <!--<p class=" marginTop5 titleColor">预计送达: 11月13日</p>-->
      </div>
      <div class="addressBox flexRow marginTop10">
        <div style="width: 30px;">
          <span class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</span>
        </div>
        <div >
          <div class="flexRow">
            <span class="textTitle">{{item.receiver.consignee}}</span>
            <span class="textTitle phoneStyle" >{{item.receiver.phone}}</span>
          </div>
          <div class="mt10">
            <span class="subTitle" style="line-height: 21px">地址: {{item.receiver.areaName}}{{item.receiver.address}}</span>
          </div>
        </div>
      </div>
      <div class="goodsLine marginTop10">
        <div class="space-between goodsHead boder-bottom" @click="goAuthor(item.sellerId)">
          <div class="flexRow">
            <img :src="item.sellerLogo" class="shopImg"></img>
            <span class="textTitle ml10 mr10">{{item.sellerName}}</span>
            <span class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</span>
          </div>
          <!--<div class="flexRow">-->
          <!--<span class="subTitle" style="color: #666" :style="{fontFamily:'iconfont'}">联系卖家</span>-->
          <!--<span class="subTitle baseColor" style="padding-bottom: 2px"  :style="{fontFamily:'iconfont'}">&#xe628;</span>-->
          <!--</div>-->
        </div>
        <div class="flexRow goodsBody  goodsBodyOther" v-for="goods in item.orderItems">
          <img :src="goods.thumbnail" class="goodsImg" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goodsHeight - 15)+ 'px'"></img>
          <div class="goodsInfo" :style="'height:' + (goodsHeight - 15) + 'px;'">
            <span class="goodsName textTitle lineHeight18">{{goods.name}}</span>
            <span class="subTitle ">规格:{{goods.spec | watchSpec}}</span>
            <div class="goodsPrice" >
              <span class="textTitle ">¥ {{goods.price | watchPrice}}</span>
              <span class="subTitle">x{{goods.quantity}}</span>
              <!--<span class="subTitle border shopCar" >加购物车</span>-->
            </div>
          </div>
        </div>
        <!--<div class="flexRow goodsBody goodsBodyOther" >-->
        <!--<img :src="refreshImg" class="goodsImg" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goodsHeight - 15)+ 'px'"></img>-->
        <!--<div class="goodsInfo" :style="'height:' + (goodsHeight - 15) + 'px;'">-->
        <!--<span class="textTitle goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</span>-->
        <!--<span class="subTitle marginTop5">颜色分类:深蓝直伞</span>-->
        <!--</div>-->
        <!--<div class="goodsPriceNum" :style="'height:' + (goodsHeight - 15) + 'px;' + 'width:' + (goods20Width)+ 'px'">-->
        <!--<span class="textTitle ">¥ 148.00</span>-->
        <!--<span class="subTitle">x1</span>-->
        <!--<span class="subTitle border shopCar" >加购物车</span>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <div class="marginTop10 detalisinfoBox">
        <!--<div class="infoLines boderBottom">-->
          <!--<div >-->
            <!--<span class="subTitle">订单编号: {{item.sn}}</span>-->
            <!--&lt;!&ndash;<span class="subTitle copyBtn border ml10">复制</span>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="mt10">-->
            <!--<span class="subTitle">下单时间: {{item.createDate | watchCreateDate}}</span>-->
          <!--</div>-->
        <!--</div>-->
        <div class="infoLines boderBottom">
          <div>
            <span class="subTitle ">订单编号: {{item.sn}}</span>
          </div>
          <div class="mt10">
            <span class="subTitle ">下单时间: {{item.createDate | watchCreateDate}}</span>
          </div>
        </div>
        <div class="infoLines boderBottom">
          <div>
            <span class="subTitle ">支付方式: {{item.paymentMethod | watchPayMethod}}</span>
          </div>
          <div class="mt10">
            <span class="subTitle ">支付状态: {{item.paymentStatus | watchPaymentStatus}}</span>
          </div>
        </div>
        <div class="infoLines">
          <div>
            <span class="subTitle ">配送方式: {{item.shippingMethod | watchShippingMethod}}</span>
          </div>
          <div class="mt10">
            <span class="subTitle ">配送状态: {{item.shippingStatus | watchShippingStatus}}</span>
          </div>
        </div>
      </div>
      <div class="marginTop10  boderBottom" style="background-color: #fff">
        <div class="priceLine boderBottom">
          <div class="spaceBetween">
            <span class="subTitle">商品总额</span>
            <span class="subTitle">¥{{item.price | watchPrice}}</span>
          </div>
          <div class="spaceBetween marginTop10 marginBottom10">
            <span class="subTitle">优惠折扣</span>
            <span class="subTitle">-{{item.couponDiscount | watchPrice}}</span>
          </div>
          <div class=" spaceBetween">
            <span class="subTitle">+ 运费</span>
            <span class="subTitle">¥0.00</span>
          </div>
        </div>
        <div class="priceLine flexEnd">
          <div class="flexRow">
            <span class="textTitle mr10">{{item.status | watchStatus}}:</span>
            <span class="textTitle" style="color: red">¥{{item.amount | watchPrice}}</span>
          </div>
        </div>
      </div>
      <!--底部操作栏-->
      <div class="flexRow spaceBetween goodsFoot footBottom" v-if="item.status == 'unshipped'">
        <div class="footLeft" >
          <!--<span class="textTitle delOrder" >删除订单</span>-->
        </div>
        <div class="footRight">
          <!--<span class="textTitle footspan" @click="goLogistics()">查看物流</span>-->
          <span class="textTitle footspan" @click="urgedGoods(item,item.sn)" :class="[item.hadUrged ? 'grayColor' : '']">催发货</span>
          <span class="textTitle footspan" @click="refundMoney(item.sn)">退款</span>
        </div>
      </div>
      <!--底部操作栏-->
      <div class="flexRow spaceBetween goodsFoot footBottom" v-else-if="item.status == 'unpaid'">
        <div class="footLeft" >
          <!--<span class="textTitle delOrder" >删除订单</span>-->
        </div>
        <div class="footRight">
          <!--<span class="textTitle footspan" @click="goLogistics()">查看物流</span>-->
          <span class="textTitle footspan" @click="showDialog()">取消订单</span>
          <span class="textTitle footspan" @click="goPay(item,item.sn)">付款</span>
        </div>
      </div>
      <!--<div class="flexRow spaceBetween goodsFoot footBottom" v-else-if="item.status == 'completed'">-->
        <!--<div class="footLeft">-->
          <!--&lt;!&ndash;<span class="textTitle delOrder" >删除订单</span>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="footRight" >-->
          <!--&lt;!&ndash;<span class="textTitle footspan" @click="goLogistics()">查看物流</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="textTitle footspan">评价晒单</span>&ndash;&gt;-->
          <!--<span class="textTitle footspan ">再次购买</span>-->
        <!--</div>-->
      <!--</div>-->
      <div class="flexRow spaceBetween goodsFoot footBottom" v-else-if="item.status == 'shipped'">
        <div class="footLeft">
          <!--<span class="textTitle delOrder" >删除订单</span>-->
        </div>
        <div class="footRight" >
          <!--<span class="textTitle footspan" @click="goLogistics()">查看物流</span>-->
          <span class="textTitle footspan" @click="acceptOrder(item.sn)">确认签收</span>
          <span class="textTitle footspan " @click="returnGoods(item.sn)">退货</span>
        </div>
      </div>
    </div>
    <weui-dialog ref="dialog" type="confirm" title="取消订单" confirmButton="确定" cancelButton="取消"
                 @weui-dialog-confirm="activateConfirm()"
                 @weui-dialog-cancel="closeConfirm()">
      <div >
        <p style="text-align: center;width: 100%;font-size: 13px;color: #444">{{confirmContent}}</p>
      </div>
    </weui-dialog>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  @import '../../less/order/list.less';
</style>
<style scoped>
  .lineHeight18{
    line-height: 18px;
  }
  .logBox{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .logTitle{
    color: #444;
    font-size: 15px;
  }
  .logSub{
    padding-left: 10px;
    color: #999;
    font-size: 12px;
  }
  .titleColor{
    color: #444;
    font-size: 16px;
  }
  .header{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    text-align: left;
    margin-top: 10px;
  }

  .delOrder{
    color: #999;
    font-size: 14px;
  }
  .footMore{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .goodsImg{
    border-radius: 5px;
  }
  .spaceBetween{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .flexEnd{

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .fz18{
    font-size: 15px;
  }
  .ml10{
    margin-left: 10px;
  }
  .mr10{
    margin-right: 10px;
  }
  .goodsBodyOther{
    background-color: #fff;
    padding: 10px;
    padding-top: 0px;
  }

  .carIcon{
    width: 30px;
    color: #444;
    font-size: 17.5px;
    padding-left: 3px;
    box-sizing: border-box;
  }
  /*<!--底部金额-->*/
  .priceLine{
    background-color: #fff;
    padding: 10px 10px 10px 0;
    margin-left: 10px;
  }
  /**/
  /*<!--订单 支付方式 信息行-->*/
  .detalisinfoBox{
    background-color: #fff;
    width: 100%;
  }
  .copyBtn{
    padding: 3px 10px;
    border-radius: 5px;
    line-height: 15px;
    font-size: 13px;
  }
  .infoLines{
    padding: 10px;

  }
  /**/

  /*<!--收货地址-->*/
  .addressIcon{
    width: 70px;
    font-size: 25px;
    color: #666;
  }
  .addressBox{
    padding: 7.5px;
    background-color: #fff;
  }

  /**/
  .footspan{
    padding:5px 10px;
    border-radius: 5px;
    color: #444;
    border-color: #ccc;
    border-width: 1px;
    border-style: solid;
    font-size: 14px;
    margin-right: 10px;
  }
  .shopCar{
    font-size: 10px;
    color: #444;
    padding: 3px 8px;
    border-radius: 5px;
  }

</style>
<script>
  import utils from '../../assets/utils';
  import { POST, GET } from '../../assets/fetch';
  import Toast from '../../widget/toast.vue';
  import Dialog from '../../widget/dialog.vue';
  export default {
    data:function () {
      return{
        ordersList: [],
        pageStart: 0,
        pageSize: 15,
        confirmContent:'确定取消该订单?',
        orderSn:'',
//            refreshImg:utils.locate('resources/images/loading.png'),
        refreshImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514462683&di=8f6e78d98e3cc8a0480c93058e674b14&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
      }
    } ,
    created() {
      let _this = this;
      this.goodsHeight = document.documentElement.clientWidth * 0.25;
      this.goods20Width = document.documentElement.clientWidth * 0.20;
      this.orderSn = utils.getUrlParameter('sn');
//      AUTH("",function (authed) {
          _this.open();
//      })
    },
    components:{
      Toast,
      'weui-dialog':Dialog,
    },
    filters:{
      watchPrice:function (value) {
        return utils.currencyfmt(value);
      },
      watchSpec:function (value) {
        if(utils.isNull(value)){
          return '无';
        }else{
          return value;
        }
      },
      watchCreateDate:function (value) {
        return utils.datetimehms(value);
      },
      watchLogDate:function (value) {
        return utils.datedayhms(value);
      },
      watchPayMethod:function (value) {
        switch (value){
          case "online":
            return '在线支付';
            break;
          case 'offline':
            return '线下支付';
            break;
          case 'deposit':
            return '余额支付';
            break;
          case 'card':
            return '会员卡支付';
            break;
          default:
            return '在线支付';
            break;
        }
      },
      watchShippingMethod:function (value) {
        switch (value){
          case "shipping":
            return '普通快递 ';
            break;
          case 'pickup':
            return '线下提货';
            break;
          case 'warehouse':
            return '统仓统配';
            break;
          case 'ecard':
            return '存入卡包';
            break;
          case 'virtual':
            return '虚拟货品';
            break;
          default:
            return '普通快递';
            break;
        }
      },
      watchStatus:function (value) {
        switch (value){
          case 'unpaid':
            return '需付款';
            break;
          case 'complete':
            return '实付款';
            break;
          default:
            return '实付款';
            break;
        }
      },

      watchPaymentStatus:function (value) {
        switch (value){
          case 'unpaid':
            return '未支付';
            break;
          case 'paid':
            return '已支付';
            break;
          case 'refunding':
            return '退款中';
            break;
          case 'refunded':
            return '已退款';
            break;
          default:
            return '暂无状态';
            break;
        }
      },
      watchShippingStatus:function (value) {
        switch (value){
          case 'unshipped':
            return '未发货';
            break;
          case 'shipped':
            return '已发货';
            break;
          case 'returning':
            return '退货中';
            break;
          case 'returned':
            return '已退货';
            break;
          default:
            return '暂无状态';
            break;
        }
      },
    },
    methods: {
      open:function () {
        let _this = this;
        GET('website/member/order/view.jhtml?sn=' + this.orderSn).then(function (data) {
          console.log(data.data);
          if(data.type == 'success'){
            _this.ordersList = [];
            _this.ordersList.push(data.data);
            console.log('===');
            console.log(_this.ordersList[0].status);
          }else{
            _this.$refs.toast.show("服务器繁忙");
          }
        },function (err) {
          _this.$refs.toast.show("网络不稳定");
        })
      },
//      前往专栏
      goAuthor:function (id) {
        this.$router.push({
          name: "c1001",
          query: {id:id}
        });
      },
//      退货
      returnGoods:function (sn) {
        let _this = this;
        POST('website/member/order/returns.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.pageStart = 0;
              _this.open();
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
//      确认签收
      acceptOrder:function (sn) {
        let _this = this;
        POST('website/member/order/completed.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.pageStart = 0;
              _this.open();
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
//      退款
      refundMoney:function (sn) {
        let _this = this;
        POST('website/member/order/refunds.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.open();
              _this.$refs.toast.show('申请退款成功');
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
//      催促发货
      urgedGoods:function (item,sn) {
        let _this = this;
        if(item.hadUrged){
          return;
        }
        console.log(item);
        GET('website/member/order/shipp_remind.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.$set(item,'hadUrged', true);
              _this.$refs.toast.show('提醒成功');
            }else{
              _this.$refs.toast.show(data.content);
            }

          },function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
//            点击复制
      copyCode(){
        this.$refs.toast.show('复制成功');
      },
      goLogistics:function () {
        this.$router.push({name:"orderLogistics",query:{sn:1}});
      },
//      对话框确认取消订单
      activateConfirm:function () {
        let _this = this;
        POST('website/member/order/cancel.jhtml?sn=' + this.orderSn).then(function (data) {
          if(data.type == 'success'){
            _this.$refs.toast.show('取消订单成功');
          }else{
            _this.$refs.toast.show(data.content);
          }
        },function (err) {
          _this.$refs.toast.show(err.content);
        })
      },
//      对话框取消订单 取消按钮
      closeConfirm:function () {
        this.$refs.dialog.close();
      },
//    显示对话框
      showDialog:function () {
        this.$refs.dialog.show();
      },
//      发起支付
      goPay(item,sn){
        let a = JSON.stringify(item);
        let _this = this;
        POST('website/member/order/payment.jhtml?sn=' + sn).then(
          function (data) {
            if (data.type=="success") {
              if(utils.isNull(data.data.paymentPluginId)){
                if(utils.isweixin()){
                  _this.$router.push({
                    name: "payment",
                    query: {psn: data.data.sn, amount: item.amount,type:'weixin'}
                  });
                }else if(utils.isalipay()){
                  _this.$router.push({
                    name: "payment",
                    query: {psn: data.data.sn, amount: item.amount,type:'alipay'}
                  });
                }
              }else if(data.data.paymentPluginId == 'cardPayPlugin'){//会员卡支付
                let payInfo = {
                  way:'会员卡支付',
                  price:item.price,
                  sn:data.data.sn
                };
                _this.$emit('payConfirm',payInfo);
              }else if(data.data.paymentPluginId == '"balancePayPlugin'){//余额支付
                let payInfo = {
                  way:'余额支付',
                  price:item.price,
                  sn:data.data.sn
                };
                _this.$emit('payConfirm',payInfo);
              }
            } else {
              _this.$refs.toast.show(data.content);
            }
            _this.disabledButton = false;
          },
          function (err) {
            _this.disabledButton = false;
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
    }
  }
</script>
