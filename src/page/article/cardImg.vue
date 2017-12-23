<template>

  <img class="card" :src="'./static/card_picker.jpg'" v-if="control" @click="jump"/>

</template>
<style>

</style>
<script>
  import { POST, GET, AUTH} from '../../assets/fetch.js';
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  export default {
    data() {
      return {
        control:false,
        url:''
      }
    },
    components: {
      Toast
    },
    filters: {

    },
    mounted () {
      var _this = this;
      let id = utils.getUrlParameter("id");
      setTimeout(function () {
        _this.open(id);
      },500);
    },
    methods: {
      open: function (id) {
        let _this = this;
        GET("website/card/view.jhtml?articleId="+id).then(
          function (res) {
            if (res.type == 'success') {
              if(res.data.useCard == true){
                _this.control = true
              }
            _this.url = res.data.url
            } else {
              _this.$refs.toast.show(res.content);
            }
          },
          function (err) {
            _this.$refs.toast.show(err.content);
          }
        )
      },
      jump:function () {
        this.$router.push(utils.router(this.url));
      }
    }
  }
</script>
