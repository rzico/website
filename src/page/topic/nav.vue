<template>
  <div class="bckg" v-if="navs.length!=''">
 <div class="nav"  :class="isFixed ? 'navFixed' : ''">
   <ul>
     <li :class="liState(0)" @click="load(0)"> 全部 </li>
     <li v-for="n in navs"  :class="liState(n.id)" @click="load(n.id)"> {{n.name}} </li>
   </ul>
 </div>
  </div>
</template>
<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      isFixed:{default:false},
      idx:{default:0},
      navs:{default:[]}
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
        this.$emit("navChange",id);
      }
    }
  }
</script>
