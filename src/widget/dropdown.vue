<template>
  <div>
    <div class="weui_cell" @click="drop()">
      <cell-header><span :class="getIcon()" :style="'color:'+color"></span></cell-header>
      <cell-body>{{name}}</cell-body>
      <cell-footer ><span :class="[droped ? 'arrow arrow-drop' : 'arrow']"></span>
      </cell-footer>
    </div>
    <div class="weui_cell" v-for="(option,index) in options" @click="onItemClick(option.id)" v-if="droped">
      <cell-header><span :class="' iconfont '+option.icon+' icon48'"  :style="'color:'+option.color"></span></cell-header>
      <cell-body>{{option.name}}</cell-body>
      <cell-footer><span class="iconfont icon-xuanzhong" v-if="checked(option.id)"></span></cell-footer>
    </div>
  </div>

</template>
<style scoped="">

  .weui_cells_access .weui_cell_ft:after {
    content: " ";
    display: none !important;
  }
  .arrow {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 20px;
  }
  .arrow-drop {
    border-width: 0px 2px 2px 0;
  }
</style>

<script>
  import CellHeader from './cell-header.vue';
  import CellBody from './cell-body.vue';
  import CellFooter from './cell-footer.vue';
  import RadioCell from './radio-cell.vue';

  export default {
    data() {
      return {
        cloneLink: null,
        name:"样例",
        icon:"icon-dingdanxiangqing",
        color:'#ccc',
        droped:false
      };
    },
    props: {

      /**
       * 选项数组
       * 支持纯字符串格式和包含value、text字段的对象格式
       * 若为纯字符串，则该项的value和text均为该字符串
       */
      options: {
        type: Array,
        required: true
      },    /**
       * 跳转链接，若设置则此列表项可点击跳转
       */
      link: {
        type: String,
        required: false
      },

      /**
       * vue-router使用的跳转链接
       * 若使用vue-router，推荐使用router-link而非link
       */
      routerLink: {
        type: null,
        required: false
      }
      ,
      defId:{
        type: String,
        required: false,
        default:"aa"
      },
    },

    components: {
      CellHeader,
      CellBody,
      CellFooter,
      RadioCell
    },

    ready() {
      /**
       * 如果调用该组件时设置了 link 并且未设置 routerLink
       * 则将 link 值拷贝至 cloneLink 以解决该问题：
       * https://github.com/adcentury/vue-weui/issues/38
       *
       * 该做法相当于在 v-link 指令初始化完成并覆写 href 属性之后
       * 再度为 href 进行了赋值
       */
      if (this.link && this.routerLink === undefined) {
        this.cloneLink = this.link;
      }
      this.$watch('link', (newVal) => {
        this.cloneLink = newVal;
      });
      console.log(this.defId);
      this.updateStatus(this.defId);
    },

    methods:{
      getIcon() {
        return "iconfont "+this.icon+" icon48 ";
      },
      switchView: function() {
        this.droped = !this.droped;
      },

      onItemClick: function(id) {
        this.updateStatus(id);
        this.switchView();
      },

      updateStatus: function(id) {
        this.value = id;
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].id==id) {
            this.name = this.options[i].name;
            this.icon = this.options[i].icon;
            this.color = this.options[i].color;
            break;
          }
        }
        this.$emit("onchange", id);
      },
      drop: function () {
        this.switchView();
      },
      checked:function (id) {
        return id==this.value;
      }
    },
    computed: {
      typeClass() {
        return `weui-btn${this.plain ? '-plain' : ''}-${this.type}`;
      }
    }
  };
</script>
