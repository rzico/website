<template>
  <div class="container">
    <div class="page bg" >
        <div class="content" v-for="c in receiverList">
        <div class="topDiv">
          <div class="information">
            <span class="name">{{c.consignee}}</span><span class="tel">{{c.phone}}</span>
          </div>
          <div class="address">
            <span class="coarse">{{c.areaName}}</span>
            <span class="fine">{{c.address}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="one" @click="editor(c,c.id)">
            <i class="iconfont icon-bianji" style="color: #888888;margin-bottom: 1.5px;margin-right: 5px"></i>
            <span class="editor">编辑</span>
          </div>
          <div class="two" @click="del(c.id)">
            <i class="iconfont icon-shanchu"  style="color: #888888;margin-bottom: 1.5px;margin-right: 5px"></i>
            <span class="delete">删除</span>
          </div>
        </div>
        </div>
      <div style="min-height: 70%"></div>
    </div>
    <div class="button" @click="jump()">
      <span class="span">+新建地址</span>
    </div>
  </div>
</template>
<style scoped>
  .bg{
    background-color: #eeeeee;
    overflow: auto;
  }
  .button{
    height: 40px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 15px;
    right: 15px;
  }
  .button .span{
    font-size: 16px;
  }
  .content{
    background-color: #ffffff;
    padding-left: 10px;
    padding-top: 10px;
    margin-top: 10px;
    border-width: 0 0 0.1px 0;
    border-color: #cccccc;
    border-style: solid;
  }
  .content .topDiv{
    height: 60px;
    border-width: 0 0 1px 0;
    border-color: #cccccc;
    border-style: solid;
  }
  .content .topDiv .information{
    height: 25px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
  .content .topDiv .information .name{
    font-size: 16px;
  }
  .content .topDiv .information .tel{
    font-size: 16px;
    margin-left: 10px;
  }
  .content .topDiv .address{
    height: 35px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }
  .content .topDiv .address .coarse{
    font-size: 12px;
    color: #888888;
  }
  .content .topDiv .address .fine{
    font-size: 12px;
    color: #888888;
    margin-left: 10px;
  }
  .content .bottom{
    height: 30px;
    padding-right: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
  }
  .content .bottom .one{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
  }
  .content .bottom .two{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }
  .content .bottom .one .editor{
      font-size: 12px;
      color:#888888;
    }
  .content .bottom .two .delete{
    font-size: 12px;
    color:#888888;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        pageStart:0,
        pageSize:10,
        allLoaded:false,
        receiverList:[],
        type:''
      }
    },
    components: {
      Toast,
    },
    filters: {

    },
    created() {
      this.type = utils.getUrlParameter('type');
      this.open()
    },
    methods: {
      hasReward:function () {
        return this.receiverList.length>0;
      },
      del:function (id) {
        let _this = this
        POST('website/member/receiver/delete.jhtml?id='+id).then(
          function (mes) {
            if (mes.type=="success") {
              alert('删除成功')
              _this.open()
            } else {

            }

          }, function (err) {

          })
      },
      editor:function(c,id) {
        c=JSON.stringify(c)
        this.$router.push({name:"addressAdd",query:{c:c,id:id}});
      },
      jump:function() {
        this.$router.push({name:"addressAdd",query:{}});
      },
      open:function () {
        var _this = this;
        GET('website/member/receiver/list.jhtml').then(
          function (res) {
            if (res.type=="success") {
              _this.receiverList = res.data;
            } else {

            }

          }, function (err) {

          })
      },
    }
  }
</script>
