<template>
  <div class="meta report clearfix"><span>阅读 {{article}}</span>
    <span class="fr">
        <!--<a style="line-height: 28px;"-->
      <!--href="https://www.meipian.cn/resources/components/report.php?id=uxv7g5e"-->
      <!--rel="nofollow">举报</a>-->
    </span>
  </div>
</template>
<style scoped>
   .report {
     padding: 10px;
     margin-top: 25px;
     margin-bottom: 25px;
     margin-left: 23px;
     margin-right: 23px;
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
