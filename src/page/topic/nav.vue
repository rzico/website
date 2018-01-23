<template>
 <div class="nav"  :class="isFixed ? 'navFixed' : ''">
   <ul>
     <li :class="liState(0)" @click="load(0)"> 全部 </li>
     <li v-for="n in Navs"  :class="liState(n.id)" @click="load(n.id)"> {{n.name}} </li>
   </ul>
 </div>
</template>
<script>
  import utils from '../../assets/utils.js';
  export default {
    props:{
      isFixed:{default:false},
      idx:{default:0},
      Navs:{default:[]}
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
