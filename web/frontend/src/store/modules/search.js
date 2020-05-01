
const state =  {
    transcribeMessage : "Default Message",
    trabscribeState : "close",
    opacity : 0.8,
    overlay : false
}
const mutations = {
    changeTranscribeState(state, status){
      if(status == "start"){
        state.overlay = true
      } else if(status == "close") {
        state.overlay = false
      }
      state.trabscribeState = status
    },
    changeMessage(state, message) {
      state.transcribeMessage = message;
    }
}
const actions= {
  start({ commit }) {
    // clearTimeout(number)
    commit('changeTranscribeState', "start");
    // number = setTimeout(() => commit('reset'), 2500);
  },
  listen ({ commit }) {
    // commit('changeMessage', "listening Govajee command .....")
    commit('changeTranscribeState', "listen");
  },
  wait ({commit}) {
    commit('changeTranscribeState', "wait");
  },
  close ({ commit }) {
    commit('changeTranscribeState', "close");
  },
  changeMessage({ commit }, msg) {
    if(msg.length > 0 || msg !== ' '){
      commit('changeMessage', msg);
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}