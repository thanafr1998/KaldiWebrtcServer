<template>
    <div class="container">
        <div class="row">
            <div class="col-9">
                <div class="player-container">
                    <vue-core-video-player src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"></vue-core-video-player>
                </div>
            </div>
            <!--
            <div class="col-3">
                <div class="row" v-for="link in links" :key="link">
                    <vue-core-video-player src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"></vue-core-video-player>
                </div>
            </div>
            -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'Test',
  data: function() {
      return {
          links: [1,2,3,4,5]
      }
  },
  methods: {
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
