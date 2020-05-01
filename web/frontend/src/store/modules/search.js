import INSTRUCTIONS from '../../assets/instructions'

const state =  {
    transcribeMessage : "Default Message",
    trabscribeState : "close",
    opacity : 0.8,
    overlay : false,
    instructions: INSTRUCTIONS
}
const mutations = {
    changeTranscribeState(state, status){
      if(status == "start"){
        state.overlay = true
      } else if(status == "close") {
        state.overlay = false
        state.transcribeMessage = '';
      }
      state.trabscribeState = status
    },
    changeMessage(state, message) {
      state.transcribeMessage = message;
    },
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
    msg = msg.trim();
    if(msg && msg != '<s>'){
      commit('changeMessage', msg);
    }
  },
  executeInstruction({ commit, dispatch }, instruction) {
      
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}