<template>
  <div class="" v-if="isShow" style="z-index: 3000000001">
    <weui-dialog ref="addressAdd" type="confirm" title="新增收货地址" confirmButton="添加" cancelButton="取消"
                 @weui-dialog-confirm="activateConfirm()"
                 @weui-dialog-cancel="closeConfirm()">
      <div class="addressBox" >
          <div class="name">
            <div class="leftWidth">
              <span class="font-size " >收货人:</span>
            </div>
            <input class="input" type="text" v-model="name" style="margin-left: 0px"  autofocus="autofocus" />
          </div>
          <div class="tel">
            <div class="leftWidth">
              <span class="font-size ">联系方式:</span>
            </div>
            <input class="input" type="number" maxlength="11"  v-model="number" />
          </div>
          <div class="region" @click="show()">
            <div class="flex-row">
              <span class="font-size ">所在地区:</span>
              <span class="font-size padd-left10" >{{regionName}}</span>
            </div>
            <div>
              <i class="iconfont icon-xiangyoujiantou"></i>
            </div>
          </div>
          <div class="adress">
            <div class="leftWidth">
              <span class="font-size ">详细地址:</span>
            </div>
            <input class="input" type="text" placeholder="街道、楼牌号等" v-model="address" />
          </div>
          <div class="isDefault">
            <span class="font-size ">是否默认:</span>
            <div class="xiaoyuan" :style="yesColor()" @click="yes()"></div><span class="font-size">是</span>
            <div class="xiaoyuan" :style="noColor()" @click="no()"></div><span class="font-size">否</span>
          </div>
      </div>
    </weui-dialog>
    <city :control="citycontrol" @name="cityname"></city>
    <Toast ref="toast"></Toast>
  </div>
</template>
<style scoped>
  .leftWidth{
    width: 15% !important;
    min-width: 70px !important;
  }
  .name{
    background-color: #ffffff;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #eee;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tel{
    background-color: #ffffff;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #eee;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .region{
    background-color: #ffffff;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #eee;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .adress{
    background-color: #ffffff;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #eee;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .isDefault{
    background-color: #ffffff;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .isDefault .xiaoyuan{
    height: 15px;
    width: 15px;
    border-radius:100%;
    border-color: #888888;
    border:1px solid;
    margin-left: 10px;
    margin-right: 5px;
  }
  .button{
    height: 40px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .button .span{
    font-size: 16px;
  }
  .input{
    width: 80%;
    margin-left: 10px;
    font-size: 16px;
    border-style:none
  }
  .font-size{
    font-size: 16px;
  }
  .padd-left10{
    padding-left: 10px;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
</style>
<script>
  import Dialog from './dialog.vue';
  import city from './city.vue'
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  export default {
    data() {
      return {
//        此id为收货地址列表id
        id:'',
        citycontrol:this.control,
        name:'',
        number:'',
        regionId:'',
        regionName:'',
        address:'',
        isDefault:false,
        isShow:false,
      }
    },
    components: {
      Toast,
      city,
      'weui-dialog':Dialog,
    },
    filters: {

    },
    created() {
      console.log('232322');
    },
    methods: {
      showAddressAdd:function () {
        this.isShow = true;
        let _this = this;
        setTimeout(function () {
          _this.$refs.addressAdd.show();
        },50);
      },
      show:function () {
        this.citycontrol = !this.citycontrol
      },
      cityname:function (data,mes) {
        this.regionName = data;
        this.regionId = mes;
        this.citycontrol =false
      },
      yesColor:function () {
        if(this.isDefault == true){
          return {backgroundColor:'#EB4E40'}
        }else{
          return {backgroundColor:'#ffffff'}
        }
      },
      noColor:function () {
        if(this.isDefault == false){
          return {backgroundColor:'#EB4E40'}
        }else{
          return {backgroundColor:'#ffffff'}
        }
      },
      yes:function () {
        this.isDefault = true;
      },
      no:function () {
        this.isDefault = false;
      },
      activateConfirm:function () {
        if(this.name == ''){
          alert('请填写收货人')
        }else if(this.number == ''){
          alert('请填写手机号码')
        }else if(this.regionName == ''){
          alert('请选择收货区域')
        }else if(this.address == ''){
          alert('请填写收货地址')
        }else {
          var _this = this;
          POST('website/member/receiver/add.jhtml?areaId=' + this.regionId + '&address=' + encodeURI(this.address) + '&consignee=' + encodeURI(this.name) + '&phone=' + this.number + '&isDefault=' + this.isDefault).then(
            function (res) {
              if (res.type == "success") {
                res.data = JSON.stringify(res.data);
                _this.$emit('selectAddress',res.data);
                _this.close();
              } else {
                _this.$emit('toastShow',res.content);
              }
            }, function (err) {
              _this.$emit('toastShow',res.content);
            })
        }
      },
//      对话框取消选择地址 取消按钮
      closeConfirm:function () {
        this.$refs.addressAdd.close();
      },
      close:function () {
        this.isShow = false;
      }
    }
  }
</script>

