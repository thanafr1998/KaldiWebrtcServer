<template>
 <v-timeline align-top dense class="align-fav">
    <v-timeline-item
      v-for="n in 10"
      :key="n"
      color="red"
      :icon="n"
      fill-dot
      right
    >

      <v-card
        :elevation="20"
        class="mx-auto card-favourite"
      >
        <VideoItem :key="movieList[0].id" :item="movieList[0]"> </VideoItem>
      </v-card>
    </v-timeline-item>
  </v-timeline> 
</template>
<script>
import VideoItem from '../components/VideoItem'
export default {
  name : 'Favourite',
  components : {
      VideoItem
  },
  computed: {
    movieList() {
        return this.$store.state.video.movieList;
    }
  }
}
</script>>
<style scoped>
 /* .card-favourite {
   padding: 15px;
   padding-bottom: 1px;
 }
 .align-fav {
   width: 80%
 } */
</style>>
