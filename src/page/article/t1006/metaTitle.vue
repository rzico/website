<template>
  <div class="metaTitle" >
    <div class="titleDiv">
      <span>商品详情</span>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/utils.js';
  export default {
    data() {
      return {
      }
    },
    filters: {
      datetimefmt(val) {
        return utils.datetimefmt(val);
      }
    },
    props: {
      article: {
        default: function () {
          return {hits: 0, title: "样例", nickName: "author", createDate: null}
        }
      },
    },
    created(){
      console.log(this.template);
    },
    methods:{
      jump:function (url,id) {
        if(utils.isweex()){
          location.href = utils.setDummyUrl('topic',id);
        }else{
          this.$router.push(utils.router(url));
        }
      }
    }
  }
</script>
