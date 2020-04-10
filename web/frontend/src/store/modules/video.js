import DATA from '../assets/data'

const state = {
    totalTvCount: 10, // The TV inventory
    isLarryHappy: true, 
    isJennyHappy: true,

    //VideoPlayer
    player: null,
    currentMovie: DATA[2],
    movieList: DATA,
    currentSource: DATA[2].source[0],
    currentSpeed: 1,
    isLoop: false,
},
  
const getters = {
    // Check if both Larry and Jenny are happy
    happyStaff: state => {
        return state.isLarryHappy && state.isJennyHappy
    }
},
  
const mutations =  {

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
    },
    setSpeed(state, n){
      state.currentSpeed = n;
      state.player.playbackRate = n;
      console.log('Speed ' + n + 'x')
    },
    setResolution(state, n){
      let targetSource = state.currentMovie.source.filter(source => source.resolution === n)[0];
      if(targetSource){
        state.currentSource = targetSource;
        let time = state.player.currentTime;
        state.player.src = state.currentSource.src;
        state.player.currentTime = time;
        state.player.play();
        console.log(n + 'p');
      }
      else{
        console.log('Resolution is not available');
      }
    },
    setLoop(state, bl) {
      state.isLoop = bl;
      state.player.loop = bl;
      console.log('Set loop ' + bl);
    }
  },
  
const actions = {

    //VideoPlayer
    setPlayer(context, player) {
      context.commit('setPlayer', player);
    },
    changeMovie(context, id) {
      context.commit('changeMovie', id);
    },
    setSpeed(context, n) {
      context.commit('setSpeed', n);
    },
    setResolution(context, n) {
      context.commit('setResolution', n);
    },
    setLoop(context, bl) {
      context.commit('setLoop', bl);
    }
}