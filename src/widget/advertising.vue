<template>
  <div class="bgc" v-if="selectList.length >=2">
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
    margin-top: 5px;
  }
  .content{
    background-color: white;
    padding: 5px 0 5px 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .imgDiv{
    display: flex;
    flex: 1;
    margin-right: 5px;
    box-sizing: border-box;
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
              if(mes.data.data.length!=0 && mes.data.data.length >=2) {
                mes.data.data.forEach(function (item, index) {
                  if (index < 2) {
                    _this.selectList.push(item);
                  }
                });
              }
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
