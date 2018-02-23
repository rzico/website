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
<style scoped>
  .download_bar {
    position: fixed;
    z-index: 3000000000;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 40px;
    text-shadow: none;
    background-color: rgba(253,253,253,.9);
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .download_bar .title {
    float: left;
    white-space: nowrap;
    height: 100%;
  }

  .download_bar .title .logo {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 7px;
  }

  .download_bar .download_btn {
    position: absolute;
    right: 10px;
    margin: 7px 20px 7px 0px;
    vertical-align: middle;
    color: #333;
    padding: 6px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #666;
    z-index: 100003;
  }

  .download_bar p {
    text-align: left;
    word-break: break-word;
    color: #333;
    padding-left: 42px;
    height: 100%;
    padding-top: 1px;
  }

  .download_bar .close_btn {
    position: absolute;
    right: 10px;
    top: 0px;
    z-index: 100002;
  }

  .download_bar .close_btn .close_icon {
    display: block;
    position: relative;
    width: 16px;
    height: 16px;
  }

  .download_bar .title .name {
    line-height: 39px;
    font-size: 18px;
    white-space: normal;
  }

</style>
<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
//         isShow:true,
        config: {default: {siteName:"",logo:""}}
      }
    },
    props: {
      isShow: {default:true},
      authorId:{default:""},
      templateId:{default : 1001}
    },
    created() {
      this.config = utils.getConfig();
    },
    methods: {
      download:function () {
        var vars  =  utils.router(location.href);
        vars.name ="index";
        if (utils.isNull(vars.query.xuid)) {
          vars.query.xuid = this.authorId;
        }
        this.$router.push(vars);
      },
      close:function () {
        this.$emit("closeDownload");
      }
    }
  }
</script>
