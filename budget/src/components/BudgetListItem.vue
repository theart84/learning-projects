<template>
  <div class="list-item">
    <span class="budget-comment"><i :class="icon"></i>{{ list.comment }}</span>
    <span class="budget-value" :style="colorBalance">{{ list.value }}</span>
    <ElButton type="danger" size="mini" @click="deleteItem(list.id)">Delete</ElButton>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'BudgetListItem',
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({}),
  methods: {
    ...mapActions('transactionsStore', ["delTransaction"]),
    deleteItem(id) {
      let isConfirm = confirm('Are you sure you want to delete the transaction?')
      if (isConfirm) {
        this.delTransaction(id)
      }
    }
  },
  computed: {
    icon() {
      if (this.list.value > 0) {
        return `el-icon-top`;
      }
      return `el-icon-bottom`;
    },
    colorBalance() {
      if (this.list.value > 0) {
        return `color: green`;
      } else if (this.list.value < 0) {
        return `color: red`;
      }
      return `color: black`;
    }

  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
</style>