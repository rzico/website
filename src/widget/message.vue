<template>
  <div class="weui_msg pt70">
    <div class="" v-if="icon">
      <i :class="['weui_icon_msg', 'weui_icon_' + icon]" ></i>
    </div>
    <div class="weui_text_area">
      <h2 class="weui_msg_title blue weui_msg_title_fs" v-if="title" :class="[title == '支付成功' ? 'green' : '',title == '支付取消' || title == '支付失败' ? 'red' : '']">{{title}}</h2>
      <div class="weui_msg_desc"><slot name="content"></slot></div>
    </div>
    <!--<div class="weui_opr_area">-->
      <!--<slot name="operation"></slot>-->
    <!--</div>-->
    <div class="weui_extra_area">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<style>
  .red{
    color: red !important;
  }
  .blue{
    color: deepskyblue ;
    margin-top: 10px;
  }
  .pt70{
    padding-top: 50px;
  }
  .green{
    color:#09BB07 !important;
  }
  .weui_icon_msg:before{
    font-size: 45px !important;
  }
  .weui_msg_title_fs{
    font-size: 16px !important;
    margin: 25px 0 5px 0 !important;
  }
  .weui_msg .weui_text_area{
    padding: 0 50px !important;
    margin: 0 !important;
  }
</style>
<script>
  export default {
    props: {
      /**
       * 消息图标名称
       * 若设置，则会在最上方显示大图标
       */
      icon: {
        type: String,
        required: false
      },

      /**
       * 消息标题
       */
      title: {
        type: String,
        required: false
      }
    }
  }
</script>
