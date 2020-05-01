import Vue from 'vue'
import Vuex from 'vuex'
import video from './modules/video'
import auth from './modules/auth'
import search from './modules/search'
import notification from './modules/notification'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    video,
    auth,
    notification,
    search
  }
})
