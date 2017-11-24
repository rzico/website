<template>
  <div class="header">
    <div class="mask bg" :style="'background-image: url('+member.logo+')'"></div>
    <div class="field">
      <div class="avatar bg" :style="'background-image: url('+member.logo+')'">
      </div>
      <span class="profile">
        <div class="nickname oneline">{{member.nickName}}</div>
        <div class="signature">{{member.autograph}}</div>
      </span>
    </div>
  </div>
</template>
<style scoped="">
</style>
<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      member:{nickName:"",autograph:"",logo:""}
    }
  }
</script>
