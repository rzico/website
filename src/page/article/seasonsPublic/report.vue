<template>
  <div class=" report  " v-if="article != 0">
    <span class="well">阅读 {{article}}</span>
    <span class="fr">
        <!--<a style="line-height: 28px;"-->
      <!--href="https://www.meipian.cn/resources/components/report.php?id=uxv7g5e"-->
      <!--rel="nofollow">举报</a>-->
    </span>
  </div>
</template>
<style>
  .report .well {
    padding: 0 16px !important;
  }
</style>
<script>
  export default {
    props: {
      article: { default:function () {
        return 0;
      }
      }
    },
  }
</script>
