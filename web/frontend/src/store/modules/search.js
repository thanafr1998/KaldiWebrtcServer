import INSTRUCTIONS from '../../assets/instructions'

const state =  {
    transcribeMessage : "Default Message",
    trabscribeState : "close",
    opacity : 0.8,
    overlay : false,
    instructions: INSTRUCTIONS
}
// require('howler');
let audio = new Audio({
  src: "https://drive.google.com/a/chula.ac.th/file/d/1cAajRGkm3bLe0TkREhJ3tbQnHyRbWSB6/view?usp=sharing",
  volume: 0.5,
})
const mutations = {
    changeTranscribeState(state, status){
      if(status == "start") {
        state.trabscribeState = "Waiting me prep"
        audio.play();
      } else if(status == "listen"){
        state.trabscribeState = "Listening ..."
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