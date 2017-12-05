<template>
    <div id="download_bar" class="download_bar" v-if="isShow">
        <div class="title">
          <img class="logo" :src="config.logo" :alt="config.siteName">
            <p>
                <span class="name">{{config.siteName}}</span>
                <span class="desc" style="line-height: 38px;">你也能发这样的图文</span>
            </p>
            <span href="javascript:;" id="download_btn" class="download_btn" style="top: 1px;" @click="download()">马上制作</span>
        </div>
        <span class="close_btn" style="top: 10px;" @click="close()">
          <span class="close_icon iconfont icon-arrow-dropright"></span></span>
    </div>
</template>

<script>
  import utils from '../../assets/utils.js';

  export default {
     data() {
       return {
//         isShow:true,
         config: {default: {siteName:"",logo:""}}
       }
     },
    props: {
      isShow: {default:true}
    },
     created() {
       this.config = utils.getConfig();
     },
     methods: {
       download:function () {
         var vars  =  utils.router(location.href);
         vars.name ="index";
         this.$router.push(vars);
       },
       close:function () {
         this.$emit("closeDownload");
       }
     }
  }
</script>
