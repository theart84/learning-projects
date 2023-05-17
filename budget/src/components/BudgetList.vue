<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <SortButtons @viewAllTransactions="allTransactions"
                   @viewIncomeTransactions="incomeTransactions"
                   @viewOutcomeTransactions="outcomeTransactions"/>
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in transactionsList" :key="prop">
          <BudgetListItem :list="item"/>
        </div>
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false"/>
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem";
import SortButtons from "@/components/SortButtons";
import {mapGetters} from "vuex";
import {mapActions} from "vuex";
export default {
  name: 'BudgetList',
  components: {
    BudgetListItem,
    SortButtons
  },
  data: () => ({
    header: 'Budget List',
    emptyTitle: 'Empty list',

  }),
  computed: {
    ...mapGetters("transactionsStore",["transactionsList"]),
    isEmpty() {
      return !Object.keys(this.transactionsList).length;
    },
  },
  methods: {
    ...mapActions("transactionsStore", ["changeTypeTransaction"]),
    allTransactions() {
      this.changeTypeTransaction('ALL')
    },
    incomeTransactions() {
      this.changeTypeTransaction('INCOME')
    },
    outcomeTransactions() {
      this.changeTypeTransaction('OUTCOME')
    }
  }
}
</script>

<style scoped>
.budget-list-wrap {
  width: 500px;
  margin: auto;
}
</style>