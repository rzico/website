<template>
<div class="nav" :class="isFixed ? 'navFixed' : ''">
  <ul  v-for="nav in navs">
     <li :class="liState(nav.id)" @click="load(nav.id)">{{nav.name}}</li>
  </ul>
</div>
</template>

<script>
  import utils from '../../assets/utils.js';
  export default {
    data() {
      return {
        id:0
      }
    },
    props:{
      isFixed:{default:false},
      navs:[{id:0,name:"全部"},{id:1,name:"全部"}]
    },
    created() {

    },
    methods:{
      liState:function (id) {
        if (id==this.id) {
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
