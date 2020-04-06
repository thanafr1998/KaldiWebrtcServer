import Vuex from 'vuex'
import Vue from 'vue'
import DATA from '../assets/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTvCount: 10, // The TV inventory
    isLarryHappy: true, 
    isJennyHappy: true,

    //VideoPlayer
    player: null,
    currentMovie: DATA[2],
    movieList: DATA,
    currentSource: DATA[2].source[0],
  },
  
  getters: {
    // Check if both Larry and Jenny are happy
    happyStaff: state => {
        return state.isLarryHappy && state.isJennyHappy
      }
  },
  
  mutations: {
      // Jenny
    removeTv(state, amount) {
        state.totalTvCount -= amount
    },

    //VideoPlayer
    setPlayer(state, player) {
      state.player = player;
    },
    changeMovie(state, id){
      state.currentMovie = state.movieList.filter((movie) => movie.id === id)[0];
      if(Array.isArray(state.currentMovie.source)){
        state.currentSource = state.currentMovie.source[0];
        state.player.src = state.currentSource.src;
      }
      else{
        state.currentSource = state.currentMovie.source;
        state.player.src = state.currentSource;
      }
    }
  },
  
  actions: {
    // Larry
    removeTv(context, amount) {
        // If we enough TVs, ask Jenny to remove it
        if(context.state.totalTvCount >= amount) {
          // If we enough TVs, ask Jenny to remove it
          context.commit('removeTv', amount)
        }
    },

    //VideoPlayer
    setPlayer(context, player) {
      context.commit('setPlayer', player);
    },
    changeMovie(context, id) {
      context.commit('changeMovie', id);
    }


  }
});