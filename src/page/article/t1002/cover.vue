<template>
  <div class="coverHead">
    <div class="header">
      <p class="time-read">
        <span>{{article.createDate | datetimefmt}}</span>
      </p>
      <div class="img-container">
        <div class="avatar" >
          <img :src="article.member.logo" alt="">
        </div>
      </div>
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
        return utils.datetimeslash(val,'1');
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
