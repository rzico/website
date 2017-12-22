<template>
  <div>
  <card ref="card" ></card>
  <couponList ref="couponList"></couponList>
  </div>
</template>
<script>
  import utils from '../../assets/utils.js';
  import card from './card.vue';
  import couponList from './couponList.vue';
  export default {
    data() {
      return {}
    },
    components: {
      card,
      couponList,
    },
  }
  </script>
