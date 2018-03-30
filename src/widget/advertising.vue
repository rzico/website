<template>
  <div class="bgc">
    <div class="content">
    <div class="imgDiv" v-for="item in selectList">
      <a :href="item.url">
      <img class="image" :src="item.thumbnail | selectImage"/>
      </a>
    </div>
    </div>
  </div>
</template>
<style scoped>
  .bgc{
    background-color: #eeeeee;
    width: 100%;
  }
  .content{
    background-color: white;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .imgDiv{
    width: 49%;
    height: 100px;
    background-color: #fff;
  }
  .image{
    width: 100%;
    height: 100px;
  }
</style>
<script>
  import { POST, GET, AUTH} from '../assets/fetch.js';
  import utils from '../assets/utils.js';
  import Toast from '../widget/toast.vue';
  export default {
    data () {
      return {
//        精选文章id
        selectId:5,
        selectList:[],
      }
    },
    components: {
      Toast
    },
    filters: {
      dateweektimefmt(value) {
        return utils.dateweektimefmt(value);
      },
      selectImage(val){
        return utils.thumbnail(val, 375, 375);
      },
    },
    props: {
      id: { default: 0}
    },
    created() {
      this.load();
    },
    mounted () {

    },
    methods:{
      //      获取精选文章
      load:function () {
        var _this = this;
        GET('website/article/list.jhtml?tagId='+_this.selectId+'&authorId='+_this.id+"&pageStart=0&pageSize=2").then(
          function (mes) {
            if(mes.type == 'success'){
              _this.selectList = mes.data.data
            }else{
            }
          }, function () {

          });
      },
      jump:function (url) {
        this.$router.push(utils.router(url));
      }
    }
  }
</script>
