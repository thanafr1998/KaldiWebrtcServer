<template>
    <div class="row">
        <div class="container">
            <div class="d-flex justify-content-center h-100">
             <h3>SearchPage</h3>
            </div>
        </div>
        <div class="container">
            <v-timeline align-top dense class="align-fav">
              <v-timeline-item
                v-for="n in videoNums" :key="n" color="red" :icon="n" fill-dot right>
                <v-card
                  :elevation="20"
                  class="mx-auto card-favourite">
                  <VideoItem :key="movieList[n-1].id" :item="movieList[n-1]"> </VideoItem>
                </v-card>
              </v-timeline-item> 
            </v-timeline> 
        </div>
    </div>
   
</template>
<script>
import VideoItem from '../components/VideoItem'
export default {
  name : 'searchPage',
  components : {
      VideoItem
  },
  computed: {
    movieList() {
        return this.$store.state.video.movieList;
    },
    videoNums(){
        return this.$store.state.video.videoNums;
    }
  }
}
</script>
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
