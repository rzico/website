<template>
  <div class="table" >
    <div class="well voteContentWell"  v-for="item in watchArticle.forms">
      <div class="option-area">
        <h2 class="title">{{item.title}}
        </h2>
        <!--<p class="time">截止时间：长期有效</p>-->
        <ul class="unvote">
          <li class="" v-for="(option,index) in item.options">
            <i class="radio"></i>
            <input type="text"  class="inputTitle" v-model="item.values[index]" :placeholder="option">
            <!--<p class="title">你好</p>&lt;!&ndash;&ndash;&gt;-->
          </li>
          <!--<li class="">-->
            <!--<i class="radio"></i>-->
            <!--<input type="text" class="inputTitle" placeholder="电话">-->
          <!--</li>-->
          <!--<li class="">-->
            <!--<i class="radio"></i>-->
            <!--<input type="text" class="inputTitle" placeholder="年龄">-->
          <!--</li>-->
        </ul>
      </div>
      <button class="vote-btn" @click="submitForm()">{{item.buttonName}}</button>
    </div>
    <Toast ref="toast"></Toast>
  </div>
</template>
<script>
  import utils from '../../assets/utils.js';
  import Toast from '../../widget/toast.vue';
  import { POST, GET, AUTH ,POSTBODY} from '../../assets/fetch.js';
  export default {
    data() {
      return {
        template:"1001",
        watchArticle:this.article,
        clicked:false,
      }
    },
    components: {
      Toast,
    },
//    filters: {
//      datetimefmt(val) {
//        return utils.datetimefmt(val);
//      }
//    },
    created(){
      console.log(this.watchArticle);
      console.log(2);
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"点击设置标题",nickName:"author",createDate:null,member:{autograph:""}}
      }
      }
    },
    methods:{
      submitForm(){
        let _this = this;
        if (this.clicked) {
          return;
        }
        this.clicked = true;
        setTimeout(function () {
          _this.clicked = false;
        },1500)
        let nullNum = 0;
        this.watchArticle.forms[0].values.forEach(function (item) {
          if(utils.isNull(item)){
            nullNum ++;
          }
        })
        if(nullNum > 0){
          this.$refs.toast.show('资料未填写完整');
          return;
        }
//                转成json字符串后上传服务器
        var tableData = '';
        if(this.watchArticle.forms.length > 0){
          tableData = JSON.stringify(this.watchArticle.forms[0]);
        }
        var tableDataTT = {
          articleId:this.watchArticle.id,
          body:tableData
        }
        POSTBODY("weex/member/article/form/submit.jhtml",tableDataTT).then(
          function (data) {
            if (data.type=="success") {
              for(var i = 0;i < _this.watchArticle.forms[0].values.length ;i++){
                _this.$set(_this.watchArticle.forms[0].values,i,'')
              }
              _this.$refs.toast.show('提交成功');
            } else {
              _this.$refs.toast.show(data.content);
            }
          },
          function (err) {
            _this.$refs.toast.hide();
            _this.$refs.toast.show("网络不稳定");
          }
        )

      },
      oninput(e){
        console.log(e);
      }
    }
  }
</script>
