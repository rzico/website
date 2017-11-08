<template>
  <div class="container">
    <div class="page slideIn">
      <download_bar></download_bar>
      <div class="article">
        <div class="bg">
        </div>
        <div class="main">
          <article_meta :article="watchArticle"></article_meta>
          <music :musicData="watchMusicData"></music>
          <article_content :templates="watchTemplates" :htmlStr="htmlStr"></article_content>
          <reward :article="watchArticle"  @showDialog="showRewardDialog"></reward>
          <report :article="watchArticle"></report>
          <auther :article="watchArticle"></auther>
          <review :article="watchArticle"></review>
          <recommend :article="watchArticle"></recommend>
          <ad :article="watchArticle"></ad>
          <rewardDialog  ref="rwd" @rewardNumber="rewardNumber"></rewardDialog>
          <payment  ref="pay" @notify="onPayNotify"></payment>
        </div>
      </div>
      <Toast ref="toast"></Toast>
    </div>
  </div>
</template>
<style scoped>
      @import '../less/t1001.less';
</style>
<script>
    import { POST, GET,AUTH} from '../assets/fetch.js';
    import utils from '../assets/utils.js';
    import download_bar from './article/download_bar.vue';
    import article_meta from './article/meta.vue';
    import music from './article/music.vue';
    import article_content from './article/content.vue';
    import reward from './article/reward.vue';
    import report from './article/report.vue';
    import auther from './article/auther.vue';
    import recommend from './article/recommend.vue';
    import review from './article/review.vue';
    import ad from './article/ad.vue';
    import rewardDialog from './article/rewardDialog.vue';
    import Toast from '../widget/toast.vue';
    import payment from '../widget/payment.vue';
    export default {
        data () { return {
            logined:false,
            msg:"",
          watchTemplates: this.templates,
          watchMusicData: this.musicData,
          watchArticle: this.article,
         }
        },
        components: {
            Toast,
            download_bar,
            article_meta,
            music,
            article_content,
            reward,
            report,
            auther,
            recommend,
            review,
            ad,
            rewardDialog,
            payment
        },
        props: {
            article: { default: function () {
                   return {hits:0,title:"样例",nickName:"author",createDate:null,member:{}}
               }
            },
            musicData: { default: function () {
                   return {id: ""}
               }
            },
            templates: { default: function () {
                    return []
               }
            },
            htmlStr :{default:""}
        },

        created() {
            var _this = this;
            AUTH("",function (authed) {
              _this.logined  = authed;
            })
            let id = utils.getUrlParameter("id");
            GET('website/article/view.jhtml?id='+id).then(
              function (response) {
               if (response.type=="success") {
                 _this.watchArticle = response.data;
                 //设置分享标题
                 utils.setConfig({
                     title:"【"+_this.watchArticle.nickName+"】"+_this.watchArticle.title,
                     desc:_this.watchArticle.htmlTag,
                     link:_this.watchArticle.url,
                     logo:_this.watchArticle.thumbnail
                 });
                 if (!utils.isNull(response.data.music)) {
                      _this.watchMusicData = JSON.parse(response.data.music);
                    }
                 if (!utils.isNull(response.data.templates)) {
                      console.log(response.data.templates)
                      if (response.data.mediaType==0) {
                         _this.htmlStr = response.data.templates;
                      } else {
                         _this.watchTemplates = response.data.templates;
                      }
                    }

               } else {
                 _this.$refs.toast.show("网络不稳定");
               }
            }, function () {
                _this.$refs.toast.show("网络不稳定");
            });

        },
        methods: {
          onPayNotify:function (data) {
            if ("success"==data.type) {
               alert(data);
            } else {
              _this.$refs.toast.show(data.content);
            }
          },
          showRewardDialog:function () {
            this.$refs.rwd.show();

          },
          rewardNumber:function (m) {
            var _this = this;
            _this.$refs.toast.loading();
            POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+this.watchArticle.id).then(
              function (data) {
                 if (data.type=="success") {
                   _this.$refs.toast.hide();
                   _this.$refs.pay.show(data.data);
                 } else {
                   alert(data.content);
                   _this.$refs.toast.hide();
                   this.$refs.toast.show(data.content);
                 }
              },
              function (err) {
                 _this.$refs.toast.hide();
                 _this.$refs.toast.show("网络不稳定");
              }
            )
          }

        }
    }

</script>
