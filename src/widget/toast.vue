<template>
<div :class="{'weui-loading-toast': type === 'loading'}" v-if="isShow">
  <div class="weui_mask_transparent"></div>
  <div class="weui-toast">
    <div class="weui-loading " v-if="type === 'loading'">
      <div v-for="n in 12" class="weui-loading-leaf" :class="'weui-loading-leaf-' + n"></div>
    </div>
    <i class="weui-icon-toast weui-icon-info-circle icon48" v-else></i>
    <div class="weui-toast-content">{{msg}}</div>
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
