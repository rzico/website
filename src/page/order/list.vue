<template>
  <div class="container">
    <div class="categoryBox" style="position: fixed;z-index: 1">
      <span class="cataText" v-for="(item,index) in catagoryList" @click="catagoryChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive',item.id == 4 ? 'flex-2' : '']">{{item.name}}</span>
    </div>
    <div  class="page slideIn"  style="background-color: #eee;padding-bottom: 50px;">
      <div style="height: 40px"></div>
      <v-loadmore :top-method="loadTop" :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="goodsLine"  v-for="(item,index) in ordersList"  v-if="hasOrder()">
          <div class=" goodsHead">
            <div class="flexRow" @click="goAuthor(item.sellerId)">
              <img :src="item.sellerLogo" class="shopImg"></img>
              <span class="shopName">{{item.sellerName}}</span>
              <span class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</span>
            </div>
            <div>
              <span class="textTitle red" :class="item.statusDescr == '已关闭' || item.statusDescr == '已退款' || item.statusDescr == '已退货'  ? 'grayColor' : ''">{{item.statusDescr}}</span>
              <!--<span class="textTitle coral" style="font-size: 14px">{{item.statusDescr}}</span>-->
            </div>
          </div>
          <div class="flexRow goodsBody" style="justify-content: space-between" v-for="goods in item.orderItems" @click="goDetails(item.sn)">
            <img :src="goods.thumbnail" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goodsHeight )+ 'px'"></img>
            <div class="goodsInfo" :style="'height:' + goodsHeight + 'px;'">
              <p class="goodsName">{{goods.name}}</p>
              <p class="subTitle marginTop5">规格:{{goods.spec | watchSpec}}</p>
            </div>
            <div class="goodsPriceNum" :style="'height:' + goodsHeight + 'px;' + 'width:' + (goods20Width)+ 'px'">
              <p class="goodsPrice ">¥ {{goods.price | watchPrice}}</p>
              <p class="subTitle">x{{goods.quantity}}</p>
            </div>
          </div>
          <div class="flexRow goodsTotalPrice ">
            <div>
              <span class="subTitle">{{item.createDate | watchCreateDate}}</span>
            </div>
            <div>
              <span class="textTitle marginRight10">共{{item.quantity}}件商品</span>
              <span class="textTitle">合计:¥ {{item.amount | watchPrice}}</span>
            </div>
          </div>
          <!--<div class="goodsFoot" v-if="item.status == 'completed'">-->
          <!--<div class="footLeft">-->
          <!--&lt;!&ndash;<span class=" subTitle">删除</span>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="footRight">-->
          <!--&lt;!&ndash;<span class="textTitle footText">查看物流</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="textTitle footText">评价晒单</span>&ndash;&gt;-->
          <!--<span class="textTitle footText red redBorder" @click="buyAgain(item)">再次购买</span>-->
          <!--</div>-->
          <!--</div>-->

          <!--退款中 不渲染-->
          <!--<div v-else-if="item.status == 'refunding'"></div>-->

          <div class="goodsFoot" v-if="item.status == 'unpaid'">
            <div class="footLeft">
              <span class="subTitle"></span>
            </div>
            <div class="footRight" >
              <!--<span class="textTitle footText">查看物流</span>-->
              <span class="textTitle footText" @click="showDialog(item.sn,'取消订单',index)">取消订单</span>
              <span class="textTitle footText red redBorder" style="padding: 2.5px 10px" @click="goPay(item,item.sn)">付款</span>
            </div>
          </div>
          <div class="goodsFoot" v-else-if="item.status == 'unshipped'">
            <div class="footLeft">
              <span class="subTitle"></span>
            </div>
            <div class="footRight" >
              <!--<span class="textTitle footText">查看物流</span>-->
              <span class="textTitle footText" @click="urgedGoods(item,item.sn)" :class="[item.hadUrged ? 'grayColor' : '']">催发货</span>
              <span class="textTitle footText red redBorder" style="padding: 2.5px 10px" @click="showDialog(item.sn,'申请退款')">申请退款</span>
            </div>
          </div>
          <div class="goodsFoot" v-else-if="item.status == 'shipped'">
            <div class="footLeft">
              <span class="subTitle"></span>
            </div>
            <div class="footRight">
              <!--<span class="textTitle footText">查看物流</span>-->
              <span class="textTitle footText" @click="showDialog(item.sn,'确认签收')">确认签收</span>
              <span class="textTitle footText red redBorder" style="padding: 2.5px 10px" @click="showDialog(item.sn,'申请退货')">申请退货</span>
            </div>
          </div>
        </div>
        <div class="noData" v-if="!hasOrder()">
          <i class="iconfont icon-wodedingdan"></i>
          <span>暂无订单</span>
        </div>
      </v-loadmore>
      <weui-dialog ref="dialog" type="confirm" :title="dialogTitle" confirmButton="确定" cancelButton="取消"
                   @weui-dialog-confirm="activateConfirm()"
                   @weui-dialog-cancel="closeConfirm()">
        <div >
          <p class="dialogP">{{confirmContent}}</p>
        </div>
      </weui-dialog>
      <!--免密支付-->
      <weui-dialog ref="freePay" type="confirm" title="免密支付" confirmButton="确认支付" cancelButton="取消"
                   @weui-dialog-confirm="freeComplete()"
                   @weui-dialog-cancel="freeCancel()" >
        <div >
          <p  class="dialogP">{{payWay}}</p>
        </div>
        <div >
          <p  class="dialogP">¥{{payPrice}}</p>
        </div>
      </weui-dialog>
    </div>

    <Toast ref="toast"></Toast>
    <Tabbar id=1 ref="tabWidget"></Tabbar>

  </div>
</template>
<style scoped>
  @import '../../less/order/list.less';
  .dialogP{
    text-align: center;width: 100%;font-size: 13px;color: #444;
  }
  .header{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    text-align: left;
    margin-top: 0px;
  }
</style>
<script>
  import {Loadmore} from 'mint-ui';
  import utils from '../../assets/utils';
  import { POST,GET} from '../../assets/fetch.js';
  import Toast from '../../widget/toast.vue';
  import Dialog from '../../widget/dialog.vue';
  import Tabbar from '../../widget/tabbar-whole.vue';
  export default {
    data:function(){
      return{
        selectSn:'',
        selectIndex:'',
        confirmContent:'确定取消该订单?',
        dialogTitle:'取消订单',
        ordersList:[],
        refreshImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515550007&di=e7530b5267c25b0bb5113c048dc948db&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F27%2F68%2F55f95158e34f2_1024.jpg',
        refreshing:false,
        pageStart:0,
        pageSize:15,
        whichCorpus:0,
        productCategoryId:0,
        catagoryList:[{
          name:'全部',
          id:0
        },{
          name:'待付款',
          id:1
        },{
          name:'待发货',
          id:2
        },{
          name:'待收货',
          id:3
        },{
          name:'退款/售后',
          id:4
        }],
        allLoaded:false,
        payPrice:'',
        payWay:'',
      }
    },
    props:{
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
    },
    components: {
      Toast,
      'v-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      'weui-dialog':Dialog,
      Tabbar
    },
    created() {
      this.goodsHeight = document.documentElement.clientWidth * 0.25;
      this.goods20Width = document.documentElement.clientWidth * 0.20;
      this.open()
    },
    methods:{
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
              _this.$refs.toast.show('申请退货成功');
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(data.content);
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
              _this.$refs.toast.show('签收成功');
//              获取未处理订单最新数量
              _this.tabRefresh();
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(data.content);
          }
        )
      },
//      退款
      refundMoney:function (sn) {
        let _this = this;
        POST('website/member/order/refunds.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.pageStart = 0;
              _this.open();
              _this.$refs.toast.show('申请退款成功');
            }else{
              _this.$refs.toast.show(data.content);
            }
          },function (err) {
            _this.$refs.toast.show(data.content);
          }
        )
      },
//      催促发货
      urgedGoods:function (item,sn) {
        let _this = this;
        if(item.hadUrged){
          return;
        }
        POST('website/member/order/shipp_remind.jhtml?sn=' + sn).then(
          function (data) {
            if(data.type == 'success'){
              _this.pageStart = 0;
//              item.hadUrged = true;
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
//      确认购买
      buyAgain:function (item) {
        var _this = this;
        POST("website/member/order/create.jhtml?id=" + item.orderItems[0].id + '&quantity=' + item.orderItems[0].quantity + '&receiverId=1').then(
          function (data) {
//            alert(data);
            console.log(data);
            if (data.type=="success") {
              _this.goPay(item,data.data.sn);
            } else {
              _this.$refs.toast.show(data.content);
            }
//            _this.disabledButton = false;
          },
          function (err) {
//            console.log('1');
//            _this.disabledButton = false;
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
//      发起支付
      goPay(item,sn){
        let _this = this;
        POST('website/member/order/payment.jhtml?sn=' + sn).then(
          function (data) {
            console.log('===');
            console.log(data);
            if (data.type=="success") {
              if(utils.isNull(data.data.paymentPluginId)){
                if(utils.isweixin()){
                  if(utils.isIos()){
                    location.href = 'http://dev.rzico.com/weixin/payment/view.html?psn=' + data.data.sn + '&amount=' + item.amount  + '&name=' +  item.orderItems[0].name + '&type=weixin';
                  }else{
                    _this.$router.push({
                      name: "payment",
                      query: {psn: data.data.sn, amount: item.amount, name:item.orderItems[0].name,type:'weixin'}
                    });
                  }
                }else if(utils.isalipay()){
                  if(utils.isIos()){
                    location.href = 'http://dev.rzico.com/weixin/payment/view.html?psn=' + data.data.sn + '&amount=' + item.amount  + '&name=' +  item.orderItems[0].name + '&type=alipay';
                  }else {
                    _this.$router.push({
                      name: "payment",
                      query: {psn: data.data.sn, amount: item.amount, name: item.orderItems[0].name, type: 'alipay'}
                    });
                  }
                }
              }else if(data.data.paymentPluginId == 'cardPayPlugin'){//会员卡支付
                _this.sn = data.data.sn;
                _this.payPrice = item.amount;
                _this.payWay = '会员卡支付';
                _this.paymentId = 'cardPayPlugin';
                _this.$refs.freePay.show();
              }else if(data.data.paymentPluginId == 'balancePayPlugin'){//余额支付
                _this.payPrice = item.amount;
                _this.paymentId = 'balancePayPlugin';
                _this.sn = data.data.sn;
                _this.payWay = '余额支付';
                _this.$refs.freePay.show();
              }
            } else {
              _this.$refs.toast.show(data.content);
            }
//            _this.disabledButton = false;
          },
          function (err) {
//            _this.disabledButton = false;
            _this.$refs.toast.show("网络不稳定");
          }
        )
      },
//    显示对话框
      showDialog:function (sn,status,index) {
        let _this = this;
        switch (status){
          case '取消订单':
            _this.confirmContent = '确定取消该订单?';
            _this.dialogTitle = status;
            break;
          case '申请退款':
            _this.confirmContent = '确定申请退款？';
            _this.dialogTitle = status;
            break;
          case '确认签收':
            _this.confirmContent = '确定签收该订单?';
            _this.dialogTitle = status;
            break;
          case '申请退货':
            _this.confirmContent = '确定申请退货?';
            _this.dialogTitle = status;
            break;
          default:
            break;
        }
        this.selectSn = sn;
        if(!utils.isNull(index)){
          this.selectIndex = index;
        }
        this.$refs.dialog.show();
      },
//      对话框确认取消订单
      activateConfirm:function () {
        let _this = this;
        switch (_this.dialogTitle){
          case '取消订单':
            _this.cancelOrder();
            this.$refs.dialog.close();
            break;
          case '申请退款':
            _this.refundMoney(_this.selectSn);
            this.$refs.dialog.close();
            break;
          case '确认签收':
            _this.acceptOrder(_this.selectSn);
            this.$refs.dialog.close();
            break;
          case '申请退货':
            _this.returnGoods(_this.selectSn);
            this.$refs.dialog.close();
            break;
          default:
            break;
        }

      },
//      对话框订单 取消按钮
      closeConfirm:function () {
        this.$refs.dialog.close();
      },
//      订单取消
      cancelOrder:function () {
        let _this = this;
        POST('website/member/order/cancel.jhtml?sn=' + this.selectSn).then(function (data) {
          if(data.type == 'success'){
//            _this.ordersList.splice(_this.selectIndex,1);
            _this.ordersList[_this.selectIndex].status = 'completed',
              _this.ordersList[_this.selectIndex].statusDescr = '已取消',
              _this.$refs.toast.show('取消订单成功');
//              获取未处理订单最新数量
            _this.tabRefresh();
          }else{
            _this.$refs.toast.show(data.content);
          }
        },function (err) {
          _this.$refs.toast.show(err.content);
        })
      },
      loadTop:function() { //组件提供的下拉触发方法
        this.pageStart = 0;
        this.open('loadTop');
      },
      loadBottom:function() {
        this.open('loadBottom');
      },
      hasOrder:function () {
        return this.ordersList.length>0;
      },
      open:function (type) {
        var _this = this;
        var status = '';
        switch(this.productCategoryId){
          case 0:
            status = '';
            break;
          case 1:
            status = 'unpaid';
            break;
          case 2:
            status = 'unshipped';
            break;
          case 3:
            status = 'shipped';
            break;
          case 4:
            status = 'refunding';
            break;
          default:
            status = '';
            break;
        }
        GET('website/member/order/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize).then(
          function (res) {
            console.log(res);
            if (res.type=="success") {
              if (res.data.start==0) {
                _this.ordersList = res.data.data;
              } else {
                res.data.data.forEach(function (item) {
                  _this.ordersList.push(item);
                })
              }
              _this.allLoaded = res.data.data.length<_this.pageSize;
              _this.pageStart = res.data.start+res.data.data.length;
            } else {
            }
            if (type=='loadBottom'){
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          }, function (err) {
            if (type=='loadBottom'){
              _this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            } else {
              _this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            }
          })
      },
      //分类切换
      catagoryChange:function(index,id){
//                event.toast(id);
        var _this = this;
        if(_this.whichCorpus == index){
          return;
        }
        _this.whichCorpus = index;
        _this.productCategoryId = id;
        this.pageStart = 0;
        _this.open();
      },
//      前往订单详情
      goDetails:function (sn) {
        this.$router.push({name:"orderDetails",query:{sn:sn}});
      },
//       取消免密支付
      freeCancel:function () {
        let _this = this;
        this.$refs.freePay.close();
        this.$router.push({
          name: "payment",
          query: {psn: _this.sn, amount: _this.payPrice ,title:'支付取消',type:encodeURI(_this.payWay)}
        });
      },
//      确定免密支付
      freeComplete:function () {
        let _this = this;
        POST('payment/submit.jhtml?sn='+ this.sn + '&paymentPluginId='+ this.paymentId + '&safeKey=free').then(
          function (data) {
            if (data.type=="success") {
              _this.$refs.toast.show('支付成功');
              _this.$router.push({
                name: "payment",
                query: {psn: _this.sn, amount: _this.payPrice , title:'支付成功',type:encodeURI(_this.payWay)}
              });
              _this.hide();
            } else {
              _this.$refs.toast.show(data.content);
            }
//            _this.disabledButton = false;
            this.$refs.freePay.close();
          },
          function (err) {
            _this.$refs.toast.show("网络不稳定");
            this.$refs.freePay.close();
          }
        )
      },
      tabRefresh(){
        this.$refs.tabWidget.open();
      }
    }
  }
</script>
