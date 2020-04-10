<template>
  <mdb-container>
    <mdb-row>
      <mdb-col size="12" class="text-center mb-5">
        <mdb-btn @click.native="showModal = true" color="info">Launch modal contact form</mdb-btn>
        <mdb-modal :show="showModal" @close="showModal = false" cascade class="text-left">
          <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><fa class="fas fa-pencil-alt" /> Contact form</h4>
          </mdb-modal-header>
          <mdb-modal-body class="grey-text">
            <mdb-input size="sm" label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
            <mdb-input size="sm" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <mdb-input size="sm" label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
            <mdb-textarea size="sm" :rows="2" label="Your message" icon="pencil"/>
          </mdb-modal-body>
          <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="showModal = false">Close</mdb-btn>
            <mdb-btn color="primary">Save changes</mdb-btn>
          </mdb-modal-footer>
        </mdb-modal>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>

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
