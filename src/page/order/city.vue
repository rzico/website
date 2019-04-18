<template>
  <div class="page">
    <div class="slideIn orderCity" >
      <p style="font-size: 12px;color: #999;margin: 10px 20px 0px 20px;" v-if="!canGetLocation">获取位置信息失败,请手动选择城市</p>
      <div v-if="!canGetLocation" class="city-cityBox">
        <div class="city-cityChooseBox"  :style="{marginTop:canGetLocation ? '20px' : '10px'}">
          <div >
            <el-select v-model="provincesValue" size="small"  @change="provincesChange"  placeholder="选择省份">
              <el-option
                v-for="item in provincesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"  >
              </el-option>
            </el-select>
          </div>
          <div style="margin: 0 10px">
            <el-select v-model="cityValue" size="small" @change="cityChange"  placeholder="选择城市">
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div >
            <el-select v-model="regionValue" size="small"  @change="regionChange"  placeholder="选择地区">
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!--搜索栏-->
      <!--<div style="background-color: #fff;position: relative;z-index: 2;">-->
      <div class="city-searchBox" :style="{paddingBottom:canGetLocation ? '0px' : '20px'}">
        <el-input  :disabled="searchDisable" size="medium" v-model="searchInput"  placeholder="搜索小区/写字楼等"></el-input>
        <el-button type="primary" :disabled="searchDisable" size="medium" style="margin-left: 10px"  @click="doSearch()">搜索</el-button>
      </div>
      <!--</div>-->
      <div class="city-signBox"v-if="canGetLocation && hasAreaName()">
        <!--<p style="font-size: 12px;color: #999;margin:10px 20px;">获取位置信息失败,请手动选择城市</p>-->
        <div class="city-sign-location" >
          <div style="display: flex;flex-direction: row;align-items: center">
            <span style="font-size: 12px;">当前位置:</span>
            <span style="font-size: 14px">{{areaName}}</span>
          </div>
          <div style="display: flex;flex-direction: row;align-items: center" @click="getLocation()">
            <span class="el-icon-setting" style="font-size: 16px;color: #ffae19;"></span>
            <span style="font-size: 12px;color: #ffae19;">&nbsp;重新定位</span>
          </div>
        </div>
      </div>
      <!--<span style="font-size: 50px" @click="getLocation">获取位置信息</span>-->
      <!--省份 城市 地区选择 -->
      <!--<div v-if="!canGetLocation" style="width: 100%;display: flex;flex-direction: column;padding-left: 10px;padding-bottom: 20px;background-color: #fff;position: relative;z-index: 2;box-sizing: border-box">-->
      <!--<p style="font-size: 12px;color: #999;margin:10px 20px">获取位置信息失败,请手动选择城市</p>-->
      <!--<div >-->
      <!--<span class="city-select-cellName">省份:</span>-->
      <!--<el-select v-model="provincesValue"   @change="provincesChange"  placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in provincesOptions"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value"  >-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->
      <!--<div style="margin-top: 10px;margin-bottom: 10px">-->
      <!--<span class="city-select-cellName">城市:</span>-->
      <!--<el-select v-model="cityValue"  @change="cityChange"  placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in cityOptions"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->
      <!--<div >-->
      <!--<span class="city-select-cellName">地区:</span>-->
      <!--<el-select v-model="regionValue"  @change="regionChange"  placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in regionOptions"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->
      <!--</div>-->

      <!--item.id = B024F02CAQ-->
      <!--整个小区列表-->
      <p style="font-size: 15px;position: absolute;left: 10px;" v-if="estateList.length != 0"  :style="{bottom:canGetLocation ? '81%' : '71%'}">小区列表:</p>
      <div style="position: absolute;bottom: 0px;width: 100%;overflow: scroll;padding-top: 10px;box-sizing: border-box" :style="{height:canGetLocation ? '80%' : '70%'}">
        <div class="city-estate city-bottomBorder" v-for="(item,index) in estateList" :class="[index == 0  ? 'city-topBorder' : '']" @click="chooseEstate(item)">
          <p class="city-estate-name">{{item.name}}</p>
          <p class="city-estate-address">{{item.address}}</p>
        </div>
      </div>

      <!--没有地址时显示。点击前往地址选择-->
      <div class="confirm-noData" v-if="estateList.length == 0 && !searchDisable && showNodata">
        <i class="iconfont icon-weizhi" style="color: gray"></i>
        <span>不在配送范围内</span>
      </div>
    </div>


    <Toast ref="toast"></Toast>
  </div>
</template>
<style>
  .city-sign-location{
    display: flex;flex-direction: row;justify-content: space-between;width: 100%;align-items: center;padding: 0 15px;box-sizing: border-box
  }
  .city-signBox{
    height: 50px;display: flex;flex-direction: row;align-items: center;width: 100%;background-color: #fff;overflow: hidden;position: relative;z-index: 2
  }
  .confirm-noData {
    text-align: center;
    flex-direction: column;
    justify-content: center;
  }
  .confirm-noData i {
    color:#0C0C0C;
    font-size: 30px;
    display:block;
  }
  .confirm-noData span {
    color:gray;
    font-size: 16px;
    display:block;
  }
  .city-cityChooseBox{
    width: 100%;display: flex;flex-direction: row;box-sizing: border-box;padding:0 10px;align-items: center;
  }
  .city-cityBox{
    width: 100%;display: flex;flex-direction: column;background-color: #fff;position: relative;z-index: 2;box-sizing: border-box
  }
  .orderCity .el-input--small{
    font-size: 12px !important;
  }
  .city-estate:active{
    background-color: #f5f5f5;
  }
  .city-searchBox{
    padding-left: 10px;
    padding-right: 10px;
    display: flex;flex-direction: row;align-items: center;
    margin-top:20px;box-sizing: border-box;background-color: #fff;position: relative;z-index: 2;overflow: hidden;
  }
  .city-select-cellName{
    font-size: 15px;
    color: #000;
    margin-right: 5px;
  }
  .city-bottomBorder{
    border-bottom: 1px solid #eee;
  }
  .city-topBorder{
    border-top: 1px solid #eee;
    /*margin-top: 20px;*/
  }
  .city-estate-name{
    font-size: 15px;
    color: #000;
  }
  .city-estate-address{
    font-size: 13px;
    margin-top: 6px;
    color: #ccc;
  }
  .city-estate{
    padding: 10px 20px;

  }
</style>
<script>
  import Toast from '../../widget/toast.vue';
  import utils from '../../assets/utils';
  import { POST, GET } from '../../assets/fetch';
  export default {
    data(){
      return{
//        能否通过h5定位获取定位信息
        canGetLocation:true,
//        经纬度
        latitude:'',
        longitude:'',
//        省份
        provincesOptions: [],
        provincesValue: '',
        provincesId:'',
//        城市
        cityOptions:[],
        cityValue:'',
        cityId:'',
//      地区
        regionOptions:[],
        regionValue:'',
        regionId:'',
//        小区列表
        estateList:[],
//        搜索的keyword
        searchInput:'',
        searchDisable:true,
        clicked:false,
//        避免接口还未走完 出现闪屏（无地址）效果。
        showNodata:false,
        areaId:'',
        areaName:'',

      }
    },
    created(){
//      步骤流程：
//      进页面，首先获取位置信息
//      1.如果成功获取经纬度，用经纬度去获取城市Id 跟 小区，显示出来。并可以通过搜索框搜索所在城市id的小区。 此时不让用户选择 省份 城市 地区。
//      2.如果获取经纬度失败。此时让用户选择 省份 城市 地区，选完城区后用城区id获取经纬度、小区列表并显示出来，并可以通过搜索框搜索小区。
      this.getLocation();
    },
    components: {
      Toast
    },
    methods:{
      doSearch(){
        let _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        if(utils.isNull(this.searchInput) || utils.isNull(this.areaId)){
          return;
        }
        GET('lbs/geoQuery.jhtml?areaId=' + this.areaId + '&keyword=' + this.searchInput + '&xmid=').then(
          function (res) {
            if(res.type == 'success'){
              _this.estateList = res.data.pois;
            }else{

              _this.close(res);
            }
          },function (err) {

            _this.close(err);
          }
        )
      },
      getLocationSelf(){

      },
      provincesChange(e){
        this.provincesId = e;
        this.regionValue = '';
        this.getCitys();
        this.searchDisable = true;
      },
      cityChange(e){
        this.cityId = e;
        this.getRegion();
        this.searchDisable = true;
      },
      regionChange(e){
        this.regionId = e;
        this.regionToLatLng(e);
        this.searchDisable = false;
      },
//      地区换经纬度,并获取小区信息。 xmid为商家id
      regionToLatLng(id){
        let _this = this;
        GET('lbs/geoCode.jhtml?areaId=' + id + '&isPois=true&xmid=').then(
          function (res) {
            if(res.type == 'success'){
//              _this.latLngToEstate(res.data.location.lng,res.data.location.lat)
//              需要确定pois是否有值
              _this.estateList = res.data.pois;
              _this.areaId = res.data.areaId;
              _this.areaName = res.data.areaName;
              _this.latitude = res.data.location.lat;
              _this.longitude = res.data.location.lng;
              _this.showNodata = true;
            }else{

              _this.close(res);
            }
          },function (err) {

            _this.close(err);
          }
        )
      },
//      经纬度换小区
//      latLngToEstate(lng,lat){
//        let _this = this;
//        GET('lbs/regeoCode.jhtml?lng=' + lng +'&lat='+ lat).then(
//          function (res) {
//            if(res.type == 'success'){
//              _this.estateList = res.data.pois;
//            }else{
//
//            }
//          },function (err) {
//
//          })
//      },
//      获取省份
      getProvinces(){
        let _this = this;
        GET('common/area.jhtml?parentId=').then(
          function (res) {
            if (res.type=="success") {
//              将map转为JSON数组
              for(var key in res.data){
                _this.provincesOptions.push({
                  value:key,
                  label:res.data[key]
                })
              }
            } else {

              _this.close(res);
            }
          }, function (err) {

            _this.close(err);
          })
      },
//      获取城市
      getCitys(){
        let _this = this;
        _this.cityOptions = [];
        this.cityValue = '';
        GET('common/area.jhtml?parentId=' + this.provincesId).then(
          function (res) {
            if (res.type=="success") {
//              将map转为JSON数组
              for(var key in res.data){
                _this.cityOptions.push({
                  value:key,
                  label:res.data[key]
                })
              }
            } else {

              _this.close(res);
            }
          }, function (err) {

            _this.close(err);
          })
      },
//      获取地区
      getRegion(){
        let _this = this;
        _this.regionOptions = [];
        this.regionValue = '';
        GET('common/area.jhtml?parentId=' + this.cityId).then(
          function (res) {
            if (res.type=="success") {
//              将map转为JSON数组
              for(var key in res.data){
                _this.regionOptions.push({
                  value:key,
                  label:res.data[key]
                })
              }

              if(_this.regionOptions.length == 0){
                _this.regionToLatLng(_this.cityId);
                _this.searchDisable = false;
              }
            } else {

            }
          }, function (err) {

          })
      },

      getLocation(){
        let _this = this;
        navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
          function(pos){ // 如果成果则执行该回调函数
//            alert(
//              '  经度：' + pos.coords.latitude +
//              '  纬度：' + pos.coords.longitude +
//              '  高度：' + pos.coords.altitude +
//              '  精确度(经纬)：' + pos.coords.accuracy +
//              '  精确度(高度)：' + pos.coords.altitudeAccuracy +
//              '  速度：' + pos.coords.speed
//            );
//            经度
            let posLatitude = pos.coords.latitude;
            if(!utils.isNull(posLatitude)){
              _this.latitude = posLatitude;
            }
//            纬度
            let posLongitude = pos.coords.longitude;
            if(!utils.isNull(posLongitude)){
              _this.longitude = posLongitude;
            }
            _this.canGetLocation = true;

            _this.getAreaInfo();

          }, function(err){ // 如果失败则执行该回调函数
//            alert(err.message);
            _this.canGetLocation = false;
            _this.getProvinces();
          }, { // 附带参数
            enableHighAccuracy: false, // 提高精度(耗费资源)
            timeout: 3000, // 超过timeout则调用失败的回调函数
            maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
          }
        );
      },
//      根据经纬度获取地区信息
      getAreaInfo(){
        let _this = this;
        GET('lbs/regeoCode.jhtml?lng=' + this.longitude +'&lat=' +this.latitude + '&xmid=').then(
          function (res) {
            if (res.type=="success") {
              _this.estateList = res.data.pois;
              _this.areaId = res.data.areaId;
              _this.searchDisable = false;
              _this.areaName = res.data.areaName;
              _this.showNodata = true;
//              {"type":"success","content":"success","data":{"building":"湖里大道27号[]","areaName":"福建省厦门市湖里区","adcode":"350206","pois":[{"id":"B0FFGA2OZF","name":"厦门华美文创园","type":"商务住宅;产业园区;产业园区","tel":null,"distance":"168.799","direction":"西北","address":"华昌路132号","location":"118.099167,24.513120","businessarea":"湖里大道"},{"id":"B025004BEA","name":"联盛大厦(湖里大道)","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"148.692","direction":"南","address":"湖里大道26-28号","location":"118.100234,24.510989","businessarea":"湖里大道"},{"id":"B02500RBBE","name":"厦门温泉戴斯酒店","type":"住宿服务;宾馆酒店;四星级宾馆","tel":null,"distance":"204.589","direction":"西南","address":"湖里大道24号","location":"118.099279,24.510872","businessarea":"湖里大道"},{"id":"B0FFGCNINR","name":"美疗领导力促进中心","type":"科教文化服务;培训机构;培训机构","tel":null,"distance":"92.3425","direction":"北","address":"华昌路132号联发华美空间C1栋4层","location":"118.100485,24.513119","businessarea":"湖里大道"},{"id":"B02500UEE3","name":"威尼斯大酒店","type":"住宿服务;宾馆酒店;四星级宾馆","tel":null,"distance":"212.142","direction":"南","address":"华盛路15-17号","location":"118.100383,24.510391","businessarea":"湖里大道"},{"id":"B025002PNM","name":"太阳岛大厦(湖里大道)","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"199.227","direction":"西南","address":"湖里大道24号","location":"118.099284,24.510931","businessarea":"湖里大道"},{"id":"B025002IB6","name":"厦门电业局电能计量管理中心","type":"政府机构及社会团体;政府机关;地市级政府及事业单位","tel":null,"distance":"123.77","direction":"西","address":"湖里大道19号厦门电业局","location":"118.099342,24.51227","businessarea":"湖里大道"},{"id":"B0FFF4JKEV","name":"海山商务中心(湖里大道)","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"208.885","direction":"西南","address":"湖里大道24号","location":"118.099323,24.510791","businessarea":"湖里大道"},{"id":"B02500VEHU","name":"联华国际商务中心","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"215.762","direction":"南","address":"华盛路15-17号","location":"118.100456,24.510354","businessarea":"湖里大道"},{"id":"B0FFG7WKJ0","name":"联发华美空间","type":"商务住宅;产业园区;产业园区","tel":null,"distance":"157.374","direction":"西北","address":"华昌路132号","location":"118.099394,24.513223","businessarea":"湖里大道"},{"id":"B025002IDR","name":"东方商贸大厦(宜宾北路)","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"251.332","direction":"西南","address":"宜宾北路56号","location":"118.099435,24.510279","businessarea":"湖里大道"},{"id":"B025002KN2","name":"湖里街道徐厝社区风采长廊","type":"科教文化服务;学校;成人教育","tel":null,"distance":"240.855","direction":"北","address":"悦华路57号","location":"118.099899,24.514371","businessarea":"湖里大道"},{"id":"B0FFF691C2","name":"湖里颐豪酒店","type":"住宿服务;宾馆酒店;宾馆酒店","tel":null,"distance":"219.452","direction":"西","address":"湖里大道13号,近自贸区、机场、火炬园、厦鼓码头、象屿报税区、华美空间","location":"118.098517,24.511642","businessarea":"湖里大道"},{"id":"B025002KPM","name":"徐厝社区居委会","type":"政府机构及社会团体;政府机关;乡镇以下级政府及事业单位","tel":null,"distance":"240.855","direction":"北","address":"悦华路57号","location":"118.099899,24.514371","businessarea":"湖里大道"},{"id":"B025002RJT","name":"徐厝社区关心下一代工作委员会","type":"政府机构及社会团体;政府机关;乡镇以下级政府及事业单位","tel":null,"distance":"240.855","direction":"北","address":"悦华路57号","location":"118.099899,24.514371","businessarea":"湖里大道"},{"id":"B025004A1M","name":"同致电子科技(厦门)有限公司","type":"公司企业;公司;机械电子","tel":null,"distance":"91.5641","direction":"东北","address":"华盛路26号","location":"118.101277,24.512800","businessarea":"湖里大道"},{"id":"B025003XVA","name":"徐厝和悦里小区","type":"商务住宅;住宅区;住宅小区","tel":null,"distance":"240.01","direction":"北","address":"华盛路与悦华路交叉口西北100米","location":"118.100553,24.51445","businessarea":"湖里大道"},{"id":"B025003YEV","name":"福源宫","type":"风景名胜;风景名胜;寺庙道观","tel":null,"distance":"200.591","direction":"北","address":"华盛路与悦华路交叉口西北50米","location":"118.100704,24.514091","businessarea":"湖里大道"},{"id":"B02500033B","name":"美丽华大酒店","type":"住宿服务;宾馆酒店;四星级宾馆","tel":null,"distance":"334.253","direction":"西南","address":"兴隆路29号","location":"118.099047,24.509622","businessarea":"湖里大道"},{"id":"B0FFG7ICEU","name":"培苗幼儿园(华盛路)","type":"科教文化服务;学校;幼儿园","tel":null,"distance":"300.683","direction":"北","address":"湖里街道和悦里46号","location":"118.100500,24.514995","businessarea":"湖里大道"},{"id":"B0FFFS3T8Z","name":"信宏B座","type":"商务住宅;楼宇;商住两用楼宇","tel":null,"distance":"318.718","direction":"南","address":"兴隆路与华盛路交叉口西北100米","location":"118.100665,24.509427","businessarea":"湖里大道"},{"id":"B0FFFS3S4Z","name":"信宏A座","type":"商务住宅;楼宇;商住两用楼宇","tel":null,"distance":"321.164","direction":"南","address":"兴隆路31-33号","location":"118.100215,24.509421","businessarea":"湖里大道"},{"id":"B025002MW4","name":"联发集团","type":"公司企业;公司;公司","tel":null,"distance":"113.491","direction":"东","address":"湖里大道31号1层","location":"118.101684,24.512364","businessarea":"湖里大道"},{"id":"B02500412I","name":"嘉湖花园","type":"商务住宅;住宅区;住宅小区","tel":null,"distance":"261.484","direction":"东北","address":"和悦里1-12号","location":"118.101613,24.514441","businessarea":"湖里大道"},{"id":"B025002MGR","name":"科荣办公家具(湖里大道)","type":"购物服务;家居建材市场;家具城","tel":null,"distance":"205.15","direction":"东","address":"湖里大道30-33号厂房1楼","location":"118.102515,24.511786","businessarea":"湖里大道"},{"id":"B02500S4EF","name":"方圆校准检测科技(福建)研究院","type":"科教文化服务;科研机构;科研机构","tel":null,"distance":"333.748","direction":"南","address":"湖里-湖里兴隆路31号信宏大厦一楼","location":"118.100749,24.509295","businessarea":"湖里大道"},{"id":"B0FFGD811L","name":"都市雅苑","type":"商务住宅;住宅区;住宅小区","tel":null,"distance":"290.49","direction":"北","address":"华昌路136号","location":"118.099928,24.514839","businessarea":"湖里大道"},{"id":"B0250043Q0","name":"鸿展大厦(华昌路)","type":"商务住宅;楼宇;商务写字楼","tel":null,"distance":"347.547","direction":"西北","address":"华昌路140号","location":"118.098913,24.515032","businessarea":"湖里大道"},{"id":"B0FFFRCNNB","name":"科地楼","type":"商务住宅;楼宇;楼宇相关","tel":null,"distance":"348.722","direction":"西","address":"悦华路4中航·凯迪克","location":"118.097210,24.513010","businessarea":"湖里大道"},{"id":"B025001N59","name":"厦门樱织服装有限公司","type":"公司企业;公司;公司","tel":null,"distance":"178.165","direction":"东","address":"湖里大道33号联发房产30号楼","location":"118.102272,24.511898","businessarea":"湖里大道"}],"inPolygon":true,"areaId":1168},"md5":"c1010e247a73b4cdef8d30bbc228f3b3"}
            } else {
              _this.close(res)
            }

          }, function (err) {
            _this.close(err);
//            alert(JSON.stringify(err))
          })
      },
      chooseEstate(item){

        let _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        if(window.localStorage){
          let localCity = localStorage.getItem('ydAddress');
//        判断是否已有本地缓存
          if(!utils.isNull(localCity)){
            let jsonLocalCity = JSON.parse(localCity)
            jsonLocalCity.id = item.id,
              jsonLocalCity.address = item.address;
            jsonLocalCity.areaId = _this.areaId;
            jsonLocalCity.name  = item.name;
            jsonLocalCity.addressName = item.address + item.name;
            jsonLocalCity.areaName = _this.areaName;
            jsonLocalCity.latitude = _this.latitude;
            jsonLocalCity.longitude = _this.longitude;
            localStorage.setItem("ydAddress",JSON.stringify(jsonLocalCity))
          }else{
            let a = {
              id:item.id,
              address:item.address,
              areaId:_this.areaId,
              name:item.name,
              addressName:item.address + item.name,
              consignee:'',
              phone:'',
              areaName:_this.areaName,
              latitude:_this.latitude,
              longitude:_this.longitude
            }
            localStorage.setItem("ydAddress",JSON.stringify(a));
          }
          this.$router.go(-1);
        } else{
          alert('您的浏览器暂不支持,请您更换浏览器继续操作。')
        }
      },
      close(data){
        if(data.type == 'error'){
          if(!utils.isNull(data.content)){
            this.$refs.toast.show(data.content);
          }else{
            this.$refs.toast.show('网络不稳定');
          }
        }
      },
      hasAreaName(){
        return !utils.isNull(this.areaName)
      }
    }
  }
</script>
