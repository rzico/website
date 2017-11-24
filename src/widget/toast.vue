<template>
<div :class="{'weui_loading_toast': type === 'loading'}" v-if="isShow">
  <div class="weui_mask_transparent"></div>
  <div class="weui_toast">
    <div class="weui_loading " v-if="type === 'loading'">
      <div v-for="n in 12" class="weui_loading_leaf" :class="'weui_loading_leaf_' + n"></div>
    </div>
    <i class="weui_icon_info_circle" v-else></i>
    <div class="weui_toast_content">{{msg}}</div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      isShow:false,
      msg:"完成",
      type:"",
      timeout:null
    }
  },
  methods: {
    show (val) {
        this.isShow = true;
        this.msg = val;
        if (this.timeout!=null) {
           clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.isShow = false
        }, 2000)
    },
    loading () {
      this.isShow = true;
      this.msg = "加载中";
      if (this.timeout!=null) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.isShow = false
      }, 5000)
    },
    hide () {
      this.isShow = false;
      if (this.timeout!=null) {
        clearTimeout(this.timeout)
      }
    },
  }


}
</script>
