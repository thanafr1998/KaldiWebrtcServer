module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  vueLoader: {
    transformToRequire: {
      img: 'src',
      image: 'xlink:href',
      'audio': 'src'
    }
  }
}