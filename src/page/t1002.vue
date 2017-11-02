<template>
<div class="page">
    <download_bar></download_bar>
    <div class="article">
        <div class="bg">
        </div>
        <div class="main">
            <article_meta></article_meta>
            <music></music>
            <article_content></article_content>
            <reward></reward>
            <report></report>
            <auther></auther>
            <review></review>
            <recommend></recommend>
            <ad></ad>
        </div>
    </div>
</div>
</template>
<style scoped>
  @import '../less/t1001.less';
</style>
<script>
    import download_bar from './article/download_bar.vue';
    import article_meta from './article/meta-cover.vue';
    import music from './article/music.vue';
    import article_content from './article/content.vue';
    import reward from './article/reward.vue';
    import report from './article/report.vue';
    import auther from './article/auther.vue';
    import recommend from './article/recommend.vue';
    import review from './article/review.vue';
    import ad from './article/ad.vue';
    export default {
        components: {
            download_bar,
            article_meta,
            music,
            article_content,
            reward,
            report,
            auther,
            recommend,
            review,
            ad
        },
        created() {
        }
    }

</script>
