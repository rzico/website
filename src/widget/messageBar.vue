<template>
  <div class="bgc">
    <div class="left">
      <span class="fz16" style="color: red">公</span><span class="fz16">告</span>
    </div>
    <div class="right">
      <i class="iconfont icon-remind" style="font-size: 20px;color:red "></i>
      <marquee direction="up" scrolldelay="200" scrollamount="1" behavior="scroll" height="25px" width="80%">
      <span class="messageText" v-for="m in messageList">{{m.title}}</span>
      </marquee>
    </div>
  </div>
</template>
<style scoped>
  /*@keyframes kf-marque-animation{ 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }*/
  .bgc{
    background-color: white;
    width: 100%;
    height: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-width: 0 0 2px 0;
    border-color: #eeeeee;
    border-style: solid;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .left{
    width: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 0 .5px 0 0;
    border-color: #cccccc;
    border-style: solid;
  }
  .fz16{
    font-size: 16px;
    font-weight: bold;
  }
  .right{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 87%;
    height: 25px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  /*利用css动画不能实现无缝连接*/
  /*.marquee{*/
    /*width: 100%;*/
    /*background: #fff;*/
    /*border: none;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*margin: 0 auto;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*position: relative;*/
  /*}*/
  /*.marquee .content{*/
    /*display: inline-block;*/
    /*position: relative;*/
    /*padding-right: 0px;*/
    /*animation: kf-marque-animation 11s linear infinite;*/
    /*white-space: nowrap;*/
  /*}*/
  .messageText{
    font-size: 14px;
    color: #888;
    margin-left: 10px;
    width: 80%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  export default {
    data () {
      return {
        messageList:[],
      }
    },
    components: {
      Toast
    },
    filters: {
      dateweektimefmt(value) {
        return utils.dateweektimefmt(value);
      },
      selectImage(val){
        return utils.thumbnail(val, 375, 375);
      },
    },
    props: {
      id: { default: 0}
    },
    created() {
      this.load();
    },
    mounted () {

    },
    methods:{
      //      获取公告
      load:function () {
        var _this = this;
        GET('website/notice/list.jhtml?authorId='+_this.id).then(
          function (mes) {
            if(mes.type == 'success'){
              _this.messageList = mes.data
            }else{
            }
          }, function () {

          });
      },
    }
  }
</script>
