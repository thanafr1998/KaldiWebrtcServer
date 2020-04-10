const state = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
}

const actions = {
    error({commit}, errorMessage) {
      alert()
      commit('error', errorMessage)
    },
    success({commit}) {
      commit('success')
    }
}
  
const mutations = {
    loading(state) {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    success(state) {
      state.isSuccess = true
      state.isError = false
      state.isLoading = false
    },
    error(state, errorMessage) {
      state.errorMessage = errorMessage
      state.isError = true
      state.isSuccess = false
      state.isLoading = false
    }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}