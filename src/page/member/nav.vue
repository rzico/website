<template>
 <div class="nav"  :class="isFixed ? 'navFixed' : ''">
   <ul>
     <li v-for="n in Navs"  :class="liState(n.id)" @click="load(n.id)">
       <i :class="'iconfont ' +n.ico " :style="'color:'+n.color"></i>
        <span >{{n.name}}</span>
     </li>
   </ul>

 </div>
</template>
<style>
</style>

<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      isFixed:{default:false},
      idx:{default:0},
      Navs:{default:[{id:0,name:"会员卡",ico:"icon-huiyuanqia",color:"darkgoldenrod"},
                     {id:1,name:"优惠券",ico:"icon-youhuiquan01",color:"red"},
                     {id:2,name:"奖励金",ico:"icon-moban13zhengshu",color:"orange"}
//                     ,
//                     {id:3,name:"订单",ico:"icon-dingdanxiangqing",color:"slategray"}
      ]}
    },
    created() {

    },
    methods:{
      liState:function (id) {
        if (id==this.idx) {
          return "all active"
        } else {
          return "all"
        }
      },
      load:function (id) {
          this.idx = id;
        this.$emit("onchange",id);
      }
    }
  }
</script>
