import Vue from "vue";

const transactionsStore = {
  namespaced: true,
  state: {
    type: 'ALL',
    list: {},
  },
  getters: {
    transactionsList: ({list, type}) => {
      if (type === 'ALL') {
        return list;
      } else if (type === 'OUTCOME') {
        return  Object.entries(list).reduce((acc, [keys, value]) => {
          if (value.type === "OUTCOME") {
            acc[keys] = value;
          }
          return acc;
        }, {});
      } else if (type === 'INCOME') {
        return Object.entries(list).reduce((acc, [keys, value]) => {
          if (value.type === "INCOME") {
            acc[keys] = value;
          }
          return acc;
        }, {});
      }
    },
    totalBalance: ({list}) => {
      return Object.values(list).reduce((acc, value) => acc + value.value, 0);
    }
  },
  mutations: {
    ADD_TRANSACTION(state, data) {
      Vue.set(state.list, data.id, data)
    },
    DELETE_TRANSACTION(state, id) {
      Vue.delete(state.list, id);
    },
    CHANGE_TYPE(state, type) {
      Vue.set(state, 'type', type);
    }

  },
  actions: {
    addTransactions: ({commit}, data) => {
      const newTransaction = {
        ...data,
        id: String(Math.random()),
      };
      commit('ADD_TRANSACTION', newTransaction);
    },
    delTransaction: ({commit}, id) => {
      commit('DELETE_TRANSACTION', id);
    },
    changeTypeTransaction({commit}, type) {
      commit('CHANGE_TYPE', type);
    }
  }
}
export default transactionsStore;
