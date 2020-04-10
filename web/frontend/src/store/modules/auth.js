const state = {
    isLogin : false,
    who : "ADMIN"
}
  
const getters = {

}
  
const mutations =  {
    login(state, who) {
        state.who = who;
        state.isLogin = true
    },
    logout(state) {
        state.who = null
        state.isLogin = false
    }
}
  
const actions = {
    login(context, who) {
        context.commit('login',who)
    },
    logout(context) {
        context.commit('logout')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}