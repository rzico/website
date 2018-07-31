<template>
  <div class="table" v-if="article.title != '点击设置标题'">
    <div class="well voteContentWell"  v-for="item in tableData">
      <div class="option-area">
        <h2 class="title">{{item.title}}</h2>
        <!--<p class="time">截止时间：长期有效</p>-->
        <ul class="unvote"  v-for="(data,index) in item.options">
          <li class="" v-if="data.type == 'option'" :class="[index == 0 ? 'noBorder' : '']">
            <span class="editIcon" :style="{fontFamily:'iconfont'}">&#xe61d;</span>
            <input type="text"  class="inputTitle" v-model="item.values[index]" :placeholder="data.textAreaMessage">
            <!--<p class="title">你好</p>&lt;!&ndash;&ndash;&gt;-->
          </li>
          <li v-else-if="data.type == 'single'" :class="[index == 0 ? 'noBorder' : '']">
            <div>
              <span class="titleIcon " :style="{fontFamily:'iconfont'}">&#xe609;</span>
              <p class="title">{{data.title}}</p><!---->
            </div>
            <div v-for="(mes,mesIndex) in data.single" @click="choosOption(data.single,mesIndex)">
              <i class="radio radioLoca" :class="[mes.choose ? 'chooseBg' : '']"></i>
              <p  class="inputTitle" >{{mes.textAreaMessage}}</p>
            </div>
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
<style>
  .chooseBg{
    background-color: #09BB07;
  }
  .noBorder{
    border-top: none !important;
  }
  .titleIcon{
    position: absolute;
    top: -3px;
    left: -24px;
    font-size: 19px;
  }
  .editIcon{
    position: absolute;
    top: 13px;
    left: 0;
    font-size: 19px;
  }
  .radioLoca{
    top:5px !important;
    left: -23px !important;
  }
</style>
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
        tableData:[],
        options:this.article.forms[0].options,
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
      this.choogeTableList();
    },
    mounted(){
    },
    props: {
      article: { default: function () {
        return {hits:0,title:"点击设置标题",nickName:"author",createDate:null,member:{autograph:""},forms:[{options:[]}]}
      }
      }
    },
    methods:{
      choosOption(data,itemIndex){
        data.forEach(function (mes,index) {
          if(itemIndex != index){
            mes.choose = false;
          }else{
            mes.choose = !mes.choose;
          }
        })
      },
      choogeTableList(){
        let _this = this;
        let voteData = this.watchArticle.forms[0];
        let optionBox = [];
        voteData.values.forEach(function (mes,mesIndex) {
          if(utils.isNull(mes)){
            optionBox.push({
              type:'option',
              textAreaMessage:voteData.options[mesIndex],
              autofocus:false,
            })
          }else{
            let a = mes.split(',');
            let b = [];
            for(let i = 0; i < a.length; i++){
              b.push({
                textAreaMessage:a[i],
                autofocus:false,
                choose:false,
              })
            }
            optionBox.push({
              type:'single',
              title:voteData.options[mesIndex],
              single:b,
            })
          }
        })
        let valueLength = voteData.values.length;
        voteData.values = [];
        for(let i = 0; i < valueLength; i++){
          voteData.values.push('');
        }
        voteData.options = optionBox;
        this.tableData.push(voteData);
      },
//      表单提交
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
        this.tableData[0].options.forEach(function (item,index) {
          if(item.type == 'single'){
            item.single.forEach(function (mes) {
              if(mes.choose){
                _this.tableData[0].values[index] = mes.textAreaMessage;
              }
            })
          }
        })

        this.tableData[0].values.forEach(function (item) {
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
          let uploadData = {
            buttonName:this.watchArticle.forms[0].buttonName,
            title:this.watchArticle.forms[0].title,
            values:this.watchArticle.forms[0].values,
            options:this.options
          }
          tableData = JSON.stringify(uploadData);
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
              _this.watchArticle.forms[0].options.forEach(function (item) {
                if(item.type == 'single'){
                  item.single.forEach(function (mes) {
                    mes.choose = false;
                  })
                }
              })
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
      }
    }
  }
</script>
