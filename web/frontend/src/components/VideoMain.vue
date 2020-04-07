<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-8">
                <div class="player-container">
                    <!--
                    <vue-core-video-player id='player' :cover="currentMovie.cover3" :src="currentMovie.source"></vue-core-video-player>
                    -->
                    <VideoPlayer></VideoPlayer>
                </div>
                <ControlBar></ControlBar>
                <div class="movie-detail">
                    <h1 class="title">{{currentMovie.title}}</h1>
                    <div class="date">{{currentMovie.author}} - {{currentMovie.date}}</div>
                    <div class="desc">{{currentMovie.desc}} </div>
                </div>
            </div>
            <div class="col-4 play-list">
                <h2>Play List</h2>
                <VideoItem v-for="movie in movieList" :key="movie.cover" :item="movie"></VideoItem>
            </div>
        </div>
    </div>
</template>

<script>
import VideoItem from './VideoItem'
import VideoPlayer from './VideoPlayer'
import ControlBar from './ControlBar'

export default {
  name: 'VideoMain',
  components: {
    VideoItem,
    VideoPlayer,
    ControlBar
  },
  methods: {
  },
  computed: {
    currentMovie() {
        return this.$store.state.currentMovie;
    },
    currentSource() {
        return this.$store.state.currentSource;
    },
    player() {
        return this.$store.state.player;
    },
    movieList() {
        return this.$store.state.movieList;
    }
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .movie-detail{
    text-align: left;
    padding-top: 20px;
    color: rgba(0,0,0, .65);
  }
  .movie-detail h1{
    font-size: 20px;
    color: #000;
  }
  .movie-detail .date {
    font-size: 14px;
  }
  .movie-detail .desc {
    font-size: 13px;
    padding: 10px 20px 10px 0;
  }
  .movie-detail .btn-wrap {
    padding-right: 20px;
    text-align: right;
  }
  .play-list h2 {
    text-align: left;
    font-size: 18px;
    color: rgba(0,0,0, .85);
    padding-bottom: 10px;
  }
</style>
