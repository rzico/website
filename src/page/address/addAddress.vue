<template>
  <div class="container">
    <div class="page slideIn bg" >
      <div class="name">
        <span class="font-size">收货人:</span>
        <input class="input" type="text" v-model="name"  autofocus="autofocus" />
      </div>
      <div class="tel">
        <span class="font-size">联系方式:</span>
        <input class="input" type="number" maxlength="11" v-model="number" />
      </div>
      <div class="region" @click="show()">
        <div class="flex-row">
        <span class="font-size">所在地区:</span>
        <span class="font-size padd-left10" >{{regionName}}</span>
        </div>
        <div>
        <i class="iconfont icon-xiangyoujiantou"></i>
        </div>
      </div>
      <div class="adress">
        <span class="font-size">详细地址:</span>
        <input class="input" type="text" placeholder="街道、楼牌号等" v-model="address" />
      </div>
      <div class="isDefault">
        <span class="font-size">是否默认:</span>
        <div class="xiaoyuan" :style="yesColor()" @click="yes()"></div><span class="font-size">是</span>
        <div class="xiaoyuan" :style="noColor()" @click="no()"></div><span class="font-size">否</span>
      </div>
      <div class="button" @click="judge()" >
        <span class="span">保存</span>
      </div>
      <div style="min-height: 70%"></div>
    </div>
    <city :control="citycontrol" @name="cityname"></city>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
    overflow:auto;
  }
  .name{
    background-color: #ffffff;
    height: 50px;
    margin-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tel{
    background-color: #ffffff;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .region{
    background-color: #ffffff;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .adress{
    background-color: #ffffff;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .isDefault{
    background-color: #ffffff;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
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
    flex:3;
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
  import city from '../../widget/city.vue'
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
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
      }
    },
    components: {
      Toast,city
    },
    filters: {

    },
    created() {
      var c = utils.getUrlParameter('c');
      this.id = utils.getUrlParameter('id');
      c =JSON.parse(c);
      if(!this.id == '') {
        this.name = c.consignee;
        this.number = c.phone;
        this.regionName = c.areaName;
        this.regionId = c.areaId;
        this.address = c.address;
        this.isDefault = c.default
      }
    },
    mounted(){

    },
    methods: {
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
//      判断id是否有值，有则走修改接口
      judge:function () {
        var _this =this;
        if(this.id == ''){
          _this.open()
        }else{
          _this.change()
        }
      },
      open:function () {
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
                alert('添加成功')
                _this.$router.push({name:"addressList",query:{}});
              } else {

              }
            }, function (err) {

            })
        }
      },
      change:function () {
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
          POST('website/member/receiver/update.jhtml?id='+this.id+'&areaId=' + this.regionId + '&address=' + encodeURI(this.address) + '&consignee=' + encodeURI(this.name) + '&phone=' + this.number + '&isDefault=' + this.isDefault).then(
            function (res) {
              if (res.type == "success") {
                alert('修改成功');
                _this.$router.push({name:"addressList",query:{}});
              } else {

              }
            }, function (err) {

            })
        }
      },
    }
  }
</script>
