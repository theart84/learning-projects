<template>
  <div class="total-value" :style="colorBalance">Balance: {{ totalBalance }}</div>
</template>

<script>
import {mapGetters} from "vuex";
export default  {
  name: 'TotalBalance',
  props: {
    total: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    ...mapGetters("transactionsStore", ["totalBalance"]),
    colorBalance() {
      if (this.totalBalance > 0) {
        return `color: green`;
      } else if (this.totalBalance < 0) {
        return `color: red`;
      }
      return `color: black`;
    }
  }
}
</script>

<style scoped>
  .total-value {
    font-size: 26px;
    text-transform: uppercase;
    padding: 20px;
    text-align: center;
  }
</style>