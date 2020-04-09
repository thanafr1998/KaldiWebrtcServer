<template>
    <div class='d-flex'>
        <div class='col-2'>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                    {{currentSpeed + 'x'}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="option in speedOptions" :key="option" @click="setSpeed(option)">{{option + 'x'}}</a>
                </div>
            </div>
            <small class="text-muted">
                Speed
            </small>
        </div>
        <div class='col-2'>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" :disabled="!isManyResolution">
                    {{isManyResolution?currentSource.resolution + 'p':'Default'}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="source in currentMovie.source" :key="source.resolution" @click='setResolution(source.resolution)'>{{source.resolution + 'p'}}</a>
                </div>
            </div>
            <small class="text-muted">
                Resolution
            </small>
        </div>
        <div class='col-2'>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                    {{isLoop}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" @click='setLoop(true)'>true</a>
                    <a class="dropdown-item" @click='setLoop(false)'>false</a>
                </div>
            </div>
            <small class="text-muted">
                Loop
            </small>
        </div>
    </div>

</template>

<script>

export default {
  name: 'ControlBar',
  mounted: function() {
      this.$store.dispatch('setPlayer', document.getElementById("player"))
  },
  data: function() {
      return {
          speedOptions: [0.5, 1, 1.5, 2],
      }
  },
  methods: {
      setSpeed: function(n) {
          this.$store.dispatch('setSpeed', n);
      },
      setResolution: function(n) {
          this.$store.dispatch('setResolution', n);
      },
      setLoop: function(bl) {
          this.$store.dispatch('setLoop', bl);
      }
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
      currentSpeed() {
          return this.$store.state.currentSpeed;
      },
      isManyResolution() {
          return Array.isArray(this.$store.state.currentMovie.source);
      },
      isLoop() {
          return this.$store.state.isLoop;
      }
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dropdown-toggle{
    color: black !important;
    background-color: white !important;
    width: 100% !important;
}

</style>
