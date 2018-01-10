<template>
  <div style="height: 50%;width: 100%;position: absolute;bottom: 0; display: flex;flex-direction: column;background-color: #ffffff;z-index: 997" v-if="controlChild">
    <div class="title"><span class="font16">配送至</span> </div>
    <div style="display: flex;flex-direction: row">
    <div style="overflow:auto;display: flex;flex: 1;flex-direction: column;padding-left: 10px" >
      <!--省份选择-->
      <div v-if="urlType == 'pro'" class="active " v-for="item in proList"  @click="checkChange(item.id,item.name,item.children)">
        <div class="flex-row flex-space">
        <div class="" style="display: flex;flex-direction: column;justify-content:center;height: 30px">
          <span class="font16">{{item.name}}</span>
        </div>
        <!--是否选择行-->
        <div v-if="listId == item.id" >
          <i class="iconfont icon-xuanzhong"  style="color: #EB4E40;margin-bottom: 1.5px;margin-right: 5px"></i>
        </div>
        </div>
      </div>
    </div>
    <div style="overflow:auto;display: flex;flex: 1;flex-direction: column" >
      <!--城市选择-->
      <div  v-if="city == 'city'"  v-for="item in cityList">
        <div class="active flex-row flex-space" v-for="city in item.children" @click="cityChange(city.id,city.name,city.children)">
          <div class=" " style="display: flex;justify-content: center;height: 30px">
            <span class="font16">{{city.name}}</span>
          </div>
          <div v-if="listId == city.id" >
            <i class="iconfont icon-xuanzhong"  style="color: #EB4E40;margin-bottom: 1.5px;margin-right: 5px"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="overflow:auto;display: flex;flex: 1;flex-direction: column;padding-right: 10px" >
      <!--区县选择-->
      <div  v-if="country == 'country'"  v-for="item in countryList">
        <div class="active  flex-row flex-space" v-for="city in item.children" @click="countryChange(city.id,city.name,'')">
          <div class=""  style="height: 30px">
            <span class="font16">{{city.name}}</span>
          </div>
          <div v-if="listId == city.id" >
            <i class="iconfont icon-xuanzhong"  style="color: #EB4E40;margin-bottom: 1.5px;margin-right: 5px"></i>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
  .active:active{
    background-color: #999;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .flex-space{
    display: flex;
    justify-content: space-between;
  }

  .font16{
    font-size: 16px;
  }
  .title{
    height: 30%;
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px 0 1px 0;
    border-color: #cccccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  import {getPro,getCity,getCountry} from  '../assets/city.js'
  export default {
    data(){
      return{
        listId:'',
        proList:[],
        cityList:[],
        countryList:[],
        urlType:'pro',
        city:'',
        country:'',
        proName:'',
        cityName:'',
        countryName:'',
        name:'',
      }
    },
    components: {
      Toast
    },
    props: {
      control: {default:false}
    },
    computed:{
      controlChild:  {
        get: function () {
          return this.control;
        },
        set: function () {
        }
      }
    },
    created(){
          this.proList = getPro();
    },
    methods: {
//            选择省份时让城市渲染。
      checkChange:function (id,name) {
        this.listId = id;
        this.proName = name;
        this.city = 'city';
        this.country ='';
        this.cityList = getCity(this.listId);
      },
//      选择城市时若没有区县，则关闭渲染，并把省份城市名赋值给name
      cityChange:function (id,name,city) {
        let _this =this;
        this.listId = id;
        this.cityName =name;
        if(city == ''){
          _this.name = _this.proName + _this.cityName;
          _this.controlChild =false;
          _this.$emit("name", this.name,this.listId);
        }else {
          _this.country = 'country';
          _this.countryList = getCountry(this.listId);
        }
      },
//      选择完后关闭渲染，并把省份城市区县名赋值给name
      countryChange:function (id,name) {
        this.listId = id;
        this.countryName =name;
        this.name = this.proName + this.cityName +this.countryName;
        this.controlChild =false;
        this.$emit("name", this.name,this.listId);
      }
    }
  }
</script>
