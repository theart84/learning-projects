<template>
  <div class="sort-buttons-wrap">
    <ElButton @click="viewAllTransactions" type="primary">All</ElButton>
    <ElButton @click="viewIncomeTransactions" type="success">Income</ElButton>
    <ElButton @click="viewOutcomeTransactions" type="danger">Outcome</ElButton>
  </div>
</template>

<script>
export default {
  name: 'SortButtons',
  methods: {
    viewAllTransactions() {
      this.$emit('viewAllTransactions');
    },
    viewIncomeTransactions() {
      this.$emit('viewIncomeTransactions');
    },
    viewOutcomeTransactions() {
      this.$emit('viewOutcomeTransactions');
    }
  }
}
</script>

<style scoped>
.sort-buttons-wrap {
  padding: 0 20px 20px;
}
</style>