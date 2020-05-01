import INSTRUCTIONS from '../../assets/instructions'

const state =  {
    transcribeMessage : "Default Message",
    trabscribeState : "close",
    opacity : 0.8,
    overlay : false,
    instructions: INSTRUCTIONS,
    currentInstruction: '',
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
    findInstruction(state) {
      let maxLength = -1;
      let maxString = '';
      for(let i = 0; i < state.instructions.length; i++){
        if(state.transcribeMessage.includes(state.instructions[i])){
          if(state.instructions[i].length > maxLength){
            maxLength = state.instructions[i].length;
            maxString = state.instructions[i];
          }
        }
      }
      state.currentInstruction = maxString;
      console.log('currentInstruction: ' + maxString);
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
  close ({ commit, dispatch, state }) {
    commit('findInstruction')
    commit('changeTranscribeState', "close");
    this.dispatch('search/executeInstruction');
  },
  changeMessage({ commit }, msg) {
    msg = msg.trim();
    if(msg && msg != '<s>'){
      commit('changeMessage', msg);
    }
  },
  executeInstruction({ commit, dispatch, state }) {
    switch(state.currentInstruction) {
      case 'ปรับ คุณภาพ วิดีโอ ระดับ ต่ำ':
        dispatch('video/setResolution', 360, {root:true});
        break;
      case  'ปรับ คุณภาพ วิดีโอ ระดับ กลาง':
        dispatch('video/setResolution', 720, {root:true});
        break;
      case 'ปรับ คุณภาพ วิดีโอ ระดับ สูง':
        dispatch('video/setResolution', 1080, {root:true});
        break;
      case 'ล็อกอิน นาม บี':
        dispatch('auth/login', "บี", {root:true});
        break
      case 'ล็อกอิน นาม ตาล':
        dispatch('auth/login', "บี", {root:true});
        break
      case 'ล็อกอิน นาม แตงไทย':
        dispatch('auth/login', "แตงไทย", {root:true});
        break
      case 'ล็อกอิน นาม ฟร้องซ์':
        dispatch('auth/login', "ฟร้องซ์", {root:true});
        break
      case 'ล็อกเอาท์':
        dispatch('auth/logout',null, {root:true});
        break
      case 'ตั้ง เป็น รายการ โปรด':
        dispatch('auth/addFavorite', null, {root:true});
        break
      case 'เอา ออก จาก รายการ โปรด':
        dispatch('auth/removeFavorite',null, {root:true});
        break
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}